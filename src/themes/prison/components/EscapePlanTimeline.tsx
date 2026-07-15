import React from 'react';
import { Route, Crosshair } from 'lucide-react';

export default function EscapePlanTimeline({ experience, education }: { experience: any[], education: any[] }) {
  return (
    <div className="max-w-4xl mx-auto mb-16 relative">
       {/* Section Header */}
       <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-black uppercase tracking-widest text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
             Escape Route
          </h2>
          <div className="h-1 flex-1 border-t-2 border-dashed border-white/40"></div>
       </div>

       <div className="relative pl-8 md:pl-0">
          {/* The main path line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 bg-white/20 -translate-x-1/2"></div>
          
          <div className="space-y-12">
             {/* Map out Experience */}
             <div className="relative">
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bg-red-600 text-white font-bold py-1 px-4 rounded-full uppercase text-xs z-10 border-2 border-white shadow-lg">
                   Active Operations (Experience)
                </div>
                <div className="pt-12 space-y-12">
                   {experience.map((exp, i) => (
                      <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                         {/* Connecting dot */}
                         <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#0a3663] border-4 border-white rounded-full z-10 flex items-center justify-center">
                            <Crosshair className="w-4 h-4 text-white" />
                         </div>
                         
                         {/* Content Card */}
                         <div className="w-full pl-12 md:pl-0 md:w-5/12">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/30 p-6 shadow-xl relative hover:bg-white/20 transition-colors">
                               {/* Marker pointing to timeline line */}
                               <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-1 bg-white/40 ${i % 2 === 0 ? '-left-8' : '-right-8'}`}></div>
                               
                               <div className="text-xs font-black text-cyan-300 uppercase tracking-widest mb-1 border-b border-white/20 pb-1">
                                  {/* EXPLICIT DATES AS REQUESTED */}
                                  [ {exp.startDate} - {exp.endDate || 'Present'} ]
                               </div>
                               <h3 className="text-xl font-black text-white uppercase mt-2">{exp.role}</h3>
                               <div className="text-red-400 font-bold uppercase text-sm mb-3">@ {exp.company}</div>
                               <p className="text-gray-300 text-sm font-mono leading-relaxed">
                                  {exp.description}
                               </p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

             {/* Map out Education */}
             <div className="relative pt-8">
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 top-0 bg-cyan-600 text-white font-bold py-1 px-4 rounded-full uppercase text-xs z-10 border-2 border-white shadow-lg">
                   Training Facilities (Education)
                </div>
                <div className="pt-12 space-y-12">
                   {education.map((edu, i) => (
                      <div key={i} className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                         {/* Connecting dot */}
                         <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-[#0a3663] border-4 border-white rounded-full z-10 flex items-center justify-center">
                            <Route className="w-4 h-4 text-white" />
                         </div>
                         
                         {/* Content Card */}
                         <div className="w-full pl-12 md:pl-0 md:w-5/12">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/30 p-6 shadow-xl relative hover:bg-white/20 transition-colors">
                               <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-8 h-1 bg-white/40 ${i % 2 !== 0 ? '-left-8' : '-right-8'}`}></div>
                               
                               <div className="text-xs font-black text-cyan-300 uppercase tracking-widest mb-1 border-b border-white/20 pb-1">
                                  {/* EXPLICIT DATES AS REQUESTED */}
                                  [ {edu.startDate} - {edu.endDate || 'Present'} ]
                               </div>
                               <h3 className="text-xl font-black text-white uppercase mt-2">{edu.degree}</h3>
                               <div className="text-cyan-400 font-bold uppercase text-sm mb-3">@ {edu.institution || edu.school}</div>
                               <p className="text-gray-300 text-sm font-mono leading-relaxed">
                                  {edu.description}
                               </p>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
             
          </div>
       </div>
    </div>
  );
}
