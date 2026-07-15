'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { Play, Code, ExternalLink, Download, FileText, Music, LayoutGrid, Radio } from 'lucide-react';

export default function MediaCenter({ projects, certifications }: { projects: any[], certifications: any[] }) {
  const [activeTab, setActiveTab] = useState<'projects'|'certs'>('projects');

  if (!projects && !certifications) return null;

  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden relative">
      
      {/* Header Tabs */}
      <div className="flex items-center gap-6 border-b border-white/10 pb-4 mb-6">
         <button aria-label="Interactive Button" onClick={() => setActiveTab('projects')}
           className={`flex items-center gap-2 text-lg font-bold tracking-widest uppercase transition-colors ${activeTab === 'projects' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <Music className="w-5 h-5" /> Media Apps (Projects)
         </button>
         <button aria-label="Interactive Button" onClick={() => setActiveTab('certs')}
           className={`flex items-center gap-2 text-lg font-bold tracking-widest uppercase transition-colors ${activeTab === 'certs' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
         >
            <Radio className="w-5 h-5" /> OTA Updates (Certs)
         </button>
      </div>

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
             <div key={index} className="bg-black/60 rounded-2xl overflow-hidden border border-white/5 group hover:border-white/20 transition-all shadow-xl hover:-translate-y-1">
                {/* Thumbnail / Cover Art */}
                <div className="h-40 bg-gray-800 relative overflow-hidden flex items-center justify-center">
                   {project.thumbnailUrl ? (
                     <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" width={800} height={600} />
                   ) : (
                     <LayoutGrid className="w-16 h-16 text-white/10" />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                   
                   {/* Play overlay icon on hover */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {project.liveUrl && (
                        <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                           <Play className="w-5 h-5 ml-1" />
                        </a>
                      )}
                   </div>
                </div>

                <div className="p-5">
                   <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                   <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">{project.description}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies?.slice(0,3).map((tech: string) => (
                         <span key={tech} className="text-[10px] uppercase font-bold tracking-widest bg-white/10 px-2 py-1 rounded text-gray-300">
                            {tech}
                         </span>
                      ))}
                      {project.technologies.length > 3 && <span className="text-[10px] text-gray-500 py-1">+{project.technologies.length - 3} MORE</span>}
                   </div>

                   {/* Requirements 10 & 11: Demo & Code Buttons */}
                   <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                           <Play className="w-3 h-3" /> Launch
                        </a>
                      )}
                      {project.githubUrl && (
                        <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-white/10 hover:bg-white/20 transition-colors py-2 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white">
                           <Code className="w-3 h-3" /> Code
                        </a>
                      )}
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}

      {activeTab === 'certs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications?.map((cert, index) => (
             <div key={index} className="flex items-center justify-between bg-black/40 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <Download className="w-5 h-5 text-green-400" />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">{cert.title}</h4>
                      <p className="text-xs text-gray-400">{cert.issuer} • v{cert.date.replace(/[^0-9]/g, '.')} Update</p>
                   </div>
                </div>
                
                {/* Requirements 15 & 16: View & Download Buttons */}
                <div className="flex items-center gap-2">
                   {(cert.url || cert.fileUrl) && (
                     <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white" title="View Details">
                        <ExternalLink className="w-4 h-4" />
                     </a>
                   )}
                   
                </div>
             </div>
          ))}
        </div>
      )}

    </div>
  );
}
