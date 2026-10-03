/**
 * PUJAPATH - Multi-Modal Shortest Path Router
 * Phase 2: Deterministic Graph Pathfinding & Transit Navigation
 */

import { TransitConnection, TransportMode, GeoCoordinates } from '../types/domain';
import { calculateHaversineDistanceMeters } from '../services/mock/database';

export interface RoutePathResult {
  readonly isReachable: boolean;
  readonly connections: readonly TransitConnection[];
  readonly totalDurationMinutes: number;
  readonly totalDistanceMeters: number;
  readonly totalCostInr: number;
  readonly totalWalkDistanceMeters: number;
  readonly transfersCount: number;
  readonly usedModes: readonly TransportMode[];
  readonly stepDescriptions: readonly string[];
}

export interface RouterOptions {
  readonly allowedModes?: readonly TransportMode[];
  readonly maxWalkDistanceMeters?: number;
  readonly festivalTrafficSensitivePenaltyMultiplier?: number;
}

/**
 * Deterministic multi-modal pathfinding across the Kolkata transit graph.
 */
export class TransitGraphRouter {
  constructor(
    private readonly adjacencyGraph: ReadonlyMap<string, readonly TransitConnection[]>
  ) {}

  /**
   * Finds the optimal transit path between two transit nodes using Dijkstra's algorithm.
   */
  findRoute(
    fromNodeId: string,
    toNodeId: string,
    options: RouterOptions = {}
  ): RoutePathResult | null {
    if (fromNodeId === toNodeId) {
      return {
        isReachable: true,
        connections: [],
        totalDurationMinutes: 0,
        totalDistanceMeters: 0,
        totalCostInr: 0,
        totalWalkDistanceMeters: 0,
        transfersCount: 0,
        usedModes: [],
        stepDescriptions: ['Already at target transit location.']
      };
    }

    const allowedModes = options.allowedModes ? new Set(options.allowedModes) : null;
    const maxWalk = options.maxWalkDistanceMeters ?? Number.MAX_VALUE;
    const trafficMultiplier = options.festivalTrafficSensitivePenaltyMultiplier ?? 1.3;

    // Dijkstra structures
    const distances = new Map<string, number>();
    const previous = new Map<string, { node: string; connection: TransitConnection }>();
    const unvisited = new Set<string>();

    for (const nodeId of this.adjacencyGraph.keys()) {
      distances.set(nodeId, Number.POSITIVE_INFINITY);
      unvisited.add(nodeId);
    }
    // Also include destination if not in keys
    if (!distances.has(toNodeId)) distances.set(toNodeId, Number.POSITIVE_INFINITY);
    unvisited.add(toNodeId);

    distances.set(fromNodeId, 0);

    while (unvisited.size > 0) {
      // Find node with minimum distance
      let currentNode: string | null = null;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const node of unvisited) {
        const dist = distances.get(node) ?? Number.POSITIVE_INFINITY;
        if (dist < minDistance) {
          minDistance = dist;
          currentNode = node;
        }
      }

      if (!currentNode || minDistance === Number.POSITIVE_INFINITY) {
        break; // All remaining nodes are unreachable
      }

      if (currentNode === toNodeId) {
        break; // Found destination
      }

      unvisited.delete(currentNode);

      const edges = this.adjacencyGraph.get(currentNode) ?? [];
      for (const edge of edges) {
        if (!unvisited.has(edge.toNodeId)) continue;

        // Mode constraint check
        if (allowedModes && !allowedModes.has(edge.mode)) continue;

        // Walking constraint check
        if (edge.mode === 'WALK' && edge.distanceMeters > maxWalk) continue;

        // Effective weight: minutes adjusted for festive road congestion
        const effectiveMinutes = edge.festivalTrafficSensitive
          ? edge.typicalDurationMinutes * trafficMultiplier
          : edge.typicalDurationMinutes;

        const alternativeDist = minDistance + effectiveMinutes;
        const currentNeighborDist = distances.get(edge.toNodeId) ?? Number.POSITIVE_INFINITY;

        if (alternativeDist < currentNeighborDist) {
          distances.set(edge.toNodeId, alternativeDist);
          previous.set(edge.toNodeId, { node: currentNode, connection: edge });
        }
      }
    }

    // Check if target is reachable
    const targetDist = distances.get(toNodeId);
    if (!targetDist || targetDist === Number.POSITIVE_INFINITY) {
      return null;
    }

    // Reconstruct path
    const pathConnections: TransitConnection[] = [];
    let curr = toNodeId;

    while (curr !== fromNodeId) {
      const prevEntry = previous.get(curr);
      if (!prevEntry) break;
      pathConnections.unshift(prevEntry.connection);
      curr = prevEntry.node;
    }

    let totalDuration = 0;
    let totalDist = 0;
    let totalCost = 0;
    let totalWalk = 0;
    const modesUsed = new Set<TransportMode>();
    const descriptions: string[] = [];

    let prevMode: TransportMode | null = null;
    let transfers = 0;

    for (const conn of pathConnections) {
      totalDuration += conn.typicalDurationMinutes;
      totalDist += conn.distanceMeters;
      totalCost += conn.estimatedCostInr;
      modesUsed.add(conn.mode);

      if (conn.mode === 'WALK') {
        totalWalk += conn.distanceMeters;
      }

      if (prevMode && prevMode !== conn.mode) {
        transfers++;
      }
      prevMode = conn.mode;

      const desc = formatConnectionStep(conn);
      descriptions.push(desc);
    }

    return {
      isReachable: true,
      connections: pathConnections,
      totalDurationMinutes: totalDuration,
      totalDistanceMeters: totalDist,
      totalCostInr: totalCost,
      totalWalkDistanceMeters: totalWalk,
      transfersCount: transfers,
      usedModes: Array.from(modesUsed),
      stepDescriptions: descriptions
    };
  }

  /**
   * Computes a direct walking route between two geo-coordinates.
   */
  calculateWalkingBetweenCoords(
    fromCoords: GeoCoordinates,
    toCoords: GeoCoordinates,
    fromName: string,
    toName: string
  ): RoutePathResult {
    const distMeters = calculateHaversineDistanceMeters(fromCoords, toCoords);
    // Average festival walking speed: 4.0 km/h (~66.7 m/min) accounting for crowd congestion
    const durationMins = Math.max(2, Math.round(distMeters / 65));

    return {
      isReachable: true,
      connections: [],
      totalDurationMinutes: durationMins,
      totalDistanceMeters: distMeters,
      totalCostInr: 0,
      totalWalkDistanceMeters: distMeters,
      transfersCount: 0,
      usedModes: ['WALK'],
      stepDescriptions: [
        `Walk approximately ${distMeters}m from ${fromName} to ${toName} (${durationMins} mins).`
      ]
    };
  }
}

function formatConnectionStep(conn: TransitConnection): string {
  switch (conn.mode) {
    case 'METRO_GREEN':
      return `Take Green Line Metro (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins, ₹${conn.estimatedCostInr})`;
    case 'METRO_BLUE':
      return `Take Blue Line Metro (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins, ₹${conn.estimatedCostInr})`;
    case 'AUTO_RICKSHAW':
      return `Take shared auto-rickshaw (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins, ₹${conn.estimatedCostInr})`;
    case 'BUS_CSTC':
      return `Board CSTC public bus (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins, ₹${conn.estimatedCostInr})`;
    case 'WALK':
      return `Walk along festival pedestrian pathway (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins)`;
    default:
      return `Travel via ${conn.mode} (${conn.distanceMeters}m, ~${conn.typicalDurationMinutes} mins, ₹${conn.estimatedCostInr})`;
  }
}
