import React from 'react';
import Image from 'next/image';
import { Download, ChevronDown } from 'lucide-react';

export default function MinecraftHero({ personal }: { personal: any }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#5a9e32]">
       
       {/* Pixelated Background Pattern (Grass/Dirt) */}
       <div 
           className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%234a8726"/><rect x="32" width="32" height="32" fill="%235a9e32"/><rect y="32" width="32" height="32" fill="%235a9e32"/><rect x="32" y="32" width="32" height="32" fill="%234a8726"/></svg>')`,
               backgroundSize: '64px 64px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8 py-20 pb-40 flex flex-col items-center text-center">
           
           {/* "Server" MOTD */}
           <div className="mb-12 bg-black/60 border-4 border-gray-600 p-4 max-w-2xl mx-auto shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
               <h1 className="text-white text-3xl md:text-5xl font-pixel mb-4 text-shadow-pixel">
                   {personal.name}
               </h1>
               <p className="text-yellow-400 text-sm md:text-base font-pixel leading-loose">
                   {personal.role}
               </p>
           </div>

           {/* Avatar block */}
           <div className="relative mb-12 group">
               <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 z-0"></div>
               <Image src="/assets/minecraft-avatar.png" 
                   alt="Minecraft Avatar" 
                   className="w-48 h-48 md:w-64 md:h-64 object-cover relative z-10 border-4 border-black pixelated hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-200" 
                   style={{ imageRendering: 'pixelated' }} width={800} height={600} />
           </div>

           <div className="max-w-2xl bg-[#866043] border-4 border-[#593d29] p-6 md:p-10 mb-16 shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
               <p className="text-white font-pixel text-sm md:text-base leading-loose text-shadow-sm">
                   "{personal.bio}"
               </p>
           </div>

           {/* Inventory Download Button */}
           <div className="flex flex-col items-center">
               <a aria-label="Link" href={personal.resumeUrl}
                   target="_blank"
                   rel="noreferrer"
                   className="group relative bg-[#7d7d7d] border-b-8 border-r-8 border-t-4 border-l-4 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] px-8 py-4 flex items-center gap-4 hover:bg-[#8d8d8d] active:border-b-4 active:border-r-4 active:border-t-8 active:border-l-8 transition-all"
               >
                   <Download className="w-6 h-6 text-white" strokeWidth={3} />
                   <span className="font-pixel text-white text-sm md:text-base text-shadow-sm">Download Inventory</span>
               </a>
               {/* Small CV label explicitly requested by user */}
               <span className="mt-3 font-pixel text-xs text-white/80 tracking-widest text-shadow-sm uppercase">
                   (CV)
               </span>
           </div>

       </div>

       {/* Scroll indicator - "Dig Down" */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
           <span className="font-pixel text-white text-xs text-shadow-sm">Dig Down</span>
           <ChevronDown className="w-8 h-8 text-white" strokeWidth={3} />
       </div>
       
    </div>
  );
}
