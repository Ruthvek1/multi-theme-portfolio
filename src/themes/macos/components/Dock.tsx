import React from 'react';
import { useMacOS, MacAppId } from '../Adapter';
import { motion } from 'framer-motion';

// macOS style custom SVG icons
export const FinderIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-b from-blue-300 to-blue-500 rounded-2xl shadow-md overflow-hidden relative border border-blue-400/50 flex flex-col">
    <div className="flex-1 flex w-full">
      <div className="w-1/2 h-full border-r border-blue-400/30 flex items-center justify-center">
        <div className="w-2 h-3 border-2 border-blue-100 rounded-full ml-1 mt-1 opacity-80" />
      </div>
      <div className="w-1/2 h-full flex items-center justify-center">
        <div className="w-2 h-3 border-2 border-blue-100 rounded-full mr-1 mt-1 opacity-80" />
      </div>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-full bg-blue-400/30"></div>
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 border-b-2 border-blue-100 rounded-full opacity-80"></div>
  </div>
);

export const NotesIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-b from-yellow-100 to-yellow-300 rounded-2xl shadow-md border border-yellow-400/50 flex flex-col overflow-hidden">
    <div className="w-full h-3 bg-gradient-to-b from-yellow-400 to-yellow-500 border-b border-yellow-600/30"></div>
    <div className="flex-1 flex flex-col gap-[3px] p-2">
      <div className="w-full h-[2px] bg-yellow-500/30 rounded-full"></div>
      <div className="w-full h-[2px] bg-yellow-500/30 rounded-full"></div>
      <div className="w-3/4 h-[2px] bg-yellow-500/30 rounded-full"></div>
    </div>
  </div>
);

export const SafariIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-md border border-white/20 flex items-center justify-center">
    <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-inner border border-gray-200">
      <div className="w-full h-full rounded-full border-4 border-blue-500/10 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_3px)] rounded-full clip-circle"></div>
        <div className="w-1 h-7 bg-red-500 rounded-full transform rotate-45 shadow-sm z-10 origin-bottom scale-y-[0.6] -translate-y-2 translate-x-1"></div>
        <div className="w-1 h-7 bg-gray-400 rounded-full transform -rotate-[135deg] shadow-sm z-10 origin-top scale-y-[0.6] translate-y-2 -translate-x-1"></div>
        <div className="w-1.5 h-1.5 bg-white rounded-full z-20 shadow-md"></div>
      </div>
    </div>
  </div>
);

export const MailIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl shadow-md border border-white/20 relative overflow-hidden">
    <div className="absolute inset-x-1 top-2 bottom-1 bg-gradient-to-b from-white to-gray-100 rounded shadow-sm flex flex-col items-center justify-center border border-gray-200 overflow-hidden">
      <div className="absolute top-0 w-full h-full flex justify-center">
         <div className="w-[120%] h-5 bg-gradient-to-b from-white to-gray-200 rounded-full border-b border-gray-300 shadow-sm translate-y-[-50%]"></div>
      </div>
      <div className="absolute bottom-1 w-full h-[1px] bg-gray-200 shadow-sm"></div>
      <svg className="w-5 h-5 text-blue-500 relative z-10 mt-1 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
);

export const SettingsIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-b from-gray-200 to-gray-400 rounded-2xl shadow-md border border-gray-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent)]"></div>
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 shadow-inner border border-gray-400/50 flex items-center justify-center relative">
       {/* Gear teeth simplified */}
       <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-full opacity-60"></div>
       <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner border border-gray-600 z-10"></div>
    </div>
  </div>
);

export const CalendarIcon = () => (
  <div className="w-12 h-12 bg-white rounded-2xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
    <div className="w-full h-3.5 bg-gradient-to-b from-red-500 to-red-600 border-b border-red-700/30"></div>
    <div className="flex-1 flex flex-col items-center justify-center p-1 bg-gradient-to-b from-white to-gray-100">
      <span className="text-[9px] font-bold text-gray-500 leading-none">JUL</span>
      <span className="text-xl font-bold text-black leading-none -mt-0.5 tracking-tighter">17</span>
    </div>
  </div>
);

export const DictionaryIcon = () => (
  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-md border border-gray-600 flex items-center justify-center overflow-hidden relative">
    <div className="absolute inset-x-2 inset-y-1 bg-gradient-to-br from-orange-700 to-red-900 rounded-sm shadow-sm border border-red-500/30 flex items-center justify-center">
       <span className="text-white font-serif font-bold text-lg opacity-90 drop-shadow-md">Aa</span>
    </div>
  </div>
);


export default function Dock() {
  const { windows, openApp } = useMacOS();

  const dockApps: { id: MacAppId; label: string; icon: React.ReactNode }[] = [
    { id: 'finder', label: 'Projects', icon: <FinderIcon /> },
    { id: 'notes', label: 'About', icon: <NotesIcon /> },
    { id: 'calendar', label: 'Experience', icon: <CalendarIcon /> },
    { id: 'dictionary', label: 'Education', icon: <DictionaryIcon /> },
    { id: 'settings', label: 'Skills', icon: <SettingsIcon /> },
    { id: 'safari', label: 'Resume', icon: <SafariIcon /> },
    { id: 'mail', label: 'Contact', icon: <MailIcon /> },
  ];

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-2 flex items-end gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
        {dockApps.map(app => (
          <div key={app.id} className="relative group flex flex-col items-center">
            {/* Tooltip */}
            <div className="absolute -top-12 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 shadow-lg pointer-events-none whitespace-nowrap">
              {app.label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black/60"></div>
            </div>

            {/* Icon Button */}
            <motion.button
              whileHover={{ y: -8, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openApp(app.id)}
              className="relative outline-none"
            >
              {app.icon}
            </motion.button>
            
            {/* Active indicator dot */}
            <div className="h-1 mt-1 w-full flex justify-center">
              {windows[app.id].isOpen && (
                <div className="w-1 h-1 bg-black/40 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
