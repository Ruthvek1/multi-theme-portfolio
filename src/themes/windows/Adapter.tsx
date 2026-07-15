'use client';

import Image from 'next/image';
import React, { createContext, useContext, useState } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import NotepadApp from './apps/Notepad';
import FileExplorerApp from './apps/FileExplorer';
import SettingsApp from './apps/Settings';
import TaskManagerApp from './apps/TaskManager';
import EdgeBrowserApp from './apps/EdgeBrowser';
import MailApp from './apps/Mail';
import EducationApp from './apps/Education';
import CertificatesApp from './apps/Certificates';

// Define the available apps
export type AppId = 'notepad' | 'explorer' | 'settings' | 'taskmanager' | 'edge' | 'mail' | 'education' | 'certificates';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface WindowsOSState {
  windows: Record<AppId, WindowState>;
  activeWindowId: AppId | null;
  isStartMenuOpen: boolean;
  toggleStartMenu: () => void;
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  minimizeApp: (id: AppId) => void;
  maximizeApp: (id: AppId) => void;
  focusApp: (id: AppId) => void;
}

const defaultWindowsState: Record<AppId, WindowState> = {
  notepad: { id: 'notepad', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  explorer: { id: 'explorer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  settings: { id: 'settings', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  taskmanager: { id: 'taskmanager', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  edge: { id: 'edge', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  mail: { id: 'mail', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  education: { id: 'education', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
  certificates: { id: 'certificates', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1 },
};

const WindowsContext = createContext<WindowsOSState | null>(null);

export const useWindowsOS = () => {
  const ctx = useContext(WindowsContext);
  if (!ctx) throw new Error('useWindowsOS must be used within WindowsProvider');
  return ctx;
};

export default function WindowsAdapter() {
  const { personal } = usePortfolio();
  
  const [windows, setWindows] = useState<Record<AppId, WindowState>>(defaultWindowsState);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [topZ, setTopZ] = useState(10);

  if (!personal) return null;

  const focusApp = (id: AppId) => {
    setTopZ(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: topZ + 1, isMinimized: false }
    }));
    setActiveWindowId(id);
    setIsStartMenuOpen(false);
  };

  const openApp = (id: AppId) => {
    setTopZ(z => z + 1);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: topZ + 1 }
    }));
    setActiveWindowId(id);
    setIsStartMenuOpen(false);
  };

  const closeApp = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeApp = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeApp = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const toggleStartMenu = () => setIsStartMenuOpen(prev => !prev);

  const contextValue: WindowsOSState = {
    windows,
    activeWindowId,
    isStartMenuOpen,
    toggleStartMenu,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp
  };

  return (
    <WindowsContext.Provider value={contextValue}>
      <div className="w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-blue-500/30">
        {/* The Desktop Background */}
        <div className="absolute inset-0 z-0">
          <Image src="https://wallpapercave.com/wp/wp10224237.jpg" 
            alt="Windows 11 Bloom Wallpaper" 
            className="w-full h-full object-cover opacity-90" width={800} height={600} />
        </div>
        
        {/* Core OS Layers */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <Desktop />
          
          {/* Windows Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Apps wrapper */}
            <div className="w-full h-full relative pointer-events-none overflow-hidden">
              <NotepadApp />
              <FileExplorerApp />
              <SettingsApp />
              <TaskManagerApp />
              <EdgeBrowserApp />
              <MailApp />
              <EducationApp />
              <CertificatesApp />
            </div>
          </div>

          <Taskbar />
        </div>
      </div>
    </WindowsContext.Provider>
  );
}
