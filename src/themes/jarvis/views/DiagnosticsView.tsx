import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import { useJarvis } from '../Adapter';

export default function DiagnosticsView() {
  const { experience, education, skills } = usePortfolio();
  const { setActiveView } = useJarvis();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 w-full h-full p-12 flex flex-col pointer-events-auto z-30"
    >
      {/* Header */}
      <div className="flex justify-between items-end border-b border-[#00f0ff]/30 pb-4 mb-8">
         <div>
            <div className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase mb-1">SYSTEM DIAGNOSTICS</div>
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">CAPABILITIES & TIMELINE</h1>
         </div>
         <button aria-label="Interactive Button" onClick={() => setActiveView('dashboard')} className="text-[#00f0ff] text-sm tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO MAIN
         </button>
      </div>

      <div className="flex-1 flex gap-8 h-[calc(100%-100px)]">
        
        {/* Left: Skills (Radar/Diagnostic style) */}
        <div className="w-1/3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4">
           {skills.map((skillGroup: any, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border border-[#00f0ff]/20 bg-[#00f0ff]/5 p-6 relative"
              >
                 <div className="absolute top-0 left-0 w-2 h-full bg-[#00f0ff]" />
                 <h2 className="text-xl font-bold text-white uppercase mb-4 pl-4 tracking-widest">{skillGroup.category}</h2>
                 
                 <div className="flex flex-col gap-3 pl-4">
                    {skillGroup.items.map((skill: string, j: number) => (
                       <div key={j} className="flex items-center gap-4">
                          <div className="w-24 text-[10px] text-[#00f0ff]/70 tracking-widest uppercase truncate">{skill}</div>
                          <div className="flex-1 h-[2px] bg-black relative">
                             {/* Random width for HUD effect */}
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                               transition={{ duration: 1, delay: i * 0.1 + j * 0.05 }}
                               className="absolute left-0 top-0 h-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]"
                             />
                          </div>
                          <div className="text-[10px] text-white">OK</div>
                       </div>
                    ))}
                 </div>
              </motion.div>
           ))}
        </div>

        {/* Right: Experience Timeline */}
        <div className="flex-1 border border-[#00f0ff]/30 bg-black/40 p-8 overflow-y-auto custom-scrollbar relative">
           <div className="absolute left-10 top-0 bottom-0 w-[1px] bg-[#00f0ff]/20" />
           
           <h2 className="text-2xl font-black text-[#ffaa00] uppercase tracking-widest mb-8 ml-8">OPERATIONAL HISTORY</h2>
                      <div className="flex flex-col gap-8">
              {[...experience, ...education].map((item: any, i: number) => {
                 const isEdu = !!item.degree;
                 const accentColor = isEdu ? '#00ff00' : '#ffaa00';
                 const accentClass = isEdu ? 'border-[#00ff00]' : 'border-[#ffaa00]';
                 const bgClass = isEdu ? 'bg-[#00ff00]/10' : 'bg-[#ffaa00]/10';
                 const textClass = isEdu ? 'text-[#00ff00]' : 'text-[#ffaa00]';
                 const shadowClass = isEdu ? 'shadow-[0_0_10px_#00ff00]' : 'shadow-[0_0_10px_#ffaa00]';
                 const lineClass = isEdu ? 'bg-[#00ff00]/30' : 'bg-[#ffaa00]/30';

                 return (
                   <motion.div 
                     key={item.id || i}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.15 }}
                     className="relative pl-12"
                   >
                      {/* Node marker */}
                      <div className={`absolute left-[-4px] top-1 w-3 h-3 border-2 ${accentClass} bg-black rounded-full ${shadowClass}`} />
                      <div className={`absolute left-[1.5px] top-4 w-[1px] h-full ${lineClass}`} />

                      <div className="flex gap-4 mb-2">
                         <span className="text-[#00f0ff] font-mono text-sm border border-[#00f0ff]/30 px-2 py-0.5 bg-[#00f0ff]/10">
                            {item.startDate} - {item.endDate || 'PRESENT'}
                         </span>
                         <span className={`${textClass} ${bgClass} ${accentClass} border px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold flex items-center`}>
                            {isEdu ? 'TRAINING LOG' : 'MISSION LOG'}
                         </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white uppercase">{item.role || item.degree}</h3>
                      <div className={`${textClass} text-sm uppercase tracking-widest mb-4`}>{item.company || item.school}</div>
                      
                      {item.description && (
                        <div className="text-[#00f0ff]/70 text-sm leading-relaxed text-justify bg-[#00f0ff]/5 p-4 border-l border-[#00f0ff]/30">
                           {item.description}
                        </div>
                      )}
                   </motion.div>
                 );
              })}
           </div>
        </div>

      </div>
    </motion.div>
  );
}
