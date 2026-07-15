import React from 'react';
import Image from 'next/image';
import { MapPin, Map, Share2, Bookmark, Navigation } from 'lucide-react';

export default function LocationHero({ personal, socials }: { personal: any, socials: any }) {
  // CSS Map background pattern
  const mapBackground = `
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0) 10%, rgba(255, 255, 255, 0.8) 100%),
    repeating-linear-gradient(45deg, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px),
    repeating-linear-gradient(-45deg, #e5e7eb 0, #e5e7eb 1px, transparent 1px, transparent 20px)
  `;

  return (
    <div className="w-full bg-[#f8f9fa] relative overflow-hidden flex flex-col md:flex-row">
       {/* Fake Map Background Layer */}
       <div 
         className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" 
         style={{ backgroundImage: mapBackground }} 
       />
       
       {/* Left side: Information Panel */}
       <div className="w-full md:w-[400px] bg-white shadow-2xl relative z-10 flex flex-col h-auto md:min-h-[500px]">
          {/* Header Image Area */}
          <div className="h-48 bg-blue-100 relative overflow-hidden group">
             <Image src="/assets/maps-avatar.png" alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" width={800} height={600} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h1 className="text-3xl font-black text-white">{personal.name}</h1>
             </div>
          </div>
          
          {/* Info Details */}
          <div className="p-6 flex-1 flex flex-col">
             <div className="flex items-center text-blue-600 font-bold mb-1">
                <span className="flex items-center gap-1">5.0 <span className="text-yellow-400">★★★★★</span></span>
                <span className="text-gray-500 font-normal ml-2">(1,248 reviews)</span>
             </div>
             
             <div className="text-gray-600 text-sm mb-4">{personal.title}</div>
             
             <p className="text-gray-800 leading-relaxed mb-6 flex-1">
                {personal.bio}
             </p>
             
             <div className="flex items-center gap-2 text-gray-700 mb-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <span>{personal.location}</span>
             </div>
             
             {personal.email && (
               <div className="flex items-center gap-2 text-blue-600 font-medium mb-2 hover:underline cursor-pointer">
                  <Map className="w-5 h-5 text-gray-500" />
                  <a aria-label="Link" href={`mailto:${personal.email}`}>{personal.email}</a>
               </div>
             )}
             
             {personal.phone && (
               <div className="flex items-center gap-2 text-gray-700 font-medium mb-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{personal.phone}</span>
               </div>
             )}
             
             {/* Social Links */}
             <div className="flex gap-4 mb-6">
                {socials.linkedin && (
                  <a aria-label="Link" href={socials.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline">LinkedIn</a>
                )}
                {socials.github && (
                  <a aria-label="Link" href={socials.github} target="_blank" rel="noreferrer" className="text-gray-800 font-bold hover:underline">GitHub</a>
                )}
                {socials.instagram && (
                  <a aria-label="Link" href={socials.instagram} target="_blank" rel="noreferrer" className="text-pink-600 font-bold hover:underline">Instagram</a>
                )}
             </div>

             {/* Action Buttons */}
             <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-100">
                <button aria-label="Interactive Button" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                   <Navigation className="w-5 h-5" /> Directions
                </button>
                {personal.resumeUrl && (
                  <a aria-label="Link" href={personal.resumeUrl} download className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors text-center">
                     Download Resume
                  </a>
                )}
                <button aria-label="Interactive Button" className="p-2 border border-gray-300 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
                   <Bookmark className="w-5 h-5" />
                </button>
                <button aria-label="Interactive Button" className="p-2 border border-gray-300 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
                   <Share2 className="w-5 h-5" />
                </button>
             </div>
          </div>
       </div>

       {/* Right side: Map Viewport (Visual) */}
       <div className="flex-1 min-h-[300px] relative flex items-center justify-center bg-[#eef1f3] overflow-hidden">
          {/* Subtle Map Image Background overlaying the grid */}
          <div 
             className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none bg-cover bg-center"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')` }}
          />

          <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded shadow text-sm font-bold text-gray-700 z-10 flex items-center gap-2">
             <Map className="w-4 h-4 text-blue-500" /> Default Map View
          </div>
          
          {/* Giant Map Pin with GPS Pulsing Rings */}
          <div className="relative flex items-center justify-center">
             {/* Pulsing Rings */}
             <div className="absolute w-32 h-32 bg-blue-500/20 rounded-full animate-ping z-0"></div>
             <div className="absolute w-48 h-48 bg-blue-500/10 rounded-full animate-ping z-0" style={{ animationDelay: '0.5s' }}></div>
             <div className="absolute w-16 h-16 bg-blue-500/40 rounded-full animate-pulse z-0"></div>
             
             {/* Pin */}
             <div className="relative animate-bounce-slow z-20 -mt-12">
                <MapPin className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-xl relative" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/40 rounded-[100%] blur-[2px]"></div>
             </div>
          </div>
       </div>
    </div>
  );
}
