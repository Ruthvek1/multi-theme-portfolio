import React from 'react';

export default function CRTEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden mix-blend-screen">
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 6px 100%'
        }} 
      />
      
      {/* Screen refresh line */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/5 to-transparent h-[10%] animate-[scan_6s_linear_infinite]" />
      
      {/* Vignette & Tube Curvature */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.4)_100%)]" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
    </div>
  );
}
