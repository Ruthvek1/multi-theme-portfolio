import React, { useState } from 'react';
import { ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function AttributesHall({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);

  return (
    <div className="py-32 px-4 md:px-12 max-w-7xl mx-auto relative z-20 border-t border-[#d4af37]/20">
       
       <div className="text-center mb-24">
          <h2 className="font-serif text-4xl text-[#d4af37] font-light tracking-widest uppercase mb-4">
             Hall of Attributes
          </h2>
          <div className="w-24 h-[1px] bg-[#d4af37] mx-auto opacity-50"></div>
       </div>

       {/* Skills as Marble Pillars */}
       <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {skills.map((skillGroup, i) => (
                <div key={i} className="flex flex-col items-center group">
                   
                   {/* Column Capital (Top) */}
                   <div className="w-full h-8 bg-[#e4dac4] border-y-2 border-[#b5a585] shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative z-10"
                        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }}>
                   </div>
                   
                   {/* Column Shaft */}
                   <div className="w-[85%] bg-[#f5efe1] border-x border-[#c2b69e] flex-1 min-h-[300px] flex flex-col items-center py-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 15px, rgba(0,0,0,0.03) 15px, rgba(0,0,0,0.03) 16px), url("https://www.transparenttextures.com/patterns/white-marble.png")' }}>
                      
                      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#e4dac4] to-transparent mix-blend-multiply opacity-50"></div>
                      
                      <h3 className="font-serif text-[#41361c] text-lg font-bold uppercase tracking-widest text-center px-4 mb-8 border-b-2 border-[#d4af37]/50 pb-2 relative z-10">
                         {skillGroup.category}
                      </h3>
                      
                      <div className="flex flex-col gap-4 text-center px-2 relative z-10">
                         {skillGroup.items.map((skill: string, j: number) => (
                            <span key={j} className="font-serif text-[#2a2313] text-sm uppercase tracking-wider font-medium">
                               {skill}
                            </span>
                         ))}
                      </div>
                   </div>

                   {/* Column Base */}
                   <div className="w-full h-12 bg-[#dcd1ba] border-t-2 border-[#b5a585] shadow-[0_-5px_15px_rgba(0,0,0,0.2)] relative z-10 flex items-center justify-center"
                        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/white-marble.png")' }}>
                      <div className="w-[90%] h-4 border border-[#a8997a]/30 shadow-inner"></div>
                   </div>

                </div>
             ))}
          </div>
       </div>

       {/* Certifications as Glass Display Cases */}
       <div>
          <h3 className="font-serif text-2xl text-[#b59e66] text-center mb-16 italic font-light">
             - Certified Relics -
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
             {(showAllCerts ? certifications : certifications.slice(0, 6)).map((cert, i) => (
                <div key={i} className="flex flex-col items-center group">
                   
                   {/* Glass Box */}
                   <div className="w-full bg-[#15120f] border-2 border-[#3a301a] p-8 relative shadow-2xl overflow-hidden min-h-[250px] flex flex-col items-center justify-center">
                      {/* Glass reflections */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-32 h-64 bg-white/5 rotate-45 transform origin-top-right pointer-events-none"></div>
                      
                      {/* Inner Spotlight */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-yellow-500/10 blur-2xl rounded-full mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                      <div className="relative z-10 text-center flex flex-col items-center">
                         <h4 className="font-serif text-[#e4dac4] text-xl font-bold uppercase tracking-wide mb-2">
                            {cert.name}
                         </h4>
                         <p className="font-serif text-[#a8997a] italic text-sm mb-2">
                            {cert.issuer}
                         </p>
                         <p className="font-serif text-[#d4af37] text-xs tracking-widest uppercase mb-8">
                            Issued: {cert.date}
                         </p>
                         
                         <div className="flex gap-4">
                            {(cert.url || cert.fileUrl) && (
                               <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-[#d4af37]/50 text-[#d4af37] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] hover:text-[#111] transition-colors">
                                  <ExternalLink className="w-3 h-3" /> Inspect Relic
                               </a>
                            )}
                            
                         </div>
                      </div>
                   </div>

                   {/* Plaque Base */}
                   <div className="w-[90%] h-6 bg-[#2a2313] rounded-b-sm shadow-xl border-x border-b border-[#15120f]"></div>

                </div>
             ))}
          </div>
          
          {certifications.length > 6 && (
             <div className="flex justify-center mt-16">
                <button 
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="px-8 py-3 border border-[#d4af37]/50 text-[#d4af37] font-serif uppercase tracking-widest text-sm hover:bg-[#d4af37]/10 transition-colors flex items-center gap-2"
                >
                  {showAllCerts ? (
                     <>Conceal Relics <ChevronUp className="w-4 h-4" /></>
                  ) : (
                     <>View {certifications.length - 6} More Relics <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
             </div>
          )}
       </div>

    </div>
  );
}
