import React from 'react';
import Image from 'next/image';
import { Download, Mail, Phone, ExternalLink, Globe, Code2 } from 'lucide-react';

export default function LibraryHero({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 z-20">
       
       {/* Background ambient lighting for the desk */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-900/10 blur-[120px] rounded-full pointer-events-none"></div>
       <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-yellow-600/10 blur-[100px] rounded-full pointer-events-none animate-pulse duration-3000"></div>

       <div className="relative max-w-6xl w-full mx-auto animate-in zoom-in-95 fade-in duration-1000">
           
           {/* The Massive Open Book */}
           <div className="flex flex-col lg:flex-row w-full aspect-auto lg:aspect-[2/1.2] bg-[#fdf3d8] bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')] shadow-[0_20px_60px_rgba(0,0,0,0.6),inset_0_0_100px_rgba(139,69,19,0.3)] rounded-sm relative before:absolute before:inset-0 before:border-[12px] before:border-[#4a3018] before:rounded-lg">
               
               {/* Book Center Binding */}
               <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-[rgba(139,69,19,0.4)] via-[rgba(139,69,19,0.1)] to-[rgba(139,69,19,0.4)] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] z-10 border-l border-r border-[#8b4513]/30"></div>

               {/* Left Page (Avatar) */}
               <div className="w-full lg:w-1/2 p-12 lg:p-16 relative">
                   <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(139,69,19,0.1)] pointer-events-none"></div>
                   
                   <h2 className="font-serif text-[#4a3018] text-2xl mb-8 italic text-center tracking-widest border-b border-[#4a3018]/20 pb-4">
                       Liber Primus
                   </h2>

                   <div className="relative w-full aspect-square border-4 border-[#4a3018] p-2 bg-[#fffdf5] shadow-inner rotate-[-1deg]">
                       <Image src="/assets/library-avatar.png" alt="Scholar Avatar" className="w-full h-full object-cover mix-blend-multiply opacity-90 sepia-[0.3]" width={800} height={600} />
                   </div>

                   <div className="mt-8 text-center font-serif text-[#4a3018]/60 text-sm italic">
                       Figure 1: The Scholar
                   </div>
               </div>

               {/* Right Page (Bio & Contact) */}
               <div className="w-full lg:w-1/2 p-12 lg:p-16 relative">
                   <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[rgba(139,69,19,0.1)] pointer-events-none"></div>
                   
                   <div className="h-full flex flex-col justify-between">
                       <div>
                           <h1 className="font-serif text-5xl md:text-6xl text-[#4a3018] font-bold mb-4 capitalize">
                               {personal.name}
                           </h1>
                           <div className="text-xl font-serif text-[#8b4513] italic mb-8 border-b-2 border-[#8b4513]/30 inline-block pb-1">
                               {personal.role}
                           </div>

                           <div className="font-serif text-[#4a3018]/80 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-[#8b4513]">
                               {personal.bio}
                           </div>
                       </div>

                       <div className="mt-12 space-y-4 font-serif text-[#4a3018]">
                           <div className="flex items-center gap-4">
                               <Mail className="w-5 h-5 text-[#8b4513]" />
                               <a aria-label="Link" href={`mailto:${personal.email}`} className="hover:text-[#8b4513] transition-colors">{personal.email}</a>
                           </div>
                           <div className="flex items-center gap-4">
                               <Phone className="w-5 h-5 text-[#8b4513]" />
                               <span>{personal.phone}</span>
                           </div>
                           <div className="flex items-center gap-4">
                               <Globe className="w-5 h-5 text-[#8b4513]" />
                               <span>{personal.location}</span>
                           </div>
                       </div>

                       {/* Socials at the bottom of the page */}
                       <div className="flex gap-4 mt-8 pt-8 border-t border-[#4a3018]/20">
                            {socials?.linkedin && (
                               <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#4a3018]/40 flex items-center justify-center text-[#4a3018] hover:bg-[#8b4513] hover:text-[#fdf3d8] transition-all">
                                  <Globe className="w-4 h-4" />
                               </a>
                            )}
                            {socials?.github && (
                               <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#4a3018]/40 flex items-center justify-center text-[#4a3018] hover:bg-[#8b4513] hover:text-[#fdf3d8] transition-all">
                                  <Code2 className="w-4 h-4" />
                               </a>
                            )}
                            {socials?.twitter && (
                               <a aria-label="Link" href={socials.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#4a3018]/40 flex items-center justify-center text-[#4a3018] hover:bg-[#8b4513] hover:text-[#fdf3d8] transition-all">
                                  <ExternalLink className="w-4 h-4" />
                               </a>
                            )}
                       </div>
                   </div>

                   {/* Hanging Bookmark (Resume) */}
                   <a aria-label="Link" href={personal.resumeUrl} 
                      target="_blank"
                      rel="noreferrer"
                      className="absolute -right-8 -bottom-16 w-16 md:w-20 bg-[#8b0000] text-[#fdf3d8] py-20 px-2 flex flex-col items-center shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform hover:translate-y-4 group z-20"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}
                   >
                       <div className="flex flex-col items-center gap-4 -mt-4 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Download className="w-6 h-6" />
                          <span className="[writing-mode:vertical-rl] text-xs tracking-[0.3em] uppercase font-serif font-bold">
                             Compendium
                          </span>
                       </div>
                       <div className="absolute top-0 left-0 right-0 h-2 bg-[#5a0000]"></div>
                   </a>

               </div>

           </div>
       </div>

    </div>
  );
}
