import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function FlightRoute({ experience, education }: { experience: any[], education: any[] }) {
  // Combine and sort them, or display them in two sections. Let's do a single combined timeline for a long flight route.
  // Actually, keeping them as two distinct "Flight Paths" might be cleaner.
  
  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-gray-200">
       
       <div className="space-y-12">
          
          {/* Experience Route */}
          <div>
             <div className="flex items-center gap-3 mb-8 text-[#1A2530]">
                <div className="bg-blue-100 p-3 rounded-full"><Briefcase className="w-6 h-6 text-blue-600" /></div>
                <h3 className="text-xl font-black uppercase tracking-widest">Career Route</h3>
             </div>
             
             <div className="relative border-l-4 border-dashed border-blue-300 ml-6 space-y-10 pb-4">
                {experience.map((exp, i) => (
                   <div key={i} className="relative pl-8 group">
                      {/* Node */}
                      <div className="absolute w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-md -left-[15px] top-1 group-hover:scale-125 transition-transform" />
                      
                      <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-[#1A2530]">{exp.role}</h4>
                            <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-2 md:mt-0">
                               {exp.startDate} - {exp.endDate || 'Present'}
                            </span>
                         </div>
                         <div className="text-blue-600 font-semibold mb-4">{exp.company}</div>
                         <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <hr className="border-gray-200" />

          {/* Education Route */}
          <div>
             <div className="flex items-center gap-3 mb-8 text-[#1A2530]">
                <div className="bg-green-100 p-3 rounded-full"><GraduationCap className="w-6 h-6 text-green-600" /></div>
                <h3 className="text-xl font-black uppercase tracking-widest">Academic Route</h3>
             </div>
             
             <div className="relative border-l-4 border-dashed border-green-300 ml-6 space-y-10 pb-4">
                {education.map((edu, i) => (
                   <div key={i} className="relative pl-8 group">
                      {/* Node */}
                      <div className="absolute w-6 h-6 bg-green-600 rounded-full border-4 border-white shadow-md -left-[15px] top-1 group-hover:scale-125 transition-transform" />
                      
                      <div className="bg-green-50/50 p-6 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-[#1A2530]">{edu.degree}</h4>
                            <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mt-2 md:mt-0">
                               {edu.startDate} - {edu.endDate || 'Present'}
                            </span>
                         </div>
                         <div className="text-green-600 font-semibold mb-2">{edu.institution}</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

       </div>
    </div>
  );
}
