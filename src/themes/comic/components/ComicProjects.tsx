import React from 'react';
import Image from 'next/image';
import { Play, Code2 } from 'lucide-react';

export default function ComicProjects({ projects }: { projects: any[] }) {
  return (
    <div className="py-20 relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
       
       <div className="w-full max-w-5xl mx-auto mb-20 text-center relative">
           {/* Speech bubble style header */}
           <div className="relative inline-block bg-white border-8 border-black px-12 py-8 shadow-[16px_16px_0_rgba(0,0,0,1)] rounded-[3rem]">
               <h2 className="font-black text-5xl md:text-7xl text-[#e62e2d] uppercase tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>
                   The Adventures
               </h2>
               <div className="absolute -bottom-8 right-16 w-12 h-12 bg-white border-r-8 border-b-8 border-black transform rotate-45"></div>
           </div>
       </div>

       <div className="space-y-16">
           {projects.map((project, idx) => {
               const isEven = idx % 2 === 0;
               return (
                   <div key={project.id} className="relative bg-white border-8 border-black shadow-[16px_16px_0_rgba(0,0,0,1)] flex flex-col md:flex-row overflow-hidden group">
                       
                       {/* Issue Number Caption */}
                       <div className="absolute top-0 left-0 bg-[#ffea00] border-r-4 border-b-4 border-black px-4 py-2 z-20">
                           <span className="font-black text-black uppercase tracking-widest text-sm">
                               Episode {idx + 1}
                           </span>
                       </div>

                       {/* Image Panel */}
                       <div className={`w-full md:w-1/2 relative border-b-8 md:border-b-0 ${isEven ? 'md:border-r-8' : 'md:border-l-8 md:order-2'} border-black overflow-hidden bg-[#ffea00]`}>
                           {/* Halftone effect overlay */}
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay z-10"></div>
                           
                           <Image src={project.thumbnailUrl} 
                               alt={project.title}
                               className="w-full h-full object-cover grayscale contrast-150 mix-blend-multiply group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500 scale-105 group-hover:scale-100" width={800} height={600} />
                           
                           {/* Year Tag */}
                           <div className="absolute bottom-4 right-4 bg-[#2986cc] text-white border-4 border-black px-3 py-1 font-black transform rotate-[-5deg] shadow-[4px_4px_0_rgba(0,0,0,1)] z-20">
                               {project.year}
                           </div>
                       </div>

                       {/* Content Panel */}
                       <div className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] bg-opacity-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                           
                           <h3 className="font-black text-4xl uppercase mb-2 leading-none" style={{ WebkitTextStroke: '1px black', color: '#ffea00' }}>
                               {project.title}
                           </h3>
                           <h4 className="font-bold text-xl uppercase italic mb-6 bg-black text-white inline-block px-3 py-1 self-start transform -skew-x-12">
                               {project.subtitle}
                           </h4>

                           <p className="font-medium text-lg leading-relaxed border-l-4 border-black pl-4 mb-8">
                               {project.description}
                           </p>

                           {/* Tech Stack as jagged bursts */}
                           <div className="flex flex-wrap gap-2 mb-8">
                               {project.technologies.map((tech: string, i: number) => {
                                   const rot = i % 2 === 0 ? 'rotate-2' : '-rotate-2';
                                   return (
                                       <span key={tech} className={`bg-white border-2 border-black px-2 py-1 font-bold text-sm uppercase transform ${rot} shadow-[2px_2px_0_rgba(0,0,0,1)]`}>
                                           {tech}
                                       </span>
                                   );
                               })}
                           </div>

                           {/* Action Buttons */}
                           <div className="flex flex-wrap gap-4 mt-auto">
                               {project.liveUrl && (
                                   <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="bg-[#e62e2d] text-white border-4 border-black px-6 py-3 font-black text-lg uppercase italic shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
                                       <Play className="w-5 h-5" strokeWidth={3} /> Demo!
                                   </a>
                               )}
                               {project.githubUrl && (
                                   <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="bg-[#ffffff] text-black border-4 border-black px-6 py-3 font-black text-lg uppercase italic shadow-[6px_6px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[3px_3px_0_rgba(0,0,0,1)] transition-all flex items-center gap-2">
                                       <Code2 className="w-5 h-5" strokeWidth={3} /> Code!
                                   </a>
                               )}
                           </div>
                       </div>
                   </div>
               );
           })}
       </div>

    </div>
  );
}
