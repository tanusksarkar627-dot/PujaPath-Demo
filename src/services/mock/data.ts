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
