'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import HelmetHUD from './components/HelmetHUD';
import ArcReactor from './components/ArcReactor';
import { Play, Code, ExternalLink, Download, Globe, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function IronmanAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();
  
  const [booting, setBooting] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeProjectIdx, setActiveProjectIdx] = useState<number | null>(null);
  const [showAllCerts, setShowAllCerts] = useState(false);

  const activeProject = activeProjectIdx !== null ? projects[activeProjectIdx] : null;

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Parallax tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (booting) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center font-mono relative overflow-hidden">
        <div className="absolute inset-0 bg-[#330000]/20 mix-blend-screen" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-[#ff0000] animate-[spin_4s_linear_infinite]" />
          <h1 className="text-3xl font-black tracking-[0.5em] text-[#ff0000] animate-pulse">MARK LXXXV HUD</h1>
          <p className="text-[#ffaa00] text-sm tracking-widest uppercase">INITIALIZING TACTICAL OVERLAY...</p>
        </motion.div>
      </div>
    );
  }

  if (!personal) return null;

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative font-sans text-white select-none">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#330000_0%,_#000000_100%)] opacity-60 pointer-events-none" />
      
      {/* 360 HUD Layout with Parallax */}
      <motion.div 
        animate={{ 
          x: mousePos.x * -30, 
          y: mousePos.y * -30 
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
        className="absolute -inset-[40px] z-20 pointer-events-auto p-[60px] grid grid-cols-4 grid-rows-[auto_1fr_auto] gap-8 h-[calc(100vh+80px)]"
      >
        
        {/* TOP VISOR: Comms & Clearance */}
        <div className="col-span-4 flex justify-between items-start h-20 shrink-0">
           {/* Social Frequencies */}
           <div className="flex gap-4">
              {socials?.github && (
                 <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                   <Globe className="w-4 h-4" />
                 </a>
              )}
              {socials?.linkedin && (
                 <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#00f0ff]/50 flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                   <Globe className="w-4 h-4" />
                 </a>
              )}
           </div>

           {/* Central Dossier Extract */}
           {personal.resumeUrl && (
             <div className="flex flex-col items-center">
               <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-[#ff0000]/10 border border-[#ff0000]/50 hover:bg-[#ff0000]/30 transition-colors px-6 py-2 shadow-[0_0_20px_rgba(255,0,0,0.3)] cursor-pointer">
                  <div className="flex flex-col text-right">
                     <span className="text-[8px] text-[#ffaa00] font-mono tracking-[0.2em] uppercase">ENCRYPTED DATA TRANSFER</span>
                     <span className="text-sm font-black text-[#ff0000] tracking-widest uppercase group-hover:text-white transition-colors">EXTRACT DOSSIER</span>
                  </div>
                  <Download className="w-6 h-6 text-[#ff0000] group-hover:text-white" />
               </a>
             </div>
           )}

           {/* Security Clearances (Certifications) */}
           <div className="flex flex-col items-end gap-2">
              <span className="text-[8px] text-[#ff0000] font-mono uppercase tracking-[0.3em]">CLEARANCES</span>
              <div className="flex gap-2">
                {certifications?.slice(0, 2).map((cert, i) => (
                  <div key={i} className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 p-2 flex items-center gap-2">
                     <div className="flex flex-col max-w-[120px]">
                        <span className="text-[10px] font-bold text-white truncate" title={cert.name}>{cert.name}</span>
                        <span className="text-[8px] text-[#00f0ff] font-mono truncate">{cert.issuer}</span>
                     </div>
                     {(cert.url || cert.fileUrl) && <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer"><ExternalLink className="w-3 h-3 text-[#ffaa00] hover:text-white" /></a>}
                  </div>
                ))}
                {certifications && certifications.length > 2 && (
                  <button aria-label="View All" onClick={() => setShowAllCerts(true)} className="border border-[#ffaa00]/30 bg-[#ffaa00]/10 p-2 flex items-center justify-center hover:bg-[#ffaa00]/30 transition-colors">
                     <span className="text-[10px] font-bold text-[#ffaa00] uppercase tracking-widest">+{certifications.length - 2} MORE</span>
                  </button>
                )}
              </div>
           </div>
        </div>

        {/* LEFT VISOR: Biometrics & Power Distribution */}
        <div className="col-span-1 flex flex-col gap-6 h-full min-h-0 overflow-y-auto custom-scrollbar pr-2">
           {/* Biometrics */}
           <div className="border-l-4 border-[#ff0000] pl-4 relative bg-gradient-to-r from-[#ff0000]/10 to-transparent p-4">
              <span className="text-[8px] text-[#00f0ff] font-mono tracking-[0.3em] uppercase block mb-1">TARGET ACQUIRED</span>
              <h1 className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-1">{personal.name}</h1>
              <h2 className="text-sm text-[#ffaa00] uppercase font-bold tracking-widest mb-4">{personal.title}</h2>
              <p className="text-[10px] text-white/70 font-mono text-justify leading-relaxed">{personal.bio}</p>
              
              <div className="mt-4 flex flex-col gap-2 border-t border-[#ff0000]/30 pt-4">
                 <div className="flex items-center gap-2 text-[10px] text-[#00f0ff] font-mono"><Mail className="w-3 h-3"/> {personal.email}</div>
                 <div className="flex items-center gap-2 text-[10px] text-[#00f0ff] font-mono"><Phone className="w-3 h-3"/> {personal.phone}</div>
                 <div className="flex items-center gap-2 text-[10px] text-[#00f0ff] font-mono"><MapPin className="w-3 h-3"/> {personal.location}</div>
              </div>
           </div>

           {/* Skills Arrays */}
           <div>
              <span className="text-[8px] text-[#ff0000] font-mono tracking-[0.3em] uppercase block mb-4 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#ff0000] rounded-full animate-pulse" />
                POWER DISTRIBUTION
              </span>
              
              {/* Fix for items array iteration */}
              <div className="space-y-6">
                 {skills && (skills as any[]).map((skillGroup: any, i: number) => (
                   <div key={i} className="border border-[#00f0ff]/20 bg-black/40 p-4 relative group">
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ffaa00]" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ffaa00]" />
                      
                      <div className="text-[10px] font-bold text-white uppercase tracking-widest mb-3 flex items-center justify-between">
                         {skillGroup.category}
                         <ArcReactor size={20} />
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                         {skillGroup.items?.map((item: string, j: number) => (
                           <span key={j} className="text-[8px] px-2 py-0.5 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] uppercase font-mono">
                             {item}
                           </span>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* CENTRAL HUD: Active Hologram / Target Lock */}
        <div className="col-span-2 relative flex items-center justify-center pointer-events-none">
           <AnimatePresence mode="wait">
             {activeProject ? (
               <motion.div 
                 key="project"
                 initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
                 animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                 exit={{ scale: 1.2, opacity: 0, filter: 'blur(20px)' }}
                 className="relative w-full h-[60%] flex items-center justify-center pointer-events-auto"
               >
                  <div className="absolute inset-0 bg-[#00f0ff]/10 blur-3xl rounded-full" />
                  
                  <div className="w-[80%] h-full border border-[#00f0ff] bg-black/60 p-8 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex flex-col justify-between">
                     <div>
                        <div className="text-[10px] text-[#ff0000] font-mono tracking-widest uppercase mb-2">PROTOTYPE SCHEMATICS</div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-1">{activeProject.title}</h2>
                        <h3 className="text-sm text-[#ffaa00] uppercase font-bold tracking-widest">{activeProject.subtitle}</h3>
                        <p className="mt-4 text-xs font-mono text-[#00f0ff]/80 leading-relaxed text-justify">{activeProject.description}</p>
                     </div>
                     
                     <div className="flex gap-4 mt-6">
                        {activeProject.liveUrl && (
                          <a aria-label="Link" href={activeProject.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#00f0ff] text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-colors">
                            <Play className="w-4 h-4 fill-current" /> PLAY DEMO
                          </a>
                        )}
                        {activeProject.githubUrl && (
                          <a aria-label="Link" href={activeProject.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#ffaa00] text-[#ffaa00] font-black uppercase tracking-widest text-xs hover:bg-[#ffaa00] hover:text-black transition-colors">
                            <Code className="w-4 h-4" /> SOURCE CODE
                          </a>
                        )}
                     </div>
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="idle"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="w-full flex items-center justify-center"
               >
                  <ArcReactor size={350} className="opacity-60" />
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* RIGHT VISOR: Arsenal (Project Selection) */}
        <div className="col-span-1 flex flex-col gap-4 h-full min-h-0 overflow-y-auto custom-scrollbar pl-2">
           <span className="text-[8px] text-[#ff0000] font-mono tracking-[0.3em] uppercase block mb-1 text-right flex items-center justify-end gap-2">
              ARSENAL PROTOCOLS
              <div className="w-1.5 h-1.5 bg-[#ff0000] rounded-full animate-pulse" />
           </span>

           <div className="flex flex-col gap-4">
              {projects.map((proj, idx) => (
                <button aria-label="Interactive Button" key={proj.id}
                  onClick={() => setActiveProjectIdx(idx === activeProjectIdx ? null : idx)}
                  className={`w-full text-right p-4 border transition-all ${idx === activeProjectIdx ? 'border-[#00f0ff] bg-[#00f0ff]/10 scale-105 shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'border-[#ff0000]/30 bg-black/40 hover:border-[#ff0000] hover:bg-[#ff0000]/10'}`}
                >
                  <div className={`text-[8px] font-mono uppercase tracking-widest mb-1 ${idx === activeProjectIdx ? 'text-[#00f0ff]' : 'text-[#ffaa00]'}`}>
                    MARK {idx + 1}
                  </div>
                  <div className="text-sm font-black text-white uppercase tracking-wider truncate">{proj.title}</div>
                  
                  {idx === activeProjectIdx && (
                    <div className="mt-3 flex flex-wrap gap-1 justify-end">
                       {proj.technologies.slice(0, 3).map((tech: string, i: number) => (
                         <span key={i} className="text-[7px] px-1.5 py-0.5 bg-[#ff0000]/20 text-[#ffaa00] font-mono">{tech}</span>
                       ))}
                    </div>
                  )}
                </button>
              ))}
           </div>
        </div>

        {/* BOTTOM VISOR: Flight Path Timeline */}
        <div className="col-span-4 h-24 border-t border-[#ff0000]/30 flex items-center relative overflow-hidden shrink-0">
           <div className="absolute inset-0 bg-gradient-to-r from-black via-[#ff0000]/5 to-black pointer-events-none" />
           
           <div className="w-full flex gap-8 px-12 overflow-x-auto custom-scrollbar items-center pb-2">
              <div className="text-[#00f0ff] font-mono text-[10px] tracking-widest uppercase shrink-0">
                FLIGHT LOG
              </div>

              {/* Interleave Experience and Education chronologically if possible, or just render sequential */}
              {[...experience, ...education].map((item: any, i: number) => {
                 const isEdu = 'degree' in item;
                 return (
                   <div key={i} className="shrink-0 flex flex-col items-center relative group min-w-[200px]">
                      {/* Connection line */}
                      {i > 0 && <div className="absolute top-[28px] left-[-50%] w-full h-[1px] bg-[#ffaa00]/20" />}
                      
                      <div className="text-[8px] text-white/50 font-mono tracking-widest mb-2">{item.period || item.startDate}</div>
                      
                      {/* Node */}
                      <div className={`w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center mb-2 transition-transform group-hover:scale-150 ${isEdu ? 'border-[#00f0ff] bg-black' : 'border-[#ff0000] bg-black'}`}>
                         <div className={`w-1 h-1 rounded-full ${isEdu ? 'bg-[#00f0ff]' : 'bg-[#ff0000]'}`} />
                      </div>
                      
                      <div className="text-center">
                         <div className="text-[10px] font-bold text-white uppercase truncate max-w-[180px]">{isEdu ? item.degree : item.role}</div>
                         <div className={`text-[8px] font-mono uppercase truncate max-w-[180px] mt-1 ${isEdu ? 'text-[#00f0ff]' : 'text-[#ffaa00]'}`}>{isEdu ? item.school : item.company}</div>
                      </div>
                   </div>
                 );
              })}
           </div>
        </div>

      </motion.div>

      {/* ALL CLEARANCES MODAL */}
      <AnimatePresence>
        {showAllCerts && (
           <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center backdrop-blur-sm p-20 pointer-events-auto"
           >
              <div className="border border-[#00f0ff] bg-black/80 p-8 w-full max-w-4xl shadow-[0_0_50px_rgba(0,240,255,0.2)] max-h-[80vh] overflow-y-auto custom-scrollbar">
                 <div className="flex justify-between items-center mb-8 border-b border-[#00f0ff]/30 pb-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">ALL CLEARANCES</h2>
                    <button onClick={() => setShowAllCerts(false)} className="text-[#ff0000] hover:text-white font-mono text-sm">[ CLOSE ]</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certifications?.map((cert, i) => (
                       <div key={i} className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 p-4 flex flex-col gap-2">
                          <span className="text-sm font-bold text-white" title={cert.name}>{cert.name}</span>
                          <span className="text-xs text-[#00f0ff] font-mono">{cert.issuer}</span>
                          <span className="text-[10px] text-white/50 font-mono">{cert.date}</span>
                          <div className="mt-2 flex gap-2">
                            {(cert.url || cert.fileUrl) && (
                               <a href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="text-[10px] bg-[#00f0ff]/20 text-[#00f0ff] px-2 py-1 hover:bg-[#00f0ff] hover:text-black transition-colors font-mono uppercase tracking-widest flex items-center gap-1">
                                 <ExternalLink className="w-3 h-3" /> VERIFY
                               </a>
                            )}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </motion.div>
        )}
      </AnimatePresence>

      <HelmetHUD mouseX={mousePos.x} mouseY={mousePos.y} />
    </div>
  );
}
