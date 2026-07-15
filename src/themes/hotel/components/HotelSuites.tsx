import React from 'react';
import Image from 'next/image';
import { ExternalLink, Code2, Play } from 'lucide-react';

export default function HotelSuites({ projects }: { projects: any[] }) {
  return (
    <div className="py-32 relative z-20 w-full bg-[#0f172a]">
       
       <div className="text-center mb-24 px-4">
           <h2 className="font-serif text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Unparalleled Luxury</h2>
           <h3 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
               Signature Suites
           </h3>
           <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
       </div>

       <div className="space-y-32">
           {projects.map((project, idx) => {
               const isEven = idx % 2 === 0;
               return (
                   <div key={project.id} className="w-full flex flex-col md:flex-row min-h-[600px] overflow-hidden group">
                       
                       {/* Image Panel */}
                       <div className={`w-full md:w-3/5 relative overflow-hidden ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
                           <Image src={project.thumbnailUrl} 
                               alt={project.title}
                               className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[2000ms] ease-out" width={800} height={600} />
                       </div>

                       {/* Content Panel */}
                       <div className={`w-full md:w-2/5 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-[#0a0f1c] ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                           
                           <span className="font-serif text-[#d4af37] tracking-[0.2em] text-xs uppercase mb-4 block">
                               Suite {idx + 1} • {project.year}
                           </span>

                           <h3 className="font-serif text-3xl md:text-4xl text-white tracking-wide mb-6">
                               {project.title}
                           </h3>
                           
                           <h4 className="text-gray-400 uppercase tracking-widest text-xs mb-8">
                               {project.subtitle}
                           </h4>

                           <p className="text-gray-300 font-light leading-relaxed mb-12">
                               {project.description}
                           </p>

                           <div className="mb-12">
                               <h5 className="font-serif text-white text-sm tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
                                   Suite Features
                               </h5>
                               <div className="flex flex-wrap gap-2">
                                   {project.technologies.map((tech: string) => (
                                       <span key={tech} className="text-gray-400 text-xs tracking-wider uppercase bg-white/5 px-3 py-1">
                                           {tech}
                                       </span>
                                   ))}
                               </div>
                           </div>

                           <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                               {project.liveUrl && (
                                   <a aria-label="Link" href={project.liveUrl} 
                                       target="_blank" 
                                       rel="noreferrer" 
                                       className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#d4af37] text-[#0f172a] px-8 py-4 font-serif uppercase tracking-widest text-xs hover:bg-[#b8953f] transition-colors"
                                   >
                                       <Play className="w-4 h-4" /> Book Suite
                                   </a>
                               )}
                               {project.githubUrl && (
                                   <a aria-label="Link" href={project.githubUrl} 
                                       target="_blank" 
                                       rel="noreferrer" 
                                       className="w-full sm:w-auto flex items-center justify-center gap-2 border border-[#d4af37] text-[#d4af37] px-8 py-4 font-serif uppercase tracking-widest text-xs hover:bg-[#d4af37] hover:text-[#0f172a] transition-colors"
                                   >
                                       <Code2 className="w-4 h-4" /> Floorplan
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
