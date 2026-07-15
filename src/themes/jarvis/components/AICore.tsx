import React from 'react';
import { motion } from 'framer-motion';

interface AICoreProps {
  view: string; // Used to change the position/size of the core based on the view
}

export default function AICore({ view }: AICoreProps) {
  // Determine if the core should be full screen center (boot/dashboard) or relegated to the side (content views)
  const isCenter = view === 'boot' || view === 'dashboard';

  return (
    <motion.div 
      initial={false}
      animate={{
        scale: isCenter ? 1 : 0.4,
        x: isCenter ? 0 : '35vw',
        y: isCenter ? 0 : '30vh',
        opacity: view === 'boot' ? 0.3 : 0.8
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center w-[500px] h-[500px]"
    >
      {/* Outer Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-[#00f0ff]/20 border-dashed"
      />
      
      {/* Middle Ring (Reverse Rotation) */}
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border-2 border-[#00f0ff]/30 border-t-[#00f0ff] border-b-[#00f0ff]"
      />

      {/* Inner Ring (Pulsing segments) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 rounded-full"
      >
         <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <circle cx="50" cy="50" r="48" fill="none" stroke="#00f0ff" strokeWidth="1" strokeDasharray="5, 10" opacity="0.5" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="#ffaa00" strokeWidth="0.5" strokeDasharray="2, 4" opacity="0.3" />
         </svg>
      </motion.div>

      {/* Core Center Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-24 h-24 rounded-full bg-[#00f0ff]/20 blur-[20px]"
      />
      
      {/* Core Center Solid */}
      <div className="absolute w-12 h-12 rounded-full border-4 border-[#00f0ff] bg-black shadow-[0_0_30px_#00f0ff] flex items-center justify-center">
         <div className="w-4 h-4 bg-[#00f0ff] rounded-full animate-pulse" />
      </div>

    </motion.div>
  );
}
