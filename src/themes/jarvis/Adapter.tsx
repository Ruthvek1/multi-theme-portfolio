'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';

import AICore from './components/AICore';
import HUDOverlay from './components/HUDOverlay';

// Import Views (We'll create these next)
import DashboardView from './views/DashboardView';
import PrototypesView from './views/PrototypesView';
import DiagnosticsView from './views/DiagnosticsView';
import ClearanceView from './views/ClearanceView';

type JarvisView = 'boot' | 'dashboard' | 'prototypes' | 'diagnostics' | 'clearance';

interface JarvisContextType {
  activeView: JarvisView;
  setActiveView: (view: JarvisView) => void;
}

const JarvisContext = createContext<JarvisContextType | null>(null);

export const useJarvis = () => {
  const ctx = useContext(JarvisContext);
  if (!ctx) throw new Error('useJarvis must be used within JarvisProvider');
  return ctx;
};

export default function JarvisAdapter() {
  const { personal } = usePortfolio();
  const [activeView, setActiveView] = useState<JarvisView>('boot');
  
  useEffect(() => {
    // Simulate J.A.R.V.I.S. boot sequence
    const timer = setTimeout(() => {
      setActiveView('dashboard');
    }, 4500); // 4.5 seconds for boot animation
    return () => clearTimeout(timer);
  }, []);

  if (!personal) return null;

  return (
    <JarvisContext.Provider value={{ activeView, setActiveView }}>
      {/* 
        Main Container 
        Using a dark background with subtle radial gradient.
        We apply scanlines and CRT flicker in HUDOverlay.
      */}
      <div className="w-full h-screen bg-[#02050a] text-[#00f0ff] font-mono overflow-hidden relative selection:bg-[#00f0ff] selection:text-black flex flex-col">
        
        {/* Background Gradients & Glows */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(0,240,255,0.15)_0%,_transparent_70%)] rounded-full blur-[100px]" />
        </div>

        {/* HUD Elements (Always present) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
           <HUDOverlay />
        </div>

        {/* Center AI Core (Moves depending on view) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
           <AICore view={activeView} />
        </div>

        {/* Content Area */}
        <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeView === 'boot' && (
              <motion.div 
                key="boot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-6"
              >
                 <div className="text-4xl font-bold tracking-[0.5em] text-[#00f0ff] animate-pulse drop-shadow-[0_0_15px_rgba(0,240,255,0.8)]">
                   J.A.R.V.I.S.
                 </div>
                 <div className="flex gap-2">
                   <div className="w-2 h-6 bg-[#00f0ff] animate-[pulse_1s_ease-in-out_infinite]" />
                   <div className="w-2 h-6 bg-[#00f0ff] animate-[pulse_1s_ease-in-out_0.2s_infinite]" />
                   <div className="w-2 h-6 bg-[#00f0ff] animate-[pulse_1s_ease-in-out_0.4s_infinite]" />
                 </div>
                 <div className="text-sm tracking-widest text-[#00f0ff]/70 mt-8">INITIALIZING CORE SYSTEMS...</div>
              </motion.div>
            )}

            {activeView === 'dashboard' && <DashboardView key="dashboard" />}
            {activeView === 'prototypes' && <PrototypesView key="prototypes" />}
            {activeView === 'diagnostics' && <DiagnosticsView key="diagnostics" />}
            {activeView === 'clearance' && <ClearanceView key="clearance" />}
          </AnimatePresence>
        </div>

      </div>
    </JarvisContext.Provider>
  );
}
