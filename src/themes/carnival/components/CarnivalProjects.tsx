'use client';
import React, { useState, useEffect } from 'react';
import { Play, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CarnivalProjects({ projects }: { projects: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!projects || projects.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [projects]);

  return (
    <div className="py-32 relative w-full overflow-hidden bg-gradient-to-b from-[#fcd34d] via-[#f97316] to-[#ec4899] min-h-[900px] flex flex-col justify-center">
       
       {/* Ambient sunset glow */}
       <div className="absolute inset-0 z-0">
           {/* Sun setting */}
           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-white rounded-full opacity-20 blur-[60px] translate-y-1/2"></div>
       </div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center">
           
           <h2 className="font-sans text-white text-4xl md:text-6xl uppercase tracking-[0.2em] font-black text-center mb-16 drop-shadow-lg">
               The Great Ferris Wheel
           </h2>

           <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
               
               {/* The Ferris Wheel Abstraction */}
               <div className="w-full lg:w-1/2 relative aspect-square max-w-[500px] flex items-center justify-center">
                   
                   {/* Wheel Structure (Bright White/Metal) */}
                   <div className="absolute inset-0 border-[10px] border-white/80 rounded-full animate-[spin_40s_linear_infinite] shadow-[0_0_50px_rgba(255,255,255,0.3)] backdrop-blur-sm">
                       {/* Spokes */}
                       {Array.from({length: 8}).map((_, i) => (
                           <div key={`spoke-${i}`} className="absolute top-1/2 left-0 right-0 h-[4px] bg-white/80" style={{ transform: `rotate(${i * 22.5}deg)` }}></div>
                       ))}
                       
                       {/* Glowing Lights on Wheel (Colorful) */}
                       {Array.from({length: 24}).map((_, i) => {
                           const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'];
                           const color = colors[i % colors.length];
                           return (
                               <div 
                                   key={`light-${i}`} 
                                   className="absolute w-4 h-4 rounded-full shadow-[0_0_15px_currentColor] -translate-x-1/2 -translate-y-1/2"
                                   style={{
                                       top: `${50 - 50 * Math.cos(i * 15 * Math.PI / 180)}%`,
                                       left: `${50 + 50 * Math.sin(i * 15 * Math.PI / 180)}%`,
                                       backgroundColor: color,
                                       color: color
                                   }}
                               ></div>
                           )
                       })}
                   </div>
                   
                   {/* Center Hub */}
                   <div className="absolute w-20 h-20 bg-white rounded-full border-8 border-[#3b82f6] z-10 flex items-center justify-center shadow-2xl">
                       <div className="w-8 h-8 bg-[#f59e0b] rounded-full shadow-inner"></div>
                   </div>

                   {/* Stand */}
                   <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[60%] h-[60%] border-t-[16px] border-l-[16px] border-r-[16px] border-white rounded-t-full -z-10 shadow-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)' }}></div>

                   {/* Project Carts (Colorful & Interactive) */}
                   {projects.map((project, i) => {
                       const angle = (i * (360 / projects.length)) - 90;
                       const isActive = activeIndex === i;
                       const cartColors = [
                           { bg: 'bg-[#3b82f6]', hover: 'hover:bg-[#2563eb]', border: 'border-[#1e3a8a]' },
                           { bg: 'bg-[#10b981]', hover: 'hover:bg-[#059669]', border: 'border-[#064e3b]' },
                           { bg: 'bg-[#f43f5e]', hover: 'hover:bg-[#e11d48]', border: 'border-[#881337]' },
                           { bg: 'bg-[#8b5cf6]', hover: 'hover:bg-[#7c3aed]', border: 'border-[#4c1d95]' }
                       ];
                       const color = cartColors[i % cartColors.length];
                       
                       return (
                           <button aria-label="Interactive Button" key={project.id}
                               onClick={() => setActiveIndex(i)}
                               className={`absolute w-16 h-20 md:w-20 md:h-24 rounded-b-3xl rounded-t-lg border-4 transition-all duration-300 z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-xl hover:scale-110 group
                                   ${isActive ? 'bg-white border-[#f59e0b] shadow-[0_0_30px_rgba(255,255,255,0.8)] scale-125 z-30' : `${color.bg} ${color.border} ${color.hover}`}
                               `}
                               style={{
                                   top: `${50 + 40 * Math.sin(angle * Math.PI / 180)}%`,
                                   left: `${50 + 40 * Math.cos(angle * Math.PI / 180)}%`,
                               }}
                           >
                               {/* Cart Canopy Edge */}
                               <div className="absolute top-0 left-0 right-0 h-4 bg-black/10 rounded-t-lg"></div>
                               <span className={`font-sans font-black text-lg md:text-xl ${isActive ? 'text-[#f59e0b]' : 'text-white'}`}>{i + 1}</span>
                           </button>
                       );
                   })}
               </div>

               {/* Project Details Panel (Bright Ticket Style) */}
               <div className="w-full lg:w-1/2 min-h-[400px] relative">
                   <AnimatePresence mode="wait">
                       <motion.div
                           key={activeIndex}
                           initial={{ opacity: 0, x: 50, rotate: 5 }}
                           animate={{ opacity: 1, x: 0, rotate: 0 }}
                           exit={{ opacity: 0, x: -50, rotate: -5 }}
                           transition={{ type: "spring", bounce: 0.4 }}
                           className="bg-white border-8 border-[#3b82f6] rounded-3xl p-8 md:p-12 shadow-2xl relative"
                       >
                           {/* Decorative corner stars */}
                           <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f43f5e] shadow-md border-4 border-white flex items-center justify-center"></div>
                           <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#f43f5e] shadow-md border-4 border-white flex items-center justify-center"></div>

                           <p className="font-sans font-bold text-[#f43f5e] text-sm uppercase tracking-widest mb-2 bg-red-100 px-4 py-1 rounded-full inline-block">
                               Attraction #{activeIndex + 1}
                           </p>
                           
                           <h3 className="font-sans text-[#1e3a8a] text-3xl md:text-5xl font-black uppercase mb-6 tracking-tight">
                               {projects[activeIndex].title}
                           </h3>
                           
                           <p className="text-gray-600 font-sans text-lg md:text-xl leading-relaxed mb-8 font-medium">
                               {projects[activeIndex].description}
                           </p>

                           <div className="flex flex-wrap gap-2 mb-8">
                               {projects[activeIndex].technologies.map((tech: string) => (
                                   <span key={tech} className="bg-blue-100 border-2 border-[#3b82f6] text-[#1e3a8a] font-sans text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                                       {tech}
                                   </span>
                               ))}
                           </div>

                           <div className="flex items-center gap-4">
                               {projects[activeIndex].liveUrl && (
                                   <a aria-label="Link" href={projects[activeIndex].liveUrl} 
                                       target="_blank" 
                                       rel="noreferrer"
                                       className="flex items-center justify-center gap-2 bg-[#f43f5e] text-white px-8 py-3.5 font-sans font-black uppercase tracking-widest hover:bg-[#e11d48] hover:scale-105 transition-all rounded-full shadow-lg"
                                   >
                                       <Play size={20} className="fill-current" /> Ride Now
                                   </a>
                               )}
                               {projects[activeIndex].githubUrl && (
                                   <a aria-label="Link" href={projects[activeIndex].githubUrl} 
                                       target="_blank" 
                                       rel="noreferrer"
                                       className="flex items-center justify-center gap-2 border-4 border-gray-200 text-gray-500 px-8 py-3 font-sans font-bold uppercase tracking-widest hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors rounded-full"
                                   >
                                       <Code size={20} /> Blueprints
                                   </a>
                               )}
                           </div>
                       </motion.div>
                   </AnimatePresence>
               </div>

           </div>
       </div>
    </div>
  );
}
