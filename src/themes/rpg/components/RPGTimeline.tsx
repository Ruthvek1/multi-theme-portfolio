import React from 'react';

export default function RPGTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderDialogBox = (item: any, type: 'exp' | 'edu', index: number) => {
      const isEven = index % 2 === 0;

      return (
          <div key={item.id} className={`w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center mb-16 relative z-10 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
              
              {/* Path Connector for World Map illusion */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[calc(100%+4rem)] bg-[#a07040] -z-10 opacity-60"></div>
              
              {/* Node on the path */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#f0b060] border-2 border-white -z-10 shadow-[0_0_10px_rgba(240,176,96,0.8)]"></div>

              {/* The Dialog Box */}
              <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  
                  {/* Classic JRPG Window */}
                  <div className="bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[4px] border-white p-6 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative transition-transform hover:scale-105 duration-200">
                      <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
                      
                      {/* Name Tag (like a speaker name in an RPG) */}
                      <div className="absolute -top-4 -left-2 bg-[#04081c] border-[2px] border-white px-3 py-1">
                          <span className="font-rpg text-yellow-400 text-lg uppercase tracking-wider">
                              {type === 'exp' ? 'Quest: Exp' : 'Quest: Edu'}
                          </span>
                      </div>

                      <div className="mt-4">
                          {/* DATES EXPLICITLY INCLUDED IN DIALOG */}
                          <div className="text-gray-400 font-rpg text-xl tracking-wider mb-2">
                              {item.startDate} {item.endDate ? `to ${item.endDate}` : 'to Present'}
                          </div>
                          
                          <h3 className="text-white font-rpg text-2xl leading-tight mb-2">
                              {type === 'exp' ? item.role : item.degree}
                          </h3>
                          
                          <h4 className="text-[#88aaff] font-rpg text-xl mb-4">
                              @ {type === 'exp' ? item.company : item.school}
                          </h4>

                          <p className="text-white font-rpg text-xl leading-relaxed opacity-90">
                              {item.description}
                          </p>

                          {type === 'exp' && item.achievements && (
                              <div className="mt-4 flex flex-wrap gap-2">
                                  {item.achievements.map((ach: string, i: number) => (
                                      <span key={i} className="text-yellow-200 font-rpg text-lg before:content-['*'] before:mr-1">
                                          {ach}
                                      </span>
                                  ))}
                              </div>
                          )}
                      </div>
                      
                      {/* Blinking dialogue arrow */}
                      <div className="absolute bottom-2 right-3 text-white font-rpg text-xl animate-bounce">
                          ▼
                      </div>
                  </div>

              </div>
          </div>
      );
  };

  return (
    <div className="py-24 relative w-full overflow-hidden bg-[#2b4c1a]">
       
       {/* Pixel Map Background Pattern */}
       <div 
           className="absolute inset-0 opacity-40 pointer-events-none"
           style={{
               backgroundImage: `url('data:image/svg+xml;utf8,<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="%23244016"/><rect x="32" width="32" height="32" fill="%232b4c1a"/><rect y="32" width="32" height="32" fill="%232b4c1a"/><rect x="32" y="32" width="32" height="32" fill="%23244016"/><path d="M 10 10 L 20 15 L 15 25 Z" fill="%231a3010"/><path d="M 40 40 L 50 45 L 45 55 Z" fill="%231a3010"/></svg>')`,
               backgroundSize: '64px 64px'
           }}
       ></div>

       {/* Winding dirt path */}
       <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-16 bg-[#5c3a21] border-l-4 border-r-4 border-[#3e2513] opacity-60 pointer-events-none"></div>

       <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
           
           <div className="w-full flex justify-center mb-16">
               <div className="bg-[#04081c] border-[4px] border-white px-8 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.8)] relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none"></div>
                   <h2 className="font-rpg text-white text-3xl uppercase tracking-widest relative z-10">
                       Quest Log
                   </h2>
               </div>
           </div>

           <div className="relative mb-24">
               {experience.map((exp, i) => renderDialogBox(exp, 'exp', i))}
           </div>

           <div className="w-full flex justify-center mb-16">
               <div className="bg-[#04081c] border-[4px] border-white px-8 py-3 shadow-[4px_4px_0_rgba(0,0,0,0.8)] relative">
                   <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none"></div>
                   <h2 className="font-rpg text-cyan-300 text-3xl uppercase tracking-widest relative z-10">
                       Training Arc
                   </h2>
               </div>
           </div>

           <div className="relative">
               {education.map((edu, i) => renderDialogBox(edu, 'edu', i))}
           </div>

       </div>
    </div>
  );
}
