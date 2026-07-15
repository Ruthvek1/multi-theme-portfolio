import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { useSteam } from '../Adapter';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoreView() {
  const { projects, experience } = usePortfolio();
  const { setActiveView, setSelectedProject } = useSteam();
  const [heroIndex, setHeroIndex] = useState(0);

  const featuredProjects = projects.slice(0, 3);
  const regularProjects = projects.slice(3);
  const recentExperience = experience.slice(0, 3);

  // Auto-advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const handlePlayGame = (project: any) => {
    setSelectedProject(project);
    setActiveView('library');
  };

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#1b2838] relative">
      
      {/* Background ambient gradient based on current hero */}
      <div 
        className="absolute top-0 left-0 w-full h-[600px] opacity-30 pointer-events-none transition-all duration-1000 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url(${featuredProjects[heroIndex]?.thumbnailUrl || ''})` }}
      />

      <div className="relative z-10 p-8 max-w-[1200px] mx-auto flex flex-col gap-12">

        {/* --- FEATURED & RECOMMENDED (Hero Carousel) --- */}
        <section>
          <h2 className="text-white text-lg font-normal mb-4 tracking-wide shadow-black drop-shadow-md">FEATURED & RECOMMENDED</h2>
          
          {featuredProjects.length > 0 && (
            <div className="w-full h-[400px] bg-black shadow-2xl relative flex">
              
              {/* Main Image */}
              <div 
                className="w-2/3 h-full cursor-pointer relative group"
                onClick={() => handlePlayGame(featuredProjects[heroIndex])}
              >
                <Image src={featuredProjects[heroIndex].thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(featuredProjects[heroIndex].title)}&size=800&background=random`} 
                  alt={featuredProjects[heroIndex].title} 
                  className="w-full h-full object-cover transition-opacity duration-300" width={800} height={600} />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-6 py-2 bg-black/60 backdrop-blur-sm text-white font-bold border border-white/20">VIEW IN LIBRARY</div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="w-1/3 h-full bg-[#0a141d] p-4 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-[#2a475e]/20 to-transparent pointer-events-none"></div>
                
                <h3 className="text-2xl text-white font-medium mb-4 relative z-10 leading-tight">
                  {featuredProjects[heroIndex].title}
                </h3>
                
                <div className="grid grid-cols-2 gap-2 mb-4 relative z-10">
                  <div className="aspect-video bg-[#1b2838]">
                    <Image alt="Image" src={featuredProjects[heroIndex].thumbnailUrl || `https://ui-avatars.com/api/?name=Screenshot&background=random`} className="w-full h-full object-cover opacity-70" width={800} height={600} />
                  </div>
                  <div className="aspect-video bg-[#1b2838]">
                    <Image alt="Image" src={`https://ui-avatars.com/api/?name=Gameplay&background=random`} className="w-full h-full object-cover opacity-70" width={800} height={600} />
                  </div>
                  <div className="aspect-video bg-[#1b2838]">
                    <Image alt="Image" src={`https://ui-avatars.com/api/?name=Features&background=random`} className="w-full h-full object-cover opacity-70" width={800} height={600} />
                  </div>
                  <div className="aspect-video bg-[#1b2838]">
                    <Image alt="Image" src={`https://ui-avatars.com/api/?name=Action&background=random`} className="w-full h-full object-cover opacity-70" width={800} height={600} />
                  </div>
                </div>

                <div className="mt-auto relative z-10">
                  <div className="text-[22px] text-[#c6d4df] mb-2">{featuredProjects[heroIndex].subtitle}</div>
                  <div className="flex items-center justify-between">
                     <span className="text-xs bg-[#4c6b22] text-[#a4d007] px-2 py-0.5 rounded-sm">Top Seller</span>
                     <span className="text-white text-lg">Free to Play</span>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="absolute -bottom-10 right-0 flex items-center gap-2">
                 <button aria-label="Interactive Button" onClick={() => setHeroIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length)}
                   className="w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-white/20 text-white rounded-sm"
                 >
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <div className="flex gap-2">
                   {featuredProjects.map((_, i) => (
                     <div 
                       key={i} 
                       onClick={() => setHeroIndex(i)}
                       className={`w-4 h-2 rounded-sm cursor-pointer transition-colors ${heroIndex === i ? 'bg-white/80' : 'bg-white/20 hover:bg-white/40'}`}
                     />
                   ))}
                 </div>
                 <button aria-label="Interactive Button" onClick={() => setHeroIndex((prev) => (prev + 1) % featuredProjects.length)}
                   className="w-8 h-8 flex items-center justify-center bg-black/40 hover:bg-white/20 text-white rounded-sm"
                 >
                   <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

            </div>
          )}
        </section>

        {/* --- SPECIAL OFFERS (Experience) --- */}
        <section className="mt-8">
          <h2 className="text-white text-lg font-normal mb-4 tracking-wide shadow-black drop-shadow-md">DEVELOPER UPDATES (EXPERIENCE)</h2>
          
          <div className="flex gap-4">
            {recentExperience.map((exp, i) => (
              <div key={exp.id} className="flex-1 bg-[#0a141d] hover:bg-[#12202c] transition-colors cursor-pointer group shadow-lg">
                <div className="w-full aspect-video relative overflow-hidden bg-[#1b2838]">
                   <Image src={exp.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&size=400&background=random`} 
                     alt={exp.company} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" width={800} height={600} />
                   <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/90 to-transparent">
                     <span className="bg-[#4c6b22] text-[#a4d007] text-[11px] font-bold px-1.5 py-0.5 uppercase tracking-wide">Update</span>
                   </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white text-[15px] font-medium mb-1 truncate group-hover:text-[#66c0f4] transition-colors">{exp.role}</h3>
                  <div className="text-[#8f98a0] text-xs mb-3">{exp.company} • {exp.startDate}</div>
                  <div className="flex items-center gap-2">
                     <span className="text-[#66c0f4] text-xs bg-[#66c0f4]/10 px-2 py-0.5 rounded-sm">Promotion</span>
                     <span className="text-[#66c0f4] text-xs bg-[#66c0f4]/10 px-2 py-0.5 rounded-sm">Career</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- MORE GAMES (Other Projects) --- */}
        {regularProjects.length > 0 && (
          <section className="mt-8 pb-16">
            <h2 className="text-white text-lg font-normal mb-4 tracking-wide shadow-black drop-shadow-md">BROWSE STEAM</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {regularProjects.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-[#171a21] hover:bg-[#2a475e] transition-colors cursor-pointer group flex flex-col shadow-md"
                  onClick={() => handlePlayGame(p)}
                >
                  <div className="w-full aspect-[3/4] relative bg-[#1b2838] overflow-hidden">
                    <Image src={p.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.title)}&size=400&background=random`} 
                      alt={p.title} 
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-all duration-500" width={800} height={600} />
                    {/* Interactive Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-black/80 backdrop-blur-sm p-3 rounded-full shadow-[0_0_15px_rgba(102,192,244,0.4)] border border-[#66c0f4]/30">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                       </div>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[#c6d4df] text-[13px] font-medium line-clamp-2 leading-snug group-hover:text-white transition-colors">
                        {p.title}
                      </h3>
                      <div className="text-[#8f98a0] text-[11px] mt-1 line-clamp-1">{p.subtitle}</div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-white text-xs bg-black/30 px-1.5 py-0.5 rounded-sm">{p.year || '2025'}</span>
                      <span className="text-xs text-[#8bc53f] font-medium">Free</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
