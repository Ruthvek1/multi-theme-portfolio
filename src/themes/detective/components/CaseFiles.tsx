import React from 'react';
import Image from 'next/image';
import { ExternalLink, Code2, Camera } from 'lucide-react';

export default function CaseFiles({ projects }: { projects: any[] }) {
   return (
      <div className="max-w-6xl mx-auto mb-32 relative z-20">

         <div className="flex justify-center mb-16">
            <div className="bg-red-700 text-white px-6 py-2 font-['Courier_New'] font-bold text-2xl uppercase shadow-[0_5px_15px_rgba(0,0,0,0.5)] rotate-1 border-2 border-white">
               Confidential Case Files
            </div>
         </div>

         <div className="flex flex-wrap justify-center gap-16 md:gap-12">
            {projects.map((project, i) => (
               <div key={i} className="w-full md:w-[45%] h-[400px] perspective-1000 group">

                  {/* 3D Folder Container */}
                  <div className="relative w-full h-full transform-style-3d transition-transform duration-700 group-hover:rotate-x-[15deg] group-hover:rotate-y-[-10deg]">

                     {/* Back cover of folder */}
                     <div className="absolute inset-0 bg-[#d9c59c] border-2 border-[#b5a585] shadow-xl rounded-sm">
                        {/* Folder Tab */}
                        <div className="absolute -top-6 left-0 bg-[#d9c59c] border-t-2 border-l-2 border-r-2 border-[#b5a585] px-4 py-1 font-['Courier_New'] font-bold text-xs uppercase rounded-t-sm z-0">
                           CASE #{project.year}
                        </div>

                        {/* Content Inside the Folder */}
                        <div className="absolute inset-2 bg-white/90 p-4 border border-gray-300 font-['Courier_New'] shadow-inner overflow-hidden flex flex-col">
                           <h3 className="font-black text-xl uppercase tracking-tighter text-black mb-2 pb-2 border-b-2 border-red-600/30">
                              {project.title}
                           </h3>
                           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-xs md:text-sm leading-relaxed mb-2 text-gray-800 font-medium">
                              <p className="first-letter:text-xl first-letter:font-black first-letter:text-red-700">{project.description}</p>
                           </div>

                           <div className="flex flex-wrap gap-1 mt-auto pb-4">
                              {project.technologies.map((tech: string, j: number) => (
                                 <span key={j} className="text-[10px] font-bold uppercase text-blue-900 bg-blue-100 px-1 py-0.5 border border-blue-300">
                                    {tech}
                                 </span>
                              ))}
                           </div>

                           <div className="grid grid-cols-2 gap-2 mt-2">
                              {project.liveUrl && (
                                 <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 bg-red-700 text-white font-bold text-[10px] uppercase py-1.5 hover:bg-red-800 transition-colors shadow-sm">
                                    <ExternalLink className="w-3 h-3" /> Execute
                                 </a>
                              )}
                              {project.githubUrl && (
                                 <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 bg-gray-800 text-white font-bold text-[10px] uppercase py-1.5 hover:bg-gray-900 transition-colors shadow-sm">
                                    <Code2 className="w-3 h-3" /> Intel
                                 </a>
                              )}
                           </div>
                        </div>
                     </div>

                     {/* Front cover of folder */}
                     <div className="absolute inset-0 bg-[#e6d3a8] border-2 border-[#b5a585] rounded-sm transform origin-bottom transition-transform duration-700 group-hover:rotate-x-[-110deg] shadow-[inset_0_-20px_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center backface-hidden z-20">

                        {/* Top Secret Stamp */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-8 border-red-600 text-red-600 font-['Courier_New'] font-black text-5xl uppercase tracking-[0.2em] px-4 py-2 rotate-[-15deg] mix-blend-multiply opacity-80 z-30 pointer-events-none">
                           CONFIDENTIAL
                        </div>

                        {/* Photo taped to front */}
                        <div className="w-3/4 max-w-[500px] aspect-video bg-gray-900 p-2 shadow-md rotate-2 border border-gray-400 relative">
                           <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm z-20 rotate-[-2deg]"></div>

                           <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                              {project.thumbnailUrl ? (
                                 <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover grayscale sepia-[0.4] contrast-125 opacity-80" width={800} height={600} />
                              ) : (
                                 <Camera className="w-8 h-8 text-gray-600" />
                              )}
                           </div>
                        </div>

                        <div className="mt-8 font-['Courier_New'] text-center">
                           <div className="font-bold text-gray-800 text-sm">PROPERTY OF P.D.</div>
                           <div className="text-xl font-black uppercase tracking-widest text-black/90 mt-1">{project.title}</div>
                        </div>
                     </div>

                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
