'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import WarpDrive from './components/WarpDrive';
import HoloPanel from './components/HoloPanel';
import { User, Layers, Rocket, Target, Shield, Download, ExternalLink, Play, Code, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CockpitAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();
  const [isWarping, setIsWarping] = useState(false);

  const [showAllCerts, setShowAllCerts] = useState(false);

  if (!personal) return null;

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden relative selection:bg-[#00e5ff] selection:text-black">
      
      {/* Background & Warp Lever */}
      <WarpDrive onWarpEngaged={() => setIsWarping(true)} />

      {/* The 3D Cockpit UI */}
      <AnimatePresence>
        {isWarping && (
          <div 
            className="relative z-20 flex flex-col p-6 lg:p-12 pointer-events-none min-h-screen"
            style={{ perspective: '1500px' }}
          >
             {/* HUD Top Console (Comms & Datapad) */}
             <motion.header 
               initial={{ y: -100, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="flex justify-between items-start shrink-0 mb-8 pointer-events-auto"
             >
                <div className="flex flex-col gap-1">
                   <div className="text-[#00e5ff] text-xs font-mono tracking-[0.5em] uppercase border-b border-[#00e5ff]/30 pb-1">
                     HAILING FREQUENCIES OPEN <span className="text-[9px] text-[#00e5ff]/60 tracking-widest ml-2">(CONTACT)</span>
                   </div>
                   <div className="flex gap-4 mt-2">
                     {socials?.github && <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="text-white hover:text-[#00e5ff] transition-colors"><Radio className="w-5 h-5" /></a>}
                     {socials?.linkedin && <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-[#00e5ff] transition-colors"><Radio className="w-5 h-5" /></a>}
                   </div>
                </div>

                {personal.resumeUrl && (
                  <div className="flex flex-col items-center">
                    <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="group flex items-center gap-3 bg-[#0a0a0a]/80 border border-[#ff6d00] px-6 py-3 rounded-full hover:bg-[#ff6d00] transition-colors shadow-[0_0_20px_rgba(255,109,0,0.3)]">
                       <Download className="w-5 h-5 text-[#ff6d00] group-hover:text-white" />
                       <span className="text-[#ff6d00] group-hover:text-white font-mono text-sm tracking-widest font-bold">DOWNLOAD DATAPAD</span>
                    </a>
                    <div className="text-[10px] text-[#ff6d00] tracking-widest uppercase mt-2">(CV / RESUME)</div>
                  </div>
                )}
             </motion.header>

             {/* Main 3D Panel Grid */}
             <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 pointer-events-auto">
                
                {/* LEFT PANEL */}
                <HoloPanel title="CAPTAIN'S LOG & CAPABILITIES" side="left" delay={0.6} icon={<User className="w-4 h-4" />}>
                   <div className="flex flex-col gap-6 font-mono">
                      <div>
                        <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-1">{personal.name}</h3>
                        <div className="text-xs text-[#00e5ff] uppercase tracking-widest border-b border-[#00e5ff]/20 pb-2 mb-3">{personal.title}</div>
                        <p className="text-xs text-white/70 leading-relaxed text-justify mb-4">{personal.bio}</p>
                        
                        {/* Contact Info (Requirement #8) */}
                        <div className="bg-[#00e5ff]/5 border border-[#00e5ff]/20 p-3 rounded-lg flex flex-col gap-2 text-[10px] uppercase tracking-widest text-white/80">
                           <div className="flex justify-between border-b border-[#00e5ff]/10 pb-1"><span>LOC</span> <span className="text-[#00e5ff] text-right">{personal.location}</span></div>
                           <div className="flex justify-between border-b border-[#00e5ff]/10 pb-1"><span>EMAIL</span> <span className="text-[#00e5ff] text-right">{personal.email}</span></div>
                           <div className="flex justify-between"><span>COMMS (PHONE)</span> <span className="text-[#00e5ff] text-right">{personal.phone}</span></div>
                        </div>
                      </div>

                      <div className="mt-4">
                         <div className="text-xs font-bold text-[#ff6d00] tracking-widest uppercase mb-3 flex items-center gap-2">
                            <Layers className="w-3 h-3" /> SHIP CAPABILITIES (SKILLS)
                         </div>
                         <div className="space-y-4">
                           {(skills as any[])?.map((group: any, i: number) => (
                             <div key={i} className="bg-black/50 border border-[#00e5ff]/20 p-3 rounded-lg">
                                <div className="text-[10px] text-[#00e5ff] tracking-widest uppercase mb-2">{group.category}</div>
                                <div className="flex flex-wrap gap-2">
                                  {group.items?.map((item: string, j: number) => (
                                    <span key={j} className="text-[9px] px-2 py-1 bg-[#00e5ff]/10 text-white rounded shadow-[inset_0_0_10px_rgba(0,229,255,0.2)]">
                                      {item}
                                    </span>
                                  ))}
                                </div>
                             </div>
                           ))}
                         </div>
                      </div>
                   </div>
                </HoloPanel>

                {/* CENTER PANEL */}
                <HoloPanel title="SCANNED STAR SYSTEMS" side="center" delay={0.8} icon={<Target className="w-4 h-4" />}>
                   <div className="flex flex-col gap-4 font-mono h-full">
                      {projects.map((proj) => (
                        <div key={proj.id} className="relative bg-black/60 border border-[#00e5ff]/40 p-4 rounded-xl overflow-hidden group hover:border-[#ff6d00] transition-colors">
                           {/* Decorative Tech bg */}
                           <div className="absolute right-0 top-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,_rgba(0,229,255,0.2),_transparent)] pointer-events-none" />
                           
                           <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-1 relative z-10">{proj.title}</h4>
                           <div className="text-[10px] text-[#00e5ff] tracking-widest mb-3 relative z-10">{proj.subtitle}</div>
                           <p className="text-xs text-white/60 mb-4 line-clamp-2 relative z-10">{proj.description}</p>
                           
                           <div className="flex gap-3 relative z-10">
                              {proj.liveUrl && (
                                <a aria-label="Link" href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#ff6d00]/20 border border-[#ff6d00] text-[#ff6d00] hover:bg-[#ff6d00] hover:text-white transition-colors text-[10px] tracking-widest font-bold rounded">
                                  <Play className="w-3 h-3 fill-current" /> ENGAGE DEMO
                                </a>
                              )}
                              {proj.githubUrl && (
                                <a aria-label="Link" href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#00e5ff]/10 border border-[#00e5ff]/50 text-[#00e5ff] hover:bg-[#00e5ff] hover:text-black transition-colors text-[10px] tracking-widest font-bold rounded">
                                  <Code className="w-3 h-3" /> SCAN BLUEPRINTS
                                </a>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </HoloPanel>

                {/* RIGHT PANEL */}
                <HoloPanel title="FLIGHT HISTORY & CREDENTIALS" side="right" delay={1.0} icon={<Rocket className="w-4 h-4" />}>
                   <div className="flex flex-col gap-8 font-mono">
                      
                      {/* Timeline */}
                      <div>
                         <div className="text-xs font-bold text-[#ff6d00] tracking-widest uppercase mb-4 border-b border-[#ff6d00]/30 pb-2">MISSION LOGS (EXPERIENCE)</div>
                         <div className="relative border-l-2 border-[#00e5ff]/30 ml-2 pl-4 space-y-6">
                           {experience.map((exp: any, i: number) => (
                             <div key={i} className="relative">
                               <div className="absolute top-1.5 -left-[21px] w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
                               <div className="text-[10px] text-[#00e5ff] tracking-widest">{exp.startDate} - {exp.endDate}</div>
                               <div className="text-sm font-bold text-white mt-1 uppercase">{exp.role}</div>
                               <div className="text-[10px] text-white/50 tracking-wider mb-2">{exp.company}</div>
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* Education (Requirement #6) */}
                      <div>
                         <div className="text-xs font-bold text-[#ff6d00] tracking-widest uppercase mb-4 border-b border-[#ff6d00]/30 pb-2">ACADEMY TRAINING (EDUCATION)</div>
                         <div className="relative border-l-2 border-[#00e5ff]/30 ml-2 pl-4 space-y-6">
                           {education.map((edu: any, i: number) => (
                             <div key={i} className="relative">
                               <div className="absolute top-1.5 -left-[21px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                               <div className="text-[10px] text-white/70 tracking-widest">{edu.startDate} - {edu.endDate}</div>
                               <div className="text-sm font-bold text-white mt-1 uppercase">{edu.degree}</div>
                               <div className="text-[10px] text-[#00e5ff] tracking-wider mb-2">{edu.school}</div>
                             </div>
                           ))}
                         </div>
                      </div>

                      {/* Credentials */}
                       <div>
                         <div className="text-xs font-bold text-[#ff6d00] tracking-widest uppercase mb-4 border-b border-[#ff6d00]/30 pb-2 flex items-center gap-2">
                           <Shield className="w-4 h-4" /> GALACTIC CREDENTIALS
                         </div>
                         <div className="space-y-3">
                           {(showAllCerts ? certifications : certifications?.slice(0, 6))?.map((cert, i) => (
                             <div key={i} className="bg-black/40 border border-white/10 p-3 rounded flex flex-col gap-2">
                                <div>
                                  <div className="text-xs font-bold text-white uppercase">{cert.name}</div>
                                  <div className="text-[9px] text-[#00e5ff] tracking-widest">{cert.issuer}</div>
                                </div>
                                <div className="flex gap-2">
                                  {(cert.url || cert.fileUrl) && (
                                    <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-white hover:text-[#00e5ff] transition-colors border border-white/20 px-2 py-1 rounded">
                                      <ExternalLink className="w-3 h-3" /> VIEW
                                    </a>
                                  )}
                                  
                                </div>
                             </div>
                           ))}
                           {certifications && certifications.length > 6 && (
                             <button
                               onClick={() => setShowAllCerts(!showAllCerts)}
                               className="w-full mt-2 py-2 rounded bg-black/40 hover:bg-[#00e5ff]/10 border border-white/10 text-white font-bold text-[10px] tracking-widest uppercase transition-colors"
                             >
                               {showAllCerts ? 'SHOW LESS' : `VIEW ${certifications.length - 6} MORE`}
                             </button>
                           )}
                         </div>
                      </div>

                   </div>
                </HoloPanel>

             </main>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
