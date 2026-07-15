'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import RPGHero from './components/RPGHero';
import RPGTimeline from './components/RPGTimeline';
import RPGStats from './components/RPGStats';
import RPGProjects from './components/RPGProjects';
import RPGCombat from './components/RPGCombat';
import RPGContact from './components/RPGContact';
import Head from 'next/head';

export default function RPGAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        .font-rpg {
          font-family: 'VT323', monospace;
        }
        /* Custom typing effect for battle messages */
        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
          animation: typing 1s steps(30, end);
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}} />
      <div className="min-h-screen bg-[#000] text-white selection:bg-[#5577ff] selection:text-white font-sans overflow-x-hidden">
         
         <div className="animate-in fade-in duration-1000">
             <RPGHero personal={personal} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-300">
             <RPGTimeline experience={experience} education={education} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-500">
             <RPGStats skills={skills} certifications={certifications} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-700">
             <RPGProjects projects={projects} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-1000">
             <RPGContact personal={personal} socials={socials} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-1000">
             <RPGCombat personal={personal} socials={socials} />
         </div>

      </div>
    </>
  );
}
