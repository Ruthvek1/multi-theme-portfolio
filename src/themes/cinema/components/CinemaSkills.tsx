import React, { useState } from 'react';
import { Popcorn, CupSoda } from 'lucide-react';

export default function CinemaSkills({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  return (
    <div className="py-24 relative w-full bg-[#111] overflow-hidden">
       
       <div className="relative z-10 w-full max-w-5xl mx-auto px-4 lg:px-8">
           
           {/* Concession Stand Sign */}
           <div className="w-full flex justify-center mb-12">
               <div className="bg-[#b31b1b] border-4 border-yellow-500 px-12 py-3 rounded-full flex items-center gap-4 shadow-[0_0_20px_rgba(179,27,27,0.5)]">
                   <Popcorn className="w-8 h-8 text-yellow-300" />
                   <h2 className="font-serif text-white text-2xl md:text-3xl font-black uppercase tracking-widest text-shadow-sm">
                       Concessions & Skills
                   </h2>
                   <CupSoda className="w-8 h-8 text-blue-300" />
               </div>
           </div>

           {/* Glowing Menu Boards */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Left Menu Board: Skills */}
               <div className="bg-gradient-to-b from-[#222] to-[#111] border-8 border-gray-800 p-8 shadow-2xl relative">
                   <div className="absolute inset-0 bg-yellow-500/5 mix-blend-overlay pointer-events-none"></div>
                   
                   {/* Light tube effect at top */}
                   <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 blur-sm"></div>

                   <h3 className="font-sans text-yellow-400 text-2xl uppercase tracking-[0.2em] mb-8 text-center font-bold border-b-2 border-white/10 pb-4">
                       Main Menu (Skills)
                   </h3>

                   <div className="flex flex-col gap-6">
                       {skills.map((skillGroup) => (
                           <div key={skillGroup.category}>
                               <div className="flex justify-between items-baseline border-b border-white/5 border-dashed mb-2 pb-1">
                                   <h4 className="font-serif text-white text-xl tracking-wide">{skillGroup.category}</h4>
                                   <span className="font-sans text-yellow-500 text-sm tracking-widest">COMBO</span>
                               </div>
                               <p className="font-sans text-gray-400 text-sm uppercase tracking-wider leading-relaxed">
                                   {skillGroup.items.join(" • ")}
                               </p>
                           </div>
                       ))}
                   </div>
               </div>

               {/* Right Menu Board: Certifications */}
               <div className="bg-gradient-to-b from-[#222] to-[#111] border-8 border-gray-800 p-8 shadow-2xl relative">
                   <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none"></div>
                   
                   {/* Light tube effect at top */}
                   <div className="absolute top-0 left-0 right-0 h-2 bg-white/20 blur-sm"></div>

                   <h3 className="font-sans text-blue-400 text-2xl uppercase tracking-[0.2em] mb-8 text-center font-bold border-b-2 border-white/10 pb-4">
                       Specials (Certifications)
                   </h3>

                   <div className="flex flex-col gap-6">
                       {(showAllCerts ? certifications : certifications.slice(0, 9)).map((cert) => (
                           <div key={cert.id} className="flex flex-col mb-2">
                               <div className="flex justify-between items-baseline border-b border-white/5 border-dashed mb-1 pb-1">
                                   <h4 className="font-serif text-white text-lg tracking-wide">{cert.title}</h4>
                                   <span className="font-sans text-blue-400 text-xs tracking-widest">{cert.date}</span>
                               </div>
                               <div className="flex justify-between items-center">
                                   <p className="font-sans text-gray-500 text-xs uppercase tracking-wider">
                                       {cert.issuer}
                                   </p>
                                   <div className="flex gap-3">
                                       {(cert.url || cert.fileUrl) && (
                                           <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="text-yellow-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
                                               [View]
                                           </a>
                                       )}
                                       
                                   </div>
                               </div>
                           </div>
                       ))}
                   </div>

                   {certifications.length > 9 && (
                       <div className="flex justify-center mt-8 border-t border-white/10 pt-6">
                           <button 
                             onClick={() => setShowAllCerts(!showAllCerts)}
                             className="text-blue-400 hover:text-white font-sans text-sm uppercase tracking-widest transition-colors flex items-center gap-2"
                           >
                             {showAllCerts ? 'Show Less Specials' : `See ${certifications.length - 9} More Specials`}
                           </button>
                       </div>
                   )}
               </div>

           </div>

       </div>
    </div>
  );
}
