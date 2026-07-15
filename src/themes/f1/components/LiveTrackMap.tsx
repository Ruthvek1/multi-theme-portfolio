'use client';
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

export default function LiveTrackMap() {
  const [laps, setLaps] = useState({
    ferrari: 45,
    mclaren: 44,
    redbull: 46,
    mercedes: 44,
    aston: 43
  });

  useEffect(() => {
    // Increment laps based on the duration of their CSS animation
    const rbi = setInterval(() => setLaps(l => ({ ...l, redbull: l.redbull + 1 })), 11800);
    const fei = setInterval(() => setLaps(l => ({ ...l, ferrari: l.ferrari + 1 })), 12000);
    const mei = setInterval(() => setLaps(l => ({ ...l, mercedes: l.mercedes + 1 })), 12200);
    const mci = setInterval(() => setLaps(l => ({ ...l, mclaren: l.mclaren + 1 })), 12500);
    const asi = setInterval(() => setLaps(l => ({ ...l, aston: l.aston + 1 })), 13000);

    return () => {
      clearInterval(rbi);
      clearInterval(fei);
      clearInterval(mei);
      clearInterval(mci);
      clearInterval(asi);
    };
  }, []);

  // Complex race track path (similar to Spa or Suzuka)
  const trackPath = "M 50 150 C 10 150 10 50 50 50 L 150 50 C 200 50 200 100 250 100 C 300 100 300 50 350 50 C 390 50 390 150 350 150 L 250 150 C 200 150 200 100 150 100 C 100 100 100 150 50 150 Z";

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 flex-1 relative overflow-hidden flex flex-col mt-4 min-h-[300px]">
       <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 flex justify-between items-center z-10 relative">
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Live Track Position</span>
          <span className="text-[#00ff41] animate-pulse">GPS ACTIVE</span>
       </div>
       
       {/* Constructor Legend with Laps */}
       <div className="flex flex-wrap gap-x-4 gap-y-2 p-2 px-3 border-b border-gray-800 bg-[#111] z-10 relative">
         <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#ff1801]"></div><span className="text-[9px] uppercase font-bold text-gray-400">Ferrari <span className="text-white">L{laps.ferrari}</span></span></div>
         <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#FF8700]"></div><span className="text-[9px] uppercase font-bold text-gray-400">McLaren <span className="text-white">L{laps.mclaren}</span></span></div>
         <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#0000FF]"></div><span className="text-[9px] uppercase font-bold text-gray-400">Red Bull <span className="text-white">L{laps.redbull}</span></span></div>
         <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00D2BE]"></div><span className="text-[9px] uppercase font-bold text-gray-400">Mercedes <span className="text-white">L{laps.mercedes}</span></span></div>
         <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#006F62]"></div><span className="text-[9px] uppercase font-bold text-gray-400">Aston Martin <span className="text-white">L{laps.aston}</span></span></div>
       </div>

       <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-[#151515]">
          {/* Abstract Track SVG */}
          <svg viewBox="0 0 400 200" className="w-full h-full opacity-40 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <path 
                id="race-track"
                d={trackPath}
                fill="none" 
                stroke="#333" 
                strokeWidth="20" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
             />
             <path 
                d={trackPath}
                fill="none" 
                stroke="#555" 
                strokeWidth="16" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
             />
             <path 
                d={trackPath}
                fill="none" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeDasharray="10 10"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="opacity-20"
             />
          </svg>

          {/* Animated Cars using SVG animateMotion */}
          <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full pointer-events-none">
             {/* Ferrari (Red) */}
             <circle r="4" fill="#ff1801" className="drop-shadow-[0_0_8px_#ff1801]">
                <animateMotion 
                   dur="12s" 
                   repeatCount="indefinite"
                   path={trackPath}
                />
             </circle>
             
             {/* McLaren (Orange) */}
             <circle r="4" fill="#FF8700" className="drop-shadow-[0_0_8px_#FF8700]">
                <animateMotion 
                   dur="12.5s" 
                   begin="1s"
                   repeatCount="indefinite"
                   path={trackPath}
                />
             </circle>

             {/* Red Bull (Blue) */}
             <circle r="4" fill="#0000FF" className="drop-shadow-[0_0_8px_#0000FF]">
                <animateMotion 
                   dur="11.8s" 
                   begin="3s"
                   repeatCount="indefinite"
                   path={trackPath}
                />
             </circle>
             
             {/* Mercedes (Teal) */}
             <circle r="4" fill="#00D2BE" className="drop-shadow-[0_0_8px_#00D2BE]">
                <animateMotion 
                   dur="12.2s" 
                   begin="5s"
                   repeatCount="indefinite"
                   path={trackPath}
                />
             </circle>
             
             {/* Aston Martin (Green) */}
             <circle r="4" fill="#006F62" className="drop-shadow-[0_0_8px_#006F62]">
                <animateMotion 
                   dur="13s" 
                   begin="8s"
                   repeatCount="indefinite"
                   path={trackPath}
                />
             </circle>
          </svg>
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent pointer-events-none" />
       </div>
    </div>
  );
}
