'use client';

import Image from 'next/image';
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import { Play, Download, ArrowUpRight, Search, Bell, Info } from 'lucide-react';
import Link from 'next/link';

const cinematicEase = [0.19, 1, 0.22, 1] as const;

export default function NetflixAdapter() {
  const { personal, projects, experience, skills, socials, certifications, education } = usePortfolio();
  const [profileSelected, setProfileSelected] = useState(false);
  
  if (!personal) return null;

  if (!profileSelected) {
    // Stage 1: Profile Selector
    return (
      <div className="bg-[#141414] min-h-screen text-white flex flex-col items-center justify-center font-sans selection:bg-[#E50914]">
        <h1 className="text-4xl md:text-6xl font-medium mb-12 tracking-tight text-[#fff]">Who's watching?</h1>
        <div className="flex gap-6 md:gap-10 mb-16">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ ease: cinematicEase, duration: 0.4 }}
            onClick={() => setProfileSelected(true)}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-md mb-4 border-2 border-transparent group-hover:border-white transition-colors duration-500 overflow-hidden">
              <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="Profile" className="w-full h-full object-cover" width={800} height={600} />
            </div>
            <span className="text-[#808080] group-hover:text-white transition-colors duration-500 text-xl font-medium">Recruiter</span>
          </motion.div>
        </div>
      </div>
    );
  }

  return <HybridNetflixPortfolio personal={personal} projects={projects} experience={experience} skills={skills} socials={socials} certifications={certifications} education={education} />;
}

