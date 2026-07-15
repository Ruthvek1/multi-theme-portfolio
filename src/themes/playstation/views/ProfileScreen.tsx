import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { User, Mail, MapPin, Phone, Download, ShieldCheck, Code, Globe, MessageSquare } from 'lucide-react';

export default function ProfileScreen() {
  const { personal, socials } = usePortfolio();

  return (
    <div className="w-full h-full flex flex-col justify-end pb-12 px-16 z-10 relative">
      <div className="w-full max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex gap-12 shadow-2xl">
         
         {/* Left Column: Avatar & Basic Info */}
         <div className="flex flex-col items-center w-64 shrink-0">
            <div className="w-48 h-48 rounded-full border-4 border-white/20 p-2 overflow-hidden mb-6 bg-black/40 shadow-inner">
               <Image src={"/assets/psn-avatar-v2.png"} alt="Avatar" className="w-full h-full object-cover rounded-full" width={800} height={600} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1">{personal?.name}</h1>
            <div className="flex items-center gap-2 text-white/50 text-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>PS Plus Premium (Available)</span>
            </div>
            
            <div className="flex flex-col items-center w-full mb-4">
              <a aria-label="Link" href={personal?.resumeUrl} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-lg">
                 <Download className="w-4 h-4" />
                 View Player Manual
              </a>
              <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest mt-2">CV / Resume</span>
            </div>
         </div>

         {/* Right Column: Details & Socials (Friends) */}
         <div className="flex-1 flex flex-col pt-4">
            
            {/* Bio Section */}
            <h2 className="text-lg font-semibold text-white/80 mb-3 border-b border-white/10 pb-2">About Me</h2>
            <p className="text-white/70 leading-relaxed text-[15px] mb-8 pr-12">
               {personal?.bio}
            </p>

            {/* Contact Details Grid */}
            <h2 className="text-lg font-semibold text-white/80 mb-4 border-b border-white/10 pb-2">Contact Details</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                 <Mail className="w-6 h-6 text-white/50" />
                 <div className="flex flex-col">
                   <span className="text-[12px] text-white/50 uppercase font-bold tracking-wider">Email Address</span>
                   <span className="text-white text-sm">{personal?.email}</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                 <Phone className="w-6 h-6 text-white/50" />
                 <div className="flex flex-col">
                   <span className="text-[12px] text-white/50 uppercase font-bold tracking-wider">Phone</span>
                   <span className="text-white text-sm">{personal?.phone || 'Hidden'}</span>
                 </div>
               </div>
               <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                 <MapPin className="w-6 h-6 text-white/50" />
                 <div className="flex flex-col">
                   <span className="text-[12px] text-white/50 uppercase font-bold tracking-wider">Location</span>
                   <span className="text-white text-sm">{personal?.location}</span>
                 </div>
               </div>
            </div>

            {/* Socials (Friends List equivalent) */}
            <h2 className="text-lg font-semibold text-white/80 mb-4 border-b border-white/10 pb-2">Linked Accounts (Friends)</h2>
            <div className="flex gap-4">
               {Object.entries(socials || {}).map(([key, url]) => {
                 let Icon = Globe;
                 let color = 'hover:bg-blue-600';
                 if (key.toLowerCase().includes('github')) {
                   Icon = Code;
                   color = 'hover:bg-gray-700';
                 }

                 return (
                   <a aria-label="Link" key={key} href={url as string} target="_blank" rel="noreferrer" className={`w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-white transition-all ${color} hover:scale-110 hover:shadow-lg`}>
                      <Icon className="w-6 h-6" />
                   </a>
                 );
               })}
            </div>

         </div>

      </div>
    </div>
  );
}
