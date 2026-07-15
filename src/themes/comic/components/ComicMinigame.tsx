'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Bug, Trophy } from 'lucide-react';

export default function ComicMinigame() {
  const [bugHealth, setBugHealth] = useState(3);
  const [bugPos, setBugPos] = useState({ x: 50, y: 50 });
  const [effects, setEffects] = useState<Array<{ id: number; x: number; y: number; text: string; color: string }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const words = ['BAM!', 'POW!', 'WHACK!', 'ZAP!', 'CRASH!'];
  const colors = ['bg-[#e62e2d]', 'bg-[#ffea00]', 'bg-[#2986cc]'];

  // Move bug randomly
  useEffect(() => {
      if (bugHealth <= 0) return;
      const interval = setInterval(() => {
          setBugPos({
              x: 10 + Math.random() * 80,
              y: 10 + Math.random() * 80
          });
      }, 1000 + Math.random() * 1000);
      return () => clearInterval(interval);
  }, [bugHealth]);

  const handleBugClick = (e: React.MouseEvent) => {
      if (bugHealth <= 0 || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const newEffect = {
          id: Date.now(),
          x,
          y,
          text: words[Math.floor(Math.random() * words.length)],
          color: colors[Math.floor(Math.random() * colors.length)]
      };

      setEffects(prev => [...prev, newEffect]);
      setBugHealth(prev => prev - 1);

      // Remove effect after 1 second
      setTimeout(() => {
          setEffects(prev => prev.filter(eff => eff.id !== newEffect.id));
      }, 1000);
  };

  return (
    <div className="py-20 relative z-20 w-full max-w-5xl mx-auto px-4 lg:px-8">
       
       <div className="text-center mb-16">
          <div className="inline-block bg-[#ffffff] border-8 border-black px-8 py-4 shadow-[12px_12px_0_rgba(0,0,0,1)] transform rotate-1">
             <h2 className="font-black text-3xl md:text-5xl text-black uppercase tracking-tighter">
                Bonus Issue!
             </h2>
             <div className="bg-[#ffea00] border-2 border-black inline-block px-4 py-1 font-bold text-lg mt-2 transform -skew-x-12 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                Defeat the Rogue Bug!
             </div>
          </div>
       </div>

       {/* Minigame Panel */}
       <div 
           ref={containerRef}
           className="relative w-full h-[500px] bg-[#ffffff] border-8 border-black shadow-[16px_16px_0_rgba(0,0,0,1)] overflow-hidden"
       >
           {/* Halftone Background */}
           <div 
               className="absolute inset-0 opacity-10 pointer-events-none"
               style={{
                   backgroundImage: 'radial-gradient(circle, #000 3px, transparent 3px)',
                   backgroundSize: '16px 16px'
               }}
           ></div>

           {/* The Bug */}
           {bugHealth > 0 ? (
               <div 
                   onClick={handleBugClick}
                   className="absolute w-16 h-16 bg-[#e62e2d] border-4 border-black rounded-full shadow-[4px_4px_0_rgba(0,0,0,1)] flex items-center justify-center cursor-crosshair transform hover:scale-110 transition-all z-20"
                   style={{ 
                       left: `${bugPos.x}%`, 
                       top: `${bugPos.y}%`,
                       transition: 'left 0.5s ease-out, top 0.5s ease-out'
                   }}
               >
                   <Bug className="w-8 h-8 text-white" strokeWidth={3} />
               </div>
           ) : (
               /* Victory Screen */
               <div className="absolute inset-0 bg-[#ffea00] flex flex-col items-center justify-center animate-in zoom-in duration-500 z-30">
                   <div className="relative">
                       {/* Starburst */}
                       <div className="absolute inset-0 w-[200%] h-[200%] -left-[50%] -top-[50%] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none animate-spin-slow"></div>
                       
                       <div className="relative bg-white border-8 border-black p-8 shadow-[16px_16px_0_rgba(0,0,0,1)] text-center transform -rotate-2">
                           <Trophy className="w-16 h-16 text-[#e62e2d] mx-auto mb-4" strokeWidth={3} />
                           <h3 className="font-black text-4xl text-black uppercase tracking-tighter mb-2">
                               Bug Squashed!
                           </h3>
                           <p className="font-bold text-xl uppercase italic">
                               The codebase is safe once more!
                           </p>
                       </div>
                   </div>
               </div>
           )}

           {/* Comic Sound Effects */}
           {effects.map(effect => (
               <div 
                   key={effect.id}
                   className={`absolute ${effect.color} border-4 border-black px-6 py-3 shadow-[8px_8px_0_rgba(0,0,0,1)] transform rotate-[-15deg] pointer-events-none animate-in zoom-in fade-in duration-200 z-40`}
                   style={{ left: `${effect.x}%`, top: `${effect.y}%`, transform: 'translate(-50%, -50%) rotate(-15deg)' }}
               >
                   <span className="font-black text-4xl text-white uppercase italic tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>
                       {effect.text}
                   </span>
               </div>
           ))}

       </div>
    </div>
  );
}
