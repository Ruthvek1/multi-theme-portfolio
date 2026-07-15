'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function DockingSimulator() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowCenter, setWindowCenter] = useState({ x: 0, y: 0 });
  const [dockingProgress, setDockingProgress] = useState(0);
  const [docked, setDocked] = useState(false);

  const Y_CENTER = 350;

  useEffect(() => {
    const updateCenter = () => {
      setWindowCenter({ x: window.innerWidth / 2, y: Y_CENTER });
    };
    updateCenter();
    window.addEventListener('resize', updateCenter);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', updateCenter);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (docked) return;

    // Calculate distance from center
    const dx = mousePos.x - windowCenter.x;
    const dy = mousePos.y - windowCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If within 50px of center, increase progress
    if (distance < 50 && windowCenter.x !== 0) {
      setDockingProgress(prev => {
        const next = prev + 1.5; // Fills in about ~1-2 seconds at 60fps
        if (next >= 100) {
          setDocked(true);
          return 100;
        }
        return next;
      });
    } else {
      // Degrade progress slowly if not in center
      setDockingProgress(prev => Math.max(0, prev - 2));
    }
  }, [mousePos, windowCenter, docked]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      
      {/* Background Target Grid */}
      <div className="absolute inset-0 flex justify-center opacity-40 z-0">
         {/* Center Target Rings */}
         <div 
           className="w-[800px] h-[800px] rounded-full border border-white/5 flex items-center justify-center absolute"
           style={{ top: Y_CENTER, transform: 'translateY(-50%)' }}
         >
            <div className="w-[400px] h-[400px] rounded-full border border-white/10 flex items-center justify-center relative">
               <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10" />
               <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-white/10" />
               
               <div className="w-[100px] h-[100px] rounded-full border-2 border-white/20 flex items-center justify-center relative">
                  {/* Docking Acceptable Zone (Green glow if near) */}
                  <div className={`absolute inset-0 rounded-full transition-colors duration-300 ${dockingProgress > 0 ? 'bg-green-500/10' : 'bg-transparent'}`} />
                  <div className="w-2 h-2 rounded-full bg-white/50" />
               </div>
            </div>
         </div>
      </div>

      {/* Docking Progress UI */}
      {!docked && (
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-48 flex flex-col items-center z-50"
          style={{ top: Y_CENTER + 120 }}
        >
          <div className="text-[10px] text-white/50 tracking-[0.3em] uppercase mb-2">
            {dockingProgress > 0 ? 'ALIGNMENT CAPTURED' : 'MANUAL ALIGNMENT'}
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-75"
              style={{ width: `${dockingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success State */}
      <AnimatePresence>
        {docked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center bg-black/90 px-12 py-8 rounded-2xl border border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.3)] backdrop-blur-md"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mb-4 animate-bounce" />
            <div className="text-2xl font-bold text-white tracking-widest uppercase mb-2 text-center">DOCKING COMPLETE</div>
            <div className="text-sm text-green-500 tracking-widest text-center mb-6 border-b border-green-500/30 pb-4 w-full">DATA LINK ESTABLISHED</div>
            
            {/* User Requested Copy */}
            <div className="text-lg text-white font-bold tracking-wider uppercase text-center bg-green-500/20 px-6 py-2 rounded-lg border border-green-500/50">
               PERFECT CANDIDATE TO BE HIRED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Crosshair tracking mouse */}
      {!docked && (
        <motion.div 
          animate={{ 
            x: mousePos.x - 32, // Offset by half size (64/2)
            y: mousePos.y - 32 
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
          className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-50"
        >
           {/* Crosshair Graphic */}
           <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#00f0ff]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-[#00f0ff]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-[#00f0ff]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-[#00f0ff]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
           </div>
        </motion.div>
      )}

    </div>
  );
}
