import React from 'react';
import Image from 'next/image';
import { Mail, Phone, ExternalLink, Download } from 'lucide-react';

export default function DriverProfile({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 flex flex-col relative overflow-hidden">
       {/* Driver Number Background Watermark */}
       <div className="absolute -right-4 -bottom-10 text-[180px] font-black text-gray-800/30 italic leading-none pointer-events-none select-none">
         44
       </div>

       <div className="bg-gray-800/50 p-2 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-800">
          Driver Dossier
       </div>
       
       <div className="p-4 relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
             <Image src="/images/f1_racer.png" alt={personal.name} className="w-20 h-20 rounded-lg border-2 border-white object-cover shadow-[0_0_15px_rgba(255,255,255,0.2)]" width={800} height={600} />
             <div>
               <div className="text-[#ff1801] font-bold text-xs uppercase tracking-widest mb-1">{personal.title}</div>
               <h1 className="text-2xl font-black italic tracking-tighter leading-none">{personal.name.toUpperCase()}</h1>
             </div>
          </div>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
             {personal.bio}
          </p>

          <div className="grid grid-cols-2 gap-2 mt-2">
             <a aria-label="Link" href={`mailto:${personal.email}`} className="bg-[#222] border border-gray-700 p-2 flex flex-col items-center justify-center gap-1 text-xs hover:border-white transition-colors">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</div>
                <div className="text-[10px] text-gray-500 font-normal truncate w-full text-center px-1">{personal.email}</div>
             </a>
             <a aria-label="Link" href={`tel:${personal.phone}`} className="bg-[#222] border border-gray-700 p-2 flex flex-col items-center justify-center gap-1 text-xs hover:border-white transition-colors">
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> Call</div>
                <div className="text-[10px] text-gray-500 font-normal truncate w-full text-center px-1">{personal.phone}</div>
             </a>
             {socials?.linkedin && (
                <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="bg-[#222] border border-gray-700 p-2 flex items-center justify-center gap-2 text-xs hover:border-[#0a66c2] transition-colors">
                   <ExternalLink className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
                </a>
             )}
             {socials?.github && (
                <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="bg-[#222] border border-gray-700 p-2 flex items-center justify-center gap-2 text-xs hover:border-white transition-colors">
                   <ExternalLink className="w-4 h-4" /> GitHub
                </a>
             )}
          </div>

          {personal.resumeUrl && (
             <div className="flex flex-col items-center gap-1 mt-2">
               <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="w-full bg-[#ff1801] text-white font-bold p-3 flex items-center justify-center gap-2 hover:bg-red-700 transition-colors uppercase tracking-widest text-sm shadow-[0_4px_14px_0_rgba(255,24,1,0.39)]">
                  <Download className="w-5 h-5" /> Download Telemetry Data
               </a>
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Curriculum Vitae (CV)</span>
             </div>
          )}
       </div>
    </div>
  );
}
