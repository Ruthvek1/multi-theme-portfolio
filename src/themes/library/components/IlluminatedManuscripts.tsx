import React from 'react';
import Image from 'next/image';
import { Play, Code2 } from 'lucide-react';

export default function IlluminatedManuscripts({ projects }: { projects: any[] }) {
  return (
    <div className="py-32 relative z-20 max-w-7xl mx-auto px-4">
       
       <div className="text-center mb-32 relative">
           <h2 className="font-serif text-5xl text-[#d4af37] tracking-widest uppercase font-bold drop-shadow-lg mb-6">
               Illuminated Manuscripts
           </h2>
           <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#8b4513] to-transparent mx-auto"></div>
           <p className="mt-6 font-serif text-[#fdf3d8]/60 italic text-xl">
               Grand works of creation and design
           </p>
       </div>

       <div className="space-y-48">
           {projects.map((project, idx) => (
               <div key={project.id} className="relative">
                   
                   {/* Table / Stand */}
                   <div className="absolute -inset-8 bg-[#2a1b0e] rounded-xl shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none transform -rotate-1"></div>

                   {/* The Manuscript */}
                   <div className="relative bg-[#fdf3d8] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] p-8 md:p-16 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_80px_rgba(139,69,19,0.2)] flex flex-col md:flex-row gap-12 items-center">
                       
                       {/* Left Page (Details) */}
                       <div className="w-full md:w-1/2 relative">
                           <h3 className="font-serif text-[#4a3018] text-4xl font-bold mb-6 capitalize leading-tight first-letter:text-6xl first-letter:text-[#8b0000] first-letter:float-left first-letter:mr-2">
                               {project.title}
                           </h3>
                           <p className="font-serif text-[#4a3018]/80 text-lg leading-relaxed mb-8">
                               {project.description}
                           </p>

                           {/* Technologies / Runes */}
                           <div className="mb-8">
                               <h4 className="font-serif text-[#8b4513] italic mb-3">Enchantments (Tech Stack):</h4>
                               <div className="flex flex-wrap gap-2">
                                   {project.technologies.map((tech: string) => (
                                       <span key={tech} className="px-3 py-1 bg-[#4a3018]/10 border border-[#8b4513]/30 text-[#4a3018] text-sm font-serif">
                                           {tech}
                                       </span>
                                   ))}
                               </div>
                           </div>

                           <div className="flex gap-4">
                               {project.liveUrl && (
                                   <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-[#8b0000] text-[#fdf3d8] bg-[#8b0000] hover:bg-[#5a0000] transition-colors font-serif uppercase tracking-widest text-xs font-bold shadow-lg">
                                       <Play className="w-4 h-4" /> Execute Incantation
                                   </a>
                               )}
                               {project.githubUrl && (
                                   <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-[#4a3018] text-[#4a3018] hover:bg-[#4a3018] hover:text-[#fdf3d8] transition-colors font-serif uppercase tracking-widest text-xs font-bold">
                                       <Code2 className="w-4 h-4" /> View Runes
                                   </a>
                               )}
                           </div>
                       </div>

                       {/* Right Page (Illustration) */}
                       <div className="w-full md:w-1/2 relative group">
                           {/* Decorative border */}
                           <div className="absolute -inset-4 border-4 border-double border-[#8b4513]/30 pointer-events-none"></div>
                           
                           <div className="relative w-full aspect-video border-2 border-[#4a3018] overflow-hidden bg-[#2a1b0e]">
                               <Image src={project.thumbnailUrl} 
                                   alt={project.title} 
                                   className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-1000 sepia-[0.5] group-hover:sepia-0 scale-105 group-hover:scale-100" width={800} height={600} />
                               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                           </div>

                           <div className="absolute -bottom-4 right-8 bg-[#fdf3d8] px-4 py-1 border border-[#8b4513]/30 shadow-md font-serif text-[#8b4513] text-sm italic transform rotate-2">
                               Illustration {idx + 1}
                           </div>
                       </div>

                   </div>
               </div>
           ))}
       </div>

    </div>
  );
}
