import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSpotify } from '../Adapter';
import { usePortfolio } from '@/core/PortfolioContext';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Mic2, List, MonitorSpeaker, Volume2, Maximize2, Heart } from 'lucide-react';

export default function NowPlayingBar() {
  const { hoveredItem, activeView, setActiveView } = useSpotify();
  const { personal } = usePortfolio();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate progress bar moving
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.1; // Slow increment
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Determine what is currently "playing" based on hover state or default
  const title = hoveredItem?.title || hoveredItem?.name || personal?.title || 'Welcome';
  const subtitle = hoveredItem?.subtitle || hoveredItem?.company || hoveredItem?.category || personal?.name || 'Artist';
  const image = hoveredItem?.image || hoveredItem?.thumbnailUrl || hoveredItem?.logoUrl || personal?.avatarUrl || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80';

  const formatTime = (pct: number) => {
    const totalSeconds = 214; // Fake total time 3:34
    const currentSeconds = Math.floor((pct / 100) * totalSeconds);
    const m = Math.floor(currentSeconds / 60);
    const s = Math.floor(currentSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute bottom-0 left-0 w-full h-[90px] bg-[#181818] border-t border-[#282828] z-50 flex items-center justify-between px-4 select-none">
      
      {/* Left: Track Info */}
      <div className="w-[30%] min-w-[180px] flex items-center gap-3.5">
        <div className="relative group overflow-hidden rounded shadow-md shrink-0 w-14 h-14 bg-[#282828]">
          <Image src={image} alt={title} className="w-full h-full object-cover" width={800} height={600} />
        </div>
        <div className="flex flex-col truncate pr-4">
          <span className="text-white text-sm font-medium hover:underline cursor-pointer truncate">{title}</span>
          <span className="text-[11px] text-[#b3b3b3] hover:underline cursor-pointer hover:text-white truncate">{subtitle}</span>
        </div>
        <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white shrink-0 ml-2">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex-1 max-w-[722px] flex flex-col items-center justify-center">
        <div className="flex items-center gap-6 mb-2">
          <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button aria-label="Interactive Button" onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-1" />}
          </button>
          <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        <div className="w-full flex items-center gap-2 max-w-[600px]">
          <span className="text-[11px] text-[#a7a7a7] w-10 text-right">{formatTime(progress)}</span>
          <div className="group flex-1 h-3 flex items-center cursor-pointer" onClick={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             const pct = ((e.clientX - rect.left) / rect.width) * 100;
             setProgress(pct);
          }}>
             <div className="w-full h-1 bg-[#4d4d4d] rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-white group-hover:bg-[#1db954] rounded-full relative" 
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
          <span className="text-[11px] text-[#a7a7a7] w-10">3:34</span>
        </div>
      </div>

      {/* Right: Volume & Extra Controls */}
      <div className="w-[30%] min-w-[180px] flex items-center justify-end gap-3 text-[#b3b3b3]">
        <button aria-label="Interactive Button" className={`transition-colors ${activeView === 'visualizer' ? 'text-[#1db954]' : 'hover:text-white'}`}
          onClick={() => setActiveView(activeView === 'visualizer' ? 'home' : 'visualizer')}
          title="Audio Visualizer"
        >
          <Mic2 className="w-4 h-4" />
        </button>
        <button aria-label="Interactive Button" className="hover:text-white"><List className="w-4 h-4" /></button>
        <button aria-label="Interactive Button" className="hover:text-white"><MonitorSpeaker className="w-4 h-4" /></button>
        <div className="flex items-center gap-2 group w-24 ml-2">
           <Volume2 className="w-4 h-4 hover:text-white" />
           <div className="w-full h-1 bg-[#4d4d4d] rounded-full overflow-hidden flex cursor-pointer">
              <div className="h-full w-2/3 bg-white group-hover:bg-[#1db954] rounded-full" />
           </div>
        </div>
        <button aria-label="Interactive Button" className="hover:text-white"><Maximize2 className="w-4 h-4" /></button>
      </div>

    </div>
  );
}
