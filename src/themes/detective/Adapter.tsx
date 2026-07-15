'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';

import DetectiveHero from './components/DetectiveHero';
import EvidenceTimeline from './components/EvidenceTimeline';
import SkillAssets from './components/SkillAssets';
import CaseFiles from './components/CaseFiles';
import ConnectTheDotsMinigame from './components/ConnectTheDotsMinigame';

export default function DetectiveAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  
  if (isLoading || !personal) {
    return (
      <div className="min-h-screen bg-[#2c1d11] flex flex-col items-center justify-center font-['Courier_New']">
        <div className="text-white text-2xl tracking-[0.5em] animate-pulse">GATHERING EVIDENCE...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden selection:bg-red-900 selection:text-white pb-32 cursor-crosshair">
       
       {/* Clean Corkboard Background */}
       <div className="fixed inset-0 pointer-events-none z-0" 
            style={{ 
               backgroundColor: '#d6b887',
               backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
            }}>
       </div>

       {/* Dramatic Vignette (Gritty Noir Lighting) */}
       <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(0,0,0,0.9)_100%)] z-10 mix-blend-multiply"></div>
       
       {/* Ambient Tungsten Light effect */}
       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] bg-orange-500/10 rounded-full blur-[150px] pointer-events-none z-10 mix-blend-overlay"></div>

       {/* Smoke/Dust overlay */}
       <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 z-10"></div>

       {/* Main Content Area - Long Scrolling */}
       <div className="relative z-20 container mx-auto px-4 md:px-12 pt-24">
          
          <div className="animate-in fade-in slide-in-from-top-12 duration-1000 ease-out fill-mode-both">
             <DetectiveHero personal={personal} socials={socials} />
          </div>
          
          <div className="animate-in fade-in zoom-in-95 duration-1000 delay-300 ease-out fill-mode-both">
             <EvidenceTimeline experience={experience} education={education} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-right-12 duration-1000 delay-500 ease-out fill-mode-both">
             <SkillAssets skills={skills} certifications={certifications} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-left-12 duration-1000 delay-700 ease-out fill-mode-both">
             <CaseFiles projects={projects} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000 ease-out fill-mode-both">
             <ConnectTheDotsMinigame />
          </div>
          
       </div>
    </div>
  );
}
