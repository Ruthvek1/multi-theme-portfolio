'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';

import InmateHero from './components/InmateHero';
import EscapePlanTimeline from './components/EscapePlanTimeline';
import ContrabandSkills from './components/ContrabandSkills';
import PreviousHeists from './components/PreviousHeists';
import LockpickMinigame from './components/LockpickMinigame';

export default function PrisonEscapeAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  
  if (isLoading || !personal) {
    return (
      <div className="min-h-screen bg-[#0a3663] flex flex-col items-center justify-center font-mono">
        <div className="text-white text-2xl tracking-[0.5em] animate-pulse">DECRYPTING FILES...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a3663] text-white font-sans relative overflow-x-hidden selection:bg-red-600 selection:text-white pb-24">
       
       {/* Blueprint Grid Background */}
       <div className="fixed inset-0 pointer-events-none opacity-20 z-0" 
            style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
               backgroundSize: '40px 40px'
            }}>
       </div>
       <div className="fixed inset-0 pointer-events-none opacity-10 z-0" 
            style={{ 
               backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)`,
               backgroundSize: '10px 10px'
            }}>
       </div>

       {/* Vignette effect */}
       <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10"></div>

       {/* Main Content Area - Long Scrolling */}
       <div className="relative z-20 container mx-auto px-4 md:px-8 pt-20">
          
          <InmateHero personal={personal} socials={socials} />
          
          <ContrabandSkills skills={skills} certifications={certifications} />
          
          <EscapePlanTimeline experience={experience} education={education} />
          
          <PreviousHeists projects={projects} />
          
          <LockpickMinigame />
          
       </div>
    </div>
  );
}
