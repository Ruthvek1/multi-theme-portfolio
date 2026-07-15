import React from 'react';
import { Ticket, ChevronDown } from 'lucide-react';

export default function CinemaHero({ personal }: { personal: any }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-[#1a0f14] items-center pt-20">
       
       {/* Background: Evening street outside the cinema */}
       <div className="absolute inset-0 z-0">
           {/* Dark textured background */}
           <div className="absolute inset-0 bg-[#0d070a] opacity-90" style={{ backgroundImage: 'radial-gradient(#331a24 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           {/* Spotlight effects sweeping across */}
           <div className="absolute top-full left-1/4 w-[200vw] h-[100px] bg-white/5 -rotate-45 origin-top-left pointer-events-none mix-blend-screen shadow-[0_0_50px_rgba(255,255,255,0.2)]"></div>
           <div className="absolute top-full right-1/4 w-[200vw] h-[100px] bg-white/5 rotate-45 origin-top-right pointer-events-none mix-blend-screen shadow-[0_0_50px_rgba(255,255,255,0.2)]"></div>
       </div>

       {/* Cinema Marquee Sign */}
       <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
           
           {/* Marquee Header */}
           <div className="bg-[#b31b1b] w-[90%] md:w-[80%] pt-6 pb-8 px-8 border-4 border-yellow-500 rounded-t-xl shadow-[0_-10px_30px_rgba(179,27,27,0.5)] flex flex-col items-center relative overflow-hidden">
               
               {/* Lights bordering the marquee */}
               <div className="absolute inset-2 border-2 border-dashed border-yellow-300 opacity-30"></div>
               <div className="absolute top-2 left-0 right-0 flex justify-around px-4">
                   {Array.from({length: 20}).map((_, i) => (
                       <div key={`t-${i}`} className="w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_10px_#fde047] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                   ))}
               </div>
               <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4">
                   {Array.from({length: 20}).map((_, i) => (
                       <div key={`b-${i}`} className="w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_10px_#fde047] animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                   ))}
               </div>

               {/* "Now Showing" Badge */}
               <div className="bg-black text-yellow-400 font-serif text-sm md:text-xl px-6 py-1 tracking-[0.3em] uppercase border-2 border-yellow-400 mb-6 z-10 shadow-lg relative">
                   ★ Now Showing ★
               </div>

               <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-center uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] relative z-10" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                   {personal.name}
               </h1>
           </div>

           {/* Marquee Sub-board (White with black text) */}
           <div className="bg-[#f0f0f0] w-full max-w-4xl border-4 border-[#333] shadow-2xl p-6 md:p-10 relative flex flex-col items-center justify-center z-20">
               
               {/* Classic track lines for letters */}
               <div className="absolute inset-0 flex flex-col justify-evenly pointer-events-none opacity-20">
                   <div className="h-[2px] w-full bg-black"></div>
                   <div className="h-[2px] w-full bg-black"></div>
                   <div className="h-[2px] w-full bg-black"></div>
               </div>

               <h2 className="text-[#111] text-3xl md:text-5xl font-mono uppercase tracking-widest text-center font-bold mb-6">
                   {personal.role}
               </h2>

               <p className="text-[#333] text-xl md:text-2xl font-mono uppercase tracking-wider text-center max-w-2xl leading-relaxed">
                   {personal.bio}
               </p>

           </div>
           
           {/* Ticket Booth / Entrance Below */}
           <div className="mt-12 mb-24 flex flex-col items-center relative z-20">
               
               {/* Ticket Button */}
               <a aria-label="Link" href={personal.resumeUrl}
                   target="_blank"
                   rel="noreferrer"
                   className="group relative flex items-center justify-center bg-[#eab308] w-[280px] h-[100px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 cursor-pointer border-dashed border-2 border-[#854d0e] mx-auto"
                   style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)' }}
               >
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a0f14] border border-[#854d0e]"></div>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1a0f14] border border-[#854d0e]"></div>
                   
                   <div className="flex flex-col items-center">
                       <span className="text-[#5a340b] font-serif text-3xl uppercase font-black tracking-widest">
                           Admit One
                       </span>
                       <div className="flex items-center gap-2 text-[#713f12]">
                           <Ticket size={16} />
                           <span className="font-mono text-sm tracking-widest font-bold">VIP ACCESS</span>
                       </div>
                   </div>
               </a>
               
               {/* Explicit CV Label below ticket */}
               <span className="mt-3 text-gray-400 font-mono text-sm tracking-[0.3em] uppercase">
                   (CV)
               </span>

           </div>

       </div>

       {/* Enter Theater Scroll Indicator */}
       <div className="absolute bottom-4 flex flex-col items-center gap-2 animate-bounce z-20">
           <span className="text-yellow-500 font-serif text-sm tracking-widest uppercase">Enter Lobby</span>
           <ChevronDown className="w-8 h-8 text-yellow-500" />
       </div>
       
    </div>
  );
}
