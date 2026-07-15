import React from 'react';

export default function MinecraftTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderSignpost = (item: any, type: 'exp' | 'edu', index: number) => {
      const isEven = index % 2 === 0;

      return (
          <div key={item.id} className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center mb-24 z-10 group">
              
              {/* Central wooden fence pole */}
              <div className="absolute left-1/2 w-4 h-[calc(100%+6rem)] bg-[#5c4033] border-l-4 border-[#855e42] border-r-4 border-[#3e2b22] -translate-x-1/2 top-16 -z-10 group-last:h-full hidden md:block shadow-[-10px_0_15px_rgba(0,0,0,0.5)]"></div>

              {/* Mobile pole */}
              <div className="absolute left-8 w-4 h-[calc(100%+6rem)] bg-[#5c4033] border-l-4 border-[#855e42] border-r-4 border-[#3e2b22] top-16 -z-10 group-last:h-full md:hidden shadow-[-10px_0_15px_rgba(0,0,0,0.5)]"></div>

              {/* The Signpost Block (Dates and Info) */}
              <div className={`w-full pl-20 md:pl-0 md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12 md:ml-auto'}`}>
                  
                  <div className="relative bg-[#a67d53] border-b-8 border-r-8 border-t-4 border-l-4 border-b-[#593d29] border-r-[#593d29] border-t-[#d1a373] border-l-[#d1a373] p-6 shadow-[8px_8px_0_rgba(0,0,0,0.6)] w-full transition-transform hover:scale-105 duration-200">
                      
                      {/* Nail accents */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-[#404040]"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-[#404040]"></div>
                      <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#404040]"></div>
                      <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#404040]"></div>

                      <div className="text-center">
                          {/* DATES EXPLICITLY INCLUDED ON SIGNPOST */}
                          <div className="text-black font-pixel text-[10px] md:text-xs tracking-widest mb-4 opacity-70">
                              {item.startDate} — {item.endDate || 'Present'}
                          </div>
                          
                          <h3 className="text-black font-pixel text-lg md:text-xl leading-tight mb-2">
                              {type === 'exp' ? item.role : item.degree}
                          </h3>
                          
                          <h4 className="text-black/80 font-pixel text-sm mb-6">
                              @ {type === 'exp' ? item.company : item.school}
                          </h4>

                          <p className="text-black/70 text-xs md:text-sm font-sans font-bold leading-relaxed">
                              {item.description}
                          </p>

                          {type === 'exp' && item.achievements && (
                              <div className="mt-4 flex flex-wrap justify-center gap-2">
                                  {item.achievements.map((ach: string, i: number) => (
                                      <span key={i} className="text-[10px] font-pixel text-white bg-black/60 px-2 py-1">
                                          {ach}
                                      </span>
                                  ))}
                              </div>
                          )}
                      </div>
                  </div>

              </div>

          </div>
      );
  };

  return (
    <div className="py-24 relative w-full overflow-hidden bg-[#7d7d7d]">
       
       {/* Stone Background Pattern */}
       <div 
           className="absolute inset-0 opacity-20 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%236e6e6e"/><rect x="32" width="32" height="32" fill="%237d7d7d"/><rect y="32" width="32" height="32" fill="%237d7d7d"/><rect x="32" y="32" width="32" height="32" fill="%238a8a8a"/></svg>')`,
               backgroundSize: '64px 64px'
           }}
       ></div>

       {/* Depth Gradient (gets darker as you go down) */}
       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none"></div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
           
           <div className="text-center mb-24 bg-black/50 p-6 inline-block mx-auto border-4 border-gray-600 shadow-[8px_8px_0_rgba(0,0,0,0.5)]">
               <h2 className="font-pixel text-white text-2xl md:text-4xl text-shadow-pixel">
                   The Mineshaft
               </h2>
           </div>

           <div className="w-full flex justify-center mb-16">
                <div className="font-pixel text-yellow-400 bg-black/80 px-6 py-2 border-2 border-yellow-600 text-shadow-sm">
                    Level: Experience
                </div>
           </div>

           <div className="relative mb-32">
               {experience.map((exp, i) => renderSignpost(exp, 'exp', i))}
           </div>

           <div className="w-full flex justify-center mb-16">
                <div className="font-pixel text-cyan-400 bg-black/80 px-6 py-2 border-2 border-cyan-600 text-shadow-sm">
                    Level: Education
                </div>
           </div>

           <div className="relative">
               {education.map((edu, i) => renderSignpost(edu, 'edu', i))}
           </div>

       </div>
    </div>
  );
}
