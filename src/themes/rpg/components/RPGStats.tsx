import React from 'react';

export default function RPGStats({ skills, certifications }: { skills: any[], certifications: any[] }) {
  
  return (
    <div className="py-24 relative w-full bg-[#111122] overflow-hidden">
       
       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8">
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               
               {/* Left Column: Character Stats (Skills) */}
               <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 md:p-8 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                   
                   <h2 className="font-rpg text-white text-3xl uppercase tracking-widest relative z-10 mb-8 border-b-2 border-[#5577ff] pb-2">
                       Character Stats
                   </h2>

                   <div className="flex flex-col gap-8">
                       {skills.map((skillGroup, idx) => (
                           <div key={skillGroup.category}>
                               <h3 className="font-rpg text-yellow-400 text-xl mb-3">
                                   {skillGroup.category} (LVL {99 - idx * 5})
                               </h3>
                               
                               <div className="flex flex-wrap gap-x-6 gap-y-2">
                                   {skillGroup.items.map((skill: string) => (
                                       <div key={skill} className="flex items-center gap-2 w-full sm:w-[calc(50%-12px)]">
                                           <span className="text-[#88aaff] font-rpg text-lg">▶</span>
                                           <span className="text-white font-rpg text-xl">{skill}</span>
                                       </div>
                                   ))}
                               </div>
                           </div>
                       ))}
                   </div>
               </div>

               {/* Right Column: Magic / Spells (Certifications) */}
               <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 md:p-8 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                   
                   <h2 className="font-rpg text-white text-3xl uppercase tracking-widest relative z-10 mb-8 border-b-2 border-[#5577ff] pb-2">
                       Magic & Relics
                   </h2>

                   <div className="flex flex-col gap-6">
                       {certifications.map((cert) => (
                           <div key={cert.id} className="flex flex-col gap-1 mb-4">
                               
                               <div className="flex items-start justify-between gap-4">
                                   <div>
                                        <h4 className="font-rpg text-yellow-300 text-2xl leading-none">
                                            {cert.title}
                                        </h4>
                                        <p className="text-[#88aaff] font-rpg text-lg mt-1">
                                            {cert.issuer} • {cert.date}
                                        </p>
                                   </div>
                                   
                                   <div className="flex flex-col items-end gap-2 shrink-0">
                                       {(cert.url || cert.fileUrl) && (
                                           <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-2 cursor-pointer">
                                               <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-rpg text-lg">▶</span>
                                               <span className="font-rpg text-white text-xl hover:text-yellow-200">Examine</span>
                                           </a>
                                       )}
                                       
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
