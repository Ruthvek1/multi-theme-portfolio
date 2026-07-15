import React from 'react';
import Image from 'next/image';
import { Mail, Phone, ExternalLink, Download, ArrowRight } from 'lucide-react';

export default function BoardingPass({ personal, socials }: { personal: any, socials: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row border border-gray-200">
      
      {/* Left Stub (Main Info) */}
      <div className="flex-1 p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-gray-300 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        
        {/* Airline Header */}
        <div className="flex justify-between items-start mb-8">
           <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Passenger Name</span>
              <h1 className="text-4xl font-black uppercase text-[#1A2530]">{personal.name}</h1>
           </div>
           <div className="text-right">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Class</span>
              <div className="text-2xl font-bold text-blue-600">FIRST</div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
           <Image src="/images/airport_pilot.png" alt={personal.name} className="w-32 h-32 rounded-lg object-cover border-4 border-white shadow-lg" width={800} height={600} />
           <div className="flex-1">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bio / Remarks</span>
              <p className="text-gray-700 text-lg leading-relaxed mt-2">{personal.bio}</p>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           <a aria-label="Link" href={`mailto:${personal.email}`} className="flex flex-col gap-1 hover:text-blue-600 transition-colors">
              <span className="text-xs font-bold text-gray-400 uppercase">Email</span>
              <span className="font-semibold text-[#1A2530] flex items-center gap-2 truncate"><Mail className="w-4 h-4"/> {personal.email}</span>
           </a>
           <a aria-label="Link" href={`tel:${personal.phone}`} className="flex flex-col gap-1 hover:text-blue-600 transition-colors">
              <span className="text-xs font-bold text-gray-400 uppercase">Phone</span>
              <span className="font-semibold text-[#1A2530] flex items-center gap-2 truncate"><Phone className="w-4 h-4"/> {personal.phone}</span>
           </a>
           {socials?.linkedin && (
             <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="flex flex-col gap-1 hover:text-[#0a66c2] transition-colors">
                <span className="text-xs font-bold text-gray-400 uppercase">LinkedIn</span>
                <span className="font-semibold text-[#1A2530] flex items-center gap-2 truncate"><ExternalLink className="w-4 h-4"/> View Profile</span>
             </a>
           )}
           {socials?.github && (
             <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="flex flex-col gap-1 hover:text-gray-900 transition-colors">
                <span className="text-xs font-bold text-gray-400 uppercase">GitHub</span>
                <span className="font-semibold text-[#1A2530] flex items-center gap-2 truncate"><ExternalLink className="w-4 h-4"/> View Repos</span>
             </a>
           )}
        </div>
      </div>

      {/* Right Stub (Tear-off portion) */}
      <div className="w-full md:w-80 bg-[#1A2530] text-white p-8 md:p-12 flex flex-col justify-between">
         <div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Flight NO</div>
            <div className="text-3xl font-black text-yellow-400 mb-6">HIRE-ME</div>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Role</div>
            <div className="text-xl font-bold mb-6">{personal.title}</div>

            <div className="flex justify-between items-center mb-8">
               <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">From</div>
                  <div className="text-2xl font-black">LOCAL</div>
               </div>
               <ArrowRight className="w-6 h-6 text-yellow-400" />
               <div className="text-right">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">To</div>
                  <div className="text-2xl font-black">SUCCESS</div>
               </div>
            </div>
         </div>

         {personal.resumeUrl && (
            <a aria-label="Link" href={personal.resumeUrl} download target="_blank" rel="noreferrer" className="bg-yellow-400 text-[#1A2530] font-black uppercase tracking-widest py-4 px-6 rounded-lg text-center flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors w-full shadow-lg">
               <Download className="w-5 h-5" /> Print Ticket (CV)
            </a>
         )}
      </div>
    </div>
  );
}
