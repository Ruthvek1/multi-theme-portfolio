import React, { useState } from 'react';
import { Award, Zap, ExternalLink, Download } from 'lucide-react';

export default function PassportStamps({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-8 border border-gray-200">
       
       {/* Certifications as TSA PreCheck / First Class Lounge Passes */}
       <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 text-[#1A2530]">
             <div className="bg-yellow-100 p-3 rounded-full"><Award className="w-6 h-6 text-yellow-600" /></div>
             <h3 className="text-xl font-black uppercase tracking-widest">Clearances (Certs)</h3>
          </div>
          
          <div className="space-y-4">
             {(showAllCerts ? certifications : certifications?.slice(0, 5))?.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-black text-[#1A2530] border-2 border-[#1A2530] -rotate-12 shadow-sm">
                         {cert.issuer?.substring(0, 2).toUpperCase() || 'OK'}
                      </div>
                      <div>
                         <h4 className="font-bold text-[#1A2530]">{cert.name}</h4>
                         <div className="text-xs text-gray-500 font-semibold">{cert.issuer}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      {cert.url ? (
                         <a aria-label="Link" href={cert.url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-blue-600 hover:text-white hover:bg-blue-600 transition-colors uppercase tracking-widest border-2 border-blue-600 px-2 py-1 rounded">
                            View File
                         </a>
                      ) : cert.fileUrl ? (
                         <a aria-label="Link" href={cert.fileUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-blue-600 hover:text-white hover:bg-blue-600 transition-colors uppercase tracking-widest border-2 border-blue-600 px-2 py-1 rounded flex items-center gap-1">
                            <Download className="w-3 h-3" /> Download
                         </a>
                      ) : null}
                      <div className="text-xs font-black text-green-600 uppercase tracking-widest border-2 border-green-600 px-2 py-1 rounded rotate-3">
                         CLEARED
                      </div>
                   </div>
                </div>
             ))}
             
             {certifications && certifications.length > 5 && (
                <button
                  onClick={() => setShowAllCerts(!showAllCerts)}
                  className="w-full mt-4 py-3 bg-gray-100 hover:bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg text-[#1A2530] font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                >
                  {showAllCerts ? 'HIDE ADDITIONAL CLEARANCES' : `VIEW ${certifications.length - 5} MORE CLEARANCES`}
                </button>
             )}
          </div>
       </div>

       {/* Skills as Baggage Tags */}
       <div>
          <div className="flex items-center gap-3 mb-6 text-[#1A2530]">
             <div className="bg-purple-100 p-3 rounded-full"><Zap className="w-6 h-6 text-purple-600" /></div>
             <h3 className="text-xl font-black uppercase tracking-widest">Baggage Claim (Skills)</h3>
          </div>

          <div className="flex flex-wrap gap-3">
             {skills?.flatMap(group => group.items).map((skillName, i) => (
                <div key={i} className="group relative">
                   <div className="bg-white border-2 border-gray-300 px-4 py-2 rounded-r-lg rounded-l-3xl shadow-sm flex items-center gap-2 hover:border-[#1A2530] transition-colors">
                      <div className="w-3 h-3 rounded-full bg-gray-200 shadow-inner"></div>
                      <span className="font-bold text-gray-700 uppercase tracking-wider text-sm">{skillName}</span>
                   </div>
                   {/* Tag string */}
                   <div className="absolute top-1/2 left-0 w-8 h-[2px] bg-gray-300 -translate-x-full -translate-y-1/2 group-hover:bg-[#1A2530] transition-colors"></div>
                </div>
             ))}
          </div>
       </div>

    </div>
  );
}
