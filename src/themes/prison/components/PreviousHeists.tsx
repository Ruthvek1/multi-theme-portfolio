import React from 'react';
import Image from 'next/image';
import { FolderOpen, ExternalLink, Code2 } from 'lucide-react';

export default function PreviousHeists({ projects }: { projects: any[] }) {
  return (
    <div className="max-w-5xl mx-auto mb-16">
       
       <div className="flex items-center gap-4 mb-8">
          <FolderOpen className="w-8 h-8 text-white" />
          <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
             Previous Heists (Projects)
          </h2>
          <div className="h-1 flex-1 border-t-2 border-dashed border-white/40"></div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
             <div key={i} className="bg-[#dfd5c0] border-4 border-gray-800 p-2 shadow-2xl relative group transform transition-transform hover:-translate-y-2">
                {/* Paperclip effect */}
                <div className="absolute -top-4 left-8 w-4 h-12 border-2 border-gray-400 rounded-full bg-transparent z-20 shadow-sm rotate-12"></div>
                
                <div className="border border-dashed border-gray-600 p-4 h-full flex flex-col">
                   <div className="flex justify-between items-start mb-4 border-b-2 border-gray-800 pb-2">
                      <div>
                         <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">{project.title}</h3>
                         <div className="text-red-700 font-bold uppercase tracking-widest text-xs">Operation: {project.year}</div>
                      </div>
                      <div className="bg-gray-800 text-white font-bold px-2 py-1 uppercase text-[10px] tracking-widest">
                         Classified
                      </div>
                   </div>
                   
                   <div className="w-full h-48 bg-gray-900 mb-4 overflow-hidden border-2 border-gray-800 relative">
                      {project.thumbnailUrl ? (
                         <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-500" width={800} height={600} />
                      ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-500 font-mono text-xs">NO SURVEILLANCE FOOTAGE</div>
                      )}
                      
                      {/* Scanline overlay */}
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.2)_3px,rgba(0,0,0,0.2)_3px)] pointer-events-none mix-blend-overlay"></div>
                   </div>
                   
                   <p className="text-sm font-mono text-gray-800 leading-relaxed mb-4 flex-1">
                      {project.description}
                   </p>
                   
                   <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech: string, j: number) => (
                         <span key={j} className="text-[10px] font-bold uppercase tracking-widest text-gray-600 bg-gray-200 px-2 py-1 border border-gray-400">
                            {tech}
                         </span>
                      ))}
                   </div>
                   
                   {/* Explicit Interactive Links */}
                   <div className="flex gap-2 mt-auto border-t-2 border-gray-800 pt-4">
                      {project.liveUrl && (
                         <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-red-800 text-white font-bold text-xs uppercase tracking-widest py-2 px-2 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            <ExternalLink className="w-4 h-4" /> Live Demo
                         </a>
                      )}
                      {project.githubUrl && (
                         <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-gray-800 text-white font-bold text-xs uppercase tracking-widest py-2 px-2 flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors border-2 border-black shadow-[2px_2px_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            <Code2 className="w-4 h-4" /> Source
                         </a>
                      )}
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
