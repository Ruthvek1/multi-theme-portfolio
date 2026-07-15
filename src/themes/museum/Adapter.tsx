'use client';

import React, { useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';

import AtriumHero from './components/AtriumHero';
import HistoryCorridor from './components/HistoryCorridor';
import AttributesHall from './components/AttributesHall';
import GrandGallery from './components/GrandGallery';
import RestorationMinigame from './components/RestorationMinigame';

export default function MuseumAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  
  if (isLoading || !personal) {
    return (
      <div className="min-h-screen bg-[#111] flex flex-col items-center justify-center font-serif text-[#d4af37]">
        <div className="text-xl tracking-[0.5em] animate-pulse">CURATING EXHIBITION...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-serif relative overflow-x-hidden selection:bg-[#d4af37] selection:text-[#111] pb-32">
       
       {/* Deep Plaster Wall Background */}
       <div className="fixed inset-0 pointer-events-none z-0" 
            style={{ 
               backgroundColor: '#1a1614',
               backgroundImage: `url('https://www.transparenttextures.com/patterns/concrete-wall.png')`
            }}>
       </div>

       {/* Global Vignette */}
       <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] z-10 mix-blend-multiply"></div>
       
       {/* Ambient Lighting */}
       <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none z-10 mix-blend-screen"></div>
       <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[#d4af37]/5 blur-[200px] rounded-full pointer-events-none z-10 mix-blend-screen"></div>

       {/* Dust Motes Overlay */}
       <div className="fixed inset-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 z-10 mix-blend-screen"></div>

       {/* Long Scrolling Content Area */}
       <div className="relative z-20">
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] ease-out fill-mode-both">
             <AtriumHero personal={personal} socials={socials} />
          </div>
          
          <div className="animate-in fade-in zoom-in-95 duration-[2000ms] delay-500 ease-out fill-mode-both">
             <HistoryCorridor experience={experience} education={education} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-700 ease-out fill-mode-both">
             <AttributesHall skills={skills} certifications={certifications} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-1000 ease-out fill-mode-both">
             <GrandGallery projects={projects} />
          </div>
          
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-[2000ms] delay-[1200ms] ease-out fill-mode-both">
             <RestorationMinigame />
          </div>
          
       </div>
    </div>
  );
}
