import React, { useState, useEffect } from 'react';
import { useWindowsOS, AppId } from '../Adapter';
import { User, FolderGit2, Wrench, FileText, Activity, Mail, Search, Menu, Battery, Wifi, Volume2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const START_MENU_ICONS = [
  { id: 'notepad', label: 'About', icon: <User className="w-8 h-8 text-blue-400" fill="currentColor" /> },
  { id: 'explorer', label: 'Projects', icon: <FolderGit2 className="w-8 h-8 text-yellow-400" fill="currentColor" /> },
  { id: 'taskmanager', label: 'Experience', icon: <Activity className="w-8 h-8 text-green-400" fill="currentColor" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="w-8 h-8 text-purple-400" fill="currentColor" /> },
  { id: 'settings', label: 'Skills', icon: <Wrench className="w-8 h-8 text-gray-400" fill="currentColor" /> },
  { id: 'edge', label: 'Resume', icon: <FileText className="w-8 h-8 text-red-400" fill="currentColor" /> },
  { id: 'mail', label: 'Contact', icon: <Mail className="w-8 h-8 text-blue-300" fill="currentColor" /> },
];

export default function Taskbar() {
  const { windows, activeWindowId, isStartMenuOpen, toggleStartMenu, openApp, focusApp } = useWindowsOS();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindows = Object.values(windows).filter(w => w.isOpen);

  return (
    <>
      {/* Start Menu Overlay */}
      <AnimatePresence>
        {isStartMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[600px] max-h-[80vh] bg-[#202020]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex flex-col p-6 z-[100]"
          >
            <div className="bg-black/40 rounded-full px-4 py-2 flex items-center gap-2 border border-white/5 mb-8">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search for apps, settings, and documents" className="bg-transparent outline-none text-sm w-full" />
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-sm">Pinned</span>
              <button aria-label="Interactive Button" className="bg-white/10 hover:bg-white/20 text-xs px-2 py-1 rounded transition-colors text-white">All apps &gt;</button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {START_MENU_ICONS.map(app => (
                <button aria-label="Interactive Button" key={app.id} 
                  onClick={() => openApp(app.id as AppId)}
                  className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {app.icon}
                  <span className="text-xs text-gray-200">{app.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">R</div>
                <span className="text-sm font-medium">Guest User</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="w-full h-12 bg-[#202020]/80 backdrop-blur-xl border-t border-white/10 flex justify-between items-center px-4 relative z-[9999]">
        {/* Left Side (Weather/Widgets placeholder) */}
        <div className="flex-1 hidden md:flex items-center text-xs gap-2 text-gray-300">
          <Menu className="w-4 h-4" /> Widgets
        </div>

        {/* Center Icons */}
        <div className="flex flex-1 justify-center items-center gap-1">
          <button aria-label="Interactive Button" onClick={toggleStartMenu}
            className={`w-10 h-10 rounded hover:bg-white/10 flex items-center justify-center transition-colors ${isStartMenuOpen ? 'bg-white/10' : ''}`}
          >
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
              <rect x="2" y="2" width="9" height="9" rx="1" className="text-blue-500" />
              <rect x="13" y="2" width="9" height="9" rx="1" className="text-blue-400" />
              <rect x="2" y="13" width="9" height="9" rx="1" className="text-blue-600" />
              <rect x="13" y="13" width="9" height="9" rx="1" className="text-blue-300" />
            </svg>
          </button>
          
          <div className="w-px h-6 bg-white/20 mx-1" />

          {/* Render icons for open windows */}
          {openWindows.map(w => {
            const iconObj = START_MENU_ICONS.find(i => i.id === w.id);
            const isActive = activeWindowId === w.id;
            
            return (
              <button aria-label="Interactive Button" key={w.id}
                onClick={() => isActive && !w.isMinimized ? useWindowsOS().minimizeApp(w.id) : focusApp(w.id)}
                className={`w-10 h-10 rounded flex items-center justify-center transition-all relative
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
                `}
              >
                <div className="scale-75">{iconObj?.icon}</div>
                {/* Active Indicator line */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-blue-400 rounded-full transition-all ${isActive ? 'w-4' : 'w-2 bg-gray-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Side System Tray */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <div className="hidden md:flex items-center gap-3 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-gray-300">
            <Wifi className="w-4 h-4" />
            <Volume2 className="w-4 h-4" />
            <Battery className="w-4 h-4" />
          </div>
          <div className="flex flex-col items-end justify-center px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-default select-none text-xs text-right">
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{time.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
