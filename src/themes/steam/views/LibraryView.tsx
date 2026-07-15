import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { useSteam } from '../Adapter';
import { Play, Settings, Info, Trophy, Clock, Star, Download } from 'lucide-react';
import Link from 'next/link';

export default function LibraryView() {
  const { projects, skills } = usePortfolio();
  const { selectedProject, setSelectedProject } = useSteam();

  if (!selectedProject && projects.length > 0) {
    return null; // Adapter handles setting default
  }

  // Extract individual skills to act as achievements
  const allSkills = skills.flatMap(s => s.items);
  const projectAchievements = allSkills.slice(0, 10); // Pick the first 10 as "Achievements"

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#171a21] select-none text-[#8f98a0]">
      
      {/* Left Sidebar: Game List */}
      <div className="w-[280px] shrink-0 bg-[#1b2838] flex flex-col border-r border-[#2a475e]">
         
         <div className="h-[60px] flex items-center px-4 gap-4 bg-[#171a21] border-b border-[#2a475e]">
            <input 
              type="text" 
              placeholder="Search by name" 
              className="w-full bg-[#1b2838] border border-[#3d4450] text-[#c6d4df] px-3 py-1.5 rounded-sm text-[13px] outline-none focus:border-[#66c0f4] transition-colors"
            />
         </div>

         <div className="flex-1 overflow-y-auto custom-scrollbar py-2">
            <div className="px-4 py-2 text-[11px] font-bold tracking-wider text-[#66c0f4] uppercase">Uncategorized ({projects.length})</div>
            {projects.map((p) => (
              <div 
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`flex items-center gap-3 px-4 py-1.5 cursor-pointer transition-colors ${selectedProject?.id === p.id ? 'bg-[#3d4450]/50 text-white' : 'hover:bg-[#2a475e]/50 hover:text-[#c6d4df]'}`}
              >
                 <div className="w-6 h-6 bg-black rounded-sm shrink-0 overflow-hidden">
                    <Image alt="Image" src={p.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.title)}&background=random`} className="w-full h-full object-cover" width={800} height={600} />
                 </div>
                 <span className="text-[13px] font-medium truncate">{p.title}</span>
              </div>
            ))}
         </div>
      </div>

      {/* Right Content: Game Details */}
      <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative bg-[#0a141d]">
        
        {/* Massive Hero Banner */}
        <div className="relative w-full h-[350px] shrink-0 overflow-hidden group">
          <div className="absolute inset-0 bg-black">
             <Image src={selectedProject?.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProject?.title || 'Game')}&size=1200&background=random`} 
               alt={selectedProject?.title} 
               className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700" width={800} height={600} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a141d] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-6 left-8 flex items-end gap-6">
            <div className="w-32 h-32 bg-black rounded shadow-[0_0_20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden shrink-0">
               <Image alt="Image" src={selectedProject?.thumbnailUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProject?.title || 'Game')}&size=400&background=random`} className="w-full h-full object-cover" width={800} height={600} />
            </div>
            <div className="mb-2">
              <h1 className="text-[44px] font-bold text-white tracking-tight drop-shadow-lg leading-none mb-2">
                {selectedProject?.title}
              </h1>
              <div className="flex gap-4 text-[13px] text-[#c6d4df]">
                <div className="flex flex-col">
                  <span className="text-[#8f98a0]">PLAY TIME</span>
                  <span>143 hours</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8f98a0]">LAST PLAYED</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Play Action Bar */}
        <div className="h-[70px] bg-gradient-to-r from-[#171a21] to-[#1b2838] shrink-0 border-b border-[#2a475e] flex items-center px-8 justify-between z-10 sticky top-0 shadow-xl">
           
           <div className="flex items-center gap-6">
              {/* Play Button (Live Demo) */}
              {selectedProject?.liveUrl ? (
                <Link href={selectedProject.liveUrl} target="_blank" className="flex items-center gap-3 bg-gradient-to-r from-[#75b022] to-[#588a1b] hover:from-[#8bc53f] hover:to-[#6aa621] text-white px-8 py-2 rounded-sm shadow-[0_0_10px_rgba(117,176,34,0.3)] hover:shadow-[0_0_15px_rgba(139,197,63,0.5)] transition-all">
                  <Play className="w-6 h-6 fill-white" />
                  <div className="flex flex-col">
                    <span className="text-xl font-medium tracking-wide leading-none">PLAY</span>
                    <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest mt-1">Demo</span>
                  </div>
                </Link>
              ) : (
                <button aria-label="Interactive Button" disabled className="flex items-center gap-3 bg-[#3d4450] text-[#8f98a0] px-8 py-2 rounded-sm cursor-not-allowed">
                  <Play className="w-6 h-6 fill-[#8f98a0]" />
                  <div className="flex flex-col">
                    <span className="text-xl font-medium tracking-wide leading-none">NOT AVAILABLE</span>
                    <span className="text-[10px] text-[#8f98a0]/80 font-bold uppercase tracking-widest mt-1">Demo</span>
                  </div>
                </button>
              )}

              {/* Install Button (GitHub) */}
              {selectedProject?.githubUrl && (
                <Link href={selectedProject.githubUrl} target="_blank" className="flex flex-col items-center justify-center bg-[#2a475e] hover:bg-[#66c0f4] hover:text-white text-[#c6d4df] h-12 px-6 rounded-sm transition-colors group">
                  <span className="text-[14px] font-bold uppercase tracking-wider">Source Code</span>
                </Link>
              )}
           </div>

           <div className="flex items-center gap-2">
             <button aria-label="Interactive Button" className="w-10 h-10 bg-[#1b2838] hover:bg-[#2a475e] text-[#c6d4df] hover:text-white rounded-sm flex items-center justify-center transition-colors">
               <Settings className="w-5 h-5" />
             </button>
             <button aria-label="Interactive Button" className="w-10 h-10 bg-[#1b2838] hover:bg-[#2a475e] text-[#c6d4df] hover:text-white rounded-sm flex items-center justify-center transition-colors">
               <Info className="w-5 h-5" />
             </button>
             <button aria-label="Interactive Button" className="w-10 h-10 bg-[#1b2838] hover:bg-[#2a475e] text-[#c6d4df] hover:text-white rounded-sm flex items-center justify-center transition-colors">
               <Star className="w-5 h-5" />
             </button>
           </div>
        </div>

        {/* Content Body */}
        <div className="p-8 flex gap-8">
          
          {/* Main Feed */}
          <div className="flex-1 flex flex-col gap-6">
            
            <div className="bg-[#171a21] rounded overflow-hidden">
               <div className="p-6">
                 <h2 className="text-white text-lg font-medium mb-4">Activity Feed</h2>
                 <p className="text-[15px] leading-relaxed text-[#c6d4df]">
                   {selectedProject?.description || "No description provided for this game. Check out the community hub for more information!"}
                 </p>
               </div>
            </div>

            <div className="bg-[#171a21] rounded overflow-hidden p-6">
               <h2 className="text-white text-lg font-medium mb-4">Recent Updates</h2>
               <div className="flex gap-4 items-start border-l-2 border-[#2a475e] pl-4 py-2">
                 <div className="w-16 h-10 bg-[#2a475e] rounded shrink-0"></div>
                 <div>
                   <div className="text-[#66c0f4] text-sm hover:underline cursor-pointer">Patch Notes: v1.0 Release</div>
                   <div className="text-xs mt-1 text-[#8f98a0]">Posted just now</div>
                 </div>
               </div>
            </div>

          </div>

          {/* Right Sidebar (Achievements / Badges) */}
          <div className="w-[300px] shrink-0 flex flex-col gap-6">
            
             <div className="bg-[#171a21] rounded overflow-hidden">
              <div className="p-4 border-b border-[#2a475e] flex items-center justify-between">
                 <h2 className="text-white font-medium">Achievements</h2>
                 <Trophy className="w-4 h-4 text-[#8f98a0]" />
              </div>
              <div className="p-4 flex flex-col gap-3">
                 <div className="flex items-center justify-between text-xs">
                   <span className="text-[#c6d4df]">Progress</span>
                   <span className="text-white font-bold">{projectAchievements.length} of {allSkills.length}</span>
                 </div>
                 <div className="w-full h-1.5 bg-[#1b2838] rounded-full overflow-hidden">
                   <div className="h-full bg-[#66c0f4] w-1/3"></div>
                 </div>
                 <div className="flex flex-wrap gap-2 mt-2">
                   {projectAchievements.map((skillName) => (
                     <div key={skillName} className="group relative w-10 h-10 bg-[#1b2838] hover:bg-[#2a475e] border border-[#3d4450] hover:border-[#66c0f4] rounded flex items-center justify-center cursor-help transition-all">
                        <Image alt="Image" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(skillName)}&background=random&length=1`} className="w-6 h-6 object-cover opacity-80 group-hover:opacity-100" width={800} height={600} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-[#1b2838] text-[#c6d4df] text-[11px] rounded opacity-0 group-hover:opacity-100 pointer-events-none z-20 border border-[#3d4450]">
                          {skillName} (Unlocked)
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>

            <div className="bg-[#171a21] rounded overflow-hidden">
              <div className="p-4 border-b border-[#2a475e]">
                 <h2 className="text-white font-medium text-sm">Friends who play</h2>
              </div>
              <div className="p-4 text-[13px] text-[#8f98a0]">
                 No friends currently playing this game.
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
