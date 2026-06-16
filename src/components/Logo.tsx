import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = '', size = 32, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Left Ribbon Gradients */}
          <linearGradient id="leftRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" /> {/* sky-500 */}
            <stop offset="50%" stopColor="#2563eb" /> {/* blue-600 */}
            <stop offset="100%" stopColor="#4f46e5" /> {/* indigo-600 */}
          </linearGradient>

          {/* Right Ribbon Gradients */}
          <linearGradient id="rightRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" /> {/* indigo-600 */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* violet-500 */}
            <stop offset="100%" stopColor="#a855f7" /> {/* purple-500 */}
          </linearGradient>
          
          <filter id="subtleGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.15" />
          </filter>
        </defs>

        <g filter="url(#subtleGlow)">
          {/* Left Wing Ribbon 'M' Chevron shape */}
          <path
            d="M20,25 
               L47,25 
               L47,55
               L37,42
               L20,68 
               Z"
            fill="url(#leftRibbon)"
          />
          
          {/* Right Wing Ribbon 'M' Chevron shape */}
          <path
            d="M80,25 
               L53,25 
               L53,55
               L63,42
               L80,68 
               Z"
            fill="url(#rightRibbon)"
          />
        </g>
      </svg>
      {showText && (
        <span className="font-sans font-bold tracking-tight text-lg text-zinc-900 dark:text-white transition-colors duration-300">
          Mavzen<span className="text-rose-600 font-extrabold">.ai</span>
        </span>
      )}
    </div>
  );
}
