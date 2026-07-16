'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { themes } from '@/core/ThemeRegistry';
import { usePortfolio } from '@/core/PortfolioContext';

const Starfield = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars: { x: number, y: number, radius: number, alpha: number, speed: number }[] = [];
    const shootingStars: { x: number, y: number, length: number, speed: number, opacity: number, active: boolean }[] = [];

    // Create static stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        speed: (Math.random() * 0.02) + 0.005
      });
    }

    // Create shooting stars pool
    for (let i = 0; i < 4; i++) {
      shootingStars.push({ x: 0, y: 0, length: 0, speed: 0, opacity: 0, active: false });
    }

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw static twinkling stars
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha <= 0.1 || star.alpha >= 1) star.speed *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      // Handle shooting stars
      shootingStars.forEach(star => {
        if (star.active) {
          star.x -= star.speed;
          star.y += star.speed;
          star.opacity -= 0.015;

          if (star.opacity <= 0 || star.x < 0 || star.y > height) {
            star.active = false;
          } else {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            // Angle the shooting star to the bottom left
            ctx.lineTo(star.x + star.length, star.y - star.length);
            
            // Create a gradient for the tail
            const gradient = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y - star.length);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        } else {
          // Randomly spawn a shooting star
          if (Math.random() < 0.003) {
            star.active = true;
            // Spawn from top right area
            star.x = (Math.random() * width * 1.5) + width * 0.2;
            star.y = (Math.random() * height * 0.5) - height * 0.2;
            star.length = Math.random() * 100 + 40;
            star.speed = Math.random() * 15 + 10;
            star.opacity = 1;
          }
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen opacity-50" />;
};

// Background Atmosphere Engine
const AtmosphereBackground = ({ activeTheme }: { activeTheme: string | null }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-black transition-colors duration-1000">
      <AnimatePresence mode="wait">
        {/* We map different backgrounds based on the theme slug */}
        {activeTheme === 'macos' && (
           <motion.div key="macos" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent backdrop-blur-3xl" />
        )}
        {activeTheme === 'windows' && (
           <motion.div key="windows" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-black" style={{ background: 'radial-gradient(ellipse at bottom, rgba(0, 120, 212, 0.3) 0%, rgba(20, 20, 60, 0.5) 45%, transparent 80%)' }} />
        )}
        {activeTheme === 'formal' && (
           <motion.div key="formal" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-[#EAE0CC] opacity-60" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />
        )}
        {activeTheme === 'carnival' && (
           <motion.div key="carnival" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-black" style={{ background: 'radial-gradient(circle at bottom, rgba(255,20,147,0.3) 0%, transparent 60%)' }} />
        )}
        {activeTheme === 'netflix' && (
           <motion.div key="netflix" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-black" style={{ background: 'radial-gradient(circle at top, rgba(229,9,20,0.25) 0%, transparent 70%)' }} />
        )}
        {activeTheme === 'spotify' && (
           <motion.div key="spotify" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-[#121212]" style={{ background: 'radial-gradient(circle at top left, rgba(29,185,84,0.3) 0%, transparent 50%)' }} />
        )}
        {/* Generic Fallback */}
        {activeTheme && !['macos', 'windows', 'formal', 'carnival', 'netflix', 'spotify'].includes(activeTheme) && (
           <motion.div key="fallback" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className="absolute inset-0 bg-black" style={{ background: `radial-gradient(circle at center, ${themes[activeTheme]?.accentColor || '#ffffff'}30 0%, transparent 70%)` }} />
        )}
      </AnimatePresence>
      
      {/* Noise overlay for cinematic feel */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-screen pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const { personal, isLoading } = usePortfolio();
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const themeList = Object.values(themes);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let animationId: number;
    let direction = 1;

    const scrollLoop = () => {
      if (!navRef.current) {
        animationId = requestAnimationFrame(scrollLoop);
        return;
      }
      
      if (isAutoScrolling) {
        const el = navRef.current;
        el.scrollTop += 0.3 * direction;
        
        // Ping pong logic
        if (el.scrollTop >= el.scrollHeight - el.clientHeight - 1) {
          direction = -1;
        } else if (el.scrollTop <= 0) {
          direction = 1;
        }
      }
      
      animationId = requestAnimationFrame(scrollLoop);
    };

    animationId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationId);
  }, [isAutoScrolling]);

  useEffect(() => {
    // Check if we just came back from a theme
    const savedTheme = localStorage.getItem('lastPortfolioTheme');
    if (savedTheme && themes[savedTheme]) {
       // Optional: we could highlight the last visited theme
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSelectTheme = (slug: string) => {
    setIsTransitioning(true);
    setHoveredTheme(slug);
    localStorage.setItem('lastPortfolioTheme', slug);
    
    // Play cinematic expansion before routing
    setTimeout(() => {
      router.push(`/themes/${slug}`);
    }, 800);
  };

  if (isLoading || !personal) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 border-t-2 border-white/30 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Calculate parallax offset for the portal based on mouse position
  const parallaxX = typeof window !== 'undefined' ? (mousePos.x / window.innerWidth - 0.5) * 40 : 0;
  const parallaxY = typeof window !== 'undefined' ? (mousePos.y / window.innerHeight - 0.5) * 40 : 0;

  const currentThemeData = hoveredTheme ? themes[hoveredTheme] : null;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-white/30 font-sans">
      
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-6"
          >
            <div className="max-w-md text-center border border-white/10 bg-white/5 p-8 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-light tracking-widest text-white mb-4 uppercase">Welcome</h2>
              <p className="text-white/70 font-light">For the best experience, please use a desktop web browser.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmosphere Background Engine */}
      <AtmosphereBackground activeTheme={hoveredTheme} />
      
      {/* Dynamic Starfield Canvas */}
      <Starfield />

      {/* The Dimension Rift Portal */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          animate={{
            x: parallaxX,
            y: parallaxY,
            scale: isTransitioning ? 25 : (hoveredTheme ? 1.05 : 1),
          }}
          transition={{
            scale: { duration: isTransitioning ? 0.8 : 0.8, ease: isTransitioning ? 'circIn' : 'easeOut' },
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
          }}
          className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-white/5"
        >
          {/* Inner Glow */}
          <motion.div 
            animate={{
              boxShadow: hoveredTheme 
                ? `0 0 100px 20px ${currentThemeData?.accentColor || '#ffffff'}40, inset 0 0 60px 10px ${currentThemeData?.accentColor || '#ffffff'}30` 
                : '0 0 40px 5px rgba(255,255,255,0.05), inset 0 0 20px 2px rgba(255,255,255,0.05)',
              background: isTransitioning ? (currentThemeData?.accentColor || '#ffffff') : 'transparent'
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 rounded-full transition-shadow"
          />
          
          {/* Orb core */}
          <motion.div 
            animate={{
               opacity: hoveredTheme ? (isTransitioning ? 0 : 0.8) : 0.3,
               scale: hoveredTheme ? 0.8 : 0.6,
               backgroundColor: currentThemeData?.accentColor || '#ffffff'
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-1/4 rounded-full blur-[40px] mix-blend-screen"
          />
        </motion.div>
      </div>

      {/* Main UI Layer */}
      <motion.div 
        animate={{ opacity: isTransitioning ? 0 : 1, filter: isTransitioning ? 'blur(10px)' : 'blur(0px)' }}
        transition={{ duration: 0.4 }}
        className="relative z-20 container mx-auto px-6 lg:px-12 h-screen flex flex-col"
      >
        <header className="py-12 flex justify-between items-start pointer-events-none">
          <div>
            <h1 className="text-2xl font-light tracking-[0.2em] uppercase text-white/90">
              {personal.name}
            </h1>
            <p className="text-sm text-white/50 tracking-widest uppercase mt-2">Multiverse Gateway</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-white/30 tracking-widest uppercase mb-1">Status</p>
            <p className="text-sm font-mono text-white/70">Awaiting Dimension Selection</p>
          </div>
        </header>

        {/* Carousel / List */}
        <div className="flex-grow flex flex-col justify-center items-center lg:items-start lg:pl-16 pb-20 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-md text-center lg:text-left px-6 lg:px-0 pointer-events-none"
          >
            <p className="text-base md:text-lg text-white/50 font-light leading-relaxed">
              Trust your intuition and choose whichever reality feels right. There are over <span className="text-white/90 font-medium">{themeList.length} unique dimensions</span> waiting to be explored.
            </p>
          </motion.div>

          <nav 
            ref={navRef}
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            onTouchEnd={() => setIsAutoScrolling(true)}
            className="flex flex-col gap-4 items-center lg:items-start max-h-[50vh] overflow-y-auto pr-8 scrollbar-hide" 
            style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}
          >
            {themeList.map((theme) => {
              const isHovered = hoveredTheme === theme.slug;
              const isDimmed = hoveredTheme && hoveredTheme !== theme.slug;
              
              return (
                <button
                  key={theme.slug}
                  onMouseEnter={() => setHoveredTheme(theme.slug)}
                  onMouseLeave={() => setHoveredTheme(null)}
                  onClick={() => handleSelectTheme(theme.slug)}
                  className="group relative px-2 lg:px-6 py-2 text-left transition-all duration-500 ease-out flex items-center gap-6"
                >
                  <motion.div 
                    animate={{ width: isHovered ? 40 : 0, opacity: isHovered ? 1 : 0 }}
                    className="h-[1px] bg-white hidden lg:block"
                  />
                  <motion.span
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                      color: isHovered ? '#ffffff' : (isDimmed ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.5)'),
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter inline-block origin-left whitespace-nowrap"
                  >
                    {theme.name}
                  </motion.span>
                </button>
              );
            })}
          </nav>
        </div>

        <footer className="py-8 flex justify-between text-xs font-mono text-white/40 uppercase tracking-widest pointer-events-none">
          <p>0x{themeList.length.toString(16).padStart(4, '0')}</p>
          <div className="flex gap-6 items-center">
            <button 
              onClick={(e) => { e.preventDefault(); router.push('/admin'); }}
              className="pointer-events-auto hover:text-white transition-colors cursor-pointer"
            >
              Admin Login
            </button>
            <p className="hidden md:block">Choose your reality</p>
          </div>
        </footer>
      </motion.div>

    </main>
  );
}
