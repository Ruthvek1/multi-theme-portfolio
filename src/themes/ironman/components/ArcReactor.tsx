import React from 'react';
import { motion } from 'framer-motion';

export default function ArcReactor({ size = 200, className = "" }: { size?: number, className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      
      {/* Outer Ring Glow */}
      <div className="absolute inset-0 bg-[#00f0ff] rounded-full blur-xl opacity-20 animate-pulse" />
      
      {/* Base Dark Ring */}
      <div className="absolute inset-2 bg-black rounded-full border border-[#00f0ff]/30 shadow-[inset_0_0_20px_rgba(0,240,255,0.2)]" />
      
      {/* Rotating Mechanical Ring 1 */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="absolute inset-4 rounded-full border-2 border-dashed border-[#00f0ff]/50"
      />

      {/* Rotating Mechanical Ring 2 (Opposite) */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-[#00f0ff]/30 flex items-center justify-center"
      >
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="absolute inset-0 text-[#00f0ff]">
           {[0, 120, 240].map((deg) => (
             <line 
               key={deg}
               x1="50" y1="0" x2="50" y2="15" 
               stroke="currentColor" 
               strokeWidth="2"
               transform={`rotate(${deg} 50 50)`}
             />
           ))}
        </svg>
      </motion.div>

      {/* Inner Glowing Core */}
      <div className="absolute w-1/4 h-1/4 bg-[#ffffff] rounded-full shadow-[0_0_30px_#00f0ff,_inset_0_0_10px_#00f0ff]" />
      <div className="absolute w-1/4 h-1/4 bg-[#00f0ff] rounded-full animate-ping opacity-30" />
      
    </div>
  );
}
