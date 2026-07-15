import React, { useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { Trophy, Award, Search, Filter, Download } from 'lucide-react';

export default function TrophiesScreen() {
  const { skills, certifications } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'earned'>('all');

  // Convert skills into "Trophies"
  const allTrophies: any[] = [];
  
  // Certifications as Platinum/Gold Trophies
  certifications.forEach((cert: any, i: number) => {
    allTrophies.push({
      id: `cert-${cert.id || i}`,
      title: cert.name,
      description: `Earned from ${cert.issuer} on ${cert.date}`,
      type: 'Platinum',
      color: 'text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.8)]',
      bg: 'bg-gradient-to-br from-gray-200 to-gray-400',
      earned: true,
      category: 'Certification',
      fileUrl: cert.fileUrl,
      url: cert.url
    });
  });

  // Skills as Gold/Silver/Bronze
  skills.forEach((skillGroup: any, i: number) => {
    skillGroup.items.forEach((skill: string, j: number) => {
      // Arbitrarily assign rarity based on index to simulate a real game
      let type = 'Bronze';
      let color = 'text-[#cd7f32] drop-shadow-[0_0_10px_rgba(205,127,50,0.8)]';
      let bg = 'bg-gradient-to-br from-[#cd7f32] to-[#8c5a24]';

      if (j === 0) {
        type = 'Gold';
        color = 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]';
        bg = 'bg-gradient-to-br from-yellow-300 to-yellow-600';
      } else if (j === 1) {
        type = 'Silver';
        color = 'text-gray-300 drop-shadow-[0_0_10px_rgba(209,213,219,0.8)]';
        bg = 'bg-gradient-to-br from-gray-200 to-gray-400';
      }

      allTrophies.push({
        id: `skill-${i}-${j}`,
        title: skill,
        description: `Unlocked the ${skillGroup.category} skill`,
        type,
        color,
        bg,
        earned: true,
        category: skillGroup.category
      });
    });
  });

  return (
    <div className="w-full h-full flex flex-col justify-end pb-12 px-16 z-10 relative">
      <div className="w-full max-w-6xl h-[70vh] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden">
         
         {/* Trophies Header */}
         <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div>
               <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Trophies Earned</h1>
               <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm"><Trophy className="w-4 h-4 text-gray-300" /> <span className="font-bold">{certifications.length}</span></div>
                  <div className="flex items-center gap-1 text-sm"><Trophy className="w-4 h-4 text-yellow-400" /> <span className="font-bold">{skills.length}</span></div>
                  <div className="flex items-center gap-1 text-sm"><Trophy className="w-4 h-4 text-gray-400" /> <span className="font-bold">{allTrophies.length - certifications.length - skills.length}</span></div>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <button aria-label="Interactive Button" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium">
                 <Filter className="w-4 h-4" /> Filter
               </button>
               <button aria-label="Interactive Button" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors text-sm font-medium">
                 <Search className="w-4 h-4" /> Search
               </button>
            </div>
         </div>

         {/* Trophies List */}
         <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 custom-scrollbar">
            
            {/* Certifications */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 border-b border-white/20 pb-2">Certifications</h2>
              <div className="flex flex-col gap-4">
                {allTrophies.filter(t => t.category === 'Certification').map((trophy) => (
                  <div key={trophy.id} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-xl p-4 flex items-center gap-6 group cursor-default">
                     <div className={`w-16 h-16 rounded-lg ${trophy.bg} flex items-center justify-center shrink-0 shadow-lg`}>
                       {trophy.type === 'Platinum' ? (
                         <Award className="w-8 h-8 text-white drop-shadow-md" />
                       ) : (
                         <Trophy className={`w-8 h-8 ${trophy.color}`} />
                       )}
                     </div>
                     <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{trophy.title}</h3>
                        <p className="text-white/50 text-sm">{trophy.description}</p>
                     </div>
                     <div className="flex flex-col items-end justify-center shrink-0 w-32">
                        <span className="text-sm font-bold text-white mb-1">{trophy.type}</span>
                        <span className="text-[11px] text-white/40 uppercase tracking-wider">{trophy.category}</span>
                     </div>
                     {(trophy.url || trophy.fileUrl) && (
                        <a aria-label="Link" href={trophy.url || trophy.fileUrl} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white ml-4 shrink-0 font-bold text-sm whitespace-nowrap">
                           View Credential
                        </a>
                     )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4 border-b border-white/20 pb-2">Skills</h2>
              <div className="flex flex-col gap-4">
                {allTrophies.filter(t => t.category !== 'Certification').map((trophy) => (
                  <div key={trophy.id} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all rounded-xl p-4 flex items-center gap-6 group cursor-default">
                     <div className={`w-16 h-16 rounded-lg ${trophy.bg} flex items-center justify-center shrink-0 shadow-lg`}>
                       {trophy.type === 'Platinum' ? (
                         <Award className="w-8 h-8 text-white drop-shadow-md" />
                       ) : (
                         <Trophy className={`w-8 h-8 ${trophy.color}`} />
                       )}
                     </div>
                     <div className="flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{trophy.title}</h3>
                        <p className="text-white/50 text-sm">{trophy.description}</p>
                     </div>
                     <div className="flex flex-col items-end justify-center shrink-0 w-32">
                        <span className="text-sm font-bold text-white mb-1">{trophy.type}</span>
                        <span className="text-[11px] text-white/40 uppercase tracking-wider">{trophy.category}</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>

         </div>

      </div>
    </div>
  );
}
