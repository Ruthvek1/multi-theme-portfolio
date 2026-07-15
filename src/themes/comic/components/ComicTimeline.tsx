import React from 'react';

export default function ComicTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderPanel = (item: any, idx: number, type: 'exp' | 'edu') => {
      // Alternate panel layouts to make it feel like a comic page
      const isEven = idx % 2 === 0;
      const rotation = isEven ? 'rotate-1' : '-rotate-1';
      const bgColor = type === 'exp' ? 'bg-[#ffea00]' : 'bg-[#2986cc]';
      const textColor = type === 'exp' ? 'text-black' : 'text-white';
      
      return (
          <div key={item.id} className={`relative w-full max-w-4xl mx-auto my-12 bg-white border-8 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] p-6 md:p-10 transform ${rotation} hover:scale-[1.02] transition-transform duration-300`}>
              
              {/* Caption Box (DATES MUST BE HERE) */}
              <div className="absolute -top-6 -left-6 bg-[#ffea00] border-4 border-black px-4 py-2 shadow-[6px_6px_0_rgba(0,0,0,1)] z-20">
                  <span className="font-black text-black uppercase tracking-widest">
                      {item.startDate} — {item.endDate || 'PRESENT'}
                  </span>
              </div>

              {/* Panel Header */}
              <div className={`border-4 border-black ${bgColor} ${textColor} p-4 mb-6 shadow-[4px_4px_0_rgba(0,0,0,1)]`}>
                  <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tighter">
                      {type === 'exp' ? item.role : item.degree}
                  </h3>
                  <h4 className="font-bold text-lg uppercase italic opacity-90">
                      @ {type === 'exp' ? item.company : item.school}
                  </h4>
              </div>

              {/* Panel Content (Speech/Thought bubble style) */}
              <div className="relative border-4 border-black p-6 bg-gray-50 rounded-xl mb-4">
                  <p className="font-medium text-black leading-relaxed">
                      {item.description}
                  </p>
                  <div className="absolute -bottom-4 right-12 w-6 h-6 bg-gray-50 border-b-4 border-r-4 border-black transform rotate-45"></div>
              </div>

              {/* Achievements as Action Callouts */}
              {type === 'exp' && item.achievements && (
                  <div className="flex flex-wrap gap-3 mt-6">
                      {item.achievements.map((ach: string, i: number) => (
                          <div key={i} className="bg-[#e62e2d] border-4 border-black px-3 py-2 text-white font-bold text-sm uppercase transform -skew-x-6 shadow-[4px_4px_0_rgba(0,0,0,1)]">
                              ★ {ach}
                          </div>
                      ))}
                  </div>
              )}

              {/* Sound Effect Graphic */}
              <div className={`absolute -right-8 -bottom-8 bg-[#ffffff] border-4 border-black px-4 py-2 font-black text-2xl uppercase italic transform ${isEven ? '-rotate-12' : 'rotate-12'} shadow-[6px_6px_0_rgba(0,0,0,1)] z-10`}>
                  {type === 'exp' ? 'WORK!' : 'LEARN!'}
              </div>
          </div>
      );
  };

  return (
    <div className="py-20 relative z-20 w-full max-w-7xl mx-auto px-4 lg:px-8">
       
       <div className="w-full max-w-4xl mx-auto mb-20 text-center relative">
           <div className="inline-block bg-[#e62e2d] border-8 border-black px-12 py-6 shadow-[16px_16px_0_rgba(0,0,0,1)] transform -rotate-2">
               <h2 className="font-black text-5xl md:text-7xl text-white uppercase tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>
                   The Origin Story
               </h2>
           </div>
       </div>

       {/* Experience Panels */}
       <div className="mb-32">
           <div className="w-full max-w-4xl mx-auto mb-12">
               <div className="inline-block bg-black text-white px-6 py-2 font-black text-2xl uppercase tracking-widest transform -skew-x-12">
                   Part 1: The Missions
               </div>
           </div>
           
           <div className="flex flex-col gap-12">
              {experience.map((exp, i) => renderPanel(exp, i, 'exp'))}
           </div>
       </div>

       {/* Education Panels */}
       <div>
           <div className="w-full max-w-4xl mx-auto mb-12">
               <div className="inline-block bg-black text-white px-6 py-2 font-black text-2xl uppercase tracking-widest transform -skew-x-12">
                   Part 2: The Training
               </div>
           </div>
           
           <div className="flex flex-col gap-12">
              {education.map((edu, i) => renderPanel(edu, i, 'edu'))}
           </div>
       </div>

    </div>
  );
}
