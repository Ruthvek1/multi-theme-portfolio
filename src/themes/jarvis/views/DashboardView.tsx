import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import { useJarvis } from '../Adapter';
import TerminalText from '../components/TerminalText';
import { Download } from 'lucide-react';

export default function DashboardView() {
  const { personal } = usePortfolio();
  const { setActiveView } = useJarvis();

  if (!personal) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 w-full h-full p-12 flex items-center justify-between pointer-events-auto z-30"
    >
      
      {/* Left Panel: Bio & Identity */}
      <div className="w-[400px] h-full flex flex-col justify-center gap-8">
        <div className="border-l-2 border-[#00f0ff] pl-6 py-2 relative">
          <div className="absolute top-0 left-0 w-4 h-[2px] bg-[#00f0ff]" />
          <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#00f0ff]" />
          
          <div className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase mb-2">SUBJECT PROFILE</div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-1 uppercase">{personal.name}</h1>
          
          <div className="text-sm text-[#00f0ff]/80 leading-relaxed text-justify mb-6">
            <TerminalText text={personal.bio} delay={0.5} />
          </div>

          {/* Core Stats */}
          <div className="grid grid-cols-2 gap-4">
             <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 p-3 rounded-sm flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">100%</span>
                <span className="text-[10px] tracking-widest text-[#00f0ff] mt-1">SYS INTEGRITY</span>
             </div>
             <div className="border border-[#00f0ff]/30 bg-[#00f0ff]/5 p-3 rounded-sm flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-white">{personal.location}</span>
                <span className="text-[10px] tracking-widest text-[#00f0ff] mt-1">LOCATION</span>
             </div>
          </div>

          {/* Resume Download */}
          {personal.resumeUrl && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 flex flex-col items-center w-full"
            >
              <div className="w-full border border-[#ffaa00]/30 relative overflow-hidden group bg-black/40">
                 <div className="absolute inset-0 bg-[#ffaa00]/10 mix-blend-overlay group-hover:bg-[#ffaa00]/30 transition-colors" />
                 <div className="absolute top-0 left-0 w-[4px] h-full bg-[#ffaa00] opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#ffaa00]" />
                 
                 <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="relative w-full flex items-center justify-between p-3 bg-transparent text-[#ffaa00] hover:text-white uppercase font-black tracking-[0.2em] transition-colors">
                    <div className="flex flex-col pl-2">
                       <span className="text-[9px] text-white/70 mb-0.5">SECURE EXTRACTION</span>
                       <span className="text-sm group-hover:drop-shadow-[0_0_5px_#ffaa00]">DOWNLOAD DOSSIER</span>
                    </div>
                    <div className="w-10 h-10 flex items-center justify-center border-2 border-[#ffaa00] group-hover:bg-[#ffaa00] group-hover:text-black transition-colors rounded-full shadow-[0_0_15px_#ffaa00]">
                      <Download className="w-4 h-4" />
                    </div>
                 </a>
              </div>
              <span className="text-[9px] text-[#ffaa00]/50 uppercase font-bold tracking-[0.3em] mt-3">CV / RESUME</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Panel: Navigation Modules */}
      <div className="w-[300px] h-full flex flex-col justify-center gap-4">
         <NavButton title="Prototypes & Missions" subtitle="Project Archives" onClick={() => setActiveView('prototypes')} delay={0.8} />
         <NavButton title="System Diagnostics" subtitle="Experience & Skills" onClick={() => setActiveView('diagnostics')} delay={0.9} />
         <NavButton title="Clearance Levels" subtitle="Certifications & Comms" onClick={() => setActiveView('clearance')} delay={1.0} />
      </div>
      
    </motion.div>
  );
}

function NavButton({ title, subtitle, onClick, delay }: { title: string, subtitle: string, onClick: () => void, delay: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
      className="group w-full text-left relative overflow-hidden border border-[#00f0ff]/30 bg-black/40 p-4 hover:border-[#00f0ff] transition-colors"
    >
      <div className="absolute inset-0 bg-[#00f0ff]/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      <div className="relative z-10 flex flex-col">
        <span className="text-[10px] tracking-widest text-[#00f0ff] uppercase">{subtitle}</span>
        <span className="text-lg font-bold text-white uppercase group-hover:text-[#00f0ff] transition-colors mt-1">{title}</span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5 text-[#00f0ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </div>
    </motion.button>
  );
}
