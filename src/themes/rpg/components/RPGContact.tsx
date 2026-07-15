import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function RPGContact({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="py-24 relative w-full bg-[#111122] overflow-hidden border-t-4 border-white">
       
       <div className="relative z-10 w-full max-w-4xl mx-auto px-4 lg:px-8">
           
           <div className="w-full bg-gradient-to-b from-[#0d1b40] to-[#04081c] border-[6px] border-white p-8 shadow-[4px_4px_0_rgba(0,0,0,0.8)] rounded-sm relative">
               <div className="absolute inset-1 border-[2px] border-[#5577ff] pointer-events-none rounded-sm"></div>
               
               <h2 className="font-rpg text-yellow-400 text-4xl mb-8 text-center uppercase tracking-widest border-b-2 border-[#5577ff] pb-4">
                   Contact Inn
               </h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {personal.email && (
                        <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-center gap-4 group bg-black/40 p-4 border-2 border-transparent hover:border-yellow-400 transition-colors">
                            <Mail className="w-8 h-8 text-[#88aaff]" />
                            <div>
                                <p className="font-rpg text-xl text-gray-400 mb-1">Email</p>
                                <p className="font-rpg text-2xl text-white break-all">{personal.email}</p>
                            </div>
                        </a>
                    )}
                    {personal.phone && (
                        <div className="flex items-center gap-4 bg-black/40 p-4 border-2 border-transparent">
                            <Phone className="w-8 h-8 text-[#88aaff]" />
                            <div>
                                <p className="font-rpg text-xl text-gray-400 mb-1">Phone</p>
                                <p className="font-rpg text-2xl text-white">{personal.phone}</p>
                            </div>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center gap-4 bg-black/40 p-4 border-2 border-transparent">
                            <MapPin className="w-8 h-8 text-[#88aaff]" />
                            <div>
                                <p className="font-rpg text-xl text-gray-400 mb-1">Location</p>
                                <p className="font-rpg text-2xl text-white">{personal.location}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex items-center gap-6 p-4">
                        {socials?.linkedin && (
                            <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform bg-blue-600 text-white font-rpg px-4 py-2 text-2xl border-2 border-white shadow-[2px_2px_0_#000]">
                                LINKEDIN
                            </a>
                        )}
                        {socials?.github && (
                            <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform bg-gray-800 text-white font-rpg px-4 py-2 text-2xl border-2 border-white shadow-[2px_2px_0_#000]">
                                GITHUB
                            </a>
                        )}
                    </div>
                </div>

           </div>

       </div>
    </div>
  );
}
