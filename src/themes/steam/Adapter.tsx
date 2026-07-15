'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import TopNav from './components/TopNav';
import StoreView from './views/StoreView';
import LibraryView from './views/LibraryView';
import ProfileView from './views/ProfileView';
import CommunityView from './views/CommunityView';

export type SteamView = 'store' | 'library' | 'community' | 'profile';

interface SteamContextType {
  activeView: SteamView;
  setActiveView: (view: SteamView) => void;
  selectedProject: any | null;
  setSelectedProject: (project: any | null) => void;
}

export const SteamContext = createContext<SteamContextType | null>(null);

export const useSteam = () => {
  const ctx = useContext(SteamContext);
  if (!ctx) throw new Error('useSteam must be used within SteamProvider');
  return ctx;
};

export default function SteamAdapter() {
  const { personal, projects, isLoading } = usePortfolio();
  
  const [activeView, setActiveView] = useState<SteamView>('store');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    // If we switch to library and no project is selected, pick the first one
    if (activeView === 'library' && !selectedProject && projects.length > 0) {
      setSelectedProject(projects[0]);
    }
  }, [activeView, projects, selectedProject]);

  if (isLoading || !personal) {
    return <div className="h-screen w-full bg-[#1b2838] flex items-center justify-center text-[#66c0f4]">Loading Steam...</div>;
  }

  return (
    <SteamContext.Provider value={{ activeView, setActiveView, selectedProject, setSelectedProject }}>
      <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden p-0 sm:p-4 md:p-8 font-sans selection:bg-[#66c0f4]/30 selection:text-white">
        
        {/* Steam Window Frame */}
        <div 
          className={`flex flex-col bg-[#1b2838] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 relative border border-[#3d4450] ${
            isMaximized ? 'w-full h-full rounded-none' : 'w-full max-w-[1400px] h-full max-h-[900px] rounded-lg'
          }`}
        >
          {/* Top Window Controls & Global Nav */}
          <TopNav isMaximized={isMaximized} onMaximize={() => setIsMaximized(!isMaximized)} />

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden flex flex-col bg-[#171a21] relative">
             {activeView === 'store' && <StoreView />}
             {activeView === 'library' && <LibraryView />}
             {activeView === 'community' && <CommunityView />}
             {activeView === 'profile' && <ProfileView />}
          </div>

          {/* Steam Footer Status */}
          <div className="h-8 bg-[#171a21] border-t border-[#2a475e] shrink-0 flex items-center px-4 justify-between text-xs text-[#8f98a0]">
             <div className="flex items-center gap-4">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#5c7e10]"></span> {personal.name} is Online</span>
                <span className="hover:text-white cursor-pointer">ADD A GAME</span>
             </div>
             <div className="flex items-center gap-4">
                <span className="hover:text-white cursor-pointer">FRIENDS & CHAT</span>
             </div>
          </div>
        </div>

      </div>
    </SteamContext.Provider>
  );
}
