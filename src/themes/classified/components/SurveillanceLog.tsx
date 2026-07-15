import React from 'react';
import { Activity, Clock } from 'lucide-react';

export default function SurveillanceLog({ experience, education }: { experience: any[], education: any[] }) {
  return (
    <div className="bg-[#111] border border-[#33ff33]/30 p-6 shadow-lg shadow-black">
       <div className="flex items-center gap-3 mb-6 border-b border-[#33ff33]/20 pb-4">
          <Activity className="w-6 h-6 text-[#33ff33]" />
          <h2 className="text-xl font-black tracking-widest">SURVEILLANCE LOG</h2>
       </div>

       <div className="space-y-8">
          
          {/* Field Operations (Experience) */}
          <div>
             <h3 className="text-[#33ff33]/70 text-xs font-bold tracking-[0.3em] mb-4">FIELD OPERATIONS (EXPERIENCE)</h3>
             <div className="relative border-l border-[#33ff33]/30 ml-3 space-y-6">
                {experience.map((exp, i) => (
                   <div key={i} className="relative pl-6">
                      <div className="absolute w-2 h-2 bg-[#33ff33] rounded-full -left-[4.5px] top-1.5 shadow-[0_0_8px_#33ff33]"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-2">
                         <h4 className="text-lg font-bold text-white uppercase">{exp.role}</h4>
                         {/* Explicit Date Rendering as requested */}
                         <div className="flex items-center gap-2 bg-[#33ff33]/10 border border-[#33ff33]/30 px-2 py-1 text-xs text-[#33ff33] font-mono whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {exp.startDate} <span className="opacity-50">TO</span> {exp.endDate || 'PRESENT'}
                         </div>
                      </div>
                      
                      <div className="text-sm text-yellow-500 font-bold mb-2 tracking-widest">{exp.company.toUpperCase()}</div>
                      <p className="text-sm text-gray-400 font-mono border-l-2 border-gray-700 pl-3 py-1">
                         {exp.description}
                      </p>
                   </div>
                ))}
             </div>
          </div>

          {/* Training Facilities (Education) */}
          <div>
             <h3 className="text-[#33ff33]/70 text-xs font-bold tracking-[0.3em] mb-4 mt-8">TRAINING FACILITIES (EDUCATION)</h3>
             <div className="relative border-l border-[#33ff33]/30 ml-3 space-y-6">
                {education.map((edu, i) => (
                   <div key={i} className="relative pl-6">
                      <div className="absolute w-2 h-2 bg-yellow-500 rounded-full -left-[4.5px] top-1.5 shadow-[0_0_8px_#eab308]"></div>
                      
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-2">
                         <h4 className="text-lg font-bold text-white uppercase">{edu.degree}</h4>
                         {/* Explicit Date Rendering as requested */}
                         <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-2 py-1 text-xs text-yellow-500 font-mono whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {edu.startDate} <span className="opacity-50">TO</span> {edu.endDate || 'PRESENT'}
                         </div>
                      </div>
                      
                      <div className="text-sm text-gray-300 font-bold mb-2 tracking-widest">{edu.institution.toUpperCase()}</div>
                   </div>
                ))}
             </div>
          </div>

       </div>
    </div>
  );
}
