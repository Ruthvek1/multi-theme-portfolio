'use client';
import React, { useState } from 'react';
import { Crosshair } from 'lucide-react';

export default function ConnectTheDotsMinigame() {
  const [clickedPins, setClickedPins] = useState<number[]>([]);
  const isSolved = clickedPins.length === 4;

  const handlePinClick = (id: number) => {
    if (!clickedPins.includes(id)) {
      setClickedPins([...clickedPins, id]);
    }
  };

  // Coordinates simulating city map locations
  const pins = [
    { id: 1, x: 25, y: 25, label: 'Safehouse' },
    { id: 2, x: 80, y: 30, label: 'Drop Point' },
    { id: 3, x: 50, y: 80, label: 'The Docks' },
    { id: 4, x: 15, y: 70, label: 'HQ' },
  ];

  return (
    <div className="max-w-4xl mx-auto mb-32 relative z-20">
       
       <div className="flex flex-col items-center mb-8">
          <div className="bg-black text-white px-4 py-1 font-['Courier_New'] font-bold text-xl uppercase shadow-md rotate-[-2deg] border border-white mb-2">
             City Map: Suspect Tracking
          </div>
          <div className="text-gray-900 font-['Courier_New'] font-bold bg-white/80 px-3 py-1 shadow-sm rotate-1 text-sm border border-gray-400">
             INSTRUCTION: Click all 4 marked locations to triangulate suspect position.
          </div>
       </div>

       {/* Map Container */}
       <div className="relative w-full aspect-video bg-[#e6deb8] border-8 border-[#5c4a3d] shadow-2xl overflow-hidden rounded-sm p-4 transition-all duration-1000"
            style={{ 
               backgroundImage: isSolved ? `url('https://www.transparenttextures.com/patterns/cartographer.png')` : `url('https://www.transparenttextures.com/patterns/old-map.png')`,
               backgroundColor: isSolved ? '#c8d6e5' : '#e6deb8'
            }}>
          
          {/* Faded Map Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
             backgroundImage: 'linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)',
             backgroundSize: '40px 40px'
          }}></div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] pointer-events-none"></div>

          {/* SVG Canvas for Red String */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
             <filter id="string-drop">
                <feDropShadow dx="1" dy="3" stdDeviation="1" floodColor="#000" floodOpacity="0.5" />
             </filter>
             {clickedPins.map((pinId, idx) => {
                if (idx === 0) return null;
                const prevPin = pins.find(p => p.id === clickedPins[idx - 1]);
                const currPin = pins.find(p => p.id === pinId);
                
                if (prevPin && currPin) {
                   return (
                      <line 
                         key={idx}
                         x1={`${prevPin.x}%`} 
                         y1={`${prevPin.y}%`} 
                         x2={`${currPin.x}%`} 
                         y2={`${currPin.y}%`} 
                         stroke="#d32f2f" 
                         strokeWidth="3"
                         filter="url(#string-drop)"
                         className="animate-[dash_0.5s_ease-out]"
                      />
                   );
                }
                return null;
             })}
          </svg>

          {/* Render Map Locations */}
          {pins.map((pin) => {
             const isClicked = clickedPins.includes(pin.id);
             return (
                <button aria-label="Interactive Button" key={pin.id}
                   onClick={() => handlePinClick(pin.id)}
                   className={`absolute w-12 h-12 -ml-6 -mt-6 flex flex-col items-center justify-center z-20 group transition-transform hover:scale-110`}
                   style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                   <div className="relative">
                      {/* Map marker circle */}
                      <div className={`w-4 h-4 rounded-full border-2 ${isClicked ? 'border-red-600 bg-red-600/50 animate-pulse' : 'border-gray-800 bg-gray-800/50'}`}></div>
                      {/* Crosshair target */}
                      <Crosshair className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 ${isClicked ? 'text-red-600' : 'text-gray-800'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                   </div>
                   
                   <div className="mt-2 bg-[#fdfaf6] border border-black/40 px-2 py-0.5 text-[10px] font-['Courier_New'] font-bold uppercase shadow-sm text-black">
                      {pin.label}
                   </div>
                </button>
             );
          })}

          {/* Final Location Reveal & Solved State */}
          {isSolved && (
             <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                
                {/* Final Target Location */}
                <div className="absolute top-[25%] left-[75%] animate-in zoom-in duration-1000 delay-500">
                   <div className="w-16 h-16 rounded-full bg-red-600/30 animate-ping absolute -top-8 -left-8"></div>
                   <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white absolute -top-2 -left-2 shadow-lg"></div>
                   <div className="absolute top-4 -left-16 bg-black text-white text-xs font-['Courier_New'] font-bold px-2 py-1 rotate-3 whitespace-nowrap shadow-md z-40">
                      TARGET LOCATED: 48°52'0"N 2°19'59"E
                   </div>
                </div>

                <div className="animate-in zoom-in fade-in duration-500 delay-[1500ms]">
                   <div className="border-[6px] border-green-700 text-green-700 font-serif font-black text-4xl md:text-6xl uppercase tracking-[0.1em] px-8 py-4 rotate-[-5deg] mix-blend-multiply opacity-90 shadow-lg bg-white/40 backdrop-blur-sm">
                      WARRANT ISSUED
                   </div>
                </div>
             </div>
          )}

       </div>

       {isSolved && (
          <div className="mt-4 text-center animate-in fade-in delay-1000 relative z-20">
             <button aria-label="Interactive Button" onClick={() => setClickedPins([])} className="text-sm font-['Courier_New'] font-bold text-gray-300 hover:text-white bg-black/50 px-4 py-2 rounded-sm border border-gray-600 hover:border-white transition-colors">
                Clear Tracking Data
             </button>
          </div>
       )}
    </div>
  );
}