// Stage 2 & 3: Classic Netflix App seamlessly flowing into Cinematic Jobs Portal
function HybridNetflixPortfolio({ personal, projects, experience, skills, socials, certifications, education }: any) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Navigation Transitions
  const navBgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  
  // Hero Transitions (Parallax & Fade)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 0.8]);

  return (
    <div ref={containerRef} className="bg-[#141414] min-h-screen text-white font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden">
      
      {/* CLASSIC NETFLIX: Navigation */}
      <motion.nav 
        style={{ backgroundColor: useTransform(navBgOpacity, v => `rgba(20,20,20,${v})`) }}
        className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4 flex justify-between items-center transition-all duration-700 bg-gradient-to-b from-black/80 to-transparent"
      >
        <div className="flex items-center gap-10">
          <Link href="/" className="text-[#E50914] text-4xl font-black tracking-tighter">
            {personal.name.split(' ').map((n: string) => n[0]).join('')}
          </Link>
          <div className="hidden lg:flex gap-6 text-sm font-medium text-[#e5e5e5]">
            <a aria-label="Link" href="#" className="font-bold text-white">Home</a>
            <a aria-label="Link" href="#projects" className="hover:text-[#b3b3b3] transition-colors">Projects</a>
            <a aria-label="Link" href="#skills" className="hover:text-[#b3b3b3] transition-colors">Skills</a>
            <a aria-label="Link" href="#timeline" className="hover:text-[#b3b3b3] transition-colors">Timeline</a>
            <a aria-label="Link" href="#education" className="hover:text-[#b3b3b3] transition-colors">Education</a>
            <a aria-label="Link" href="#resume" className="hover:text-[#b3b3b3] transition-colors">Resume</a>
            <a aria-label="Link" href="#contact" className="hover:text-[#b3b3b3] transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="flex items-center gap-6 text-white">
          <Search className="w-6 h-6 cursor-pointer" />
          <span className="text-sm font-bold hidden md:block cursor-pointer">Kids</span>
          <Bell className="w-6 h-6 cursor-pointer" />
          <div className="w-8 h-8 rounded-md overflow-hidden cursor-pointer">
            <Image src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="Profile" className="w-full h-full object-cover" width={800} height={600} />
          </div>
        </div>
      </motion.nav>

      {/* CLASSIC NETFLIX: Hero Section */}
      <section className="relative w-full h-[100vh] md:h-[130vh] flex items-center justify-start">
        {/* Parallax Background */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="fixed inset-0 z-0 pointer-events-none w-full h-[100vh]">
          <video src="/assets/net.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          <motion.div style={{ opacity: heroOverlayOpacity }} className="absolute inset-0 bg-[#141414]" />
          {/* Classic Left/Bottom Fade Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-90" />
        </motion.div>
        
        {/* Classic Hero Content */}
        <div className="relative z-10 text-left px-4 md:px-12 max-w-3xl mt-[-20vh]">
          <motion.h1 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: cinematicEase, delay: 0.5 }}
            className="text-6xl md:text-[6vw] font-black tracking-tighter uppercase leading-[0.9] mb-6 drop-shadow-2xl text-white"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.45)' }}
          >
            {personal.name}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-4 text-white font-bold mb-6 text-lg"
          >
            <span className="text-[#46d369]">98% Match</span>
            <span>{new Date().getFullYear()}</span>
            <span className="border border-white/40 px-2 py-0.5 text-sm rounded-sm">TV-MA</span>
            <span>{projects.length} Projects</span>
            <span className="border border-white/40 px-2 py-0.5 text-xs rounded-sm">HD</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: cinematicEase, delay: 0.8 }}
            className="text-lg md:text-2xl text-white font-medium max-w-2xl leading-snug drop-shadow-lg mb-10 text-shadow-md"
          >
            {personal.bio}
          </motion.p>
          
          {/* Classic Play & More Info Buttons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: cinematicEase, delay: 1.2 }}
            className="flex gap-4"
          >
             <a aria-label="Link" href="#projects" className="bg-white text-black px-8 py-3 md:py-4 rounded-md font-bold text-lg hover:bg-white/80 transition-colors flex items-center gap-3">
               <Play className="w-8 h-8 fill-black" /> Play
             </a>
             <a aria-label="Link" href={personal.resumeUrl} className="bg-[#6d6d6eb3] text-white px-8 py-3 md:py-4 rounded-md font-bold text-lg hover:bg-[#6d6d6e66] transition-colors flex items-center gap-3">
               <Info className="w-8 h-8" /> More Info
             </a>
          </motion.div>
        </div>
      </section>

      <div className="relative z-20 bg-[#141414] w-full pb-10">
        
        {/* CLASSIC NETFLIX: Content Rows */}
        <section className="relative -mt-32 md:-mt-48 pb-10 z-30">
          <ContentRow title="Featured Projects" items={projects} />
        </section>

        {/* TRANSITION TO CINEMATIC JOBS PORTAL */}
        <div className="w-full h-20 bg-gradient-to-b from-[#141414] to-[#111111]" />

        {/* CINEMATIC JOBS PORTAL: Projects Deep Dive */}
        <section id="projects" className="px-6 md:px-20 max-w-[1800px] mx-auto pt-10 mb-32 bg-[#111111]">
          <CinematicHeader title="Featured Case Studies" subtitle="Deep Dive" />
          
          <div className="flex flex-col gap-40">
            {projects.map((project: any, i: number) => (
              <ProjectScene key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* CINEMATIC JOBS PORTAL: Skills Section */}
        <section id="skills" className="px-6 md:px-20 max-w-[1800px] mx-auto mb-52 bg-[#111111]">
          <CinematicHeader title="Core Competencies" subtitle="Skills" />
          <div className="flex flex-wrap gap-4 md:gap-6 mt-16">
            {skills.flatMap((s: any) => s.items).map((skill: string, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.03, ease: cinematicEase }}
                className="text-5xl md:text-7xl font-black text-[#181818] hover:text-[#B3B3B3] transition-colors duration-700 tracking-tighter uppercase cursor-default"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CINEMATIC JOBS PORTAL: Timeline & Certifications */}
        <section id="timeline" className="px-6 md:px-20 max-w-[1800px] mx-auto mb-20 bg-[#111111]">
           <CinematicHeader title="Career Timeline" subtitle="Experience & Certifications" />
           <div className="mt-20 border-l border-white/5 pl-8 md:pl-16 flex flex-col gap-32">
             {experience.map((exp: any, i: number) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: cinematicEase }}
                  className="relative group"
                >
                  <div className="absolute -left-[35px] md:-left-[67px] top-2 w-4 h-4 rounded-full bg-[#111111] border-2 border-[#B3B3B3] group-hover:border-[#E50914] group-hover:bg-[#E50914] transition-all duration-500" />
                  
                  <div className="text-[#E50914] tracking-widest text-sm font-bold uppercase mb-4">{exp.startDate} - {exp.endDate}</div>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">{exp.role}</h3>
                  <div className="text-2xl text-[#B3B3B3] font-medium mb-6">{exp.company}</div>
                  
                  <div className="text-[#B3B3B3] max-w-3xl leading-relaxed">
                    {exp.description}
                  </div>
                </motion.div>
             ))}

             {/* Certifications appended to Timeline */}
             {certifications && certifications.length > 0 && (
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.2, ease: cinematicEase }}
                 className="relative group mt-10"
               >
                 <div className="absolute -left-[35px] md:-left-[67px] top-2 w-4 h-4 rounded-full bg-[#111111] border-2 border-[#E50914] group-hover:bg-[#E50914] transition-all duration-500 shadow-[0_0_15px_#E50914]" />
                 <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 text-[#E50914]">Certifications</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certifications.map((cert: any) => (
                      <div key={cert.id} className="p-6 bg-black/40 border border-white/5 hover:border-white/20 transition-all flex items-center justify-between group">
                        <div className="flex-1 block group-hover:-translate-y-1 transition-transform">
                          <div className="text-sm text-[#B3B3B3] mb-2">{cert.date}</div>
                          <div className="text-xl font-bold text-white mb-1">{cert.name}</div>
                          <div className="text-[#E50914] text-sm uppercase tracking-wider">{cert.issuer}</div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {(cert.url || cert.fileUrl) && (
                            <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors text-sm font-semibold whitespace-nowrap">
                              View Credential
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
               </motion.div>
             )}

             {/* Education Section */}
             {education && education.length > 0 && (
               <motion.div
                 id="education"
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1.2, ease: cinematicEase }}
                 className="relative group mt-20"
               >
                 <div className="absolute -left-[35px] md:-left-[67px] top-2 w-4 h-4 rounded-full bg-[#111111] border-2 border-white group-hover:bg-white transition-all duration-500 shadow-[0_0_15px_#ffffff]" />
                 <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 text-white">Education</h3>
                 
                 {/* Horizontal Scroll Row for Education like Netflix Shows */}
                 <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
                   {education.map((edu: any, i: number) => (
                     <div key={edu.id} className="min-w-[300px] md:min-w-[400px] snap-center bg-[#181818] rounded border border-white/5 hover:border-white/20 transition-all hover:scale-105 hover:z-10 cursor-pointer shadow-lg group/card overflow-hidden">
                       <div className="h-32 bg-gradient-to-br from-[#E50914]/20 to-black relative flex items-end p-4">
                         <div className="text-4xl font-black text-white/20 absolute top-4 right-4">{i + 1}</div>
                         <div className="text-xl font-bold text-white drop-shadow-md z-10 leading-tight">{edu.degree}</div>
                       </div>
                       <div className="p-6">
                         <div className="flex items-center gap-3 mb-3">
                           <span className="text-green-500 font-bold text-sm">Completed</span>
                           <span className="text-gray-400 text-sm border border-gray-600 px-1 rounded">{edu.startDate} - {edu.endDate}</span>
                         </div>
                         <div className="text-white font-medium mb-3">{edu.institution}</div>
                         <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 group-hover/card:line-clamp-none transition-all">{edu.description}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}
           </div>
        </section>

        {/* CINEMATIC JOBS PORTAL: Resume Section */}
        <section id="resume" className="px-6 md:px-20 max-w-[1800px] mx-auto pb-20 bg-[#111111] flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: cinematicEase }}
            className="w-full max-w-4xl bg-gradient-to-br from-[#181818] to-[#111111] border border-white/10 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center group relative overflow-hidden"
          >
            {/* Hover Glare Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E50914]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 relative z-10">Curriculum Vitae</h2>
            <p className="text-[#B3B3B3] text-xl max-w-2xl leading-relaxed mb-12 relative z-10">
              Download my full resume to see a detailed breakdown of my experience, education, and technical background.
            </p>
            <a aria-label="Link" href={personal.resumeUrl} 
              target="_blank"
              className="relative z-10 flex items-center gap-4 bg-white text-black px-12 py-5 font-bold uppercase tracking-widest text-sm hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-300"
            >
              <Download className="w-5 h-5" /> Download PDF
            </a>
          </motion.div>
        </section>
        
      </div>

      {/* Footer (Contact & Socials) */}
      <footer id="contact" className="relative z-20 bg-[#000000] w-full px-6 md:px-20 py-40 flex flex-col items-center justify-center text-center border-t border-[#181818]">
         <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1.5, ease: cinematicEase }}
         >
           <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase leading-[0.9] mb-12">
             Let's Create<br/>Something <span className="text-[#E50914]">Cinematic</span>.
           </h2>
           <a aria-label="Link" href={`mailto:${personal.email}`} className="text-3xl md:text-5xl text-[#B3B3B3] hover:text-white transition-colors duration-500 font-medium">
             {personal.email}
           </a>
           
           <div className="mt-24 flex justify-center gap-12">
             {socials?.github && <SocialLink href={socials.github} icon={<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>} />}
             {socials?.linkedin && <SocialLink href={socials.linkedin} icon={<svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>} />}
           </div>
         </motion.div>
      </footer>
    </div>
  );
}

