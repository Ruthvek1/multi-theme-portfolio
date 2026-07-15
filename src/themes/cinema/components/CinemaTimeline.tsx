import React from 'react';
import { Star } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CinemaTimeline({ experience, education }: { experience: any[], education: any[] }) {
  
  const renderPoster = (item: any, type: 'exp' | 'edu', index: number) => {
      // Determine side for the hallway walk illusion
      const isLeft = index % 2 === 0;

      // 3D Tilt logic
      const x = useMotionValue(0);
      const y = useMotionValue(0);

      const mouseXSpring = useSpring(x);
      const mouseYSpring = useSpring(y);

      const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
      const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

      const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const width = rect.width;
          const height = rect.height;
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const xPct = mouseX / width - 0.5;
          const yPct = mouseY / height - 0.5;
          x.set(xPct);
          y.set(yPct);
      };

      const handleMouseLeave = () => {
          x.set(0);
          y.set(0);
      };

      return (
          <div key={item.id} className={`w-full flex ${isLeft ? 'justify-start' : 'justify-end'} mb-32 px-4 md:px-12 relative z-10 perspective-[1000px]`}>
              
              {/* Poster Frame (Illuminated Box) */}
              <motion.div 
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                  className="w-full md:w-[60%] lg:w-[45%] bg-[#111] border-8 border-[#3a202a] p-4 shadow-[0_0_40px_rgba(255,215,0,0.15)] relative transform-gpu hover:z-20 cursor-crosshair"
              >
                  {/* Glowing inner border */}
                  <div className="absolute inset-2 border border-yellow-600/50 shadow-[inset_0_0_20px_rgba(255,215,0,0.2)] pointer-events-none z-20"></div>

                  {/* Poster Content Area */}
                  <div className="bg-gradient-to-br from-[#1a0f14] to-[#0a0508] w-full h-full p-8 flex flex-col relative overflow-hidden group">
                      
                      {/* Subdued movie background graphic illusion */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-3xl group-hover:bg-red-800/20 transition-colors"></div>

                      <div className="flex justify-between items-start mb-6 relative z-10">
                          <div className="bg-yellow-500 text-black font-black uppercase text-xs tracking-widest px-3 py-1 font-sans">
                              {type === 'exp' ? 'Blockbuster' : 'Documentary'}
                          </div>
                          <div className="flex text-yellow-500">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                          </div>
                      </div>

                      <h3 className="text-white font-serif text-4xl md:text-5xl uppercase font-black leading-none mb-2 relative z-10 tracking-wide text-shadow-sm">
                          {type === 'exp' ? item.role : item.degree}
                      </h3>
                      
                      <h4 className="text-yellow-500 font-sans text-xl uppercase tracking-widest mb-8 relative z-10">
                          A {type === 'exp' ? item.company : item.school} Production
                      </h4>

                      <p className="text-gray-300 font-serif text-lg md:text-xl leading-relaxed italic mb-8 relative z-10 border-l-4 border-yellow-600 pl-4">
                          "{item.description}"
                      </p>

                      <div className="mt-auto relative z-10">
                          {/* DATES EXPLICITLY INCLUDED IN MOVIE POSTER STYLE */}
                          <div className="border-t border-white/20 pt-4 flex flex-col items-center">
                              <span className="text-gray-400 font-sans text-xs uppercase tracking-[0.3em] mb-1">
                                  Release Window
                              </span>
                              <span className="text-white font-sans font-bold text-lg md:text-xl tracking-widest uppercase">
                                  {item.startDate} — {item.endDate ? item.endDate : 'Present'}
                              </span>
                          </div>
                      </div>
                      
                      {/* Movie Credits Block (Achievements) */}
                      {type === 'exp' && item.achievements && (
                          <div className="mt-8 text-center px-4 relative z-10">
                              <p className="font-sans text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed" style={{ transform: 'scaleY(1.5)' }}>
                                  FEATURING <span className="text-gray-400">{item.achievements.join(" • ")}</span>
                              </p>
                          </div>
                      )}
                  </div>

                  {/* Floor Reflection Illusion */}
                  <div className="absolute -bottom-12 left-0 right-0 h-12 bg-gradient-to-t from-transparent to-[#111] opacity-50 blur-md pointer-events-none"></div>
              </motion.div>
          </div>
      );
  };

  return (
    <div className="py-32 relative w-full overflow-hidden bg-[#0a0508] min-h-screen">
       
       {/* The Red Carpet Floor */}
       <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] bg-[#660000] border-l-[10px] border-r-[10px] border-yellow-600 z-0">
           {/* Carpet Texture */}
           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
       </div>

       {/* Cinema Lighting / Sconces */}
       <div className="absolute top-0 bottom-0 left-[5%] w-1 border-l border-white/5 hidden lg:block"></div>
       <div className="absolute top-0 bottom-0 right-[5%] w-1 border-r border-white/5 hidden lg:block"></div>

       <div className="relative z-10 w-full max-w-7xl mx-auto">
           
           {/* Section Title Marquee */}
           <div className="w-full flex justify-center mb-24">
               <div className="bg-black border-2 border-yellow-500 px-12 py-4 flex items-center justify-center relative shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                   <div className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                   <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                   <div className="absolute -left-2 -bottom-2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                   <div className="absolute -right-2 -bottom-2 w-4 h-4 rounded-full bg-white shadow-[0_0_10px_#fff]"></div>
                   
                   <h2 className="font-sans text-yellow-500 text-3xl md:text-4xl uppercase tracking-[0.2em] font-black">
                       Now Showing
                   </h2>
               </div>
           </div>

           <div className="relative">
               {experience.map((exp, i) => renderPoster(exp, 'exp', i))}
           </div>

           <div className="w-full flex justify-center mb-24 mt-20">
               <div className="bg-black border-2 border-yellow-500 px-12 py-4 flex items-center justify-center relative shadow-[0_0_30px_rgba(234,179,8,0.2)]">
                   <h2 className="font-sans text-yellow-500 text-3xl md:text-4xl uppercase tracking-[0.2em] font-black">
                       Coming Soon
                   </h2>
               </div>
           </div>

           <div className="relative">
               {education.map((edu, i) => renderPoster(edu, 'edu', i))}
           </div>

       </div>
    </div>
  );
}
