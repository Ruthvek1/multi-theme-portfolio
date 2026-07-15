'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HoloPanelProps {
  title: string;
  side: 'left' | 'center' | 'right';
  delay?: number;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export default function HoloPanel({ title, side, delay = 0, children, className = '', icon }: HoloPanelProps) {
  
  // Determine the 3D rotation based on which side of the cockpit the panel is on
  const rotation = side === 'left' ? 15 : side === 'right' ? -15 : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: rotation, z: -500 }}
      animate={{ opacity: 1, scale: 1, rotateY: rotation, z: 0 }}
      transition={{ delay, duration: 1, type: 'spring', bounce: 0.4 }}
      className={`relative w-full h-full flex flex-col ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
       {/* Glowing Tech Border Wrapper */}
       <div className="absolute inset-0 bg-[#00e5ff]/5 backdrop-blur-md border border-[#00e5ff]/30 rounded-xl shadow-[0_0_30px_rgba(0,229,255,0.1)] overflow-hidden">
          {/* Scanning lines effect inside the panel */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00e5ff]/10 to-transparent h-10 animate-[scan_3s_linear_infinite] pointer-events-none" />
       </div>

       {/* Panel Header */}
       <div className="relative z-10 flex items-center gap-3 px-4 py-3 border-b border-[#00e5ff]/30 bg-black/40 rounded-t-xl">
          {icon && <div className="text-[#00e5ff]">{icon}</div>}
          <h2 className="text-[#00e5ff] font-mono tracking-widest text-xs uppercase font-bold">{title}</h2>
          
          {/* Tech decorative elements */}
          <div className="ml-auto flex gap-1">
             <div className="w-2 h-2 bg-[#ff6d00] rounded-sm animate-pulse" />
             <div className="w-4 h-2 bg-[#00e5ff]/50 rounded-sm" />
          </div>
       </div>

       {/* Panel Content */}
       <div className="relative z-10 flex-1 p-4">
          {children}
       </div>
       
    </motion.div>
  );
}
