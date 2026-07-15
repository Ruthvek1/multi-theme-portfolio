import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { useSpotify } from '../Adapter';
import { Play } from 'lucide-react';

export default function HomeView() {
  const { personal, projects, experience } = usePortfolio();
  const { setHoveredItem, setActiveView } = useSpotify();

  // Get greeting based on time of day
  const hour = new Date().getHours();
  let greeting = 'Good evening';
  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';

  const topProjects = projects.slice(0, 6);
  const recentExperience = experience.slice(0, 5);

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar relative">
      
      {/* Dynamic Header Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#403f3b] to-[#121212] -z-10 pointer-events-none transition-colors duration-1000"></div>

      <div className="p-6 pb-20">
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 z-10 py-4 bg-[#121212]/0 backdrop-blur-none transition-all">
           <h1 className="text-3xl font-bold text-white tracking-tight">{greeting}</h1>
        </div>

        {/* Quick Grid (Top Projects) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
           {topProjects.map((p, i) => (
             <div 
               key={p.id}
               className="h-20 bg-white/10 hover:bg-white/20 transition-colors rounded overflow-hidden flex items-center group cursor-pointer"
               onMouseEnter={() => setHoveredItem(p)}
               onMouseLeave={() => setHoveredItem(null)}
               onClick={() => setActiveView('projects')}
             >
                <Image src={p.thumbnailUrl || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"} alt={p.title} className="h-full w-20 object-cover shadow-[4px_0_10px_rgba(0,0,0,0.3)]" width={800} height={600} />
                <div className="flex-1 px-4 font-bold text-[15px] text-white truncate line-clamp-2 leading-tight">
                  {p.title}
                </div>
                <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button aria-label="Interactive Button" className="w-10 h-10 rounded-full bg-[#1db954] flex items-center justify-center shadow-lg hover:scale-105 transition-transform text-black">
                     <Play className="w-5 h-5 fill-current ml-1" />
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Made For You (Experience Shelf) */}
        <h2 className="text-2xl font-bold text-white tracking-tight mb-4 hover:underline cursor-pointer inline-block" onClick={() => setActiveView('experience')}>
          Jump back in
        </h2>
        
        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
           {recentExperience.map((exp) => (
             <div 
               key={exp.id} 
               className="min-w-[180px] max-w-[180px] p-4 bg-[#181818] hover:bg-[#282828] transition-colors rounded-lg cursor-pointer group flex flex-col"
               onMouseEnter={() => setHoveredItem(exp)}
               onMouseLeave={() => setHoveredItem(null)}
               onClick={() => setActiveView('experience')}
             >
                <div className="w-full aspect-square mb-4 relative shadow-[0_8px_24px_rgba(0,0,0,0.5)] rounded-md overflow-hidden bg-white/5">
                   <Image src={exp.logoUrl || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"} alt={exp.company} className="w-full h-full object-contain p-3" width={800} height={600} />
                   <div className="absolute bottom-2 right-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <button aria-label="Interactive Button" className="w-12 h-12 rounded-full bg-[#1db954] flex items-center justify-center shadow-xl hover:scale-105 transition-transform text-black">
                       <Play className="w-6 h-6 fill-current ml-1" />
                     </button>
                   </div>
                </div>
                <h3 className="font-bold text-white text-[15px] truncate mb-1">{exp.role}</h3>
                <p className="text-[13px] text-[#a7a7a7] line-clamp-2 leading-relaxed">
                  {exp.company} • {exp.startDate}
                </p>
             </div>
           ))}
        </div>

        {/* Heavy Rotation (Contact/Resume) */}
        <div className="mt-4">
           <h2 className="text-2xl font-bold text-white tracking-tight mb-4 hover:underline cursor-pointer inline-block" onClick={() => setActiveView('about')}>
             More of {personal?.name}
           </h2>
           <div className="flex gap-6">
              {/* Artist Profile Card */}
              <div 
                className="w-[180px] p-4 bg-[#181818] hover:bg-[#282828] transition-colors rounded-lg cursor-pointer group"
                onClick={() => setActiveView('about')}
              >
                 <div className="w-full aspect-square mb-4 relative shadow-[0_8px_24px_rgba(0,0,0,0.5)] rounded-full overflow-hidden">
                   <Image src={personal?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"} alt={personal?.name || "Avatar"} className="w-full h-full object-cover" width={800} height={600} />
                 </div>
                 <h3 className="font-bold text-white text-[15px] truncate mb-1">{personal?.name}</h3>
                 <p className="text-[13px] text-[#a7a7a7]">Artist</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
