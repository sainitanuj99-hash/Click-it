import React from 'react';

export const HeroLogisticsBackground: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{ contain: 'strict', transform: 'translate3d(0, 0, 0)' }}
    >
      {/* 1. Luminous Warm Ambient Sunlight & Radial Gradients (Pure lightweight CSS gradients, no heavy blur filters) */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 10%, rgba(255, 93, 0, 0.08) 0%, transparent 70%),
            radial-gradient(circle 350px at 15% 35%, rgba(245, 158, 11, 0.06) 0%, transparent 80%),
            radial-gradient(circle 350px at 85% 45%, rgba(255, 93, 0, 0.06) 0%, transparent 80%)
          `
        }}
      />

      {/* 2. Jaipur Logistics Route SVG Topology Canvas (Lightweight, No feGaussianBlur filters) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5D00" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FF7A29" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF5D00" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="routeAmber" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#FF5D00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="routeEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF5D00" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF5D00" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Route 1: North-South Industrial Expressway */}
        <path
          d="M 180,60 C 320,160 420,290 540,430 C 660,570 820,720 1120,830"
          fill="none"
          stroke="url(#routeOrange)"
          strokeWidth="2"
          strokeDasharray="6 8"
        />

        {/* Route 2: West-East City Corridor */}
        <path
          d="M 120,720 C 340,650 560,540 840,490 C 1080,450 1260,380 1420,290"
          fill="none"
          stroke="url(#routeAmber)"
          strokeWidth="2"
          strokeDasharray="8 6"
        />

        {/* Route 3: Central Express Ring */}
        <path
          d="M 280,310 Q 520,180 820,240 T 1320,190"
          fill="none"
          stroke="#FF5D00"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        {/* Route 4: Southwest Logistics Spur */}
        <path
          d="M 380,820 C 580,740 760,780 1020,720"
          fill="none"
          stroke="url(#routeEmerald)"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />

        {/* Dynamic Moving Delivery Pulses (Smooth, hardware-accelerated) */}
        <circle r="5" fill="#FF5D00" stroke="#FFFFFF" strokeWidth="1.5">
          <animateMotion
            path="M 180,60 C 320,160 420,290 540,430 C 660,570 820,720 1120,830"
            dur="14s"
            repeatCount="indefinite"
          />
        </circle>

        <circle r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5">
          <animateMotion
            path="M 120,720 C 340,650 560,540 840,490 C 1080,450 1260,380 1420,290"
            dur="10s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Key Logistics Hub Nodes */}
        <g transform="translate(240, 105)">
          <circle r="12" fill="url(#hubGlow)" opacity="0.4" />
          <circle r="5" fill="#FF5D00" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
        <g transform="translate(540, 430)">
          <circle r="14" fill="url(#hubGlow)" opacity="0.4" />
          <circle r="6" fill="#FF5D00" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
        <g transform="translate(840, 490)">
          <circle r="12" fill="url(#hubGlow)" opacity="0.4" />
          <circle r="5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
        <g transform="translate(1080, 810)">
          <circle r="14" fill="url(#hubGlow)" opacity="0.4" />
          <circle r="6" fill="#FF5D00" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>

      {/* 3. Delicate Cyber Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
    </div>
  );
};

