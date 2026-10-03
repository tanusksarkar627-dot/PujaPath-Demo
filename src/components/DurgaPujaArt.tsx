import React from 'react';

/**
 * PUJAPATH - Authentic Bengali Durga Puja Visual Heritage Artworks
 * High-fidelity, zero-latency vector graphics for Sharodotsav:
 * - Maa Durga's Divine Face (Trinayana, Chandan bindi, Padmapalashalochona eyes, Nose-ring, Golden Mukut)
 * - Traditional Dhaak (Festive drum with kasher kanchi & feather plumes)
 * - Kaash Ful (White autumn plumes of wild reed grass swaying in autumn breeze)
 * - Sacred Alpona (Bengali rice-flour sacred floor art mandala & kalka)
 * - Sacred Conch Shell (Shankha) & Trishul
 */

export interface DurgaArtProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
}

/**
 * Maa Durga's Iconic Face Motif
 * Features the sacred third eye (Trinayana), crescent moon chandan alpona,
 * lotus-petal eyes (Padmapalashalochona), golden nose ring with pearl drop,
 * and ornate filigree golden crown (Mukut).
 */
export const MaaDurgaFace: React.FC<DurgaArtProps & { variant?: 'full' | 'eyes-only' | 'watermark' }> = ({
  className = '',
  size = 64,
  glow = false,
  variant = 'full'
}) => {
  if (variant === 'eyes-only') {
    return (
      <svg
        viewBox="0 0 200 100"
        width={size}
        height={typeof size === 'number' ? size / 2 : size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${glow ? 'animate-alpona' : ''}`}
        aria-label="Maa Durga Eyes & Trinayana"
      >
        {/* Third Eye (Trinayana) */}
        <path
          d="M 100 15 C 92 30 92 45 100 60 C 108 45 108 30 100 15 Z"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="1.5"
        />
        {/* Crescent Chandan on Third Eye */}
        <path
          d="M 97 22 C 95 32 95 43 97 53 C 98 43 98 32 97 22 Z"
          fill="#FDE68A"
        />
        <circle cx="100" cy="37" r="2.5" fill="#FEF08A" />

        {/* Left Eye & Brow */}
        <path
          d="M 40 32 C 55 24 75 25 88 35"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Chandan Dots above left brow */}
        {[45, 53, 61, 69, 77, 85].map((x, i) => (
          <circle key={`cl_${i}`} cx={x} cy={22 - (i % 2) * 2} r="1.6" fill="#FDE68A" />
        ))}
        {/* Left Eye Contour */}
        <path
          d="M 42 45 C 55 35 75 36 88 50 C 75 58 55 58 42 45 Z"
          fill="#FFFDF9"
          stroke="#1C1917"
          strokeWidth="3"
        />
        <ellipse cx="66" cy="45" rx="6" ry="6.5" fill="#1C1917" />
        <circle cx="68" cy="43" r="2" fill="#FFFFFF" />
        {/* Eye liner tail */}
        <path d="M 42 45 C 34 43 28 39 24 35" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />

        {/* Right Eye & Brow */}
        <path
          d="M 160 32 C 145 24 125 25 112 35"
          stroke="#1C1917"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Chandan Dots above right brow */}
        {[155, 147, 139, 131, 123, 115].map((x, i) => (
          <circle key={`cr_${i}`} cx={x} cy={22 - (i % 2) * 2} r="1.6" fill="#FDE68A" />
        ))}
        {/* Right Eye Contour */}
        <path
          d="M 158 45 C 145 35 125 36 112 50 C 125 58 145 58 158 45 Z"
          fill="#FFFDF9"
          stroke="#1C1917"
          strokeWidth="3"
        />
        <ellipse cx="134" cy="45" rx="6" ry="6.5" fill="#1C1917" />
        <circle cx="132" cy="43" r="2" fill="#FFFFFF" />
        {/* Eye liner tail */}
        <path d="M 158 45 C 166 43 172 39 176 35" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />

        {/* Nose Line & Noth Ring */}
        <path d="M 100 58 C 99 72 96 82 92 88 C 96 90 104 90 108 88" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
        {/* Nose Ring (Noth) */}
        <circle cx="86" cy="88" r="9" stroke="#D97706" strokeWidth="2" fill="none" />
        <circle cx="80" cy="94" r="2.5" fill="#DC2626" />
        <path d="M 86 79 C 75 70 65 65 55 60" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }

  // Full Majestic Durga Face Artwork
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${glow ? 'animate-alpona' : ''}`}
      aria-label="Maa Durga Divine Face and Mukut"
    >
      <defs>
        <radialGradient id="divineAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="goldCrown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="sindoorRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Radiant Aura */}
      <circle cx="120" cy="120" r="110" fill="url(#divineAura)" />

      {/* Ornate Golden Crown / Mukut Filigree */}
      <g id="crown">
        {/* Crown Base Band */}
        <path
          d="M 50 85 Q 120 70 190 85 Q 120 95 50 85 Z"
          fill="url(#goldCrown)"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        {/* Crown Jewels on Band */}
        {[70, 90, 110, 120, 130, 150, 170].map((cx, i) => (
          <circle key={`jewel_${i}`} cx={cx} cy={cx === 120 ? 82 : 84} r={cx === 120 ? 3.5 : 2.5} fill={i % 2 === 0 ? '#DC2626' : '#FFFFFF'} stroke="#78350F" strokeWidth="0.5" />
        ))}

        {/* Central Crown Spires & Kalash Motif */}
        <path
          d="M 120 20 L 132 55 Q 120 50 108 55 Z"
          fill="url(#goldCrown)"
          stroke="#78350F"
          strokeWidth="1.5"
        />
        <circle cx="120" cy="18" r="4.5" fill="#EF4444" stroke="#78350F" strokeWidth="1" />

        {/* Left & Right Mukut Arches */}
        <path
          d="M 108 55 Q 85 45 75 75 Q 95 72 108 85"
          fill="url(#goldCrown)"
          stroke="#78350F"
          strokeWidth="1.2"
        />
        <path
          d="M 132 55 Q 155 45 165 75 Q 145 72 132 85"
          fill="url(#goldCrown)"
          stroke="#78350F"
          strokeWidth="1.2"
        />

        {/* Mukut Peacock & Floral Rays */}
        <circle cx="75" cy="72" r="3" fill="#DC2626" />
        <circle cx="165" cy="72" r="3" fill="#DC2626" />
        <path d="M 120 35 L 120 45" stroke="#78350F" strokeWidth="2" />
        <path d="M 112 38 L 128 38" stroke="#78350F" strokeWidth="1.5" />
      </g>

      {/* Face Contour & Warm Complexion */}
      <path
        d="M 68 95 C 68 150 90 195 120 205 C 150 195 172 150 172 95 Z"
        fill="#FFFBF5"
        stroke="#E2D9CE"
        strokeWidth="1"
      />

      {/* Third Eye (ত্রিনয়ন - Trinayana) on Forehead */}
      <g id="trinayana">
        <path
          d="M 120 95 C 113 107 113 121 120 133 C 127 121 127 107 120 95 Z"
          fill="url(#sindoorRed)"
          stroke="#7F1D1D"
          strokeWidth="1.5"
        />
        {/* Sacred Golden Flame inside 3rd eye */}
        <path
          d="M 120 102 C 117 110 117 119 120 126 C 123 119 123 110 120 102 Z"
          fill="#FEF08A"
        />
        <circle cx="120" cy="114" r="2.2" fill="#FFFFFF" />
      </g>

      {/* Chandan Alpona Ornamentation Above Brows */}
      <g id="chandanDots">
        {/* Central Crescent beneath 3rd Eye */}
        <path
          d="M 115 137 Q 120 141 125 137"
          stroke="#DC2626"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="120" cy="143" r="2.2" fill="#DC2626" />

        {/* Left Brow Chandan Garland */}
        {[82, 88, 94, 100, 106, 112].map((x, i) => (
          <circle key={`dl_${i}`} cx={x} cy={114 - (i % 2) * 2} r="1.6" fill="#FDE68A" />
        ))}
        {/* Right Brow Chandan Garland */}
        {[128, 134, 140, 146, 152, 158].map((x, i) => (
          <circle key={`dr_${i}`} cx={x} cy={114 - ((6 - i) % 2) * 2} r="1.6" fill="#FDE68A" />
        ))}
      </g>

      {/* Left Eyebrow & Expressive Kohl-Lined Eye */}
      <g id="leftEye">
        <path
          d="M 78 122 C 90 115 106 116 114 124"
          stroke="#1C1917"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Eye shape */}
        <path
          d="M 78 132 C 88 124 104 125 113 136 C 103 143 87 143 78 132 Z"
          fill="#FFFFFF"
          stroke="#1C1917"
          strokeWidth="2.5"
        />
        {/* Iris */}
        <ellipse cx="97" cy="132" rx="5.5" ry="6" fill="#1C1917" />
        <circle cx="99" cy="130" r="1.8" fill="#FFFFFF" />
        {/* Outer eyeliner tail */}
        <path d="M 78 132 C 72 130 67 127 63 123" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Right Eyebrow & Expressive Kohl-Lined Eye */}
      <g id="rightEye">
        <path
          d="M 162 122 C 150 115 134 116 126 124"
          stroke="#1C1917"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Eye shape */}
        <path
          d="M 162 132 C 152 124 136 125 127 136 C 137 143 153 143 162 132 Z"
          fill="#FFFFFF"
          stroke="#1C1917"
          strokeWidth="2.5"
        />
        {/* Iris */}
        <ellipse cx="143" cy="132" rx="5.5" ry="6" fill="#1C1917" />
        <circle cx="141" cy="130" r="1.8" fill="#FFFFFF" />
        {/* Outer eyeliner tail */}
        <path d="M 162 132 C 168 130 173 127 177 123" stroke="#1C1917" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* Nose, Nose-Ring (Noth) & Benevolent Smile */}
      <g id="lowerFeatures">
        <path
          d="M 120 137 L 118 163 C 115 166 125 166 122 163"
          stroke="#78350F"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Golden Nose Ring (Noth) with Ruby Drop */}
        <circle cx="108" cy="165" r="9" stroke="#D97706" strokeWidth="2.2" fill="none" />
        <circle cx="102" cy="172" r="3" fill="#DC2626" />
        <circle cx="102" cy="176" r="1.5" fill="#FEF08A" />
        <path d="M 108 156 Q 96 148 85 142" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 2" />

        {/* Sacred Crimson Lips (Benevolent Smile) */}
        <path
          d="M 105 178 Q 120 175 135 178 Q 120 188 105 178 Z"
          fill="#DC2626"
          stroke="#991B1B"
          strokeWidth="1.2"
        />
        <path d="M 106 178 Q 120 182 134 178" stroke="#7F1D1D" strokeWidth="1" />
      </g>
    </svg>
  );
};

