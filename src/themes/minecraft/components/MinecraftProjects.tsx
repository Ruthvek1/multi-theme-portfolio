'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function MinecraftProjects({ projects }: { projects: any[] }) {
  const [openChests, setOpenChests] = useState<Record<string, boolean>>({});

  const toggleChest = (id: string) => {
      setOpenChests(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="py-32 relative w-full bg-[#151515] overflow-hidden">
       
       {/* Obsidian Background Pattern */}
       <div 
           className="absolute inset-0 opacity-40 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%231a0f2e"/><rect x="32" width="32" height="32" fill="%23110920"/><rect y="32" width="32" height="32" fill="%23110920"/><rect x="32" y="32" width="32" height="32" fill="%231a0f2e"/></svg>')`,
               backgroundSize: '64px 64px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8">
           
           <div className="text-center mb-24 bg-black/60 p-6 inline-block mx-auto border-4 border-[#3a3a3a] shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
               <h2 className="font-pixel text-white text-2xl md:text-4xl text-shadow-pixel">
                   Storage Chests
               </h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               {projects.map((project) => (
                   <div key={project.id} className="relative group">
                       
                       {/* The Chest Label */}
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 px-4 py-2 border-2 border-[#555] font-pixel text-white text-xs z-20 whitespace-nowrap text-shadow-sm">
                           {project.title}
                       </div>

                       {/* The Chest */}
                       <div 
                           className="bg-[#c6c6c6] border-b-8 border-r-8 border-t-4 border-l-4 border-b-[#555] border-r-[#555] border-t-[#fff] border-l-[#fff] p-4 cursor-pointer hover:bg-[#d0d0d0] transition-colors"
                           onClick={() => toggleChest(project.id)}
                       >
                           {/* Inside the chest */}
                           <div className="bg-[#8b8b8b] border-b-4 border-r-4 border-t-4 border-l-4 border-b-[#fff] border-r-[#fff] border-t-[#373737] border-l-[#373737] p-4 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                               
                               {!openChests[project.id] ? (
                                   <div className="text-center animate-pulse">
                                       <div className="w-32 h-32 mx-auto bg-[#855e42] border-4 border-[#3e2b22] mb-6 flex flex-col justify-between">
                                           <div className="h-4 bg-[#6c4831] border-b border-[#3e2b22]"></div>
                                           <div className="w-4 h-6 bg-[#cfcfcf] border border-[#555] mx-auto mt-2"></div>
                                           <div className="flex-1"></div>
                                       </div>
                                       <p className="font-pixel text-black text-sm">Click to Open</p>
                                   </div>
                               ) : (
                                   <div className="w-full h-full flex flex-col items-center text-center animate-in zoom-in duration-300">
                                       
                                       <Image src={project.thumbnailUrl} 
                                           alt={project.title}
                                           className="w-full h-40 object-cover border-4 border-[#373737] mb-6 pixelated"
                                           style={{ imageRendering: 'pixelated' }} width={800} height={600} />

                                       <h4 className="font-pixel text-[#333] text-sm mb-2 uppercase">{project.subtitle}</h4>
                                       <p className="text-black font-sans font-bold text-sm mb-6 flex-1 line-clamp-3">
                                           {project.description}
                                       </p>

                                       <div className="flex flex-wrap justify-center gap-2 mb-6">
                                           {project.technologies.slice(0,4).map((tech: string) => (
                                               <span key={tech} className="font-pixel text-[8px] text-white bg-black/60 px-2 py-1">
                                                   {tech}
                                               </span>
                                           ))}
                                       </div>

                                       <div className="flex gap-4 w-full">
                                           {project.liveUrl && (
                                               <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 bg-[#5a9e32] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#325e1a] border-r-[#325e1a] border-t-[#78c74a] border-l-[#78c74a] py-3 hover:bg-[#68af3e] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all">
                                                   <span className="font-pixel text-white text-[10px]">Play Demo</span>
                                               </a>
                                           )}
                                           {project.githubUrl && (
                                               <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 bg-[#7d7d7d] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] py-3 hover:bg-[#8d8d8d] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all">
                                                   <span className="font-pixel text-white text-[10px]">Source</span>
                                               </a>
                                           )}
                                       </div>

                                   </div>
                               )}
                           </div>
                       </div>
                   </div>
               ))}
           </div>

       </div>
    </div>
  );
}
