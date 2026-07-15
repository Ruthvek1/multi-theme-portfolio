'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function LaunchSequence() {
  const [switches, setSwitches] = useState({
    comms: false,
    nav: false,
    lifeSupport: false
  });
  
  const [launched, setLaunched] = useState(false);

  const allReady = switches.comms && switches.nav && switches.lifeSupport;

  const toggleSwitch = (key: keyof typeof switches) => {
    if (launched) return;
    setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLaunch = () => {
    if (allReady) {
      setLaunched(true);
      // Reset after 8 seconds
      setTimeout(() => {
        setLaunched(false);
        setSwitches({ comms: false, nav: false, lifeSupport: false });
      }, 8000);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto border-2 border-[#1A5F7A] bg-[#0a192f] p-6 shadow-[inset_0_0_20px_rgba(26,95,122,0.5)] font-mono">
      
      {/* Corner screws */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-[#1A5F7A]" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-[#1A5F7A]" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-[#1A5F7A]" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-[#1A5F7A]" />

      <h3 className="text-center text-[#00f0ff] tracking-[0.3em] font-bold mb-6 border-b border-[#1A5F7A] pb-2">LAUNCH CONTROL</h3>

      {/* Switches */}
      <div className="flex justify-between mb-8 px-4">
        <Switch label="COMMS" active={switches.comms} onClick={() => toggleSwitch('comms')} disabled={launched} />
        <Switch label="NAV" active={switches.nav} onClick={() => toggleSwitch('nav')} disabled={launched} />
        <Switch label="LIFE_SUP" active={switches.lifeSupport} onClick={() => toggleSwitch('lifeSupport')} disabled={launched} />
      </div>

      {/* Launch Button */}
      <div className="flex justify-center relative">
        <button aria-label="Interactive Button" onClick={handleLaunch}
          disabled={!allReady || launched}
          className={`relative w-40 h-16 border-2 font-black tracking-widest text-lg transition-all ${
            allReady && !launched 
              ? 'border-red-500 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] cursor-pointer' 
              : 'border-gray-700 bg-gray-900 text-gray-700 cursor-not-allowed'
          }`}
        >
          {launched ? 'LIFTOFF' : 'IGNITION'}
        </button>
      </div>

      {/* Rocket Animation Overlay */}
      <AnimatePresence>
        {launched && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ y: 500, opacity: 0 }}
                animate={{ y: -1000, opacity: 1 }}
                transition={{ duration: 4, ease: "easeIn" }}
                className="flex flex-col items-center relative"
              >
                 <Rocket className="w-32 h-32 text-white" strokeWidth={1} />
                 {/* Fire exhaust */}
                 <div className="w-8 h-32 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent blur-md rounded-b-full animate-pulse" />
                 
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: 1 }}
                   className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 drop-shadow-[0_0_20px_rgba(255,0,0,0.8)]"
                 >
                   MISSION SUCCESS
                 </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function Switch({ label, active, onClick, disabled }: { label: string, active: boolean, onClick: () => void, disabled: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button aria-label="Interactive Button" onClick={onClick}
        disabled={disabled}
        className={`w-8 h-12 border-2 relative transition-colors ${active ? 'border-green-500 bg-green-500/10' : 'border-[#1A5F7A] bg-transparent'}`}
      >
        <div className={`absolute left-0.5 right-0.5 h-4 bg-gray-300 transition-all ${active ? 'top-0.5' : 'bottom-0.5'}`} />
      </button>
      <span className={`text-[8px] tracking-widest uppercase ${active ? 'text-green-500 font-bold' : 'text-[#1A5F7A]'}`}>{label}</span>
    </div>
  );
}
