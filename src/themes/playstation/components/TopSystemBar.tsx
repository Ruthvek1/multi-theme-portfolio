import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePlayStation } from '../Adapter';
import { usePortfolio } from '@/core/PortfolioContext';
import { Search, Settings, UserCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopSystemBar() {
  const { activeView, setActiveView } = usePlayStation();
  const { personal } = usePortfolio();
  
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-16 flex items-center justify-between px-10 pt-4 z-50">
      
      {/* Left side tabs */}
      <div className="flex gap-8 items-center">
        <button aria-label="Interactive Button" onClick={() => setActiveView('home')}
          className={`text-[15px] font-medium tracking-wide transition-colors ${activeView === 'home' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          Games
        </button>
        <button aria-label="Interactive Button" onClick={() => setActiveView('trophies')}
          className={`text-[15px] font-medium tracking-wide transition-colors ${activeView === 'trophies' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          Trophies
        </button>
        <button aria-label="Interactive Button" onClick={() => setActiveView('profile')}
          className={`text-[15px] font-medium tracking-wide transition-colors ${activeView === 'profile' ? 'text-white' : 'text-white/50 hover:text-white/80'}`}
        >
          Profile
        </button>
      </div>

      {/* Right side system icons */}
      <div className="flex gap-6 items-center text-white/80">
        <button aria-label="Interactive Button" className="hover:text-white transition-colors hover:scale-110 transform">
          <Search className="w-5 h-5" />
        </button>
        <button aria-label="Interactive Button" className="hover:text-white transition-colors hover:scale-110 transform">
          <Settings className="w-5 h-5" />
        </button>
        
        {/* Profile Avatar / Trigger */}
        <button aria-label="Interactive Button" onClick={() => setActiveView('profile')}
          className="flex items-center gap-3 hover:text-white transition-all group"
        >
          <div className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-colors ${activeView === 'profile' ? 'border-white' : 'border-transparent group-hover:border-white/50'}`}>
             <Image src={"/assets/psn-avatar-v2.png"} alt="Profile" className="w-full h-full object-cover" width={800} height={600} />
          </div>
          {activeView === 'profile' && (
            <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm font-medium">
              {personal?.name}
            </motion.span>
          )}
        </button>

        <div className="text-sm font-medium ml-4 w-16 text-right">
          {time}
        </div>
      </div>
      
    </div>
  );
}
