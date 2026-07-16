'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { themes } from '@/core/ThemeRegistry';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Skip transitions when going back to the main menu or admin console
  if (pathname === '/' || pathname.startsWith('/admin')) {
      return <>{children}</>;
  }

  // Extract theme or page name from URL
  const pathParts = pathname.split('/');
  const themeSlug = pathParts[1] === 'themes' ? pathParts[2] : null;
  const themeName = themeSlug && themes[themeSlug] ? themes[themeSlug].name : null;

  // The shutter variants for the top and bottom panels
  const topPanelVariants = {
    initial: { top: '0%' },
    animate: { 
      top: '-50%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 1.5 } 
    },
    exit: { 
      top: '0%',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } 
    }
  };

  const bottomPanelVariants = {
    initial: { bottom: '0%' },
    animate: { 
      bottom: '-50%',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 1.5 } 
    },
    exit: { 
      bottom: '0%',
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="w-full h-full min-h-screen">
        
        {/* Top Shutter Panel (Only animates on exit) */}
        <motion.div 
            className="fixed left-0 right-0 h-[50vh] bg-black z-[100] flex items-end justify-center pointer-events-none shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={topPanelVariants}
        />

        {/* Bottom Shutter Panel */}
        <motion.div 
            className="fixed left-0 right-0 h-[50vh] bg-black z-[100] flex items-start justify-center pointer-events-none shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={bottomPanelVariants}
        />



        {/* Loading Text Overlay */}
        <motion.div
            className="fixed inset-0 z-[105] pointer-events-none flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ 
                opacity: 0,
                transition: { duration: 0.4, delay: 1.5, ease: "easeInOut" }
            }}
            exit={{ 
                opacity: 1,
                transition: { duration: 0.4, ease: "easeInOut" }
            }}
        >
           {themeName && (
             <div className="text-center">
               <h2 className="text-white text-4xl font-bold tracking-tighter">Initializing {themeName}</h2>
               <div className="w-64 h-1 bg-white/20 mt-8 rounded overflow-hidden mx-auto">
                 <motion.div 
                   className="h-full bg-white"
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                 />
               </div>
             </div>
           )}
        </motion.div>

        {/* The actual page content */}
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="w-full h-full"
        >
          {children}
        </motion.div>

      </motion.div>
    </AnimatePresence>
  );
}
