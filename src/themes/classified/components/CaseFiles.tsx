import React from 'react';
import { Folder, ExternalLink, Code } from 'lucide-react';

export default function CaseFiles({ projects }: { projects: any[] }) {
  return (
    <div className="bg-[#111] border border-[#33ff33]/30 p-6 shadow-lg shadow-black">
       <div className="flex items-center gap-3 mb-6 border-b border-[#33ff33]/20 pb-4">
          <Folder className="w-6 h-6 text-[#33ff33]" />
          <h2 className="text-xl font-black tracking-widest">CLASSIFIED CASE FILES</h2>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => (
             <div key={i} className="bg-[#050505] border border-[#33ff33]/20 p-5 hover:border-[#33ff33]/70 transition-colors group relative overflow-hidden">
                
                {/* File tab styling */}
                <div className="absolute top-0 right-0 bg-[#33ff33]/20 text-[#33ff33] text-[9px] px-2 py-0.5 font-bold tracking-widest border-b border-l border-[#33ff33]/20">
                   CASE #{1000 + i}
                </div>

                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                   <h3 className="text-lg font-bold text-white uppercase">{project.title}</h3>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">
                   {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                   {project.technologies?.map((tech: string, j: number) => (
                      <span key={j} className="text-[10px] bg-[#1a1a1a] text-[#33ff33]/70 border border-[#33ff33]/30 px-1.5 py-0.5 tracking-wider">
                         [{tech}]
                      </span>
                   ))}
                </div>

                <div className="flex gap-3">
                   {project.liveUrl && (
                      <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs font-bold tracking-widest py-2 border border-[#33ff33] text-[#33ff33] hover:bg-[#33ff33] hover:text-black transition-colors flex items-center justify-center gap-2">
                         <ExternalLink className="w-3 h-3" /> INITIATE PROTOCOL
                      </a>
                   )}
                   {project.githubUrl && (
                      <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs font-bold tracking-widest py-2 border border-gray-600 text-gray-400 hover:border-white hover:text-white transition-colors flex items-center justify-center gap-2">
                         <Code className="w-3 h-3" /> DECRYPT SOURCE
                      </a>
                   )}
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}
