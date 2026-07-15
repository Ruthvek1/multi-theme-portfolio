'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CinemaContact({ personal, socials }: { personal: any, socials: any }) {
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  
  // Generate a mock seating grid
  const rows = ['A', 'B', 'C', 'D'];
  const seatsPerRow = 8;
  
  return (
    <div className="relative w-full min-h-screen bg-[#050304] overflow-hidden flex flex-col justify-center py-20 px-4">
       
       <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
           
           <h2 className="font-serif text-white text-3xl md:text-5xl uppercase tracking-[0.2em] mb-4 font-black text-center">
               Book a Meeting
           </h2>
           <p className="font-sans text-gray-400 text-sm md:text-base uppercase tracking-widest text-center mb-16">
               Select your preferred seat to confirm reservation
           </p>

           {/* The Screen Indicator */}
           <div className="w-full max-w-xl mx-auto h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-12 shadow-[0_5px_20px_rgba(255,255,255,0.2)]"></div>

           {/* Seat Grid */}
           <div className="flex flex-col gap-6 mb-16 relative z-10">
               {rows.map((row, rowIndex) => (
                   <div key={row} className="flex items-center justify-center gap-2 md:gap-4">
                       <span className="text-gray-600 font-mono text-xs md:text-sm mr-4">{row}</span>
                       {Array.from({length: seatsPerRow}).map((_, seatIndex) => {
                           const id = rowIndex * seatsPerRow + seatIndex;
                           const isSelected = selectedSeat === id;
                           // Make some seats randomly "taken" for realism
                           const isTaken = (id % 7 === 0 || id % 11 === 0) && id !== 0; 
                           
                           return (
                               <button aria-label="Interactive Button" key={id}
                                   disabled={isTaken}
                                   onClick={() => setSelectedSeat(id)}
                                   className={`w-8 h-10 md:w-12 md:h-14 rounded-t-lg border-2 transition-all duration-300 relative
                                       ${isTaken ? 'bg-gray-800 border-gray-900 cursor-not-allowed opacity-50' : 
                                         isSelected ? 'bg-yellow-500 border-yellow-400 scale-110 shadow-[0_0_15px_#eab308] z-20' : 
                                         'bg-red-900 border-red-950 hover:bg-red-700 hover:-translate-y-1 hover:shadow-[0_5px_10px_rgba(0,0,0,0.5)] cursor-pointer'
                                       }
                                   `}
                               >
                                   {/* Seat armrests */}
                                   <div className={`absolute bottom-0 -left-1 w-1 h-3/4 ${isSelected ? 'bg-yellow-600' : 'bg-black/50'}`}></div>
                                   <div className={`absolute bottom-0 -right-1 w-1 h-3/4 ${isSelected ? 'bg-yellow-600' : 'bg-black/50'}`}></div>
                                   {isSelected && <CheckCircle2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-black" />}
                               </button>
                           );
                       })}
                       <span className="text-gray-600 font-mono text-xs md:text-sm ml-4">{row}</span>
                   </div>
               ))}
           </div>

           {/* Dynamic Ticket Confirmation / Contact Details */}
           <div className="w-full max-w-2xl h-[300px] relative perspective-1000">
               <AnimatePresence mode="wait">
                   {selectedSeat !== null ? (
                       <motion.div
                           key="ticket"
                           initial={{ opacity: 0, rotateX: 90 }}
                           animate={{ opacity: 1, rotateX: 0 }}
                           exit={{ opacity: 0, rotateX: -90 }}
                           transition={{ type: "spring", bounce: 0.4 }}
                           className="absolute inset-0 bg-[#f0f0f0] rounded-lg border-4 border-[#333] shadow-2xl p-8 flex flex-col justify-between"
                       >
                           <div className="flex justify-between items-start border-b-2 border-black/10 pb-4">
                               <div>
                                   <h3 className="font-serif text-black text-2xl md:text-3xl font-black uppercase tracking-widest">
                                       Ticket Confirmed
                                   </h3>
                                   <p className="font-sans text-gray-500 text-sm tracking-widest uppercase mt-1">
                                       Meeting with {personal.name}
                                   </p>
                               </div>
                               <div className="bg-black text-yellow-400 font-mono px-3 py-1 text-xl font-bold tracking-widest">
                                   SEAT {Math.floor(selectedSeat / seatsPerRow) + 1}{rows[selectedSeat % rows.length]}
                               </div>
                           </div>

                           <div className="grid grid-cols-2 gap-6 mt-6 flex-grow">
                               {personal.email && (
                                   <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-center gap-3 text-black hover:text-blue-600 transition-colors">
                                       <Mail size={24} />
                                       <span className="font-sans font-bold text-sm md:text-base break-all">{personal.email}</span>
                                   </a>
                               )}
                               {personal.phone && (
                                   <div className="flex items-center gap-3 text-black">
                                       <Phone size={24} />
                                       <span className="font-sans font-bold text-sm md:text-base">{personal.phone}</span>
                                   </div>
                               )}
                               {personal.location && (
                                   <div className="flex items-center gap-3 text-black">
                                       <MapPin size={24} />
                                       <span className="font-sans font-bold text-sm md:text-base">{personal.location}</span>
                                   </div>
                               )}
                               <div className="flex items-center gap-4">
                                   {socials?.linkedin && (
                                       <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="text-black hover:text-blue-600 font-sans font-bold uppercase text-sm tracking-widest border-b-2 border-black">
                                           LinkedIn
                                       </a>
                                   )}
                                   {socials?.github && (
                                       <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="text-black hover:text-gray-500 font-sans font-bold uppercase text-sm tracking-widest border-b-2 border-black">
                                           GitHub
                                       </a>
                                   )}
                               </div>
                           </div>
                           
                           {/* Barcode graphic */}
                           <div className="w-full h-12 flex justify-between gap-1 opacity-60 mt-4 pointer-events-none">
                               {Array.from({length: 40}).map((_, i) => (
                                   <div key={i} className={`bg-black h-full ${i % 2 === 0 ? 'w-1' : i % 3 === 0 ? 'w-2' : 'w-[2px]'}`}></div>
                               ))}
                           </div>
                       </motion.div>
                   ) : (
                       <motion.div
                           key="placeholder"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="absolute inset-0 border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center"
                       >
                           <p className="text-gray-500 font-mono uppercase tracking-widest text-center">
                               Waiting for selection...
                           </p>
                       </motion.div>
                   )}
               </AnimatePresence>
           </div>

       </div>
    </div>
  );
}
