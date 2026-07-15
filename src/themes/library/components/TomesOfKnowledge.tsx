import React, { useState } from 'react';
import { ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function TomesOfKnowledge({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);

  // Different leather colors for the books
  const bookColors = [
      'bg-[#3d1e11]', // Dark brown
      'bg-[#4a0e0e]', // Deep red
      'bg-[#1a2e1a]', // Dark green
      'bg-[#1c2331]', // Deep blue
      'bg-[#2d241c]', // Muddy brown
  ];

  return (
    <div className="py-32 relative z-20 max-w-7xl mx-auto px-4">
       
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
           
           {/* Skills Section - Book Stacks */}
           <div className="relative z-20">
               <div className="text-center mb-16">
                   <h2 className="font-serif text-4xl text-[#d4af37] tracking-widest uppercase font-bold drop-shadow-lg mb-4">
                       The Grimoire of Skills
                   </h2>
                   <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8b4513] to-transparent mx-auto"></div>
               </div>

               <div className="space-y-12">
                   {skills.map((skillGroup, i) => (
                       <div key={skillGroup.category} className="relative group perspective-[1000px]">
                           {/* A Book */}
                           <div className={`relative w-full h-24 ${bookColors[i % bookColors.length]} rounded-l-md rounded-r-3xl shadow-[0_20px_30px_rgba(0,0,0,0.8),inset_0_5px_10px_rgba(255,255,255,0.1)] border-l-8 border-black/40 transform transition-transform duration-500 group-hover:translate-x-4 flex items-center`}>
                               
                               {/* Book Pages (Right Edge) */}
                               <div className="absolute right-1 top-1 bottom-1 w-8 bg-[#fdf3d8] rounded-r-2xl bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] shadow-[inset_4px_0_10px_rgba(0,0,0,0.5)] border-r border-[#d4af37]/50 flex flex-col justify-evenly py-2 overflow-hidden">
                                   {Array.from({ length: 8 }).map((_, j) => (
                                       <div key={j} className="h-px bg-[#8b4513]/20 w-full"></div>
                                   ))}
                               </div>

                               {/* Book Spine Details */}
                               <div className="absolute left-0 top-0 bottom-0 w-12 bg-black/20 border-r border-white/10 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.5)]"></div>
                               <div className="absolute left-2 top-2 bottom-2 w-8 border border-[#d4af37]/30 rounded-sm"></div>
                               
                               {/* Leather bands on spine */}
                               <div className="absolute left-0 w-12 h-2 top-4 bg-black/40 shadow-[0_2px_2px_rgba(0,0,0,0.5)]"></div>
                               <div className="absolute left-0 w-12 h-2 bottom-4 bg-black/40 shadow-[0_2px_2px_rgba(0,0,0,0.5)]"></div>

                               {/* Content on the cover */}
                               <div className="ml-20 pr-16 text-center w-full relative z-10">
                                   <h4 className="font-serif text-[#d4af37] text-xl font-bold uppercase tracking-[0.2em] mb-1 drop-shadow-md">
                                       Volume {i + 1}: {skillGroup.category}
                                   </h4>
                                   <p className="font-serif text-white/60 text-sm italic line-clamp-1">
                                       {skillGroup.items.join(' ❧ ')}
                                   </p>
                               </div>

                               {/* Tooltip on hover */}
                               <div className="absolute top-1/2 -translate-y-1/2 left-[105%] w-64 bg-[#2a1b0e] border border-[#d4af37]/40 p-4 rounded shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                                   <h5 className="font-serif text-[#d4af37] text-center mb-2 border-b border-[#8b4513]/30 pb-2">Contents</h5>
                                   <div className="flex flex-wrap gap-2 justify-center">
                                       {skillGroup.items.map((skill: string) => (
                                           <span key={skill} className="text-[#fdf3d8] text-xs font-serif bg-black/40 px-2 py-1 rounded border border-[#8b4513]/30">
                                               {skill}
                                           </span>
                                       ))}
                                   </div>
                               </div>

                           </div>
                       </div>
                   ))}
               </div>
           </div>

           {/* Certifications Section - Royal Decrees */}
           <div className="relative z-10">
               <div className="text-center mb-16">
                   <h2 className="font-serif text-4xl text-[#d4af37] tracking-widest uppercase font-bold drop-shadow-lg mb-4">
                       Royal Decrees
                   </h2>
                   <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#8b4513] to-transparent mx-auto"></div>
               </div>

               <div className="space-y-16">
                   {(showAllCerts ? certifications : certifications.slice(0, 3)).map((cert) => (
                       <div key={cert.id} className="relative bg-[#fdf3d8] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.6)] before:absolute before:inset-2 before:border-2 before:border-[#8b4513]/30">
                           
                           {/* Wax seal */}
                           <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#8b0000] rounded-full flex flex-col items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_4px_10px_rgba(255,255,255,0.2)] z-10">
                               <div className="absolute inset-1 rounded-full border-2 border-[#5a0000] opacity-50"></div>
                               <div className="font-serif text-[#fdf3d8] font-bold text-xs tracking-widest drop-shadow-md text-center leading-none">
                                   SEAL<br/>OF<br/>MERIT
                               </div>
                               {/* Ribbon */}
                               <div className="absolute -bottom-8 right-4 w-4 h-12 bg-[#5a0000] -z-10 shadow-lg transform rotate-12"></div>
                               <div className="absolute -bottom-8 left-4 w-4 h-12 bg-[#5a0000] -z-10 shadow-lg transform -rotate-12"></div>
                           </div>

                           <div className="text-center mb-6 pt-4">
                               <h3 className="font-serif text-[#4a3018] text-2xl font-bold mb-2">
                                   {cert.title}
                               </h3>
                               <p className="font-serif text-[#8b4513] text-lg italic">
                                   {cert.issuer} • {cert.date}
                               </p>
                           </div>

                           <div className="flex justify-center gap-6 mt-8">
                               {(cert.url || cert.fileUrl) && (
                                   <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2 border border-[#8b4513] text-[#8b4513] hover:bg-[#8b4513] hover:text-[#fdf3d8] transition-colors font-serif uppercase tracking-widest text-xs font-bold bg-[#fdf3d8]">
                                       <ExternalLink className="w-4 h-4" /> Inspect Decree
                                   </a>
                               )}
                               
                           </div>
                       </div>
                   ))}
               </div>

               {certifications.length > 3 && (
                   <div className="flex justify-center mt-16">
                       <button 
                         onClick={() => setShowAllCerts(!showAllCerts)}
                         className="px-8 py-3 bg-[#110a05] border border-[#d4af37]/50 text-[#d4af37] font-serif uppercase tracking-widest text-sm hover:bg-[#2a1b0e] transition-colors flex items-center gap-2 shadow-lg"
                       >
                         {showAllCerts ? (
                            <>Seal Decrees <ChevronUp className="w-4 h-4" /></>
                         ) : (
                            <>Unroll {certifications.length - 3} More Decrees <ChevronDown className="w-4 h-4" /></>
                         )}
                       </button>
                   </div>
               )}
           </div>

       </div>
    </div>
  );
}
