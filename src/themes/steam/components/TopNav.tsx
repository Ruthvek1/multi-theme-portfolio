import React from 'react';
import Image from 'next/image';
import { useSteam, SteamView } from '../Adapter';
import { usePortfolio } from '@/core/PortfolioContext';
import { Minus, Square, X, ChevronLeft, ChevronRight, Mail } from 'lucide-react';
import Link from 'next/link';

interface TopNavProps {
  isMaximized: boolean;
  onMaximize: () => void;
}

export default function TopNav({ isMaximized, onMaximize }: TopNavProps) {
  const { activeView, setActiveView } = useSteam();
  const { personal } = usePortfolio();

  const NavLink = ({ view, label, subtitle }: { view: SteamView, label: string, subtitle: string }) => {
    const isActive = activeView === view;
    return (
      <button aria-label="Interactive Button" onClick={() => setActiveView(view)}
        className="flex flex-col items-center group relative"
      >
        <span className={`text-[22px] font-medium tracking-tight group-hover:text-white transition-colors uppercase ${isActive ? 'text-[#1a9fff] drop-shadow-[0_0_8px_rgba(26,159,255,0.4)]' : 'text-[#c6d4df]'}`}>
          {label}
        </span>
        <span className={`text-[9px] uppercase font-bold tracking-widest transition-colors ${isActive ? 'text-white' : 'text-[#4b5561] group-hover:text-[#8f98a0]'}`}>
          {subtitle}
        </span>
      </button>
    );
  };

  return (
    <div className="flex flex-col shrink-0 bg-[#171a21] select-none">
      
      {/* Top Window Bar */}
      <div className="h-10 flex items-center justify-between px-2 w-full drag-region">
         
         {/* System Menus */}
         <div className="flex items-center gap-4 px-2 no-drag text-[11px] text-[#b8b6b4]">
            <Link href="/" className="hover:text-white transition-colors cursor-pointer group flex items-center gap-2">
               <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <X className="w-3 h-3 text-white" />
               </div>
               <span>Exit</span>
            </Link>
            <span className="hover:text-white cursor-pointer ml-4">Steam</span>
            <span className="hover:text-white cursor-pointer">View</span>
            <span className="hover:text-white cursor-pointer">Friends</span>
            <span className="hover:text-white cursor-pointer">Games</span>
            <span className="hover:text-white cursor-pointer">Help</span>
         </div>

         {/* Window Controls */}
         <div className="flex items-center gap-1 no-drag">
           <button aria-label="Interactive Button" className="w-9 h-7 flex items-center justify-center text-[#8f98a0] hover:text-white hover:bg-white/10 transition-colors">
             <Minus className="w-4 h-4" />
           </button>
           <button aria-label="Interactive Button" onClick={onMaximize} className="w-9 h-7 flex items-center justify-center text-[#8f98a0] hover:text-white hover:bg-white/10 transition-colors">
             <Square className="w-3 h-3" />
           </button>
           <button aria-label="Interactive Button" className="w-9 h-7 flex items-center justify-center text-[#8f98a0] hover:text-white hover:bg-red-500 transition-colors">
             <X className="w-4 h-4" />
           </button>
         </div>

      </div>

      {/* Main Navigation Row */}
      <div className="flex items-center px-6 pb-6 pt-2 w-full gap-8">
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1 mr-4">
          <button aria-label="Interactive Button" className="w-8 h-8 rounded-full bg-[#1b2838] flex items-center justify-center text-[#4b5561] hover:text-white hover:bg-[#3d4450] transition-colors">
            <ChevronLeft className="w-6 h-6 -ml-0.5" />
          </button>
          <button aria-label="Interactive Button" className="w-8 h-8 rounded-full bg-[#1b2838] flex items-center justify-center text-[#4b5561] hover:text-white hover:bg-[#3d4450] transition-colors">
            <ChevronRight className="w-6 h-6 -mr-0.5" />
          </button>
        </div>

        {/* Primary Links */}
        <div className="flex items-center gap-8">
          <NavLink view="store" label="STORE" subtitle="Home" />
          <NavLink view="library" label="LIBRARY" subtitle="Projects" />
          <NavLink view="community" label="COMMUNITY" subtitle="Education" />
          <NavLink view="profile" label={personal?.name || "PROFILE"} subtitle="About Me" />
        </div>

        {/* Top Right Profile Summary */}
        <div className="ml-auto flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[#c6d4df] text-[13px] font-medium hover:text-white cursor-pointer transition-colors">{personal?.name}</span>
            <span className="text-[#8f98a0] text-[11px]">Wallet: $0.00</span>
          </div>
          <div 
            className="w-10 h-10 border-2 border-[#5c7e10] p-[2px] cursor-pointer hover:border-[#8bc53f] transition-colors"
            onClick={() => setActiveView('profile')}
          >
            <Image src={personal?.avatarUrl || "https://ui-avatars.com/api/?name=User&background=random"} alt="Profile" className="w-full h-full object-cover" width={800} height={600} />
          </div>
          <div className="w-8 h-8 bg-[#1b2838] hover:bg-[#3d4450] transition-colors flex items-center justify-center cursor-pointer relative rounded-sm">
            <Mail className="w-4 h-4 text-[#8f98a0]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1a9fff] rounded-full"></div>
          </div>
        </div>

      </div>

    </div>
  );
}
