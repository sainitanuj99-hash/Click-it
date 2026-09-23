import React from 'react';
import { motion } from 'motion/react';

export interface LogoMarkProps {
  className?: string;
  animated?: boolean;
  color?: string;
  pulse?: boolean;
}

/**
 * Clickit Precision C-Location Pin Monogram
 * Derived directly from official brand vector:
 * A distinctive location pin tapering downward with an inset geometric 'C' opening.
 */
export const ClickitLogoMark: React.FC<LogoMarkProps> = ({
  className = 'w-12 h-13',
  animated = false,
  color = '#00a6c7',
  pulse = true,
}) => {
  const content = (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Dynamic ground shadow & radar pulse wave */}
      {animated && pulse && (
        <motion.span
          animate={{ scale: [0.85, 1.35, 0.85], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-1 w-2/3 h-1.5 bg-[#00a6c7]/40 rounded-full blur-[2px] pointer-events-none"
        />
      )}

      {/* Official C-Pin Brand Geometry */}
      <svg
        viewBox="0 0 100 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(0, 166, 199,0.3)] select-none"
      >
        {/* Refined White Center Core of C */}
        <circle cx="50" cy="40" r="11" fill="#FFFFFF" />

        {/* Orange Outer Location Pin C */}
        <path
          d="M 82.88 25.36 A 36 36 0 1 0 21.2 61.6 L 50 100 L 78.8 61.6 A 36 36 0 0 0 81.79 56.9 L 66.77 48.92 A 19 19 0 1 1 67.35 32.27 Z"
          fill={color}
        />
      </svg>
    </div>
  );

  if (!animated) {
    return content;
  }

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
      className="inline-flex items-center justify-center"
    >
      {content}
    </motion.div>
  );
};

export interface WordmarkProps {
  className?: string;
  textColorIt?: 'white' | 'dark' | 'orange';
  showTrailingDot?: boolean;
  animatedPin?: boolean;
  useImage?: boolean;
}

/**
 * Clickit Official Default Wordmark:
 * - "Click" in solid brand orange (#00a6c7) with solid circular dot on 'i'
 * - "it" in white (or dark) with signature hollow ring dot on 'i'
 * - Perfectly matches user's official default logo.png
 */
export const ClickitWordmark: React.FC<WordmarkProps> = ({
  className = '',
  textColorIt = 'white',
  showTrailingDot = false,
  useImage = false,
}) => {
  if (useImage) {
    return (
      <img
        src="/logo.png"
        alt="Clickit"
        className={`inline-block select-none object-contain ${className}`}
      />
    );
  }

  return (
    <span
      className={`font-['Poppins',sans-serif] font-bold tracking-[-0.025em] leading-none inline-flex items-baseline select-none ${className}`}
    >
      {/* "Click" Section: Solid Orange with solid circular dot on 'i' */}
      <span className="text-[#00a6c7] inline-flex items-baseline">
        Click
      </span>

      {/* "it" Section: White (or dark) with hollow ring dot on 'i' */}
      <span
        className={`inline-flex items-baseline ${
          textColorIt === 'white'
            ? 'text-white'
            : textColorIt === 'orange'
            ? 'text-[#00a6c7]'
            : 'text-zinc-900'
        }`}
      >
        {/* Custom 'i' in "it" with hollow ring dot */}
        <span className="relative inline-flex flex-col items-center justify-end align-baseline mx-[0.015em]">
          {/* Hollow ring dot: circular ring with transparent center */}
          <span
            className={`absolute bottom-[0.54em] left-1/2 -translate-x-1/2 rounded-full border-[0.038em] ${
              textColorIt === 'white'
                ? 'border-white bg-transparent'
                : textColorIt === 'orange'
                ? 'border-[#00a6c7] bg-transparent'
                : 'border-zinc-900 bg-transparent'
            }`}
            style={{
              width: '0.155em',
              height: '0.155em',
            }}
          />
          {/* Stem of 'i' */}
          <span
            className={`inline-block rounded-[0.015em] ${
              textColorIt === 'white'
                ? 'bg-white'
                : textColorIt === 'orange'
                ? 'bg-[#00a6c7]'
                : 'bg-zinc-900'
            }`}
            style={{
              width: '0.135em',
              height: '0.52em',
            }}
          />
        </span>
        <span>t</span>
      </span>

      {/* Optional Trailing Brand Dot (defaults to false to match logo.png) */}
      {showTrailingDot && (
        <span
          className="inline-block rounded-full bg-[#00a6c7] align-baseline shrink-0"
          style={{
            width: '0.15em',
            height: '0.15em',
            marginLeft: '0.06em',
            marginBottom: '0.04em',
          }}
        />
      )}
    </span>
  );
};

export interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  showIcon?: boolean;
  layout?: 'horizontal' | 'vertical';
  textColor?: 'orange' | 'white' | 'mixed' | 'dark' | 'mixed-dark';
  animated?: boolean;
  brandText?: 'Clickit' | 'Click';
}

export const ClickitLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  showIcon = true,
  layout = 'horizontal',
  textColor = 'mixed-dark',
  animated = false,
  brandText = 'Clickit',
}) => {
  const iconSizeMap = {
    sm: 'w-8 h-9',
    md: 'w-11 h-12 sm:w-12 sm:h-13',
    lg: 'w-14 h-15 sm:w-16 sm:h-17',
    xl: 'w-16 h-18 sm:w-20 sm:h-22',
    '2xl': 'w-24 h-26 sm:w-28 sm:h-32',
  };

  const textSizeMap = {
    sm: 'text-2xl tracking-[-0.02em]',
    md: 'text-3xl sm:text-[32px] tracking-[-0.02em]',
    lg: 'text-4xl sm:text-[42px] tracking-[-0.02em]',
    xl: 'text-5xl sm:text-6xl lg:text-[64px] tracking-[-0.02em]',
    '2xl': 'text-6xl sm:text-7xl lg:text-8xl tracking-[-0.02em]',
  };

  return (
    <div
      className={`inline-flex items-center ${
        layout === 'vertical' ? 'flex-col gap-2 text-center' : 'flex-row gap-3 sm:gap-3.5'
      } select-none ${className}`}
    >
      {/* Official C-Location Pin Monogram Logo */}
      {showIcon && (
        <ClickitLogoMark
          className={iconSizeMap[size]}
          animated={animated}
          color="#00a6c7"
          pulse={animated}
        />
      )}

      {/* Brand Text */}
      {showText && (
        !showIcon && brandText === 'Clickit' ? (
          <ClickitWordmark
            className={textSizeMap[size]}
            textColorIt={textColor === 'mixed' || textColor === 'white' ? 'white' : textColor === 'orange' ? 'orange' : 'dark'}
            showTrailingDot={false}
          />
        ) : (
          <span className={`font-['Poppins',sans-serif] font-bold leading-none ${textSizeMap[size]} transition-all`}>
            {textColor === 'orange' && <span className="text-[#00a6c7]">{brandText}</span>}
            {textColor === 'white' && <span className="text-white">{brandText}</span>}
            {textColor === 'dark' && <span className="text-zinc-900">{brandText}</span>}
            {(textColor === 'mixed' || textColor === 'mixed-dark') && (
              <>
                <span className="text-[#00a6c7]">Click</span>
                {brandText === 'Clickit' && (
                  <span className={textColor === 'mixed' ? 'text-white' : 'text-zinc-900'}>it</span>
                )}
              </>
            )}
          </span>
        )
      )}
    </div>
  );
};
