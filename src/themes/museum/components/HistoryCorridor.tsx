import React from 'react';

export default function HistoryCorridor({ experience, education }: { experience: any[], education: any[] }) {
  return (
    <div className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-20">
       
       <div className="text-center mb-24">
          <h2 className="font-serif text-4xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             The History Corridor
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50"></div>
       </div>

       {/* Experience Wing */}
       <div className="mb-20">
          <h3 className="font-serif text-2xl text-[#b59e66] text-center mb-12 italic font-light">
             - Professional Antiquities -
          </h3>
          
          <div className="flex flex-col gap-12 relative">
             {/* Center Walkway Line */}
             <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>
             
             {experience.map((exp, i) => (
                <div key={i} className={`flex items-center w-full group ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                   <div className={`w-[45%] ${i % 2 === 0 ? 'pr-8 md:pr-16 text-right' : 'pl-8 md:pl-16 text-left'}`}>
                      
                      {/* The Artifact Display (Glass Box or Pedestal) */}
                      <div className="relative mb-6 mx-auto inline-block">
                         {/* Downward Spotlight */}
                         <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-48 bg-white/5 blur-2xl rounded-[100%] pointer-events-none transform -rotate-12 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                         
                         {/* Display Case */}
                         <div className="bg-[#15120f] border-t-2 border-l-2 border-r-2 border-[#2a2313] p-6 shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            
                            <h4 className="font-serif text-[#d4af37] text-xl md:text-2xl font-bold mb-2 uppercase">{exp.role}</h4>
                            <p className="font-serif text-[#a8997a] italic text-sm mb-4">{exp.company}</p>
                            
                            <p className="font-serif text-[#8f856f] text-sm leading-relaxed text-justify">
                               {exp.description}
                            </p>
                         </div>
                         
                         {/* Museum Plaque with DATES */}
                         <div className="bg-gradient-to-b from-[#d4af37] to-[#aa771c] p-1 shadow-lg mx-auto w-4/5 -mt-2 relative z-10">
                            <div className="bg-[#1a1614] border border-[#d4af37]/30 p-2 text-center">
                               <div className="font-serif text-[#d4af37] text-[11px] font-bold tracking-widest uppercase">
                                  {exp.startDate} — {exp.endDate || 'Present'}
                               </div>
                            </div>
                         </div>
                         
                         {/* Pedestal Base */}
                         <div className="h-4 bg-[#2a2313] w-[90%] mx-auto mt-2 rounded-t-sm shadow-xl"></div>
                         <div className="h-16 bg-[#1a1614] border-x border-[#3a301a] w-[80%] mx-auto"></div>
                      </div>

                   </div>
                </div>
             ))}
          </div>
       </div>

       {/* Education Wing */}
       <div>
          <h3 className="font-serif text-2xl text-[#b59e66] text-center mb-16 italic font-light">
             - Academic Archives -
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
             {education.map((edu, i) => (
                <div key={i} className="flex flex-col items-center group">
                   
                   {/* Framed Diploma */}
                   <div className="relative p-4 bg-[#8b6f3c] bg-gradient-to-br from-[#aa771c] to-[#604207] shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-6 max-w-sm w-full">
                      <div className="absolute -inset-1 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                      
                      <div className="bg-[#f4ebd0] p-6 text-center border-2 border-[#d0b47a] shadow-inner relative overflow-hidden">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-60 mix-blend-multiply"></div>
                         
                         <div className="relative z-10">
                            <h4 className="font-serif text-[#2a2313] font-black text-lg uppercase mb-2 border-b border-[#2a2313]/20 pb-2">{edu.degree}</h4>
                            <p className="font-serif text-[#41361c] italic text-sm">{edu.school}</p>
                         </div>
                      </div>
                   </div>

                   {/* Museum Plaque with DATES */}
                   <div className="bg-gradient-to-b from-[#b8953f] to-[#7c6328] p-1 shadow-lg w-64 relative">
                      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#3a2e12]"></div>
                      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#3a2e12]"></div>
                      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-[#3a2e12]"></div>
                      <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#3a2e12]"></div>
                      
                      <div className="bg-[#15120f] p-2 text-center">
                         <div className="font-serif text-[#d4af37] text-[10px] tracking-widest uppercase">
                            Acquired: {edu.startDate} — {edu.endDate}
                         </div>
                      </div>
                   </div>

                </div>
             ))}
          </div>
       </div>

    </div>
  );
}
