'use client';
import Image from 'next/image';
import React, { useState } from 'react';

export default function RPGProjects({ projects }: { projects: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <div className="py-24 relative w-full bg-[#111122] overflow-hidden border-t-4 border-[#2a2a4a]">
       
       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8">
           
           <div className="w-full flex justify-center mb-16">
               <div className="bg-[#04081c] border-[4px] border-white px-8 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.8)] relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none"></div>
                   <h2 className="font-rpg text-white text-3xl uppercase tracking-widest relative z-10">
                       Inventory
                   </h2>
               </div>
           </div>

           <div className="flex flex-col lg:flex-row gap-8">
               
               {/* Left Column: The Items List */}
               <div className="w-full lg:w-1/2 bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative max-h-[600px] overflow-y-auto custom-scrollbar">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                   
                   <div className="flex flex-col relative z-10">
                       {projects.map((project) => (
                           <div 
                               key={project.id} 
                               className="group flex items-center gap-4 cursor-pointer p-2 hover:bg-white/10 transition-colors"
                               onClick={() => setSelectedProject(project)}
                           >
                               <span className={`font-rpg text-xl ${selectedProject?.id === project.id ? 'text-white opacity-100' : 'text-white opacity-0 group-hover:opacity-50'} w-6`}>
                                   ▶
                               </span>
                               
                               <div className="flex items-center gap-3">
                                   {/* Generic Item Icon (e.g. potion, sword, scroll) */}
                                   <div className="w-8 h-8 bg-black border-2 border-gray-600 flex items-center justify-center shrink-0">
                                       <span className="font-rpg text-yellow-400 text-sm">ITM</span>
                                   </div>
                                   <span className={`font-rpg text-2xl ${selectedProject?.id === project.id ? 'text-yellow-300' : 'text-white'}`}>
                                       {project.title}
                                   </span>
                               </div>
                               
                               <span className="ml-auto font-rpg text-gray-500 text-lg">x1</span>
                           </div>
                       ))}
                   </div>
               </div>

               {/* Right Column: Item Description Box */}
               <div className="w-full lg:w-1/2 flex flex-col gap-8">
                   
                   <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative min-h-[300px]">
                       <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                       
                       <div className="relative z-10 h-full flex flex-col">
                           {selectedProject ? (
                               <div className="animate-in fade-in duration-300 flex flex-col h-full">
                                   
                                   <div className="flex gap-4 mb-4">
                                       <Image src={selectedProject.thumbnailUrl} 
                                           alt={selectedProject.title}
                                           className="w-32 h-24 object-cover border-2 border-white pixelated"
                                           style={{ imageRendering: 'pixelated' }} width={800} height={600} />
                                       <div>
                                           <h3 className="font-rpg text-yellow-400 text-3xl leading-none mb-2">
                                               {selectedProject.title}
                                           </h3>
                                           <h4 className="font-rpg text-[#88aaff] text-xl">
                                               {selectedProject.subtitle}
                                           </h4>
                                       </div>
                                   </div>

                                   <p className="text-white font-rpg text-2xl leading-relaxed flex-1">
                                       {selectedProject.description}
                                   </p>

                                   <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2 border-[#5577ff]">
                                       {selectedProject.technologies.slice(0, 4).map((tech: string) => (
                                           <span key={tech} className="font-rpg text-gray-300 text-lg bg-black/50 px-2 py-1 border border-gray-600">
                                               {tech}
                                           </span>
                                       ))}
                                   </div>
                               </div>
                           ) : (
                               <div className="h-full flex items-center justify-center text-center">
                                   <p className="font-rpg text-gray-500 text-2xl animate-pulse">
                                       Select an item from the inventory...
                                   </p>
                               </div>
                           )}
                       </div>
                   </div>

                   {/* Action Menu */}
                   <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative flex justify-around">
                       <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                       
                       <div className="relative z-10 flex w-full justify-around">
                           <a aria-label="Link" href={selectedProject?.liveUrl || '#'} 
                               target="_blank" 
                               rel="noreferrer"
                               className={`group flex items-center gap-2 ${!selectedProject?.liveUrl ? 'opacity-30 pointer-events-none' : 'cursor-pointer'}`}
                           >
                               <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-rpg text-2xl">▶</span>
                               <span className="font-rpg text-white text-3xl uppercase tracking-wider">Use</span>
                           </a>

                           <a aria-label="Link" href={selectedProject?.githubUrl || '#'} 
                               target="_blank" 
                               rel="noreferrer"
                               className={`group flex items-center gap-2 ${!selectedProject?.githubUrl ? 'opacity-30 pointer-events-none' : 'cursor-pointer'}`}
                           >
                               <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-rpg text-2xl">▶</span>
                               <span className="font-rpg text-white text-3xl uppercase tracking-wider">Examine</span>
                           </a>
                       </div>
                   </div>

               </div>
           </div>

       </div>
    </div>
  );
}
