import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePlayStation } from '../Adapter';
import { usePortfolio } from '@/core/PortfolioContext';
import { Play, Download, Settings2, MoreHorizontal, MessageSquare, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeScreen() {
  const { projects, experience, education } = usePortfolio();
  const { focusedItem, setFocusedItem } = usePlayStation();
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Wheel horizontal scroll logic
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 3, behavior: 'smooth' });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto custom-scrollbar-hide pt-16">
      
      {/* Game Details Overlay (Appears when a project is focused) */}
      <div className="flex-1 px-16 flex flex-col justify-end pb-8">
        <motion.div 
          key={focusedItem?.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <Image src={focusedItem?.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(focusedItem?.title || 'Game')}&background=random`} alt="Logo" className="h-16 w-16 object-cover rounded-xl shadow-lg mb-4" width={800} height={600} />
          <h1 className="text-4xl font-bold mb-2 tracking-tight drop-shadow-md">{focusedItem?.title}</h1>
          <p className="text-white/70 text-[15px] mb-6 line-clamp-2 drop-shadow-sm">{focusedItem?.description}</p>
          
          <div className="flex items-center gap-4">
             {focusedItem?.liveUrl ? (
               <a aria-label="Link" href={focusedItem.liveUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-white text-black px-10 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                 Play Game
               </a>
             ) : (
               <button aria-label="Interactive Button" className="flex items-center justify-center bg-white/20 backdrop-blur-md text-white px-10 py-3 rounded-full font-bold cursor-not-allowed">
                 Installed
               </button>
             )}

             {focusedItem?.githubUrl && (
               <a aria-label="Link" href={focusedItem.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center bg-[#1c1c1c]/80 backdrop-blur-md hover:bg-[#2c2c2c] text-white px-8 py-3 rounded-full font-semibold transition-colors border border-white/10 shadow-lg">
                 Add-ons (Code)
               </a>
             )}

             <button aria-label="Interactive Button" className="w-12 h-12 flex items-center justify-center bg-[#1c1c1c]/80 backdrop-blur-md hover:bg-[#2c2c2c] rounded-full transition-colors border border-white/10 shadow-lg">
                <MoreHorizontal className="w-6 h-6 text-white" />
             </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal Ribbon */}
      <div 
        ref={scrollRef}
        className="w-full flex items-center gap-4 px-16 overflow-x-auto custom-scrollbar-hide snap-x snap-mandatory py-8 shrink-0"
      >
        {projects.map((project: any) => {
          const isFocused = focusedItem?.id === project.id;
          return (
            <button aria-label="Interactive Button" key={project.id}
              onClick={() => setFocusedItem(project)}
              className={`snap-center shrink-0 rounded-2xl relative transition-all duration-300 ${
                isFocused 
                  ? 'w-[160px] h-[160px] shadow-[0_0_0_3px_white] z-10 scale-105' 
                  : 'w-[140px] h-[140px] opacity-60 hover:opacity-100 hover:scale-105'
              }`}
            >
               <Image src={project.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.title)}&background=random`} alt={project.title} className="w-full h-full object-cover rounded-2xl" width={800} height={600} />
               {!isFocused && <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>}
            </button>
          );
        })}
      </div>

      {/* Activity Feed / Official News (Experience & Education) */}
      <div className="w-full min-h-[280px] bg-black/60 backdrop-blur-xl border-t border-white/10 mt-8 shrink-0 flex flex-col p-8 pb-0">
         <h2 className="text-[17px] font-semibold text-white mb-4">Official News & Activity</h2>
         <div className="flex gap-6 overflow-x-auto custom-scrollbar-hide pb-8">
            
            {/* Experience (News) */}
            {experience.map((exp: any, i: number) => (
              <div key={`exp-${i}`} className="w-[300px] shrink-0 bg-[#2c2c2c]/50 rounded-xl overflow-hidden flex flex-col border border-white/5 hover:bg-[#3c3c3c]/80 transition-colors cursor-pointer">
                <div className="h-[100px] bg-black relative">
                   <Image alt="Image" src={exp.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=random`} className="w-full h-full object-cover opacity-80" width={800} height={600} />
                   <div className="absolute top-2 left-2 flex flex-col gap-1">
                     <span className="bg-[#00439C] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm w-fit shadow-md">Update</span>
                     <span className="bg-black/60 backdrop-blur-md text-white/80 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm w-fit shadow-md">Experience</span>
                   </div>
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                   <h3 className="text-[14px] font-medium leading-snug line-clamp-2">{exp.role} @ {exp.company}</h3>
                   <div className="flex items-center justify-between text-white/50 text-[12px] mt-2">
                      <span>{exp.startDate} - {exp.endDate}</span>
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3" />
                        <MessageSquare className="w-3 h-3" />
                      </div>
                   </div>
                </div>
              </div>
            ))}

            {/* Education (News) */}
            {education.map((edu: any, i: number) => (
              <div key={`edu-${i}`} className="w-[300px] shrink-0 bg-[#2c2c2c]/50 rounded-xl overflow-hidden flex flex-col border border-white/5 hover:bg-[#3c3c3c]/80 transition-colors cursor-pointer">
                <div className="h-[100px] bg-black relative">
                   <div className="w-full h-full bg-gradient-to-br from-[#00439C] to-purple-900 opacity-80"></div>
                   <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                     <span className="text-[15px] font-bold text-white drop-shadow-md">{edu.degree}</span>
                   </div>
                   <div className="absolute top-2 left-2 flex flex-col gap-1">
                     <span className="bg-purple-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm w-fit shadow-md">Training</span>
                     <span className="bg-black/60 backdrop-blur-md text-white/80 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-sm w-fit shadow-md">Education</span>
                   </div>
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                   <h3 className="text-[14px] font-medium leading-snug line-clamp-2">{edu.institution}</h3>
                   <div className="flex items-center justify-between text-white/50 text-[12px] mt-2">
                      <span>{edu.startDate} - {edu.endDate}</span>
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3" />
                        <MessageSquare className="w-3 h-3" />
                      </div>
                   </div>
                </div>
              </div>
            ))}

         </div>
      </div>

    </div>
  );
}
