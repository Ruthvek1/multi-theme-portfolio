import React from 'react';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

export default function PlacesTimeline({ experience, education }: { experience: any[], education: any[] }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
       <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
             <MapPin className="w-5 h-5 text-red-500" />
             Your Timeline
          </h2>
          <p className="text-gray-500 text-sm">Places you've worked and studied.</p>
       </div>
       
       <div className="p-6 space-y-12">
          {/* Experience Timeline */}
          <div>
             <h3 className="text-gray-700 font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Career Journey
             </h3>
             <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
                {experience.map((exp, i) => (
                   <div key={i} className="relative pl-6">
                      <div className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full -left-[9px] top-1" />
                      <div>
                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900 text-lg">{exp.role}</h4>
                            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                               {exp.startDate} - {exp.endDate || 'Present'}
                            </span>
                         </div>
                         <div className="text-blue-600 font-medium mb-2">{exp.company}</div>
                         <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          <hr className="border-gray-100" />

          {/* Education Timeline */}
          <div>
             <h3 className="text-gray-700 font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-green-600" /> Education Journey
             </h3>
             <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-4">
                {education.map((edu, i) => (
                   <div key={i} className="relative pl-6">
                      <div className="absolute w-4 h-4 bg-white border-2 border-green-500 rounded-full -left-[9px] top-1" />
                      <div>
                         <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                            <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                               {edu.startDate} - {edu.endDate || 'Present'}
                            </span>
                         </div>
                         <div className="text-green-600 font-medium mb-2">{edu.school}</div>
                         <p className="text-gray-600 text-sm leading-relaxed">{edu.description}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
