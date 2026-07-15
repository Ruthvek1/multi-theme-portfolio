import React from 'react';
import Image from 'next/image';
import { ExternalLink, Code2, Camera } from 'lucide-react';

export default function GrandGallery({ projects }: { projects: any[] }) {
  return (
    <div className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-20 border-t border-[#d4af37]/20">
       
       <div className="text-center mb-24">
          <h2 className="font-serif text-4xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             The Grand Gallery
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50"></div>
       </div>

       <div className="flex flex-col gap-32">
          {projects.map((project, i) => (
             <div key={i} className="flex flex-col items-center group relative">
                
                {/* Ceiling Spotlight */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-[800px] bg-yellow-500/10 blur-3xl rounded-[100%] pointer-events-none transform -rotate-12 mix-blend-screen opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>

                {/* The Painting (Project Thumbnail) */}
                <div className="relative p-8 bg-[#b8953f] bg-gradient-to-br from-[#d4af37] via-[#aa771c] to-[#d4af37] shadow-[0_30px_60px_rgba(0,0,0,0.8)] before:absolute before:inset-3 before:border-[6px] before:border-[#523812] before:shadow-inner before:z-10 w-full max-w-4xl mx-auto transition-transform duration-1000 group-hover:scale-105 group-hover:-translate-y-4">
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-multiply opacity-50 pointer-events-none"></div>
                   
                   <div className="relative z-0 overflow-hidden bg-[#1a1614] border-2 border-black/80 aspect-video flex items-center justify-center group/canvas">
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/canvas.png')] opacity-30 mix-blend-overlay pointer-events-none z-10"></div>
                      
                      {project.thumbnailUrl ? (
                         <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover grayscale sepia-[0.3] contrast-125 brightness-90 group-hover/canvas:grayscale-0 group-hover/canvas:sepia-0 group-hover/canvas:brightness-100 transition-all duration-1000" width={800} height={600} />
                      ) : (
                         <div className="flex flex-col items-center text-[#523812] opacity-50">
                            <Camera className="w-16 h-16 mb-4" />
                            <span className="font-serif tracking-widest uppercase">Painting Missing</span>
                         </div>
                      )}
                   </div>
                </div>

                {/* Brass Plaque */}
                <div className="mt-12 bg-gradient-to-b from-[#d4af37] to-[#aa771c] p-1.5 shadow-xl w-[90%] max-w-2xl relative z-10 mx-auto">
                   <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
                   <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
                   <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
                   <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#4a3f24] shadow-[0_1px_1px_rgba(255,255,255,0.5)]"></div>
                   
                   <div className="bg-[#1a1614] border border-[#d4af37]/30 p-6 md:p-8 text-center flex flex-col items-center">
                      <h3 className="font-serif text-[#d4af37] text-2xl md:text-3xl font-bold tracking-widest uppercase mb-4 drop-shadow-md">
                         {project.title}
                      </h3>
                      <p className="font-serif text-[#a8997a] italic text-sm mb-6 max-w-lg leading-relaxed">
                         {project.description}
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                         {project.technologies.map((tech: string, j: number) => (
                            <span key={j} className="font-serif text-[#2a2313] bg-[#d4af37] px-2 py-0.5 text-xs font-bold uppercase tracking-wider">
                               {tech}
                            </span>
                         ))}
                      </div>

                      {/* Interactive Stanchion Buttons */}
                      <div className="flex flex-wrap justify-center gap-4 w-full border-t border-[#3a301a] pt-6 relative">
                         {project.liveUrl && (
                            <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#d4af37] text-[#d4af37] text-sm uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-[#111] transition-all">
                               <ExternalLink className="w-4 h-4" /> Exhibit Guide
                            </a>
                         )}
                         {project.githubUrl && (
                            <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 border-2 border-[#d4af37] text-[#d4af37] text-sm uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-[#111] transition-all">
                               <Code2 className="w-4 h-4" /> Restoration Logs
                            </a>
                         )}
                      </div>
                   </div>
                </div>

             </div>
          ))}
       </div>

    </div>
  );
}
