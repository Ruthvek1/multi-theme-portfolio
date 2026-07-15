import React from 'react';
import { useSpotify, SpotifyView } from '../Adapter';
import { Home, Search, Library, Plus, Heart, User, Briefcase, Code, BookOpen, Settings } from 'lucide-react';

export default function Sidebar() {
  const { activeView, setActiveView } = useSpotify();

  const NavItem = ({ icon: Icon, label, view, onClick }: { icon: any, label: string, view?: SpotifyView, onClick?: () => void }) => {
    const isActive = view && activeView === view;
    return (
      <button aria-label="Interactive Button" onClick={() => {
          if (view) setActiveView(view);
          if (onClick) onClick();
        }}
        className={`flex items-center gap-4 px-2 py-1.5 w-full text-sm font-bold transition-colors ${isActive ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
      >
        <Icon className={`w-6 h-6 ${isActive ? 'fill-white' : ''}`} />
        <span>{label}</span>
      </button>
    );
  };

  const PlaylistItem = ({ label, view }: { label: string, view: SpotifyView }) => (
    <button aria-label="Interactive Button" onClick={() => setActiveView(view)}
      className={`text-left w-full text-[13px] py-1 transition-colors ${activeView === view ? 'text-white' : 'text-[#b3b3b3] hover:text-white'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-[300px] flex flex-col gap-2 shrink-0 h-full">
      
      {/* Top Nav Box */}
      <div className="bg-[#121212] rounded-lg p-4 flex flex-col gap-4">
        <NavItem icon={Home} label="Home" view="home" />
        <NavItem icon={Search} label="Search" view="search" />
      </div>

      {/* Library Box */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        <div className="p-4 flex items-center justify-between">
           <button aria-label="Interactive Button" className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors font-bold text-sm">
             <Library className="w-6 h-6" />
             Your Library
           </button>
           <div className="flex gap-2">
             <button aria-label="Interactive Button" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#282828] text-[#b3b3b3] hover:text-white transition-colors">
               <Plus className="w-4 h-4" />
             </button>
           </div>
        </div>

        <div className="px-4 pb-2 flex gap-2">
           <span className="bg-[#282828] hover:bg-[#333333] transition-colors text-white text-[13px] px-3 py-1.5 rounded-full cursor-pointer font-medium">Playlists</span>
           <span className="bg-[#282828] hover:bg-[#333333] transition-colors text-white text-[13px] px-3 py-1.5 rounded-full cursor-pointer font-medium">Artists</span>
        </div>

        {/* Playlists (Portfolio Categories) */}
        <div className="flex-1 overflow-y-auto px-2 py-2 mt-2 flex flex-col gap-1 custom-scrollbar">
           
           <div 
             onClick={() => setActiveView('about')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'about' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'about' ? 'text-green-500' : 'text-white'}`}>About Me</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Artist</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('projects')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'projects' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded flex items-center justify-center shrink-0 shadow-sm">
                <Code className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'projects' ? 'text-green-500' : 'text-white'}`}>Projects</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • 10 songs</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('experience')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'experience' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center shrink-0 shadow-sm">
                <Briefcase className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'experience' ? 'text-green-500' : 'text-white'}`}>Experience</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • Career Timeline</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('education')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'education' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded flex items-center justify-center shrink-0 shadow-sm">
                <BookOpen className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'education' ? 'text-green-500' : 'text-white'}`}>Education</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • Academics</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('skills')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'skills' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded flex items-center justify-center shrink-0 shadow-sm">
                <Settings className="w-6 h-6 text-white" />
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'skills' ? 'text-green-500' : 'text-white'}`}>Top Skills</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Your Top Genres</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('certifications')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'certifications' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-bold">C</span>
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'certifications' ? 'text-green-500' : 'text-white'}`}>Certifications</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • Credentials</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('resume')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'resume' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-zinc-500 to-zinc-700 rounded flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-bold">CV</span>
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'resume' ? 'text-green-500' : 'text-white'}`}>Resume</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • Document</span>
             </div>
           </div>

           <div 
             onClick={() => setActiveView('contact')}
             className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${activeView === 'contact' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'}`}
           >
             <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-600 rounded flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white font-bold">@</span>
             </div>
             <div className="flex flex-col overflow-hidden">
               <span className={`text-[15px] font-medium truncate ${activeView === 'contact' ? 'text-green-500' : 'text-white'}`}>Contact & Socials</span>
               <span className="text-[13px] text-[#b3b3b3] truncate">Playlist • Reach Out</span>
             </div>
           </div>

        </div>
      </div>
      
    </div>
  );
}
