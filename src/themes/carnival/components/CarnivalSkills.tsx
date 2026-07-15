import React from 'react';
import { Target, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CarnivalSkills({ skills, certifications }: { skills: any[], certifications: any[] }) {
  
  return (
    <div className="py-24 relative w-full overflow-hidden bg-[#86efac]" style={{ backgroundImage: 'radial-gradient(#4ade80 2px, transparent 2px)', backgroundSize: '40px 40px' }}>
       
       {/* Bright Paved Plaza for the Midway */}
       <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[85%] bg-white opacity-95 border-y-[16px] border-[#e2e8f0] shadow-[0_0_50px_rgba(255,255,255,0.8)] skew-y-2 z-0">
           {/* Paving stones pattern */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(90deg, #94a3b8 2px, transparent 2px), linear-gradient(#94a3b8 2px, transparent 2px)', backgroundSize: '60px 60px' }}></div>
       </div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
           
           <div className="w-full flex justify-center mb-16 relative">
               <div className="bg-white border-4 border-[#3b82f6] px-10 py-4 flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transform -rotate-2 rounded-[30px]">
                   <Target className="w-10 h-10 text-[#f43f5e]" />
                   <h2 className="font-sans text-[#1e3a8a] text-3xl md:text-5xl uppercase tracking-[0.2em] font-black">
                       Midway Games
                   </h2>
                   <Trophy className="w-10 h-10 text-[#f59e0b]" />
               </div>
           </div>

           {/* Game Booths */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
               
               {skills.map((skillGroup, idx) => {
                   const colors = [
                       { primary: 'bg-[#f43f5e]', border: 'border-[#be123c]', light: 'bg-[#fb7185]', text: 'text-[#881337]' },
                       { primary: 'bg-[#3b82f6]', border: 'border-[#1d4ed8]', light: 'bg-[#60a5fa]', text: 'text-[#1e3a8a]' },
                       { primary: 'bg-[#10b981]', border: 'border-[#047857]', light: 'bg-[#34d399]', text: 'text-[#064e3b]' },
                       { primary: 'bg-[#8b5cf6]', border: 'border-[#6d28d9]', light: 'bg-[#a78bfa]', text: 'text-[#4c1d95]' },
                   ];
                   const color = colors[idx % colors.length];

                   return (
                       <div key={skillGroup.category} className="relative mt-16 group hover:-translate-y-2 transition-transform duration-300">
                           
                           {/* Floating balloons behind the tent */}
                           <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3 + idx, repeat: Infinity }} className={`absolute -top-16 -left-4 w-12 h-16 rounded-full ${color.light} shadow-md -z-10 opacity-80`}></motion.div>
                           <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4 + idx, repeat: Infinity }} className={`absolute -top-20 -right-2 w-14 h-16 rounded-full ${color.primary} shadow-md -z-10 opacity-90`}></motion.div>

                           {/* Booth Canopy (Striped) */}
                           <div className="absolute -top-12 left-0 right-0 h-16 flex overflow-hidden rounded-t-3xl z-20 shadow-[0_10px_20px_rgba(0,0,0,0.15)] border-4 border-white">
                               {Array.from({length: 10}).map((_, i) => (
                                   <div key={i} className={`h-full flex-1 ${i % 2 === 0 ? color.primary : 'bg-white'}`}></div>
                               ))}
                           </div>
                           
                           {/* Booth Scalloped Edge */}
                           <div className="absolute -top-1 left-0 right-0 h-8 flex z-20 px-1">
                               {Array.from({length: 10}).map((_, i) => (
                                   <div key={`scallop-${i}`} className={`h-full flex-1 rounded-b-full ${i % 2 === 0 ? color.primary : 'bg-white'} shadow-md border-b-2 border-x border-gray-200/50`}></div>
                               ))}
                           </div>

                           {/* Booth Structure */}
                           <div className={`w-full bg-white border-x-[12px] border-b-[24px] ${color.border} pt-16 pb-8 px-6 relative z-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col items-center h-full rounded-b-xl`}>
                               
                               {/* Sign */}
                               <div className={`${color.light} ${color.text} font-sans font-black uppercase text-xl px-6 py-3 border-4 border-white rounded-full mb-8 shadow-md transform -rotate-2 group-hover:rotate-0 transition-transform`}>
                                   {skillGroup.category}
                               </div>

                               {/* Game "Targets" (Skills) */}
                               <div className="flex flex-wrap justify-center gap-3">
                                   {skillGroup.items.map((skill: string) => (
                                       <span key={skill} className="bg-gray-100 border-2 border-gray-300 text-gray-700 font-sans font-bold text-sm uppercase px-4 py-1.5 rounded-full shadow-sm hover:bg-yellow-100 hover:border-yellow-400 hover:text-yellow-700 transition-colors cursor-crosshair">
                                           {skill}
                                       </span>
                                   ))}
                               </div>

                               {/* Counter / Desk */}
                               <div className={`absolute bottom-[-24px] left-[-12px] right-[-12px] h-10 ${color.primary} border-y-4 border-white rounded-md shadow-lg`}></div>
                           </div>
                       </div>
                   )
               })}
           </div>

           {/* Certifications as Shooting Gallery Targets */}
           <div className="w-full flex justify-center mt-32 mb-16 relative">
               <div className="bg-white border-4 border-[#3b82f6] px-10 py-4 flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.1)] transform rotate-2 rounded-[30px]">
                   <Target className="w-10 h-10 text-[#f43f5e]" />
                   <h2 className="font-sans text-[#1e3a8a] text-3xl md:text-5xl uppercase tracking-[0.2em] font-black">
                       Shooting Gallery
                   </h2>
                   <Target className="w-10 h-10 text-[#f43f5e]" />
               </div>
           </div>

           <div className="bg-[#fcd34d] border-8 border-[#d97706] rounded-3xl p-8 lg:p-12 shadow-[inset_0_20px_50px_rgba(0,0,0,0.1)] mb-16 relative z-20">
               {/* Decorative Awning for Gallery */}
               <div className="absolute -top-12 left-0 right-0 h-12 flex overflow-hidden rounded-t-2xl z-20 shadow-lg border-x-8 border-t-8 border-[#d97706]">
                   {Array.from({length: 20}).map((_, i) => (
                       <div key={`awning-${i}`} className={`h-full flex-1 ${i % 2 === 0 ? 'bg-[#f43f5e]' : 'bg-white'}`}></div>
                   ))}
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-16 gap-x-8 mt-8">
                   {certifications.map((cert) => (
                       <div key={cert.id} className="relative group flex flex-col items-center text-center">
                           
                           {/* Target Stand */}
                           <div className="w-3 h-20 bg-[#b45309] absolute -bottom-10 -z-10 shadow-md"></div>
                           <div className="w-12 h-3 bg-[#92400e] absolute -bottom-10 rounded-t-sm -z-10"></div>
                           
                           {/* The Target (Certificate) */}
                           <div className="bg-white border-4 border-[#f43f5e] rounded-full w-40 h-40 md:w-48 md:h-48 flex flex-col items-center justify-center p-2 md:p-4 shadow-xl transform transition-transform duration-300 group-hover:rotate-[20deg] group-hover:scale-110 cursor-crosshair relative overflow-hidden">
                               
                               {/* Bullseye rings */}
                               <div className="absolute inset-2 border-2 border-red-200 rounded-full -z-10"></div>
                               <div className="absolute inset-6 md:inset-8 border-2 border-red-200 rounded-full -z-10"></div>
                               <div className="absolute inset-10 md:inset-14 bg-red-50 rounded-full -z-10"></div>
                               
                               <h3 className="font-sans font-black text-[#1e3a8a] text-[10px] md:text-sm uppercase leading-tight mb-1 drop-shadow-sm">
                                   {cert.title}
                               </h3>
                               <p className="font-sans text-[#f43f5e] font-bold text-[8px] md:text-[10px] uppercase tracking-widest mb-2 line-clamp-1">
                                   {cert.issuer}
                               </p>
                               
                               {(cert.url || cert.fileUrl) && (
                                   <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="mt-1 md:mt-2 bg-[#f43f5e] text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full font-sans font-black uppercase tracking-widest text-[8px] md:text-[10px] shadow-md hover:bg-[#be123c] transition-colors">
                                       Aim & View
                                   </a>
                               )}
                           </div>
                       </div>
                   ))}
               </div>
               
               {/* Gallery Counter Base */}
               <div className="w-full bg-[#d97706] h-8 rounded-full mt-16 border-b-4 border-[#b45309] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.2)]">
                   <div className="w-[98%] h-2 bg-black/20 rounded-full"></div>
               </div>
           </div>

       </div>
    </div>
  );
}
