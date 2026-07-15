import React from 'react';
import Image from 'next/image';
import { Download, Mail, Phone, ExternalLink, Link2 } from 'lucide-react';

export default function DetectiveHero({ personal, socials }: { personal: any, socials: any }) {
  // A helper to render physical-looking staples
  const Staple = ({ className }: { className?: string }) => (
    <div className={`w-4 h-1 bg-gray-400 border border-gray-500 shadow-sm absolute ${className}`}>
       <div className="absolute top-0 left-0 w-1 h-1 bg-gray-600 rounded-full blur-[1px] translate-x-[-1px] translate-y-[-1px]"></div>
       <div className="absolute top-0 right-0 w-1 h-1 bg-gray-600 rounded-full blur-[1px] translate-x-[1px] translate-y-[-1px]"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mb-32 relative z-20">
       
       {/* Newspaper Container */}
       <div className="bg-[#f4f0e6] p-8 md:p-12 shadow-2xl relative rotate-[-1deg] border border-[#d1c8b3]" style={{ backgroundImage: 'radial-gradient(#d1c8b3 0.5px, transparent 0.5px)', backgroundSize: '4px 4px' }}>
          
          {/* Masthead */}
          <div className="text-center border-b-[6px] border-double border-gray-900 pb-4 mb-6">
             <h1 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 mb-2" style={{ fontVariant: 'small-caps' }}>
                The Daily Chronicle
             </h1>
             <div className="flex justify-between items-center font-serif text-xs md:text-sm uppercase font-bold text-gray-700 border-t border-b border-gray-900 py-1">
                <span>Vol. XCIII... No. 31,415</span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>Price 5 Cents</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
             
             {/* Main Article (Bio) */}
             <div className="md:col-span-8 font-serif">
                <h2 className="text-4xl md:text-5xl font-black leading-none mb-4 uppercase">
                   EXTRA! {personal.role} ASSIGNED TO THE CASE
                </h2>
                
                <h3 className="text-xl font-bold italic text-gray-800 mb-4 border-b border-gray-400 pb-2">
                   Lead Investigator {personal.name} brings unprecedented skills to unravel the city's most complex digital mysteries.
                </h3>
                
                {/* Multi-column bio */}
                <div className="columns-1 md:columns-2 gap-6 text-sm leading-relaxed text-gray-900 text-justify" style={{ columnRule: '1px solid #ccc' }}>
                   <p className="first-letter:text-6xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:mt-1">
                      {personal.bio}
                   </p>
                   {/* Just filling some space with "article" text */}
                   <p className="mt-4">
                      Sources indicate that the subject has been involved in multiple high-profile operations. Authorities have warned that the suspect is heavily armed with modern web technologies and is considered extremely capable.
                   </p>
                </div>
             </div>

             {/* Photo & Sidebar */}
             <div className="md:col-span-4 flex flex-col gap-6">
                <div className="border-4 border-gray-900 p-1 bg-white relative">
                   <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.5)_1px,transparent_1px)] bg-[size:4px_4px] mix-blend-multiply opacity-30 pointer-events-none"></div>
                   <Image src="/assets/detective-avatar.png" alt="Suspect" className="w-full h-auto aspect-[3/4] object-cover grayscale contrast-125 sepia-[0.3]" width={800} height={600} />
                   <p className="text-center font-serif text-xs font-bold mt-1 bg-gray-900 text-white p-1">FILE PHOTO: {personal.name}</p>
                </div>
             </div>

          </div>
       </div>

       {/* Interactive Layer: Business Cards stapled over the newspaper */}
       <div className="absolute -top-12 -right-8 w-64 rotate-[12deg] z-30 transition-transform hover:rotate-[5deg] hover:scale-105">
          <div className="bg-[#fefce8] p-4 shadow-xl border border-yellow-200 font-sans text-gray-800 relative">
             <Staple className="-top-1 left-12 rotate-[-5deg]" />
             <div className="font-black text-xl mb-1">{personal.name}</div>
             <div className="text-xs text-red-600 font-bold uppercase mb-4 tracking-widest border-b border-gray-300 pb-2">{personal.role}</div>
             
             <ul className="text-sm space-y-2 font-medium">
                {personal.email && (
                   <li className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" /> <a aria-label="Link" href={`mailto:${personal.email}`} className="hover:text-blue-600">{personal.email}</a>
                   </li>
                )}
                {personal.phone && (
                   <li className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" /> <a aria-label="Link" href={`tel:${personal.phone}`} className="hover:text-blue-600">{personal.phone}</a>
                   </li>
                )}
             </ul>
          </div>
       </div>

       {/* Socials as a Matchbook */}
       <div className="absolute top-1/3 -left-12 w-48 rotate-[-15deg] z-30 transition-transform hover:rotate-[-5deg] hover:scale-105">
          <div className="bg-[#1e1e1e] text-white p-4 shadow-xl border-b-8 border-gray-400 relative rounded-t-lg">
             <Staple className="bottom-2 left-1/2 -translate-x-1/2 rotate-2" />
             <div className="font-serif font-black text-center text-red-500 text-xl border-b border-white/20 pb-2 mb-3">THE UNDERGROUND</div>
             
             <ul className="text-xs space-y-3 font-mono">
                {socials.github && (
                   <li className="flex items-center justify-between hover:text-red-400">
                      <span>GITHUB:</span>
                      <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-1"><Link2 className="w-3 h-3" /> CONNECT</a>
                   </li>
                )}
                {socials.linkedin && (
                   <li className="flex items-center justify-between hover:text-red-400">
                      <span>LINKEDIN:</span>
                      <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1"><Link2 className="w-3 h-3" /> CONNECT</a>
                   </li>
                )}
                {socials.twitter && (
                   <li className="flex items-center justify-between hover:text-red-400">
                      <span>TWITTER:</span>
                      <a aria-label="Link" href={socials.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> CONNECT</a>
                   </li>
                )}
             </ul>
          </div>
       </div>

       {/* Explicit Resume Button as a Confidential Folder Tab */}
       {personal.resumeUrl && (
          <div className="absolute -bottom-6 right-12 z-30 rotate-3 transition-transform hover:translate-y-2">
             <a aria-label="Link" href={personal.resumeUrl} download className="block bg-[#d2b48c] border-2 border-[#8b4513] text-[#5c3a21] font-bold uppercase tracking-widest px-8 py-4 shadow-lg shadow-black/20 font-['Courier_New'] flex items-center gap-2">
                <Download className="w-5 h-5" /> Steal Full Dossier (Resume)
             </a>
          </div>
       )}
       
    </div>
  );
}
