'use client';

import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePortfolio } from '@/core/PortfolioContext';
import SmoothScroll from '@/components/shared/SmoothScroll';
import Link from 'next/link';
import DynamicIsland from './components/DynamicIsland';
import { Download, Mail, ExternalLink, Code2, MessageSquare, Briefcase } from 'lucide-react';

export default function AppleAdapter() {
  const { personal, projects, experience, skills, socials, certifications, education } = usePortfolio();
  
  if (!personal) return null;

  return (
    <SmoothScroll>
      {/* 
        We use a transparent wrapper because AmbientBackground is fixed.
        This allows the beautiful moving lights to be seen everywhere.
      */}
      <div className="text-[#f5f5f7] selection:bg-white selection:text-black font-sans w-full overflow-hidden relative">
        <AmbientBackground />
        
        {/* Global Navigation */}
        <nav className="fixed top-0 left-0 w-full h-[44px] bg-[rgba(5,5,7,0.6)] backdrop-blur-md z-50 flex justify-center items-center border-b border-white/5">
          <div className="flex gap-8 text-[12px] font-medium tracking-wide text-[#f5f5f7] opacity-80 max-w-[980px] w-full px-4 justify-between md:justify-center md:gap-12">
            <Link href="/" className="hover:opacity-100 transition-opacity flex items-center justify-center">
              {/* Premium minimalist monoline RK logo */}
              <svg height="44" viewBox="0 0 32 44" width="32" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
                {/* R */}
                <path d="M6 14v16" />
                <path d="M6 14h6a4 4 0 0 1 0 8H6" />
                <path d="M10 22l4 8" />
                {/* K */}
                <path d="M18 14v16" />
                <path d="M26 14l-8 8 8 8" />
              </svg>
            </Link>
            <a aria-label="Link" href="#about" className="hover:opacity-100 transition-opacity hidden md:flex items-center">About</a>
            <a aria-label="Link" href="#projects" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Projects</a>
            <a aria-label="Link" href="#experience" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Experience</a>
            <a aria-label="Link" href="#skills" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Skills</a>
            <a aria-label="Link" href="#education" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Education</a>
            <a aria-label="Link" href="#resume" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Resume</a>
            <a aria-label="Link" href="#contact" className="hover:opacity-100 transition-opacity hidden md:flex items-center">Contact</a>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative h-[100vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
          {/* Stunning Apple-style 3D abstract background image for Hero specifically */}
          <div className="absolute inset-0 z-0 w-full h-full flex items-center justify-center opacity-50 mix-blend-screen">
            <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Abstract background" 
              className="w-full h-full object-cover scale-110" width={800} height={600} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050507]/40 via-transparent to-[#050507]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-transparent to-[#050507]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center z-10"
          >
            <h2 className="text-[#f5f5f7] text-[24px] md:text-[32px] font-semibold tracking-tight mb-2 drop-shadow-md">{personal.title}</h2>
            <h1 className="text-[56px] md:text-[96px] font-bold tracking-tighter leading-none mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
              {personal.name}.
            </h1>
            <p className="text-[21px] md:text-[28px] text-[#86868b] max-w-4xl mx-auto leading-tight font-medium">
              Pro performance. Unbelievable design.
            </p>
            <div className="mt-10 flex gap-6">
              <a aria-label="Link" href="#projects" className="bg-[#f5f5f7] text-black px-6 py-3 rounded-full text-[17px] font-semibold hover:bg-white transition-colors">View Work</a>
              <a aria-label="Link" href="#contact" className="text-[#2997ff] text-[17px] flex items-center hover:underline group font-medium">
                Contact me <span className="group-hover:translate-x-1 transition-transform ml-1">›</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* Bio Section (Sticky scroll effect) */}
        <BioSection bio={personal.bio} />

        {/* Projects Section (Pinning Effect) */}
        <section id="projects" className="w-full py-20 relative bg-black/40 backdrop-blur-[2px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent opacity-50 pointer-events-none" />
          <div className="max-w-[980px] mx-auto px-4 mb-20 text-center relative z-10">
             <h2 className="text-[48px] md:text-[80px] font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
               Mind-blowing features.
             </h2>
          </div>
          <div className="flex flex-col gap-0 relative z-10">
            {projects.map((project, i) => (
              <ProjectShowcase key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="w-full bg-white/[0.02] text-[#f5f5f7] py-40 flex flex-col items-center border-y border-white/5 backdrop-blur-sm">
           <h2 className="text-[48px] md:text-[64px] font-bold tracking-tighter mb-20 text-center">The Timeline.</h2>
           <div className="w-full max-w-[1200px] px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
             {experience.map((exp, i) => (
               <motion.div 
                 key={exp.id}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8, delay: i * 0.2 }}
                 className="flex flex-col items-center text-center p-8 bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 hover:border-white/20 transition-colors"
               >
                 <div className="h-24 flex items-center justify-center mb-6 bg-white/5 rounded-2xl w-full p-4">
                   {exp.logoUrl && <Image src={exp.logoUrl} alt={exp.company} className="max-h-full max-w-full object-contain rounded-xl" width={800} height={600} />}
                 </div>
                 <h3 className="text-[24px] font-semibold mb-2">{exp.role}</h3>
                 <div className="text-[14px] text-[#86868b] mb-4 font-medium">{exp.company} <br/> {exp.startDate} - {exp.endDate}</div>
                 <p className="text-[14px] leading-relaxed mb-6 text-gray-300">{exp.description}</p>
               </motion.div>
             ))}
           </div>
        </section>

        {/* Skills & Resume Section */}
        <section id="skills" className="w-full py-40 flex flex-col items-center bg-black/20">
          <div className="max-w-[1200px] w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Skills */}
            <div>
              <h2 className="text-[40px] font-bold tracking-tighter mb-12 drop-shadow-md">Core Capabilities.</h2>
              <div className="flex flex-col gap-8">
                {skills.map((skillGroup, i) => (
                  <div key={i}>
                    <h3 className="text-[18px] font-semibold text-[#86868b] mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, j) => (
                        <span key={j} className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-[14px] font-medium border border-white/10 hover:border-white/30 transition-colors cursor-default shadow-lg">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Resume */}
            <div id="resume" className="flex flex-col gap-8 justify-start">
              <div className="bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h2 className="text-[32px] font-bold tracking-tighter mb-4 relative z-10 drop-shadow-md">Professional Credentials.</h2>
                <p className="text-[#86868b] mb-8 relative z-10 leading-relaxed font-medium">
                  Download my full curriculum vitae to see detailed work history, education, and certified achievements in software architecture.
                </p>
                <a aria-label="Link" href={personal.resumeUrl} className="inline-flex items-center gap-2 bg-[#f5f5f7] text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Download className="w-4 h-4" /> Download Resume (PDF)
                </a>
              </div>


            </div>

          </div>
        </section>

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <section id="certifications" className="w-full py-40 flex flex-col items-center bg-black/30 backdrop-blur-[4px] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-[1000px] w-full px-6 relative z-10 flex flex-col gap-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
                <div>
                  <h2 className="text-[48px] md:text-[64px] font-bold tracking-tighter leading-none mb-4 drop-shadow-md">Certifications.</h2>
                  <p className="text-[21px] md:text-[24px] text-[#86868b] font-medium">Validated expertise.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {certifications.map((cert: any) => (
                  <div key={cert.id} className="group relative p-8 md:p-10 border border-white/10 bg-[#151516]/50 rounded-[30px] hover:bg-[#1d1d1f]/80 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="text-[14px] md:text-[15px] text-[#2997ff] font-bold uppercase tracking-widest mb-4">{cert.date}</div>
                    <div className="text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-500">{cert.name}</div>
                    <div className="text-[18px] text-[#86868b] font-semibold flex-1">{cert.issuer}</div>
                    
                    <div className="mt-8 flex items-center gap-4 relative z-20">
                      {(cert.url || cert.fileUrl) && (
                        <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" className="flex items-center justify-center flex-1 gap-2 text-[14px] font-bold text-white bg-white/10 px-4 py-3 rounded-full hover:bg-white/20 transition-colors text-center">
                          View Credential
                        </a>
                      )}
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section id="education" className="w-full py-40 flex flex-col items-center bg-black/40 backdrop-blur-[4px] border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-[1000px] w-full px-6 relative z-10 flex flex-col gap-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-center md:text-left">
                <div>
                  <h2 className="text-[48px] md:text-[64px] font-bold tracking-tighter leading-none mb-4 drop-shadow-md">Education.</h2>
                  <p className="text-[21px] md:text-[24px] text-[#86868b] font-medium">The foundation of innovation.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                {education.map((edu: any) => (
                  <div key={edu.id} className="group relative p-8 md:p-12 border border-white/10 bg-[#151516]/50 rounded-[40px] hover:bg-[#1d1d1f]/80 transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-[14px] md:text-[15px] text-[#2997ff] font-bold uppercase tracking-widest mb-4">{edu.startDate} — {edu.endDate}</div>
                    <div className="text-[32px] md:text-[40px] font-bold text-white leading-tight mb-3 tracking-tight group-hover:scale-[1.01] transition-transform duration-500 origin-left">{edu.degree}</div>
                    <div className="text-[20px] md:text-[22px] text-[#86868b] font-semibold mb-6">{edu.institution}</div>
                    <p className="text-[16px] md:text-[18px] text-[#86868b] leading-relaxed font-medium max-w-3xl">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Fun Interactive Section */}
        <section className="w-full py-40 flex flex-col items-center relative z-10 overflow-hidden bg-black/40 backdrop-blur-md border-t border-white/5">
           <h2 className="text-[40px] md:text-[64px] font-bold tracking-tighter mb-6 text-center drop-shadow-md">The magic touch.</h2>
           <p className="text-[21px] text-[#86868b] max-w-2xl mx-auto mb-20 text-center font-medium">Experience the fluid interface of the Dynamic Island.</p>
           
           <DynamicIsland />
        </section>

        {/* Contact & Socials Footer */}
        <section id="contact" className="w-full bg-black/60 backdrop-blur-lg py-24 border-t border-white/10 flex flex-col items-center text-center px-4 relative z-10">
          <h2 className="text-[48px] md:text-[80px] font-bold tracking-tighter mb-6 drop-shadow-lg">Let's connect.</h2>
          <p className="text-[21px] text-[#86868b] max-w-2xl mx-auto mb-12 font-medium">
            Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <a aria-label="Link" href={`mailto:${personal.email}`} className="text-[24px] md:text-[32px] font-bold text-[#2997ff] hover:underline mb-16 drop-shadow">
            {personal.email}
          </a>

          <div className="flex gap-8">
            {socials?.github && (
              <a aria-label="Link" href={socials.github} target="_blank" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {socials?.linkedin && (
              <a aria-label="Link" href={socials.linkedin} target="_blank" className="text-gray-400 hover:text-[#0a66c2] transition-colors">
                <svg className="w-8 h-8 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}

            <a aria-label="Link" href={`mailto:${personal.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="w-8 h-8 drop-shadow-md" />
            </a>
          </div>
          
          <div className="mt-24 text-[12px] text-[#86868b] border-t border-white/10 pt-6 w-full max-w-[980px] flex justify-between font-medium">
            <span>Copyright © {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
            <span>San Francisco, CA</span>
          </div>
        </section>

      </div>
    </SmoothScroll>
  );
}

{/* 
  AmbientBackground Component
  Highly optimized static CSS background. Replaces heavy DOM animations and blur filters 
  which cause GPU lag and flickering on scrolling.
*/}
function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#050507] pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_-10%,rgba(41,151,255,0.12)_0,transparent_40%),radial-gradient(circle_at_90%_110%,rgba(191,72,255,0.1)_0,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(255,20,147,0.05)_0,transparent_50%)]" />
    </div>
  );
}

function BioSection({ bio }: { bio: string }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 1, 1, 0.1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section id="about" ref={targetRef} className="h-[120vh] relative w-full bg-transparent">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.p 
          style={{ opacity, scale }}
          className="text-[32px] md:text-[64px] font-semibold tracking-tighter max-w-[980px] mx-auto px-6 leading-[1.1] text-center text-[#f5f5f7] drop-shadow-2xl"
        >
          {bio}
        </motion.p>
      </div>
    </section>
  );
}

function ProjectShowcase({ project }: { project: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[120vh] w-full">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: imgScale }}
          className="absolute inset-0 w-full h-full flex items-center justify-center -z-10 bg-transparent"
        >
          <Image src={project.thumbnailUrl} alt={project.title} className="w-full h-full object-cover opacity-20 mix-blend-screen" width={800} height={600} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
        </motion.div>
        
        <motion.div 
          style={{ y: textY, opacity: textOpacity }}
          className="text-center z-10 max-w-[980px] px-6"
        >
          <h3 className="text-[48px] md:text-[80px] font-bold tracking-tighter mb-4 leading-none text-white drop-shadow-lg">{project.title}</h3>
          <p className="text-[24px] md:text-[32px] text-white/90 font-semibold mb-6 drop-shadow">{project.subtitle}</p>
          <p className="text-[17px] text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow">{project.description}</p>
          
          <div className="flex justify-center flex-wrap gap-3 mb-10">
             {project.technologies.map((tech: string, i: number) => (
                <span key={i} className="text-[12px] uppercase tracking-widest font-bold text-gray-400 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md bg-black/60 shadow-lg">
                  {tech}
                </span>
             ))}
          </div>

          <div className="flex justify-center gap-6">
            {project.liveUrl && (
              <a aria-label="Link" href={project.liveUrl} className="flex items-center gap-2 bg-[#f5f5f7] text-black px-6 py-3 rounded-full text-[17px] font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <ExternalLink className="w-5 h-5" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a aria-label="Link" href={project.githubUrl} className="text-[#2997ff] text-[17px] flex items-center font-bold hover:underline group bg-black/60 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
                <Code2 className="w-5 h-5 mr-2" /> Source Code <span className="group-hover:translate-x-1 transition-transform ml-1">›</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InteractiveTiltCard() {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    setRotateX(yPct * -30);
    setRotateY(xPct * 30);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div 
      className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-[40px] bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl flex items-center justify-center cursor-pointer relative"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="text-center pointer-events-none relative z-10">
         <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mx-auto mb-8 shadow-[0_0_40px_rgba(168,85,247,0.5)]" />
         <h3 className="text-2xl font-bold text-white mb-2">Hover Me</h3>
         <p className="text-gray-400 font-medium">3D Spatial UI</p>
      </div>
    </motion.div>
  );
}
