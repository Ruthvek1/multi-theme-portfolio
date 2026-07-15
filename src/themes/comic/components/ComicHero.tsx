import React from 'react';
import Image from 'next/image';
import { Download, Mail, Phone, ExternalLink, Globe, Code2 } from 'lucide-react';

export default function ComicHero({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="relative min-h-[95vh] w-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col z-20">
       
       {/* Giant Comic Panel (The Hero) */}
       <div className="relative flex-1 bg-[#ffffff] border-8 border-black shadow-[16px_16px_0_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-hidden">
           
           {/* Dynamic Background Pattern (Halftone Dots) */}
           <div 
               className="absolute inset-0 opacity-20 pointer-events-none"
               style={{
                   backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)',
                   backgroundSize: '12px 12px'
               }}
           ></div>

           {/* Yellow Action Burst behind Avatar */}
           <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] md:w-[70%] md:h-[140%] bg-[#ffea00] border-r-8 border-black transform -skew-x-12 z-0 shadow-[8px_0_0_rgba(0,0,0,1)]"></div>

           {/* Left Side: Avatar */}
           <div className="w-full md:w-1/2 relative z-10 flex items-center justify-center p-8">
               <div className="relative w-full max-w-md aspect-square rounded-full border-8 border-black overflow-hidden shadow-[12px_12px_0_rgba(0,0,0,1)] bg-white transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                   <Image src="/assets/comic-avatar.png" alt="Hero Avatar" className="w-full h-full object-cover" width={800} height={600} />
               </div>

               {/* POW! Graphic */}
               <div className="absolute -bottom-8 -left-4 bg-[#e62e2d] border-4 border-black px-6 py-2 transform rotate-[-15deg] shadow-[6px_6px_0_rgba(0,0,0,1)] z-20">
                   <span className="font-black italic text-white text-3xl tracking-tighter">BAM!</span>
               </div>
           </div>

           {/* Right Side: Bio & Info */}
           <div className="w-full md:w-1/2 relative z-10 p-8 md:p-12 flex flex-col justify-center bg-[#2986cc]/10">
               
               {/* Caption Box */}
               <div className="bg-[#ffea00] border-4 border-black px-4 py-1 self-start mb-6 shadow-[6px_6px_0_rgba(0,0,0,1)]">
                   <span className="font-black text-black uppercase tracking-widest text-sm">Issue #1 • Origin Story</span>
               </div>

               <h1 className="font-black text-6xl md:text-8xl text-black uppercase tracking-tighter leading-none mb-2" style={{ WebkitTextStroke: '2px white' }}>
                   {personal.name.split(' ')[0]}
                   <br/>
                   <span className="text-[#e62e2d]">{personal.name.split(' ').slice(1).join(' ')}</span>
               </h1>
               
               <div className="bg-black text-white font-bold uppercase tracking-widest px-4 py-2 self-start mb-8 transform -skew-x-12">
                   {personal.role}
               </div>

               {/* Speech Bubble for Bio */}
               <div className="relative bg-white border-4 border-black p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] rounded-2xl mb-8">
                   <p className="font-bold text-lg leading-relaxed text-black">
                       "{personal.bio}"
                   </p>
                   {/* Speech bubble tail */}
                   <div className="absolute -bottom-4 left-12 w-8 h-8 bg-white border-b-4 border-r-4 border-black transform rotate-45 shadow-[4px_4px_0_rgba(0,0,0,1)]"></div>
               </div>

               {/* Contact & Socials Panel */}
               <div className="flex flex-wrap gap-4 mt-auto">
                   
                   {/* Download Resume Action Button */}
                   <a aria-label="Link" href={personal.resumeUrl}
                       target="_blank"
                       rel="noreferrer"
                       className="bg-[#e62e2d] text-white border-4 border-black px-6 py-3 font-black text-xl uppercase italic shadow-[8px_8px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all flex items-center gap-2"
                   >
                       <Download className="w-6 h-6" strokeWidth={3} />
                       Get Dossier!
                   </a>

                   {/* Social Buttons */}
                   {socials?.linkedin && (
                       <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="bg-[#2986cc] text-white border-4 border-black p-3 font-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all">
                           <Globe className="w-6 h-6" strokeWidth={3} />
                       </a>
                   )}
                   {socials?.github && (
                       <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="bg-[#ffffff] text-black border-4 border-black p-3 font-black shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all">
                           <Code2 className="w-6 h-6" strokeWidth={3} />
                       </a>
                   )}
               </div>

           </div>

       </div>
    </div>
  );
}
