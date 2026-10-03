import React, { useState } from 'react';
import { Building, Search } from 'lucide-react';
import { Puja } from '../types/domain';
import { MOCK_PUJAS, MOCK_CROWD_STATUSES } from '../services/mock/data';
import { AlponaWatermark } from './DurgaPujaArt';

interface PandalCatalogViewProps {
  onSelectPuja?: (puja: Puja) => void;
}

export const PandalCatalogView: React.FC<PandalCatalogViewProps> = ({ onSelectPuja }) => {
  const [selectedZone, setSelectedZone] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPujas = MOCK_PUJAS.filter(puja => {
    const matchesZone =
      selectedZone === 'ALL' ||
      (selectedZone === 'HOWRAH' && puja.zone === 'HOWRAH') ||
      (selectedZone === 'SUBURBAN' && (puja.nearestTransitNodeIds.includes('node_budge_budge') || puja.id.includes('budge') || puja.id.includes('behala'))) ||
      puja.zone === selectedZone;

    const matchesSearch =
      searchQuery.trim() === '' ||
      puja.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (puja.bengaliName && puja.bengaliName.includes(searchQuery)) ||
      puja.landmark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      puja.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesZone && matchesSearch;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border border-red-200/90 rounded-2xl p-5 shadow-sm relative overflow-hidden">
        <AlponaWatermark size={240} opacity={0.04} className="absolute -right-12 -top-12" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200 relative z-10">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-red-600" />
              Kolkata, Howrah & Suburban Durga Puja Directory
            </h2>
            <p className="text-xs text-stone-500">
              Complete catalog of {MOCK_PUJAS.length} heritage sabeki baris, tourist-magnet mega pandals & contemporary art spectacles.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-700 font-bold border border-red-200 shrink-0">
            {filteredPujas.length} of {MOCK_PUJAS.length} Pandals Shown
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-5 relative z-10">
          {/* Zone Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-stone-100/80 rounded-xl border border-stone-200">
            {[
              { id: 'ALL', label: 'All Zones' },
              { id: 'NORTH_KOLKATA', label: 'North' },
              { id: 'CENTRAL_KOLKATA', label: 'Central' },
              { id: 'SOUTH_KOLKATA', label: 'South' },
              { id: 'HOWRAH', label: 'Howrah' },
              { id: 'SUBURBAN', label: 'Budge Budge & Behala' },
              { id: 'EAST_KOLKATA', label: 'East / Salt Lake' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedZone(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                  selectedZone === tab.id
                    ? 'bg-red-700 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, tag, or landmark..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Pandals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {filteredPujas.map(puja => {
            const crowd = MOCK_CROWD_STATUSES[puja.id];
            return (
              <div
                key={puja.id}
                onClick={() => onSelectPuja?.(puja)}
                className="bg-white rounded-xl border border-stone-200 p-4 flex flex-col justify-between space-y-3 hover:border-red-400 hover:shadow-md transition cursor-pointer relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold uppercase tracking-wider">
                      {puja.zone.replace('_', ' ')}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold font-mono ${
                      crowd?.level === 'EXTREME' ? 'bg-red-50 text-red-700 border border-red-200' :
                      crowd?.level === 'HIGH' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}>
                      {crowd?.level || 'MODERATE'} ({crowd?.estimatedQueueMinutes || 20}m queue)
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-red-700 transition-colors">
                    {puja.name}
                  </h3>
                  {puja.bengaliName && (
                    <div className="text-xs text-red-600 font-serif font-medium">{puja.bengaliName}</div>
                  )}
                  <p className="text-xs text-stone-600 leading-relaxed mt-1 line-clamp-2">
                    {puja.currentThemeDescription}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span>Landmark:</span>
                    <span className="text-stone-700 truncate max-w-[180px] font-medium">{puja.landmark}</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-500 text-[11px]">
                    <span>Dwell Time:</span>
                    <span className="text-stone-900 font-semibold font-mono">~{puja.typicalDwellMinutes} mins</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {puja.tags.map((t, idx) => (
                      <span key={idx} className="text-[9px] px-1.5 py-0.5 bg-stone-50 rounded text-stone-600 border border-stone-200">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
