import React from 'react';
import Image from 'next/image';
import { Play, Heart, MoreHorizontal, Clock, Hash, Download } from 'lucide-react';
import { useSpotify } from '../Adapter';

interface PlaylistItem {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  dateAdded: string;
  link?: string;
  fileUrl?: string;
  description?: string;
}

interface PlaylistViewProps {
  title: string;
  description: string;
  coverUrl: string;
  items: PlaylistItem[];
  type: 'project' | 'experience' | 'education' | 'skill' | 'about';
}

export default function PlaylistView({ title, description, coverUrl, items, type }: PlaylistViewProps) {
  const { setHoveredItem } = useSpotify();

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar relative">
      
      {/* Dynamic Header Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-[#535353] to-[#121212] -z-10 pointer-events-none"></div>

      {/* Playlist Header */}
      <div className="flex items-end gap-6 p-6 pt-24 pb-8">
         <div className="w-48 h-48 md:w-60 md:h-60 shadow-[0_4px_60px_rgba(0,0,0,0.5)] shrink-0 bg-[#282828]">
           <Image src={coverUrl} 
             alt={title} 
             className={`w-full h-full object-cover ${type === 'about' ? 'rounded-full' : ''}`} 
             onError={(e) => {
               (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(title)}&size=512&background=random`;
             }}
             width={800} height={600}
           />
         </div>
         <div className="flex flex-col gap-2">
           <span className="text-sm font-bold text-white uppercase tracking-wider">{type === 'about' ? 'Artist' : 'Playlist'}</span>
           <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight mb-2 mt-2">{title}</h1>
           <p className="text-[#b3b3b3] text-[14px] font-medium">{description}</p>
           <div className="flex items-center gap-1 text-[14px] font-medium mt-1">
             <span className="text-white font-bold">Portfolio</span>
             <span className="text-[#b3b3b3]"> • {items.length} {items.length === 1 ? 'song' : 'songs'}</span>
           </div>
         </div>
      </div>

      <div className="bg-black/20 p-6 min-h-[50vh]">
        {/* Play Controls */}
        <div className="flex items-center gap-6 mb-8">
           <button aria-label="Interactive Button" className="w-14 h-14 rounded-full bg-[#1db954] flex items-center justify-center shadow-lg hover:scale-105 transition-transform text-black">
             <Play className="w-7 h-7 fill-current ml-1" />
           </button>
           <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
             <Heart className="w-8 h-8" />
           </button>
           <button aria-label="Interactive Button" className="text-[#b3b3b3] hover:text-white transition-colors">
             <MoreHorizontal className="w-8 h-8" />
           </button>
        </div>

        {/* Tracklist Table Header */}
        <div className="grid grid-cols-[40px_minmax(200px,1fr)_minmax(120px,200px)_minmax(120px,1fr)] gap-4 px-4 py-2 border-b border-[#282828] text-[13px] text-[#b3b3b3] uppercase tracking-wider font-medium mb-4 sticky top-0 bg-[#121212]/95 backdrop-blur-md z-10">
          <div className="flex items-center justify-center"><Hash className="w-4 h-4" /></div>
          <div>Title</div>
          <div className="hidden md:block">{type === 'project' ? 'Date Added' : 'Timeline'}</div>
          <div className="hidden lg:block text-right pr-4"><Clock className="w-4 h-4 inline-block" /></div>
        </div>

        {/* Tracklist Items */}
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <div 
              key={item.id}
              className="grid grid-cols-[40px_minmax(200px,1fr)_minmax(120px,200px)_minmax(120px,1fr)] gap-4 px-4 py-2 hover:bg-white/10 rounded-md group cursor-pointer transition-colors"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                if (item.link) window.open(item.link, '_blank');
              }}
            >
              {/* Index / Play Button */}
              <div className="flex items-center justify-center relative w-full h-full">
                 <span className="text-[#b3b3b3] text-[15px] group-hover:opacity-0">{index + 1}</span>
                 <Play className="w-4 h-4 text-white fill-current absolute opacity-0 group-hover:opacity-100" />
              </div>
              
              {/* Title & Image */}
              <div className="flex items-center gap-4 overflow-hidden pr-4">
                 {item.image && (
                   <Image 
                     src={item.image} 
                     alt={item.title} 
                     className="w-10 h-10 object-cover shrink-0 rounded-[2px]" 
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       if (!target.src.includes('ui-avatars.com')) {
                           target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&size=128&background=random`;
                       }
                     }}
                     width={800} height={600}
                   />
                 )}
                 <div className="flex flex-col overflow-hidden justify-center h-full">
                    <span className="text-[15px] font-medium text-white truncate group-hover:underline">{item.title}</span>
                    <span className="text-[13px] text-[#b3b3b3] truncate group-hover:text-white transition-colors">{item.subtitle}</span>
                 </div>
              </div>

              {/* Date / Timeline */}
              <div className="hidden md:flex items-center text-[14px] text-[#b3b3b3] group-hover:text-white transition-colors truncate">
                 {item.dateAdded}
              </div>

              {/* Duration / Description snippet */}
              <div className="hidden lg:flex items-center justify-end pr-4 gap-2 text-[14px] text-[#b3b3b3] group-hover:text-white transition-colors overflow-hidden text-right">
                 {item.description === 'LIVE DEMO' && (
                   <span className="bg-[#1db954] text-black text-[10px] font-bold px-2 py-0.5 rounded-sm">LIVE DEMO CLICK</span>
                 )}
                 {item.description === 'GITHUB' && (
                   <span className="bg-[#333] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">GITHUB</span>
                 )}
                 {item.link && (item.fileUrl || type === 'education') && (
                   <a aria-label="Link" href={item.link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 text-white transition-colors text-xs font-semibold whitespace-nowrap">
                     View Credential
                   </a>
                 )}
                 {item.fileUrl && (
                   <a aria-label="Link" href={item.fileUrl} download target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                     <Download className="w-4 h-4" />
                   </a>
                 )}
                 {!item.fileUrl && item.description !== 'LIVE DEMO' && item.description !== 'GITHUB' && (
                   <span className="line-clamp-1">{item.description ? item.description.substring(0, 30) + (item.description.length > 30 ? '...' : '') : '3:45'}</span>
                 )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
