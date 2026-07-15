import React from 'react';
import { Mail, Phone, MapPin, Search } from 'lucide-react';

export default function CarnivalContact({ personal, socials }: { personal: any, socials: any }) {
  
  return (
    <div className="py-24 relative w-full overflow-hidden bg-[#38bdf8] flex flex-col justify-center border-t-[16px] border-t-[#fcd34d]">
       
       <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
           
           {/* Information Kiosk Booth */}
           <div className="w-full bg-white rounded-t-[50px] rounded-b-xl border-[16px] border-[#3b82f6] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 md:p-16 relative">
               
               {/* Booth Canopy (Bright Yellow/Orange) */}
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[110%] h-24 bg-gradient-to-r from-[#f59e0b] via-[#fbbf24] to-[#f59e0b] rounded-t-[100px] border-4 border-white flex items-center justify-center shadow-xl">
                   <h2 className="text-white font-sans text-3xl md:text-5xl uppercase tracking-[0.2em] font-black drop-shadow-md">
                       Information
                   </h2>
               </div>

               {/* Lost & Found Sign */}
               <div className="absolute -top-16 right-4 bg-[#f43f5e] border-4 border-white px-4 py-2 transform rotate-12 shadow-lg rounded-full">
                   <span className="text-white font-black font-sans uppercase tracking-widest text-sm flex items-center gap-2">
                       <Search size={16} /> Lost & Found
                   </span>
               </div>

               <div className="mt-12 text-center mb-12">
                   <p className="text-[#3b82f6] font-sans font-bold text-xl tracking-widest uppercase">
                       Need Assistance? Contact the Park Director
                   </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   
                   <div className="flex flex-col space-y-8">
                       {personal.email && (
                           <div className="bg-white border-4 border-gray-300 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                               <div className="bg-red-100 p-3 rounded-full text-red-600">
                                   <Mail size={24} />
                               </div>
                               <div className="overflow-hidden">
                                   <span className="block text-gray-500 font-sans text-xs uppercase tracking-widest font-bold mb-1">Electronic Mail</span>
                                   <a aria-label="Link" href={`mailto:${personal.email}`} className="text-gray-800 font-mono font-bold hover:text-red-600 transition-colors truncate block">
                                       {personal.email}
                                   </a>
                               </div>
                           </div>
                       )}

                       {personal.phone && (
                           <div className="bg-white border-4 border-gray-300 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                               <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                                   <Phone size={24} />
                               </div>
                               <div>
                                   <span className="block text-gray-500 font-sans text-xs uppercase tracking-widest font-bold mb-1">Direct Line</span>
                                   <span className="text-gray-800 font-mono font-bold">
                                       {personal.phone}
                                   </span>
                               </div>
                           </div>
                       )}
                   </div>

                   <div className="flex flex-col space-y-8">
                       {personal.location && (
                           <div className="bg-white border-4 border-gray-300 p-4 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                               <div className="bg-green-100 p-3 rounded-full text-green-600">
                                   <MapPin size={24} />
                               </div>
                               <div>
                                   <span className="block text-gray-500 font-sans text-xs uppercase tracking-widest font-bold mb-1">Park Location</span>
                                   <span className="text-gray-800 font-mono font-bold">
                                       {personal.location}
                                   </span>
                               </div>
                           </div>
                       )}

                       <div className="bg-white border-4 border-gray-300 p-4 rounded-xl flex flex-col justify-center shadow-sm h-full min-h-[88px]">
                           <span className="block text-gray-500 font-sans text-xs uppercase tracking-widest font-bold mb-2">Broadcasting On</span>
                           <div className="flex items-center gap-6">
                               {socials?.linkedin && (
                                   <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 font-black font-sans uppercase hover:underline">
                                       LinkedIn
                                   </a>
                               )}
                               {socials?.github && (
                                   <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="text-gray-800 font-black font-sans uppercase hover:underline">
                                       GitHub
                                   </a>
                               )}
                           </div>
                       </div>
                   </div>

               </div>
               
               {/* Booth Counter Edge */}
               <div className="absolute -bottom-6 left-[-16px] right-[-16px] h-12 bg-[#3b82f6] border-4 border-white rounded-lg shadow-lg"></div>
           </div>
           
           <p className="mt-16 text-white font-sans font-bold text-lg tracking-widest uppercase drop-shadow-md">
               Thanks for visiting! Have a Magical Day!
           </p>

       </div>
    </div>
  );
}
