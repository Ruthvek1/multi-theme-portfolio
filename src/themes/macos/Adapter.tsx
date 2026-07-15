'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import MenuBar, { RKLogo } from './components/MenuBar';
import Dock, { FinderIcon, NotesIcon, CalendarIcon, DictionaryIcon, SettingsIcon, SafariIcon, MailIcon } from './components/Dock';
import WindowRenderer from './components/WindowRenderer';

export type MacAppId = 'finder' | 'notes' | 'safari' | 'mail' | 'settings' | 'calendar' | 'dictionary' | 'certificates';

interface MacOSContextType {
  windows: Record<MacAppId, WindowState>;
  activeApp: MacAppId | null;
  openApp: (id: MacAppId) => void;
  closeApp: (id: MacAppId) => void;
  minimizeApp: (id: MacAppId) => void;
  maximizeApp: (id: MacAppId) => void;
  focusApp: (id: MacAppId) => void;
  booting: boolean;
}

interface WindowState {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export const MacOSContext = createContext<MacOSContextType | null>(null);

export const useMacOS = () => {
  const ctx = useContext(MacOSContext);
  if (!ctx) throw new Error('useMacOS must be used within MacOSProvider');
  return ctx;
};

export default function MacOSAdapter() {
  const { personal } = usePortfolio();
  const [booting, setBooting] = useState(true);
  
  // OS State
  const [activeApp, setActiveApp] = useState<MacAppId | null>(null);
  const [highestZ, setHighestZ] = useState(10);
  const [windows, setWindows] = useState<Record<MacAppId, WindowState>>({
    finder: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    notes: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    safari: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    mail: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    settings: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    calendar: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    dictionary: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
    certificates: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 },
  });

  // Simulated Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const focusApp = (id: MacAppId) => {
    setHighestZ(prev => prev + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: highestZ + 1 }
    }));
    setActiveApp(id);
  };

  const openApp = (id: MacAppId) => {
    setHighestZ(prev => prev + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: highestZ + 1 }
    }));
    setActiveApp(id);
  };

  const closeApp = (id: MacAppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeApp === id) setActiveApp(null);
  };

  const minimizeApp = (id: MacAppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (activeApp === id) setActiveApp(null);
  };

  const maximizeApp = (id: MacAppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
    focusApp(id);
  };

  if (!personal) return null;

  return (
    <MacOSContext.Provider value={{ windows, activeApp, openApp, closeApp, minimizeApp, maximizeApp, focusApp, booting }}>
      <div className="w-full h-screen overflow-hidden text-black font-sans selection:bg-blue-500/30 relative">
        
        {/* Dynamic Sonoma Gradient Wallpaper */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FFD166] via-[#FF85A2] to-[#7B2CBF]">
           <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00F5D4]/40 via-transparent to-transparent"></div>
           <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#9B5DE5]/40 via-transparent to-transparent"></div>
           <div className="absolute inset-0 backdrop-blur-[100px]"></div>
        </div>

        {booting ? (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
            <RKLogo className="w-16 h-16 text-white mb-10" />
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-white animate-[loading_1.5s_ease-in-out_forwards]"></div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full flex flex-col z-10 animate-fade-in">
            <MenuBar />
            
            <div className="flex-1 relative" onClick={() => setActiveApp(null)}>
              <WindowRenderer />

              {/* Desktop Icons (Right aligned) */}
              <div className="absolute top-6 right-6 flex flex-col gap-6 z-0 flex-wrap h-[calc(100%-100px)] content-start items-end">
                
                <button aria-label="Interactive Button" onDoubleClick={() => openApp('finder')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <FinderIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Projects</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('certificates')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15] w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center border border-white/40 shadow-lg relative overflow-hidden">
                     <div className="absolute inset-x-0 top-0 h-4 bg-blue-600 border-b border-blue-700"></div>
                     <svg className="w-6 h-6 text-blue-600 mt-2 z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Certificates</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('notes')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <NotesIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">About</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('calendar')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <CalendarIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Experience</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('dictionary')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <DictionaryIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Education</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('settings')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <SettingsIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Skills</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('safari')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <SafariIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Resume</span>
                </button>

                <button aria-label="Interactive Button" onDoubleClick={() => openApp('mail')} className="flex flex-col items-center gap-1 group w-20">
                  <div className="group-hover:brightness-90 transition-all scale-[1.15]">
                    <MailIcon />
                  </div>
                  <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1.5 py-0.5 rounded mt-1 group-hover:bg-blue-500/80 transition-colors">Contact</span>
                </button>

              </div>
            </div>

            <Dock />
          </div>
        )}
      </div>
    </MacOSContext.Provider>
  );
}
