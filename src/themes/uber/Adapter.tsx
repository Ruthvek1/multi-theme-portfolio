'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import InteractiveMap from './components/InteractiveMap';
import TripHistory from './components/TripHistory';
import { Star, MapPin, Search, Navigation, ShieldCheck, Download, ExternalLink, Play, Code, Phone, Mail, FileText, Car } from 'lucide-react';

export default function UberAdapter() {
  const { personal, projects, skills, experience, education, certifications, socials } = usePortfolio();
  const [mapZIndex, setMapZIndex] = useState(0);

  if (!personal) return null;

  return (
    <div className="w-full h-screen bg-white text-black font-sans flex flex-col md:flex-row overflow-hidden selection:bg-black selection:text-white">
      
      {/* LEFT: Data Panel (Bottom Sheet on Mobile) */}
      <div className={`w-full md:w-[500px] lg:w-[600px] h-full flex flex-col bg-white shadow-[10px_0_30px_rgba(0,0,0,0.1)] z-10 transition-transform duration-300 relative`}>
         
         {/* App Header */}
         <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
            <div className="text-2xl font-black tracking-tighter">Portfolio Taxi</div>
            
            {/* Driver Profile Summary */}
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
               <div className="w-8 h-8 bg-black rounded-full text-white flex items-center justify-center text-sm font-bold">
                 {personal.name.charAt(0)}
               </div>
               <div className="flex items-center gap-1 font-bold text-sm">
                 5.0 <Star className="w-3.5 h-3.5 fill-black text-black" />
               </div>
            </div>
         </div>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto custom-scrollbar bg-gray-50">
            <div className="p-4 md:p-6 space-y-6">
               
               {/* Driver Profile Details */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h1 className="text-2xl font-bold mb-1">{personal.name}</h1>
                  <p className="text-gray-500 font-medium mb-4">{personal.title}</p>
                  <p className="text-gray-700 leading-relaxed text-sm mb-6">{personal.bio}</p>
                  
                  {/* Contact Info (Requirement #8) */}
                  <div className="grid grid-cols-2 gap-4">
                     <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                           <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                           <div className="text-sm font-bold truncate">Email Driver</div>
                           <div className="text-xs text-gray-500 truncate">{personal.email}</div>
                        </div>
                     </a>
                     <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                           <MapPin className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-bold truncate">{personal.location}</div>
                     </div>
                     <a aria-label="Link" href={`tel:${personal.phone}`} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors overflow-hidden">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                           <Phone className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-bold truncate">{personal.phone}</div>
                     </a>
                     {socials?.linkedin && (
                       <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition-colors overflow-hidden text-black">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                             <ExternalLink className="w-4 h-4" />
                          </div>
                          <div className="text-sm font-bold truncate">LinkedIn</div>
                       </a>
                     )}
                  </div>
               </div>

               {/* Ride Options (Skills) */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Vehicle Classes (Skills)</h2>
                  <div className="space-y-4">
                     {(skills as any[])?.map((group: any, i: number) => (
                       <div key={i} className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
                             <Car className="w-6 h-6" />
                          </div>
                          <div>
                             <h3 className="font-bold text-sm">{group.category}</h3>
                             <p className="text-xs text-gray-500 leading-snug">{group.items.join(' • ')}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Destinations (Projects) */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-xl mb-6">
                     <Search className="w-5 h-5 text-black" />
                     <span className="font-medium text-gray-500">Where to? (Select Destination)</span>
                  </div>

                  <div className="space-y-6">
                     {projects.map((proj) => (
                       <div key={proj.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                          <div className="flex gap-4">
                             <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0 mt-1">
                                <Navigation className="w-5 h-5" />
                             </div>
                             <div>
                                <h3 className="font-bold text-base">{proj.title}</h3>
                                <p className="text-sm text-gray-500 mb-2">{proj.subtitle}</p>
                                <p className="text-sm text-gray-700 leading-relaxed mb-4">{proj.description}</p>
                                
                                <div className="flex gap-3">
                                   {proj.liveUrl && (
                                     <a aria-label="Link" href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">
                                       <Play className="w-4 h-4" /> Live Demo
                                     </a>
                                   )}
                                   {proj.githubUrl && (
                                     <a aria-label="Link" href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                                       <Code className="w-4 h-4" /> Source Code
                                     </a>
                                   )}
                                </div>
                             </div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Experience Timeline */}
               <TripHistory experience={experience} />

               {/* Academy (Education) */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold mb-4">Academy Training</h2>
                  <div className="space-y-4">
                     {education.map((edu: any, i: number) => (
                       <div key={i} className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div>
                            <h3 className="font-bold text-sm">{edu.degree}</h3>
                            <p className="text-sm text-gray-500">{edu.school}</p>
                          </div>
                          <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded-md">{edu.startDate} - {edu.endDate}</span>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Clearances (Certifications) */}
               <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                     <ShieldCheck className="w-5 h-5 text-[#05A357]" />
                     <h2 className="text-lg font-bold">Safety Checks (Certs)</h2>
                  </div>
                  <div className="space-y-4">
                     {certifications?.map((cert, i) => (
                       <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                          <div>
                            <h3 className="font-bold text-sm">{cert.name}</h3>
                            <p className="text-xs text-gray-500">{cert.issuer}</p>
                          </div>
                          <div className="flex gap-2">
                             {(cert.url || cert.fileUrl) && (
                               <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors">
                                 <ExternalLink className="w-4 h-4 text-black" />
                               </a>
                             )}
                             
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

            </div>
         </div>

         {/* BOTTOM STICKY: Resume Receipt */}
         <div className="p-4 border-t border-gray-100 bg-white">
            {personal.resumeUrl && (
               <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="w-full flex items-center justify-between bg-[#05A357] text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:bg-[#048A49] transition-colors">
                 <div className="flex items-center gap-3">
                   <FileText className="w-5 h-5" />
                   <span>Download Receipt (CV)</span>
                 </div>
                 <div className="text-xl font-black">$0.00</div>
               </a>
            )}
         </div>

      </div>

      {/* RIGHT: Interactive Map */}
      <div className={`flex-1 relative ${mapZIndex > 0 ? 'z-50' : 'z-0'}`}>
         {/* Button to toggle map full screen on mobile (optional feature, but not required if side-by-side on desktop) */}
         <div className="absolute top-4 left-4 z-40 md:hidden">
            <button aria-label="Interactive Button" onClick={() => setMapZIndex(prev => prev === 0 ? 50 : 0)}
              className="bg-black text-white px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4" /> {mapZIndex === 0 ? 'View Map' : 'Close Map'}
            </button>
         </div>

         <InteractiveMap onRideComplete={() => setMapZIndex(0)} />
      </div>

    </div>
  );
}
