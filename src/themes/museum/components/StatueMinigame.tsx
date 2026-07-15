'use client';
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function StatueMinigame() {
  const [foundPieces, setFoundPieces] = useState<number[]>([]);
  const isSolved = foundPieces.length === 4;

  const handlePieceClick = (id: number) => {
    if (!foundPieces.includes(id)) {
      setFoundPieces([...foundPieces, id]);
    }
  };

  return (
    <div className="py-32 px-4 md:px-12 max-w-4xl mx-auto relative z-20 border-t border-[#d4af37]/20">
       
       <div className="text-center mb-16">
          <h2 className="font-serif text-3xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             The Curators Vault
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50 mb-6"></div>
          <p className="font-serif text-[#a8997a] italic text-sm">
             Find all 4 missing marble fragments hidden below to restore the shattered artifact.
          </p>
       </div>

       {/* Interactive Pedestal Area */}
       <div className="relative w-full aspect-video bg-[#15120f] border-8 border-[#2a2313] shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm flex items-end justify-center pb-8"
            style={{ backgroundImage: 'radial-gradient(ellipse at bottom, rgba(42,35,19,0.8) 0%, transparent 70%)' }}>
          
          {/* Main Pedestal */}
          <div className="w-48 h-16 bg-[#e4dac4] border-x border-t border-[#b5a585] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] relative z-20 flex flex-col items-center justify-end"
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }}>
             <div className="w-40 h-1 bg-[#b5a585] mb-2 shadow-sm"></div>
             
             {/* The Statue Base/Core */}
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-32 h-64 flex items-center justify-center">
                {!isSolved && (
                   <div className="absolute inset-0 border-2 border-dashed border-[#d4af37]/30 rounded-t-full opacity-50 flex items-center justify-center">
                      <span className="font-serif text-[#d4af37]/30 text-xs text-center px-4">
                         {foundPieces.length}/4 FRAGMENTS
                      </span>
                   </div>
                )}
                
                {/* Assembled Statue */}
                <div className={`transition-all duration-[2000ms] absolute inset-0 ${isSolved ? 'opacity-100 scale-100 translate-y-0 filter-none' : 'opacity-0 scale-90 translate-y-10 blur-md'}`}>
                   <div className="w-full h-full bg-[#fdfbf7] rounded-t-[100px] rounded-b-lg shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2),inset_10px_10px_20px_rgba(255,255,255,0.8)] relative border-b-2 border-[#dcd1ba]"
                        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }}>
                      <div className="absolute inset-x-0 top-8 h-16 bg-gradient-to-b from-[#e4dac4] to-transparent opacity-30 rounded-t-full"></div>
                      {/* Abstract statue features */}
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-16 h-24 bg-[#e4dac4] shadow-inner rounded-full mix-blend-multiply opacity-50"></div>
                   </div>
                   
                   {/* Solved Spotlight */}
                   {isSolved && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-64 h-[600px] bg-yellow-500/20 blur-2xl rounded-[100%] pointer-events-none transform mix-blend-screen animate-in fade-in duration-[3000ms]"></div>
                   )}
                </div>
             </div>
          </div>

          {/* Scattered Pieces (Hidden around the box) */}
          {!isSolved && (
             <>
                <button aria-label="Interactive Button" onClick={() => handlePieceClick(1)} className={`absolute top-12 left-16 w-12 h-16 bg-[#fdfbf7] hover:scale-110 transition-all ${foundPieces.includes(1) ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 rotate-12'} cursor-pointer shadow-lg`} style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }} />
                
                <button aria-label="Interactive Button" onClick={() => handlePieceClick(2)} className={`absolute bottom-24 left-32 w-16 h-12 bg-[#fdfbf7] hover:scale-110 transition-all ${foundPieces.includes(2) ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 -rotate-45'} cursor-pointer shadow-lg`} style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }} />
                
                <button aria-label="Interactive Button" onClick={() => handlePieceClick(3)} className={`absolute top-24 right-20 w-10 h-20 bg-[#fdfbf7] hover:scale-110 transition-all ${foundPieces.includes(3) ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 rotate-[-15deg]'} cursor-pointer shadow-lg`} style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }} />
                
                <button aria-label="Interactive Button" onClick={() => handlePieceClick(4)} className={`absolute bottom-16 right-16 w-14 h-14 bg-[#fdfbf7] hover:scale-110 transition-all ${foundPieces.includes(4) ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 rotate-90'} cursor-pointer shadow-lg`} style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }} />
             </>
          )}

          {/* Solved UI */}
          {isSolved && (
             <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="animate-in zoom-in fade-in duration-[2000ms] delay-500 bg-black/60 inset-0 absolute flex flex-col items-center justify-center backdrop-blur-sm">
                   
                   <Sparkles className="w-16 h-16 text-[#d4af37] mb-6 animate-pulse" />
                   
                   <div className="border-4 border-[#d4af37] bg-[#1a1614] p-8 text-center max-w-sm shadow-[0_0_50px_rgba(212,175,55,0.4)]">
                      <h3 className="font-serif text-[#d4af37] text-2xl font-bold tracking-widest uppercase mb-2">
                         Artifact Restored
                      </h3>
                      <p className="font-serif text-[#a8997a] italic text-sm mb-6">
                         The Curator extends their deepest gratitude for your sharp eye.
                      </p>
                      <button aria-label="Interactive Button" onClick={() => setFoundPieces([])} className="pointer-events-auto px-6 py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#111] transition-colors font-serif uppercase tracking-widest text-xs font-bold">
                         Shatter Relic
                      </button>
                   </div>
                </div>
             </div>
          )}

       </div>
    </div>
  );
}
