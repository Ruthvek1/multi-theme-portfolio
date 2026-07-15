'use client';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Paintbrush } from 'lucide-react';

export default function RestorationMinigame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRestored, setIsRestored] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize dirt canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with dirt/soot color
    ctx.fillStyle = '#1a1814';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise/grime texture
    for (let i = 0; i < 5000; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.5)' : 'rgba(50,40,30,0.3)';
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
    }
    
    // Add "cracks"
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 50; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  }, []);

  const eraseDirt = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isRestored) return;

    // One scrub reveals the entire picture immediately as requested
    handleCompleteRestore();
  };

  const handleCompleteRestore = () => {
    if (isRestored) return;
    setIsRestored(true);
    setProgress(100);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Animate canvas fade out
    canvas.style.transition = 'opacity 1.5s ease-in-out';
    canvas.style.opacity = '0';
    setTimeout(() => {
        canvas.style.display = 'none';
    }, 1500);
  };

  return (
    <div className="py-32 px-4 md:px-12 max-w-5xl mx-auto relative z-20 border-t border-[#d4af37]/20">
       
       <div className="text-center mb-16">
          <h2 className="font-serif text-3xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             The Lost Masterpiece
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50 mb-6"></div>
          <p className="font-serif text-[#a8997a] italic text-sm">
             A priceless artifact was recently discovered, but it is covered in centuries of soot. <br/>
             Click and drag to carefully scrub the canvas and restore it to its former glory.
          </p>
       </div>

       <div className="relative mx-auto w-full max-w-3xl aspect-[4/3] group">
          
          {/* Ornate Frame */}
          <div className="absolute -inset-8 bg-[#b8953f] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] shadow-[0_30px_60px_rgba(0,0,0,0.8)] before:absolute before:inset-3 before:border-[8px] before:border-[#523812] before:shadow-inner rounded-sm pointer-events-none z-0 flex items-end justify-center pb-4">
             {/* Plaque */}
             <div className="bg-[#1a1614] border border-[#d4af37]/50 px-6 py-2 shadow-xl">
                 <div className="font-serif text-[#d4af37] text-xs tracking-widest uppercase font-bold">
                     Unknown Masterpiece
                 </div>
             </div>
          </div>
          
          {/* Spotlight that activates when restored */}
          <div className={`absolute -top-32 left-1/2 -translate-x-1/2 w-full h-[800px] bg-yellow-500/20 blur-3xl rounded-[100%] pointer-events-none transform mix-blend-screen transition-opacity duration-[3000ms] ${isRestored ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="relative w-full h-full border border-black overflow-hidden bg-black shadow-inner z-10">
             
             {/* The Masterpiece (Bottom Layer) */}
             <div className="absolute inset-0">
                 <Image src="/assets/funny-masterpiece.png" alt="Restored Masterpiece" className={`w-full h-full object-cover transition-all duration-[3000ms] ${isRestored ? 'brightness-100 contrast-125 saturate-110' : 'brightness-50'}`} width={800} height={600} />
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
             </div>

             {/* The Dirt Canvas (Top Layer) */}
             <canvas 
                ref={canvasRef}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
                onMouseMove={eraseDirt}
                onTouchStart={() => setIsDrawing(true)}
                onTouchEnd={() => setIsDrawing(false)}
                onTouchMove={eraseDirt}
                className={`absolute inset-0 w-full h-full z-20 ${!isRestored ? 'cursor-[url(/assets/brush-cursor.png),pointer]' : 'pointer-events-none'}`}
             />
             
             {/* Custom Sponge Cursor Hint */}
             {!isRestored && (
                 <div className="absolute inset-0 pointer-events-none z-30 group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                    {progress === 0 && (
                        <div className="bg-black/50 backdrop-blur-sm text-[#d4af37] px-6 py-3 border border-[#d4af37]/30 rounded-full font-serif uppercase tracking-widest text-xs flex items-center gap-2">
                           <Paintbrush className="w-4 h-4" /> Scrub Canvas
                        </div>
                    )}
                 </div>
             )}
          </div>
       </div>

       {/* Progress UI */}
       <div className="mt-20 max-w-md mx-auto text-center">
           <div className="flex justify-between font-serif text-[#a8997a] text-xs uppercase tracking-widest mb-2">
              <span>Restoration Progress</span>
              <span>{Math.min(100, Math.round(progress))}%</span>
           </div>
           <div className="w-full h-1 bg-[#1a1614] border border-[#3a301a]">
              <div 
                 className="h-full bg-gradient-to-r from-[#aa771c] to-[#d4af37] transition-all duration-300"
                 style={{ width: `${Math.min(100, Math.round(progress))}%` }}
              ></div>
           </div>
           
           {!isRestored && progress > 5 && (
               <button aria-label="Interactive Button" onClick={handleCompleteRestore}
                  className="mt-8 px-6 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111] transition-colors font-serif uppercase tracking-widest text-xs font-bold"
               >
                  Fully Restore Artifact
               </button>
           )}

           {isRestored && (
               <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                   <div className="flex justify-center mb-4 text-[#d4af37]">
                       <Sparkles className="w-8 h-8 animate-pulse" />
                   </div>
                   <h3 className="font-serif text-[#d4af37] text-xl font-bold tracking-widest uppercase mb-2">
                       Masterpiece Uncovered
                   </h3>
                   <p className="font-serif text-[#a8997a] italic text-sm">
                       You have earned the title of Master Restorer.
                   </p>
               </div>
           )}
       </div>

    </div>
  );
}