/**
 * Traditional Bengali Dhaak (Festive Drum)
 * Complete with wooden barrel body, kasher kanchi (cane beaters),
 * white feather plume tufts, and rhythmic pulsation styling.
 */
export const DhaakInstrument: React.FC<DurgaArtProps & { animate?: boolean }> = ({
  className = '',
  size = 56,
  animate = true
}) => {
  return (
    <svg
      viewBox="0 0 120 100"
      width={size}
      height={typeof size === 'number' ? (size * 5) / 6 : size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animate ? 'animate-dhaak' : ''}`}
      aria-label="Traditional Bengali Dhaak Drum"
    >
      <defs>
        <linearGradient id="dhaakWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <linearGradient id="dhaakCloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="50%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Dhaak Barrel Drum Body */}
      <g id="drumBody">
        {/* Leather Membrane Left Head */}
        <ellipse cx="25" cy="50" rx="8" ry="24" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
        <ellipse cx="25" cy="50" rx="4" ry="16" fill="#FDE68A" />

        {/* Wooden Middle Barrel */}
        <path
          d="M 25 26 Q 60 16 95 26 L 95 74 Q 60 84 25 74 Z"
          fill="url(#dhaakWood)"
          stroke="#451A03"
          strokeWidth="2"
        />

        {/* Traditional Red & White Gamchha / Saree Cloth Wrap */}
        <path
          d="M 40 23 Q 60 18 80 23 L 80 77 Q 60 82 40 77 Z"
          fill="url(#dhaakCloth)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* White Border Lines on Wrap */}
        <path d="M 43 23 L 43 77" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M 77 23 L 77 77" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Leather Lacing (Tuning Braids) */}
        <path d="M 25 26 L 60 78 L 95 26" stroke="#FEF3C7" strokeWidth="1.5" opacity="0.8" />
        <path d="M 25 74 L 60 22 L 95 74" stroke="#FEF3C7" strokeWidth="1.5" opacity="0.8" />

        {/* Leather Membrane Right Head */}
        <ellipse cx="95" cy="50" rx="8" ry="24" fill="#FEF3C7" stroke="#92400E" strokeWidth="2" />
        <ellipse cx="95" cy="50" rx="4" ry="16" fill="#FDE68A" />
      </g>

      {/* Feather Plumes (কাশের চামর / পালক) attached to Dhaak */}
      <g id="plumes">
        <path
          d="M 95 26 Q 110 8 116 12 Q 106 24 95 28"
          fill="#FFFDF9"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <path
          d="M 95 28 Q 116 20 120 26 Q 108 34 95 32"
          fill="#FFFDF9"
          stroke="#E2E8F0"
          strokeWidth="1"
        />
        <circle cx="95" cy="27" r="3" fill="#DC2626" />
      </g>

      {/* Crossed Cane Drumsticks (কাঠী / Kasher Kanchi) */}
      <g id="drumsticks">
        <line x1="8" y1="18" x2="38" y2="76" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="10" y1="76" x2="36" y2="18" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/**
 * Kaash Ful (White Autumn Plumes / Saccharum Spontaneum)
 * Iconic symbol of Maa Durga's autumnal homecoming in Bengal.
 * Elegantly sways in the breeze with CSS keyframe animation.
 */
export const KaashFul: React.FC<DurgaArtProps & { stems?: number }> = ({
  className = '',
  size = 60,
  stems = 3
}) => {
  return (
    <svg
      viewBox="0 0 100 120"
      width={size}
      height={typeof size === 'number' ? (size * 6) / 5 : size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} animate-kaash`}
      aria-label="Kaash Ful (Autumn Reeds)"
    >
      {/* Primary Kaash Stem */}
      <path
        d="M 35 115 Q 40 70 50 30 Q 55 12 62 5"
        stroke="#65A30D"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Primary White Plume Feathers */}
      <g fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5">
        <path d="M 50 30 Q 62 20 68 12 Q 58 26 53 36 Z" />
        <path d="M 52 24 Q 68 15 74 6 Q 62 20 56 28 Z" />
        <path d="M 54 18 Q 72 8 80 2 Q 66 14 58 22 Z" />
        <path d="M 48 36 Q 34 26 30 18 Q 42 28 47 38 Z" />
        <path d="M 51 28 Q 36 18 34 10 Q 44 22 49 32 Z" />
      </g>

      {/* Secondary Kaash Stem (if stems >= 2) */}
      {stems >= 2 && (
        <>
          <path
            d="M 25 115 Q 28 75 35 45 Q 38 30 42 20"
            stroke="#84CC16"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <g fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5">
            <path d="M 35 45 Q 45 38 48 30 Q 40 42 36 49 Z" />
            <path d="M 37 38 Q 50 28 54 22 Q 42 34 38 42 Z" />
            <path d="M 32 48 Q 22 40 18 32 Q 28 42 31 52 Z" />
          </g>
        </>
      )}

      {/* Tertiary Kaash Stem (if stems >= 3) */}
      {stems >= 3 && (
        <>
          <path
            d="M 55 115 Q 56 80 65 52 Q 70 38 78 28"
            stroke="#4D7C0F"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <g fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.5">
            <path d="M 65 52 Q 78 44 84 36 Q 72 48 67 56 Z" />
            <path d="M 68 45 Q 82 36 88 28 Q 74 42 69 50 Z" />
            <path d="M 62 55 Q 52 46 48 40 Q 56 48 60 58 Z" />
          </g>
        </>
      )}
    </svg>
  );
};

