import React from 'react';
import Image from 'next/image';
import { Calendar, Users, FileText, ChevronDown } from 'lucide-react';

export default function HotelHero({ personal }: { personal: any }) {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="relative min-h-[95vh] w-full flex flex-col justify-center overflow-hidden bg-[#0f172a]">
       
       {/* Background Image / Texture */}
       <div className="absolute inset-0 z-0">
           <Image src="https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2940&auto=format&fit=crop" 
               alt="" 
               aria-hidden="true"
               className="w-full h-full object-cover opacity-20 sepia-[0.3] mix-blend-luminosity" width={800} height={600} />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
       </div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pt-20 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
           
           {/* Left: Typography & Intro */}
           <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
               
               <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-[1px] bg-[#d4af37]"></div>
                   <span className="font-serif text-[#d4af37] uppercase tracking-[0.2em] text-sm">Welcome To</span>
                   <div className="w-12 h-[1px] bg-[#d4af37]"></div>
               </div>

               <h1 className="font-serif text-5xl md:text-7xl text-white font-light tracking-wide mb-6 leading-tight drop-shadow-lg">
                   The Grand <br/>
                   <span className="italic text-[#d4af37]">Portfolio</span>
               </h1>

               <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed max-w-lg mb-12">
                   "{personal.bio}"
               </p>

               <div className="flex items-center gap-6">
                   <Image src="/assets/hotel-avatar.png" alt="Chief Concierge" className="w-20 h-20 rounded-full border border-[#d4af37] object-cover shadow-[0_0_20px_rgba(212,175,55,0.2)]" width={800} height={600} />
                   <div>
                       <p className="font-serif text-white text-xl tracking-wide">{personal.name}</p>
                       <p className="text-[#d4af37] text-sm uppercase tracking-widest">{personal.role}</p>
                   </div>
               </div>
           </div>

           {/* Right: The "Booking" Widget */}
           <div className="w-full md:w-1/2 md:max-w-md ml-auto">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 shadow-2xl relative">
                   {/* Corner accents */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#d4af37]"></div>
                   <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#d4af37]"></div>
                   <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#d4af37]"></div>
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#d4af37]"></div>

                   <h3 className="font-serif text-[#d4af37] text-2xl tracking-widest uppercase mb-8 text-center">
                       Check-In
                   </h3>

                   <div className="space-y-6">
                       <div className="flex justify-between items-center border-b border-white/10 pb-4">
                           <div className="flex items-center gap-3 text-gray-400">
                               <Calendar className="w-5 h-5 text-[#d4af37]" />
                               <span className="text-sm uppercase tracking-wider">Arrival</span>
                           </div>
                           <span className="text-white font-serif tracking-wide">{today}</span>
                       </div>

                       <div className="flex justify-between items-center border-b border-white/10 pb-4">
                           <div className="flex items-center gap-3 text-gray-400">
                               <Users className="w-5 h-5 text-[#d4af37]" />
                               <span className="text-sm uppercase tracking-wider">Guests</span>
                           </div>
                           <span className="text-white font-serif tracking-wide">1 VIP</span>
                       </div>

                       <div className="pt-6 text-center">
                           <a aria-label="Link" href={personal.resumeUrl}
                               target="_blank"
                               rel="noreferrer"
                               className="w-full group relative flex items-center justify-center gap-3 bg-[#d4af37] text-[#0f172a] py-4 px-8 font-serif uppercase tracking-widest text-sm hover:bg-[#b8953f] transition-all overflow-hidden mb-2"
                           >
                               <span className="relative z-10 flex items-center gap-2 font-bold">
                                   <FileText className="w-4 h-4" />
                                   Download Itinerary
                               </span>
                           </a>
                           <span className="text-xs text-gray-500 font-serif uppercase tracking-[0.2em] italic">
                               (Curriculum Vitae)
                           </span>
                       </div>
                   </div>
               </div>
           </div>

       </div>

       {/* Scroll indicator */}
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-[#d4af37]/60">
           <span className="text-xs uppercase tracking-widest font-serif">Explore</span>
           <ChevronDown className="w-5 h-5" />
       </div>
    </div>
  );
}
