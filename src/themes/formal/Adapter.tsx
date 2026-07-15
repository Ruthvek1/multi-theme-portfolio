'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleCanvas from './components/ParticleCanvas';
import { usePortfolio } from '@/core/PortfolioContext';

// Alphabets
const chinaAlphabet = '天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩一体率宾归王鸣凤在竹白驹食场化被草木赖及万方'.split('');
const japanAlphabet = 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす天水地風火木日月光星雲雨雪雷海川山谷岩砂土石金銀銅鉄春夏秋冬花鳥風月草木鳥獣魚虫東西南北上下左右前後内外遠近高低大小長短広狭深浅多少軽重明暗白黒赤青黄緑紫茶色形音匂味触'.split('');
const kazakhAlphabet = 'АӘБВГҒДЕЁЖЗІИЙКҚЛМНҢОӨПРСТУҰҮФХҺЦЧШЩЪЫІЬЭЮЯаәбвгғдеёжзіийкқлмнңоөпрстуұүфхһцчшщъыіьэюя'.split('');

// Section Component with isolated scroll and IntersectionObserver
function SectionContent({ section, data }: { section: any, data: any }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroInView(entry.isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const { personal, projects, skills, certifications, education, socials } = data;

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar relative pointer-events-auto">
      {/* Hero Block - 100vh */}
      <div ref={heroRef} className="relative w-full h-screen min-h-screen flex flex-col justify-center shrink-0">
        {/* Ambient Particle Engine */}
        <div className="absolute inset-0 z-10">
          <ParticleCanvas 
            alphabet={section.curtainAlphabet} 
            roofImageSrc={section.roofImage} 
            isActive={isHeroInView}
            soundProfile={section.soundProfile}
            imageOffsetY={section.imageOffsetY}
            curtainOffsetY={section.curtainOffsetY}
          />
        </div>

        {/* Text Content Layer */}
        <div className="absolute inset-0 z-30 pointer-events-none max-w-[1600px] mx-auto w-full">
          {/* Left Column Text */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="absolute left-8 lg:left-16 xl:left-24 top-[35%] w-[35%] max-w-[400px] pointer-events-auto mix-blend-multiply"
          >
            <p className="font-space-mono text-xs text-[#8C8172] mb-3">
              {section.nativeLabel}
            </p>
            <h1 className="font-fraunces text-3xl lg:text-5xl leading-[1.1] text-[#2B2118] mb-4">
              {section.country} <span className="inline-block w-6 h-[2px] bg-[#C9BCA2] align-middle mx-1"></span>
              <br />
              <span className="text-2xl lg:text-4xl text-[#3A2A22]">
                {section.headline.split('—')[1]?.trim() || section.headline}
              </span>
            </h1>
          </motion.div>

          {/* Bottom Right Caption */}
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
            className="absolute right-8 lg:right-16 xl:right-24 bottom-[15%] w-[25%] max-w-[280px] pointer-events-auto mix-blend-multiply flex flex-col items-end"
          >
            <p className="font-space-mono text-xs text-[#3A2A22] text-right leading-relaxed font-medium">
              {section.caption}
            </p>
            
            {/* Scroll Down Animation */}
            {section.id !== 'home' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex flex-col items-center mt-8 mr-2 drop-shadow-[0_0_15px_rgba(192,82,74,1)]"
              >
                <span className="font-space-mono text-[9px] text-[#C0524A] uppercase tracking-widest mb-2 font-bold">Scroll Down</span>
                <motion.div 
                  animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-[2px] h-12 bg-gradient-to-b from-[#C0524A] to-transparent rounded-full shadow-[0_0_10px_rgba(192,82,74,1)]"
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Detail Content Block - Below Fold */}
      {section.id !== 'home' && (
        <div className="w-full bg-[#EAE0CC] relative z-40 px-8 lg:px-24 py-24 border-t border-[#C9BCA2]/30">
          
          {section.id === 'about' && (
            <div className="max-w-3xl mx-auto">
              <h2 className="font-fraunces text-3xl text-[#2B2118] mb-8">The Full Story</h2>
              <div className="font-space-mono text-[#5A4F41] leading-relaxed space-y-6">
                <p>{personal?.bio}</p>
                <p>My journey has been defined by a constant pursuit of bridging the gap between rigorous engineering and expressive design. I believe that digital experiences should feel as tactile and permanent as architecture.</p>
              </div>
            </div>
          )}

          {section.id === 'projects' && projects && (
            <div className="max-w-6xl mx-auto">
              <h2 className="font-fraunces text-3xl text-[#2B2118] mb-12 border-b border-[#C9BCA2]/50 pb-4">Selected Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((proj: any, idx: number) => (
                  <div key={idx} className="group">
                    <div className="w-full aspect-[4/3] bg-[#D4CBB6] overflow-hidden rounded-sm mb-6 relative">
                      {proj.thumbnailUrl && (
                        <img src={proj.thumbnailUrl} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-80" />
                      )}
                    </div>
                    <h3 className="font-fraunces text-2xl text-[#2B2118] mb-2">{proj.title}</h3>
                    <p className="font-space-mono text-sm text-[#8C8172] mb-4 h-16 line-clamp-3">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.technologies?.map((tech: string) => (
                        <span key={tech} className="font-space-mono text-[10px] uppercase tracking-wider px-2 py-1 bg-[#D4CBB6]/50 text-[#5A4F41] rounded-sm">{tech}</span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="bg-[#3A2A22] text-[#EAE0CC] font-fraunces px-5 py-2 hover:bg-[#C0524A] transition-colors text-sm rounded-sm">
                          Live Demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="border border-[#3A2A22] text-[#3A2A22] font-fraunces px-5 py-2 hover:bg-[#C0524A] hover:text-[#EAE0CC] hover:border-[#C0524A] transition-colors text-sm rounded-sm">
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.id === 'skills' && skills && (
            <div className="max-w-4xl mx-auto">
              <h2 className="font-fraunces text-3xl text-[#2B2118] mb-12 border-b border-[#C9BCA2]/50 pb-4">Technical Proficiency</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {skills.map((skillGroup: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="font-space-mono uppercase tracking-widest text-sm text-[#C0524A] mb-6">{skillGroup.category}</h3>
                    <ul className="space-y-4">
                      {skillGroup.items?.map((skill: string, i: number) => (
                        <li key={i} className="flex justify-between items-center border-b border-[#D4CBB6]/50 pb-2 group">
                          <span className="font-fraunces text-lg text-[#2B2118] group-hover:text-[#C0524A] transition-colors">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.id === 'certifications' && certifications && (
            <div className="max-w-6xl mx-auto w-full">
              <h2 className="font-fraunces text-3xl text-[#2B2118] mb-12 border-b border-[#C9BCA2]/50 pb-4">Credentials</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {certifications.map((cert: any, idx: number) => (
                  <div key={idx} className="flex flex-col bg-[#D4CBB6]/30 border border-[#C9BCA2]/40 p-6 rounded-sm group hover:border-[#C0524A]/50 transition-colors h-full">
                    <div className="flex-1">
                      <h3 className="font-fraunces text-lg text-[#2B2118] mb-2 leading-snug">{cert.title || cert.name}</h3>
                      <p className="font-space-mono text-xs text-[#C0524A] mb-1">{cert.issuer}</p>
                      <p className="font-space-mono text-xs text-[#8C8172] mb-6">{cert.date}</p>
                    </div>
                    
                    {(cert.url || cert.fileUrl) && (
                      <a href={cert.url || cert.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-auto self-start bg-transparent border border-[#3A2A22]/30 text-[#3A2A22] font-fraunces px-4 py-1.5 hover:bg-[#C0524A] hover:text-[#EAE0CC] hover:border-[#C0524A] transition-all text-xs rounded-sm">
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.id === 'education' && education && (
            <div className="max-w-4xl mx-auto">
              <h2 className="font-fraunces text-3xl text-[#2B2118] mb-12 border-b border-[#C9BCA2]/50 pb-4">Academic Background</h2>
              <div className="space-y-12">
                {education.map((edu: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="font-fraunces text-2xl text-[#2B2118]">{edu.degree}</h3>
                    <p className="font-space-mono text-sm text-[#C0524A] mt-2 mb-4">{edu.institution} <span className="text-[#8C8172]">({edu.startDate} — {edu.endDate})</span></p>
                    <p className="font-space-mono text-[#5A4F41] leading-relaxed max-w-2xl">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section.id === 'contact' && (
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-fraunces text-4xl text-[#2B2118] mb-6">Let's Connect</h2>
              <p className="font-space-mono text-[#5A4F41] mb-12">I'm currently open to new opportunities and collaborations.</p>
              
              <div className="flex flex-col items-center space-y-4 mb-12">
                <a href={`mailto:${personal?.email}`} className="font-fraunces text-3xl text-[#3A2A22] hover:text-[#C0524A] transition-colors border-b border-transparent hover:border-[#C0524A] pb-1">
                  {personal?.email}
                </a>
                {personal?.phone && (
                  <a href={`tel:${personal?.phone}`} className="font-space-mono text-lg text-[#8C8172] hover:text-[#C0524A] transition-colors">
                    {personal?.phone}
                  </a>
                )}
              </div>

              <a href={`mailto:${personal?.email}`} className="inline-block bg-[#3A2A22] text-[#EAE0CC] font-fraunces px-8 py-4 text-xl hover:bg-[#C0524A] transition-colors rounded-sm shadow-md mb-16">
                Say Hello
              </a>
              <div className="flex justify-center space-x-8 border-t border-[#C9BCA2]/50 pt-12">
                {socials && Object.entries(socials).map(([key, url]) => (
                  <a key={key} href={url as string} target="_blank" rel="noopener noreferrer" className="font-space-mono uppercase tracking-widest text-sm text-[#3A2A22] hover:text-[#C0524A] transition-colors">
                    {key}
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default function BudarinaAdapter() {
  const data = usePortfolio();
  const { personal } = data;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const sections = [
    {
      id: 'home',
      country: 'Home',
      nativeLabel: '起点 (Qǐdiǎn) The origin',
      headline: `Home — ${personal?.title?.toLowerCase() || 'creative developer'}, building experiences that refuse gravity`,
      caption: personal?.bio || 'Wander forbidden gardens, painted eaves, and stories older than the maps that tried to hold them.',
      curtainAlphabet: chinaAlphabet,
      roofImage: '/images/formal/chinese_roof_transparent.png',
      iconImage: '/images/formal/chinese_roof_transparent.png',
      soundProfile: 'bell'
    },
    {
      id: 'about',
      country: 'About',
      nativeLabel: '魂 (Tamashii) The spirit',
      headline: 'About — crafting digital realms where logic meets intuition',
      caption: 'Pass under vermilion gates, cedar shade, and rooms where silence is part of the design.',
      curtainAlphabet: japanAlphabet,
      roofImage: '/images/formal/japanese_roof_transparent.png',
      iconImage: '/images/formal/japanese_roof_transparent.png',
      soundProfile: 'wood'
    },
    {
      id: 'skills',
      country: 'Skills',
      nativeLabel: '技 (Waza) The technique',
      headline: 'Skills — the tools that shape the intangible into architecture',
      caption: 'The languages, frameworks, and instruments I use to build robust digital experiences.',
      curtainAlphabet: japanAlphabet,
      roofImage: '/images/formal/skills_gate_transparent.png',
      iconImage: '/images/formal/skills_gate_transparent.png',
      soundProfile: 'gong',
      imageOffsetY: 'mt-[4vh]',
      curtainOffsetY: 30
    },
    {
      id: 'projects',
      country: 'Projects',
      nativeLabel: 'Жол (Jol) The open road',
      headline: 'Projects — steppe wind, shanyrak light, and creations that move with you',
      caption: 'A curated selection of featured technical work, bridging engineering with interactive art.',
      curtainAlphabet: kazakhAlphabet,
      roofImage: '/images/formal/projects_temple_transparent.png',
      iconImage: '/images/formal/projects_temple_transparent.png',
      soundProfile: 'glass'
    },
    {
      id: 'certifications',
      country: 'Certifications',
      nativeLabel: 'Душа (Dusha) The soul',
      headline: 'Certifications — painted domes and proven knowledge',
      caption: 'Professional achievements, continuous learning, and formalized technical knowledge.',
      curtainAlphabet: kazakhAlphabet,
      roofImage: '/images/formal/certifications_dome_transparent.png',
      iconImage: '/images/formal/certifications_dome_transparent.png',
      soundProfile: 'bamboo'
    },
    {
      id: 'education',
      country: 'Education',
      nativeLabel: 'Duyên (Duyên) A fated connection',
      headline: 'Education — emerald waters, lantern light, and rivers of knowledge',
      caption: 'Academic journey, university degrees, and the foundation of my engineering background.',
      curtainAlphabet: chinaAlphabet,
      roofImage: '/images/formal/education_pavilion_transparent.png',
      iconImage: '/images/formal/education_pavilion_transparent.png',
      soundProfile: 'harp'
    },
    {
      id: 'contact',
      country: 'Contact',
      nativeLabel: '縁 (En) The bond',
      headline: 'Contact — red eaves in the mist and paths that converge',
      caption: `Reach out at ${personal?.email} or connect across the digital ether.`,
      curtainAlphabet: japanAlphabet,
      roofImage: '/images/formal/contact_lantern_transparent.png',
      iconImage: '/images/formal/contact_lantern_transparent.png',
      soundProfile: 'bell'
    }
  ];

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const currentSection = sections[currentIndex];
  const progress = (currentIndex / (sections.length - 1)) * 100;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    })
  };

  return (
    <div className="relative w-full h-screen bg-[#EAE0CC] text-[#2B2118] selection:bg-[#C0524A] selection:text-[#EAE0CC] overflow-hidden">
      {/* Global CSS Texture Overlay */}
      <div 
        className="fixed inset-0 z-[100] pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 pointer-events-none">
        <div 
          className="font-fraunces text-xl font-medium tracking-wide pointer-events-auto cursor-pointer hover:text-[#C0524A] transition-colors"
          onClick={() => {
            if (currentIndex !== 0) {
              setDirection(-1);
              setCurrentIndex(0);
            }
          }}
        >
          {personal?.name || 'Portfolio'}
        </div>
        
        {/* Top Navigation Bar */}
        <nav className="hidden lg:flex items-center space-x-8 pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-[#EAE0CC]/80 backdrop-blur-md px-8 py-3 rounded-full border border-[#8C8172]/20 shadow-sm">
          {sections.map((sec, idx) => (
            <button 
              key={sec.id}
              onClick={() => {
                if (idx === currentIndex) return;
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`font-space-mono text-[10px] uppercase tracking-widest transition-colors ${
                idx === currentIndex 
                  ? 'text-[#C0524A] font-bold' 
                  : 'text-[#8C8172] hover:text-[#2B2118]'
              }`}
            >
              {sec.country}
            </button>
          ))}
        </nav>

        <a 
          href={personal?.resumeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-[#3A2A22] text-white font-fraunces px-6 py-2 rounded-sm hover:bg-[#C0524A] transition-colors shadow-sm pointer-events-auto text-sm"
        >
          Download Resume
        </a>
      </header>

      {/* Main Viewport */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <SectionContent section={currentSection} data={data} />
        </motion.div>
      </AnimatePresence>

      {/* Left Navigation Card */}
      {currentIndex > 0 && (
        <button 
          onClick={handlePrev}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center group pointer-events-auto bg-[#EAE0CC]/80 backdrop-blur-sm border-r border-t border-b border-[#8C8172]/20 py-6 px-4 rounded-r-md shadow-md hover:bg-[#EAE0CC] transition-all duration-300 hover:pl-6"
        >
          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
            <img src={sections[currentIndex - 1].iconImage} alt="Prev" className="w-10 h-10 object-contain drop-shadow-sm" />
          </div>
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-all duration-300 w-0 group-hover:w-20 overflow-hidden hidden md:block">
            <p className="font-space-mono text-[9px] uppercase tracking-widest text-[#C0524A] text-left whitespace-nowrap">Previous</p>
            <p className="font-fraunces text-sm text-[#2B2118] text-left mt-1 whitespace-nowrap">{sections[currentIndex - 1].country}</p>
          </div>
        </button>
      )}

      {/* Right Navigation Card */}
      {currentIndex < sections.length - 1 && (
        <button 
          onClick={handleNext}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center group pointer-events-auto bg-[#EAE0CC]/90 backdrop-blur-sm border-l border-t border-b border-[#C0524A] py-6 px-4 rounded-l-md shadow-[0_0_40px_rgba(192,82,74,1)] animate-pulse hover:animate-none hover:shadow-[0_0_60px_rgba(192,82,74,1)] hover:bg-[#EAE0CC] transition-all duration-300 hover:pr-6"
        >
          <div className="mr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 w-0 group-hover:w-20 overflow-hidden hidden md:block text-right">
            <p className="font-space-mono text-[9px] uppercase tracking-widest text-[#C0524A] whitespace-nowrap">Next</p>
            <p className="font-fraunces text-sm text-[#2B2118] mt-1 whitespace-nowrap">{sections[currentIndex + 1].country}</p>
          </div>
          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
            <img src={sections[currentIndex + 1].iconImage} alt="Next" className="w-10 h-10 object-contain drop-shadow-sm" />
          </div>
        </button>
      )}

      {/* Footer Scrubber */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-32 h-[3px] bg-[#C9BCA2]/30 rounded-full overflow-hidden pointer-events-none">
        <motion.div 
          className="h-full bg-[#8C8172]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
