import React, { useState } from 'react';
import Image from 'next/image';
import { Fingerprint, Mail, Phone, ExternalLink, Download, FileKey } from 'lucide-react';

export default function SecurityClearance({ personal, socials }: { personal: any, socials: any }) {
  const [redacted, setRedacted] = useState(true);

  return (
    <div className="bg-[#111] border border-[#33ff33]/30 p-6 shadow-lg shadow-black flex flex-col md:flex-row gap-8 relative overflow-hidden group">
      
      {/* Background seal */}
      <div className="absolute right-0 top-0 text-[#33ff33] opacity-[0.03] scale-150 translate-x-1/4 -translate-y-1/4 pointer-events-none">
         <FileKey className="w-[400px] h-[400px]" />
      </div>

      <div className="flex-shrink-0 flex flex-col gap-4 items-center">
         <div className="relative">
            <Image src="/images/classified_agent.png" alt={personal.name} className="w-48 h-48 border-2 border-[#33ff33]/50 object-cover grayscale contrast-125" width={800} height={600} />
            
            {/* Scanner line overlay */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#33ff33] opacity-75 shadow-[0_0_10px_#33ff33] animate-[scan_3s_ease-in-out_infinite]"></div>
            
            {/* Top secret stamp */}
            <div className="absolute -bottom-4 -right-4 border-4 border-red-600 text-red-600 font-black text-xl px-2 py-1 rotate-[-15deg] bg-black/50 backdrop-blur-sm">
               TOP SECRET
            </div>
         </div>
         
         <button aria-label="Interactive Button" onClick={() => setRedacted(!redacted)}
           className="mt-4 border border-[#33ff33]/50 px-4 py-2 text-xs font-bold hover:bg-[#33ff33]/10 transition-colors w-full flex items-center justify-center gap-2"
         >
           <Fingerprint className="w-4 h-4" /> 
           {redacted ? 'DECRYPT BIO' : 'ENCRYPT BIO'}
         </button>
         <span className="text-[10px] text-[#33ff33]/50 uppercase tracking-widest mt-1">(Click to see full info)</span>
      </div>

      <div className="flex-1 flex flex-col justify-center z-10">
         <div className="flex justify-between items-start mb-4 border-b border-[#33ff33]/20 pb-4">
            <div>
               <div className="text-[#33ff33]/70 text-xs font-bold tracking-[0.3em] mb-1">SUBJECT IDENTIFIER</div>
               <h1 className="text-4xl font-black tracking-widest">{personal.name.toUpperCase()}</h1>
            </div>
            <div className="text-right">
               <div className="text-[#33ff33]/70 text-xs font-bold tracking-[0.3em] mb-1">DESIGNATION</div>
               <div className="text-xl font-bold">{personal.title}</div>
            </div>
         </div>

         <div className="mb-6 relative">
            <div className="text-[#33ff33]/70 text-xs font-bold tracking-[0.3em] mb-2">PERSONNEL BACKGROUND</div>
            <p className={`text-sm leading-relaxed max-w-2xl transition-all duration-500 ${redacted ? 'bg-black text-black select-none blur-[2px]' : 'text-gray-300'}`}>
               {personal.bio}
            </p>
            {redacted && (
               <div className="absolute inset-0 top-6 flex items-center justify-center pointer-events-none">
                  <span className="text-red-600 border-2 border-red-600 px-4 py-1 font-black text-2xl tracking-widest bg-black/80">REDACTED</span>
               </div>
            )}
         </div>

         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a aria-label="Link" href={`mailto:${personal.email}`} className="bg-[#1a1a1a] p-3 border border-[#33ff33]/20 hover:border-[#33ff33] transition-colors flex flex-col gap-2 group/link min-w-0">
               <span className="text-[10px] tracking-widest text-[#33ff33]/50 shrink-0">COMMS: EMAIL</span>
               <div className="flex items-center gap-2 text-sm min-w-0">
                 <Mail className="w-4 h-4 shrink-0 text-[#33ff33]/50 group-hover/link:text-[#33ff33]"/> 
                 <span className="truncate">{redacted ? '██████████' : personal.email}</span>
               </div>
            </a>
            <a aria-label="Link" href={`tel:${personal.phone}`} className="bg-[#1a1a1a] p-3 border border-[#33ff33]/20 hover:border-[#33ff33] transition-colors flex flex-col gap-2 group/link min-w-0">
               <span className="text-[10px] tracking-widest text-[#33ff33]/50 shrink-0">COMMS: PHONE</span>
               <div className="flex items-center gap-2 text-sm min-w-0">
                 <Phone className="w-4 h-4 shrink-0 text-[#33ff33]/50 group-hover/link:text-[#33ff33]"/> 
                 <span className="truncate">{redacted ? '████████' : personal.phone}</span>
               </div>
            </a>
            {socials?.linkedin && (
              <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="bg-[#1a1a1a] p-3 border border-[#33ff33]/20 hover:border-[#33ff33] transition-colors flex flex-col gap-2 group/link">
                 <span className="text-[10px] tracking-widest text-[#33ff33]/50">NETWORK: LINKEDIN</span>
                 <div className="flex items-center gap-2 text-sm"><ExternalLink className="w-4 h-4 text-[#33ff33]/50 group-hover/link:text-[#33ff33]"/> ACCESS NODE</div>
              </a>
            )}
            {socials?.github && (
              <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="bg-[#1a1a1a] p-3 border border-[#33ff33]/20 hover:border-[#33ff33] transition-colors flex flex-col gap-2 group/link">
                 <span className="text-[10px] tracking-widest text-[#33ff33]/50">NETWORK: GITHUB</span>
                 <div className="flex items-center gap-2 text-sm"><ExternalLink className="w-4 h-4 text-[#33ff33]/50 group-hover/link:text-[#33ff33]"/> ACCESS NODE</div>
              </a>
            )}
         </div>

         {personal.resumeUrl && (
            <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="mt-6 bg-[#33ff33]/10 border border-[#33ff33] text-[#33ff33] font-bold p-4 text-center hover:bg-[#33ff33] hover:text-black transition-colors flex justify-center items-center gap-3 tracking-widest">
               <Download className="w-5 h-5" /> EXPORT FULL DOSSIER
            </a>
         )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }
      `}} />
    </div>
  );
}
