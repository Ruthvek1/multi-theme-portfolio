import React from 'react';
import { motion } from 'framer-motion';

export default function TelemetryGraph({ skills }: { skills: any }) {
  if (!skills) return null;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 flex flex-col">
       <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 flex justify-between">
          <span>Engine Telemetry (Skills)</span>
          <span className="text-[#00ff41] animate-pulse">● REC</span>
       </div>
       
       <div className="p-4 grid grid-cols-2 gap-x-8 gap-y-4">
          {skills.map((data: any, index: number) => (
            <div key={index} className="mb-4">
               <div className="text-white text-xs font-bold uppercase tracking-wider mb-2">{index} {data.category}</div>
               <div className="space-y-3">
                 {data.items?.slice(0, 5).map((item: string, i: number) => {
                    // Base random value based on string length to seed the animation
                    const baseVal = Math.min(90, 40 + (item.length * 3)); 
                    const isPurple = baseVal > 80; 
                    const isGreen = baseVal > 60 && baseVal <= 80; 
                    
                    let colorClass = 'bg-yellow-500'; 
                    if (isPurple) colorClass = 'bg-[#c100f5]'; 
                    if (isGreen) colorClass = 'bg-[#00ff41]'; 

                    return (
                      <div key={item} className="flex flex-col gap-1">
                         <div className="flex justify-between text-[10px] font-bold">
                            <span className="text-gray-300 truncate w-3/4">{item}</span>
                            <span className={isPurple ? 'text-[#c100f5]' : isGreen ? 'text-[#00ff41]' : 'text-yellow-500'}>
                              {isPurple ? 'OPT' : isGreen ? 'NOM' : 'ACT'}
                            </span>
                         </div>
                         <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              className={`h-full ${colorClass}`} 
                              animate={{ 
                                width: [
                                  `${baseVal}%`, 
                                  `${Math.max(10, baseVal - 30)}%`, 
                                  `${Math.min(100, baseVal + 20)}%`, 
                                  `${Math.max(10, baseVal - 15)}%`, 
                                  `${baseVal}%`
                                ] 
                              }}
                              transition={{ 
                                duration: 15 + (i * 3), 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                              }}
                            />
                         </div>
                      </div>
                    );
                 })}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
}
