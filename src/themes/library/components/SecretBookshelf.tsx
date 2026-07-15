'use client';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Key } from 'lucide-react';

export default function SecretBookshelf() {
  const [isFound, setIsFound] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!containerRef.current || isFound) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
  };

  return (
    <div className="py-32 relative z-20 max-w-5xl mx-auto px-4 border-t border-[#8b4513]/20 mt-32">
       
       <div className="text-center mb-16">
          <h2 className="font-serif text-3xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             The Dark Archives
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50 mb-6"></div>
          <p className="font-serif text-[#fdf3d8]/60 italic text-sm">
             The lights have gone out. Use your candle to search the darkness.<br/>
             Find the hidden rune to restore the light.
          </p>
       </div>

       {/* Interactive Minigame Container */}
       <div 
           ref={containerRef}
           onMouseMove={handleMouseMove}
           className="relative mx-auto w-full max-w-4xl h-[400px] border-4 border-[#2a1b0e] overflow-hidden bg-[#0a0604] cursor-crosshair shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
       >
           
           {/* The Background Illustration (Hidden in dark, revealed by light) */}
           <div className={`absolute inset-0 transition-opacity duration-1000 ${isFound ? 'opacity-100' : 'opacity-30'}`}>
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-50 mix-blend-overlay"></div>
               <Image src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2982&auto=format&fit=crop" 
                   alt="Ancient Library" 
                   className="w-full h-full object-cover sepia-[0.8] mix-blend-luminosity opacity-40" width={800} height={600} />
           </div>

           {/* The Hidden Rune */}
           <div 
               onClick={() => setIsFound(true)}
               className={`absolute top-[65%] left-[20%] w-12 h-12 flex items-center justify-center transition-all duration-1000 z-30 ${isFound ? 'scale-150 drop-shadow-[0_0_20px_rgba(212,175,55,1)]' : 'hover:scale-110 cursor-pointer drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]'}`}
           >
               <Sparkles className={`w-8 h-8 ${isFound ? 'text-[#fdf3d8]' : 'text-[#d4af37]/40 animate-pulse'}`} />
           </div>

           {/* The Darkness Mask (Spotlight) */}
           {!isFound && (
               <div 
                   className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-[2000ms]"
                   style={{
                       background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(5,3,2,0.95) 100%)`
                   }}
               ></div>
           )}

           {/* Success Overlay */}
           {isFound && (
               <div className="absolute inset-0 bg-[#0a0604]/80 z-40 flex flex-col items-center justify-center animate-in fade-in duration-[2000ms]">
                   <Key className="w-16 h-16 text-[#d4af37] mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                   <h3 className="font-serif text-[#d4af37] text-3xl tracking-widest uppercase mb-4 drop-shadow-md">
                       Sanctum Restored
                   </h3>
                   <div className="w-32 h-[1px] bg-[#d4af37] mx-auto opacity-50 mb-6"></div>
                   <p className="font-serif text-[#fdf3d8]/80 italic text-lg text-center max-w-md">
                       You have found the hidden rune and restored the archives. The Grand Archivist smiles upon you.
                   </p>
               </div>
           )}

       </div>

    </div>
  );
}
