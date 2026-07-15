import React, { useState } from 'react';
import { ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function ComicSkills({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  // Random comic colors for the skill bubbles
  const colors = ['bg-[#e62e2d]', 'bg-[#2986cc]', 'bg-[#ffea00]', 'bg-[#38761d]', 'bg-[#674ea7]'];

  return (
    <div className="py-20 relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
       
       {/* Skills (Superpowers) */}
       <div className="mb-32">
           <div className="w-full max-w-5xl mx-auto mb-16 text-center">
               <div className="inline-block bg-[#2986cc] border-8 border-black px-12 py-6 shadow-[16px_16px_0_rgba(0,0,0,1)] transform rotate-2">
                   <h2 className="font-black text-5xl md:text-7xl text-white uppercase tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>
                       Superpowers
                   </h2>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
               {skills.map((skillGroup, idx) => {
                   const color = colors[idx % colors.length];
                   const textColor = color === 'bg-[#ffea00]' ? 'text-black' : 'text-white';
                   const rot = idx % 2 === 0 ? '-rotate-2' : 'rotate-2';

                   return (
                       <div key={skillGroup.category} className={`relative bg-white border-8 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] p-8 transform ${rot} hover:scale-105 transition-transform duration-300`}>
                           
                           <h3 className={`inline-block ${color} ${textColor} border-4 border-black px-4 py-2 font-black text-2xl uppercase tracking-tighter mb-6 shadow-[4px_4px_0_rgba(0,0,0,1)] transform -skew-x-6`}>
                               {skillGroup.category}
                           </h3>
                           
                           <div className="flex flex-wrap gap-4">
                               {skillGroup.items.map((skill: string, i: number) => {
                                   const itemRot = i % 2 === 0 ? 'rotate-3' : '-rotate-3';
                                   return (
                                       <span key={skill} className={`bg-gray-100 border-4 border-black px-3 py-1 font-bold text-lg ${itemRot} shadow-[4px_4px_0_rgba(0,0,0,1)] hover:bg-[#ffea00] cursor-default transition-colors`}>
                                           {skill}
                                       </span>
                                   );
                               })}
                           </div>

                           {/* Little comic action star */}
                           <div className={`absolute -top-6 -right-6 ${color} border-4 border-black w-12 h-12 flex items-center justify-center transform rotate-45 shadow-[4px_4px_0_rgba(0,0,0,1)]`}>
                               <span className="font-black text-white text-xl transform -rotate-45">!</span>
                           </div>
                       </div>
                   );
               })}
           </div>
       </div>

       {/* Certifications (Collector's Editions) */}
       <div>
           <div className="w-full max-w-5xl mx-auto mb-16 text-center">
               <div className="inline-block bg-[#ffea00] border-8 border-black px-12 py-6 shadow-[16px_16px_0_rgba(0,0,0,1)] transform -rotate-2">
                   <h2 className="font-black text-5xl md:text-7xl text-black uppercase tracking-tighter" style={{ WebkitTextStroke: '2px white' }}>
                       Collector's Editions
                   </h2>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
               {(showAllCerts ? certifications : certifications.slice(0, 6)).map((cert, idx) => (
                   <div key={cert.id} className="relative bg-white border-8 border-black p-4 shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col items-center group">
                       
                       {/* Comic Cover Header */}
                       <div className="w-full bg-[#e62e2d] border-4 border-black text-white text-center font-black py-1 mb-4 uppercase tracking-widest text-sm shadow-[4px_4px_0_rgba(0,0,0,1)]">
                           Verified Issue #{idx + 1}
                       </div>

                       <div className="text-center mb-6 flex-1">
                           <h3 className="font-black text-2xl uppercase leading-tight mb-2">
                               {cert.title}
                           </h3>
                           <p className="font-bold text-gray-600 uppercase italic">
                               By {cert.issuer}
                           </p>
                           <div className="bg-[#ffea00] border-2 border-black inline-block px-3 py-1 font-bold text-sm mt-4 transform -skew-x-12">
                               {cert.date}
                           </div>
                       </div>

                       {/* Action Buttons */}
                       <div className="w-full flex flex-col gap-3 mt-auto">
                           {(cert.url || cert.fileUrl) && (
                               <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="w-full bg-[#2986cc] text-white border-4 border-black py-2 flex items-center justify-center gap-2 font-black uppercase shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_rgba(0,0,0,1)] transition-all">
                                   <ExternalLink className="w-5 h-5" strokeWidth={3} /> Verify
                               </a>
                           )}
                           
                       </div>

                       {/* CCA Badge (Comics Code Authority style) */}
                       <div className="absolute top-2 right-2 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center shadow-sm">
                           <span className="font-black text-[10px] text-center leading-none">C.C.A.<br/>APPROVED</span>
                       </div>
                   </div>
               ))}
           </div>
           
           {certifications.length > 6 && (
               <div className="flex justify-center mt-20">
                   <button 
                     onClick={() => setShowAllCerts(!showAllCerts)}
                     className="bg-[#e62e2d] text-white border-8 border-black px-12 py-4 font-black text-2xl uppercase tracking-tighter shadow-[12px_12px_0_rgba(0,0,0,1)] hover:bg-[#ffea00] hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all transform -skew-x-6 flex items-center gap-4"
                   >
                     {showAllCerts ? (
                        <>Close Vault <ChevronUp className="w-8 h-8" strokeWidth={4} /></>
                     ) : (
                        <>Open {certifications.length - 6} More Issues! <ChevronDown className="w-8 h-8" strokeWidth={4} /></>
                     )}
                   </button>
               </div>
           )}
       </div>

    </div>
  );
}
