import React, { useState } from 'react';
import { ExternalLink, Download } from 'lucide-react';

export default function MinecraftSkills({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  return (
    <div className="py-24 relative w-full bg-[#1c1c1c] overflow-hidden">
       
       {/* Deepslate Background Pattern */}
       <div 
           className="absolute inset-0 opacity-30 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%232c2c2c"/><rect x="32" width="32" height="32" fill="%231a1a1a"/><rect y="32" width="32" height="32" fill="%231a1a1a"/><rect x="32" y="32" width="32" height="32" fill="%23222222"/></svg>')`,
               backgroundSize: '64px 64px'
           }}
       ></div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
           
           <div className="text-center mb-16 bg-black/60 p-6 inline-block mx-auto border-4 border-[#3a3a3a] shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
               <h2 className="font-pixel text-white text-2xl md:text-3xl text-shadow-pixel">
                   Crafting Table
               </h2>
           </div>

           {/* Skills as Crafting Grids */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
               {skills.map((skillGroup, idx) => (
                   <div key={skillGroup.category} className="bg-[#c6c6c6] border-b-8 border-r-8 border-t-4 border-l-4 border-b-[#555] border-r-[#555] border-t-[#fff] border-l-[#fff] p-8">
                       
                       <h3 className="font-pixel text-[#333] text-lg mb-6">
                           {skillGroup.category}
                       </h3>
                       
                       {/* 3x3 Grid Layout simulation */}
                       <div className="flex flex-wrap gap-4">
                           {skillGroup.items.map((skill: string) => (
                               <div key={skill} className="bg-[#8b8b8b] border-b-4 border-r-4 border-t-4 border-l-4 border-b-[#fff] border-r-[#fff] border-t-[#373737] border-l-[#373737] px-4 py-3 flex items-center justify-center hover:bg-[#a0a0a0] transition-colors cursor-default group relative">
                                   <span className="font-sans font-bold text-black text-sm">{skill}</span>
                                   
                                   {/* Tooltip */}
                                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black/90 border-2 border-[#5500aa] p-2 hidden group-hover:block z-20">
                                        <span className="font-pixel text-xs text-[#a800a8] text-shadow-sm">{skill}</span>
                                   </div>
                               </div>
                           ))}
                       </div>

                   </div>
               ))}
           </div>

           <div className="text-center mb-16 bg-black/60 p-6 inline-block mx-auto border-4 border-[#3a3a3a] shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
               <h2 className="font-pixel text-yellow-400 text-2xl md:text-3xl text-shadow-sm">
                   Advancements
               </h2>
           </div>

           {/* Certifications as Advancements */}
           <div className="flex flex-col gap-6 max-w-4xl mx-auto">
               {(showAllCerts ? certifications : certifications.slice(0, 6)).map((cert) => (
                   <div key={cert.id} className="bg-[#212121] border-2 border-yellow-500 p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 hover:bg-[#2a2a2a] transition-colors">
                       
                       <div className="flex items-center gap-6">
                           {/* Advancement Icon */}
                           <div className="w-16 h-16 bg-[#000] border-2 border-yellow-600 flex items-center justify-center shrink-0">
                               <div className="w-8 h-8 bg-yellow-400 rotate-45"></div>
                           </div>

                           <div className="text-center md:text-left">
                               <p className="font-pixel text-yellow-500 text-xs mb-2">Advancement Made!</p>
                               <h4 className="font-pixel text-white text-sm md:text-base leading-tight mb-2">
                                   {cert.title}
                               </h4>
                               <p className="text-gray-400 font-sans text-sm">
                                   {cert.issuer} • {cert.date}
                               </p>
                           </div>
                       </div>

                       <div className="flex items-center gap-4 shrink-0">
                           {(cert.url || cert.fileUrl) && (
                               <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="bg-[#7d7d7d] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] px-4 py-2 hover:bg-[#8d8d8d] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all">
                                   <span className="font-pixel text-white text-[10px]">View</span>
                               </a>
                           )}
                           
                       </div>

                   </div>
               ))}
           </div>
           
           {certifications.length > 6 && (
               <div className="flex justify-center mt-12">
                   <button 
                     onClick={() => setShowAllCerts(!showAllCerts)}
                     className="bg-[#7d7d7d] border-b-4 border-r-4 border-t-2 border-l-2 border-b-[#404040] border-r-[#404040] border-t-[#c6c6c6] border-l-[#c6c6c6] px-8 py-4 hover:bg-[#8d8d8d] active:border-b-2 active:border-r-2 active:border-t-4 active:border-l-4 transition-all"
                   >
                     <span className="font-pixel text-white text-sm">
                       {showAllCerts ? 'Hide Advancements' : `View ${certifications.length - 6} More Advancements`}
                     </span>
                   </button>
               </div>
           )}

       </div>
    </div>
  );
}
