'use client';

import React from 'react';

interface ServiceIconProps {
  className?: string;
}

const sparkKeyframes = `
@keyframes spark {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -1000; }
}
`;

function SparkStyle() {
  return <style>{sparkKeyframes}</style>;
}

/**
 * Residential — 3D house with animated perimeter spark
 */
export function HouseIcon({ className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <SparkStyle />
      <defs>
        <linearGradient id="houseFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A10B0" />
          <stop offset="100%" stopColor="#6D0091" />
        </linearGradient>
        <linearGradient id="houseSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#520070" />
          <stop offset="100%" stopColor="#3D0054" />
        </linearGradient>
        <linearGradient id="houseRoof" x1="0" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="#C636FF" />
          <stop offset="100%" stopColor="#9A1FCC" />
        </linearGradient>
        <linearGradient id="houseRoofSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7A12A0" />
          <stop offset="100%" stopColor="#5A0D78" />
        </linearGradient>
      </defs>

      {/* Front face */}
      <polygon points="40,100 40,165 120,165 120,100" fill="url(#houseFront)" />
      {/* Side face (3D) */}
      <polygon points="120,100 120,165 160,145 160,82" fill="url(#houseSide)" />
      {/* Roof front */}
      <polygon points="30,100 80,50 130,100" fill="url(#houseRoof)" />
      {/* Roof side (3D) */}
      <polygon points="130,100 80,50 120,38 170,82" fill="url(#houseRoofSide)" />

      {/* Door */}
      <rect x="65" y="125" width="25" height="40" rx="2" fill="#3D0054" />
      <circle cx="85" cy="147" r="2" fill="#C636FF" />

      {/* Window */}
      <rect x="97" y="110" width="16" height="16" rx="2" fill="#3D0054" />
      <line x1="105" y1="110" x2="105" y2="126" stroke="#520070" strokeWidth="1.5" />
      <line x1="97" y1="118" x2="113" y2="118" stroke="#520070" strokeWidth="1.5" />

      {/* Chimney */}
      <rect x="110" y="42" width="14" height="30" rx="1" fill="#520070" />
      <rect x="108" y="38" width="18" height="6" rx="1" fill="#6D0091" />

      {/* Perimeter spark */}
      <polygon
        points="30,100 80,50 120,38 170,82 160,145 120,165 40,165 40,100"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        pathLength={1000}
        strokeDasharray="60 940"
        strokeLinecap="round"
        style={{ animation: 'spark 10s linear infinite' }}
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Commercial — 3D apartment building with animated perimeter spark
 */
export function ApartmentIcon({ className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <SparkStyle />
      <defs>
        <linearGradient id="bldgFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8A10B0" />
          <stop offset="100%" stopColor="#6D0091" />
        </linearGradient>
        <linearGradient id="bldgSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#520070" />
          <stop offset="100%" stopColor="#3D0054" />
        </linearGradient>
        <linearGradient id="bldgTop" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#9A1FCC" />
          <stop offset="100%" stopColor="#C636FF" />
        </linearGradient>
      </defs>

      {/* Main building front */}
      <rect x="35" y="45" width="80" height="125" fill="url(#bldgFront)" />
      {/* Main building side (3D) */}
      <polygon points="115,45 115,170 150,150 150,30" fill="url(#bldgSide)" />
      {/* Main building top (3D) */}
      <polygon points="35,45 115,45 150,30 70,30" fill="url(#bldgTop)" />

      {/* Penthouse */}
      <rect x="55" y="30" width="40" height="15" fill="#7A12A0" />
      <polygon points="55,30 95,30 110,22 70,22" fill="#C636FF" />
      <polygon points="95,30 95,45 110,37 110,22" fill="#520070" />

      {/* Window rows — front face */}
      {[60, 80, 100, 120, 140].map((y) => (
        <React.Fragment key={y}>
          <rect x="44" y={y} width="10" height="12" rx="1" fill="#3D0054" opacity="0.9" />
          <rect x="60" y={y} width="10" height="12" rx="1" fill="#3D0054" opacity="0.9" />
          <rect x="76" y={y} width="10" height="12" rx="1" fill="#3D0054" opacity="0.9" />
          <rect x="92" y={y} width="10" height="12" rx="1" fill="#3D0054" opacity="0.9" />
        </React.Fragment>
      ))}

      {/* Window rows — side face */}
      {[60, 80, 100, 120, 140].map((y, i) => (
        <React.Fragment key={`s${y}`}>
          <polygon
            points={`${120},${y} ${130},${y - 3} ${130},${y + 9} ${120},${y + 12}`}
            fill="#2A0038"
            opacity="0.8"
          />
          <polygon
            points={`${133},${y - 4} ${143},${y - 7} ${143},${y + 5} ${133},${y + 8}`}
            fill="#2A0038"
            opacity="0.7"
          />
        </React.Fragment>
      ))}

      {/* Entrance */}
      <rect x="62" y="152" width="26" height="18" rx="2" fill="#3D0054" />
      <rect x="72" y="152" width="6" height="18" fill="#2A0038" />

      {/* Perimeter spark */}
      <polygon
        points="35,170 35,45 70,30 70,22 110,22 110,30 150,30 150,150 115,170"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        pathLength={1000}
        strokeDasharray="60 940"
        strokeLinecap="round"
        style={{ animation: 'spark 10s linear infinite' }}
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Lighting — 3D lightbulb with filament and animated perimeter spark
 */
export function LightbulbIcon({ className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <SparkStyle />
      <defs>
        <radialGradient id="bulbGlow" cx="0.5" cy="0.4" r="0.5">
          <stop offset="0%" stopColor="#E8A0FF" />
          <stop offset="50%" stopColor="#C636FF" />
          <stop offset="100%" stopColor="#8A10B0" />
        </radialGradient>
        <linearGradient id="bulbBase" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7A12A0" />
          <stop offset="100%" stopColor="#520070" />
        </linearGradient>
        <radialGradient id="bulbHighlight" cx="0.35" cy="0.35" r="0.4">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glow aura */}
      <ellipse cx="100" cy="78" rx="52" ry="52" fill="#C636FF" opacity="0.08" />
      <ellipse cx="100" cy="78" rx="42" ry="42" fill="#C636FF" opacity="0.06" />

      {/* Bulb body */}
      <path
        d="M100 25 C65 25, 42 55, 42 82 C42 105, 55 118, 70 132 C73 135, 75 140, 75 145 L125 145 C125 140, 127 135, 130 132 C145 118, 158 105, 158 82 C158 55, 135 25, 100 25Z"
        fill="url(#bulbGlow)"
      />
      {/* Highlight */}
      <path
        d="M100 25 C65 25, 42 55, 42 82 C42 105, 55 118, 70 132 C73 135, 75 140, 75 145 L125 145 C125 140, 127 135, 130 132 C145 118, 158 105, 158 82 C158 55, 135 25, 100 25Z"
        fill="url(#bulbHighlight)"
      />

      {/* Filament */}
      <path
        d="M88 100 Q92 80, 96 100 Q100 120, 104 100 Q108 80, 112 100"
        stroke="#FFE0FF"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Screw base */}
      <rect x="75" y="145" width="50" height="8" rx="2" fill="url(#bulbBase)" />
      <rect x="78" y="153" width="44" height="6" rx="1" fill="#6D0091" />
      <rect x="81" y="159" width="38" height="6" rx="1" fill="#520070" />
      <rect x="84" y="165" width="32" height="6" rx="3" fill="#3D0054" />

      {/* Screw base grooves */}
      <line x1="78" y1="155.5" x2="122" y2="155.5" stroke="#3D0054" strokeWidth="0.8" opacity="0.5" />
      <line x1="81" y1="161.5" x2="119" y2="161.5" stroke="#2A0038" strokeWidth="0.8" opacity="0.5" />

      {/* Perimeter spark — traces the bulb and base outline */}
      <path
        d="M100 25 C65 25, 42 55, 42 82 C42 105, 55 118, 70 132 C73 135, 75 140, 75 145 L75 153 L78 153 L78 159 L81 159 L81 165 L84 165 L84 171 L116 171 L116 165 L119 165 L119 159 L122 159 L122 153 L125 153 L125 145 C125 140, 127 135, 130 132 C145 118, 158 105, 158 82 C158 55, 135 25, 100 25Z"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        pathLength={1000}
        strokeDasharray="60 940"
        strokeLinecap="round"
        style={{ animation: 'spark 10s linear infinite' }}
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Safety — 3D shield with bolt inside and animated perimeter spark
 */
export function ShieldIcon({ className }: ServiceIconProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <SparkStyle />
      <defs>
        <linearGradient id="shieldFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9A1FCC" />
          <stop offset="100%" stopColor="#6D0091" />
        </linearGradient>
        <linearGradient id="shieldEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#520070" />
          <stop offset="100%" stopColor="#3D0054" />
        </linearGradient>
        <linearGradient id="shieldHighlight" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Shield 3D edge (right side) */}
      <path
        d="M100 28 L155 52 C155 52, 152 130, 100 175 L108 170 C158 128, 163 55, 163 50 L108 28Z"
        fill="url(#shieldEdge)"
      />

      {/* Shield main face */}
      <path
        d="M100 28 L45 52 C45 52, 48 140, 100 175 C152 140, 155 52, 155 52Z"
        fill="url(#shieldFront)"
      />

      {/* Shield highlight */}
      <path
        d="M100 28 L45 52 C45 52, 48 140, 100 175 C152 140, 155 52, 155 52Z"
        fill="url(#shieldHighlight)"
      />

      {/* Inner border accent */}
      <path
        d="M100 42 L58 62 C58 62, 60 132, 100 162 C140 132, 142 62, 142 62Z"
        fill="none"
        stroke="#C636FF"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Lightning bolt */}
      <polygon
        points="105,65 85,107 98,107 92,140 118,95 104,95 112,65"
        fill="#C636FF"
      />
      <polygon
        points="105,65 85,107 98,107 92,140 118,95 104,95 112,65"
        fill="white"
        opacity="0.25"
      />

      {/* Perimeter spark */}
      <path
        d="M100 28 L45 52 C45 52, 48 140, 100 175 C152 140, 155 52, 155 52 L100 28Z"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        pathLength={1000}
        strokeDasharray="60 940"
        strokeLinecap="round"
        style={{ animation: 'spark 10s linear infinite' }}
        opacity="0.85"
      />
    </svg>
  );
}

const serviceIconMap: Record<string, React.FC<ServiceIconProps>> = {
  residential: HouseIcon,
  commercial: ApartmentIcon,
  lighting: LightbulbIcon,
  safety: ShieldIcon,
};

export function AnimatedServiceIcon({ serviceId, className }: { serviceId: string; className?: string }) {
  const Icon = serviceIconMap[serviceId];
  if (!Icon) return null;
  return <Icon className={className} />;
}
