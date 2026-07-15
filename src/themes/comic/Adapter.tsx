'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import ComicHero from './components/ComicHero';
import ComicTimeline from './components/ComicTimeline';
import ComicSkills from './components/ComicSkills';
import ComicProjects from './components/ComicProjects';
import ComicMinigame from './components/ComicMinigame';

export default function ComicAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <div className="min-h-screen bg-[#2986cc] text-black overflow-x-hidden selection:bg-[#ffea00] selection:text-black">
       
       {/* Background Halftone Pattern for the whole page */}
       <div className="fixed inset-0 pointer-events-none z-0">
           <div 
               className="absolute inset-0 opacity-20 mix-blend-overlay"
               style={{
                   backgroundImage: 'radial-gradient(circle, #000 3px, transparent 3px)',
                   backgroundSize: '16px 16px'
               }}
           ></div>
       </div>
       
       <div className="relative z-10 w-full flex flex-col gap-0 pb-32">
          {/* Action lines separator between sections */}
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out fill-mode-both">
             <ComicHero personal={personal} socials={socials} />
          </div>
          
          <div className="w-full h-16 bg-black border-y-8 border-white transform -skew-y-2 my-12 z-20"></div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 ease-out fill-mode-both bg-[#ffffff]">
             <ComicTimeline experience={experience} education={education} />
          </div>

          <div className="w-full h-16 bg-[#e62e2d] border-y-8 border-black transform skew-y-3 my-12 z-20"></div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 ease-out fill-mode-both bg-[#ffea00]">
             <ComicSkills skills={skills} certifications={certifications} />
          </div>
          
          <div className="w-full h-16 bg-[#2986cc] border-y-8 border-black transform -skew-y-1 my-12 z-20"></div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700 ease-out fill-mode-both">
             <ComicProjects projects={projects} />
          </div>
          
          <div className="w-full h-16 bg-[#e62e2d] border-y-8 border-white transform skew-y-2 my-12 z-20"></div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000 ease-out fill-mode-both">
             <ComicMinigame />
          </div>
       </div>

    </div>
  );
}
