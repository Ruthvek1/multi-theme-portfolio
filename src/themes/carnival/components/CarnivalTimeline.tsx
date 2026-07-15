import React from 'react';
import { motion } from 'framer-motion';

export default function CarnivalTimeline({ experience, education }: { experience: any[], education: any[] }) {
  const timelineItems = [
    ...experience.map(item => ({ ...item, type: 'exp' })),
    ...education.map(item => ({ ...item, type: 'edu' }))
  ];

  return (
    <div className="py-24 relative w-full overflow-hidden bg-[#38bdf8] min-h-[150vh]">
       
       {/* Background: Sky and Clouds */}
       <div className="absolute inset-0 z-0">
           {/* Clouds */}
           <div className="absolute top-[10%] left-[5%] w-64 h-24 bg-white/40 rounded-full blur-xl"></div>
           <div className="absolute top-[30%] right-[10%] w-96 h-32 bg-white/30 rounded-full blur-xl"></div>
           <div className="absolute top-[60%] left-[20%] w-72 h-28 bg-white/40 rounded-full blur-xl"></div>
           <div className="absolute top-[80%] right-[5%] w-80 h-32 bg-white/30 rounded-full blur-xl"></div>
       </div>

       {/* Giant Rollercoaster Track (SVG) */}
       <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
           <svg className="w-full h-full max-w-7xl drop-shadow-2xl opacity-80" preserveAspectRatio="none" viewBox="0 0 1000 3000">
                {/* Track Support Pillars */}
                <path d="M 200 0 L 200 3000 M 800 0 L 800 3000 M 500 0 L 500 3000" stroke="#94a3b8" strokeWidth="20" opacity="0.3" strokeDasharray="100 50" />
                
                {/* Main Winding Track */}
                <path 
                    d="M 500 0 
                       C 1000 300, 1000 600, 500 900 
                       C 0 1200, 0 1500, 500 1800 
                       C 1000 2100, 1000 2400, 500 2700 
                       L 500 3000" 
                    fill="none" 
                    stroke="#1e293b" 
                    strokeWidth="40" 
                    strokeLinecap="round" 
                />
                
                {/* Track Rails (Red) */}
                <path 
                    d="M 500 0 
                       C 1000 300, 1000 600, 500 900 
                       C 0 1200, 0 1500, 500 1800 
                       C 1000 2100, 1000 2400, 500 2700 
                       L 500 3000" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    transform="translate(-14, 0)"
                />
                <path 
                    d="M 500 0 
                       C 1000 300, 1000 600, 500 900 
                       C 0 1200, 0 1500, 500 1800 
                       C 1000 2100, 1000 2400, 500 2700 
                       L 500 3000" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    transform="translate(14, 0)"
                />
                
                {/* Track Ties */}
                <path 
                    d="M 500 0 
                       C 1000 300, 1000 600, 500 900 
                       C 0 1200, 0 1500, 500 1800 
                       C 1000 2100, 1000 2400, 500 2700 
                       L 500 3000" 
                    fill="none" 
                    stroke="#cbd5e1" 
                    strokeWidth="4" 
                    strokeDasharray="20 40" 
                />
           </svg>
       </div>

       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 lg:px-8">
           
           {/* Section Header */}
           <div className="w-full flex justify-center mb-12 relative">
               <div className="bg-white border-[6px] border-[#ef4444] px-10 py-6 flex flex-col items-center justify-center gap-2 rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] transform -rotate-3 z-30 relative overflow-hidden">
                   {/* Striped awning border */}
                   <div className="absolute top-0 left-0 right-0 h-4 flex">
                       {Array.from({length: 20}).map((_, i) => (
                           <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-[#ef4444]' : 'bg-white'}`}></div>
                       ))}
                   </div>
                   
                   <h2 className="font-sans text-[#1e3a8a] text-3xl md:text-5xl uppercase tracking-[0.2em] font-black mt-2">
                       The Career Coaster
                   </h2>
                   <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                       Please keep arms and legs inside the vehicle
                   </p>
               </div>
           </div>

           {/* Rollercoaster Carts (Timeline Items) */}
           <div className="relative w-full flex flex-col items-center gap-24 lg:gap-32 py-12">
               {timelineItems.map((item, index) => {
                   // Calculate position to simulate riding the winding track
                   // Pattern: Center, Right, Center, Left, Center...
                   const cycle = index % 4;
                   let alignClass = "self-center";
                   let tiltClass = "rotate-0";
                   
                   if (cycle === 1) {
                       alignClass = "self-end lg:mr-[10%]";
                       tiltClass = "rotate-3"; // Tilting right
                   } else if (cycle === 3) {
                       alignClass = "self-start lg:ml-[10%]";
                       tiltClass = "-rotate-3"; // Tilting left
                   } else {
                       alignClass = "self-center";
                       // If moving from left to right, tilt right, etc.
                       tiltClass = index % 2 === 0 ? "-rotate-2" : "rotate-2"; 
                   }

                   const isExp = item.type === 'exp';
                   
                   // Cart Colors
                   const cartColors = [
                       { bg: 'bg-[#ef4444]', border: 'border-[#b91c1c]', text: 'text-white' }, // Red
                       { bg: 'bg-[#3b82f6]', border: 'border-[#1d4ed8]', text: 'text-white' }, // Blue
                       { bg: 'bg-[#10b981]', border: 'border-[#047857]', text: 'text-white' }, // Green
                       { bg: 'bg-[#f59e0b]', border: 'border-[#b45309]', text: 'text-white' }  // Yellow
                   ];
                   const color = cartColors[index % cartColors.length];

                   return (
                       <motion.div 
                           key={`${item.type}-${index}`}
                           initial={{ opacity: 0, scale: 0.8, y: 100 }}
                           whileInView={{ opacity: 1, scale: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           className={`w-full max-w-2xl relative ${alignClass} ${tiltClass} transition-transform duration-500 hover:scale-105 z-20`}
                       >
                           {/* Rollercoaster Cart Design */}
                           <div className="relative pt-12">
                               
                               {/* Passengers (Silhouettes) */}
                               <div className="absolute top-0 left-[20%] w-16 h-20 bg-gray-800 rounded-t-full z-0 flex flex-col items-center">
                                   <div className="w-10 h-10 bg-gray-800 rounded-full absolute -top-8 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                   {/* Arms */}
                                   <div className="absolute w-2 h-16 bg-gray-800 -left-6 top-0 rotate-[30deg]"></div>
                                   <div className="absolute w-2 h-16 bg-gray-800 -right-6 top-0 -rotate-[30deg]"></div>
                               </div>
                               <div className="absolute top-2 left-[50%] w-14 h-16 bg-gray-700 rounded-t-full z-0 flex flex-col items-center">
                                   <div className="w-8 h-8 bg-gray-700 rounded-full absolute -top-6 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                               </div>
                               <div className="absolute top-4 left-[75%] w-12 h-16 bg-gray-900 rounded-t-full z-0 flex flex-col items-center">
                                   <div className="w-8 h-8 bg-gray-900 rounded-full absolute -top-6 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                               </div>

                               {/* The Cart Body */}
                               <div className={`relative z-10 w-full ${color.bg} border-[8px] ${color.border} rounded-3xl p-6 md:p-8 shadow-[0_30px_50px_rgba(0,0,0,0.3)]`}>
                                   
                                   {/* Cart Front Bumper */}
                                   <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-1/2 bg-gray-300 rounded-l-full border-4 border-gray-400"></div>
                                   <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-1/2 bg-gray-300 rounded-r-full border-4 border-gray-400"></div>

                                   {/* Decorative Stripe */}
                                   <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/30 -translate-y-1/2 pointer-events-none"></div>

                                   {/* Cart Number (Date) */}
                                   <div className="absolute -top-6 right-8 bg-white border-4 border-[#1e293b] rounded-full px-6 py-2 shadow-lg transform rotate-6">
                                       <span className="font-mono font-black text-[#1e293b] text-sm md:text-base">
                                           {item.startDate} - {item.endDate || 'Present'}
                                       </span>
                                   </div>

                                   <div className="relative z-20">
                                       <span className={`inline-block bg-white/20 px-4 py-1 rounded-full font-bold uppercase tracking-widest text-xs mb-4 ${color.text} shadow-sm backdrop-blur-sm`}>
                                           {isExp ? 'Thrill Ride' : 'Discovery Zone'}
                                       </span>
                                       
                                       <h3 className={`font-sans text-3xl md:text-4xl font-black uppercase mb-2 tracking-tight ${color.text}`}>
                                           {isExp ? item.role : item.degree}
                                       </h3>
                                       
                                       <h4 className={`font-sans text-xl font-bold uppercase tracking-widest mb-4 bg-white/90 text-[#1e293b] inline-block px-4 py-2 rounded-lg shadow-inner`}>
                                           {isExp ? item.company : item.school}
                                       </h4>
                                       
                                       <p className={`font-sans text-sm md:text-base leading-relaxed mt-4 bg-black/10 p-4 rounded-xl backdrop-blur-sm font-medium ${color.text}`}>
                                           {item.description}
                                       </p>
                                   </div>

                                   {/* Wheels */}
                                   <div className="absolute -bottom-10 left-8 w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-400 shadow-xl flex items-center justify-center">
                                       <div className="w-6 h-6 bg-gray-300 rounded-full animate-spin border-2 border-gray-500"></div>
                                   </div>
                                   <div className="absolute -bottom-10 right-8 w-16 h-16 bg-gray-800 rounded-full border-4 border-gray-400 shadow-xl flex items-center justify-center">
                                       <div className="w-6 h-6 bg-gray-300 rounded-full animate-spin border-2 border-gray-500"></div>
                                   </div>
                               </div>
                           </div>

                       </motion.div>
                   )
               })}
           </div>

       </div>
    </div>
  );
}
