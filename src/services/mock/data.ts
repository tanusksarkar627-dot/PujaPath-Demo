/**
 * PUJAPATH - Kolkata Durga Puja Mock Dataset
 * Phase 1: High-Fidelity Domain Dataset with Complete Referential Integrity
 * 
 * Covering:
 * - North Kolkata (Heritage, Bonedi, Art/Thematic)
 * - Central Kolkata (Illumination, Mega Pandals, Historic Lakes)
 * - South Kolkata (Community Stalwarts, South Temple Replicas, Cultural Adda)
 * 
 * All telemetry fields carry `isSimulated: true`.
 */

import {
  Puja,
  TransitNode,
  TransitConnection,
  FoodPlace,
  Facility,
  CrowdStatus,
  WeatherCondition
} from '../../types/domain';

// ==========================================
// 1. Kolkata Transit Nodes (Metro, Suburban Rail, Bus & Auto Hubs)
// ==========================================

export const MOCK_TRANSIT_NODES: readonly TransitNode[] = [
  // --- North Kolkata Nodes ---
  {
    id: 'node_shyambazar',
    name: 'Shyambazar Five-Point Crossing & Metro Station (Blue Line)',
    location: { latitude: 22.6041, longitude: 88.3711 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_bagbazar_ghat',
    name: 'Bagbazar Launch Ghat & Circular Railway',
    location: { latitude: 22.6038, longitude: 88.3652 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: false
  },
  {
    id: 'node_sovabazar',
    name: 'Sovabazar Sutanuti Metro Station (Blue Line)',
    location: { latitude: 22.5985, longitude: 88.3668 },
    supportedModes: ['METRO_BLUE', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: false
  },
  {
    id: 'node_girish_park',
    name: 'Girish Park Metro Station (Blue Line)',
    location: { latitude: 22.5862, longitude: 88.3627 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },

  // --- Central Kolkata Nodes ---
  {
    id: 'node_mg_road',
    name: 'Mahatma Gandhi Road Metro Station (Blue Line)',
    location: { latitude: 22.5802, longitude: 88.3619 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: false
  },
  {
    id: 'node_central',
    name: 'Central Metro Station (Blue Line)',
    location: { latitude: 22.5714, longitude: 88.3589 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_sealdah',
    name: 'Sealdah Railway Terminal & Green Line Metro',
    location: { latitude: 22.5675, longitude: 88.3712 },
    supportedModes: ['METRO_GREEN', 'BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: true,
    wheelchairAccessible: true
  },
  {
    id: 'node_esplanade',
    name: 'Esplanade Metro Interchange (Blue Line & Green Line)',
    location: { latitude: 22.5645, longitude: 88.3518 },
    supportedModes: ['METRO_BLUE', 'METRO_GREEN', 'BUS_CSTC', 'TAXI_YELLOW', 'WALK'],
    isTerminal: true,
    wheelchairAccessible: true
  },
  {
    id: 'node_howrah',
    name: 'Howrah Railway Station & Green Line Underwater Metro',
    location: { latitude: 22.5840, longitude: 88.3426 },
    supportedModes: ['METRO_GREEN', 'BUS_CSTC', 'TAXI_YELLOW', 'WALK'],
    isTerminal: true,
    wheelchairAccessible: true
  },

  // --- South Kolkata Nodes ---
  {
    id: 'node_park_street',
    name: 'Park Street Metro Station (Blue Line)',
    location: { latitude: 22.5511, longitude: 88.3514 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_rabindra_sadan',
    name: 'Rabindra Sadan & Exide Crossing Metro (Blue Line)',
    location: { latitude: 22.5385, longitude: 88.3458 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_hazra',
    name: 'Jatin Das Park / Hazra Crossing Metro Station (Blue Line)',
    location: { latitude: 22.5228, longitude: 88.3445 },
    supportedModes: ['METRO_BLUE', 'AUTO_RICKSHAW', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_kalighat',
    name: 'Kalighat Metro Station (Blue Line & Rashbehari Crossing)',
    location: { latitude: 22.5181, longitude: 88.3432 },
    supportedModes: ['METRO_BLUE', 'AUTO_RICKSHAW', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_gariahat',
    name: 'Gariahat Junction Crossing & Auto Stand',
    location: { latitude: 22.5180, longitude: 88.3650 },
    supportedModes: ['AUTO_RICKSHAW', 'BUS_CSTC', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_ballygunge_phari',
    name: 'Ballygunge Phari Crossing',
    location: { latitude: 22.5285, longitude: 88.3670 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_taratala',
    name: 'Taratala Crossing & Majerhat Hub',
    location: { latitude: 22.5055, longitude: 88.3182 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_tollygunge',
    name: 'Tollygunge / Mahanayak Uttam Kumar Metro Station (Blue Line)',
    location: { latitude: 22.4985, longitude: 88.3458 },
    supportedModes: ['METRO_BLUE', 'BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_rabindra_sarobar',
    name: 'Rabindra Sarobar Metro Station (Blue Line & Southern Avenue)',
    location: { latitude: 22.5125, longitude: 88.3450 },
    supportedModes: ['METRO_BLUE', 'AUTO_RICKSHAW', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_budge_budge',
    name: 'Budge Budge Railway Station & Auto Hub',
    location: { latitude: 22.4820, longitude: 88.1810 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: true,
    wheelchairAccessible: false
  },
  {
    id: 'node_majerhat',
    name: 'Majerhat Railway Station & Purple Line Hub',
    location: { latitude: 22.5180, longitude: 88.3220 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_howrah_maidan',
    name: 'Howrah Maidan Metro Station (Green Line)',
    location: { latitude: 22.5850, longitude: 88.3280 },
    supportedModes: ['METRO_GREEN', 'BUS_CSTC', 'WALK'],
    isTerminal: true,
    wheelchairAccessible: true
  },
  {
    id: 'node_shreebhumi',
    name: 'Sreebhumi Clock Tower & VIP Road Crossing',
    location: { latitude: 22.5980, longitude: 88.4050 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_chetla',
    name: 'Chetla Central Road & Alipore Crossing',
    location: { latitude: 22.5150, longitude: 88.3370 },
    supportedModes: ['AUTO_RICKSHAW', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: false
  },
  {
    id: 'node_naktala',
    name: 'Gitanjali / Naktala Metro Station (Blue Line)',
    location: { latitude: 22.4720, longitude: 88.3620 },
    supportedModes: ['METRO_BLUE', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_ballygunge_station',
    name: 'Ballygunge Railway Junction',
    location: { latitude: 22.5250, longitude: 88.3690 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_salkia',
    name: 'Salkia Chowrasta & Howrah North Hub',
    location: { latitude: 22.5975, longitude: 88.3490 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_shibpur',
    name: 'Shibpur Mandirtala Crossing & Vidyasagar Setu Toll Plaza',
    location: { latitude: 22.5640, longitude: 88.3280 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'TAXI_YELLOW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_behala',
    name: 'Behala Chowrasta Hub & Diamond Harbour Road',
    location: { latitude: 22.4965, longitude: 88.3120 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_tala',
    name: 'Tala Park & Northern Avenue Hub',
    location: { latitude: 22.6080, longitude: 88.3750 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_saltlake_fd',
    name: 'Salt Lake Central Park & FD Block Hub',
    location: { latitude: 22.5870, longitude: 88.4180 },
    supportedModes: ['METRO_GREEN', 'BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_batanagar',
    name: 'Batanagar Riverside & Maheshtala Junction',
    location: { latitude: 22.5020, longitude: 88.2350 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_bally',
    name: 'Bally Ghat & GT Road Junction (Howrah)',
    location: { latitude: 22.6500, longitude: 88.3450 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_belur',
    name: 'Belur Station & GT Road Crossing (Howrah)',
    location: { latitude: 22.6280, longitude: 88.3460 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_jodhpur_park',
    name: 'Jodhpur Park & Dhakuria Junction',
    location: { latitude: 22.5010, longitude: 88.3650 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_dumdum_park',
    name: 'Dum Dum Park & VIP Road Junction',
    location: { latitude: 22.6050, longitude: 88.4080 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_ultadanga',
    name: 'Ultadanga Hudco Crossing & Bidhannagar Station',
    location: { latitude: 22.5920, longitude: 88.3850 },
    supportedModes: ['BUS_CSTC', 'AUTO_RICKSHAW', 'WALK', 'TAXI_YELLOW'],
    isTerminal: false,
    wheelchairAccessible: true
  },
  {
    id: 'node_haridevpur',
    name: 'Haridevpur & Motilal Gupta Road Hub',
    location: { latitude: 22.4820, longitude: 88.3250 },
    supportedModes: ['AUTO_RICKSHAW', 'BUS_CSTC', 'WALK'],
    isTerminal: false,
    wheelchairAccessible: false
  }
];

// ==========================================
// 2. Kolkata Pujas (Realistic & Geocoded)
// ==========================================

export const MOCK_PUJAS: readonly Puja[] = [
  // --- North Kolkata Cluster ---
  {
    id: 'puja_bagbazar',
    name: 'Bagbazar Sarbojanin Durgotsav',
    bengaliName: 'বাগবাজার সর্বজনীন',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.6025, longitude: 88.3688 },
    address: 'Bagbazar Ghat Road, Shyambazar, Kolkata 700003',
    landmark: 'Near Bagbazar Launch Ghat & Girish Mancha',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_shyambazar', 'node_bagbazar_ghat'],
    tags: ['Traditional Ekchala', 'Historic 100+ Years', 'Iconic Kumari Puja', 'Dhaak Showcase'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Pure traditional sabeki pratima with shimmering sholar shaaj and century-old rituals.'
  },
  {
    id: 'puja_kumartuli_park',
    name: 'Kumartuli Park Sarbojanin',
    bengaliName: 'কুমারটুলী পার্ক',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5992, longitude: 88.3653 },
    address: '8/B, Abhay Mitra Street, Sovabazar, Kolkata 700005',
    landmark: 'Behind Kumartuli Idol Maker Colony',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_sovabazar'],
    tags: ['Artistic Pandal', 'Potters Colony', 'Handcrafted Murals'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Terracotta rural Bengal village motif honoring generational idol craftsmen.'
  },
  {
    id: 'puja_sovabazar_rajbari',
    name: 'Sovabazar Rajbari Durga Puja',
    bengaliName: 'শোভাবাজার রাজবাড়ি',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5978, longitude: 88.3671 },
    address: '36, Nabakrishna Deb Street, Kolkata 700005',
    landmark: 'Near Sovabazar Metro Gate 1',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'POLICE_MOBILITY_ESCORT'],
    nearestTransitNodeIds: ['node_sovabazar'],
    tags: ['Bonedi Bari', 'Est. 1757', 'Courtyard Puja', 'Lord Clive Era'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Aristocratic thakur-dalan open courtyard worship with classical cannons and heritage customs.'
  },
  {
    id: 'puja_hatibagan_sarbojanin',
    name: 'Hatibagan Sarbojanin Durgotsav',
    bengaliName: 'হাতিবাগান সর্বজনীন',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5960, longitude: 88.3725 },
    address: 'Hatibagan, Kolkata 700004',
    landmark: 'Near Hatibagan Market and Star Theatre',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_shyambazar', 'node_girish_park'],
    tags: ['Artistic Lighting', 'Historic Market Quarter', 'Eco Friendly'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Artisan handwoven jute and bamboo dome reflecting Bengal rural folk lore.'
  },

  // --- Central Kolkata Cluster ---
  {
    id: 'puja_college_square',
    name: 'College Square Sarbojanin',
    bengaliName: 'কলেজ স্কোয়ার',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5746, longitude: 88.3638 },
    address: '53, College Street, Bowbazar, Kolkata 700073',
    landmark: 'Opposite Calcutta University & Sanskrit College',
    category: 'ILLUMINATION_LIGHT',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_mg_road', 'node_central'],
    tags: ['Lakeside Reflection', 'Chandannagar Lights', 'Gigantic Structure', 'Historic Boating Lake'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'Spectacular architectural replica hovering over the illuminated historic water tank.'
  },
  {
    id: 'puja_santosh_mitra_square',
    name: 'Santosh Mitra Square (Lebutala)',
    bengaliName: 'সন্তোষ মিত্র স্কোয়ার',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5687, longitude: 88.3672 },
    address: 'Lebutala, Bowbazar, Kolkata 700012',
    landmark: 'Near Sealdah Station (Walking distance ~900m)',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_sealdah', 'node_central'],
    tags: ['Mega Pandal', 'Sphere Sphere Lighting', 'Laser Show', 'Sealdah Hub'],
    crowdMultiplier: 1.9,
    currentThemeDescription: 'Gargantuan golden dome with synchronized 3D musical architectural mapping.'
  },
  {
    id: 'puja_mohammad_ali_park',
    name: 'Mohammad Ali Park Durga Puja',
    bengaliName: 'মহম্মদ আলী পার্ক',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5784, longitude: 88.3615 },
    address: 'MG Road, Kolutolla, Kolkata 700073',
    landmark: 'Opposite Chittaranjan College, MG Road',
    category: 'ILLUMINATION_LIGHT',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_mg_road'],
    tags: ['Fort Style Pandal', 'Heritage Lighting', 'MG Road Arterial'],
    crowdMultiplier: 1.6,
    currentThemeDescription: 'Rajasthan Royal Citadel replica with heritage Chandannagar light panels.'
  },

  // --- South Kolkata Cluster ---
  {
    id: 'puja_ekdalia_evergreen',
    name: 'Ekdalia Evergreen Club',
    bengaliName: 'একডালিয়া এভারগ্রীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5186, longitude: 88.3683 },
    address: '15, Ekdalia Road, Gariahat, Kolkata 700019',
    landmark: 'Behind Gariahat Pantaloons & Gariahat Clock',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'TACTILE_PAVING'],
    nearestTransitNodeIds: ['node_gariahat'],
    tags: ['Temple Replica', 'German Chandelier', 'Gariahat Landmark', 'Traditional Sabeki Idol'],
    crowdMultiplier: 1.7,
    currentThemeDescription: 'Grand South Indian temple tower replica with antique brass chandelier and classical rituals.'
  },
  {
    id: 'puja_singhi_park',
    name: 'Singhi Park Sarbojanin',
    bengaliName: 'সিংঘী পার্ক',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5199, longitude: 88.3644 },
    address: 'Dover Lane, Gariahat, Kolkata 700029',
    landmark: 'Near Dover Lane and Gariahat Crossing',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_gariahat'],
    tags: ['Fine Artistry', 'Walking Circuit with Ekdalia', 'Sanskrit Hymns'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Intricate brass and bell metal craft celebrating the divine mother.'
  },
  {
    id: 'puja_maddox_square',
    name: 'Maddox Square Durga Puja',
    bengaliName: 'ম্যাডক্স স্কয়ার',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5281, longitude: 88.3582 },
    address: 'Ritchie Road, Ballygunge, Kolkata 700019',
    landmark: 'Near Hazra Law College & Lansdowne',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 60,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_hazra', 'node_ballygunge_phari'],
    tags: ['Famous Adda Hub', 'Open Lawn Vibe', 'Nostalgic Youth Gathering', 'Traditional Ekchala'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Traditional Sabeki idol nestled in expansive open parkland famed for soulful cultural adda.'
  },
  {
    id: 'puja_suruchi_sangha',
    name: 'Suruchi Sangha (New Alipore)',
    bengaliName: 'সুরুচি সংঘ',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5085, longitude: 88.3275 },
    address: 'Block M, New Alipore, Kolkata 700053',
    landmark: 'Near Majerhat / Taratala bridge (close to Tollygunge)',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_tollygunge', 'node_taratala', 'node_kalighat'],
    tags: ['National Cultural Theme', 'Eco Friendly Art', 'Statewide Fame'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'State theme representation depicting Himalayan tranquility and peace.'
  },
  {
    id: 'puja_mudiali_club',
    name: 'Mudiali Club Durgotsab',
    bengaliName: 'মুদিয়ালী ক্লাব',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5128, longitude: 88.3482 },
    address: 'Southern Avenue, Mudiali, Kolkata 700029',
    landmark: 'Near Southern Avenue Lake and Menoka Cinema',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_rabindra_sarobar', 'node_kalighat'],
    tags: ['Eco Artistry', 'Southern Avenue Lake', 'Nature Theme', 'Iconic South Kolkata'],
    crowdMultiplier: 1.6,
    currentThemeDescription: 'Eco-conscious traditional aesthetic installation honoring environmental harmony.'
  },
  {
    id: 'puja_tridhara_sammilani',
    name: 'Tridhara Sammilani',
    bengaliName: 'ত্রিধারা সম্মিলনী',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5192, longitude: 88.3567 },
    address: 'Manoharpukur Road, Dover Terrace, Kolkata 700029',
    landmark: 'Near Rashbehari Crossing and Lake Mall',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_kalighat', 'node_gariahat'],
    tags: ['Experimental Art', 'South Kolkata Circuit', 'Eco Architecture'],
    crowdMultiplier: 1.75,
    currentThemeDescription: 'Avant-garde visual artistic installation blending earthen pottery and rhythmic light.'
  },
  {
    id: 'puja_sreebhumi',
    name: 'Sreebhumi Sporting Club',
    bengaliName: 'শ্রীভূমি স্পোর্টিং ক্লাব',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5975, longitude: 88.4035 },
    address: 'VIP Road, Lake Town, South Dumdum, Kolkata 700089',
    landmark: 'Lake Town Clock Tower, VIP Road Arterial',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'WHEELCHAIR_RAMP'],
    nearestTransitNodeIds: ['node_shreebhumi', 'node_shyambazar'],
    tags: ['Mega World Monument', 'Burj Khalifa/Disneyland', 'Gold Jewellery Idol', 'VIP Road Landmark'],
    crowdMultiplier: 2.2,
    currentThemeDescription: 'Gargantuan global architectural marvel replica adorned with genuine gold jewelry and laser light displays.'
  },
  {
    id: 'puja_chetla_agrani',
    name: 'Chetla Agrani Club',
    bengaliName: 'চেতলা অগ্রণী ক্লাব',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5165, longitude: 88.3385 },
    address: 'Chetla Central Road, Alipore, Kolkata 700027',
    landmark: 'Near Chetla Central Park and Kalighat Temple Approach',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_chetla', 'node_kalighat'],
    tags: ['Masterpiece Artistry', 'Bengal Clay Heritage', 'State Cultural Award', 'Alipore Circuit'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'Acclaimed philosophical artistic installation honoring traditional earthen roots and divine maternal power.'
  },
  {
    id: 'puja_ballygunge_cultural',
    name: 'Ballygunge Cultural Association',
    bengaliName: 'বালিগঞ্জ কালচারাল অ্যাসোসিয়েশন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5225, longitude: 88.3625 },
    address: 'Lake Temple Road, Southern Avenue, Kolkata 700029',
    landmark: 'Behind Lake Mall and Southern Avenue Lake',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_gariahat', 'node_kalighat'],
    tags: ['74+ Years Legacy', 'Pure Sabeki Pratima', 'Traditional Sholar Shaaj', 'Dhaak Competitions'],
    crowdMultiplier: 1.65,
    currentThemeDescription: 'Classic Sabeki goddess with pristine traditional Shola ornaments preserving seven decades of aristocratic rituals.'
  },
  {
    id: 'puja_naktala_udayan',
    name: 'Naktala Udayan Sangha',
    bengaliName: 'নাকতলা উদয়ন সংঘ',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4735, longitude: 88.3645 },
    address: 'NSC Bose Road, Naktala, Kolkata 700047',
    landmark: 'Near Gitanjali Metro Station (Tollygunge southern extension)',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_naktala', 'node_tollygunge'],
    tags: ['Avant-Garde Giant', 'Contemporary Sculpture', 'Mega Footfall', 'Tollygunge Extended'],
    crowdMultiplier: 1.95,
    currentThemeDescription: 'Mind-bending kinetic visual installation synthesizing contemporary sculpture with spiritual transcendence.'
  },
  {
    id: 'puja_ahiritola',
    name: 'Ahiritola Sarbojanin Durgotsav',
    bengaliName: 'আহিরীটোলা সর্বজনীন',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5955, longitude: 88.3610 },
    address: 'BK Paul Avenue, Ahiritola, Kolkata 700005',
    landmark: 'Near Ahiritola Launch Ghat & Sovabazar Riverfront',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_sovabazar', 'node_bagbazar_ghat'],
    tags: ['Historic Riverfront', 'Folk Artistry', 'Handloom Heritage', 'North Heritage Circuit'],
    crowdMultiplier: 1.7,
    currentThemeDescription: 'Intricate riverfront thematic pandal woven with traditional Bengal handloom fabrics and terracotta motifs.'
  },
  {
    id: 'puja_budge_budge',
    name: 'Budge Budge Sarbojanin Durgotsav',
    bengaliName: 'বজবজ সর্বজনীন দুর্গোৎসব',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4835, longitude: 88.1825 },
    address: 'Station Road, Kalibari Grounds, Budge Budge 700137',
    landmark: 'Near Budge Budge Railway Station and Hooghly Ferry Ghat',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_budge_budge'],
    tags: ['Suburban Giant', 'Traditional Ekchala', 'Ganga Ghat Mela', 'Budge Budge Rail Route'],
    crowdMultiplier: 1.45,
    currentThemeDescription: 'Beloved suburban festival carnival with traditional clay sculptures and century-old local customs.'
  },
  {
    id: 'puja_salkia_alapani',
    name: 'Salkia Alapani Club',
    bengaliName: 'সালকিয়া আলাপনী',
    zone: 'HOWRAH',
    location: { latitude: 22.5985, longitude: 88.3495 },
    address: 'Salkia School Road, Salkia, Howrah 711106',
    landmark: 'Near Salkia Chowrasta & Howrah North',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_salkia', 'node_howrah'],
    tags: ['Howrah Landmark', 'Historic 80+ Years', 'Illumination Art', 'Riverfront Adda'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Legendary Howrah community celebration blending traditional sabeki idols with dazzling Chandannagar illuminations.'
  },
  {
    id: 'puja_shibpur_mandirtala',
    name: 'Shibpur Mandirtala Durgotsab',
    bengaliName: 'শিবপুর মন্দিরতলা',
    zone: 'HOWRAH',
    location: { latitude: 22.5630, longitude: 88.3275 },
    address: 'Mandirtala, Shibpur, Howrah 711102',
    landmark: 'Beside Vidyasagar Setu Toll Plaza & Nabanna',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'WHEELCHAIR_RAMP'],
    nearestTransitNodeIds: ['node_shibpur', 'node_howrah_maidan'],
    tags: ['Architectural Marvel', 'Howrah Tourist Magnet', 'Vidyasagar Setu Vista'],
    crowdMultiplier: 1.6,
    currentThemeDescription: 'Colossal thematic architectural pavilion overlooking the iconic Vidyasagar Setu suspension bridge.'
  },
  {
    id: 'puja_behala_notun_dal',
    name: 'Behala Notun Dal',
    bengaliName: 'বেহালা নতুন দল',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4950, longitude: 88.3140 },
    address: 'Banamali Naskar Road, Behala, Kolkata 700034',
    landmark: 'Near Behala Chowrasta (En route to Budge Budge)',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_behala', 'node_taratala'],
    tags: ['Award Winning Art', 'Tourist Magnet', 'Budge Budge Corridor', 'Creative Idol'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'World-renowned avant-garde cultural installation championing sustainable environmental architecture and divine clay craft.'
  },
  {
    id: 'puja_barisha_club',
    name: 'Barisha Club (Sakher Bazar)',
    bengaliName: 'বড়িশা ক্লাব',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4890, longitude: 88.3105 },
    address: 'Sakher Bazar, Diamond Harbour Road, Kolkata 700008',
    landmark: 'Near Sakher Bazar Auto Stand & Budge Budge Trunk Road',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'WHEELCHAIR_RAMP'],
    nearestTransitNodeIds: ['node_behala', 'node_budge_budge'],
    tags: ['Iconic Social Theme', 'Global Acclaim', 'Diamond Harbour Route'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'Celebrated international emotional installation depicting maternal resilience and compassionate social narratives.'
  },
  {
    id: 'puja_tala_prattoy',
    name: 'Tala Prattoy',
    bengaliName: 'তালা প্রত্যয়',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.6075, longitude: 88.3745 },
    address: 'Tala Park, Shyambazar North, Kolkata 700002',
    landmark: 'Opposite Tala Water Tank Reservoir',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_tala', 'node_shyambazar'],
    tags: ['Contemporary Biennale Art', 'Record Tourist Footfall', 'UNESCO Heritage Circuit'],
    crowdMultiplier: 1.95,
    currentThemeDescription: 'Pioneering global contemporary art installation hailed as the pinnacle of modern Durga Puja public artistry.'
  },
  {
    id: 'puja_kashi_bose_lane',
    name: 'Kashi Bose Lane Durgotsab',
    bengaliName: 'কাশী বোস লেন',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5895, longitude: 88.3710 },
    address: 'Kashi Bose Lane, Maniktala, Kolkata 700006',
    landmark: 'Near Maniktala Crossing and Girish Park',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_girish_park', 'node_shyambazar'],
    tags: ['Artistic Immersion', 'Intricate Craftsmanship', 'North Kolkata Mega Circuit'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'Deeply expressive hand-crafted architectural tapestry blending classical Indian mythology with contemporary folk sculpture.'
  },
  {
    id: 'puja_fd_block_saltlake',
    name: 'FD Block Sarbojanin (Salt Lake)',
    bengaliName: 'এফ ডি ব্লক সল্টলেক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5865, longitude: 88.4175 },
    address: 'FD Block, Sector III, Bidhannagar, Kolkata 700091',
    landmark: 'Near Salt Lake Central Park & Karunamoyee',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 50,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_saltlake_fd', 'node_sealdah'],
    tags: ['Monumental Replica', 'Salt Lake Tourist Hub', 'Fairy Tale Lighting', 'Mela Carnival'],
    crowdMultiplier: 1.9,
    currentThemeDescription: 'Towering monumental fantasy replica drawing hundreds of thousands with festive carnival food fairs and illuminations.'
  },
  {
    id: 'puja_badamtala_ashar_sangha',
    name: 'Badamtala Ashar Sangha',
    bengaliName: 'বাদামতলা আষাঢ় সংঘ',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5185, longitude: 88.3465 },
    address: 'Nepal Bhattacharjee Street, Kalighat, Kolkata 700026',
    landmark: 'Near Kalighat Metro & Rashbehari Crossing',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_kalighat', 'node_hazra'],
    tags: ['Pioneering Thematic Art', 'Kalighat Golden Triangle', 'Creative Lighting'],
    crowdMultiplier: 1.75,
    currentThemeDescription: 'Trailblazing thematic artwork blending experimental lighting with poignant traditional Bengali folklore.'
  },

  // --- Additional Budge Budge & Behala Corridors ---
  {
    id: 'puja_batanagar_sarbojanin',
    name: 'Batanagar Sarbojanin Durgotsav',
    bengaliName: 'বাটানগর সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5030, longitude: 88.2360 },
    address: 'Batanagar Riverside Township, Maheshtala 700140',
    landmark: 'Near Batanagar Railway Station & Hooghly Riverbank',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_batanagar', 'node_budge_budge'],
    tags: ['Budge Budge Rail Route', 'Riverside Township', 'Sabeki Pratima', 'Fairgrounds'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Riverside industrial township heritage festival with traditional ekchala clay idols and vibrant carnival grounds.'
  },
  {
    id: 'puja_kalipur_sarbojanin',
    name: 'Kalipur Sarbojanin Durgotsav',
    bengaliName: 'কালীপুর সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4855, longitude: 88.1920 },
    address: 'Budge Budge Trunk Road, Kalipur 700137',
    landmark: 'Near Kalipur Crossing & Budge Budge Station',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_budge_budge'],
    tags: ['Budge Budge Corridor', 'Traditional Puja', 'Local Mela'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Century-old suburban riverside community celebration featuring classical Bengali ritual worship and local artisanal fairs.'
  },
  {
    id: 'puja_behala_club',
    name: 'Behala Club Sarbojanin',
    bengaliName: 'বেহালা ক্লাব',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4980, longitude: 88.3150 },
    address: 'Banamali Naskar Road, Behala Chowrasta, Kolkata 700034',
    landmark: 'Walking distance from Behala Chowrasta',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_behala', 'node_taratala'],
    tags: ['75+ Years Heritage', 'Behala Stalwart', 'Traditional Customs', 'Budge Budge Link'],
    crowdMultiplier: 1.6,
    currentThemeDescription: 'One of South-West Kolkata’s historic pillar pujas known for ornate sabeki chandeliers and community hospitality.'
  },
  {
    id: 'puja_behala_devdaru',
    name: 'Behala Devdaru Fatak Durgotsav',
    bengaliName: 'বেহালা দেবদারু ফটক',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4935, longitude: 88.3125 },
    address: 'Diamond Harbour Road, Behala, Kolkata 700034',
    landmark: 'Near Behala Tram Depot & Devdaru Fatak',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_behala', 'node_budge_budge'],
    tags: ['Creative Thematic Pandal', 'DH Road Corridor', 'Folk Artistry'],
    crowdMultiplier: 1.7,
    currentThemeDescription: 'Acclaimed thematic presentation highlighting indigenous Bengali rural architecture and intricate handmade clay ornaments.'
  },
  {
    id: 'puja_ajeya_sanghati',
    name: 'Ajeya Sanghati (Haridevpur)',
    bengaliName: 'অজেয় সংহতি',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4830, longitude: 88.3270 },
    address: 'Haridevpur, Tollygunge Link, Kolkata 700082',
    landmark: 'Near Haridevpur Police Station & Motilal Gupta Road',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_haridevpur', 'node_behala'],
    tags: ['Award Winning Installation', 'Pioneering Artistry', 'Haridevpur Belt'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'Visionary open-air conceptual art gallery transforming natural clay, bamboo, and terracotta into monumental sacred sculptures.'
  },

  // --- Additional Howrah Corridors ---
  {
    id: 'puja_bally_sarbojanin',
    name: 'Bally Sarbojanin Durgotsav',
    bengaliName: 'বালি সর্বজনীন',
    zone: 'HOWRAH',
    location: { latitude: 22.6510, longitude: 88.3440 },
    address: 'Grand Trunk Road, Bally, Howrah 711201',
    landmark: 'Near Bally Railway Station & Bally Khal Bridge',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_bally', 'node_belur'],
    tags: ['Howrah Heritage', 'Est. 1928', 'Grand Trunk Road', 'River Ganga Proximity'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Historic Howrah gateway puja celebrating nearly a century of unbroken traditional ekchala worship and classical music.'
  },
  {
    id: 'puja_belur_sarbojanin',
    name: 'Belur Sarbojanin Durgotsav',
    bengaliName: 'বেলুড় সর্বজনীন',
    zone: 'HOWRAH',
    location: { latitude: 22.6290, longitude: 88.3470 },
    address: 'Belur Bazar, GT Road, Howrah 711202',
    landmark: 'Near Belur Railway Station & 1 km from Belur Math',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_belur', 'node_bally'],
    tags: ['Belur Math Circuit', 'Howrah River Belt', 'Spiritual Ambiance'],
    crowdMultiplier: 1.55,
    currentThemeDescription: 'Revered spiritual festival ground known for soulful prayer rituals and traditional dokra and brass ornamentation.'
  },
  {
    id: 'puja_howrah_ramkrishnapur',
    name: 'Ramkrishnapur Sarbojanin Durgotsav',
    bengaliName: 'রামকৃষ্ণপুর সর্বজনীন',
    zone: 'HOWRAH',
    location: { latitude: 22.5760, longitude: 88.3360 },
    address: 'Ramkrishnapur Ghat Road, Howrah 711101',
    landmark: 'Near Ramkrishnapur Launch Ghat (South of Howrah Station)',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_howrah', 'node_howrah_maidan'],
    tags: ['Howrah Riverfront', 'Launch Ghat', 'Ganga Arati', 'Traditional Pratima'],
    crowdMultiplier: 1.45,
    currentThemeDescription: 'Riverside festival setting directly across the Hooghly with authentic riverfront views, evening arati, and traditional sabeki sculptures.'
  },
  {
    id: 'puja_kadamtala_sarbojanin',
    name: 'Kadamtala Sarbojanin (Central Howrah)',
    bengaliName: 'কদমতলা সর্বজনীন',
    zone: 'HOWRAH',
    location: { latitude: 22.5780, longitude: 88.3180 },
    address: 'Kadamtala, Bantra, Central Howrah 711101',
    landmark: 'Near Kadamtala Bus Stand & Narasingha Dutta College',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_howrah_maidan', 'node_shibpur'],
    tags: ['Central Howrah Hub', 'Thematic Pandal', 'Vibrant Community'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Heart of Howrah town’s festival corridor showcasing creative handloom fabrics and eco-friendly terracotta motifs.'
  },

  // --- Additional North Kolkata Landmark Pujas ---
  {
    id: 'puja_nalin_sarkar_street',
    name: 'Nalin Sarkar Street Sarbojanin',
    bengaliName: 'নলিন সরকার স্ট্রিট',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5990, longitude: 88.3755 },
    address: 'Nalin Sarkar Street, Fariapukur, Kolkata 700004',
    landmark: 'Between Hatibagan and Shyambazar Five-Point',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_shyambazar', 'node_sovabazar'],
    tags: ['North Kolkata Masterpiece', 'Fine Art Theme', 'UNESCO Listed Hub'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'Perennially award-winning artistic spectacle known for delicate filigree, wood-carved motifs, and divine idol aesthetics.'
  },
  {
    id: 'puja_telengabagan',
    name: 'Telengabagan Sarbojanin Durgotsav',
    bengaliName: 'তেলেঙ্গাবাগান সর্বজনীন',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5930, longitude: 88.3840 },
    address: 'Ultadanga Main Road, Kolkata 700067',
    landmark: 'Near Ultadanga Hudco & Bidhannagar Station',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_ultadanga', 'node_shyambazar'],
    tags: ['Ultadanga Pioneer', 'Concept Artistry', 'Handmade Architecture'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'One of Kolkata’s legendary pioneer concept pandals, employing rare natural organic materials into grand sculptural sanctuaries.'
  },
  {
    id: 'puja_dumdum_park_tarun_dal',
    name: 'Dum Dum Park Tarun Dal',
    bengaliName: 'দমদম পার্ক তরুণ দল',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.6045, longitude: 88.4075 },
    address: 'Dum Dum Park, Lake Town VIP Road Link, Kolkata 700055',
    landmark: 'Near VIP Road Dum Dum Park Crossing',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_dumdum_park', 'node_shreebhumi'],
    tags: ['VIP Road Corridor', 'Visual Extravaganza', 'Top Tourist Crowd'],
    crowdMultiplier: 1.9,
    currentThemeDescription: 'Mesmerizing contemporary installation integrating kinetic light mechanics, classical ragas, and monumental canvas painting.'
  },
  {
    id: 'puja_dumdum_park_bharat_chakra',
    name: 'Dum Dum Park Bharat Chakra',
    bengaliName: 'দমদম পার্ক ভারত চক্র',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.6060, longitude: 88.4095 },
    address: 'Dum Dum Park, Kolkata 700055',
    landmark: 'Adjacent to Tarun Dal on VIP Road corridor',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_dumdum_park', 'node_shreebhumi'],
    tags: ['Monumental Art', 'VIP Road Twin Giant', 'Artistic Illumination'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'High-concept architectural marvel blending Indian spiritual motifs with state-of-the-art ambient lighting design.'
  },

  // --- Additional Central Kolkata Landmark Pujas ---
  {
    id: 'puja_simla_bayam_samity',
    name: 'Simla Bayam Samity Durgotsav',
    bengaliName: 'শিমলা ব্যায়াম সমিতি',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5850, longitude: 88.3685 },
    address: 'Vivekananda Road, Maniktala, Kolkata 700006',
    landmark: 'Near Swami Vivekananda’s Ancestral House',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_girish_park', 'node_mg_road'],
    tags: ['Freedom Fighter Heritage', 'Est. 1926', 'Traditional Clay Pratima', 'Swadeshi Era'],
    crowdMultiplier: 1.55,
    currentThemeDescription: 'India’s celebrated freedom struggle heritage puja founded by Netaji Subhas Chandra Bose and Atindra Nath Bose, preserving authentic Swadeshi sabeki traditions.'
  },
  {
    id: 'puja_chaltabagan_lohapatty',
    name: 'Manicktala Chaltabagan Lohapatty',
    bengaliName: 'চালতাবাগান লোহাপট্টি',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5865, longitude: 88.3735 },
    address: 'Amherst Street / Vivekananda Road Link, Kolkata 700009',
    landmark: 'Near Manicktala Post Office & Girish Park',
    category: 'ILLUMINATION_LIGHT',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_girish_park', 'node_central'],
    tags: ['Dazzling Illumination', 'Glass & Brass Artistry', 'Celebrity Presence'],
    crowdMultiplier: 1.7,
    currentThemeDescription: 'Spectacular luminescence presentation renowned for handcrafted glass lanterns, brass mirrors, and traditional Dhunuchi dance contests.'
  },

  // --- Additional Salt Lake & East Kolkata Landmark Pujas ---
  {
    id: 'puja_bj_block_saltlake',
    name: 'BJ Block Sarbojanin (Salt Lake)',
    bengaliName: 'বি জে ব্লক সল্টলেক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5840, longitude: 88.4110 },
    address: 'BJ Block, Sector II, Bidhannagar, Kolkata 700091',
    landmark: 'Near Salt Lake Stadium & Karunamoyee',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_saltlake_fd', 'node_sealdah'],
    tags: ['Salt Lake Landmark', 'Grand Architectural Replica', 'Famous Food Fair'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'Colossal heritage palace replica complemented by broad wide boulevards and a sprawling Bengali food and sweets mela.'
  },
  {
    id: 'puja_aj_block_saltlake',
    name: 'AJ Block Sarbojanin (Salt Lake)',
    bengaliName: 'এ জে ব্লক সল্টলেক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5890, longitude: 88.4090 },
    address: 'AJ Block Park, Sector II, Salt Lake, Kolkata 700091',
    landmark: 'Near Salt Lake Central Park North Gate',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_saltlake_fd'],
    tags: ['Community Celebration', 'Traditional Dhaak', 'Family Friendly'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Cozy and elegant suburban park community pandal decorated with natural jute and clay flower craft.'
  },
  {
    id: 'puja_laboni_saltlake',
    name: 'Laboni Estate Durgotsab (Salt Lake)',
    bengaliName: 'লাবণী এস্টেট সল্টলেক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5940, longitude: 88.4120 },
    address: 'Laboni Estate, Sector I, Salt Lake, Kolkata 700064',
    landmark: 'Near 206 Bus Terminus & Salt Lake Island',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_saltlake_fd', 'node_ultadanga'],
    tags: ['Historic Salt Lake Estate', 'Cultural Adda', 'Sabeki Pratima'],
    crowdMultiplier: 1.45,
    currentThemeDescription: 'One of the pioneering township pujas of Salt Lake, renowned for high-spirited cultural adda and peaceful park views.'
  },

  // --- Additional South Kolkata Landmark Pujas ---
  {
    id: 'puja_hindustan_park',
    name: 'Hindustan Park Sarbojanin',
    bengaliName: 'হিন্দুস্তান পার্ক সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5195, longitude: 88.3615 },
    address: 'Hindustan Park, Gariahat, Kolkata 700029',
    landmark: 'Between Gariahat Crossing and Priya Cinema',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_gariahat', 'node_ballygunge_phari'],
    tags: ['Gariahat Cultural Epicenter', 'Avant-Garde Artisanry', 'UNESCO Circuit'],
    crowdMultiplier: 1.85,
    currentThemeDescription: 'Heart of South Kolkata’s intellectual art corridor, blending Bengali kantha embroidery and brass metalwork into a sacred sanctum.'
  },
  {
    id: 'puja_jodhpur_park',
    name: 'Jodhpur Park Sarbojanin',
    bengaliName: 'যোধপুর পার্ক সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5005, longitude: 88.3640 },
    address: 'Jodhpur Park Lake Ground, Kolkata 700068',
    landmark: 'Near South City Mall & Dhakuria Station',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['WHEELCHAIR_RAMP', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_jodhpur_park', 'node_tollygunge'],
    tags: ['Mega Park Layout', 'South City Circuit', 'Eco Architecture'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'Enormous lakeside festive campus featuring innovative biodiverse architectural pavilions and monumental clay idols.'
  },
  {
    id: 'puja_babubagan',
    name: 'Babubagan Sarbojanin (Dhakuria)',
    bengaliName: 'বাবুবাগান সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5085, longitude: 88.3685 },
    address: 'Babubagan Lane, Dhakuria, Kolkata 700031',
    landmark: 'Near Dhakuria Railway Station',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_jodhpur_park', 'node_ballygunge_station'],
    tags: ['Heritage Coin/Stamp Temple', 'Dhakuria Stalwart', 'Intricate Lighting'],
    crowdMultiplier: 1.75,
    currentThemeDescription: 'Renowned for world-record conceptual replicas created with thousands of commemorative historic Indian coins and postage stamps.'
  },
  {
    id: 'puja_bosepukur_sitala',
    name: 'Bosepukur Sitala Mandir Durgotsav',
    bengaliName: 'বোসপুকুর শীতলা মন্দির',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5160, longitude: 88.3840 },
    address: 'Bosepukur Road, Kasba, Kolkata 700042',
    landmark: 'Near Kasba Police Station & Ruby Link',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR', 'LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_ballygunge_station', 'node_gariahat'],
    tags: ['Historic Theme Pioneer', 'Matir Bhar Fame', 'South-East Landmark'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'The legendary temple grounds that revolutionized modern Durga Puja art through historic indigenous clay pot and terracotta installations.'
  },

  // --- Extended North Kolkata Heritage & Art Cluster ---
  {
    id: 'puja_kumartuli_sarbojanin',
    name: 'Kumartuli Sarbojanin Durgotsav',
    bengaliName: 'কুমারটুলী সর্বজনীন দুর্গোৎসব',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.6008, longitude: 88.3665 },
    address: '8, Banamali Sarkar Street, Kumartuli, Kolkata 700005',
    landmark: 'Historic Potters Quarters & Ghat Road',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_sovabazar', 'node_bagbazar_ghat'],
    tags: ['Artisanal Origins', 'Century Heritage', 'Clay Sculptors Quarter'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Celebrating the birthplace of Kolkata clay idols with traditional daker saaj sculpture.'
  },
  {
    id: 'puja_sikdar_bagan',
    name: 'Sikdar Bagan Sadharan Durgotsav',
    bengaliName: 'সিকদার বাগান সাধারণ দুর্গোৎসব',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5995, longitude: 88.3712 },
    address: 'Sikdar Bagan Street, Shyambazar, Kolkata 700004',
    landmark: 'Near Shyambazar 5-Point Crossing & Fariapukur',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_shyambazar'],
    tags: ['Shyambazar Art Pioneer', 'Crafted Installations', 'Heritage Street'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Ingenious architectural miniature installations created with sustainable dokra and bamboo.'
  },
  {
    id: 'puja_jagat_mukherjee_park',
    name: 'Jagat Mukherjee Park Durga Puja',
    bengaliName: 'জগৎ মুখার্জি পার্ক',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5968, longitude: 88.3698 },
    address: 'Jatindra Mohan Avenue, Sovabazar, Kolkata 700005',
    landmark: 'Near Girish Park & Shyambazar Tram Depot',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_sovabazar', 'node_shyambazar'],
    tags: ['High Conceptual Art', 'Illuminated Canopies', 'Central North'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Surrealist spatial installation recreating an ancient underwater submarine temple.'
  },
  {
    id: 'puja_pathuriaghata_ghosh_bari',
    name: 'Pathuriaghata Ghosh Bari Durga Puja',
    bengaliName: 'পাথুরিয়াঘাটা ঘোষ বাড়ি',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5912, longitude: 88.3585 },
    address: '46, Pathuriaghata Street, Kolkata 700006',
    landmark: 'Near Nimtala Ghat & Malapara Crossing',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_sovabazar', 'node_girish_park'],
    tags: ['Bonedi Bari', 'Est. 1856', 'Pillar Courtyard', 'Khelat Ghosh Estate'],
    crowdMultiplier: 1.25,
    currentThemeDescription: 'Exquisite Corinthian-columned thakur dalan with grandfather clocks and silver throne.'
  },
  {
    id: 'puja_mitra_bari',
    name: 'Dorjipara Mitra Bari Durga Puja',
    bengaliName: 'দর্জিপাড়া মিত্র বাড়ি',
    zone: 'NORTH_KOLKATA',
    location: { latitude: 22.5925, longitude: 88.3648 },
    address: '19, Nilmani Mitra Street, Dorjipara, Kolkata 700006',
    landmark: 'Near Beadon Street & Girish Park',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 25,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_girish_park', 'node_sovabazar'],
    tags: ['Aristocratic Puja', 'Est. 1807', 'Sholar Shaaj', 'Heritage Courtyard'],
    crowdMultiplier: 1.2,
    currentThemeDescription: 'Classic Nilmoni Mitra heritage courtyard famous for its pure white sholar shaaj idol and musical bhog.'
  },

  // --- Extended Central Kolkata Cluster ---
  {
    id: 'puja_bowbazar_sarbojanin',
    name: 'Bowbazar Sarbojanin Durgotsav',
    bengaliName: 'বউবাজার সর্বজনীন',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5710, longitude: 88.3595 },
    address: 'Bepin Behari Ganguly Street, Bowbazar, Kolkata 700012',
    landmark: 'Near Bowbazar Gold Market & Central Metro Gate 2',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_central', 'node_esplanade'],
    tags: ['Historic Central Stalwart', 'Traditional Prowess', 'Gold Merchant Heritage'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Century-old community celebration honoring the craftsmanship of Bengal jewelers.'
  },
  {
    id: 'puja_rani_rashmoni_bari',
    name: 'Janbazar Rani Rashmoni Bari Durga Puja',
    bengaliName: 'জানবাজার রানী রাসমণি বাড়ি',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5635, longitude: 88.3540 },
    address: '13/1, Surendranath Banerjee Road, Janbazar, Kolkata 700013',
    landmark: 'Near Dharmatala Crossing & Regal Cinema',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_esplanade'],
    tags: ['Rani Rashmoni Legacy', 'Dakshineswar Connection', 'Courtyard Bonedi', 'Est. 1790'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Sacred thakur dalan where Ramakrishna Paramahamsa worshipped the Divine Mother in Janbazar.'
  },
  {
    id: 'puja_subodh_mallick_square',
    name: 'Subodh Mallick Square Sarbojanin (Wellington)',
    bengaliName: 'সুবোধ মল্লিক স্কয়ার সর্বজনীন',
    zone: 'CENTRAL_KOLKATA',
    location: { latitude: 22.5668, longitude: 88.3590 },
    address: 'Nirmal Chandra Street, Wellington, Kolkata 700012',
    landmark: 'Near Wellington Square & Hind Inox Cinema',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_central', 'node_esplanade'],
    tags: ['Illuminated Lake Pandal', 'Heritage Park', 'Wellington Heart'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Waterfront floating pandal illuminating the heritage Wellington reservoir with fiber optics.'
  },

  // --- Extended South Kolkata Theme Stalwarts ---
  {
    id: 'puja_deshapriya_park',
    name: 'Deshapriya Park Durgotsav',
    bengaliName: 'দেশপ্রিয় পার্ক',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5185, longitude: 88.3570 },
    address: 'Rashbehari Avenue, Kalighat, Kolkata 700029',
    landmark: 'Opposite Priya Cinema, Heart of South Kolkata',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_kalighat', 'node_jodhpur_park'],
    tags: ['Colossal Monumental Pandal', 'Iconic Priya Cinema Corridor', 'Epic Illumination'],
    crowdMultiplier: 1.95,
    currentThemeDescription: 'Grand scale architectural marvel paying homage to ancient Hoysala temples with kinetic lighting.'
  },
  {
    id: 'puja_samaj_sebi_sangha',
    name: 'Samaj Sebi Sangha',
    bengaliName: 'সমাজ সেবী সংঘ',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5155, longitude: 88.3555 },
    address: 'Lake View Road, Ballygunge, Kolkata 700029',
    landmark: 'Off Southern Avenue, near Lake Kalibari',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_kalighat', 'node_jodhpur_park'],
    tags: ['Socially Conscious Art', 'Braille Inclusivity Pioneer', 'Southern Avenue'],
    crowdMultiplier: 1.6,
    currentThemeDescription: 'Sensory inclusive installation crafted for visually challenged pandal-hoppers with tactile clay hymns.'
  },
  {
    id: 'puja_shiv_mandir',
    name: 'Shiv Mandir Sarbojanin Durgotsav',
    bengaliName: 'শিব মন্দির সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5120, longitude: 88.3512 },
    address: 'Lake Temple Road, Mudiali, Kolkata 700029',
    landmark: 'Opposite Menoka Cinema & Rabindra Sarobar Lake',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_kalighat', 'node_rabindra_sarobar'],
    tags: ['Lakeside Theme Landmark', 'Serene Aesthetics', 'Mudiali Triangle'],
    crowdMultiplier: 1.65,
    currentThemeDescription: 'Lakeside meditative bamboo pavilion reflecting twilight rays off Rabindra Sarobar.'
  },
  {
    id: 'puja_66_pally',
    name: '66 Pally Club Durga Puja',
    bengaliName: '৬৬ পল্লী',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5225, longitude: 88.3440 },
    address: 'Nepal Bhattacharjee Street, Kalighat, Kolkata 700026',
    landmark: 'Near Kalighat Tram Depot & Metro',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_kalighat', 'node_hazra'],
    tags: ['Kalighat Theme Giant', 'Experimental Materials', 'Female Priests Pioneer'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Pioneering social harmony with woman priest pujas and upcycled terracotta installations.'
  },
  {
    id: 'puja_selimpur_pally',
    name: 'Selimpur Pally Durgotsav',
    bengaliName: 'সেলিমপুর পল্লী',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.5045, longitude: 88.3685 },
    address: 'Selimpur Road, Dhakuria, Kolkata 700031',
    landmark: 'Near Dhakuria Railway Bridge & Jadavpur Crossing',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_jodhpur_park'],
    tags: ['Dhakuria Cluster', 'Ingenious Spatial Theme', 'Environmental Focus'],
    crowdMultiplier: 1.5,
    currentThemeDescription: 'Eco-conscious pavilion woven entirely with natural river reeds, jute ropes, and clay earthen lanterns.'
  },
  {
    id: 'puja_95_pally',
    name: '95 Pally Jodhpur Park',
    bengaliName: '৯৫ পল্লী যোধপুর পার্ক',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4988, longitude: 88.3630 },
    address: 'Jodhpur Park Broad Street, Kolkata 700068',
    landmark: 'Opposite Jodhpur Park Girls High School',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_jodhpur_park'],
    tags: ['Jodhpur Park Hub', 'Abstract Sculptures', 'Serene South'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Modernist wooden origami motifs blending traditional Bengali folklore with geometry.'
  },
  {
    id: 'puja_golf_green',
    name: 'Golf Green Sarbojanin Durgotsav',
    bengaliName: 'গল্ফ গ্রীন সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4895, longitude: 88.3580 },
    address: 'Central Park Phase 2, Golf Green, Kolkata 700095',
    landmark: 'Near Doordarshan Kendra & Golf Green Hub',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_jodhpur_park', 'node_naktala'],
    tags: ['Lush Parkland Setting', 'Wide Open Promenades', 'Family Favorite'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Serene botanical landscape celebrating natural foliage with open-air Dhunuchi dances.'
  },
  {
    id: 'puja_haridevpur_41_pally',
    name: 'Haridevpur 41 Pally Club',
    bengaliName: 'হরিদেবপুর ৪১ পল্লী',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4810, longitude: 88.3265 },
    address: 'Motilal Gupta Road, Haridevpur, Kolkata 700082',
    landmark: 'Near Haridevpur Police Station & Kabiraji More',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_haridevpur', 'node_behala'],
    tags: ['Haridevpur Heavyweight', 'Sensational Visual Narrative', 'South Suburb Art'],
    crowdMultiplier: 1.55,
    currentThemeDescription: 'A gripping audio-visual experiential tunnel chronicling rural craftsmanship through moving shadow puppets.'
  },

  // --- Extended East Kolkata, Salt Lake & VIP Road ---
  {
    id: 'puja_lake_town_adhibasi',
    name: 'Lake Town Adhibasi Brinda',
    bengaliName: 'লেক টাউন অধিবাসী বৃন্দ',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.6015, longitude: 88.4010 },
    address: 'Block B Ground, Lake Town, Kolkata 700089',
    landmark: 'Near Jaya Cinema & VIP Road Crossing',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_shreebhumi', 'node_dumdum_park'],
    tags: ['VIP Road Showcase', 'Award Winning Themes', 'Lake Town Stalwart'],
    crowdMultiplier: 1.7,
    currentThemeDescription: 'Monumental replica of Himalayan wooden monasteries carved with pine wood and Buddhist prayer wheels.'
  },
  {
    id: 'puja_dumdum_park_tarun_sangha',
    name: 'Dum Dum Park Tarun Sangha',
    bengaliName: 'দমদম পার্ক তরুণ সংঘ',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.6075, longitude: 88.4095 },
    address: 'Tank 3, Dum Dum Park, Kolkata 700055',
    landmark: 'Near VIP Road Dum Dum Park Bridge',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 40,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_dumdum_park', 'node_shreebhumi'],
    tags: ['Dum Dum Park Trinity', 'Folk Art Innovation', 'Luminescent Decor'],
    crowdMultiplier: 1.65,
    currentThemeDescription: 'Illuminated tribal bamboo lattice mandap reflecting over water body with traditional Chhau masks.'
  },
  {
    id: 'puja_ak_block_saltlake',
    name: 'Salt Lake AK Block Sarbojanin',
    bengaliName: 'সল্টলেক একে ব্লক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5855, longitude: 88.4215 },
    address: 'AK Block Community Ground, Sector 2, Bidhannagar 700091',
    landmark: 'Near Karunamoyee Bus Station & Central Park Metro',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_saltlake_fd'],
    tags: ['Salt Lake Landmark', 'Wide Boulevard Access', 'Safe Family Pandal'],
    crowdMultiplier: 1.45,
    currentThemeDescription: 'Stately white marble temple replica set amidst lush Sector 2 gardens.'
  },
  {
    id: 'puja_cf_block_saltlake',
    name: 'Salt Lake CF Block Sarbojanin',
    bengaliName: 'সল্টলেক সিএফ ব্লক',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.5910, longitude: 88.4120 },
    address: 'CF Block Park, Sector 1, Bidhannagar 700064',
    landmark: 'Near Salt Lake Swimming Pool & CA Island',
    category: 'ART_THEMATIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_saltlake_fd', 'node_ultadanga'],
    tags: ['Artistic Salt Lake', 'Intimate Community Atmosphere', 'Quiet Elegance'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Folk art pavilion designed with earthen clay pottery, conch shells, and handloom cotton fabric.'
  },
  {
    id: 'puja_new_town_sarbojanin',
    name: 'New Town Sarbojanin Durgotsav',
    bengaliName: 'নিউ টাউন সর্বজনীন',
    zone: 'EAST_KOLKATA',
    location: { latitude: 22.6225, longitude: 88.4520 },
    address: 'City Centre 2 Ground, Major Arterial Road, New Town 700136',
    landmark: 'Near City Centre 2 Mall & Chinar Park',
    category: 'CROWD_PULLER_MEGA',
    typicalDwellMinutes: 45,
    hasVipPassAccess: true,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH', 'PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_saltlake_fd', 'node_dumdum_park'],
    tags: ['New Town Gateway', 'Modern Mega Arena', 'Vast Parking & Broad Boulevards'],
    crowdMultiplier: 1.8,
    currentThemeDescription: 'Modernist grand canopy showcasing cosmic celestial energy with kinetic laser mapping and sacred chimes.'
  },

  // --- Extended Howrah, Shibpur & Suburban Clusters ---
  {
    id: 'puja_chatterjeehat_sarbojanin',
    name: 'Chatterjeehat Sarbojanin Durgotsav',
    bengaliName: 'চ্যাটার্জিহাট সর্বজনীন',
    zone: 'HOWRAH',
    location: { latitude: 22.5695, longitude: 88.3180 },
    address: 'Netaji Subhas Road, Chatterjeehat, Shibpur, Howrah 711104',
    landmark: 'Near Mandirtala Vidyasagar Setu Tollway & Nabanna',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_shibpur', 'node_howrah_maidan'],
    tags: ['Shibpur Stalwart', 'Centenary Heritage', 'Howrah Grandeur'],
    crowdMultiplier: 1.4,
    currentThemeDescription: 'Traditional Sabeki pratima with gold and silver zari ornamentation in a heritage howrah community square.'
  },
  {
    id: 'puja_howrah_sanatan_dharmasabha',
    name: 'Howrah Sanatan Dharmasabha Harisabha',
    bengaliName: 'হাওড়া সনাতন ধর্মসভা',
    zone: 'HOWRAH',
    location: { latitude: 22.5780, longitude: 88.3305 },
    address: 'G.T. Road South, Howrah 711101',
    landmark: 'Near Howrah Court & Fire Service Station',
    category: 'HERITAGE_BONEDI',
    typicalDwellMinutes: 30,
    hasVipPassAccess: true,
    accessibilityFeatures: ['PRIORITY_QUEUE_SENIOR'],
    nearestTransitNodeIds: ['node_howrah', 'node_howrah_maidan'],
    tags: ['Central Howrah Heritage', 'Est. 1928', 'Dharmasabha Courtyard'],
    crowdMultiplier: 1.35,
    currentThemeDescription: 'Centuries of classical Sanskrit chanting, traditional brass bells, and authentic Vaishnava-Shakta harmony.'
  },
  {
    id: 'puja_pujali_sarbojanin',
    name: 'Pujali Municipal Park Sarbojanin',
    bengaliName: 'পূজালী পৌর পার্ক সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4680, longitude: 88.1620 },
    address: 'Pujali Trunk Road, Budge Budge, South 24 Parganas 700138',
    landmark: 'Near Hooghly Riverbank & Pujali Rajbari Ghat',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 35,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_budge_budge'],
    tags: ['Ganges Riverfront', 'Budge Budge Suburban Anchor', 'Folk Mela Fair'],
    crowdMultiplier: 1.25,
    currentThemeDescription: 'Riverside festival ground featuring artisanal boat-making folklore and nighttime Ganga aarti.'
  },
  {
    id: 'puja_nangi_kalibari',
    name: 'Nangi Kalibari Sarbojanin Durgotsav',
    bengaliName: 'নাঙ্গী কালীবাড়ি সর্বজনীন',
    zone: 'SOUTH_KOLKATA',
    location: { latitude: 22.4980, longitude: 88.2250 },
    address: 'Nangi Station Road, Batanagar, South 24 Parganas 700140',
    landmark: 'Near Nangi Railway Station & Batanagar Flyover',
    category: 'COMMUNITY_ICONIC',
    typicalDwellMinutes: 30,
    hasVipPassAccess: false,
    accessibilityFeatures: ['LEVEL_GROUND_APPROACH'],
    nearestTransitNodeIds: ['node_batanagar', 'node_budge_budge'],
    tags: ['Batanagar-Nangi Hub', 'Local Heritage', 'Suburban Railway Access'],
    crowdMultiplier: 1.3,
    currentThemeDescription: 'Sprawling temple grounds with authentic clay idol crafting and community bhog distributions.'
  }
];

// ==========================================
// 3. Kolkata Transit Connections (Bidirectional & Multimodal)
// ==========================================

export const MOCK_TRANSIT_CONNECTIONS: readonly TransitConnection[] = [
  // --- Metro Green Line (Howrah <-> Esplanade <-> Sealdah) ---
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_esplanade',
    mode: 'METRO_GREEN',
    distanceMeters: 4800,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_howrah',
    mode: 'METRO_GREEN',
    distanceMeters: 4800,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_sealdah',
    toNodeId: 'node_esplanade',
    mode: 'METRO_GREEN',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_sealdah',
    mode: 'METRO_GREEN',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },

  // --- Metro Blue Line (Shyambazar <-> Sovabazar <-> Girish Park <-> MG Road <-> Central <-> Esplanade <-> Park St <-> Rabindra Sadan <-> Hazra <-> Kalighat) ---
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_sovabazar',
    mode: 'METRO_BLUE',
    distanceMeters: 1000,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_sovabazar',
    toNodeId: 'node_shyambazar',
    mode: 'METRO_BLUE',
    distanceMeters: 1000,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_sovabazar',
    toNodeId: 'node_girish_park',
    mode: 'METRO_BLUE',
    distanceMeters: 1100,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_girish_park',
    toNodeId: 'node_sovabazar',
    mode: 'METRO_BLUE',
    distanceMeters: 1100,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_girish_park',
    toNodeId: 'node_mg_road',
    mode: 'METRO_BLUE',
    distanceMeters: 1000,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_mg_road',
    toNodeId: 'node_girish_park',
    mode: 'METRO_BLUE',
    distanceMeters: 1000,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_mg_road',
    toNodeId: 'node_central',
    mode: 'METRO_BLUE',
    distanceMeters: 1100,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_central',
    toNodeId: 'node_mg_road',
    mode: 'METRO_BLUE',
    distanceMeters: 1100,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_central',
    toNodeId: 'node_esplanade',
    mode: 'METRO_BLUE',
    distanceMeters: 1200,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_central',
    mode: 'METRO_BLUE',
    distanceMeters: 1200,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_park_street',
    mode: 'METRO_BLUE',
    distanceMeters: 1300,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_park_street',
    toNodeId: 'node_esplanade',
    mode: 'METRO_BLUE',
    distanceMeters: 1300,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_park_street',
    toNodeId: 'node_rabindra_sadan',
    mode: 'METRO_BLUE',
    distanceMeters: 1400,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_rabindra_sadan',
    toNodeId: 'node_park_street',
    mode: 'METRO_BLUE',
    distanceMeters: 1400,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_rabindra_sadan',
    toNodeId: 'node_hazra',
    mode: 'METRO_BLUE',
    distanceMeters: 1600,
    typicalDurationMinutes: 5,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_hazra',
    toNodeId: 'node_rabindra_sadan',
    mode: 'METRO_BLUE',
    distanceMeters: 1600,
    typicalDurationMinutes: 5,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_hazra',
    toNodeId: 'node_kalighat',
    mode: 'METRO_BLUE',
    distanceMeters: 900,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_kalighat',
    toNodeId: 'node_hazra',
    mode: 'METRO_BLUE',
    distanceMeters: 900,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_kalighat',
    toNodeId: 'node_rabindra_sarobar',
    mode: 'METRO_BLUE',
    distanceMeters: 700,
    typicalDurationMinutes: 2,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_rabindra_sarobar',
    toNodeId: 'node_kalighat',
    mode: 'METRO_BLUE',
    distanceMeters: 700,
    typicalDurationMinutes: 2,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_rabindra_sarobar',
    toNodeId: 'node_tollygunge',
    mode: 'METRO_BLUE',
    distanceMeters: 1400,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_tollygunge',
    toNodeId: 'node_rabindra_sarobar',
    mode: 'METRO_BLUE',
    distanceMeters: 1400,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_tollygunge',
    toNodeId: 'node_taratala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1900,
    typicalDurationMinutes: 12,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_taratala',
    toNodeId: 'node_tollygunge',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1900,
    typicalDurationMinutes: 12,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_rabindra_sarobar',
    toNodeId: 'node_gariahat',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2100,
    typicalDurationMinutes: 14,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_gariahat',
    toNodeId: 'node_rabindra_sarobar',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2100,
    typicalDurationMinutes: 14,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },

  // --- Walking Connections (Festive corridors) ---
  {
    fromNodeId: 'node_sealdah',
    toNodeId: 'node_central',
    mode: 'WALK',
    distanceMeters: 950,
    typicalDurationMinutes: 14,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_central',
    toNodeId: 'node_sealdah',
    mode: 'WALK',
    distanceMeters: 950,
    typicalDurationMinutes: 14,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_bagbazar_ghat',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 11,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_bagbazar_ghat',
    toNodeId: 'node_shyambazar',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 11,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },

  // --- Auto-Rickshaw Routes (Shared Festive Routes) ---
  {
    fromNodeId: 'node_kalighat',
    toNodeId: 'node_gariahat',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2300,
    typicalDurationMinutes: 15,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_gariahat',
    toNodeId: 'node_kalighat',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2300,
    typicalDurationMinutes: 15,
    estimatedCostInr: 20,
    frequencyMinutes: 5,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_gariahat',
    toNodeId: 'node_ballygunge_phari',
    mode: 'WALK',
    distanceMeters: 1100,
    typicalDurationMinutes: 15,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_ballygunge_phari',
    toNodeId: 'node_gariahat',
    mode: 'WALK',
    distanceMeters: 1100,
    typicalDurationMinutes: 15,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_hazra',
    toNodeId: 'node_ballygunge_phari',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2100,
    typicalDurationMinutes: 14,
    estimatedCostInr: 20,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_ballygunge_phari',
    toNodeId: 'node_hazra',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2100,
    typicalDurationMinutes: 14,
    estimatedCostInr: 20,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_kalighat',
    toNodeId: 'node_taratala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 3100,
    typicalDurationMinutes: 18,
    estimatedCostInr: 25,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_taratala',
    toNodeId: 'node_kalighat',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 3100,
    typicalDurationMinutes: 18,
    estimatedCostInr: 25,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_sealdah',
    toNodeId: 'node_mg_road',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1800,
    typicalDurationMinutes: 16,
    estimatedCostInr: 25,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_mg_road',
    toNodeId: 'node_sealdah',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1800,
    typicalDurationMinutes: 16,
    estimatedCostInr: 25,
    festivalTrafficSensitive: true
  },

  // --- Budge Budge & Majerhat Suburban Corridor ---
  {
    fromNodeId: 'node_budge_budge',
    toNodeId: 'node_majerhat',
    mode: 'BUS_CSTC',
    distanceMeters: 13800,
    typicalDurationMinutes: 24,
    estimatedCostInr: 15,
    serviceHours: { start: '05:30', end: '23:30' },
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_majerhat',
    toNodeId: 'node_budge_budge',
    mode: 'BUS_CSTC',
    distanceMeters: 13800,
    typicalDurationMinutes: 24,
    estimatedCostInr: 15,
    serviceHours: { start: '05:30', end: '23:30' },
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_majerhat',
    toNodeId: 'node_taratala',
    mode: 'WALK',
    distanceMeters: 600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_taratala',
    toNodeId: 'node_majerhat',
    mode: 'WALK',
    distanceMeters: 600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_taratala',
    toNodeId: 'node_chetla',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 10,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_chetla',
    toNodeId: 'node_taratala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 10,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_chetla',
    toNodeId: 'node_kalighat',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 10,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_kalighat',
    toNodeId: 'node_chetla',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 10,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },

  // --- Howrah Maidan Extension (Metro Green Line) ---
  {
    fromNodeId: 'node_howrah_maidan',
    toNodeId: 'node_howrah',
    mode: 'METRO_GREEN',
    distanceMeters: 1200,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_howrah_maidan',
    mode: 'METRO_GREEN',
    distanceMeters: 1200,
    typicalDurationMinutes: 3,
    estimatedCostInr: 5,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_bagbazar_ghat',
    mode: 'BUS_CSTC',
    distanceMeters: 4200,
    typicalDurationMinutes: 18,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_bagbazar_ghat',
    toNodeId: 'node_howrah',
    mode: 'BUS_CSTC',
    distanceMeters: 4200,
    typicalDurationMinutes: 18,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },

  // --- Sreebhumi / VIP Road Arterial Link ---
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_shreebhumi',
    mode: 'BUS_CSTC',
    distanceMeters: 3600,
    typicalDurationMinutes: 14,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_shreebhumi',
    toNodeId: 'node_shyambazar',
    mode: 'BUS_CSTC',
    distanceMeters: 3600,
    typicalDurationMinutes: 14,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },

  // --- Naktala (South Metro Extension) ---
  {
    fromNodeId: 'node_tollygunge',
    toNodeId: 'node_naktala',
    mode: 'METRO_BLUE',
    distanceMeters: 2200,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_naktala',
    toNodeId: 'node_tollygunge',
    mode: 'METRO_BLUE',
    distanceMeters: 2200,
    typicalDurationMinutes: 4,
    estimatedCostInr: 5,
    serviceHours: { start: '06:00', end: '23:59' },
    festivalTrafficSensitive: false
  },

  // --- Ballygunge Station Link ---
  {
    fromNodeId: 'node_ballygunge_phari',
    toNodeId: 'node_ballygunge_station',
    mode: 'WALK',
    distanceMeters: 650,
    typicalDurationMinutes: 9,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_ballygunge_station',
    toNodeId: 'node_ballygunge_phari',
    mode: 'WALK',
    distanceMeters: 650,
    typicalDurationMinutes: 9,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },

  // --- Howrah Station <-> Salkia Corridor ---
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_salkia',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_salkia',
    toNodeId: 'node_howrah',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },

  // --- Howrah Station / Maidan <-> Shibpur Mandirtala ---
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_shibpur',
    mode: 'BUS_CSTC',
    distanceMeters: 3200,
    typicalDurationMinutes: 12,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_shibpur',
    toNodeId: 'node_howrah',
    mode: 'BUS_CSTC',
    distanceMeters: 3200,
    typicalDurationMinutes: 12,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_howrah_maidan',
    toNodeId: 'node_shibpur',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2200,
    typicalDurationMinutes: 9,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_shibpur',
    toNodeId: 'node_howrah_maidan',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2200,
    typicalDurationMinutes: 9,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },

  // --- Shibpur (Vidyasagar Setu) <-> Esplanade / Central ---
  {
    fromNodeId: 'node_shibpur',
    toNodeId: 'node_esplanade',
    mode: 'BUS_CSTC',
    distanceMeters: 5200,
    typicalDurationMinutes: 14,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_shibpur',
    mode: 'BUS_CSTC',
    distanceMeters: 5200,
    typicalDurationMinutes: 14,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },

  // --- Behala Chowrasta <-> Taratala / Majerhat ---
  {
    fromNodeId: 'node_taratala',
    toNodeId: 'node_behala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1400,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_behala',
    toNodeId: 'node_taratala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1400,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_majerhat',
    toNodeId: 'node_behala',
    mode: 'BUS_CSTC',
    distanceMeters: 2200,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_behala',
    toNodeId: 'node_majerhat',
    mode: 'BUS_CSTC',
    distanceMeters: 2200,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },

  // --- Behala Chowrasta <-> Budge Budge Suburban Arterial ---
  {
    fromNodeId: 'node_behala',
    toNodeId: 'node_budge_budge',
    mode: 'BUS_CSTC',
    distanceMeters: 12200,
    typicalDurationMinutes: 20,
    estimatedCostInr: 15,
    serviceHours: { start: '05:30', end: '23:30' },
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_budge_budge',
    toNodeId: 'node_behala',
    mode: 'BUS_CSTC',
    distanceMeters: 12200,
    typicalDurationMinutes: 20,
    estimatedCostInr: 15,
    serviceHours: { start: '05:30', end: '23:30' },
    festivalTrafficSensitive: true
  },

  // --- Shyambazar <-> Tala Park ---
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_tala',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 9,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_tala',
    toNodeId: 'node_shyambazar',
    mode: 'WALK',
    distanceMeters: 750,
    typicalDurationMinutes: 9,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },

  // --- Sealdah & Esplanade <-> Salt Lake Central Park / FD Block (Green Line) ---
  {
    fromNodeId: 'node_sealdah',
    toNodeId: 'node_saltlake_fd',
    mode: 'METRO_GREEN',
    distanceMeters: 5200,
    typicalDurationMinutes: 10,
    estimatedCostInr: 15,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_saltlake_fd',
    toNodeId: 'node_sealdah',
    mode: 'METRO_GREEN',
    distanceMeters: 5200,
    typicalDurationMinutes: 10,
    estimatedCostInr: 15,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_esplanade',
    toNodeId: 'node_saltlake_fd',
    mode: 'METRO_GREEN',
    distanceMeters: 7600,
    typicalDurationMinutes: 15,
    estimatedCostInr: 20,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_saltlake_fd',
    toNodeId: 'node_esplanade',
    mode: 'METRO_GREEN',
    distanceMeters: 7600,
    typicalDurationMinutes: 15,
    estimatedCostInr: 20,
    serviceHours: { start: '06:30', end: '23:45' },
    festivalTrafficSensitive: false
  },

  // --- Batanagar <-> Budge Budge & Behala Corridors ---
  {
    fromNodeId: 'node_batanagar',
    toNodeId: 'node_budge_budge',
    mode: 'BUS_CSTC',
    distanceMeters: 4500,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_budge_budge',
    toNodeId: 'node_batanagar',
    mode: 'BUS_CSTC',
    distanceMeters: 4500,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_batanagar',
    toNodeId: 'node_behala',
    mode: 'BUS_CSTC',
    distanceMeters: 7500,
    typicalDurationMinutes: 14,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_behala',
    toNodeId: 'node_batanagar',
    mode: 'BUS_CSTC',
    distanceMeters: 7500,
    typicalDurationMinutes: 14,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },

  // --- Bally & Belur <-> Howrah / North Kolkata ---
  {
    fromNodeId: 'node_bally',
    toNodeId: 'node_belur',
    mode: 'BUS_CSTC',
    distanceMeters: 2200,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_belur',
    toNodeId: 'node_bally',
    mode: 'BUS_CSTC',
    distanceMeters: 2200,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_belur',
    toNodeId: 'node_salkia',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 3400,
    typicalDurationMinutes: 10,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_salkia',
    toNodeId: 'node_belur',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 3400,
    typicalDurationMinutes: 10,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_belur',
    toNodeId: 'node_howrah',
    mode: 'BUS_CSTC',
    distanceMeters: 5600,
    typicalDurationMinutes: 13,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_howrah',
    toNodeId: 'node_belur',
    mode: 'BUS_CSTC',
    distanceMeters: 5600,
    typicalDurationMinutes: 13,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_bally',
    toNodeId: 'node_shyambazar',
    mode: 'BUS_CSTC',
    distanceMeters: 6200,
    typicalDurationMinutes: 18,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_bally',
    mode: 'BUS_CSTC',
    distanceMeters: 6200,
    typicalDurationMinutes: 18,
    estimatedCostInr: 15,
    festivalTrafficSensitive: true
  },

  // --- Jodhpur Park & Dhakuria <-> South Kolkata Metro & Gariahat ---
  {
    fromNodeId: 'node_jodhpur_park',
    toNodeId: 'node_gariahat',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2200,
    typicalDurationMinutes: 7,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_gariahat',
    toNodeId: 'node_jodhpur_park',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2200,
    typicalDurationMinutes: 7,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_jodhpur_park',
    toNodeId: 'node_tollygunge',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2000,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_tollygunge',
    toNodeId: 'node_jodhpur_park',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2000,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_jodhpur_park',
    toNodeId: 'node_ballygunge_station',
    mode: 'WALK',
    distanceMeters: 1400,
    typicalDurationMinutes: 16,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_ballygunge_station',
    toNodeId: 'node_jodhpur_park',
    mode: 'WALK',
    distanceMeters: 1400,
    typicalDurationMinutes: 16,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },

  // --- Dum Dum Park & Ultadanga <-> Shreebhumi & North/East ---
  {
    fromNodeId: 'node_dumdum_park',
    toNodeId: 'node_shreebhumi',
    mode: 'WALK',
    distanceMeters: 1100,
    typicalDurationMinutes: 12,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_shreebhumi',
    toNodeId: 'node_dumdum_park',
    mode: 'WALK',
    distanceMeters: 1100,
    typicalDurationMinutes: 12,
    estimatedCostInr: 0,
    festivalTrafficSensitive: false
  },
  {
    fromNodeId: 'node_dumdum_park',
    toNodeId: 'node_ultadanga',
    mode: 'BUS_CSTC',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_ultadanga',
    toNodeId: 'node_dumdum_park',
    mode: 'BUS_CSTC',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_ultadanga',
    toNodeId: 'node_shyambazar',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2000,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_shyambazar',
    toNodeId: 'node_ultadanga',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2000,
    typicalDurationMinutes: 7,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_ultadanga',
    toNodeId: 'node_saltlake_fd',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_saltlake_fd',
    toNodeId: 'node_ultadanga',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2600,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_ultadanga',
    toNodeId: 'node_sealdah',
    mode: 'BUS_CSTC',
    distanceMeters: 3800,
    typicalDurationMinutes: 10,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_sealdah',
    toNodeId: 'node_ultadanga',
    mode: 'BUS_CSTC',
    distanceMeters: 3800,
    typicalDurationMinutes: 10,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },

  // --- Haridevpur <-> Behala & Tollygunge ---
  {
    fromNodeId: 'node_haridevpur',
    toNodeId: 'node_behala',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_behala',
    toNodeId: 'node_haridevpur',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 1600,
    typicalDurationMinutes: 6,
    estimatedCostInr: 10,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_haridevpur',
    toNodeId: 'node_tollygunge',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  },
  {
    fromNodeId: 'node_tollygunge',
    toNodeId: 'node_haridevpur',
    mode: 'AUTO_RICKSHAW',
    distanceMeters: 2400,
    typicalDurationMinutes: 8,
    estimatedCostInr: 12,
    festivalTrafficSensitive: true
  }
];

// ==========================================
// 4. Authentic Kolkata Food Spots
// ==========================================

export const MOCK_FOOD_PLACES: readonly FoodPlace[] = [
  {
    id: 'food_bhojohori_manna_sealdah',
    name: 'Bhojohori Manna (Bowbazar / Sealdah)',
    location: { latitude: 22.5695, longitude: 88.3654 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'MID_RANGE',
    averageCostPerPersonInr: 280,
    averageDiningMinutes: 40,
    popularDishes: ['Bhetki Paturi', 'Kosha Mangsho', 'Basanti Pulao', 'Chholar Dal'],
    nearestTransitNodeId: 'node_central',
    isVegetarianFriendly: true
  },
  {
    id: 'food_paramount_sherbet',
    name: 'Paramount Sherbets & Syrups (College Street)',
    location: { latitude: 22.5742, longitude: 88.3635 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'BUDGET_STREET',
    averageCostPerPersonInr: 90,
    averageDiningMinutes: 20,
    popularDishes: ['Daab Sherbet', 'Kesar Malai', 'Passion Fruit Cooler'],
    nearestTransitNodeId: 'node_mg_road',
    isVegetarianFriendly: true
  },
  {
    id: 'food_mitra_cafe_sovabazar',
    name: 'Mitra Cafe (Sovabazar Metro Gate)',
    location: { latitude: 22.5982, longitude: 88.3670 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'BUDGET_STREET',
    averageCostPerPersonInr: 160,
    averageDiningMinutes: 30,
    popularDishes: ['Brain Chop', 'Diamond Fish Fry', 'Mutton Kabiraji', 'Mughlai Paratha'],
    nearestTransitNodeId: 'node_sovabazar',
    isVegetarianFriendly: false
  },
  {
    id: 'food_bedouin_rolls_gariahat',
    name: 'Bedouin Kathi Roll Corner (Gariahat)',
    location: { latitude: 22.5182, longitude: 88.3655 },
    cuisine: 'KOLKATA_STREET_FOOD',
    budgetTier: 'BUDGET_STREET',
    averageCostPerPersonInr: 110,
    averageDiningMinutes: 20,
    popularDishes: ['Double Egg Chicken Roll', 'Paneer Kathi Roll', 'Mutton Tikka'],
    nearestTransitNodeId: 'node_gariahat',
    isVegetarianFriendly: true
  },
  {
    id: 'food_6_ballygunge_place',
    name: '6 Ballygunge Place (Ballygunge)',
    location: { latitude: 22.5270, longitude: 88.3630 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'PREMIUM',
    averageCostPerPersonInr: 550,
    averageDiningMinutes: 55,
    popularDishes: ['Ilish Bhapa', 'Daab Chingri', 'Posto Bora', 'Nolen Gurer Ice Cream'],
    nearestTransitNodeId: 'node_gariahat',
    isVegetarianFriendly: true
  },
  {
    id: 'food_golbari_shyambazar',
    name: 'Golbari (Shyambazar Five-Point)',
    location: { latitude: 22.6044, longitude: 88.3715 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'MID_RANGE',
    averageCostPerPersonInr: 240,
    averageDiningMinutes: 35,
    popularDishes: ['Kosha Mangsho', 'Soft Bengali Paratha', 'Tamarind Chutney'],
    nearestTransitNodeId: 'node_shyambazar',
    isVegetarianFriendly: false
  },
  {
    id: 'food_anadi_cabin_esplanade',
    name: 'Anadi Cabin (SN Banerjee Road, Esplanade)',
    location: { latitude: 22.5638, longitude: 88.3530 },
    cuisine: 'BENGALI_TRADITIONAL',
    budgetTier: 'BUDGET_STREET',
    averageCostPerPersonInr: 130,
    averageDiningMinutes: 25,
    popularDishes: ['Special Moglai Paratha', 'Duck Egg Moglai', 'Aloo Dum'],
    nearestTransitNodeId: 'node_esplanade',
    isVegetarianFriendly: false
  }
];

// ==========================================
// 5. Emergency & Civic Facilities
// ==========================================

export const MOCK_FACILITIES: readonly Facility[] = [
  {
    id: 'fac_police_sealdah',
    type: 'POLICE_ASSISTANCE_BOOTH',
    name: 'Kolkata Police Festival Assistance Booth - Sealdah Main',
    location: { latitude: 22.5678, longitude: 88.3710 },
    contactPhone: '100 / 033-2214-5000',
    is24x7: true
  },
  {
    id: 'fac_medical_college_sq',
    type: 'MEDICAL_FIRST_AID',
    name: 'Medical Camp & Ambulance Booth - College Square',
    location: { latitude: 22.5744, longitude: 88.3640 },
    associatedPujaId: 'puja_college_square',
    contactPhone: '102',
    is24x7: true
  },
  {
    id: 'fac_water_santosh_mitra',
    type: 'DRINKING_WATER_KIOSK',
    name: 'KMC Filtered Drinking Water Station - Lebutala',
    location: { latitude: 22.5689, longitude: 88.3670 },
    associatedPujaId: 'puja_santosh_mitra_square',
    is24x7: true
  },
  {
    id: 'fac_toilet_sovabazar',
    type: 'PUBLIC_TOILET',
    name: 'KMC Swachh Public Convenience & Sanitized Restroom',
    location: { latitude: 22.5980, longitude: 88.3665 },
    associatedPujaId: 'puja_sovabazar_rajbari',
    is24x7: false
  },
  {
    id: 'fac_police_bagbazar',
    type: 'POLICE_ASSISTANCE_BOOTH',
    name: 'Kolkata Police Rapid Assistance Post - Bagbazar Ghat',
    location: { latitude: 22.6028, longitude: 88.3685 },
    associatedPujaId: 'puja_bagbazar',
    contactPhone: '100',
    is24x7: true
  },
  {
    id: 'fac_medical_ekdalia',
    type: 'MEDICAL_FIRST_AID',
    name: 'St. John Ambulance First Aid & ORS Booth - Gariahat',
    location: { latitude: 22.5184, longitude: 88.3680 },
    associatedPujaId: 'puja_ekdalia_evergreen',
    contactPhone: '102',
    is24x7: true
  },
  {
    id: 'fac_lost_found_maddox',
    type: 'LOST_AND_FOUND',
    name: 'Community Lost & Found Assistance Desk - Maddox Square',
    location: { latitude: 22.5280, longitude: 88.3580 },
    associatedPujaId: 'puja_maddox_square',
    is24x7: true
  },
  {
    id: 'fac_medical_sreebhumi',
    type: 'MEDICAL_FIRST_AID',
    name: 'Apollo Emergency Trauma Care Booth - Sreebhumi VIP Road',
    location: { latitude: 22.5978, longitude: 88.4038 },
    associatedPujaId: 'puja_sreebhumi',
    contactPhone: '1066',
    is24x7: true
  },
  {
    id: 'fac_police_chetla',
    type: 'POLICE_ASSISTANCE_BOOTH',
    name: 'Kolkata Police Help Post - Chetla Agrani',
    location: { latitude: 22.5168, longitude: 88.3388 },
    associatedPujaId: 'puja_chetla_agrani',
    contactPhone: '100',
    is24x7: true
  },
  {
    id: 'fac_police_ballygunge',
    type: 'POLICE_ASSISTANCE_BOOTH',
    name: 'Kolkata Police May I Help You - Ballygunge Cultural',
    location: { latitude: 22.5228, longitude: 88.3628 },
    associatedPujaId: 'puja_ballygunge_cultural',
    contactPhone: '100',
    is24x7: true
  },
  {
    id: 'fac_medical_naktala',
    type: 'MEDICAL_FIRST_AID',
    name: 'Peerless Hospital First Aid Center - Naktala Udayan',
    location: { latitude: 22.4738, longitude: 88.3648 },
    associatedPujaId: 'puja_naktala_udayan',
    contactPhone: '102',
    is24x7: true
  },
  {
    id: 'fac_water_ahiritola',
    type: 'DRINKING_WATER_KIOSK',
    name: 'KMC Filtered Water Post - Ahiritola Riverfront',
    location: { latitude: 22.5958, longitude: 88.3612 },
    associatedPujaId: 'puja_ahiritola',
    is24x7: true
  },
  {
    id: 'fac_medical_budge_budge',
    type: 'MEDICAL_FIRST_AID',
    name: 'Budge Budge Municipality First Aid Unit',
    location: { latitude: 22.4838, longitude: 88.1828 },
    associatedPujaId: 'puja_budge_budge',
    contactPhone: '102',
    is24x7: true
  }
];

// ==========================================
// 6. Dynamic Mock Statuses (Explicitly Marked Simulated)
// ==========================================

export const MOCK_CROWD_STATUSES: Record<string, CrowdStatus> = {
  puja_santosh_mitra_square: {
    entityId: 'puja_santosh_mitra_square',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_college_square: {
    entityId: 'puja_college_square',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_bagbazar: {
    entityId: 'puja_bagbazar',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_sovabazar_rajbari: {
    entityId: 'puja_sovabazar_rajbari',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_kumartuli_park: {
    entityId: 'puja_kumartuli_park',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_hatibagan_sarbojanin: {
    entityId: 'puja_hatibagan_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_mohammad_ali_park: {
    entityId: 'puja_mohammad_ali_park',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_ekdalia_evergreen: {
    entityId: 'puja_ekdalia_evergreen',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 45,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_singhi_park: {
    entityId: 'puja_singhi_park',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_maddox_square: {
    entityId: 'puja_maddox_square',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_suruchi_sangha: {
    entityId: 'puja_suruchi_sangha',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 65,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_tridhara_sammilani: {
    entityId: 'puja_tridhara_sammilani',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_mudiali_club: {
    entityId: 'puja_mudiali_club',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_sreebhumi: {
    entityId: 'puja_sreebhumi',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 75,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_chetla_agrani: {
    entityId: 'puja_chetla_agrani',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 45,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_ballygunge_cultural: {
    entityId: 'puja_ballygunge_cultural',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_naktala_udayan: {
    entityId: 'puja_naktala_udayan',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 60,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_ahiritola: {
    entityId: 'puja_ahiritola',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_budge_budge: {
    entityId: 'puja_budge_budge',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_salkia_alapani: {
    entityId: 'puja_salkia_alapani',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_shibpur_mandirtala: {
    entityId: 'puja_shibpur_mandirtala',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_behala_notun_dal: {
    entityId: 'puja_behala_notun_dal',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 50,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_barisha_club: {
    entityId: 'puja_barisha_club',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_tala_prattoy: {
    entityId: 'puja_tala_prattoy',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 65,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_kashi_bose_lane: {
    entityId: 'puja_kashi_bose_lane',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_fd_block_saltlake: {
    entityId: 'puja_fd_block_saltlake',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 60,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_badamtala_ashar_sangha: {
    entityId: 'puja_badamtala_ashar_sangha',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  // Transit Hub Crowd Telemetry
  node_sealdah: {
    entityId: 'node_sealdah',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_esplanade: {
    entityId: 'node_esplanade',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 12,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_tollygunge: {
    entityId: 'node_tollygunge',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_rabindra_sarobar: {
    entityId: 'node_rabindra_sarobar',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 8,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_budge_budge: {
    entityId: 'node_budge_budge',
    entityType: 'TRANSIT_NODE',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 5,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_majerhat: {
    entityId: 'node_majerhat',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_howrah_maidan: {
    entityId: 'node_howrah_maidan',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_shreebhumi: {
    entityId: 'node_shreebhumi',
    entityType: 'TRANSIT_NODE',
    level: 'EXTREME',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_chetla: {
    entityId: 'node_chetla',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_naktala: {
    entityId: 'node_naktala',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_salkia: {
    entityId: 'node_salkia',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_shibpur: {
    entityId: 'node_shibpur',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_behala: {
    entityId: 'node_behala',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_tala: {
    entityId: 'node_tala',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_saltlake_fd: {
    entityId: 'node_saltlake_fd',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_batanagar: {
    entityId: 'node_batanagar',
    entityType: 'TRANSIT_NODE',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 5,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_bally: {
    entityId: 'node_bally',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_belur: {
    entityId: 'node_belur',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  node_jodhpur_park: {
    entityId: 'node_jodhpur_park',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_dumdum_park: {
    entityId: 'node_dumdum_park',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_ultadanga: {
    entityId: 'node_ultadanga',
    entityType: 'TRANSIT_NODE',
    level: 'HIGH',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  node_haridevpur: {
    entityId: 'node_haridevpur',
    entityType: 'TRANSIT_NODE',
    level: 'MODERATE',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },

  // Additional New Pujas Crowd Telemetry
  puja_batanagar_sarbojanin: {
    entityId: 'puja_batanagar_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_kalipur_sarbojanin: {
    entityId: 'puja_kalipur_sarbojanin',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_behala_club: {
    entityId: 'puja_behala_club',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_behala_devdaru: {
    entityId: 'puja_behala_devdaru',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_ajeya_sanghati: {
    entityId: 'puja_ajeya_sanghati',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 50,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_bally_sarbojanin: {
    entityId: 'puja_bally_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_belur_sarbojanin: {
    entityId: 'puja_belur_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_howrah_ramkrishnapur: {
    entityId: 'puja_howrah_ramkrishnapur',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_kadamtala_sarbojanin: {
    entityId: 'puja_kadamtala_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_nalin_sarkar_street: {
    entityId: 'puja_nalin_sarkar_street',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_telengabagan: {
    entityId: 'puja_telengabagan',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 50,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_dumdum_park_tarun_dal: {
    entityId: 'puja_dumdum_park_tarun_dal',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 60,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_dumdum_park_bharat_chakra: {
    entityId: 'puja_dumdum_park_bharat_chakra',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_simla_bayam_samity: {
    entityId: 'puja_simla_bayam_samity',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_chaltabagan_lohapatty: {
    entityId: 'puja_chaltabagan_lohapatty',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_bj_block_saltlake: {
    entityId: 'puja_bj_block_saltlake',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 45,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_aj_block_saltlake: {
    entityId: 'puja_aj_block_saltlake',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_laboni_saltlake: {
    entityId: 'puja_laboni_saltlake',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_hindustan_park: {
    entityId: 'puja_hindustan_park',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_jodhpur_park: {
    entityId: 'puja_jodhpur_park',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 50,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_babubagan: {
    entityId: 'puja_babubagan',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 40,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_bosepukur_sitala: {
    entityId: 'puja_bosepukur_sitala',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 50,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_kumartuli_sarbojanin: {
    entityId: 'puja_kumartuli_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_sikdar_bagan: {
    entityId: 'puja_sikdar_bagan',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_jagat_mukherjee_park: {
    entityId: 'puja_jagat_mukherjee_park',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_pathuriaghata_ghosh_bari: {
    entityId: 'puja_pathuriaghata_ghosh_bari',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_mitra_bari: {
    entityId: 'puja_mitra_bari',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_bowbazar_sarbojanin: {
    entityId: 'puja_bowbazar_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_rani_rashmoni_bari: {
    entityId: 'puja_rani_rashmoni_bari',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 15,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_subodh_mallick_square: {
    entityId: 'puja_subodh_mallick_square',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_deshapriya_park: {
    entityId: 'puja_deshapriya_park',
    entityType: 'PUJA',
    level: 'EXTREME',
    estimatedQueueMinutes: 55,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_samaj_sebi_sangha: {
    entityId: 'puja_samaj_sebi_sangha',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_shiv_mandir: {
    entityId: 'puja_shiv_mandir',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_66_pally: {
    entityId: 'puja_66_pally',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_selimpur_pally: {
    entityId: 'puja_selimpur_pally',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 25,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_95_pally: {
    entityId: 'puja_95_pally',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_golf_green: {
    entityId: 'puja_golf_green',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_haridevpur_41_pally: {
    entityId: 'puja_haridevpur_41_pally',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_lake_town_adhibasi: {
    entityId: 'puja_lake_town_adhibasi',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_dumdum_park_tarun_sangha: {
    entityId: 'puja_dumdum_park_tarun_sangha',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_ak_block_saltlake: {
    entityId: 'puja_ak_block_saltlake',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_cf_block_saltlake: {
    entityId: 'puja_cf_block_saltlake',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_new_town_sarbojanin: {
    entityId: 'puja_new_town_sarbojanin',
    entityType: 'PUJA',
    level: 'HIGH',
    estimatedQueueMinutes: 35,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'RISING',
    isSimulated: true
  },
  puja_chatterjeehat_sarbojanin: {
    entityId: 'puja_chatterjeehat_sarbojanin',
    entityType: 'PUJA',
    level: 'MODERATE',
    estimatedQueueMinutes: 20,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_howrah_sanatan_dharmasabha: {
    entityId: 'puja_howrah_sanatan_dharmasabha',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_pujali_sarbojanin: {
    entityId: 'puja_pujali_sarbojanin',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  },
  puja_nangi_kalibari: {
    entityId: 'puja_nangi_kalibari',
    entityType: 'PUJA',
    level: 'VERY_LOW',
    estimatedQueueMinutes: 10,
    timestampIso: '2026-10-02T17:00:00Z',
    trend: 'STABLE',
    isSimulated: true
  }
};

export const MOCK_WEATHER_CONDITIONS: Record<string, WeatherCondition> = {
  NORTH_KOLKATA: {
    zone: 'NORTH_KOLKATA',
    condition: 'CLEAR',
    precipitationProbabilityPercent: 10,
    temperatureCelsius: 29,
    timestampIso: '2026-10-02T17:00:00Z',
    isSimulated: true
  },
  CENTRAL_KOLKATA: {
    zone: 'CENTRAL_KOLKATA',
    condition: 'PARTLY_CLOUDY',
    precipitationProbabilityPercent: 15,
    temperatureCelsius: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    isSimulated: true
  },
  SOUTH_KOLKATA: {
    zone: 'SOUTH_KOLKATA',
    condition: 'PARTLY_CLOUDY',
    precipitationProbabilityPercent: 20,
    temperatureCelsius: 29,
    timestampIso: '2026-10-02T17:00:00Z',
    isSimulated: true
  },
  EAST_KOLKATA: {
    zone: 'EAST_KOLKATA',
    condition: 'CLEAR',
    precipitationProbabilityPercent: 10,
    temperatureCelsius: 30,
    timestampIso: '2026-10-02T17:00:00Z',
    isSimulated: true
  },
  HOWRAH: {
    zone: 'HOWRAH',
    condition: 'CLEAR',
    precipitationProbabilityPercent: 12,
    temperatureCelsius: 29,
    timestampIso: '2026-10-02T17:00:00Z',
    isSimulated: true
  }
};
