'use client';

import React, { createContext, useContext, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import Sidebar from './components/Sidebar';
import NowPlayingBar from './components/NowPlayingBar';
import HomeView from './views/HomeView';
import PlaylistView from './views/PlaylistView';

export type SpotifyView = 'home' | 'search' | 'projects' | 'experience' | 'education' | 'skills' | 'about' | 'certifications' | 'resume' | 'contact' | 'visualizer';

interface SpotifyContextType {
  activeView: SpotifyView;
  setActiveView: (view: SpotifyView) => void;
  hoveredItem: any | null;
  setHoveredItem: (item: any | null) => void;
}

export const SpotifyContext = createContext<SpotifyContextType | null>(null);

export const useSpotify = () => {
  const ctx = useContext(SpotifyContext);
  if (!ctx) throw new Error('useSpotify must be used within SpotifyProvider');
  return ctx;
};

export default function SpotifyAdapter() {
  const { personal, projects, experience, skills, education, certifications, socials } = usePortfolio();
  const [activeView, setActiveView] = useState<SpotifyView>('home');
  const [hoveredItem, setHoveredItem] = useState<any | null>(null);

  if (!personal) return null;

  return (
    <SpotifyContext.Provider value={{ activeView, setActiveView, hoveredItem, setHoveredItem }}>
      <div className="w-full h-screen flex flex-col bg-black text-[#b3b3b3] font-sans selection:bg-white selection:text-black overflow-hidden relative">
        
        {/* Main Body (Sidebar + Content View) */}
        <div className="flex-1 flex overflow-hidden p-2 gap-2 pb-24"> {/* pb-24 for NowPlayingBar */}
          
          <Sidebar />

          {/* Main Content Area */}
          <div className="flex-1 bg-[#121212] rounded-lg overflow-hidden relative flex flex-col">
             {activeView === 'home' && <HomeView />}
             {activeView === 'visualizer' && (
               <div className="w-full h-full flex items-center justify-center bg-black overflow-hidden relative group">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1db954]/20 via-black to-black animate-pulse duration-[3000ms]"></div>
                 <div className="text-center z-10">
                   <div className="flex items-end justify-center gap-2 mb-8 h-32">
                     {[...Array(20)].map((_, i) => (
                       <div key={i} className="w-3 bg-[#1db954] rounded-t-sm" style={{ 
                         height: `${Math.max(10, Math.random() * 100)}%`,
                         animation: `equalizer ${0.5 + Math.random()}s ease-in-out infinite alternate`
                       }}></div>
                     ))}
                   </div>
                   <h2 className="text-4xl font-black text-white tracking-tighter">Audio Visualizer</h2>
                   <p className="text-[#b3b3b3] mt-2">Listening to your portfolio...</p>
                 </div>
                 <style dangerouslySetInnerHTML={{__html: `
                   @keyframes equalizer {
                     0% { transform: scaleY(0.3); }
                     100% { transform: scaleY(1); }
                   }
                 `}} />
               </div>
             )}
             {activeView === 'projects' && (
                <PlaylistView 
                  title="Your Projects" 
                  description="A collection of web apps, tools, and experiments." 
                  coverUrl={projects[0]?.thumbnailUrl || `https://ui-avatars.com/api/?name=Projects&size=512&background=random`}
                  items={projects.map(p => ({
                    id: p.id,
                    title: p.title,
                    subtitle: p.subtitle,
                    image: p.thumbnailUrl,
                    dateAdded: p.year || '2025',
                    link: p.liveUrl || p.githubUrl,
                    description: p.liveUrl ? 'LIVE DEMO' : p.githubUrl ? 'GITHUB' : undefined
                  }))} 
                  type="project"
                />
             )}
             {activeView === 'experience' && (
                <PlaylistView 
                  title="Career History" 
                  description="Professional journey and roles." 
                  coverUrl={experience[0]?.logoUrl || `https://ui-avatars.com/api/?name=Career+History&size=512&background=random`}
                  items={experience.map(e => ({
                    id: e.id,
                    title: e.role,
                    subtitle: e.company,
                    image: e.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(e.company)}&background=random`,
                    dateAdded: `${e.startDate} - ${e.endDate}`,
                    description: e.description
                  }))} 
                  type="experience"
                />
             )}
             {activeView === 'education' && (
                <PlaylistView 
                  title="Education" 
                  description="Academic background and degrees." 
                  coverUrl={`https://ui-avatars.com/api/?name=Education&size=512&background=random`}
                  items={education.map((e, i) => ({
                    id: e.id,
                    title: e.degree,
                    subtitle: e.institution,
                    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(e.institution)}&background=random`,
                    dateAdded: `${e.startDate} - ${e.endDate}`,
                    description: e.description
                  }))} 
                  type="education"
                />
             )}
             {activeView === 'certifications' && (
                <PlaylistView 
                  title="Certifications" 
                  description="Professional credentials and achievements." 
                  coverUrl={`https://ui-avatars.com/api/?name=Certifications&size=512&background=random`}
                  items={(certifications || []).map((c: any, i: number) => ({
                    id: c.id || `cert-${i}`,
                    title: c.name,
                    subtitle: c.issuer,
                    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.issuer)}&background=random`,
                    dateAdded: c.date,
                    link: c.url,
                    fileUrl: c.fileUrl
                  }))} 
                  type="education"
                />
             )}
             {activeView === 'skills' && (
                <PlaylistView 
                  title="Top Genres (Skills)" 
                  description="Technologies and tools I specialize in." 
                  coverUrl={`https://ui-avatars.com/api/?name=Skills&size=512&background=random`}
                  items={skills.flatMap((s, catIdx) => s.items.map((skillName, itemIdx) => ({
                    id: `skill-${catIdx}-${itemIdx}`,
                    title: skillName,
                    subtitle: s.category,
                    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(skillName)}&background=random`,
                    dateAdded: s.category
                  })))} 
                  type="skill"
                />
             )}
             {activeView === 'resume' && (
                <PlaylistView 
                  title="Resume" 
                  description="My professional curriculum vitae." 
                  coverUrl={`https://ui-avatars.com/api/?name=Resume&size=512&background=random`}
                  items={[{
                     id: 'resume-dl',
                     title: 'Download Resume',
                     subtitle: 'PDF Document',
                     image: `https://ui-avatars.com/api/?name=PDF&background=random`,
                     dateAdded: 'Present',
                     link: personal.resumeUrl
                  }]} 
                  type="about"
                />
             )}
             {activeView === 'contact' && (
                <PlaylistView 
                  title="Contact & Socials" 
                  description="Let's connect and build something great." 
                  coverUrl={`https://ui-avatars.com/api/?name=Contact&size=512&background=random`}
                  items={[
                    {
                       id: 'email',
                       title: 'Email',
                       subtitle: personal.email,
                       image: `https://img.icons8.com/color/512/gmail-new.png`,
                       dateAdded: 'Reach Out',
                       link: `mailto:${personal.email}`
                    },
                    {
                       id: 'phone',
                       title: 'Phone',
                       subtitle: personal.phone,
                       image: `https://img.icons8.com/color/512/phone.png`,
                       dateAdded: 'Call Me',
                       link: `tel:${personal.phone}`
                    },
                    ...Object.entries(socials || {}).map(([platform, url]: [string, any], i: number) => {
                       let iconUrl = `https://img.icons8.com/fluency/512/${platform.toLowerCase()}.png`;
                       if (platform.toLowerCase() === 'github') iconUrl = 'https://img.icons8.com/ios-filled/512/ffffff/github.png';
                       if (platform.toLowerCase() === 'linkedin') iconUrl = 'https://img.icons8.com/color/512/linkedin.png';
                       if (platform.toLowerCase() === 'instagram') iconUrl = 'https://img.icons8.com/fluency/512/instagram-new.png';
                       if (platform.toLowerCase() === 'twitter' || platform.toLowerCase() === 'x') iconUrl = 'https://img.icons8.com/color/512/twitter--v1.png';
                       
                       return {
                         id: `social-${i}`,
                         title: platform.charAt(0).toUpperCase() + platform.slice(1),
                         subtitle: url,
                         type: 'link',
                         duration: 'Link',
                         dateAdded: 'Social Media',
                         link: url,
                         image: iconUrl,
                         isExplicit: false
                       };
                    })
                  ]} 
                  type="about"
                />
             )}
             {activeView === 'about' && (
                <PlaylistView 
                  title={`Artist: ${personal.name}`} 
                  description={personal.bio} 
                  coverUrl={personal.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&size=512&background=random`}
                  items={[{
                     id: 'bio',
                     title: 'Location',
                     subtitle: personal.location,
                     image: personal.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(personal.name)}&background=random`,
                     description: personal.email,
                     dateAdded: 'Present'
                  }]} 
                  type="about"
                />
             )}
          </div>
        </div>

        {/* Persistent Bottom Bar */}
        <NowPlayingBar />

      </div>
    </SpotifyContext.Provider>
  );
}
