'use client';
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Activity, Clock, Award, Users, Crosshair, Map, ShieldAlert, Cpu } from 'lucide-react';
import TelemetryGraph from './components/TelemetryGraph';
import SectorTimes from './components/SectorTimes';
import DriverProfile from './components/DriverProfile';
import LiveTrackMap from './components/LiveTrackMap';
import ReactionTest from './components/ReactionTest';

export default function F1Adapter() {
  const { personal, skills, projects, experience, education, socials, certifications } = usePortfolio();
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 100);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !personal) return null;

  return (
    <div className="min-h-screen bg-[#111111] text-white font-mono selection:bg-[#ff1801] selection:text-white">
      
      {/* Top Banner - FIA Style Race Control Header */}
      <div className="sticky top-0 z-50 bg-[#000000] border-b-4 border-[#ff1801] px-4 py-2 flex items-center justify-between shadow-2xl">
         <div className="flex items-center gap-4">
            <div className="bg-[#ff1801] text-white font-black text-xl italic px-3 py-1 -skew-x-12 tracking-tighter">
              RACE CONTROL
            </div>
            <div className="flex gap-4 text-xs font-bold text-gray-400">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 TRACK CLEAR
               </div>
               <div className="flex items-center gap-2">
                 <CloudRain className="w-4 h-4 text-blue-400" />
                 DRY - 0% RAIN
               </div>
            </div>
         </div>
         <div className="flex items-center gap-6 font-bold text-sm">
            <div className="text-gray-400">SESSION TIME</div>
            <div className="text-white text-xl tabular-nums tracking-widest">{currentTime.toISOString().substr(11, 8)}</div>
         </div>
      </div>

      <div className="p-4 grid grid-cols-12 gap-4 max-w-[1800px] mx-auto min-h-screen pb-12">
         
         {/* LEFT COLUMN - Driver Profile & Leaderboard (Experience) */}
         <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <DriverProfile personal={personal} socials={socials} />
            <SectorTimes experience={experience} education={education} />
         </div>

         {/* CENTER COLUMN - Telemetry (Skills) & Live Map */}
         <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
            <TelemetryGraph skills={skills} />
            
            {/* Live Track / Projects Area */}
            <div className="bg-[#1a1a1a] border border-gray-800 relative flex flex-col">
               <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 flex items-center gap-2">
                  <Map className="w-4 h-4" /> Track Map (Live Projects)
               </div>
               <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                 {projects.map((project: any, i: number) => (
                    <div key={i} className="bg-[#222] border border-gray-700 hover:border-[#ff1801] transition-colors p-4 group">
                       <h3 className="font-bold text-lg text-white mb-1 group-hover:text-[#ff1801] transition-colors">{project.title}</h3>
                       <div className="text-xs text-gray-400 mb-3 line-clamp-2 h-8">{project.description}</div>
                       <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies?.slice(0, 3).map((t: string) => (
                             <span key={t} className="text-[9px] px-1.5 py-0.5 bg-gray-800 text-gray-300 font-bold">{t}</span>
                          ))}
                       </div>
                       <div className="flex gap-2">
                          <a aria-label="Link" href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1 bg-white text-black text-center text-xs font-bold py-2 hover:bg-gray-200 uppercase tracking-wider">
                            Live Demo
                          </a>
                          <a aria-label="Link" href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1 bg-gray-800 text-white text-center text-xs font-bold py-2 hover:bg-gray-700 uppercase tracking-wider">
                            Source
                          </a>
                       </div>
                    </div>
                 ))}
               </div>
               
               <ReactionTest />
            </div>
         </div>

         {/* RIGHT COLUMN - Timing Tower & Certs */}
         <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <div className="bg-[#1a1a1a] border border-gray-800 flex flex-col">
               <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800 flex justify-between items-center">
                  <span className="flex items-center gap-2"><Award className="w-4 h-4" /> Certifications (Trophies)</span>
                  <span className="text-[#ff1801]">LIVE</span>
               </div>
               <div className="p-2 space-y-1">
                 {certifications?.map((cert: any, i: number) => (
                    <div key={i} className="flex items-center bg-[#222] hover:bg-gray-800 border-l-4 border-transparent hover:border-[#ff1801] p-2 transition-all group">
                       <div className="w-6 flex-shrink-0 text-right font-bold text-gray-500">{i+1}</div>
                       <div className="w-10 flex-shrink-0 text-center ml-2 text-[#ff1801] font-bold text-xs">{cert.name?.substring(0,3).toUpperCase()}</div>
                       <div className="flex-1 px-3 min-w-0">
                         <div className="font-bold text-sm truncate">{cert.name}</div>
                         <div className="text-[10px] text-gray-500 uppercase truncate">{cert.issuer}</div>
                       </div>
                       <div className="flex-shrink-0">
                         {(cert.url || cert.fileUrl) ? (
                           <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="text-[#00ff41] text-xs font-bold hover:text-white transition-colors bg-gray-900 px-2 py-1 rounded border border-gray-700 inline-block text-center min-w-[50px]">
                             VIEW
                           </a>
                         ) : (
                           <button disabled className="text-gray-600 text-xs font-bold bg-gray-900 px-2 py-1 rounded border border-gray-800 inline-block text-center min-w-[50px] cursor-not-allowed">
                             VIEW
                           </button>
                         )}
                       </div>
                    </div>
                 ))}
               </div>
            </div>
            
            <LiveTrackMap />
         </div>
      </div>
    </div>
  );
}

// Quick cloud icon for weather
function CloudRain(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
  );
}
