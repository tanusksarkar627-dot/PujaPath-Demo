/**
 * PUJAPATH - Authentic Bengali Durga Puja Cultural Motifs & Vector Art
 * Handcrafted vector artwork: Maa Durga's Face (Trinayani), Dhaak, Kaash Ful, Alpona
 */

import React from 'react';

/**
 * Maa Durga's Divine Face (দেবী ত্রিনয়নী ও রাজকীয় মুকুট)
 * Iconic third eye, serene lotus eyes, sindoor teep, and golden tiara
 */
export const MaaDurgaFace: React.FC<{ className?: string; size?: number; glow?: boolean }> = ({
  className = '',
  size = 48,
  glow = false
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${glow ? 'drop-shadow-[0_0_12px_rgba(220,38,38,0.6)]' : ''}`}
    aria-label="Maa Durga Face Motif"
  >
    {/* Golden Halo / Prabhabali */}
    <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
    <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.75" opacity="0.2" />

    {/* Royal Mukut (Tiara / Crown) */}
    <path
      d="M32 38 C38 28, 48 20, 60 14 C72 20, 82 28, 88 38 C80 37, 70 34, 60 36 C50 34, 40 37, 32 38 Z"
      fill="currentColor"
      fillOpacity="0.9"
    />
    {/* Crown Center Jewel Peak */}
    <path d="M60 10 L64 16 L60 22 L56 16 Z" fill="#F59E0B" />
    <circle cx="60" cy="8" r="3" fill="#DC2626" />
    <circle cx="48" cy="24" r="2.5" fill="#F59E0B" />
    <circle cx="72" cy="24" r="2.5" fill="#F59E0B" />

    {/* Sindoor Teep (Center Red Vermilion Dot) */}
    <circle cx="60" cy="46" r="4.5" fill="#DC2626" />

    {/* Trinayani (The Third Eye of Divine Wisdom) */}
    <path
      d="M60 38 C63 42, 63 46, 60 50 C57 46, 57 42, 60 38 Z"
      fill="#DC2626"
      stroke="#B45309"
      strokeWidth="0.8"
    />
    <circle cx="60" cy="44" r="1.5" fill="#FEF3C7" />

    {/* Arched Majestic Eyebrows */}
    <path
      d="M34 50 C42 47, 50 49, 55 54"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M86 50 C78 47, 70 49, 65 54"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />

    {/* Left Eye (Lotus-Petal Shaped) */}
    <path
      d="M32 58 C38 52, 48 52, 54 58 C48 64, 38 64, 32 58 Z"
      fill="#FFFDF7"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="43" cy="58" r="3.6" fill="#1E293B" />
    <circle cx="42" cy="56.8" r="1.2" fill="#FFFFFF" />

    {/* Right Eye (Lotus-Petal Shaped) */}
    <path
      d="M66 58 C72 52, 82 52, 88 58 C82 64, 72 64, 66 58 Z"
      fill="#FFFDF7"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="77" cy="58" r="3.6" fill="#1E293B" />
    <circle cx="76" cy="56.8" r="1.2" fill="#FFFFFF" />

    {/* Graceful Nose & Royal Nath (Nose Ring) */}
    <path
      d="M60 54 L60 74 C58 75, 56 75, 54 73"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Nath (Golden Nose Ring) */}
    <circle cx="53" cy="74" r="6" stroke="#F59E0B" strokeWidth="1.2" fill="none" />
    <path d="M53 68 C45 68, 40 60, 36 56" stroke="#F59E0B" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" />
    <circle cx="53" cy="80" r="1.5" fill="#DC2626" />

    {/* Divine Crimson Lips (সৌম্য স্মিত অধরোষ্ঠ) */}
    <path
      d="M48 83 C54 81, 60 84, 60 84 C60 84, 66 81, 72 83 C68 89, 52 89, 48 83 Z"
      fill="#DC2626"
      stroke="#991B1B"
      strokeWidth="0.8"
    />
    {/* Chin curvature */}
    <path d="M54 94 C58 96, 62 96, 66 94" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
  </svg>
);

/**
 * Traditional Bengali Dhaak (ঐতিহ্যবাহী ঢাক ও কাঠি)
 * Festival drum with white feather plumes, red/white ropes, and drumsticks
 */
export const DhaakInstrument: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 40
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Bengali Dhaak Drum"
  >
    {/* Feathery White Plumes on Top (বকের পালক / কাশ পালক) */}
    <path
      d="M35 25 C30 15, 20 12, 10 16 C18 20, 24 26, 32 30"
      stroke="#FEF3C7"
      strokeWidth="2"
      fill="#FFFDF7"
      fillOpacity="0.8"
    />
    <path
      d="M40 22 C38 10, 30 6, 22 8 C28 14, 34 20, 38 28"
      stroke="#FEF3C7"
      strokeWidth="1.8"
      fill="#FFFDF7"
      fillOpacity="0.9"
    />
    <path
      d="M45 20 C46 8, 42 4, 34 5 C38 12, 42 18, 44 26"
      stroke="#FEF3C7"
      strokeWidth="1.6"
      fill="#FFFDF7"
      fillOpacity="0.8"
    />

    {/* Main Barrel Drum Body (উষ্ণ কাঠের দেহ) */}
    <ellipse cx="50" cy="36" rx="28" ry="10" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
    <path
      d="M22 36 C20 54, 20 70, 26 82 C34 88, 66 88, 74 82 C80 70, 80 54, 78 36 Z"
      fill="#B91C1C"
      stroke="#7F1D1D"
      strokeWidth="2"
    />

    {/* Bottom Base Rim */}
    <ellipse cx="50" cy="82" rx="24" ry="8" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />

    {/* Cross-laced Tension Ropes (রক্তবর্ণ ও স্বর্ণালী দড়ি) */}
    <path d="M26 38 L40 82 M38 38 L54 82 M50 38 L68 82 M62 38 L74 82" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.85" />
    <path d="M74 38 L60 82 M62 38 L46 82 M50 38 L32 82 M38 38 L26 82" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.85" />

    {/* Center Red Decorative Band */}
    <path d="M20 58 C32 64, 68 64, 80 58" stroke="#F59E0B" strokeWidth="3" fill="none" />

    {/* Dhaak Sticks (কাঠি) */}
    <line x1="72" y1="20" x2="48" y2="42" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="82" y1="26" x2="56" y2="45" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="48" cy="42" r="2.5" fill="#DC2626" />
    <circle cx="56" cy="45" r="2.5" fill="#DC2626" />
  </svg>
);

/**
 * Autumn Kaash Ful (শরতের কাশফুল)
 * Feathery white autumn blooms symbolizing the arrival of Maa Durga
 */
export const KaashFul: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 36
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Autumn Kaash Ful"
  >
    {/* Stem */}
    <path
      d="M30 95 C35 75, 42 55, 48 20"
      stroke="#10B981"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.8"
    />
    {/* Feathery Bloom Heads (কাশফুলের নরম শুভ্র কুঁড়ি) */}
    <path d="M48 20 C42 16, 36 22, 40 26 C46 30, 52 24, 48 20 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M45 28 C37 25, 33 32, 38 36 C44 40, 50 33, 45 28 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M42 38 C32 35, 29 44, 35 48 C41 52, 47 43, 42 38 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M38 50 C26 48, 24 58, 32 62 C38 65, 43 56, 38 50 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />

    {/* Second Swaying Stem */}
    <path
      d="M32 95 C42 80, 55 65, 62 35"
      stroke="#10B981"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <path d="M62 35 C58 30, 52 35, 56 39 C61 43, 66 38, 62 35 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />
    <path d="M59 44 C53 40, 48 46, 52 50 C58 54, 63 48, 59 44 Z" fill="#FFFDF7" stroke="#E2E8F0" strokeWidth="0.8" />
  </svg>
);

/**
 * Traditional Alpona Motif Ribbon (ঐতিহ্যবাহী আলপনা বর্ডার)
 * Used as header embellishments, divider borders, and card frames
 */
export const AlponaBorder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-1.5 overflow-hidden select-none opacity-80 ${className}`}>
    <span className="text-rose-500 text-xs">𑁍</span>
    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent"></span>
    <span className="text-amber-500 text-[10px]">❖</span>
    <span className="text-rose-600 font-serif text-xs font-bold tracking-widest uppercase">
      শুভ শারদোৎসব
    </span>
    <span className="text-amber-500 text-[10px]">❖</span>
    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent"></span>
    <span className="text-rose-500 text-xs">𑁍</span>
  </div>
);

/**
 * Dhunuchi Naach / Coconut Shell Censer Icon
 */
export const DhunuchiIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Bengali Dhunuchi Censer"
  >
    {/* Smoke curls */}
    <path d="M26 12 C24 8, 30 6, 28 2" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
    <path d="M34 14 C36 9, 32 6, 36 3" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    <path d="M42 16 C40 11, 46 8, 44 4" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

    {/* Flame / Glowing coals */}
    <circle cx="32" cy="18" r="4" fill="#F59E0B" />
    <circle cx="34" cy="17" r="2" fill="#DC2626" />

    {/* Earthen Bowl */}
    <path
      d="M14 20 C18 36, 46 36, 50 20 Z"
      fill="#B45309"
      stroke="#78350F"
      strokeWidth="1.5"
    />
    {/* Bowl Lip */}
    <ellipse cx="32" cy="20" rx="18" ry="4" fill="#D97706" stroke="#92400E" strokeWidth="1" />

    {/* Stem & Handle */}
    <path d="M30 34 L28 48 L22 58 L42 58 L36 48 L34 34 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
    {/* Base plate */}
    <ellipse cx="32" cy="58" rx="12" ry="3" fill="#78350F" />
  </svg>
);
