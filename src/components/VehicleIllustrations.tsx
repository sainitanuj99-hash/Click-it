import React from 'react';

interface VehicleIllustrationProps {
  vehicleId: string;
  className?: string;
}

export const VehicleIllustration: React.FC<VehicleIllustrationProps> = ({ vehicleId, className = "w-20 h-14" }) => {
  switch (vehicleId) {
    case 'scooter-express':
      return (
        <svg viewBox="0 0 100 65" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Motion Lines */}
          <path d="M 4 24 H 14 M 2 32 H 10 M 6 40 H 16" stroke="#FF5D00" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          
          {/* Branded Delivery Parcel Box with 'C' Monogram */}
          <rect x="18" y="14" width="26" height="24" rx="3" fill="#FF5D00" />
          <path d="M 33 22 C 28 22 24 25 24 29 C 24 33 28 36 33 36 C 36 36 38 35 39 33 L 36 31 C 35 32 34 33 33 33 C 31 33 29 31.5 29 29 C 29 26.5 31 25 33 25 C 34 25 35 26 36 27 L 39 25 C 38 23 36 22 33 22 Z" fill="#FFFFFF" />
          
          {/* Scooter Chassis & Body */}
          <path d="M 44 28 L 52 28 C 55 28 58 32 58 36 L 58 44 C 58 46 56 48 54 48 H 36" fill="#18181B" />
          <path d="M 40 34 H 60 C 66 34 72 26 74 18 H 80" stroke="#FF5D00" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Handlebar & Windshield Headlight */}
          <path d="M 74 18 L 78 12 H 84" stroke="#D4D4D8" strokeWidth="3" strokeLinecap="round" />
          <circle cx="82" cy="18" r="3.5" fill="#38BDF8" />
          
          {/* Driver Seat Cushion */}
          <path d="M 42 26 C 42 23 46 22 54 22 C 58 22 62 25 62 28 Z" fill="#27272A" />

          {/* Front Fender Guard */}
          <path d="M 72 38 C 72 32 78 30 84 34 L 86 42" stroke="#FF5D00" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Wheels */}
          {/* Rear Wheel */}
          <circle cx="32" cy="48" r="9" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="32" cy="48" r="5" fill="#FFFFFF" />
          <circle cx="32" cy="48" r="2" fill="#FF5D00" />
          
          {/* Front Wheel */}
          <circle cx="80" cy="48" r="9" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="80" cy="48" r="5" fill="#FFFFFF" />
          <circle cx="80" cy="48" r="2" fill="#FF5D00" />
        </svg>
      );

    case 'three-wheeler':
      return (
        <svg viewBox="0 0 110 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Motion Lines */}
          <path d="M 4 28 H 12 M 2 38 H 10" stroke="#FF5D00" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Cargo Bed */}
          <rect x="18" y="20" width="48" height="28" rx="2" fill="#FF5D00" />
          <path d="M 18 28 H 66 M 18 36 H 66" stroke="#EA580C" strokeWidth="1.5" />
          {/* Cabin */}
          <path d="M 66 20 H 84 C 90 20 96 26 98 32 L 102 44 C 104 48 102 52 96 52 H 66 V 20 Z" fill="#27272A" />
          <path d="M 72 24 H 86 C 89 24 92 27 93 30 L 96 38 H 72 V 24 Z" fill="#334155" />
          {/* Wheels */}
          <circle cx="34" cy="52" r="9" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="34" cy="52" r="3.5" fill="#FF5D00" />
          <circle cx="88" cy="52" r="9" fill="#18181B" stroke="#71717A" strokeWidth="2" />
          <circle cx="88" cy="52" r="3.5" fill="#FF5D00" />
        </svg>
      );

    case 'tata-ace':
      return (
        <svg viewBox="0 0 115 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Container Body (Chota Hathi) */}
          <rect x="16" y="16" width="56" height="34" rx="3" fill="#FF5D00" />
          <rect x="20" y="20" width="48" height="26" rx="2" fill="#18181B" opacity="0.15" />
          <path d="M 32 16 V 50 M 48 16 V 50" stroke="#EA580C" strokeWidth="2" />
          {/* Cabin */}
          <path d="M 72 26 H 92 C 98 26 102 30 104 36 L 107 44 C 108 47 107 50 102 50 H 72 V 26 Z" fill="#27272A" />
          <path d="M 76 29 H 90 C 93 29 95 31 96 34 L 98 40 H 76 V 29 Z" fill="#38BDF8" opacity="0.85" />
          {/* Wheels */}
          <circle cx="36" cy="52" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="36" cy="52" r="3.5" fill="#FF5D00" />
          <circle cx="88" cy="52" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="88" cy="52" r="3.5" fill="#FF5D00" />
        </svg>
      );

    case 'pickup-8ft':
    case 'pickup-9ft':
      return (
        <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Open Heavy Pickup Bed */}
          <rect x="14" y="22" width="62" height="26" rx="2" fill="#FF5D00" />
          <path d="M 14 30 H 76 M 14 38 H 76" stroke="#C2410C" strokeWidth="1.5" />
          {/* Heavy Bolero Cabin */}
          <path d="M 76 20 H 96 C 102 20 108 26 110 32 L 114 44 C 115 48 114 50 108 50 H 76 V 20 Z" fill="#18181B" stroke="#27272A" />
          <path d="M 80 24 H 94 C 97 24 100 27 101 30 L 104 38 H 80 V 24 Z" fill="#93C5FD" opacity="0.9" />
          {/* Wheels */}
          <circle cx="34" cy="50" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="34" cy="50" r="4" fill="#FF5D00" />
          <circle cx="94" cy="50" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="94" cy="50" r="4" fill="#FF5D00" />
        </svg>
      );

    case 'container-14ft':
    case 'container-19ft':
      return (
        <svg viewBox="0 0 130 75" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Closed Freight Container */}
          <rect x="12" y="12" width="74" height="42" rx="4" fill="#FF5D00" />
          <path d="M 28 12 V 54 M 44 12 V 54 M 60 12 V 54 M 76 12 V 54" stroke="#EA580C" strokeWidth="2" />
          {/* Truck Cabin */}
          <path d="M 86 24 H 106 C 112 24 118 30 120 38 L 123 48 C 124 52 122 54 116 54 H 86 V 24 Z" fill="#27272A" />
          <path d="M 90 28 H 104 C 108 28 110 30 112 34 L 114 42 H 90 V 28 Z" fill="#38BDF8" opacity="0.85" />
          {/* Wheels */}
          <circle cx="30" cy="56" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="30" cy="56" r="4" fill="#FF5D00" />
          <circle cx="68" cy="56" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="68" cy="56" r="4" fill="#FF5D00" />
          <circle cx="106" cy="56" r="10" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="106" cy="56" r="4" fill="#FF5D00" />
        </svg>
      );

    case 'reefer-van':
      return (
        <svg viewBox="0 0 120 70" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Refrigerated Sealed Body */}
          <rect x="14" y="14" width="64" height="38" rx="4" fill="#38BDF8" />
          <path d="M 20 22 L 28 30 M 28 22 L 20 30" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <text x="36" y="28" fill="#FFFFFF" fontSize="9" fontWeight="bold">COLD-CHAIN</text>
          {/* Cabin */}
          <path d="M 78 24 H 96 C 102 24 106 28 108 34 L 110 44 C 111 48 109 52 104 52 H 78 V 24 Z" fill="#18181B" />
          <path d="M 82 28 H 94 C 97 28 99 30 100 34 L 102 40 H 82 V 28 Z" fill="#7DD3FC" />
          {/* Wheels */}
          <circle cx="34" cy="54" r="9" fill="#18181B" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="34" cy="54" r="3.5" fill="#38BDF8" />
          <circle cx="94" cy="54" r="9" fill="#18181B" stroke="#38BDF8" strokeWidth="2" />
          <circle cx="94" cy="54" r="3.5" fill="#38BDF8" />
        </svg>
      );

    case 'heavy-hauler-32ft':
    default:
      return (
        <svg viewBox="0 0 140 75" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 32ft Multi-Axle Body */}
          <rect x="8" y="10" width="88" height="44" rx="4" fill="#FF5D00" />
          <path d="M 24 10 V 54 M 40 10 V 54 M 56 10 V 54 M 72 10 V 54" stroke="#EA580C" strokeWidth="2" />
          {/* Cabin */}
          <path d="M 96 22 H 118 C 124 22 130 28 132 36 L 135 48 C 136 52 134 54 128 54 H 96 V 22 Z" fill="#18181B" />
          <path d="M 100 26 H 116 C 120 26 122 28 124 32 L 126 40 H 100 V 26 Z" fill="#93C5FD" opacity="0.9" />
          {/* Multi-Axle Wheels */}
          <circle cx="22" cy="56" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="22" cy="56" r="3.5" fill="#FF5D00" />
          <circle cx="42" cy="56" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="42" cy="56" r="3.5" fill="#FF5D00" />
          <circle cx="78" cy="56" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="78" cy="56" r="3.5" fill="#FF5D00" />
          <circle cx="116" cy="56" r="9" fill="#18181B" stroke="#A1A1AA" strokeWidth="2" />
          <circle cx="116" cy="56" r="3.5" fill="#FF5D00" />
        </svg>
      );
  }
};
