import React from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { MessageCircle, Star, ThumbsUp, Eye, Search, Filter } from 'lucide-react';

export default function CommunityView() {
  const { education, personal } = usePortfolio();

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#1b2838] relative select-none">
      
      {/* Community Header Banner */}
      <div className="w-full h-[200px] bg-[url('https://community.cloudflare.steamstatic.com/public/images/community_bg.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center relative">
         <div className="absolute inset-0 bg-gradient-to-t from-[#1b2838] to-transparent"></div>
         <div className="relative z-10 text-center">
            <h1 className="text-3xl font-bold text-white mb-2 shadow-black drop-shadow-md tracking-wide uppercase">Community Hub</h1>
            <p className="text-[#c6d4df] max-w-2xl text-sm">Discussions, Guides, and Developer Updates for {personal?.name}</p>
         </div>
      </div>

      <div className="max-w-[1000px] mx-auto p-8 pt-4 flex flex-col gap-6">
        
        {/* Navigation / Filters */}
        <div className="flex items-center justify-between bg-[#171a21]/80 backdrop-blur-sm p-3 border border-[#2a475e] rounded-sm">
           <div className="flex gap-4 text-sm font-medium">
             <span className="text-white border-b-2 border-[#66c0f4] pb-1 cursor-pointer">Discussions</span>
             <span className="text-[#66c0f4] hover:text-white pb-1 cursor-pointer transition-colors">Guides</span>
             <span className="text-[#66c0f4] hover:text-white pb-1 cursor-pointer transition-colors">Artwork</span>
             <span className="text-[#66c0f4] hover:text-white pb-1 cursor-pointer transition-colors">Broadcasts</span>
           </div>
           <div className="flex items-center gap-3">
             <div className="bg-[#1b2838] border border-[#3d4450] flex items-center px-2 py-1 rounded-sm">
                <input type="text" placeholder="Search discussions..." className="bg-transparent text-white text-xs outline-none w-48" />
                <Search className="w-4 h-4 text-[#8f98a0]" />
             </div>
             <button aria-label="Interactive Button" className="bg-[#2a475e] hover:bg-[#66c0f4] text-white px-3 py-1 text-xs rounded-sm transition-colors">
               Start a New Discussion
             </button>
           </div>
        </div>

        <div className="flex gap-6">
           
           {/* Main Feed: Education as Discussions */}
           <div className="flex-1 flex flex-col gap-2">
             <div className="flex items-center justify-between text-[#8f98a0] text-[11px] uppercase tracking-wider mb-2 px-2">
                <span>Topic</span>
                <div className="flex gap-16 mr-10">
                  <span>Replies</span>
                  <span>Views</span>
                </div>
             </div>

             {education.map((edu, i) => (
               <div key={edu.id} className="bg-[#171a21]/80 hover:bg-[#2a475e]/30 backdrop-blur-sm border border-[#2a475e] p-4 rounded-sm flex items-center justify-between cursor-pointer transition-colors group">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 bg-[#1b2838] border border-[#3d4450] rounded-sm flex items-center justify-center shrink-0">
                        <MessageCircle className="w-5 h-5 text-[#66c0f4]" />
                     </div>
                     <div className="flex flex-col">
                        <h3 className="text-[#c6d4df] group-hover:text-white text-[15px] font-medium transition-colors">{edu.degree} at {edu.institution}</h3>
                        <span className="text-[#8f98a0] text-[11px] mt-1">{edu.description.substring(0, 80)}...</span>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-[#4c6b22] text-[#a4d007] px-1.5 py-0.5 rounded-sm">Pinned</span>
                          <span className="text-[#626971] text-xs">by {personal?.name} on {edu.startDate}</span>
                        </div>
                     </div>
                  </div>

                  {/* Fake stats */}
                  <div className="flex items-center gap-16 text-[#8f98a0] text-sm pr-10 font-medium">
                     <span className="w-8 text-center">{Math.floor(Math.random() * 50) + 10}</span>
                     <span className="w-12 text-center">{Math.floor(Math.random() * 900) + 100}</span>
                  </div>
               </div>
             ))}

             {education.length === 0 && (
               <div className="p-8 text-center text-[#8f98a0]">
                 No discussion topics found.
               </div>
             )}
           </div>

           {/* Right Sidebar */}
           <div className="w-[280px] shrink-0 flex flex-col gap-6">
              
              <div className="bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] rounded-sm overflow-hidden">
                 <div className="p-3 border-b border-[#2a475e] bg-[#1b2838]">
                   <h2 className="text-white text-[13px] font-medium uppercase tracking-wider">Top Contributors</h2>
                 </div>
                 <div className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-[#5c7e10] p-[1px] bg-[#1b2838] shrink-0">
                       <Image src={personal?.avatarUrl || "https://ui-avatars.com/api/?name=Admin"} alt="Admin" className="w-full h-full object-cover" width={800} height={600} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[#66c0f4] text-[13px] font-bold">{personal?.name}</span>
                      <span className="text-[#8f98a0] text-[11px]">{education.length} guides created</span>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
