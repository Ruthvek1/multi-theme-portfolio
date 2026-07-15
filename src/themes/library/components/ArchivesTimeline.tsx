import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function ArchivesTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderScroll = (item: any, type: 'edu' | 'exp') => {
      return (
          <div key={item.id} className="relative w-full max-w-4xl mx-auto my-12 flex justify-center group">
              
              {/* Wax Seal with Date - Positioned at the top dowel */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-xl transition-transform duration-500 group-hover:scale-110">
                  <div className="w-16 h-16 bg-[#8b0000] rounded-full flex items-center justify-center relative shadow-[inset_0_-4px_10px_rgba(0,0,0,0.5),0_5px_10px_rgba(0,0,0,0.5)]">
                      {/* Wax texture */}
                      <div className="absolute inset-1 rounded-full border-2 border-[#5a0000] opacity-50"></div>
                      <div className="font-serif text-[#fdf3d8] font-bold text-xl drop-shadow-md">
                          {type === 'exp' ? 'X' : 'E'}
                      </div>
                  </div>
                  {/* The Date Stamped in Brass below the seal */}
                  <div className="mt-2 bg-[#2a1b0e] border border-[#d4af37]/40 px-4 py-1 rounded shadow-lg">
                      <div className="font-serif text-[#d4af37] text-xs font-bold tracking-widest uppercase flex items-center gap-2 whitespace-nowrap">
                          <Calendar className="w-3 h-3" />
                          <span>{item.startDate}</span>
                          <ChevronRight className="w-3 h-3" />
                          <span>{item.endDate || 'Present'}</span>
                      </div>
                  </div>
              </div>

              {/* Top Wooden Dowel */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-[#4a3018] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_4px_4px_rgba(255,255,255,0.1)] z-20 flex items-center justify-between px-[-10px] -mx-4">
                  <div className="w-6 h-6 bg-[#2a1b0e] rounded-full border-2 border-[#1a1109]"></div>
                  <div className="w-6 h-6 bg-[#2a1b0e] rounded-full border-2 border-[#1a1109]"></div>
              </div>

              {/* The Unrolled Parchment Scroll */}
              <div className="relative w-[90%] bg-[#fdf3d8] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')] shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_0_60px_rgba(139,69,19,0.2)] mt-4 mb-4 z-10 pt-20 pb-16 px-8 md:px-16 before:absolute before:inset-0 before:shadow-[inset_4px_0_10px_rgba(0,0,0,0.1),inset_-4px_0_10px_rgba(0,0,0,0.1)] overflow-hidden">
                  
                  {/* Inner aged borders */}
                  <div className="absolute inset-4 border border-[#8b4513]/20 pointer-events-none"></div>
                  
                  <div className="text-center mb-8">
                     <h3 className="font-serif text-[#4a3018] text-3xl font-bold mb-2">
                         {type === 'exp' ? item.role : item.degree}
                     </h3>
                     <h4 className="font-serif text-[#8b4513] text-xl italic">
                         {type === 'exp' ? item.company : item.school}
                     </h4>
                  </div>

                  <p className="font-serif text-[#4a3018]/80 text-lg leading-relaxed text-justify mb-8">
                      {item.description}
                  </p>
                  
                  {type === 'exp' && item.achievements && (
                      <ul className="space-y-3 font-serif text-[#4a3018]/90">
                          {item.achievements.map((ach: string, i: number) => (
                              <li key={i} className="flex gap-4">
                                  <span className="text-[#8b0000]">❧</span>
                                  <span>{ach}</span>
                              </li>
                          ))}
                      </ul>
                  )}

                  {/* Faded ink stains for aesthetic */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#8b4513]/10 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute top-20 -left-10 w-32 h-32 bg-[#4a3018]/5 rounded-full blur-xl pointer-events-none"></div>
              </div>

              {/* Bottom Wooden Dowel */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#4a3018] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.5),inset_0_-4px_4px_rgba(0,0,0,0.3)] z-20 flex items-center justify-between px-[-10px] -mx-4">
                  <div className="w-6 h-6 bg-[#2a1b0e] rounded-full border-2 border-[#1a1109]"></div>
                  <div className="w-6 h-6 bg-[#2a1b0e] rounded-full border-2 border-[#1a1109]"></div>
              </div>

          </div>
      );
  };

  return (
    <div className="py-32 relative z-20 max-w-7xl mx-auto px-4">
       
       <div className="text-center mb-32 relative">
           <h2 className="font-serif text-5xl text-[#d4af37] tracking-widest uppercase font-bold drop-shadow-lg mb-6">
               The Grand Archives
           </h2>
           <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#8b4513] to-transparent mx-auto"></div>
           <p className="mt-6 font-serif text-[#fdf3d8]/60 italic text-xl">
               Chronicles of past endeavors and acquired wisdom
           </p>
       </div>

       <div className="mb-48">
           <h3 className="font-serif text-3xl text-[#fdf3d8] text-center mb-16 italic border-b border-[#8b4513]/30 pb-4 inline-block mx-auto left-1/2 relative -translate-x-1/2">
               Tomes of Experience
           </h3>
           <div className="flex flex-col gap-4">
              {experience.map(exp => renderScroll(exp, 'exp'))}
           </div>
       </div>

       <div>
           <h3 className="font-serif text-3xl text-[#fdf3d8] text-center mb-16 italic border-b border-[#8b4513]/30 pb-4 inline-block mx-auto left-1/2 relative -translate-x-1/2">
               Scrolls of Education
           </h3>
           <div className="flex flex-col gap-4">
              {education.map(edu => renderScroll(edu, 'edu'))}
           </div>
       </div>

    </div>
  );
}
