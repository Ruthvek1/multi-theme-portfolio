import React from 'react';

export default function SectorTimes({ experience, education }: { experience: any, education: any }) {
  if (!experience && !education) return null;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 flex-1 relative overflow-hidden flex flex-col">
       <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800">
          Career Laptimes (Sector Times)
       </div>
       
       <div className="flex-1 p-2 overflow-y-auto">
          {/* Header Row */}
          <div className="flex text-[9px] font-bold text-gray-500 uppercase pb-2 mb-2 border-b border-gray-800">
             <div className="w-16">Lap</div>
             <div className="flex-1">Constructor / Track</div>
             <div className="w-16 text-right">Sector</div>
          </div>

          <div className="space-y-4">
             {/* Experience "Laps" */}
             {experience?.map((exp: any, i: number) => (
                <div key={`exp-${i}`} className="flex items-start text-xs border-l-2 border-[#ff1801] pl-2 hover:bg-[#222] transition-colors p-1">
                   <div className="w-20 font-mono text-gray-400 flex flex-col">
                      <span>L{experience.length - i}</span>
                      <span className="text-[9px] mt-1">{exp.startDate} - {exp.endDate}</span>
                   </div>
                   <div className="flex-1">
                      <div className="font-bold text-white uppercase">{exp.role}</div>
                      <div className="text-[10px] text-gray-400 font-bold mt-0.5">{exp.company}</div>
                      <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">{exp.description}</div>
                   </div>
                   <div className="w-16 text-right text-[10px] font-bold text-yellow-500">
                      S1
                   </div>
                </div>
             ))}

             {/* Education "Laps" */}
             {education?.map((edu: any, i: number) => (
                <div key={`edu-${i}`} className="flex items-start text-xs border-l-2 border-[#007aff] pl-2 hover:bg-[#222] transition-colors p-1">
                   <div className="w-20 font-mono text-gray-400 flex flex-col">
                      <span>Q{education.length - i}</span>
                      <span className="text-[9px] mt-1">{edu.startDate} - {edu.endDate}</span>
                   </div>
                   <div className="flex-1">
                      <div className="font-bold text-white uppercase">{edu.degree}</div>
                      <div className="text-[10px] text-[#007aff] font-bold mt-0.5">{edu.institution}</div>
                      <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">{edu.description}</div>
                   </div>
                   <div className="w-16 text-right text-[10px] font-bold text-yellow-500">
                      S2
                   </div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
}
