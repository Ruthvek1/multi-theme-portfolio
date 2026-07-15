'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, ArrowUp } from 'lucide-react';

export default function WarpDrive({ onWarpEngaged }: { onWarpEngaged: () => void }) {
  const [warpState, setWarpState] = useState<'idle' | 'charging' | 'warping'>('idle');
  const [stars, setStars] = useState<any[]>([]);

  useEffect(() => {
    // Generate stars only on the client to prevent SSR hydration mismatches
    const generated = Array.from({ length: 150 }).map(() => ({
      left: `${Math.random() * 100}%`,
      topIdle: `${Math.random() * 100}%`,
      width: `${Math.random() * 3}px`,
      heightIdle: `${Math.random() * 3}px`,
      heightWarp: `${Math.random() * 100 + 50}px`, // Longer streaks
      opacity: Math.random(),
      duration: `${Math.random() * 2 + 1.5}s`, // Slower duration (1.5s to 3.5s)
      delay: `${Math.random() * 2}s`, // Random delays so they fall continuously
    }));
    setStars(generated);
  }, []);

  const handleEngage = () => {
    if (warpState !== 'idle') return;
    setWarpState('charging');
    
    // Simulate charging up before engaging full warp
    setTimeout(() => {
      setWarpState('warping');
      onWarpEngaged();
    }, 2000);
  };

  return (
    <>
      {/* Injecting raw CSS to completely bypass Tailwind or Next.js CSS caching issues */}
      <style>{`
        @keyframes raw-warp {
          0% { transform: translateY(-20vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120vh); opacity: 0; }
        }
      `}</style>

      {/* Deep Space Background / Starfield */}
      <div className={`fixed inset-0 z-0 bg-black overflow-hidden transition-all duration-1000 ${warpState === 'warping' ? 'bg-[#000a1a]' : ''}`}>
        
        {/* Simple CSS Stars */}
        <div className="absolute inset-0 opacity-50">
           {stars.map((star, i) => (
             <div 
               key={i}
               className={`absolute bg-white rounded-full ${warpState !== 'warping' ? 'animate-pulse' : ''}`}
               style={{
                 left: star.left,
                 top: warpState === 'warping' ? '-10%' : star.topIdle,
                 width: star.width,
                 height: warpState === 'warping' ? star.heightWarp : star.heightIdle,
                 opacity: star.opacity,
                 // Force raw CSS animation when warping!
                 animation: warpState === 'warping' ? `raw-warp ${star.duration} linear infinite ${star.delay}` : undefined
               }}
             />
           ))}
        </div>
        
        {/* Cockpit Window Frame Overlay */}
        <div className="absolute inset-0 border-[40px] border-[#0a0a0a] rounded-[100px] opacity-80 pointer-events-none z-10 shadow-[inset_0_0_100px_rgba(0,229,255,0.1)]" />
        <div className="absolute top-0 bottom-0 left-[30%] w-[20px] bg-[#0a0a0a] opacity-80 pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-[30%] w-[20px] bg-[#0a0a0a] opacity-80 pointer-events-none z-10" />
      </div>

      {/* The Interactive Lever Console */}
      <AnimatePresence>
        {warpState === 'idle' && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center bg-[#0a0a0a]/90 p-8 rounded-3xl border border-[#00e5ff]/30 shadow-[0_0_50px_rgba(0,229,255,0.2)] backdrop-blur-xl"
          >
             <h2 className="text-[#00e5ff] font-mono tracking-[0.5em] uppercase text-sm mb-6 text-center border-b border-[#00e5ff]/30 pb-2">
               HYPERDRIVE OFFLINE
             </h2>
             
             <div className="text-white/50 text-xs mb-8 flex flex-col items-center gap-2">
               <ArrowUp className="w-4 h-4 animate-bounce text-[#ff6d00]" />
               ENGAGE THRUST TO INITIATE DATA LINK
             </div>

             <button aria-label="Interactive Button" onClick={handleEngage}
               className="group relative w-32 h-32 rounded-full border-4 border-[#ff6d00] bg-[#1a0a00] flex items-center justify-center hover:bg-[#ff6d00] transition-colors shadow-[0_0_30px_rgba(255,109,0,0.4)]"
             >
                <Power className="w-12 h-12 text-[#ff6d00] group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full border border-[#ff6d00] animate-ping opacity-50" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Charging State Overlay */}
      <AnimatePresence>
        {warpState === 'charging' && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#00e5ff]/10 backdrop-blur-sm pointer-events-none"
          >
             <div className="text-[#00e5ff] text-5xl font-black font-mono tracking-[1em] animate-pulse drop-shadow-[0_0_20px_#00e5ff] mb-8">
               SPOOLING...
             </div>
             
             {/* Hailing Falling Text */}
             <motion.div 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, type: 'spring' }}
               className="text-[#ff6d00] text-xl font-mono tracking-[0.5em] uppercase"
             >
               HAILING FREQUENCIES ESTABLISHED...
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