/**
 * Bengali Alpona Sacred Floor Art Mandala
 * Traditional concentric circular geometry with lotus petals and paisley kalka.
 * Used as elegant ambient watermarks for cards and background surfaces.
 */
export const AlponaWatermark: React.FC<DurgaArtProps & { opacity?: number; color?: string }> = ({
  className = '',
  size = 180,
  opacity = 0.08,
  color = '#DC2626'
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} pointer-events-none select-none`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Concentric Circles */}
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="85" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="65" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="45" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="25" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="8" fill={color} />

      {/* 8-Petal Central Lotus */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={`lotus_${i}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 75 C 92 65 92 50 100 45 C 108 50 108 65 100 75 Z"
            stroke={color}
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="100" cy="40" r="2.5" fill={color} />
        </g>
      ))}

      {/* Outer Kalka (Paisley) Flurry */}
      {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
        <g key={`kalka_${i}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 35 C 90 25 96 15 102 12 C 106 18 104 28 100 35 Z"
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        </g>
      ))}
    </svg>
  );
};

/**
 * Sacred Conch Shell (শঙ্খ - Shankha)
 * Auspicious symbol blown during puja sandhya aarti.
 */
export const ConchShankha: React.FC<DurgaArtProps> = ({
  className = '',
  size = 28
}) => {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Auspicious Shankha (Conch Shell)"
    >
      <path
        d="M 15 32 C 15 18 28 10 40 16 C 50 22 52 35 44 45 C 38 52 26 52 18 45 C 12 38 15 32 15 32 Z"
        fill="#FFFDF9"
        stroke="#D97706"
        strokeWidth="2"
      />
      <path d="M 28 10 C 24 16 25 28 32 35 C 38 42 46 42 48 36" stroke="#B45309" strokeWidth="1.5" />
      <path d="M 32 18 C 30 24 32 30 38 34" stroke="#DC2626" strokeWidth="1.2" />
      <circle cx="46" cy="46" r="2.5" fill="#DC2626" />
    </svg>
  );
};

/**
 * Sacred Trishul (ত্রিশূল)
 * Weapon of victory and righteousness held by Maa Durga.
 */
export const TrishulMotif: React.FC<DurgaArtProps> = ({
  className = '',
  size = 24
}) => {
  return (
    <svg
      viewBox="0 0 40 60"
      width={size}
      height={(Number(size) * 3) / 2}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sacred Trishul"
    >
      {/* Central Blade */}
      <path d="M 20 5 L 24 22 L 20 20 L 16 22 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
      {/* Left Prongs */}
      <path d="M 20 20 C 12 18 8 10 6 8 C 7 16 14 26 20 26" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Right Prongs */}
      <path d="M 20 20 C 28 18 32 10 34 8 C 33 16 26 26 20 26" stroke="#D97706" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Shaft */}
      <line x1="20" y1="20" x2="20" y2="55" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
