import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePortfolio } from '@/core/PortfolioContext';
import { useJarvis } from '../Adapter';

export default function PrototypesView() {
  const { projects } = usePortfolio();
  const { setActiveView } = useJarvis();
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full p-12 flex flex-col pointer-events-auto z-30"
    >
      {/* Header */}
      <div className="flex justify-between items-end border-b border-[#00f0ff]/30 pb-4 mb-8">
         <div>
            <div className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase mb-1">ARCHIVE DATABASE</div>
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">PROTOTYPES & MISSIONS</h1>
         </div>
         <button aria-label="Interactive Button" onClick={() => setActiveView('dashboard')} className="text-[#00f0ff] text-sm tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO MAIN
         </button>
      </div>

      <div className="flex-1 flex gap-8 h-[calc(100%-100px)]">
        
        {/* Left: Project List */}
        <div className="w-1/3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-4">
          {projects.map((project: any, index: number) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-4 border transition-all relative overflow-hidden group
                ${selectedProject?.id === project.id ? 'border-[#ffaa00] bg-[#ffaa00]/10' : 'border-[#00f0ff]/30 bg-black/40 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10'}`}
            >
              {/* Scanline hover effect */}
              <div className="absolute inset-0 bg-[#00f0ff]/20 -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-linear" />
              
              <div className="relative z-10 flex justify-between items-start">
                 <div>
                    <div className={`text-[10px] tracking-widest uppercase mb-1 ${selectedProject?.id === project.id ? 'text-[#ffaa00]' : 'text-[#00f0ff]'}`}>
                      MK-{index + 1} // {project.category}
                    </div>
                    <div className="text-lg font-bold text-white uppercase truncate max-w-[200px]">{project.title}</div>
                 </div>
                 {project.featured && (
                   <div className="w-2 h-2 bg-[#ffaa00] rounded-full animate-pulse" />
                 )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Right: Project Details (HUD Display) */}
        <div className="flex-1 border border-[#00f0ff]/30 bg-black/40 p-8 relative overflow-hidden flex items-center justify-center">
           {/* Corner Accents */}
           <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#00f0ff]" />
           <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#00f0ff]" />
           <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#00f0ff]" />
           <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#00f0ff]" />

           <AnimatePresence mode="wait">
             {selectedProject ? (
               <motion.div 
                 key={selectedProject.id}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.05 }}
                 transition={{ duration: 0.3 }}
                 className="w-full h-full flex flex-col"
               >
                  {/* Schematic / Image */}
                  <div className="w-full h-[40%] relative mb-6 border border-[#00f0ff]/20 overflow-hidden bg-[#00f0ff]/5 group">
                     <div className="absolute inset-0 bg-[#00f0ff]/20 mix-blend-overlay z-10 pointer-events-none" />
                     {/* Fake scanline */}
                     <div className="absolute left-0 top-0 w-full h-[2px] bg-[#00f0ff] z-20 animate-[scan_3s_ease-in-out_infinite]" />
                     
                     <Image src={selectedProject.thumbnailUrl} 
                       alt={selectedProject.title} 
                       className="w-full h-full object-cover filter grayscale sepia-[0.5] hue-rotate-[180deg] saturate-[2] group-hover:filter-none transition-all duration-700" width={800} height={600} />
                  </div>

                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h2 className="text-3xl font-black text-white uppercase">{selectedProject.title}</h2>
                      <div className="text-[#ffaa00] tracking-widest text-sm uppercase">{selectedProject.category} // {selectedProject.year}</div>
                    </div>
                    <div className="flex gap-2">
                       {selectedProject.liveUrl && (
                         <a aria-label="Link" href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2 bg-[#00f0ff] text-black hover:bg-white hover:text-black uppercase text-xs font-black tracking-widest transition-colors shadow-[0_0_15px_#00f0ff]">
                           <Play className="w-4 h-4 fill-current" /> PLAY DEMO
                         </a>
                       )}
                       {selectedProject.githubUrl && (
                         <a aria-label="Link" href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-[#ffaa00] text-[#ffaa00] hover:bg-[#ffaa00] hover:text-black uppercase text-xs font-bold tracking-widest transition-colors">
                           SOURCE CODE
                         </a>
                       )}
                    </div>
                  </div>

                  <div className="text-[#00f0ff]/80 text-sm leading-relaxed mb-6 flex-1 overflow-y-auto custom-scrollbar">
                     {selectedProject.description}
                  </div>

                  {/* Tech Stack Hexagons */}
                  <div>
                    <div className="text-[10px] text-[#00f0ff]/50 tracking-widest uppercase mb-2">SYSTEM COMPONENTS</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string, i: number) => (
                        <span key={i} className="px-3 py-1 border border-[#00f0ff]/30 text-[#00f0ff] text-xs uppercase bg-[#00f0ff]/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

               </motion.div>
             ) : (
               <div className="text-[#00f0ff]/50 tracking-widest uppercase animate-pulse flex flex-col items-center gap-4">
                 <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 AWAITING PROTOTYPE SELECTION...
               </div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
