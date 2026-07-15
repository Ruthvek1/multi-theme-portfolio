'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Code2 } from 'lucide-react';

export default function MinecraftMinigame({ personal, socials }: { personal: any, socials: any }) {
  const [minedBlocks, setMinedBlocks] = useState<number[]>([]);
  const [diamondsFound, setDiamondsFound] = useState(false);

  // Generate a grid of 24 blocks (6x4). Diamond is hidden behind a random set, let's say the middle ones.
  const totalBlocks = 24;

  const handleMine = (index: number) => {
      if (minedBlocks.includes(index)) return;
      
      const newMined = [...minedBlocks, index];
      setMinedBlocks(newMined);

      // If they mine 10 blocks, they find the diamonds
      if (newMined.length >= 8 && !diamondsFound) {
          setDiamondsFound(true);
      }
  };

  return (
    <div className="py-32 relative w-full bg-[#111] overflow-hidden min-h-[800px] flex items-center justify-center border-t-8 border-[#222]">
       
       {/* Bedrock Background */}
       <div 
           className="absolute inset-0 opacity-80 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%23222"/><rect x="32" width="32" height="32" fill="%23111"/><rect y="32" width="32" height="32" fill="%23111"/><rect x="32" y="32" width="32" height="32" fill="%23222"/></svg>')`,
               backgroundSize: '32px 32px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
           
           {!diamondsFound ? (
               <div className="mb-12 bg-black/80 border-4 border-[#3a3a3a] p-6 inline-block mx-auto shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
                   <h2 className="font-pixel text-white text-xl md:text-2xl text-shadow-pixel mb-2">
                       Bedrock Layer Reached
                   </h2>
                   <p className="font-pixel text-gray-400 text-xs">
                       Mine the stone to uncover hidden ores... ({minedBlocks.length}/8)
                   </p>
               </div>
           ) : (
               <div className="mb-12 bg-[#212121] border-4 border-cyan-400 p-6 inline-block mx-auto shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-in slide-in-from-bottom-8">
                   <h2 className="font-pixel text-cyan-400 text-xl md:text-2xl text-shadow-pixel mb-2">
                       Diamonds Found!
                   </h2>
                   <p className="font-pixel text-white text-xs">
                       Contact information unlocked.
                   </p>
               </div>
           )}

           <div className="relative w-full max-w-2xl mx-auto bg-black p-4 border-8 border-[#333]">
               
               {/* The Contact Info (Hidden behind the blocks) */}
               <div className="absolute inset-4 bg-[#1a1a1a] flex flex-col items-center justify-center p-8 z-0">
                    <div className="grid grid-cols-1 gap-6 w-full max-w-md text-left">
                        {personal.email && (
                            <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-center gap-4 group">
                                <Mail className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <p className="font-pixel text-[10px] text-gray-500 mb-1">Email</p>
                                    <p className="font-sans font-bold text-white group-hover:text-cyan-400 transition-colors">{personal.email}</p>
                                </div>
                            </a>
                        )}
                        {personal.phone && (
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <p className="font-pixel text-[10px] text-gray-500 mb-1">Phone</p>
                                    <p className="font-sans font-bold text-white">{personal.phone}</p>
                                </div>
                            </div>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-4">
                                <MapPin className="w-6 h-6 text-cyan-400" />
                                <div>
                                    <p className="font-pixel text-[10px] text-gray-500 mb-1">Location</p>
                                    <p className="font-sans font-bold text-white">{personal.location}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t-4 border-[#333]">
                            {socials?.linkedin && (
                                <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="bg-[#7d7d7d] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] p-3 hover:bg-[#8d8d8d] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all">
                                    <Globe className="w-6 h-6 text-white" />
                                </a>
                            )}
                            {socials?.github && (
                                <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="bg-[#7d7d7d] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] p-3 hover:bg-[#8d8d8d] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all">
                                    <Code2 className="w-6 h-6 text-white" />
                                </a>
                            )}
                        </div>
                    </div>
               </div>

               {/* The Breakable Blocks overlay */}
               <div className={`relative z-10 grid grid-cols-4 sm:grid-cols-6 gap-0 w-full h-[400px] transition-opacity duration-1000 ${diamondsFound ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                   {Array.from({ length: totalBlocks }).map((_, idx) => (
                       <div 
                           key={idx}
                           onClick={() => handleMine(idx)}
                           className={`w-full h-full border-t border-l border-white/20 border-b-4 border-r-4 border-black/60 cursor-pointer hover:brightness-110 active:brightness-90 active:scale-95 transition-all
                           ${minedBlocks.includes(idx) ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
                           style={{
                               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="16" height="16" fill="%237d7d7d"/><rect x="16" width="16" height="16" fill="%236e6e6e"/><rect y="16" width="16" height="16" fill="%236e6e6e"/><rect x="16" y="16" width="16" height="16" fill="%238a8a8a"/></svg>')`,
                               backgroundSize: '32px 32px'
                           }}
                       >
                       </div>
                   ))}
               </div>

           </div>

       </div>

    </div>
  );
}
