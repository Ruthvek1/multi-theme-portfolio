import React from 'react';
import { motion } from 'framer-motion';

export default function InteractiveMap({ onRideComplete }: { onRideComplete?: () => void }) {
  const pathD = "M 100,800 L 250,800 L 250,550 L 550,550 L 550,250 L 850,250";
  
  const stops = [
    { x: 100, y: 800, label: "Applied" },
    { x: 250, y: 800, label: "HR Screen" },
    { x: 250, y: 550, label: "Tech Assessment" },
    { x: 550, y: 550, label: "System Design" },
    { x: 550, y: 250, label: "Final Interview" },
    { x: 850, y: 250, label: "HIRED!", isFinal: true },
  ];

  const carX = [100, 250, 250, 550, 550, 850];
  const carY = [800, 800, 550, 550, 250, 250];

  return (
    <div className="absolute inset-0 bg-[#e5e5e5] z-0 overflow-hidden select-none">
      
      {/* Stylized CSS Map Background (Grid/Blocks) */}
      <div className="absolute inset-0 opacity-20"
           style={{
             backgroundImage: 'linear-gradient(#000000 1px, transparent 1px), linear-gradient(90deg, #000000 1px, transparent 1px)',
             backgroundSize: '100px 100px',
             transform: 'perspective(1000px) rotateX(45deg) scale(2.5) translateY(-10%)',
             transformOrigin: 'top center'
           }}
      />
      
      {/* All elements inside a single SVG coordinate system to guarantee 100% perfect alignment */}
      <svg className="absolute inset-0 w-full h-full drop-shadow-lg" preserveAspectRatio="none" viewBox="0 0 1000 1000">
        
        {/* The Route */}
        <path 
          d={pathD}
          fill="none" 
          stroke="#276ef1" 
          strokeWidth="16" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d={pathD}
          fill="none" 
          stroke="#4b8df8" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Map Pins (SVG circles) */}
        {stops.map((stop, i) => (
          <g key={i}>
            {!stop.isFinal ? (
              <>
                <circle cx={stop.x} cy={stop.y} r="12" fill="black" stroke="white" strokeWidth="4" />
                <circle cx={stop.x} cy={stop.y} r="4" fill="white" />
              </>
            ) : (
              <>
                <circle cx={stop.x} cy={stop.y} r="18" fill="black" />
                <circle cx={stop.x} cy={stop.y} r="6" fill="#05A357" />
              </>
            )}
            
            {/* HTML Labels using foreignObject for nice CSS styling */}
            <foreignObject x={stop.x - 75} y={stop.y - 50} width="150" height="40" className="overflow-visible">
               <div className="flex justify-center w-full">
                  <div className={`px-2 py-1 rounded-md shadow-md text-[10px] font-bold whitespace-nowrap border ${stop.isFinal ? 'bg-green-600 text-white border-green-700 text-xs px-3' : 'bg-white text-black border-gray-200'}`}>
                    {stop.label}
                  </div>
               </div>
            </foreignObject>
          </g>
        ))}

        {/* The Interactive Driving Car! */}
        <motion.g
          initial={{ x: carX[0], y: carY[0] }}
          animate={{ x: carX, y: carY }}
          transition={{ 
            duration: 8, 
            times: [0, 0.2, 0.4, 0.6, 0.8, 1], 
            ease: "linear",
            repeat: Infinity,
            repeatDelay: 1.5
          }}
        >
          {/* Car Body */}
          <circle cx="0" cy="0" r="20" fill="black" stroke="white" strokeWidth="4" />
          {/* Simple Car Icon inside the circle */}
          <path d="M-8,0 L-4,-6 L4,-6 L8,0 L10,0 L10,6 L-10,6 L-10,0 Z" fill="white" />
          <circle cx="-6" cy="6" r="2" fill="white" />
          <circle cx="6" cy="6" r="2" fill="white" />
        </motion.g>

      </svg>
    </div>
  );
}
