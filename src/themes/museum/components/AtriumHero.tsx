import React from 'react';
import Image from 'next/image';
import { Download, Mail, Phone, ExternalLink, Globe, Code2 } from 'lucide-react';

export default function AtriumHero({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative py-20 px-4 md:px-12 z-20">
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 w-full max-w-7xl items-center">
         
         {/* The Masterpiece (Avatar) */}
         <div className="md:col-span-5 relative group">
            {/* Spotlight */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-[600px] bg-yellow-500/10 blur-3xl rounded-[100%] pointer-events-none transform -rotate-12 mix-blend-screen transition-opacity duration-1000 opacity-80 group-hover:opacity-100"></div>
            
            {/* Gold Frame */}
            <div className="relative p-8 bg-[#b8953f] bg-gradient-to-br from-[#d4af37] via-[#aa771c] to-[#d4af37] shadow-2xl before:absolute before:inset-2 before:border-4 before:border-[#523812] before:shadow-inner before:z-10 mx-auto max-w-md">
               {/* Art Canvas */}
               <div className="relative z-0 overflow-hidden bg-[#1a1614] border border-black/50 shadow-inner">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas.png')] opacity-30 mix-blend-overlay pointer-events-none z-10"></div>
                  <Image src="/assets/museum-avatar.png" alt={personal.name} className="w-full h-auto aspect-[3/4] object-cover scale-105 group-hover:scale-110 transition-transform duration-[3s]" width={800} height={600} />
               </div>
            </div>
            
            {/* Museum Plaque under Avatar */}
            <div className="mt-8 mx-auto w-64 bg-[#b59e66] bg-gradient-to-b from-[#c5b17a] to-[#998144] p-3 text-center border-2 border-[#544521] shadow-xl relative shadow-black/40">
               <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
               <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
               <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
               <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
               
               <h2 className="font-serif text-[#2a2313] font-bold text-sm tracking-widest uppercase">{personal.name}</h2>
               <p className="font-serif text-[#41361c] text-[10px] mt-1 uppercase">Circa {new Date().getFullYear()}</p>
            </div>
         </div>

         {/* The Exhibition Description (Bio) */}
         <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left">
            
            <h1 className="font-serif text-5xl md:text-7xl font-light text-[#d4af37] mb-4 tracking-wide shadow-black drop-shadow-xl">
               The <span className="font-bold italic">Exhibition</span>
            </h1>
            
            <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-8"></div>
            
            <h3 className="text-xl md:text-2xl font-serif text-[#e4dac4] italic mb-6">
               "{personal.role}"
            </h3>
            
            <p className="font-serif text-[#b8ad96] text-lg leading-relaxed mb-12 max-w-2xl drop-shadow-md">
               {personal.bio}
            </p>

            <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start">
               
               {/* Download Guidebook (Resume) */}
               {personal.resumeUrl && (
                  <a aria-label="Link" href={personal.resumeUrl} download className="group relative px-8 py-3 bg-[#111] border border-[#d4af37] overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                     <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#aa771c] opacity-0 group-hover:opacity-20 transition-opacity"></div>
                     <span className="relative flex items-center gap-3 font-serif text-[#d4af37] tracking-widest uppercase text-sm font-bold group-hover:text-white transition-colors">
                        <Download className="w-4 h-4" /> Exhibit Guidebook
                     </span>
                  </a>
               )}

               {/* Socials / Contact */}
               <div className="flex gap-4">
                  {personal.email && (
                     <a aria-label="Link" href={`mailto:${personal.email}`} className="text-[#a8997a] hover:text-[#d4af37] transition-colors p-2 border border-transparent hover:border-[#d4af37]/50 rounded-full hover:bg-white/5">
                        <Mail className="w-5 h-5" />
                     </a>
                  )}
                  {socials?.linkedin && (
                     <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="text-[#a8997a] hover:text-[#d4af37] transition-colors p-2 border border-transparent hover:border-[#d4af37]/50 rounded-full hover:bg-white/5">
                        <Globe className="w-5 h-5" />
                     </a>
                  )}
                  {socials?.github && (
                     <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="text-[#a8997a] hover:text-[#d4af37] transition-colors p-2 border border-transparent hover:border-[#d4af37]/50 rounded-full hover:bg-white/5">
                        <Code2 className="w-5 h-5" />
                     </a>
                  )}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
