'use client';

import React, { useEffect, useState } from 'react';

export default function TelemetryOverlay() {
  const [randomData, setRandomData] = useState<number[]>([]);

  useEffect(() => {
    // Generate random telemetry numbers
    const interval = setInterval(() => {
      setRandomData(Array.from({ length: 12 }, () => Math.random() * 9999));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Scanning Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00f0ff] animate-[scan_4s_linear_infinite] shadow-[0_0_15px_#00f0ff]" />

      {/* Radar Map */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#00f0ff]/20 opacity-50 flex items-center justify-center">
         <div className="w-[400px] h-[400px] rounded-full border border-[#00f0ff]/30 flex items-center justify-center">
            <div className="w-[200px] h-[200px] rounded-full border border-[#00f0ff]/40 relative overflow-hidden">
               {/* Radar Sweep */}
               <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,240,255,0.5)_360deg)] animate-[spin_4s_linear_infinite] rounded-full" />
               {/* Crosshair */}
               <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00f0ff]/50" />
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#00f0ff]/50" />
            </div>
         </div>
      </div>

      {/* Flashing Telemetry Numbers */}
      <div className="absolute bottom-8 right-8 font-mono text-[8px] text-[#00f0ff] flex flex-col gap-1 text-right">
        {randomData.map((num, i) => (
          <div key={i}>
            TEL_SYS_{i.toString().padStart(2, '0')}: {num.toFixed(4)}
          </div>
        ))}
      </div>

    </div>
  );
}
