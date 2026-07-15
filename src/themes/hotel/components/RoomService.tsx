'use client';
import React, { useState } from 'react';
import { BellRing, Check, Mail, Phone, MapPin, Globe, Code2 } from 'lucide-react';

export default function RoomService({ personal, socials }: { personal: any, socials: any }) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState<string | null>(null);
  const [isRinging, setIsRinging] = useState(false);

  const handleOrder = () => {
      setIsRinging(true);
      setTimeout(() => {
          setIsRinging(false);
          setStep(3);
      }, 2000);
  };

  return (
    <div className="py-32 relative z-20 w-full bg-[#0a0f1c] min-h-[800px] flex items-center justify-center border-t border-white/5">
       
       <div className="w-full max-w-4xl mx-auto px-4 lg:px-8">
           
           <div className="text-center mb-16">
               <h2 className="font-serif text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Concierge Services</h2>
               <h3 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
                   Room Service
               </h3>
               <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
           </div>

           <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 p-8 md:p-16 backdrop-blur-sm relative overflow-hidden">
               
               {/* Corner Accents */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#d4af37]/50"></div>
               <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#d4af37]/50"></div>
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#d4af37]/50"></div>
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#d4af37]/50"></div>

               {/* Step 1: Selection */}
               {step === 1 && (
                   <div className="animate-in fade-in duration-500">
                       <p className="font-serif text-white text-xl text-center mb-12 tracking-wide">
                           How may we assist you today?
                       </p>

                       <div className="space-y-4">
                           {['A Robust Web Application', 'A Design Consultation', 'A Professional Connection', 'Just Saying Hello'].map((item) => (
                               <button aria-label="Interactive Button" key={item}
                                   onClick={() => { setSelection(item); setStep(2); }}
                                   className="w-full text-left bg-white/5 hover:bg-[#d4af37] hover:text-[#0f172a] border border-white/10 hover:border-[#d4af37] p-6 transition-all duration-300 font-serif tracking-widest uppercase text-sm text-gray-300 group"
                               >
                                   <div className="flex justify-between items-center">
                                       <span>{item}</span>
                                       <div className="w-8 h-[1px] bg-white/20 group-hover:bg-[#0f172a]/20"></div>
                                   </div>
                               </button>
                           ))}
                       </div>
                   </div>
               )}

               {/* Step 2: Confirmation / Ring Bell */}
               {step === 2 && (
                   <div className="animate-in fade-in slide-in-from-right-8 duration-500 text-center">
                       <p className="font-serif text-gray-400 text-sm tracking-widest uppercase mb-4">
                           Your Selection
                       </p>
                       <p className="font-serif text-[#d4af37] text-2xl tracking-wide mb-16">
                           "{selection}"
                       </p>

                       <button aria-label="Interactive Button" onClick={handleOrder}
                           disabled={isRinging}
                           className="relative inline-flex flex-col items-center gap-4 group"
                       >
                           <div className={`w-24 h-24 rounded-full border border-[#d4af37] flex items-center justify-center bg-white/5 group-hover:bg-[#d4af37] transition-all duration-500 ${isRinging ? 'animate-pulse bg-[#d4af37]' : ''}`}>
                               <BellRing className={`w-10 h-10 ${isRinging ? 'text-[#0f172a] animate-wiggle' : 'text-[#d4af37] group-hover:text-[#0f172a]'}`} strokeWidth={1} />
                           </div>
                           <span className="font-serif tracking-widest uppercase text-sm text-gray-400 group-hover:text-white transition-colors">
                               Ring for Concierge
                           </span>
                       </button>
                   </div>
               )}

               {/* Step 3: Contact Info Reveal */}
               {step === 3 && (
                   <div className="animate-in fade-in zoom-in-95 duration-1000 text-center">
                       <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                           <Check className="w-8 h-8 text-[#0f172a]" />
                       </div>
                       
                       <p className="font-serif text-white text-2xl tracking-wide mb-4">
                           Right away.
                       </p>
                       <p className="text-gray-400 font-light mb-12">
                           The General Manager has been notified and is ready to connect.
                       </p>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-white/10 pt-8 mt-8">
                           {personal.email && (
                               <a aria-label="Link" href={`mailto:${personal.email}`} className="flex items-start gap-4 group">
                                   <Mail className="w-6 h-6 text-[#d4af37] mt-1" strokeWidth={1} />
                                   <div>
                                       <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-1">Direct Line</p>
                                       <p className="text-white font-light group-hover:text-[#d4af37] transition-colors">{personal.email}</p>
                                   </div>
                               </a>
                           )}
                           {personal.phone && (
                               <div className="flex items-start gap-4">
                                   <Phone className="w-6 h-6 text-[#d4af37] mt-1" strokeWidth={1} />
                                   <div>
                                       <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-1">Telephone</p>
                                       <p className="text-white font-light">{personal.phone}</p>
                                   </div>
                               </div>
                           )}
                           {personal.location && (
                               <div className="flex items-start gap-4">
                                   <MapPin className="w-6 h-6 text-[#d4af37] mt-1" strokeWidth={1} />
                                   <div>
                                       <p className="font-serif text-xs tracking-widest uppercase text-gray-500 mb-1">Location</p>
                                       <p className="text-white font-light">{personal.location}</p>
                                   </div>
                               </div>
                           )}
                           <div className="flex items-center gap-4 mt-2">
                               {socials?.linkedin && (
                                   <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                                       <Globe className="w-4 h-4" />
                                   </a>
                               )}
                               {socials?.github && (
                                   <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d4af37] hover:text-[#d4af37] transition-colors">
                                       <Code2 className="w-4 h-4" />
                                   </a>
                               )}
                           </div>
                       </div>
                   </div>
               )}

           </div>
       </div>

    </div>
  );
}
