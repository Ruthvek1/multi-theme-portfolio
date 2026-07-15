import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Download, Link2 } from 'lucide-react';

export default function InmateHero({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="max-w-4xl mx-auto mb-16 relative">
       {/* Background paper effect */}
       <div className="absolute inset-0 bg-[#e2d8c3] shadow-[0_0_20px_rgba(0,0,0,0.5)] rotate-1 transform-gpu z-0 border border-gray-400"></div>
       <div className="absolute inset-0 bg-[#f4ebd8] shadow-lg -rotate-1 transform-gpu z-10 border border-gray-300">
          {/* Top border classification */}
          <div className="w-full bg-red-800 text-white text-center font-bold tracking-[0.3em] py-1 text-sm border-b border-black uppercase">
             Top Secret - Inmate Dossier
          </div>
       </div>
       
       <div className="relative z-20 p-6 md:p-10 font-mono text-gray-800">
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
             {/* Mugshot Area */}
             <div className="w-full md:w-64 shrink-0 flex flex-col items-center">
                <div className="w-full bg-gray-200 border-4 border-gray-800 p-2 relative">
                   <div className="absolute -top-4 -right-4 bg-red-600 text-white font-bold px-2 py-1 rotate-12 uppercase border-2 border-black z-10">
                      High Risk
                   </div>
                   <Image src="/assets/prison-mugshot.png" alt="Mugshot" className="w-full h-auto aspect-square object-cover grayscale contrast-125" width={800} height={600} />
                   <div className="w-full text-center mt-2 border-t border-gray-800 pt-2 font-bold tracking-widest text-xl">
                      ID: {Math.floor(Math.random() * 900000) + 100000}
                   </div>
                </div>
                
                {/* Resume Download */}
                {personal.resumeUrl && (
                  <a aria-label="Link" href={personal.resumeUrl} download className="mt-6 w-full bg-gray-800 text-white py-3 px-4 font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors uppercase border-2 border-black border-dashed">
                     <Download className="w-5 h-5" />
                     Download Parole File
                  </a>
                )}
             </div>

             {/* Details Area */}
             <div className="flex-1 w-full space-y-6">
                <div className="border-b-2 border-gray-800 pb-4">
                   <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-2">
                      {personal.name}
                   </h1>
                   <div className="text-xl font-bold text-red-800 uppercase tracking-widest">
                      AKA: {personal.title}
                   </div>
                </div>

                <div className="space-y-4">
                   <div>
                      <h3 className="font-bold uppercase text-xs text-gray-500 tracking-wider mb-1">Subject Background</h3>
                      <p className="text-sm md:text-base leading-relaxed font-medium">
                         {personal.bio}
                      </p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-dashed border-gray-400 pt-4">
                      {personal.location && (
                         <div className="flex items-center gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-gray-600 shrink-0" />
                            <span className="font-bold">Last Known Location:</span> {personal.location}
                         </div>
                      )}
                      {personal.email && (
                         <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-600 shrink-0" />
                            <a aria-label="Link" href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
                         </div>
                      )}
                      {personal.phone && (
                         <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-600 shrink-0" />
                            <span>{personal.phone}</span>
                         </div>
                      )}
                   </div>
                   
                   {/* Underworld Connections (Socials) */}
                   <div className="border-t border-dashed border-gray-400 pt-4">
                      <h3 className="font-bold uppercase text-xs text-gray-500 tracking-wider mb-3">Known Underworld Connections</h3>
                      <div className="flex flex-wrap gap-4">
                         {socials?.github && (
                           <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition-colors text-sm font-bold">
                              <Link2 className="w-4 h-4" /> GitHub
                           </a>
                         )}
                         {socials?.linkedin && (
                           <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition-colors text-sm font-bold">
                              <Link2 className="w-4 h-4" /> LinkedIn
                           </a>
                         )}
                         {socials?.instagram && (
                           <a aria-label="Link" href={socials.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-3 py-1 bg-gray-200 border border-gray-400 hover:bg-gray-300 transition-colors text-sm font-bold">
                              <Link2 className="w-4 h-4" /> Instagram
                           </a>
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </div>
          
       </div>
    </div>
  );
}
