'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { Play, Code, Clapperboard } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinemaProjects({ projects }: { projects: any[] }) {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projects[currentProjectIndex];

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start center", "center center"]
  });

  // Curtains slide out to the sides
  const curtainLeftX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const curtainRightX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="py-32 relative w-full bg-[#050304] overflow-hidden min-h-[900px]">
       
       {/* Atmospheric projector beam */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[70vh] bg-gradient-to-b from-white/20 via-white/5 to-transparent blur-[40px] pointer-events-none z-0 mix-blend-screen" style={{ clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0% 100%)' }}></div>
       
       {/* Dust particles inside the beam */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-xl h-[70vh] pointer-events-none z-0 overflow-hidden mix-blend-screen">
           {Array.from({length: 30}).map((_, i) => (
               <motion.div
                   key={i}
                   className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                   initial={{ 
                       x: (Math.random() - 0.5) * 500, 
                       y: Math.random() * 500 
                   }}
                   animate={{ 
                       y: [null, Math.random() * 500 + 100, Math.random() * 500 - 100],
                       opacity: [0, Math.random() * 0.5 + 0.2, 0],
                       scale: [0, Math.random() + 0.5, 0]
                   }}
                   transition={{ 
                       duration: Math.random() * 5 + 3,
                       repeat: Infinity,
                       ease: "linear"
                   }}
               />
           ))}
       </div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 flex flex-col items-center">
           
           <div className="flex items-center gap-4 mb-16 opacity-50">
               <Clapperboard className="w-8 h-8 text-white" />
               <h2 className="font-sans text-white text-xl uppercase tracking-widest">Feature Presentations</h2>
               <Clapperboard className="w-8 h-8 text-white" />
           </div>

           {/* The Big Screen (Project Viewer) */}
           <div className="w-full relative aspect-video max-h-[70vh] bg-black border-4 border-[#222] rounded-sm shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden mb-12">
               
               {/* Screen Content */}
               {currentProject && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#0a0a0a] animate-in fade-in duration-1000 zoom-in-95">
                       
                       <Image src={currentProject.thumbnailUrl} 
                           alt={currentProject.title} 
                           className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity blur-sm" width={800} height={600} />
                       
                       <div className="relative z-10 max-w-4xl max-h-full overflow-y-auto scrollbar-hide py-4 px-2">
                           <p className="font-sans text-yellow-500 text-xs md:text-sm uppercase tracking-[0.3em] mb-2">
                               {currentProject.subtitle}
                           </p>
                           
                           <h3 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 tracking-wide drop-shadow-2xl leading-tight py-1">
                               {currentProject.title}
                           </h3>
                           
                           <p className="font-serif text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed italic mb-6 drop-shadow-md">
                               "{currentProject.description}"
                           </p>

                           <div className="flex flex-wrap justify-center gap-2 mb-6">
                               {currentProject.technologies.slice(0, 5).map((tech: string) => (
                                   <span key={tech} className="font-sans text-white border border-white/30 px-2 py-1 text-[10px] md:text-xs uppercase tracking-widest bg-black/50 backdrop-blur-sm">
                                       {tech}
                                   </span>
                               ))}
                           </div>

                           <div className="flex items-center justify-center gap-4">
                               {currentProject.liveUrl && (
                                   <a aria-label="Link" href={currentProject.liveUrl} 
                                       target="_blank" 
                                       rel="noreferrer"
                                       className="group flex items-center gap-2 bg-white text-black px-4 py-2 hover:bg-yellow-400 transition-colors"
                                   >
                                       <Play size={16} className="fill-current" />
                                       <span className="font-sans font-bold uppercase tracking-widest text-xs md:text-sm">Play Trailer</span>
                                   </a>
                               )}
                               {currentProject.githubUrl && (
                                   <a aria-label="Link" href={currentProject.githubUrl} 
                                       target="_blank" 
                                       rel="noreferrer"
                                       className="group flex items-center gap-3 border border-white text-white px-6 py-3 hover:bg-white/10 transition-colors"
                                   >
                                       <Code size={20} />
                                       <span className="font-sans font-bold uppercase tracking-widest text-sm">View Script</span>
                                   </a>
                               )}
                           </div>
                       </div>
                   </div>
               )}

               {/* Red Velvet Curtains on the sides (Animated) */}
               <motion.div 
                   style={{ x: curtainLeftX }}
                   className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#4a0000] via-[#800000] to-[#4a0000] border-r-4 border-[#330000] shadow-[10px_0_30px_rgba(0,0,0,1)] z-20 origin-left"
               ></motion.div>
               <motion.div 
                   style={{ x: curtainRightX }}
                   className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-l from-[#4a0000] via-[#800000] to-[#4a0000] border-l-4 border-[#330000] shadow-[-10px_0_30px_rgba(0,0,0,1)] z-20 origin-right"
               ></motion.div>
           </div>

           {/* Theater Seats (Project Selector) */}
           <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
               {projects.map((project, idx) => (
                   <button aria-label="Interactive Button" key={project.id}
                       onClick={() => setCurrentProjectIndex(idx)}
                       className={`flex flex-col items-center p-4 transition-all ${currentProjectIndex === idx ? 'bg-red-900/40 border-t-4 border-yellow-500 scale-105' : 'bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100'}`}
                   >
                       {/* Seat graphic abstraction */}
                       <div className="w-12 h-12 bg-red-800 rounded-t-lg border-2 border-red-950 mb-3 shadow-[inset_0_-5px_10px_rgba(0,0,0,0.5)]"></div>
                       <span className="font-sans text-white text-xs uppercase tracking-widest text-center">
                           {project.title}
                       </span>
                   </button>
               ))}
           </div>

       </div>
    </div>
  );
}
