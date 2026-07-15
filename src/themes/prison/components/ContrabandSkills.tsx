import React, { useState } from 'react';
import { Wrench, Award, ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function ContrabandSkills({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mb-16">
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Skills / Contraband */}
          <div>
             <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md">
                   Contraband Tools (Skills)
                </h2>
             </div>
             
             <div className="space-y-6">
                {skills.map((skillGroup, i) => (
                   <div key={i} className="border-2 border-white/30 p-4 bg-white/5 backdrop-blur-sm">
                      <h3 className="text-cyan-300 font-bold uppercase tracking-wider mb-3 text-sm border-b border-white/20 pb-2">
                         {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {skillGroup.items.map((skill: string, j: number) => (
                            <span key={j} className="px-2 py-1 bg-white/20 text-white font-mono text-xs uppercase shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
                               {skill}
                            </span>
                         ))}
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Certifications / Official Pardons */}
          <div>
             <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-white" />
                <h2 className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-md">
                   Official Pardons (Certs)
                </h2>
             </div>
             
             <div className="space-y-4">
                {(showAllCerts ? certifications : certifications.slice(0, 6)).map((cert, i) => (
                   <div key={i} className="border-2 border-dashed border-red-500/50 p-4 bg-red-900/20 backdrop-blur-sm relative group overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                         Verified
                      </div>
                      <h3 className="text-white font-black text-lg pr-12">{cert.name}</h3>
                      <div className="text-red-300 font-bold text-xs uppercase tracking-widest mb-4">
                         Issued by: {cert.issuer} | {cert.date}
                      </div>
                      
                      {/* Explicit Interactive Links */}
                      <div className="flex gap-4 border-t border-red-500/30 pt-3">
                         {(cert.url || cert.fileUrl) && (
                           <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-cyan-300 hover:text-white transition-colors text-xs font-bold uppercase">
                              <ExternalLink className="w-4 h-4" /> View Credential
                           </a>
                         )}
                         
                      </div>
                   </div>
                ))}
                
                {certifications.length > 6 && (
                   <button 
                     onClick={() => setShowAllCerts(!showAllCerts)}
                     className="w-full mt-4 py-3 border-2 border-red-500/50 bg-red-900/10 hover:bg-red-900/30 text-red-300 font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
                   >
                     {showAllCerts ? (
                        <>Hide Additional Pardons <ChevronUp className="w-4 h-4" /></>
                     ) : (
                        <>View {certifications.length - 6} More Pardons <ChevronDown className="w-4 h-4" /></>
                     )}
                   </button>
                )}
             </div>
          </div>
          
       </div>
    </div>
  );
}
