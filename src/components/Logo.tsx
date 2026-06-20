import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function Logo({ className = '', size = 32, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt="Mavzen"
        width={size}
        height={size}
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      />
      {showText && (
        <span className="font-sans font-bold tracking-tight text-lg text-zinc-900 dark:text-white transition-colors duration-300">
          Mavzen<span className="text-rose-600 font-extrabold">.ai</span>
        </span>
      )}
    </div>
  );
}
