import React from 'react';
import { useJarvis } from '../Adapter';

export default function HUDOverlay() {
  const { activeView } = useJarvis();

  return (
    <div className="w-full h-full pointer-events-none absolute inset-0 overflow-hidden">
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-40 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />

      {/* Corner Brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00f0ff]/50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00f0ff]/50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00f0ff]/50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00f0ff]/50" />

      {/* Top Status Bar */}
      <div className="absolute top-4 left-0 w-full flex justify-between px-12 text-[10px] text-[#00f0ff]/60 tracking-widest font-bold">
        <div className="flex gap-4">
           <span>SYS.OP. 42.1</span>
           <span>SEC.L 09</span>
           <span className="text-[#ffaa00] animate-pulse">REC</span>
        </div>
        <div className="flex gap-4">
           <span>{new Date().toISOString().split('T')[0]}</span>
           <span>{activeView.toUpperCase()} MODULE</span>
        </div>
      </div>

      {/* Crosshairs (Center) */}
      {activeView === 'dashboard' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00f0ff]/10 rounded-full flex items-center justify-center">
           <div className="absolute w-[1px] h-[10px] bg-[#00f0ff]/50 top-0" />
           <div className="absolute w-[1px] h-[10px] bg-[#00f0ff]/50 bottom-0" />
           <div className="absolute w-[10px] h-[1px] bg-[#00f0ff]/50 left-0" />
           <div className="absolute w-[10px] h-[1px] bg-[#00f0ff]/50 right-0" />
        </div>
      )}

      {/* Scanning Laser */}
      <div className="absolute left-0 top-0 w-full h-[2px] bg-[#00f0ff]/30 blur-[2px] animate-[scan_8s_ease-in-out_infinite]" />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          50% { transform: translateY(100vh); }
          100% { transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
