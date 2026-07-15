'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import TelemetryOverlay from './components/TelemetryOverlay';
import LaunchSequence from './components/LaunchSequence';
import { ExternalLink, Download, Play, Code, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function NasaAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();
  const [showAllCerts, setShowAllCerts] = useState(false);

  if (!personal) return null;

  return (
    <div className="w-full h-screen bg-[#050B14] text-[#86C2D6] font-mono overflow-hidden relative selection:bg-[#1A5F7A] selection:text-white flex flex-col p-4 md:p-8 gap-6">
      
      <TelemetryOverlay />

      {/* HEADER: Comms Relay & Top Level Data */}
      <header className="relative z-10 flex flex-wrap justify-between items-start gap-4 border-b border-[#1A5F7A] pb-4 shrink-0">
         <div>
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">MISSION CONTROL</h1>
            <div className="text-[10px] uppercase tracking-[0.3em] text-[#00f0ff] animate-pulse mt-1">STATUS: NOMINAL // SECURE UPLINK ESTABLISHED</div>
         </div>

         <div className="flex gap-8">
            {/* Comms Relay */}
            <div className="flex flex-col text-[10px] tracking-widest text-[#86C2D6]/80 text-right">
               <div className="text-white font-bold mb-1 border-b border-[#1A5F7A] pb-1">COMMS RELAY</div>
               <div className="flex items-center justify-end gap-2 mt-1"><Mail className="w-3 h-3 text-[#1A5F7A]" /> {personal.email}</div>
               <div className="flex items-center justify-end gap-2"><Phone className="w-3 h-3 text-[#1A5F7A]" /> {personal.phone}</div>
               <div className="flex items-center justify-end gap-2"><MapPin className="w-3 h-3 text-[#1A5F7A]" /> {personal.location}</div>
               <div className="flex justify-end gap-2 mt-2">
                 {socials?.github && <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>}
                 {socials?.linkedin && <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>}
                 {socials?.instagram && <a aria-label="Link" href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>}
               </div>
            </div>

            {/* Dossier Download */}
            {personal.resumeUrl && (
              <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="group border border-[#00f0ff] bg-[#00f0ff]/10 hover:bg-[#00f0ff] p-4 flex items-center gap-4 transition-colors">
                 <Download className="w-6 h-6 text-[#00f0ff] group-hover:text-black" />
                 <div className="flex flex-col text-right">
                   <span className="text-[8px] tracking-widest text-white">DOWNLOAD MANIFEST</span>
                   <span className="font-bold text-[#00f0ff] group-hover:text-black tracking-widest">CV.PDF</span>
                 </div>
              </a>
            )}
         </div>
      </header>

      {/* MAIN DASHBOARD GRID */}
      <main className="relative z-10 flex-1 grid grid-cols-12 gap-6 min-h-0">
         
         {/* LEFT COLUMN: Commander & Mission Logs */}
         <div className="col-span-3 flex flex-col gap-6 h-full min-h-0">
            {/* Commander Dossier */}
            <section className="bg-[#0A192F] border border-[#1A5F7A] p-4 shrink-0 shadow-[inset_0_0_20px_rgba(26,95,122,0.2)]">
               <div className="text-[10px] text-white bg-[#1A5F7A] inline-block px-2 py-0.5 mb-4 tracking-widest uppercase font-bold">COMMANDER DOSSIER</div>
               <h2 className="text-2xl font-bold text-white uppercase tracking-wider leading-none mb-1">{personal.name}</h2>
               <h3 className="text-xs text-[#00f0ff] uppercase tracking-widest mb-4">{personal.title}</h3>
               <p className="text-[10px] leading-relaxed text-justify text-[#86C2D6]/80">{personal.bio}</p>
            </section>

            {/* Mission Logs (Experience/Education) */}
            <section className="flex-1 bg-[#0A192F] border border-[#1A5F7A] p-4 flex flex-col min-h-0 shadow-[inset_0_0_20px_rgba(26,95,122,0.2)]">
               <div className="text-[10px] text-white bg-[#1A5F7A] inline-block px-2 py-0.5 mb-4 tracking-widest uppercase font-bold self-start">MISSION LOGS</div>
               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-6">
                  <div>
                    <div className="text-[9px] text-[#00f0ff] border-b border-[#00f0ff]/30 mb-3 tracking-widest">FLIGHT HISTORY</div>
                    <div className="space-y-4 relative border-l border-[#1A5F7A] ml-1 pl-4">
                      {experience.map((exp: any, i: number) => (
                        <div key={i} className="relative">
                           <div className="absolute top-1.5 -left-[21px] w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_5px_#00f0ff]" />
                           <div className="text-[8px] tracking-widest">{exp.startDate} - {exp.endDate}</div>
                           <div className="text-xs font-bold text-white uppercase">{exp.role}</div>
                           <div className="text-[9px] text-[#86C2D6]/70 uppercase">{exp.company}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[9px] text-[#00f0ff] border-b border-[#00f0ff]/30 mb-3 tracking-widest mt-6">TRAINING SIMULATIONS</div>
                    <div className="space-y-4 relative border-l border-[#1A5F7A] ml-1 pl-4">
                      {education.map((edu: any, i: number) => (
                        <div key={i} className="relative">
                           <div className="absolute top-1.5 -left-[21px] w-2 h-2 rounded-full bg-white shadow-[0_0_5px_white]" />
                           <div className="text-[8px] tracking-widest">{edu.startDate} - {edu.endDate}</div>
                           <div className="text-xs font-bold text-white uppercase">{edu.degree}</div>
                           <div className="text-[9px] text-[#86C2D6]/70 uppercase">{edu.school}</div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </section>
         </div>

         {/* CENTER COLUMN: Interactive Control Panel & Diagnostics */}
         <div className="col-span-5 flex flex-col gap-6 h-full min-h-0">
            {/* Interactive Launch Sequence (Req 13) */}
            <LaunchSequence />

            {/* Subsystem Diagnostics (Skills) */}
            <section className="flex-1 bg-[#0A192F] border border-[#1A5F7A] p-4 flex flex-col min-h-0 shadow-[inset_0_0_20px_rgba(26,95,122,0.2)] mt-6">
               <div className="text-[10px] text-white bg-[#1A5F7A] inline-block px-2 py-0.5 mb-4 tracking-widest uppercase font-bold self-start">SUBSYSTEM DIAGNOSTICS</div>
               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 grid grid-cols-2 gap-4">
                  {(skills as any[])?.map((group: any, i: number) => (
                    <div key={i} className="border border-[#1A5F7A]/50 p-3 bg-black/40">
                       <div className="text-[10px] text-white uppercase tracking-widest mb-3 flex items-center justify-between">
                         {group.category}
                         <span className="text-[#00f0ff] animate-pulse">OK</span>
                       </div>
                       <div className="flex flex-wrap gap-1">
                          {group.items?.map((item: string, j: number) => (
                            <span key={j} className="text-[8px] px-1.5 py-0.5 bg-[#1A5F7A]/20 text-[#86C2D6] uppercase">
                              {item}
                            </span>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </section>
         </div>

         {/* RIGHT COLUMN: Payloads & Clearances */}
         <div className="col-span-4 flex flex-col gap-6 h-full min-h-0">
            {/* Flight Clearances (Certifications) */}
            <section className="bg-[#0A192F] border border-[#1A5F7A] p-4 shrink-0 shadow-[inset_0_0_20px_rgba(26,95,122,0.2)]">
               <div className="text-[10px] text-white bg-[#1A5F7A] inline-block px-2 py-0.5 mb-4 tracking-widest uppercase font-bold">FLIGHT CLEARANCES</div>
                <div className="space-y-2">
                 {certifications?.slice(0, 3).map((cert, i) => (
                   <div key={i} className="flex items-center justify-between border-b border-[#1A5F7A]/30 pb-2">
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-white uppercase">{cert.name}</span>
                         <span className="text-[8px] tracking-widest">{cert.issuer}</span>
                      </div>
                      <div className="flex gap-2">
                        {(cert.url || cert.fileUrl) && (
                          <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="px-2 py-1 border border-[#00f0ff]/50 text-[8px] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors flex items-center gap-1">
                            <ExternalLink className="w-2 h-2" /> VIEW
                          </a>
                        )}
                        
                      </div>
                   </div>
                 ))}
                 {certifications && certifications.length > 3 && (
                   <button aria-label="View All" onClick={() => setShowAllCerts(true)} className="w-full mt-3 py-2 border border-[#1A5F7A] bg-[#1A5F7A]/10 text-[8px] text-[#86C2D6] hover:bg-[#1A5F7A]/30 hover:text-white transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                     <ExternalLink className="w-3 h-3" /> VIEW FULL MANIFEST (+{certifications.length - 3})
                   </button>
                 )}
               </div>
            </section>

            {/* Payload Manifest (Projects) */}
            <section className="flex-1 bg-[#0A192F] border border-[#1A5F7A] p-4 flex flex-col min-h-0 shadow-[inset_0_0_20px_rgba(26,95,122,0.2)]">
               <div className="text-[10px] text-white bg-[#1A5F7A] inline-block px-2 py-0.5 mb-4 tracking-widest uppercase font-bold self-start flex justify-between w-full">
                  <span>PAYLOAD MANIFEST</span>
                  <span className="text-[#00f0ff] animate-pulse">ACTIVE</span>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                 {projects.map((proj) => (
                   <div key={proj.id} className="border border-[#1A5F7A]/50 bg-black/40 p-3 group hover:border-[#00f0ff] transition-colors relative overflow-hidden">
                      <div className="absolute inset-0 bg-[#00f0ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative z-10">
                        <div className="text-white font-bold text-sm uppercase">{proj.title}</div>
                        <div className="text-[9px] text-[#00f0ff] tracking-widest mb-2">{proj.subtitle}</div>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                           {proj.technologies.slice(0, 4).map((tech: string, j: number) => (
                             <span key={j} className="text-[7px] border border-[#1A5F7A] px-1 py-0.5 text-[#86C2D6] uppercase">
                               {tech}
                             </span>
                           ))}
                        </div>

                        <div className="flex gap-2 mt-auto">
                           {proj.liveUrl && (
                             <a aria-label="Link" href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-1.5 bg-[#00f0ff]/10 border border-[#00f0ff] text-[#00f0ff] font-bold text-[8px] tracking-widest hover:bg-[#00f0ff] hover:text-black transition-colors">
                               <Play className="w-3 h-3 fill-current" /> LAUNCH
                             </a>
                           )}
                           {proj.githubUrl && (
                             <a aria-label="Link" href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-1.5 border border-white/50 text-white font-bold text-[8px] tracking-widest hover:bg-white hover:text-black transition-colors">
                               <Code className="w-3 h-3" /> BLUEPRINTS
                             </a>
                           )}
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </section>
         </div>

      </main>

      {/* ALL CLEARANCES MODAL */}
      {showAllCerts && (
        <div className="fixed inset-0 z-50 bg-[#050B14]/90 backdrop-blur-sm flex items-center justify-center p-8">
           <div className="border border-[#00f0ff] bg-[#0A192F] p-8 w-full max-w-4xl shadow-[0_0_50px_rgba(0,240,255,0.2)] max-h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-6 border-b border-[#1A5F7A] pb-4 shrink-0">
                 <div>
                   <h2 className="text-xl font-black text-white uppercase tracking-widest">FLIGHT CLEARANCES // FULL MANIFEST</h2>
                   <div className="text-[10px] text-[#00f0ff] animate-pulse tracking-widest mt-1">STATUS: SECURE</div>
                 </div>
                 <button onClick={() => setShowAllCerts(false)} className="text-[#86C2D6] hover:text-white border border-[#1A5F7A] hover:bg-[#1A5F7A] px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors">CLOSE</button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-4">
                 {certifications?.map((cert, i) => (
                   <div key={i} className="flex items-center justify-between border border-[#1A5F7A]/50 bg-black/40 p-4 hover:border-[#00f0ff]/50 transition-colors">
                      <div className="flex flex-col">
                         <span className="text-sm font-bold text-white uppercase">{cert.name}</span>
                         <span className="text-[10px] text-[#00f0ff] tracking-widest mt-1">{cert.issuer}</span>
                         <span className="text-[8px] text-[#86C2D6]/70 tracking-widest mt-1">{cert.date}</span>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {(cert.url || cert.fileUrl) && (
                          <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="px-4 py-2 border border-[#00f0ff]/50 text-[10px] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-colors flex items-center gap-2">
                            <ExternalLink className="w-3 h-3" /> VERIFY
                          </a>
                        )}
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
