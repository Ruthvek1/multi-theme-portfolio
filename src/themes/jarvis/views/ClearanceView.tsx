import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import { useJarvis } from '../Adapter';
import { Download, Link as LinkIcon, Mail, MapPin, Phone, Globe } from 'lucide-react';

export default function ClearanceView() {
  const { certifications, personal, socials } = usePortfolio();
  const { setActiveView } = useJarvis();

  if (!personal) return null;

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
            <div className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase mb-1">SECURITY & COMMS</div>
            <h1 className="text-3xl font-black text-white tracking-widest uppercase">CLEARANCE LEVELS</h1>
         </div>
         <button aria-label="Interactive Button" onClick={() => setActiveView('dashboard')} className="text-[#00f0ff] text-sm tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            BACK TO MAIN
         </button>
      </div>

      <div className="flex-1 flex gap-8 h-[calc(100%-100px)]">
        
        {/* Left: Certifications (Clearance Badges) */}
        <div className="w-2/3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4">
           <h2 className="text-xl font-bold text-[#ffaa00] uppercase tracking-widest mb-4">APPROVED CREDENTIALS</h2>
           
           <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert: any, i: number) => (
                 <motion.div 
                   key={cert.id || i}
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.1 }}
                   className="border border-[#00f0ff]/30 bg-black/40 p-4 relative overflow-hidden group hover:border-[#ffaa00] transition-colors"
                 >
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#00f0ff]/10 flex items-center justify-center border-b border-l border-[#00f0ff]/30 group-hover:bg-[#ffaa00]/20 group-hover:border-[#ffaa00]/50 transition-colors">
                       <span className="text-[10px] font-bold text-[#00f0ff] group-hover:text-[#ffaa00]">L{i + 1}</span>
                    </div>

                    <div className="text-[10px] text-[#00f0ff]/70 tracking-widest uppercase mb-2">{cert.date} // {cert.issuer}</div>
                    <h3 className="text-lg font-bold text-white uppercase mb-4 pr-6 leading-tight">{cert.name}</h3>
                    
                    <div className="flex gap-2">
                       {(cert.url || cert.fileUrl) && (
                          <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-3 py-1.5 border border-[#00f0ff]/50 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black uppercase text-[10px] font-bold tracking-widest transition-colors flex-1">
                             <LinkIcon className="w-3 h-3" /> VERIFY
                          </a>
                       )}
                       
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Right: Contact & Comms */}
        <div className="w-1/3 border-l border-[#00f0ff]/30 pl-8 flex flex-col gap-8">
           
           {/* Comms Link */}
           <div>
              <h2 className="text-xl font-bold text-[#ffaa00] uppercase tracking-widest mb-6">ENCRYPTED COMMS</h2>
              <div className="flex flex-col gap-4">
                 <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-[#00f0ff]/50 flex items-center justify-center group-hover:bg-[#00f0ff] group-hover:text-black text-[#00f0ff] transition-colors">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] tracking-widest text-[#00f0ff]/70">DIRECT MESSAGE</div>
                       <div className="text-white text-sm">{personal.email}</div>
                    </div>
                 </a>
                 <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-[#00f0ff]/50 flex items-center justify-center group-hover:bg-[#00f0ff] group-hover:text-black text-[#00f0ff] transition-colors">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] tracking-widest text-[#00f0ff]/70">SECURE LINE</div>
                       <div className="text-white text-sm">{personal.phone}</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-[#00f0ff]/50 flex items-center justify-center group-hover:bg-[#00f0ff] group-hover:text-black text-[#00f0ff] transition-colors">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                       <div className="text-[10px] tracking-widest text-[#00f0ff]/70">BASE COORDINATES</div>
                       <div className="text-white text-sm">{personal.location}</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Social Networks (Known Affiliates) */}
           <div>
              <h2 className="text-xl font-bold text-[#ffaa00] uppercase tracking-widest mb-6">KNOWN AFFILIATES</h2>
              <div className="flex flex-col gap-3">
                 {Object.entries(socials || {}).map(([key, url]) => {
                   if (!url) return null;
                   return (
                     <a aria-label="Link" key={key} href={url as string} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[#00f0ff]/70 hover:text-white transition-colors border border-[#00f0ff]/20 bg-black/40 p-2 hover:border-[#00f0ff]">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-widest">{key} Network</span>
                     </a>
                   );
                 })}
              </div>
           </div>

           {/* Resume Download */}
           {personal.resumeUrl && (
             <div className="mt-auto pt-4 border-t border-[#ffaa00]/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#ffaa00]/10 mix-blend-overlay group-hover:bg-[#ffaa00]/30 transition-colors" />
                {/* Scanning line */}
                <div className="absolute top-0 left-0 w-[4px] h-full bg-[#ffaa00] opacity-50 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_#ffaa00]" />
                
                <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="relative w-full flex items-center justify-between p-4 bg-transparent text-[#ffaa00] hover:text-white uppercase font-black tracking-[0.2em] transition-colors">
                   <div className="flex flex-col">
                      <span className="text-[10px] text-white/70 mb-1">SECURE EXTRACTION PROTOCOL</span>
                      <span className="group-hover:drop-shadow-[0_0_5px_#ffaa00]">DOWNLOAD DOSSIER</span>
                   </div>
                   <div className="w-12 h-12 flex items-center justify-center border-2 border-[#ffaa00] group-hover:bg-[#ffaa00] group-hover:text-black transition-colors rounded-full shadow-[0_0_15px_#ffaa00]">
                     <Download className="w-5 h-5" />
                   </div>
                </a>
             </div>
           )}

        </div>

      </div>
    </motion.div>
  );
}
