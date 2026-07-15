import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowsOS, AppId } from '../Adapter';
import { Minus, Square, X } from 'lucide-react';

interface WindowProps {
  id: AppId;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
}

export default function Window({ id, title, icon, children, defaultWidth = 800, defaultHeight = 600 }: WindowProps) {
  const { windows, activeWindowId, focusApp, closeApp, minimizeApp, maximizeApp } = useWindowsOS();
  const windowState = windows[id];
  const constraintsRef = useRef(null); // In a real app, this would reference a desktop boundary

  if (!windowState.isOpen) return null;

  const isActive = activeWindowId === id;

  // Render minimized windows as display: none or completely unmounted?
  // Let's use AnimatePresence and unmount if minimized for simplicity, but that loses state.
  // We'll keep them mounted but hidden/scaled down if minimized.
  if (windowState.isMinimized) {
    return null; // The taskbar icon handles unminimizing.
  }

  const isMaximized = windowState.isMaximized;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.9, x: 100, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        width: isMaximized ? '100vw' : defaultWidth,
        height: isMaximized ? 'calc(100vh - 48px)' : defaultHeight, // 48px is taskbar height
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      onPointerDown={() => focusApp(id)}
      style={{
        position: 'absolute',
        zIndex: windowState.zIndex,
        top: isMaximized ? 0 : 'auto',
        left: isMaximized ? 0 : 'auto',
      }}
      className={`
        pointer-events-auto bg-[#202020] border rounded-xl overflow-hidden shadow-2xl flex flex-col
        ${isActive ? 'border-blue-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.3)]'}
        ${isMaximized ? 'rounded-none border-none' : ''}
      `}
    >
      {/* Title Bar */}
      <div 
        className="h-10 bg-[#2b2b2b] flex justify-between items-center select-none"
        // Prevent drag events on the content from bubbling, we only want drag on the window, framer-motion handles it via the motion.div drag prop. 
        // We'll add a 'drag-handle' class if we want to restrict dragging just to title bar later.
      >
        <div className="flex items-center gap-3 px-4 text-sm font-medium text-gray-200">
          <div className="w-4 h-4 scale-75">{icon}</div>
          {title}
        </div>
        
        <div className="flex h-full">
          <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); minimizeApp(id); }}
            className="w-12 h-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Minus className="w-4 h-4 text-gray-400" />
          </button>
          <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); maximizeApp(id); }}
            className="w-12 h-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Square className="w-3 h-3 text-gray-400" />
          </button>
          <button aria-label="Interactive Button" onClick={(e) => { e.stopPropagation(); closeApp(id); }}
            className="w-12 h-full hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden relative bg-[#181818]">
        {children}
      </div>
    </motion.div>
  );
}
