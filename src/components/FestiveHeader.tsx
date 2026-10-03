import React from 'react';
import { Play, RotateCcw, Shield, Sparkles } from 'lucide-react';
import {
  MaaDurgaFace,
  DhaakInstrument,
  KaashFul
} from './DurgaPujaArt';

export type FestiveThemeType = 'shobho_sharodiya' | 'sabeki_heritage' | 'alokshobha_lights' | 'contemporary_art';

interface FestiveHeaderProps {
  activeTheme: FestiveThemeType;
  onThemeChange: (theme: FestiveThemeType) => void;
  onGeneratePlan: () => void;
  onRunTests: () => void;
  isGenerating: boolean;
}

export const FestiveHeader: React.FC<FestiveHeaderProps> = ({
  activeTheme,
  onThemeChange,
  onGeneratePlan,
  onRunTests,
  isGenerating
}) => {
  return (
    <header className="border-b-2 border-amber-400 bg-gradient-to-r from-red-800 via-rose-700 to-red-900 text-white sticky top-0 z-50 px-4 sm:px-6 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Brand & Maa Durga Face lockup */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0 flex items-center justify-center p-1 rounded-full bg-red-950/60 border border-amber-300 shadow-sm">
            <MaaDurgaFace size={48} variant="full" glow={true} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                PUJAPATH
                <span className="text-amber-300 font-serif text-base italic font-normal">পূজাপথ</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40">
                শারদোৎসব ২০২৬
              </span>
            </div>
            <p className="text-xs text-rose-100 flex items-center gap-1.5 font-medium">
              <span>Durga Puja Multi-Stop Itinerary Planner</span>
              <span className="text-amber-300">·</span>
              <span className="text-amber-200">Gemini 2.5 Flash + Deterministic Engine</span>
            </p>
          </div>
        </div>

        {/* Center: Dhaak & Kaash Ful Festive Accent */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-1 rounded-xl bg-red-950/40 border border-red-700/50">
          <div className="flex items-center gap-2 text-xs text-rose-100">
            <DhaakInstrument size={42} animate={true} />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-amber-300 block">ঢাকের তালে কাশফুল</span>
              <span className="text-rose-200">Kolkata Sharodotsav Beats</span>
            </div>
          </div>
          <div className="h-8 w-px bg-red-700/50" />
          <KaashFul size={44} stems={3} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onRunTests}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/70 hover:bg-red-950 text-amber-200 rounded-lg text-xs font-semibold border border-amber-400/40 transition cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">22 Tests</span>
            <span className="sm:hidden">Tests</span>
          </button>

          <button
            type="button"
            onClick={onGeneratePlan}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-red-950 rounded-lg text-xs font-black shadow-md transition cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isGenerating ? 'Computing...' : 'Generate Plan'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
