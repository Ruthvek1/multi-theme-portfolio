import React, { useState } from 'react';
import Image from 'next/image';
import { usePortfolio } from '@/core/PortfolioContext';
import { User, Shield, MessageSquare, Download, Link as LinkIcon, Mail, Phone, Trophy, Award } from 'lucide-react';
import Link from 'next/link';

export default function ProfileView() {
  const { personal, certifications, experience, education, skills, socials } = usePortfolio();
  const [showAllBadges, setShowAllBadges] = useState(false);

  if (!personal) return null;

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[#1b2838] relative text-[#8f98a0] select-none">
      
      {/* Profile Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a475e] via-[#1b2838] to-[#1b2838] opacity-80" />
      </div>

      <div className="relative z-10 max-w-[1000px] mx-auto p-8 pt-12 flex flex-col gap-8">
        
        {/* Profile Header Box */}
        <div className="w-full bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] p-6 shadow-xl flex gap-6 rounded-sm relative overflow-hidden">
          
          {/* Avatar Container */}
          <div className="w-[164px] h-[164px] shrink-0 border-[3px] border-[#8bc53f] p-[2px] bg-[#1b2838] relative shadow-[0_0_15px_rgba(139,197,63,0.3)]">
             <Image src={personal.avatarUrl || "https://ui-avatars.com/api/?name=Player&background=random"} alt={personal.name} className="w-full h-full object-cover" width={800} height={600} />
          </div>

          {/* Profile Info */}
          <div className="flex-1 flex flex-col pt-2">
             <h1 className="text-3xl font-normal text-white mb-1">{personal.name}</h1>
             <div className="text-[13px] text-[#c6d4df] mb-4">
                {personal.location}
             </div>
             
             <div className="text-[14px] max-w-[600px] leading-relaxed mb-6">
                {personal.bio}
             </div>

             <div className="flex items-center gap-4 mt-auto">
               <Link href={personal.resumeUrl} target="_blank" className="flex items-center gap-2 bg-[#2a475e] hover:bg-[#66c0f4] hover:text-white text-[#c6d4df] px-4 py-1.5 rounded-sm transition-colors text-[13px] font-medium">
                 <Download className="w-4 h-4" />
                 View Player Manual (Resume)
               </Link>
             </div>
          </div>

          {/* Right Side: Level & Status */}
          <div className="w-[250px] shrink-0 flex flex-col items-end pt-2 gap-4">
             <div className="flex items-center gap-4">
                <div className="flex flex-col text-right">
                  <span className="text-white text-xl font-medium">Level</span>
                  <span className="text-[#8f98a0] text-xs">Years XP</span>
                </div>
                <div className="w-14 h-14 rounded-full border-2 border-[#1a9fff] flex items-center justify-center bg-[#1b2838]">
                   <span className="text-white text-2xl font-bold">4</span>
                </div>
             </div>
             
             <div className="w-full bg-[#1b2838] border border-[#3d4450] p-3 rounded-sm mt-4">
                <div className="text-[#8bc53f] font-bold text-sm mb-1 uppercase tracking-wide">Currently In-Game</div>
                <div className="text-white text-[15px]">{personal.title || "Full Stack Developer"}</div>
                <div className="text-xs text-[#8f98a0] mt-1">{experience[0]?.company}</div>
             </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-8">
           
           {/* Left Column (Main Feed & Badges) */}
           <div className="flex-1 flex flex-col gap-8">
             
             {/* Badges (Certifications) */}
             <div className="bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] rounded-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white text-lg font-normal">Badges Showcase</h2>
                  <span onClick={() => setShowAllBadges(!showAllBadges)} className="text-[#66c0f4] hover:text-white cursor-pointer text-[13px]">
                    {showAllBadges ? 'Show less' : `View all ${certifications?.length || 0}`}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {(certifications || []).slice(0, showAllBadges ? undefined : 4).map((cert, i) => (
                    <div key={cert.id || i} className="flex items-center gap-3 bg-[#1b2838] p-3 rounded-sm border border-[#3d4450] hover:border-[#66c0f4] cursor-pointer transition-colors group">
                       <div className="w-12 h-12 bg-[#2a475e] rounded-full flex items-center justify-center shrink-0">
                         <Award className="w-6 h-6 text-[#66c0f4] group-hover:text-white transition-colors" />
                       </div>
                       <div className="flex flex-col overflow-hidden flex-1">
                         <span className="text-white text-[13px] font-medium truncate group-hover:text-[#66c0f4] transition-colors">{cert.name}</span>
                         <span className="text-[#8f98a0] text-[11px] truncate">{cert.issuer} • {cert.date}</span>
                       </div>
                       {(cert.url || cert.fileUrl) && (
                         <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 bg-[#2a475e] rounded-sm hover:bg-[#66c0f4] transition-colors text-white shrink-0 group-hover:bg-[#66c0f4]">
                           <LinkIcon className="w-4 h-4" />
                         </a>
                       )}
                    </div>
                  ))}
                </div>
             </div>

             {/* Skills (Skill Tree) */}
             <div className="bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] rounded-sm p-4">
                <h2 className="text-white text-lg font-normal mb-4">Skill Tree Unlocked</h2>
                <div className="flex flex-col gap-5">
                  {skills.map((skillGroup, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <h3 className="text-[#66c0f4] text-[12px] uppercase font-bold tracking-wider">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                           {skillGroup.items.map((skill, j) => (
                              <span key={j} className="bg-[#1b2838] border border-[#3d4450] text-[#c6d4df] px-3 py-1.5 text-xs font-medium rounded-sm hover:border-[#66c0f4] hover:text-white cursor-default transition-colors">
                                 {skill}
                              </span>
                           ))}
                        </div>
                     </div>
                  ))}
                </div>
             </div>

             {/* Recent Activity (Experience) */}
             <div className="bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] rounded-sm p-4">
                <h2 className="text-white text-lg font-normal mb-4">Recent Activity</h2>
                <div className="flex flex-col gap-6">
                  {experience.map((exp, i) => (
                    <div key={exp.id} className="flex gap-4">
                      <div className="w-12 h-12 bg-black shrink-0 border border-[#3d4450]">
                         <Image alt="Image" src={exp.logoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(exp.company)}&background=random`} className="w-full h-full object-cover" width={800} height={600} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[13px] mb-1">
                          <span className="text-white hover:underline cursor-pointer">{personal.name}</span> unlocked the achievement <span className="text-white font-bold">{exp.role}</span> in <span className="text-[#66c0f4] hover:underline cursor-pointer">{exp.company}</span>
                        </div>
                        <div className="text-[11px] text-[#8f98a0] mb-2">{exp.startDate} - {exp.endDate}</div>
                        <div className="bg-[#1b2838] p-3 rounded-sm text-[13px] border border-[#3d4450]">
                          {exp.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>

           </div>

           {/* Right Column (Friends List / Contact) */}
           <div className="w-[280px] shrink-0 flex flex-col gap-6">
              
              <div className="bg-[#171a21]/80 backdrop-blur-sm border border-[#2a475e] rounded-sm">
                <div className="p-3 border-b border-[#2a475e]">
                  <h2 className="text-white text-[15px] font-normal">Contact & Socials</h2>
                </div>
                
                <div className="flex flex-col p-2">
                  <div className="text-[11px] font-bold tracking-wider text-[#66c0f4] uppercase px-2 py-2">Offline ({ (Object.keys(socials || {}).length || 0) + 2 })</div>
                  
                  {/* Email */}
                  <Link href={`mailto:${personal.email}`} className="flex items-center gap-3 px-2 py-1.5 hover:bg-[#2a475e] rounded-sm cursor-pointer transition-colors group">
                     <div className="w-8 h-8 bg-[#3d4450] p-[1px] relative">
                        <div className="w-full h-full bg-[#1b2838] flex items-center justify-center">
                          <Mail className="w-4 h-4 text-[#8f98a0] group-hover:text-white" />
                        </div>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[#8f98a0] group-hover:text-white text-[13px] font-bold">Email</span>
                       <span className="text-[#66c0f4] text-[11px] group-hover:text-white">{personal.email}</span>
                     </div>
                  </Link>

                  {/* Phone */}
                  <Link href={`tel:${personal.phone}`} className="flex items-center gap-3 px-2 py-1.5 hover:bg-[#2a475e] rounded-sm cursor-pointer transition-colors group">
                     <div className="w-8 h-8 bg-[#3d4450] p-[1px] relative">
                        <div className="w-full h-full bg-[#1b2838] flex items-center justify-center">
                          <Phone className="w-4 h-4 text-[#8f98a0] group-hover:text-white" />
                        </div>
                     </div>
                     <div className="flex flex-col">
                       <span className="text-[#8f98a0] group-hover:text-white text-[13px] font-bold">Phone</span>
                       <span className="text-[#66c0f4] text-[11px] group-hover:text-white">{personal.phone}</span>
                     </div>
                  </Link>

                  {/* Socials */}
                  {Object.entries(socials || {}).map(([platform, url]: [string, any], i: number) => (
                    <Link key={i} href={url as string} target="_blank" className="flex items-center gap-3 px-2 py-1.5 hover:bg-[#2a475e] rounded-sm cursor-pointer transition-colors group">
                       <div className="w-8 h-8 bg-[#3d4450] p-[1px] relative">
                          <div className="w-full h-full bg-[#1b2838] flex items-center justify-center">
                            <LinkIcon className="w-4 h-4 text-[#8f98a0] group-hover:text-white" />
                          </div>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[#8f98a0] group-hover:text-white text-[13px] font-bold capitalize">{platform}</span>
                         <span className="text-[#626971] text-[11px]">Playing: Web Development</span>
                       </div>
                    </Link>
                  ))}

                </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
