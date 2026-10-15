import React from 'react';
import { MapPin } from 'lucide-react';
import { Puja, Itinerary } from '../types/domain';
import { MOCK_PUJAS } from '../services/mock/data';

interface InteractiveMapProps {
  primaryItinerary: Itinerary | null | undefined;
  selectedPujaDetail: Puja | null;
  onSelectPuja: (puja: Puja | null) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  primaryItinerary,
  selectedPujaDetail,
  onSelectPuja
}) => {
  const MAP_PANDALS = [
    // North Kolkata
    { id: 'puja_tala_prattoy', name: 'Tala Prattoy', x: 430, y: 50, zone: 'NORTH' },
    { id: 'puja_bagbazar', name: 'Bagbazar Sarbojanin', x: 380, y: 70, zone: 'NORTH' },
    { id: 'puja_nalin_sarkar_street', name: 'Nalin Sarkar Street', x: 475, y: 80, zone: 'NORTH' },
    { id: 'puja_sikdar_bagan', name: 'Sikdar Bagan', x: 450, y: 85, zone: 'NORTH' },
    { id: 'puja_hatibagan_sarbojanin', name: 'Hatibagan Sarbojanin', x: 490, y: 95, zone: 'NORTH' },
    { id: 'puja_kumartuli_park', name: 'Kumartuli Park', x: 360, y: 125, zone: 'NORTH' },
    { id: 'puja_kumartuli_sarbojanin', name: 'Kumartuli Sarbojanin', x: 345, y: 120, zone: 'NORTH' },
    { id: 'puja_sovabazar_rajbari', name: 'Sovabazar Rajbari', x: 460, y: 140, zone: 'NORTH' },
    { id: 'puja_jagat_mukherjee_park', name: 'Jagat Mukherjee Park', x: 435, y: 130, zone: 'NORTH' },
    { id: 'puja_pathuriaghata_ghosh_bari', name: 'Pathuriaghata Ghosh Bari', x: 365, y: 160, zone: 'NORTH' },
    { id: 'puja_mitra_bari', name: 'Dorjipara Mitra Bari', x: 420, y: 165, zone: 'NORTH' },
    { id: 'puja_ahiritola', name: 'Ahiritola Sarbojanin', x: 330, y: 145, zone: 'NORTH' },
    { id: 'puja_kashi_bose_lane', name: 'Kashi Bose Lane', x: 500, y: 175, zone: 'NORTH' },
    { id: 'puja_telengabagan', name: 'Telengabagan', x: 550, y: 115, zone: 'NORTH' },
    { id: 'puja_dumdum_park_tarun_dal', name: 'Dum Dum Park Tarun Dal', x: 620, y: 65, zone: 'NORTH' },
    { id: 'puja_dumdum_park_bharat_chakra', name: 'Dum Dum Park Bharat Chakra', x: 645, y: 50, zone: 'NORTH' },

    // Howrah & West Bank
    { id: 'puja_bally_sarbojanin', name: 'Bally Sarbojanin', x: 130, y: 55, zone: 'HOWRAH' },
    { id: 'puja_bally_durgotsav_samiti', name: 'Bally Durgotsav', x: 125, y: 75, zone: 'HOWRAH' },
    { id: 'puja_belur_sarbojanin', name: 'Belur Sarbojanin', x: 135, y: 105, zone: 'HOWRAH' },
    { id: 'puja_salkia_alapani', name: 'Salkia Alapani (Howrah)', x: 140, y: 160, zone: 'HOWRAH' },
    { id: 'puja_howrah_sanatan_dharmasabha', name: 'Howrah Dharmasabha', x: 165, y: 250, zone: 'HOWRAH' },
    { id: 'puja_howrah_ramkrishnapur', name: 'Ramkrishnapur Ghat (Howrah)', x: 155, y: 280, zone: 'HOWRAH' },
    { id: 'puja_kadamtala_sarbojanin', name: 'Kadamtala (Central Howrah)', x: 110, y: 310, zone: 'HOWRAH' },
    { id: 'puja_chatterjeehat_sarbojanin', name: 'Chatterjeehat (Shibpur)', x: 115, y: 360, zone: 'HOWRAH' },
    { id: 'puja_shibpur_mandirtala', name: 'Shibpur Mandirtala (Howrah)', x: 130, y: 390, zone: 'HOWRAH' },

    // Central Kolkata
    { id: 'puja_simla_bayam_samity', name: 'Simla Bayam Samity', x: 430, y: 195, zone: 'CENTRAL' },
    { id: 'puja_chaltabagan_lohapatty', name: 'Chaltabagan Lohapatty', x: 490, y: 205, zone: 'CENTRAL' },
    { id: 'puja_mohammad_ali_park', name: 'Mohammad Ali Park', x: 390, y: 220, zone: 'CENTRAL' },
    { id: 'puja_college_square', name: 'College Square', x: 470, y: 235, zone: 'CENTRAL' },
    { id: 'puja_bowbazar_sarbojanin', name: 'Bowbazar Sarbojanin', x: 440, y: 255, zone: 'CENTRAL' },
    { id: 'puja_santosh_mitra_square', name: 'Santosh Mitra Sq (Lebutala)', x: 530, y: 245, zone: 'CENTRAL' },
    { id: 'puja_subodh_mallick_square', name: 'Subodh Mallick Square', x: 450, y: 275, zone: 'CENTRAL' },
    { id: 'puja_rani_rashmoni_bari', name: 'Janbazar Rani Rashmoni Bari', x: 395, y: 285, zone: 'CENTRAL' },

    // East Kolkata (Salt Lake, VIP Road, New Town)
    { id: 'puja_sreebhumi', name: 'Sreebhumi Sporting Club', x: 640, y: 110, zone: 'EAST' },
    { id: 'puja_lake_town_adhibasi', name: 'Lake Town Adhibasi Brinda', x: 610, y: 120, zone: 'EAST' },
    { id: 'puja_dumdum_park_tarun_sangha', name: 'Dum Dum Park Tarun Sangha', x: 635, y: 80, zone: 'EAST' },
    { id: 'puja_laboni_saltlake', name: 'Laboni Estate Salt Lake', x: 630, y: 165, zone: 'EAST' },
    { id: 'puja_cf_block_saltlake', name: 'CF Block Salt Lake', x: 660, y: 175, zone: 'EAST' },
    { id: 'puja_aj_block_saltlake', name: 'AJ Block Salt Lake', x: 680, y: 190, zone: 'EAST' },
    { id: 'puja_ak_block_saltlake', name: 'AK Block Salt Lake', x: 695, y: 205, zone: 'EAST' },
    { id: 'puja_fd_block_saltlake', name: 'FD Block Salt Lake', x: 670, y: 220, zone: 'EAST' },
    { id: 'puja_bj_block_saltlake', name: 'BJ Block Salt Lake', x: 650, y: 240, zone: 'EAST' },
    { id: 'puja_new_town_sarbojanin', name: 'New Town Sarbojanin', x: 705, y: 140, zone: 'EAST' },

    // South Kolkata
    { id: 'puja_maddox_square', name: 'Maddox Square', x: 490, y: 440, zone: 'SOUTH' },
    { id: 'puja_hindustan_park', name: 'Hindustan Park', x: 480, y: 475, zone: 'SOUTH' },
    { id: 'puja_deshapriya_park', name: 'Deshapriya Park', x: 440, y: 465, zone: 'SOUTH' },
    { id: 'puja_samaj_sebi_sangha', name: 'Samaj Sebi Sangha', x: 460, y: 480, zone: 'SOUTH' },
    { id: 'puja_tridhara_sammilani', name: 'Tridhara Sammilani', x: 390, y: 485, zone: 'SOUTH' },
    { id: 'puja_badamtala_ashar_sangha', name: 'Badamtala Ashar Sangha', x: 360, y: 505, zone: 'SOUTH' },
    { id: 'puja_66_pally', name: '66 Pally Club', x: 340, y: 495, zone: 'SOUTH' },
    { id: 'puja_singhi_park', name: 'Singhi Park', x: 470, y: 515, zone: 'SOUTH' },
    { id: 'puja_ekdalia_evergreen', name: 'Ekdalia Evergreen', x: 525, y: 505, zone: 'SOUTH' },
    { id: 'puja_ballygunge_cultural', name: 'Ballygunge Cultural', x: 550, y: 470, zone: 'SOUTH' },
    { id: 'puja_bosepukur_sitala', name: 'Bosepukur Sitala Mandir', x: 550, y: 520, zone: 'SOUTH' },
    { id: 'puja_mudiali_club', name: 'Mudiali Club', x: 410, y: 535, zone: 'SOUTH' },
    { id: 'puja_shiv_mandir', name: 'Shiv Mandir Sarbojanin', x: 395, y: 525, zone: 'SOUTH' },
    { id: 'puja_babubagan', name: 'Babubagan Dhakuria', x: 510, y: 540, zone: 'SOUTH' },
    { id: 'puja_selimpur_pally', name: 'Selimpur Pally', x: 530, y: 550, zone: 'SOUTH' },
    { id: 'puja_chetla_agrani', name: 'Chetla Agrani', x: 330, y: 520, zone: 'SOUTH' },
    { id: 'puja_suruchi_sangha', name: 'Suruchi Sangha', x: 290, y: 530, zone: 'SOUTH' },
    { id: 'puja_jodhpur_park', name: 'Jodhpur Park', x: 470, y: 550, zone: 'SOUTH' },
    { id: 'puja_95_pally', name: '95 Pally Jodhpur Park', x: 450, y: 560, zone: 'SOUTH' },
    { id: 'puja_golf_green', name: 'Golf Green Sarbojanin', x: 430, y: 580, zone: 'SOUTH' },
    { id: 'puja_naktala_udayan', name: 'Naktala Udayan Sangha', x: 470, y: 585, zone: 'SOUTH' },

    // Behala & Budge Budge Suburban Corridor
    { id: 'puja_behala_club', name: 'Behala Club', x: 260, y: 535, zone: 'SUBURBAN' },
    { id: 'puja_behala_devdaru', name: 'Behala Devdaru Fatak', x: 240, y: 545, zone: 'SUBURBAN' },
    { id: 'puja_behala_notun_dal', name: 'Behala Notun Dal', x: 250, y: 555, zone: 'SUBURBAN' },
    { id: 'puja_haridevpur_41_pally', name: 'Haridevpur 41 Pally', x: 295, y: 560, zone: 'SUBURBAN' },
    { id: 'puja_ajeya_sanghati', name: 'Ajeya Sanghati (Haridevpur)', x: 280, y: 570, zone: 'SUBURBAN' },
    { id: 'puja_barisha_club', name: 'Barisha Club (Sakher Bazar)', x: 220, y: 570, zone: 'SUBURBAN' },
    { id: 'puja_nangi_kalibari', name: 'Nangi Kalibari', x: 180, y: 575, zone: 'SUBURBAN' },
    { id: 'puja_batanagar_sarbojanin', name: 'Batanagar Sarbojanin', x: 160, y: 565, zone: 'SUBURBAN' },
    { id: 'puja_kalipur_sarbojanin', name: 'Kalipur Sarbojanin', x: 100, y: 585, zone: 'SUBURBAN' },
    { id: 'puja_budge_budge', name: 'Budge Budge Sarbojanin', x: 120, y: 580, zone: 'SUBURBAN' },
    { id: 'puja_pujali_sarbojanin', name: 'Pujali Municipal Park', x: 80, y: 590, zone: 'SUBURBAN' }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-red-200/90 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-600" />
              Kolkata, Howrah & Suburban Durga Puja Transit Map
            </h2>
            <p className="text-xs text-stone-500">
              Interactive topological schematic linking Hooghly River, Metro Blue & Green lines, Howrah Station, and Budge Budge corridor.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-stone-700">
              <span className="w-3 h-1 bg-cyan-500 rounded-full inline-block"></span> Metro Blue
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <span className="w-3 h-1 bg-emerald-600 rounded-full inline-block"></span> Metro Green (Underwater)
            </span>
            <span className="flex items-center gap-1.5 text-stone-700">
              <span className="w-3 h-1 bg-amber-500 rounded-full inline-block"></span> Howrah & Budge Budge
            </span>
          </div>
        </div>

        {/* Map SVG Canvas */}
        <div className="relative w-full h-[540px] bg-stone-50/70 rounded-xl border border-stone-200 overflow-hidden flex items-center justify-center p-2">
          <svg viewBox="0 0 800 620" className="w-full h-full max-h-[520px]">
            {/* Hooghly River */}
            <path
              d="M 220 0 Q 240 160 190 280 T 250 620"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="42"
              strokeLinecap="round"
            />
            <text x="205" y="320" fill="#0284C7" fontSize="11" fontStyle="italic" fontWeight="bold" transform="rotate(75, 205, 320)">
              Hooghly River (ভাগীরথী-হুগলী)
            </text>

            {/* Howrah Bridge (Rabindra Setu) */}
            <line x1="170" y1="210" x2="320" y2="210" stroke="#78350F" strokeWidth="4" strokeDasharray="3 2" />
            <text x="180" y="202" fill="#78350F" fontSize="9" fontWeight="bold">Howrah Bridge (রবীন্দ্র সেতু)</text>

            {/* Vidyasagar Setu (Second Hooghly Bridge) */}
            <line x1="140" y1="365" x2="310" y2="365" stroke="#475569" strokeWidth="4" />
            <text x="150" y="358" fill="#334155" fontSize="9" fontWeight="bold">Vidyasagar Setu (দ্বিতীয় হুগলী সেতু)</text>

            {/* Metro Blue Line (North to South) */}
            <line x1="420" y1="30" x2="420" y2="580" stroke="#06B6D4" strokeWidth="4.5" strokeDasharray="4 2" />

            {/* Metro Green Line (Howrah Maidan <-> Howrah <-> Underwater <-> Esplanade <-> Sealdah <-> Salt Lake) */}
            <line x1="100" y1="260" x2="680" y2="260" stroke="#059669" strokeWidth="4.5" />

            {/* Budge Budge Suburban Line / Trunk Road */}
            <line x1="120" y1="580" x2="280" y2="530" stroke="#D97706" strokeWidth="3" strokeDasharray="3 3" />
            <text x="130" y="605" fill="#B45309" fontSize="9" fontWeight="bold">Budge Budge Trunk Road</text>

            {/* Blue Line Station Dots */}
            {[
              { name: 'Shyambazar', y: 80 },
              { name: 'Sovabazar', y: 135 },
              { name: 'Girish Park', y: 185 },
              { name: 'MG Road', y: 225 },
              { name: 'Central', y: 285 },
              { name: 'Esplanade (Interchange)', y: 340, interchange: true },
              { name: 'Park Street', y: 390 },
              { name: 'Rabindra Sadan', y: 440 },
              { name: 'Kalighat', y: 510 },
              { name: 'Tollygunge', y: 560 }
            ].map((st, i) => (
              <g key={`st_${i}`}>
                <circle cx="420" cy={st.y} r={st.interchange ? 7 : 4} fill={st.interchange ? '#D97706' : '#0891B2'} stroke="#FFFFFF" strokeWidth="1.5" />
                <text x="430" y={st.y + 3.5} fill="#475569" fontSize="9" fontWeight="bold">{st.name}</text>
              </g>
            ))}

            {/* Green Line Stations */}
            <circle cx="100" cy="260" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="50" y="280" fill="#047857" fontSize="9" fontWeight="bold">Howrah Maidan</text>

            <circle cx="165" cy="260" r="6" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="130" y="280" fill="#047857" fontSize="9" fontWeight="bold">Howrah Station</text>

            <circle cx="560" cy="260" r="6" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="535" y="280" fill="#047857" fontSize="9" fontWeight="bold">Sealdah Station</text>

            <circle cx="670" cy="260" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="1.5" />
            <text x="630" y="280" fill="#047857" fontSize="9" fontWeight="bold">Salt Lake Central</text>

            {/* Pandal Markers */}
            {MAP_PANDALS.map((p) => {
              const isSelected = selectedPujaDetail?.id === p.id;
              const isVisitedInActivePlan = primaryItinerary?.visitedPujaIds.includes(p.id);

              return (
                <g
                  key={p.id}
                  onClick={() => {
                    const full = MOCK_PUJAS.find(puja => puja.id === p.id);
                    if (full) onSelectPuja(full);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Glow if visited in active itinerary */}
                  {isVisitedInActivePlan && (
                    <circle cx={p.x} cy={p.y} r="15" fill="#DC2626" opacity="0.35" className="animate-ping" />
                  )}

                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isSelected ? 9 : 6.5}
                    fill={
                      isVisitedInActivePlan ? '#DC2626' :
                      p.zone === 'HOWRAH' ? '#B45309' :
                      p.zone === 'SUBURBAN' ? '#EA580C' :
                      p.zone === 'NORTH' ? '#7C3AED' :
                      p.zone === 'CENTRAL' ? '#D97706' :
                      p.zone === 'EAST' ? '#059669' : '#E11D48'
                    }
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={p.x + 9}
                    y={p.y + 3.5}
                    fill={isVisitedInActivePlan ? '#991B1B' : '#334155'}
                    fontSize="9.5"
                    fontWeight={isVisitedInActivePlan ? 'bold' : '600'}
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Selected Pandal Floating Detail Card */}
          {selectedPujaDetail && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-88 bg-white/95 border border-red-200 p-4 rounded-xl shadow-xl backdrop-blur">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {selectedPujaDetail.zone.replace('_', ' ')}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectPuja(null)}
                  className="text-stone-400 hover:text-stone-700 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{selectedPujaDetail.name}</h4>
              {selectedPujaDetail.bengaliName && (
                <div className="text-xs text-red-600 font-serif">{selectedPujaDetail.bengaliName}</div>
              )}
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">{selectedPujaDetail.currentThemeDescription}</p>

              <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-amber-800 font-semibold">Stay: ~{selectedPujaDetail.typicalDwellMinutes} mins</span>
                <span className="text-emerald-700 font-semibold">
                  VIP Gate: {selectedPujaDetail.hasVipPassAccess ? 'Available' : 'General Only'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
