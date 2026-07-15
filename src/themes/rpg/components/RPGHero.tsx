import React from 'react';
import Image from 'next/image';
import { Download, ChevronDown } from 'lucide-react';

export default function RPGHero({ personal }: { personal: any }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#000]">
       
       {/* Retro Starfield/Night Sky background */}
       <div 
           className="absolute inset-0 opacity-80 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg"><rect width="128" height="128" fill="%230a0a2a"/><circle cx="20" cy="20" r="1" fill="%23ffffff"/><circle cx="80" cy="40" r="1.5" fill="%23aaccff"/><circle cx="50" cy="90" r="1" fill="%23ffffff"/><circle cx="110" cy="100" r="1" fill="%23ffffff"/></svg>')`,
               backgroundSize: '128px 128px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-5xl mx-auto px-4 lg:px-8 py-20 pb-40 flex flex-col md:flex-row items-center justify-center gap-12">
           
           {/* Avatar block */}
           <div className="relative group shrink-0">
               {/* Classic JRPG Window Border around avatar */}
               <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-white p-4 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                   
                   <Image src="/assets/rpg-hero.png" 
                       alt="RPG Hero Avatar" 
                       className="w-48 h-48 md:w-64 md:h-64 object-cover relative z-10 pixelated mix-blend-screen" 
                       style={{ imageRendering: 'pixelated' }} width={800} height={600} />
               </div>
           </div>

           {/* Hero Info Text Box */}
           <div className="w-full bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-white p-6 md:p-8 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
               <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
               
               <h1 className="text-white text-4xl md:text-5xl font-rpg tracking-wider mb-2 drop-shadow-md">
                   {personal.name}
               </h1>
               
               <div className="flex items-center gap-4 mb-6">
                   <span className="text-yellow-400 font-rpg text-xl drop-shadow-md">LVL 99</span>
                   <span className="text-gray-300 font-rpg text-xl drop-shadow-md">{personal.role}</span>
               </div>

               <p className="text-white font-rpg text-2xl leading-relaxed drop-shadow-md">
                   "{personal.bio}"
               </p>

               <div className="mt-8 flex flex-col items-start">
                   {/* Inventory Download Button */}
                   <a aria-label="Link" href={personal.resumeUrl}
                       target="_blank"
                       rel="noreferrer"
                       className="group relative flex items-center gap-3 cursor-pointer"
                   >
                       {/* Selector Hand (Cursor) */}
                       <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-rpg text-2xl -ml-6 absolute left-0">▶</span>
                       
                       <div className="bg-transparent border-2 border-transparent group-hover:border-white px-2 py-1 transition-all pl-6">
                           <span className="font-rpg text-white text-2xl drop-shadow-md uppercase">Equip Scroll</span>
                       </div>
                   </a>
                   {/* Small CV label explicitly requested by user */}
                   <span className="mt-1 ml-6 font-rpg text-gray-400 text-lg uppercase tracking-widest drop-shadow-md">
                       (CV)
                   </span>
               </div>
           </div>

       </div>

       {/* Scroll indicator - "Next Page" */}
       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse">
           <span className="font-rpg text-white text-2xl drop-shadow-md uppercase">Embark</span>
           <ChevronDown className="w-8 h-8 text-white" />
       </div>
       
    </div>
  );
}
