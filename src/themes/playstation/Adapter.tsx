'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import TopSystemBar from './components/TopSystemBar';
import HomeScreen from './views/HomeScreen';
import ProfileScreen from './views/ProfileScreen';
import TrophiesScreen from './views/TrophiesScreen';
import { motion, AnimatePresence } from 'framer-motion';

export type PlayStationView = 'home' | 'profile' | 'trophies';

interface PlayStationContextType {
  activeView: PlayStationView;
  setActiveView: (view: PlayStationView) => void;
  focusedItem: any | null;
  setFocusedItem: (item: any | null) => void;
}

export const PlayStationContext = createContext<PlayStationContextType | null>(null);

export const usePlayStation = () => {
  const ctx = useContext(PlayStationContext);
  if (!ctx) throw new Error('usePlayStation must be used within PlayStationProvider');
  return ctx;
};

export default function PlayStationAdapter() {
  const { personal, projects, isLoading } = usePortfolio();
  
  const [activeView, setActiveView] = useState<PlayStationView>('home');
  const [focusedItem, setFocusedItem] = useState<any | null>(null);

  useEffect(() => {
    if (!focusedItem && projects.length > 0) {
      setFocusedItem(projects[0]);
    }
  }, [projects, focusedItem]);

  if (isLoading || !personal) {
    return <div className="h-screen w-full bg-black flex items-center justify-center text-white">Booting System...</div>;
  }

  // Determine ambient background based on focused item or active view
  let bgImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop';
  if (activeView === 'home' && focusedItem?.thumbnailUrl) {
    bgImage = focusedItem.thumbnailUrl;
  } else if (activeView === 'trophies') {
    bgImage = 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop'; // Deep blue abstract
  } else if (activeView === 'profile') {
    bgImage = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop'; // Technical abstract
  }

  return (
    <PlayStationContext.Provider value={{ activeView, setActiveView, focusedItem, setFocusedItem }}>
      <div className="w-full h-screen bg-black overflow-hidden font-sans text-white relative selection:bg-white/30 selection:text-white flex flex-col">
        
        {/* Ambient Background with crossfade */}
        <AnimatePresence>
           <motion.div
             key={bgImage}
             initial={{ opacity: 0, scale: 1.05 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0 }}
             transition={{ duration: 0.8, ease: "easeInOut" }}
             className="absolute inset-0 z-0"
           >
             <div className="absolute inset-0 bg-cover bg-center opacity-40 blur-[8px]" style={{ backgroundImage: `url(${bgImage})` }}></div>
             <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
             {/* Dynamic color overlay overlay */}
             <div className="absolute inset-0 bg-gradient-to-tr from-[#00439C]/40 to-transparent mix-blend-overlay"></div>
           </motion.div>
        </AnimatePresence>

        {/* Grain overlay for that cinematic console look */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}></div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <TopSystemBar />

          <main className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              {activeView === 'home' && (
                <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                  <HomeScreen />
                </motion.div>
              )}
              {activeView === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="w-full h-full">
                  <ProfileScreen />
                </motion.div>
              )}
              {activeView === 'trophies' && (
                <motion.div key="trophies" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                  <TrophiesScreen />
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

      </div>
    </PlayStationContext.Provider>
  );
}
