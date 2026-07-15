import React, { useState } from 'react';
import { ExternalLink, Download, FileSignature } from 'lucide-react';

export default function SkillAssets({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  // Helper for masking tape
  const Tape = ({ className }: { className?: string }) => (
    <div className={`absolute w-12 h-4 bg-white/40 border border-white/60 shadow-sm backdrop-blur-sm z-20 ${className}`}></div>
  );

  return (
    <div className="max-w-6xl mx-auto mb-32 relative z-20">
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Skills as Yellow Legal Pads */}
          <div className="relative flex flex-col gap-8 pt-12">
             <div className="absolute top-0 left-0 font-['Courier_New'] font-bold text-3xl bg-black text-white px-2 py-1 rotate-[-2deg] shadow-lg border-2 border-white z-40">
                Suspect Capabilities
             </div>
             
             {skills.map((skillGroup, i) => {
                const rotate = i % 2 === 0 ? `rotate-[${(i+1)*2}deg]` : `rotate-[-${(i+2)*2}deg]`;
                const align = i % 2 === 0 ? 'self-start' : 'self-end';
                const zIndex = 10 - i;
                
                return (
                   <div key={i} className={`relative w-full md:w-80 transition-transform hover:scale-105 hover:z-30 shadow-2xl ${rotate} ${align}`} style={{ zIndex }}>
                      
                      <Tape className="-top-2 left-1/2 -translate-x-1/2 rotate-[-3deg]" />
                      
                      {/* Legal Pad Background */}
                      <div className="bg-[#fefce8] pt-8 pb-4 px-6 border-l-4 border-red-500 shadow-inner"
                           style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #93c5fd 24px)', minHeight: '200px' }}>
                         
                         <h3 className="font-['Courier_New'] font-black uppercase text-lg mb-4 text-black underline decoration-2 decoration-red-600">
                            {skillGroup.category}
                         </h3>
                         
                         <ul className="font-['Caveat',_cursive] text-2xl text-blue-900 leading-[24px]">
                            {skillGroup.items.map((skill: string, j: number) => (
                               <li key={j} className="pl-4">- {skill}</li>
                            ))}
                         </ul>
                      </div>
                   </div>
                );
             })}
          </div>

          {/* Certifications as Glossy Photos with Evidence Tags */}
          <div>
             <div className="font-['Courier_New'] font-bold text-3xl bg-black text-white px-2 py-1 rotate-1 shadow-lg inline-block mb-12 border-2 border-white">
                Physical Evidence
             </div>
             
             <div className="space-y-16">
                {(showAllCerts ? certifications : certifications.slice(0, 4)).map((cert, i) => (
                   <div key={i} className={`relative flex transition-transform hover:scale-105 hover:z-30 ${i % 2 === 0 ? 'rotate-2' : 'rotate-[-2deg]'}`}>
                      
                      {/* Glossy Photo containing Cert info */}
                      <div className="bg-white p-2 pb-12 shadow-2xl border border-gray-300 w-full relative z-10">
                         <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none"></div> {/* Gloss effect */}
                         
                         <div className="bg-gray-900 w-full aspect-video flex flex-col items-center justify-center border border-gray-500 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')] opacity-30 mix-blend-overlay"></div>
                            <FileSignature className="w-16 h-16 text-gray-500 mb-2 opacity-50" />
                            <div className="font-serif text-white/50 text-sm tracking-[0.3em]">DOCUMENT SCANNED</div>
                         </div>
                         
                         <h3 className="font-['Courier_New'] font-black text-xl mt-4 px-2 uppercase text-black">{cert.name}</h3>
                         <div className="font-['Caveat',_cursive] text-blue-800 text-xl px-2 mt-1">
                            Issued by {cert.issuer} on {cert.date}
                         </div>
                      </div>

                      {/* Evidence Tag attached via string */}
                      <div className="absolute -right-8 top-12 z-20 hidden md:block">
                         {/* String connecting photo to tag */}
                         <div className="absolute -left-6 top-4 w-8 h-[2px] bg-gray-400 rotate-12"></div>
                         
                         <div className="bg-[#e4d5b7] border border-[#a8997d] p-3 shadow-lg w-40 font-['Courier_New'] rotate-[15deg]">
                            <div className="border-b border-black/40 pb-1 mb-2 text-center text-[10px] font-bold text-black">
                               POLICE DEPT.<br/>EVIDENCE TAG
                            </div>
                            
                            <div className="flex flex-col gap-3 mt-4">
                               {(cert.url || cert.fileUrl) && (
                                 <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="bg-black text-white text-[10px] font-bold uppercase py-1 px-2 text-center hover:bg-gray-800 flex items-center justify-center gap-1">
                                    <ExternalLink className="w-3 h-3" /> View Source
                                 </a>
                               )}
                               
                            </div>
                         </div>
                      </div>

                      {/* Mobile view tags (inline) */}
                      <div className="md:hidden absolute bottom-2 right-2 flex gap-2 z-20">
                         {(cert.url || cert.fileUrl) && (
                           <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="bg-black text-white p-2 rounded-full shadow-md">
                              <ExternalLink className="w-4 h-4" />
                           </a>
                         )}
                         
                      </div>

                   </div>
                ))}

                {certifications.length > 4 && (
                   <button 
                     onClick={() => setShowAllCerts(!showAllCerts)}
                     className="w-full py-4 mt-8 bg-[#e4d5b7] border-2 border-[#a8997d] shadow-lg font-['Courier_New'] font-bold text-xl uppercase transition-transform hover:scale-105 text-black"
                   >
                     {showAllCerts ? 'Close Evidence Files' : `Open ${certifications.length - 4} More Evidence Files`}
                   </button>
                )}
             </div>
          </div>
          
       </div>
    </div>
  );
}
