import React, { useState } from 'react';
import { Shield, Eye, Download, CheckSquare } from 'lucide-react';

export default function AssetCapabilities({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);

  return (
    <div className="bg-[#111] border border-[#33ff33]/30 shadow-lg shadow-black h-full flex flex-col">
       
       {/* Security Clearances (Certifications) */}
       <div className="p-6 border-b border-[#33ff33]/20">
          <div className="flex items-center gap-3 mb-6">
             <Shield className="w-6 h-6 text-[#33ff33]" />
             <h2 className="text-xl font-black tracking-widest">SECURITY CLEARANCES</h2>
          </div>
          
          <div className="space-y-4">
             {(showAllCerts ? certifications : certifications?.slice(0, 2))?.map((cert, i) => (
                <div key={i} className="bg-[#050505] border-l-4 border-[#33ff33] p-3 flex flex-col gap-2">
                   <div className="flex justify-between items-start">
                      <div>
                         <h4 className="font-bold text-white uppercase text-sm">{cert.name}</h4>
                         <div className="text-[10px] text-gray-500 tracking-widest mt-1">AUTHORITY: {cert.issuer.toUpperCase()}</div>
                      </div>
                      <CheckSquare className="w-4 h-4 text-[#33ff33]" />
                   </div>
                   
                   <div className="flex gap-2 mt-2">
                      {(cert.url || cert.fileUrl) && (
                         <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex-1 text-center text-[10px] font-bold tracking-widest py-1.5 border border-[#33ff33]/50 text-[#33ff33] hover:bg-[#33ff33] hover:text-black transition-colors flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" /> VERIFY
                         </a>
                      )}
                      
                   </div>
                </div>
             ))}

             {certifications && certifications.length > 2 && (
               <button
                 onClick={() => setShowAllCerts(!showAllCerts)}
                 className="w-full mt-4 py-2 border border-[#33ff33]/30 hover:bg-[#33ff33]/10 text-[#33ff33] font-bold text-[10px] tracking-widest uppercase transition-colors"
               >
                 {showAllCerts ? 'HIDE CLEARANCES' : `ACCESS ${certifications.length - 2} MORE CLEARANCES`}
               </button>
             )}
          </div>
       </div>

       {/* Tactical Abilities (Skills) */}
       <div className="p-6 flex-1 bg-[#1a1a1a]/50">
          <div className="flex items-center gap-3 mb-6">
             <Eye className="w-6 h-6 text-[#33ff33]" />
             <h2 className="text-xl font-black tracking-widest">TACTICAL ABILITIES</h2>
          </div>

          <div className="space-y-6">
             {skills?.map((skillGroup, i) => (
                <div key={i}>
                   <h3 className="text-[#33ff33]/70 text-[10px] font-bold tracking-[0.3em] mb-3 uppercase border-b border-[#33ff33]/20 pb-1">
                      {skillGroup.category}
                   </h3>
                   <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skillName: string, j: number) => (
                         <div key={j} className="bg-black border border-[#33ff33]/40 px-2 py-1 text-xs text-gray-300 font-mono flex items-center gap-2 group hover:border-[#33ff33] transition-colors cursor-default">
                            <div className="w-1.5 h-1.5 bg-[#33ff33]/50 group-hover:bg-[#33ff33]"></div>
                            {skillName}
                         </div>
                      ))}
                   </div>
                </div>
             ))}
          </div>
       </div>

    </div>
  );
}
