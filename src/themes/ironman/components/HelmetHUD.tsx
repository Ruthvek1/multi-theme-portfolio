import React from 'react';
import { motion } from 'framer-motion';
export default function HelmetHUD({ mouseX, mouseY }: { mouseX: number, mouseY: number }) {

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      
      {/* HUD Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent mix-blend-overlay" />
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(255,0,0,0.15)]" />

      {/* Screen Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.8)_100%)]" />

      {/* Parallax HUD Layer (Moves slightly differently than main content) */}
      <motion.div 
        animate={{ 
          x: mouseX * -40, 
          y: mouseY * -40 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="absolute inset-0 opacity-40"
      >
         {/* Curved Side Panels */}
         <svg width="100%" height="100%" className="absolute inset-0">
           <defs>
             <linearGradient id="hud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
               <stop offset="0%" stopColor="#ff0000" stopOpacity="0.8" />
               <stop offset="50%" stopColor="#ffaa00" stopOpacity="0.2" />
               <stop offset="100%" stopColor="#ff0000" stopOpacity="0.8" />
             </linearGradient>
           </defs>
           
           {/* Left HUD Arc */}
           <path d="M 50,0 Q 150,500 50,1000" fill="none" stroke="url(#hud-grad)" strokeWidth="2" />
           <path d="M 30,0 Q 130,500 30,1000" fill="none" stroke="#ffaa00" strokeWidth="1" strokeDasharray="5,15" />
           
           {/* Right HUD Arc */}
           <path d="M calc(100% - 50px),0 Q calc(100% - 150px),500 calc(100% - 50px),1000" fill="none" stroke="url(#hud-grad)" strokeWidth="2" />
           <path d="M calc(100% - 30px),0 Q calc(100% - 130px),500 calc(100% - 30px),1000" fill="none" stroke="#ffaa00" strokeWidth="1" strokeDasharray="5,15" />
         </svg>

         {/* Center Reticle (Static on Parallax Layer) */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#ff0000]/10 rounded-full flex items-center justify-center">
            <div className="w-[800px] h-[800px] border border-[#00f0ff]/5 rounded-full" />
         </div>

         {/* Altitude / Pitch Bars (Decorative) */}
         <div className="absolute left-16 top-1/2 -translate-y-1/2 w-8 h-[400px] flex flex-col justify-between items-center text-[8px] text-[#ffaa00] font-mono">
            <span>+90</span>
            <div className="w-[1px] h-full bg-gradient-to-b from-[#ffaa00]/0 via-[#ffaa00]/50 to-[#ffaa00]/0 my-2 relative">
               <motion.div 
                 animate={{ y: [0, 300, 0] }} 
                 transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                 className="absolute left-1/2 -translate-x-1/2 w-4 h-1 bg-[#ff0000] shadow-[0_0_10px_#ff0000]" 
               />
            </div>
            <span>-90</span>
         </div>
         <div className="absolute right-16 top-1/2 -translate-y-1/2 w-8 h-[400px] flex flex-col justify-between items-center text-[8px] text-[#ffaa00] font-mono">
            <span>1.0</span>
            <div className="w-[1px] h-full bg-gradient-to-b from-[#ffaa00]/0 via-[#ffaa00]/50 to-[#ffaa00]/0 my-2 relative" />
            <span>0.0</span>
         </div>

      </motion.div>

      {/* Static HUD Elements (Anchored to screen) */}
      <div className="absolute top-6 left-6 text-[#ff0000] font-mono text-[10px] font-bold tracking-widest flex flex-col gap-1">
        <span className="flex items-center gap-2"><div className="w-2 h-2 bg-[#ff0000] rounded-full animate-pulse shadow-[0_0_5px_#ff0000]" /> PWR: 320% CAPACITY</span>
        <span className="text-[#ffaa00]">SYS: MARK LXXXV ONLINE</span>
      </div>

      <div className="absolute bottom-6 right-6 text-[#ff0000] font-mono text-[10px] font-bold tracking-widest text-right flex flex-col gap-1">
        <span>TGT_LOCK: ENABLED</span>
        <span className="text-[#00f0ff]">ENVIRONMENT: SECURE</span>
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#ff0000 1px, transparent 1px), linear-gradient(90deg, #ff0000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}
