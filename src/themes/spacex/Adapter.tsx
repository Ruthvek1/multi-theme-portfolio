'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import DockingSimulator from './components/DockingSimulator';
import { Download, ExternalLink, Activity, Target, Shield, Rocket, Layers } from 'lucide-react';

export default function SpaceXAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();
  const [showAllCerts, setShowAllCerts] = useState(false);

  if (!personal) return null;

  return (
    <div className="w-full min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden relative selection:bg-white selection:text-black flex flex-col">
      
      {/* Background Interactive Element */}
      <DockingSimulator />

      {/* Main Touchscreen Grid */}
      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-6 lg:p-8 gap-6 overflow-visible">
        
        {/* HEADER / COMMS */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center shrink-0 w-full gap-4">
           <div className="flex items-center gap-4">
              {/* SpaceX-style X Logo mark */}
              <div className="text-3xl font-bold tracking-tighter">X</div>
              <div className="w-[1px] h-8 bg-white/20" />
              <div>
                <h1 className="text-xl font-medium tracking-wide uppercase">{personal.name}</h1>
                <div className="text-xs text-white/50 tracking-widest uppercase">{personal.title}</div>
              </div>
           </div>

           <div className="flex items-center gap-6">
              {/* Comms */}
              <div className="flex gap-4 text-xs tracking-widest uppercase font-medium">
                 {socials?.github && <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GH</a>}
                 {socials?.linkedin && <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">IN</a>}
                 {socials?.instagram && <a aria-label="Link" href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">IG</a>}
              </div>
              
              {/* Resume / Manifest */}
              {personal.resumeUrl && (
                <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-bold tracking-widest text-xs uppercase hover:bg-gray-200 transition-colors">
                   <Download className="w-4 h-4" /> DOWNLOAD MANIFEST
                </a>
              )}
           </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-6 pb-8">
           
           {/* LEFT COLUMN: Profile & Skills */}
           <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
              {/* Crew Dossier */}
              <Card title="CREW DOSSIER" icon={<Shield className="w-4 h-4" />}>
                 <p className="text-sm text-white/70 leading-relaxed font-light">{personal.bio}</p>
                 <div className="mt-4 flex flex-col gap-2 text-xs text-white/50 uppercase tracking-widest">
                    <div className="flex justify-between border-b border-white/10 pb-1"><span>LOC</span> <span className="text-white text-right">{personal.location}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-1"><span>COM_1</span> <span className="text-white text-right">{personal.email}</span></div>
                    <div className="flex justify-between border-b border-white/10 pb-1"><span>COM_2</span> <span className="text-white text-right">{personal.phone}</span></div>
                 </div>
              </Card>

              {/* Vehicle Subsystems (Skills) */}
              <Card title="VEHICLE SUBSYSTEMS" icon={<Layers className="w-4 h-4" />} className="flex flex-col">
                 <div className="pr-2 space-y-5">
                    {(skills as any[])?.map((group: any, i: number) => (
                      <div key={i}>
                         <div className="text-xs uppercase tracking-widest text-white/50 mb-2">{group.category}</div>
                         <div className="flex flex-wrap gap-2">
                           {group.items?.map((item: string, j: number) => (
                             <div key={j} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-white/90">
                               {item}
                             </div>
                           ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>

           {/* CENTER COLUMN: Interactive zone is kept mostly clear, but we show Projects at the bottom */}
           <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 order-3 lg:order-none">
              <div className="hidden lg:block h-[600px]" /> {/* Spacer for docking simulator on desktop */}
              
              {/* Payload Deployments (Projects) */}
              <Card title="PAYLOAD DEPLOYMENTS" icon={<Rocket className="w-4 h-4" />} className="flex flex-col">
                 <div className="pr-2 space-y-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex flex-col gap-3">
                         <div>
                            <div className="text-lg font-bold tracking-wide">{proj.title}</div>
                            <div className="text-xs text-blue-400 uppercase tracking-widest">{proj.subtitle}</div>
                         </div>
                         <p className="text-sm text-white/60 font-light line-clamp-2">{proj.description}</p>
                         
                         <div className="flex gap-3 mt-2">
                            {proj.liveUrl && (
                              <a aria-label="Link" href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-widest uppercase transition-colors">
                                <Activity className="w-3 h-3" /> LIVE TELEMETRY
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a aria-label="Link" href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-widest uppercase transition-colors">
                                SOURCE SCHEMATICS
                              </a>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>
              </Card>
           </div>

           {/* RIGHT COLUMN: Timeline & Clearances */}
           <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
              {/* Flight Trajectory (Timeline) */}
              <Card title="FLIGHT TRAJECTORY" icon={<Target className="w-4 h-4" />} className="flex flex-col">
                 <div className="pr-2 space-y-8 pl-2">
                    <div className="relative border-l border-white/20 ml-2 space-y-6">
                      <div className="text-xs uppercase tracking-widest text-white/50 -ml-2 mb-4 bg-black inline-block px-2">MISSION LOGS (EXP)</div>
                      {experience.map((exp: any, i: number) => (
                        <div key={i} className="relative pl-6">
                           <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-white ring-4 ring-black" />
                           <div className="text-[10px] text-white/50 tracking-widest uppercase">{exp.startDate} - {exp.endDate}</div>
                           <div className="text-sm font-bold mt-1">{exp.role}</div>
                           <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">{exp.company}</div>
                           <div className="text-xs text-white/60 font-light line-clamp-2">{exp.description}</div>
                        </div>
                      ))}

                      <div className="text-xs uppercase tracking-widest text-white/50 -ml-2 mb-4 mt-8 bg-black inline-block px-2">TRAINING (EDU)</div>
                      {education.map((edu: any, i: number) => (
                        <div key={i} className="relative pl-6">
                           <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-black" />
                           <div className="text-[10px] text-white/50 tracking-widest uppercase">{edu.startDate} - {edu.endDate}</div>
                           <div className="text-sm font-bold mt-1">{edu.degree}</div>
                           <div className="text-xs text-blue-400 uppercase tracking-wider mb-2">{edu.school}</div>
                        </div>
                      ))}
                    </div>
                 </div>
              </Card>

              {/* Orbital Clearances (Certs) */}
              <Card title="ORBITAL CLEARANCES" icon={<Shield className="w-4 h-4" />} className="flex flex-col">
                 <div className="pr-2 space-y-3">
                   {(showAllCerts ? certifications : certifications?.slice(0, 6))?.map((cert, i) => (
                     <div key={i} className="flex flex-col gap-2 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div>
                           <div className="text-xs font-bold uppercase tracking-wider text-white">{cert.name}</div>
                           <div className="text-[10px] text-white/50 tracking-widest uppercase">{cert.issuer}</div>
                        </div>
                        <div className="flex gap-2">
                          {(cert.url || cert.fileUrl) && (
                            <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-blue-400 hover:text-blue-300">
                              <ExternalLink className="w-3 h-3" /> VIEW
                            </a>
                          )}
                          
                        </div>
                     </div>
                   ))}
                   {certifications && certifications.length > 6 && (
                     <button
                       onClick={() => setShowAllCerts(!showAllCerts)}
                       className="w-full mt-2 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-widest uppercase transition-colors"
                     >
                       {showAllCerts ? 'SHOW LESS' : `VIEW ${certifications.length - 6} MORE CLEARANCES`}
                     </button>
                   )}
                 </div>
              </Card>
           </div>

        </main>
      </div>
    </div>
  );
}

// Reusable sleek card component
function Card({ title, icon, children, className = '' }: { title: string, icon: React.ReactNode, children: React.ReactNode, className?: string }) {
  return (
    <section className={`bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-5 text-white/50 border-b border-white/10 pb-3">
        {icon}
        <h2 className="text-xs font-bold uppercase tracking-widest">{title}</h2>
      </div>
      {children}
    </section>
  );
}
