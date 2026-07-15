'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import LibraryHero from './components/LibraryHero';
import ArchivesTimeline from './components/ArchivesTimeline';
import TomesOfKnowledge from './components/TomesOfKnowledge';
import IlluminatedManuscripts from './components/IlluminatedManuscripts';
import SecretBookshelf from './components/SecretBookshelf';

export default function LibraryAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <div className="min-h-screen bg-[#110a05] text-[#fdf3d8] overflow-x-hidden selection:bg-[#8b4513]/50">
       
       {/* Ambient Dust Particles & Background Lighting */}
       <div className="fixed inset-0 pointer-events-none z-0">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-30 mix-blend-overlay"></div>
           
           {/* Slowly shifting candlelight glow */}
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-900/10 blur-[120px] rounded-full animate-pulse duration-5000"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full animate-pulse duration-7000"></div>
       </div>
       
       <div className="relative z-10 w-full flex flex-col gap-32 pb-64 pt-16">
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] ease-out fill-mode-both">
             <LibraryHero personal={personal} socials={socials} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-300 ease-out fill-mode-both">
             <ArchivesTimeline experience={experience} education={education} />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-500 ease-out fill-mode-both bg-[#0a0604]/60 py-16 border-y border-[#8b4513]/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative">
             <TomesOfKnowledge skills={skills} certifications={certifications} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-700 ease-out fill-mode-both">
             <IlluminatedManuscripts projects={projects} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-1000 ease-out fill-mode-both">
             <SecretBookshelf />
          </div>
       </div>

    </div>
  );
}
