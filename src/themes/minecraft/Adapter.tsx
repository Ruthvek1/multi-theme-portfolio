'use client';
import React, { useEffect, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import MinecraftHero from './components/MinecraftHero';
import MinecraftTimeline from './components/MinecraftTimeline';
import MinecraftSkills from './components/MinecraftSkills';
import MinecraftProjects from './components/MinecraftProjects';
import MinecraftMinigame from './components/MinecraftMinigame';
import MinecraftMobs from './components/MinecraftMobs';
import MinecraftHUD from './components/MinecraftHUD';
import MinecraftChat from './components/MinecraftChat';
import Head from 'next/head';

export default function MinecraftAdapter() {
  const { personal, experience, education, skills, projects, certifications, socials, isLoading } = usePortfolio();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading || !mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .font-pixel {
          font-family: 'Press Start 2P', monospace;
        }
        .text-shadow-pixel {
          text-shadow: 4px 4px 0 rgba(0,0,0,1);
        }
        .text-shadow-sm {
          text-shadow: 2px 2px 0 rgba(0,0,0,1);
        }
        .mc-cursor {
          cursor: url('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="6" width="4" height="20" fill="rgba(255,255,255,0.8)"/><rect x="6" y="14" width="20" height="4" fill="rgba(255,255,255,0.8)"/><rect x="15" y="7" width="2" height="18" fill="black"/><rect x="7" y="15" width="18" height="2" fill="black"/></svg>') 16 16, crosshair !important;
        }
        .mc-cursor * {
          cursor: url('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect x="14" y="6" width="4" height="20" fill="rgba(255,255,255,0.8)"/><rect x="6" y="14" width="20" height="4" fill="rgba(255,255,255,0.8)"/><rect x="15" y="7" width="2" height="18" fill="black"/><rect x="7" y="15" width="18" height="2" fill="black"/></svg>') 16 16, crosshair !important;
        }
      `}} />
      <div className="min-h-screen bg-[#5a9e32] text-white selection:bg-[#4a8726] selection:text-white font-sans overflow-x-hidden mc-cursor pb-32">
         
         <div className="animate-in fade-in duration-1000">
             <MinecraftHero personal={personal} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-300">
             <MinecraftTimeline experience={experience} education={education} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-500">
             <MinecraftSkills skills={skills} certifications={certifications} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-700">
             <MinecraftProjects projects={projects} />
         </div>

         <div className="animate-in fade-in duration-1000 delay-1000">
             <MinecraftMinigame personal={personal} socials={socials} />
         </div>

         {/* The roaming mobs! */}
         <MinecraftMobs />

         {/* The Game HUD & Chat */}
         <MinecraftHUD />
         <MinecraftChat />

      </div>
    </>
  );
}
