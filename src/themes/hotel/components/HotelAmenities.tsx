import React, { useState } from 'react';
import { Sparkles, Dumbbell, Coffee, Utensils, ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function HotelAmenities({ skills, certifications }: { skills: any[], certifications: any[] }) {
  const [showAllCerts, setShowAllCerts] = useState(false);
  
  // Assign a luxury icon to each skill category
  const getIconForCategory = (idx: number) => {
      const icons = [Sparkles, Dumbbell, Coffee, Utensils];
      const Icon = icons[idx % icons.length];
      return <Icon className="w-8 h-8 text-[#d4af37] mb-6 mx-auto" strokeWidth={1} />;
  };

  return (
    <div className="py-32 relative z-20 w-full bg-[#0a0f1c] border-y border-white/5">
       
       {/* Skills as Amenities */}
       <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-48">
           
           <div className="text-center mb-20">
               <h2 className="font-serif text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Five-Star Services</h2>
               <h3 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
                   Resort Amenities
               </h3>
               <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {skills.map((skillGroup, idx) => (
                   <div key={skillGroup.category} className="bg-white/5 border border-white/10 p-10 text-center hover:bg-white/10 transition-colors duration-500 group">
                       
                       {getIconForCategory(idx)}
                       
                       <h4 className="font-serif text-xl text-white tracking-widest uppercase mb-8">
                           {skillGroup.category}
                       </h4>

                       <div className="flex flex-col gap-4">
                           {skillGroup.items.map((skill: string) => (
                               <div key={skill} className="text-gray-400 font-light text-sm tracking-wider uppercase group-hover:text-white transition-colors">
                                   {skill}
                               </div>
                           ))}
                       </div>
                   </div>
               ))}
           </div>
       </div>

       {/* Certifications as Elite Memberships */}
       <div className="max-w-7xl mx-auto px-4 lg:px-8">
           <div className="text-center mb-20">
               <h2 className="font-serif text-[#d4af37] text-sm tracking-[0.3em] uppercase mb-4">Exclusive Access</h2>
               <h3 className="font-serif text-4xl md:text-5xl text-white font-light tracking-wide">
                   Elite Club Memberships
               </h3>
               <div className="w-24 h-[1px] bg-[#d4af37] mx-auto mt-8 opacity-50"></div>
           </div>

           <div className="flex flex-wrap justify-center gap-12 perspective-[1500px]">
               {(showAllCerts ? certifications : certifications.slice(0, 4)).map((cert) => (
                   <div key={cert.id} className="relative w-full max-w-sm group">
                       
                       {/* Sleek Black Metal Card */}
                       <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#333] rounded-xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform duration-700 ease-out group-hover:rotate-y-12 group-hover:rotate-x-12 group-hover:scale-105 h-64 flex flex-col relative overflow-hidden">
                           
                           {/* Card Chip / Shine */}
                           <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:animate-shine"></div>
                           
                           <div className="flex justify-between items-start mb-auto">
                               <div className="w-10 h-8 rounded-md bg-gradient-to-br from-[#ffd700] to-[#b8860b] opacity-80 border border-yellow-300/30"></div>
                               <span className="font-serif text-[#d4af37] text-xs tracking-widest uppercase">Elite Tier</span>
                           </div>

                           <div className="text-left mt-auto">
                               <h4 className="font-serif text-xl text-white tracking-widest uppercase mb-2">
                                   {cert.title}
                               </h4>
                               <div className="flex justify-between items-end">
                                   <p className="text-gray-500 font-light text-xs tracking-widest uppercase">
                                       {cert.issuer}
                                   </p>
                                   <p className="text-[#d4af37] font-serif tracking-wider text-sm">
                                       {cert.date}
                                   </p>
                               </div>
                           </div>
                       </div>

                       {/* Action Buttons below card */}
                       <div className="mt-8 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                           {(cert.url || cert.fileUrl) && (
                               <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-white border border-white/20 py-3 hover:bg-white hover:text-black transition-colors">
                                   <ExternalLink className="w-4 h-4" /> View Privileges
                               </a>
                           )}
                           
                       </div>

                   </div>
               ))}
           </div>
           
           {certifications.length > 4 && (
               <div className="flex justify-center mt-20">
                   <button 
                     onClick={() => setShowAllCerts(!showAllCerts)}
                     className="px-12 py-4 border border-[#d4af37]/50 text-[#d4af37] font-serif uppercase tracking-widest text-sm hover:bg-[#d4af37] hover:text-[#0a0f1c] transition-colors flex items-center gap-3 shadow-lg"
                   >
                     {showAllCerts ? (
                        <>Conceal Memberships <ChevronUp className="w-5 h-5" /></>
                     ) : (
                        <>View {certifications.length - 4} More Memberships <ChevronDown className="w-5 h-5" /></>
                     )}
                   </button>
               </div>
           )}
       </div>

    </div>
  );
}
