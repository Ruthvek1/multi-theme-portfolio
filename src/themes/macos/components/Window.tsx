import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMacOS, MacAppId } from '../Adapter';

interface WindowProps {
  id: MacAppId;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  minWidth?: number;
  minHeight?: number;
}

export default function Window({
  id,
  title,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  minWidth = 400,
  minHeight = 300,
}: WindowProps) {
  const { windows, closeApp, minimizeApp, maximizeApp, focusApp, activeApp } = useMacOS();
  const state = windows[id];
  const isActive = activeApp === id;

  const dragConstraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Prevent rendering if not open
  if (!state.isOpen) return null;

  return (
    <AnimatePresence>
      {!state.isMinimized && (
        <motion.div
          key={id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            width: state.isMaximized ? '100vw' : defaultWidth,
            height: state.isMaximized ? 'calc(100vh - 28px - 80px)' : defaultHeight, // Subtract MenuBar and Dock roughly
            top: state.isMaximized ? 28 : undefined, // Start below MenuBar
            left: state.isMaximized ? 0 : undefined,
          }}
          exit={{ opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.15 } }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          style={{ zIndex: state.zIndex }}
          className={`absolute rounded-xl overflow-hidden shadow-2xl flex flex-col bg-white/95 backdrop-blur-3xl border border-black/10 ${
            state.isMaximized ? 'rounded-none border-none' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          }`}
          onMouseDown={() => focusApp(id)}
          drag={!state.isMaximized}
          dragMomentum={false}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          dragElastic={0}
        >
          {/* Title Bar */}
          <div 
            className={`h-12 w-full flex items-center justify-between px-4 shrink-0 transition-colors ${isActive ? 'bg-gradient-to-b from-gray-100 to-gray-200/50' : 'bg-gray-100/80'} border-b border-black/5`}
            onDoubleClick={() => maximizeApp(id)}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {/* Traffic Lights */}
            <div className="flex gap-2 items-center group relative z-50">
              <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); closeApp(id); }}
                className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center overflow-hidden"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/60 text-[8px] font-bold">✕</span>
              </button>
              <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
                className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center overflow-hidden"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/60 text-[8px] font-bold">−</span>
              </button>
              <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
                className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center overflow-hidden"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/60 text-[8px] font-bold">⤢</span>
              </button>
            </div>
            
            {/* Title */}
            <div className={`absolute left-0 right-0 text-center pointer-events-none font-semibold text-sm ${isActive ? 'text-black/80' : 'text-black/50'}`}>
              {title}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full relative overflow-hidden bg-white" onMouseDown={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