// CLASSIC NETFLIX ROW COMPONENT
function ContentRow({ title, items }: { title: string, items: any[] }) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="mb-10 group relative px-4 md:px-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#e5e5e5]">{title}</h2>
      
      <div className="relative">
        <div ref={rowRef} className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth snap-x z-20 pb-10 -mb-10 pt-4 -mt-4">
          {items.map((item, i) => (
             <div key={i} className="flex-none w-[280px] aspect-video relative rounded-sm cursor-pointer snap-start hover:z-50 transform hover:scale-110 hover:-translate-y-4 transition-all duration-300 ease-out shadow-lg">
                <Image src={item.thumbnailUrl} alt={item.title || "Thumbnail"} className="w-full h-full object-cover rounded-sm" width={800} height={600} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-80 rounded-sm" />
                <div className="absolute bottom-3 left-4">
                  <h3 className="font-bold text-white text-lg drop-shadow-md">{item.title}</h3>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// CINEMATIC COMPONENTS
function CinematicHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: cinematicEase }}
      className="mb-24"
    >
      <div className="text-[#E50914] font-bold tracking-[0.2em] uppercase text-sm mb-4">{subtitle}</div>
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">{title}</h2>
    </motion.div>
  );
}

function ProjectScene({ project, index }: { project: any, index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.5, ease: cinematicEase }}
      className={`group flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
    >
      <div className="w-full md:w-[60%] aspect-[16/10] relative overflow-hidden bg-[#181818] border border-white/5 cursor-pointer transform transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] group-hover:border-white/10">
        <Image alt="Image" src={project.thumbnailUrl} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out" width={800} height={600} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700 ease-out" />
      </div>
      
      <div className="w-full md:w-[40%] flex flex-col justify-center">
        <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 group-hover:text-[#E50914] transition-colors duration-500">{project.title}</h3>
        <p className="text-[#B3B3B3] text-xl leading-relaxed mb-10">{project.description}</p>
        
        <div className="flex flex-wrap gap-4 mb-12">
          {project.technologies.map((tech: string) => (
            <span key={tech} className="text-xs font-bold uppercase tracking-widest text-white/40 border border-white/10 px-5 py-2.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-8">
          <a aria-label="Link" href={project.liveUrl} className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-sm hover:text-[#E50914] transition-colors duration-300">
            View Live <ArrowUpRight className="w-5 h-5" />
          </a>
          <a aria-label="Link" href={project.githubUrl} className="flex items-center gap-3 text-[#B3B3B3] font-bold uppercase tracking-widest text-sm hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> Source
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a aria-label="Link" href={href} target="_blank" className="text-[#B3B3B3] hover:text-[#E50914] hover:scale-110 transition-all duration-500">
      {icon}
    </a>
  );
}
