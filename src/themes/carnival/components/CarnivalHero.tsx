import React from 'react';
import { Ticket, Star, Tent, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CarnivalHero({ personal }: { personal: any }) {
  return (
    <div className="relative min-h-[100vh] w-full flex flex-col justify-center items-center overflow-hidden bg-[#38bdf8] pt-12 pb-24 border-b-[16px] border-b-[#84cc16]">
       
       {/* Background: Bright Blue Sky with Sun and Clouds */}
       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           {/* Sun */}
           <div className="absolute top-12 left-12 w-32 h-32 bg-yellow-300 rounded-full shadow-[0_0_60px_rgba(253,224,71,0.8)] animate-[spin_60s_linear_infinite]">
               {/* Sun Rays */}
               {Array.from({length: 12}).map((_, i) => (
                   <div key={`ray-${i}`} className="absolute top-1/2 left-1/2 w-48 h-4 bg-yellow-200/50 -translate-y-1/2 origin-left" style={{ transform: `translateY(-50%) rotate(${i * 30}deg)` }}></div>
               ))}
           </div>
           
           {/* Animated Fluffy Clouds */}
           <motion.div 
               animate={{ x: [0, 2000] }}
               transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
               className="absolute top-20 -left-[200px] text-white/80"
           >
               <Cloud size={120} className="fill-current" />
           </motion.div>

           <motion.div 
               animate={{ x: [0, 2500] }}
               transition={{ duration: 180, repeat: Infinity, ease: "linear", delay: 20 }}
               className="absolute top-40 -left-[400px] text-white/60"
           >
               <Cloud size={160} className="fill-current" />
           </motion.div>
           
           <motion.div 
               animate={{ x: [0, -2000] }}
               transition={{ duration: 150, repeat: Infinity, ease: "linear", delay: 10 }}
               className="absolute top-10 -right-[300px] text-white/90 transform -scale-x-100"
           >
               <Cloud size={90} className="fill-current" />
           </motion.div>
       </div>

       {/* Main Entrance Gate Architecture */}
       <div className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center">
           
           {/* The Archway */}
           <div className="relative w-full flex flex-col items-center mb-8">
               
               {/* Colorful Bunting */}
               <div className="absolute -top-12 left-0 right-0 h-16 overflow-hidden pointer-events-none z-30">
                    <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full drop-shadow-md">
                        {Array.from({length: 10}).map((_, i) => {
                            const colors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
                            return (
                                <path key={`flag-${i}`} d={`M${i * 100} 0 L${(i * 100) + 50} 80 L${(i * 100) + 100} 0 Z`} fill={colors[i % colors.length]} />
                            )
                        })}
                    </svg>
               </div>

               {/* Cheerful Sign Board */}
               <div className="bg-white border-[8px] border-[#fbbf24] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] text-center relative z-20 w-[95%] md:w-[85%] rounded-[40px]">
                   {/* Festive Border dots */}
                   <div className="absolute inset-2 border-[4px] border-dotted border-[#fcd34d] opacity-50 rounded-[28px]"></div>
                   <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-[#f43f5e] shadow-md border-4 border-white flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current" /></div>
                   <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#3b82f6] shadow-md border-4 border-white flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current" /></div>
                   <div className="absolute -bottom-4 -left-4 w-10 h-10 rounded-full bg-[#10b981] shadow-md border-4 border-white flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current" /></div>
                   <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-[#f59e0b] shadow-md border-4 border-white flex items-center justify-center"><Star className="w-4 h-4 text-white fill-current" /></div>

                   <h2 className="text-[#3b82f6] font-sans text-xl md:text-2xl uppercase tracking-[0.2em] font-black mb-2">
                       Welcome to the Amazing
                   </h2>
                   
                   <h1 className="text-[#f43f5e] font-serif text-5xl md:text-7xl font-black tracking-tight mb-4 drop-shadow-sm">
                       {personal.name}
                   </h1>

                   <div className="flex items-center justify-center gap-4 text-[#f59e0b] mb-6">
                       <Star className="w-6 h-6 fill-current" />
                       <h3 className="font-sans text-xl md:text-2xl font-bold tracking-widest uppercase">
                           {personal.role}
                       </h3>
                       <Star className="w-6 h-6 fill-current" />
                   </div>
                   
                   <p className="text-gray-600 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed border-t-2 border-dashed border-gray-200 pt-6">
                       "{personal.bio}"
                   </p>
               </div>

               {/* Pillar supports for the sign (Bright theme) */}
               <div className="absolute top-[80%] left-[10%] w-10 h-[200px] bg-gradient-to-r from-[#dbeafe] via-white to-[#dbeafe] border-4 border-[#93c5fd] z-10 hidden md:block shadow-xl rounded-b-xl"></div>
               <div className="absolute top-[80%] right-[10%] w-10 h-[200px] bg-gradient-to-r from-[#dbeafe] via-white to-[#dbeafe] border-4 border-[#93c5fd] z-10 hidden md:block shadow-xl rounded-b-xl"></div>
           </div>

           {/* Admission Ticket Booth */}
           <div className="mt-16 flex flex-col items-center relative z-30">
               
               <div className="bg-[#fbbf24] border-8 border-[#f59e0b] rounded-t-full pt-12 pb-8 px-12 text-center shadow-2xl relative overflow-hidden">
                   {/* Striped awning inside booth */}
                   <div className="absolute top-0 left-0 right-0 h-8 flex">
                       {Array.from({length: 12}).map((_, i) => (
                           <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-[#f43f5e]' : 'bg-white'}`}></div>
                       ))}
                   </div>
                   
                   <Tent className="w-16 h-16 text-[#f43f5e] mx-auto mb-4 mt-4" />
                   <h4 className="text-white font-sans font-black text-xl tracking-widest uppercase mb-8 drop-shadow-md">
                       Ticket Booth
                   </h4>
                   
                   {/* Glowing Admission Ticket */}
                   <motion.a 
                       whileHover={{ scale: 1.05, rotate: -2 }}
                       whileTap={{ scale: 0.95 }}
                       href={personal.resumeUrl}
                       target="_blank"
                       rel="noreferrer"
                       className="relative block bg-white w-[300px] py-6 shadow-xl cursor-pointer border-2 border-gray-200"
                       style={{ 
                           clipPath: 'polygon(10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%, 0 10%)'
                       }}
                   >
                       {/* Dashed tear line */}
                       <div className="absolute top-0 bottom-0 left-[20%] w-0 border-l-2 border-dashed border-gray-300"></div>
                       
                       <div className="flex items-center justify-between px-8">
                           <div className="transform -rotate-90 text-gray-500 font-bold font-mono text-xs tracking-widest absolute left-2 top-1/2 -translate-y-1/2">
                               No. 001
                           </div>
                           <div className="w-full text-center pl-6">
                               <span className="block text-[#f43f5e] font-serif text-3xl font-black uppercase tracking-widest">
                                   Admit One
                               </span>
                               <span className="block text-[#3b82f6] font-sans text-sm font-bold tracking-[0.2em] mt-1">
                                   ALL ACCESS PASS
                               </span>
                           </div>
                           <Ticket className="absolute right-4 text-[#f43f5e] w-8 h-8 opacity-20" />
                       </div>
                   </motion.a>
                   
                   {/* CV Label */}
                   <p className="mt-4 text-[#b45309] font-sans font-black text-sm tracking-widest uppercase bg-white/50 px-4 py-1 rounded-full inline-block">
                       (CV) Download
                   </p>
               </div>

           </div>

       </div>
    </div>
  );
}
