/**
 * PUJAPATH - Mock Service Implementations & Repositories
 * Phase 1: Repository adapters backed by validated, indexed MockDatabase
 */

import {
  Puja,
  TransitNode,
  TransitConnection,
  FoodPlace,
  Facility,
  CrowdStatus,
  WeatherCondition,
  GeoCoordinates,
  PujaZone
} from '../../types/domain';
import {
  IPujaRepository,
  ITransitRepository,
  IFoodRepository,
  IFacilityRepository,
  ICrowdService,
  IWeatherService,
  ILandmarkResolver,
  ResolvedLocation
} from '../../types/services';
import { MockDatabase, defaultMockDatabase } from './database';

export class MockPujaRepository implements IPujaRepository {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getAllPujas(): Promise<readonly Puja[]> {
    return this.db.getAllPujas();
  }

  async getPujaById(id: string): Promise<Puja | undefined> {
    return this.db.getPujaById(id);
  }

  async getPujasByZone(zone: PujaZone): Promise<readonly Puja[]> {
    return this.db.getPujasByZone(zone);
  }

  async searchPujas(query: string): Promise<readonly Puja[]> {
    const q = query.toLowerCase().trim();
    return this.db.getAllPujas().filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.bengaliName && p.bengaliName.includes(q)) ||
      p.address.toLowerCase().includes(q) ||
      p.landmark.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }
}

export class MockTransitRepository implements ITransitRepository {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getAllNodes(): Promise<readonly TransitNode[]> {
    return this.db.getAllTransitNodes();
  }

  async getNodeById(id: string): Promise<TransitNode | undefined> {
    return this.db.getTransitNodeById(id);
  }

  async getConnectionsFrom(nodeId: string): Promise<readonly TransitConnection[]> {
    return this.db.getOutboundConnections(nodeId);
  }

  async getTransitGraph(): Promise<ReadonlyMap<string, readonly TransitConnection[]>> {
    return this.db.getAdjacencyGraph();
  }

  async findNearestNode(coordinates: GeoCoordinates): Promise<TransitNode> {
    return this.db.findNearestTransitNode(coordinates);
  }
}

export class MockFoodRepository implements IFoodRepository {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getAllFoodPlaces(): Promise<readonly FoodPlace[]> {
    return this.db.getAllFoodPlaces();
  }

  async getFoodPlaceById(id: string): Promise<FoodPlace | undefined> {
    return this.db.getFoodPlaceById(id);
  }

  async getFoodPlacesNearNode(transitNodeId: string): Promise<readonly FoodPlace[]> {
    return this.db.getFoodPlacesNearNode(transitNodeId);
  }
}

export class MockFacilityRepository implements IFacilityRepository {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getFacilitiesNearPuja(pujaId: string): Promise<readonly Facility[]> {
    return this.db.getFacilitiesForPuja(pujaId);
  }

  async getEmergencyBooths(): Promise<readonly Facility[]> {
    return this.db.getEmergencyBooths();
  }
}

export class MockCrowdService implements ICrowdService {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getCrowdStatuses(entityIds: readonly string[]): Promise<ReadonlyMap<string, CrowdStatus>> {
    const map = new Map<string, CrowdStatus>();
    for (const id of entityIds) {
      map.set(id, this.db.getCrowdStatus(id));
    }
    return map;
  }

  async getLiveStatus(entityId: string): Promise<CrowdStatus> {
    return this.db.getCrowdStatus(entityId);
  }
}

export class MockWeatherService implements IWeatherService {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async getZoneWeather(zone: PujaZone): Promise<WeatherCondition> {
    return this.db.getWeatherForZone(zone);
  }

  async getAllZoneConditions(): Promise<readonly WeatherCondition[]> {
    const zones: PujaZone[] = ['NORTH_KOLKATA', 'CENTRAL_KOLKATA', 'SOUTH_KOLKATA', 'EAST_KOLKATA', 'HOWRAH'];
    return zones.map(z => this.db.getWeatherForZone(z));
  }
}

export class MockLandmarkResolver implements ILandmarkResolver {
  constructor(private readonly db: MockDatabase = defaultMockDatabase) {}

  async resolveLocation(locationNameOrQuery: string): Promise<ResolvedLocation> {
    const key = locationNameOrQuery.trim().toLowerCase();

    // Priority alias matching for major Kolkata festival hubs
    const aliases: Record<string, string> = {
      tollygunge: 'node_tollygunge',
      tolly: 'node_tollygunge',
      ballygunge: 'node_ballygunge_phari',
      gariahat: 'node_gariahat',
      sealdah: 'node_sealdah',
      howrah: 'node_howrah',
      esplanade: 'node_esplanade',
      shyambazar: 'node_shyambazar',
      sovabazar: 'node_sovabazar',
      kalighat: 'node_kalighat',
      hazra: 'node_hazra',
      'new alipore': 'node_taratala',
      'budge budge': 'node_budge_budge',
      batanagar: 'node_budge_budge',
      'howrah maidan': 'node_howrah_maidan',
      majerhat: 'node_majerhat',
      sreebhumi: 'node_shreebhumi',
      shreebhumi: 'node_shreebhumi',
      chetla: 'node_chetla',
      naktala: 'node_naktala',
      salkia: 'node_salkia',
      shibpur: 'node_shibpur',
      mandirtala: 'node_shibpur',
      behala: 'node_behala',
      chowrasta: 'node_behala',
      'sakher bazar': 'node_behala',
      tala: 'node_tala',
      'salt lake': 'node_saltlake_fd',
      saltlake: 'node_saltlake_fd',
      'fd block': 'node_saltlake_fd',
      pujali: 'node_budge_budge'
    };

    for (const [alias, nodeId] of Object.entries(aliases)) {
      if (key.includes(alias)) {
        const node = this.db.getTransitNodeById(nodeId);
        if (node) {
          return {
            query: locationNameOrQuery,
            canonicalName: node.name,
            coordinates: node.location,
            nearestTransitNodeId: node.id
          };
        }
      }
    }

    // Check direct matches with transit nodes
    for (const node of this.db.getAllTransitNodes()) {
      const nodeNameLower = node.name.toLowerCase();
      if (nodeNameLower.includes(key) || key.includes(node.id.replace('node_', ''))) {
        return {
          query: locationNameOrQuery,
          canonicalName: node.name,
          coordinates: node.location,
          nearestTransitNodeId: node.id
        };
      }
    }

    // Check matches with Pujas
    for (const puja of this.db.getAllPujas()) {
      if (puja.name.toLowerCase().includes(key) || puja.landmark.toLowerCase().includes(key)) {
        return {
          query: locationNameOrQuery,
          canonicalName: puja.name,
          coordinates: puja.location,
          nearestTransitNodeId: puja.nearestTransitNodeIds[0] || 'node_sealdah'
        };
      }
    }

    // Default terminal fallback
    const fallbackNode = this.db.getTransitNodeById('node_sealdah') ?? this.db.getAllTransitNodes()[0];
    return {
      query: locationNameOrQuery,
      canonicalName: `Kolkata Landmark (${locationNameOrQuery})`,
      coordinates: fallbackNode.location,
      nearestTransitNodeId: fallbackNode.id
    };
  }
}
