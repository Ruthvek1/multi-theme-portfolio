import React from 'react';
import { MapPin } from 'lucide-react';

export default function HotelTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderItineraryStop = (item: any, type: 'exp' | 'edu', index: number) => {
      const isEven = index % 2 === 0;

      return (
          <div key={item.id} className={`relative flex items-center justify-between md:justify-normal w-full mb-24 group ${isEven ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Central Golden Line & Node */}
              <div className="absolute left-4 md:left-1/2 w-[1px] h-[calc(100%+6rem)] bg-[#d4af37]/30 top-12 md:-translate-x-1/2 -z-10 group-last:h-full"></div>
              
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border border-[#d4af37] bg-[#0f172a] md:-translate-x-1/2 z-10 flex items-center justify-center group-hover:scale-150 transition-transform duration-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
              </div>

              {/* The "Date" Ticket (DATES RENDERED HERE) */}
              <div className="w-full md:w-1/2 flex justify-start md:justify-end md:px-16 absolute md:relative top-0 left-12 md:left-0 -translate-y-8 md:translate-y-0 text-[#d4af37]">
                  <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'}`}>
                      <span className="font-serif text-sm tracking-widest uppercase opacity-70">Duration of Stay</span>
                      <span className="font-serif text-xl md:text-2xl tracking-widest">{item.startDate} — {item.endDate || 'Present'}</span>
                  </div>
              </div>

              {/* The "Stop" Details */}
              <div className={`w-full md:w-1/2 pl-12 md:px-16 ${isEven ? 'text-left' : 'md:text-right text-left'}`}>
                  <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm group-hover:bg-white/10 transition-colors duration-500 relative">
                      
                      {/* Corner Accents */}
                      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#d4af37]/50"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#d4af37]/50"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#d4af37]/50"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#d4af37]/50"></div>

                      <h3 className="font-serif text-2xl md:text-3xl text-white tracking-wide mb-2">
                          {type === 'exp' ? item.role : item.degree}
                      </h3>
                      
                      <div className={`flex items-center gap-2 mb-6 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                          <MapPin className="w-4 h-4 text-[#d4af37]" />
                          <h4 className="font-serif text-[#d4af37] tracking-widest uppercase text-sm">
                              {type === 'exp' ? item.company : item.school}
                          </h4>
                      </div>

                      <p className="text-gray-400 font-light leading-relaxed mb-6">
                          {item.description}
                      </p>

                      {type === 'exp' && item.achievements && (
                          <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-start' : 'md:justify-end justify-start'}`}>
                              {item.achievements.map((ach: string, i: number) => (
                                  <span key={i} className="text-xs uppercase tracking-wider text-gray-300 border border-white/20 px-3 py-1">
                                      {ach}
                                  </span>
                              ))}
                          </div>
                      )}
                  </div>
              </div>

          </div>
      );
  };

  return (
    <div className="py-32 relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
       
       <div className="text-center mb-24">
           <h2 className="font-serif text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Your Curated Journey</h2>
           <h3 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
               The Itinerary
           </h3>
           <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
       </div>

       <div className="max-w-5xl mx-auto">
           {/* Professional Stay (Experience) */}
           <div className="mb-32">
               <div className="flex items-center justify-center gap-6 mb-16">
                   <div className="w-full h-[1px] bg-white/10"></div>
                   <span className="font-serif text-white uppercase tracking-[0.2em] whitespace-nowrap px-4">Professional Stay</span>
                   <div className="w-full h-[1px] bg-white/10"></div>
               </div>
               
               <div className="relative">
                   {experience.map((exp, i) => renderItineraryStop(exp, 'exp', i))}
               </div>
           </div>

           {/* Educational Stay (Education) */}
           <div>
               <div className="flex items-center justify-center gap-6 mb-16">
                   <div className="w-full h-[1px] bg-white/10"></div>
                   <span className="font-serif text-white uppercase tracking-[0.2em] whitespace-nowrap px-4">Educational Foundation</span>
                   <div className="w-full h-[1px] bg-white/10"></div>
               </div>
               
               <div className="relative">
                   {education.map((edu, i) => renderItineraryStop(edu, 'edu', i))}
               </div>
           </div>
       </div>

    </div>
  );
}
