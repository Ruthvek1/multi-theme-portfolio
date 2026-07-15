import React, { useState, useEffect } from 'react';
import { useMacOS, MacAppId } from '../Adapter';
import { Wifi, Battery, Search } from 'lucide-react';

const APP_NAMES: Record<MacAppId, string> = {
  finder: 'Finder',
  notes: 'Notes',
  safari: 'Safari',
  mail: 'Mail',
  settings: 'System Settings',
  calendar: 'Calendar',
  dictionary: 'Dictionary',
  certificates: 'Certificates'
};

export const RKLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 44" className={className} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* R */}
    <path d="M6 14v16" />
    <path d="M6 14h6a4 4 0 0 1 0 8H6" />
    <path d="M10 22l4 8" />
    {/* K */}
    <path d="M18 14v16" />
    <path d="M26 14l-8 8 8 8" />
  </svg>
);

export default function MenuBar() {
  const { activeApp } = useMacOS();
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }));
      setDate(now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeAppName = activeApp ? APP_NAMES[activeApp] : 'Finder';

  return (
    <div className="h-8 w-full bg-white/20 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-4 text-sm font-medium text-white shadow-sm z-50 select-none relative">
      
      {/* Left side: Apple Logo & App Menus */}
      <div className="flex items-center h-full">
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors">
          <RKLogo className="w-[15px] h-[15px] text-white" />
        </div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer font-bold transition-colors">
          {activeAppName}
        </div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden sm:flex">File</div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden sm:flex">Edit</div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden sm:flex">View</div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden md:flex">Window</div>
        <div className="px-3 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden md:flex">Help</div>
      </div>

      {/* Right side: Status Icons & Clock */}
      <div className="flex items-center h-full">
        <div className="px-2 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden sm:flex">
          <Battery className="w-4 h-4" />
        </div>
        <div className="px-2 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors hidden sm:flex">
          <Wifi className="w-3.5 h-3.5" />
        </div>
        <div className="px-2 hover:bg-white/20 h-full flex items-center rounded cursor-pointer transition-colors">
          <Search className="w-3.5 h-3.5" />
        </div>
        <div className="px-2 hover:bg-white/20 h-full flex items-center gap-2 rounded cursor-pointer transition-colors ml-1">
          <span className="hidden sm:inline-block">{date}</span>
          <span>{time}</span>
        </div>
      </div>
      
    </div>
  );
}
