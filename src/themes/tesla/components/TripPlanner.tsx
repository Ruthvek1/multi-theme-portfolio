import React from 'react';
import { Navigation, MapPin, Clock, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
export default function TripPlanner({ experience, education }: { experience?: any[] | null, education?: any[] | null }) {
  if (!experience && !education) return null;

  return (
    <>
         
         {/* Experience Route */}
         {experience && experience.length > 0 && (
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                   style={{
                     backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
                     backgroundSize: '40px 40px'
                   }}
              />
              <div className="flex items-center gap-2 mb-6 relative z-10">
                 <Briefcase className="w-5 h-5 text-gray-400" />
                 <h3 className="text-lg font-bold">Career Route</h3>
              </div>
              
              <div className="relative border-l-2 border-white/10 space-y-6 ml-4 mt-4 z-10">
                 {experience.map((exp, index) => (
                    <div key={index} className="relative pl-8 pb-2">
                       {/* Map Pin / Node */}
                       <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center">
                          {index === 0 ? <div className="w-2 h-2 rounded-full bg-blue-500" /> : <div className="w-1 h-1 rounded-full bg-white/50" />}
                       </div>

                       <div className="bg-black/40 p-4 rounded-2xl border border-white/5 group hover:border-white/20 transition-colors -mt-2">
                          <h4 className="font-bold text-lg">{exp.role}</h4>
                          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mt-1 mb-3">
                             <MapPin className="w-3 h-3" />
                             {exp.company}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 uppercase tracking-widest">
                             <Clock className="w-3 h-3" />
                             {exp.startDate} - {exp.endDate}
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed mb-4">
                             {exp.description}
                          </p>
                          <button aria-label="Interactive Button" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                             View Details <ArrowRight className="w-3 h-3" />
                          </button>
                       </div>
                    </div>
                 ))}
                 
                 {/* Destination Marker */}
                 <div className="absolute -left-[13px] -bottom-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center z-10 shadow-lg">
                    <MapPin className="w-3 h-3 text-white" />
                 </div>
              </div>
           </div>
         )}

         {/* Education Route */}
         {education && education.length > 0 && (
           <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                   style={{
                     backgroundImage: 'radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)',
                     backgroundSize: '40px 40px'
                   }}
              />
              <div className="flex items-center gap-2 mb-6 relative z-10">
                 <GraduationCap className="w-5 h-5 text-gray-400" />
                 <h3 className="text-lg font-bold">Academic Route</h3>
              </div>
              
              <div className="relative border-l-2 border-white/10 space-y-6 ml-4 mt-4 z-10">
                 {education.map((edu, index) => (
                    <div key={index} className="relative pl-8 pb-2">
                       {/* Map Pin / Node */}
                       <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-black border-2 border-purple-500 flex items-center justify-center">
                          {index === 0 ? <div className="w-2 h-2 rounded-full bg-purple-500" /> : <div className="w-1 h-1 rounded-full bg-white/50" />}
                       </div>

                       <div className="bg-black/40 p-4 rounded-2xl border border-white/5 group hover:border-white/20 transition-colors -mt-2">
                          <h4 className="font-bold text-lg">{edu.degree}</h4>
                          <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mt-1 mb-3">
                             <MapPin className="w-3 h-3" />
                             {edu.institution}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3 uppercase tracking-widest">
                             <Clock className="w-3 h-3" />
                             {edu.startDate} - {edu.endDate}
                          </div>
                          {edu.description && (
                            <p className="text-sm text-gray-300 leading-relaxed">
                               {edu.description}
                            </p>
                          )}
                       </div>
                    </div>
                 ))}
                 
                 {/* Destination Marker */}
                 <div className="absolute -left-[13px] -bottom-2 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center z-10 shadow-lg">
                    <MapPin className="w-3 h-3 text-white" />
                 </div>
              </div>
           </div>
         )}

    </>
  );
}
