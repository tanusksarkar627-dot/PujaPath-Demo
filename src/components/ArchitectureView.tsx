import React from 'react';
import { Layers, ShieldCheck, Zap, Terminal, Sparkles, Scale } from 'lucide-react';
import { AlponaWatermark } from './DurgaPujaArt';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-red-200/90 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        <AlponaWatermark size={260} opacity={0.04} className="absolute -right-16 -top-16" />

        <div className="relative z-10 mb-6 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" />
            Phase 0 - 2 Technical Architecture & Optimization Model
          </div>
          <h2 className="text-xl font-black text-stone-900">
            PUJAPATH Deterministic Orienteering Engine Specification
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-3xl leading-relaxed">
            Engineered as a mathematically bounded, deterministic multi-stop itinerary engine decoupled from external map APIs and LLM hallucinations. All distance, queue times, and transit fares are computed over grounded Kolkata topological transit graph nodes.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 relative z-10 text-xs">
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-red-800">
              <Zap className="w-4 h-4 text-red-600" />
              1. Gemini 2.5 Flash Intent Parser
            </div>
            <p className="text-stone-600 leading-relaxed">
              Extracts origin, destination, time window, budget, and walking comfort with zero-temperature JSON schema validation. If the LLM is offline or ambiguous, falls back instantly to a deterministic regex tokenizer with zero downtime.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <Scale className="w-4 h-4 text-amber-600" />
              2. Deterministic Optimization Core
            </div>
            <p className="text-stone-600 leading-relaxed">
              Builds coherent spatial corridors and pruning trees without naive TSP factorial blowup ($O(N^2)$ candidate corridor generation). Enforces hard return deadlines, cost budgets, and dwell times with 100% mathematical reproducibility.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              3. Transparent Multi-Objective Scoring
            </div>
            <p className="text-stone-600 leading-relaxed font-mono text-[11px]">
              Composite Score = S(pref) + S(count) - P(travel) - P(walk) - P(cost) - P(crowd) - P(backtrack). Zero magic numbers, configurable weights, and actionable failure explanations.
            </p>
          </div>
        </div>

        {/* 10-Step Optimization Pipeline */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 relative z-10 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-red-600" />
            10-Step Deterministic Execution Pipeline
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-[11px]">
            {[
              { step: '01', title: 'Candidate Generation', desc: 'Rank pujas by category, tags & origin proximity' },
              { step: '02', title: 'Hard Constraint Prune', desc: 'Prune venues violating hard accessibility / mode limits' },
              { step: '03', title: 'Corridor Sequencing', desc: 'Construct coherent spatial directional corridors' },
              { step: '04', title: 'Multimodal Transit', desc: 'Dijkstra shortest-paths over Metro, Bus & Auto graph' },
              { step: '05', title: 'Food Stop Insertion', desc: 'Align authentic Bengali dining with corridor midpoint' },
              { step: '06', title: 'Timeline Accounting', desc: 'Calculate exact arrival, queue wait & departure times' },
              { step: '07', title: 'Budget Accounting', desc: 'Verify transit fares + dining stay under user budget' },
              { step: '08', title: 'Walking Enforcement', desc: 'Verify segment walking distances meet user comfort' },
              { step: '09', title: 'Multi-Factor Scoring', desc: 'Transparently score candidate itineraries' },
              { step: '10', title: 'Optimal Path Return', desc: 'Return best-scoring path with actionable alternatives' }
            ].map(item => (
              <div key={item.step} className="p-2.5 rounded-lg bg-white border border-stone-200">
                <div className="font-mono text-red-600 font-bold text-[10px]">{item.step}</div>
                <div className="font-bold text-stone-900 mt-0.5">{item.title}</div>
                <div className="text-stone-500 text-[10px] mt-0.5 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
