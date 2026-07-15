import React, { useState, useEffect } from 'react';
import { AlertOctagon, ShieldAlert, Skull } from 'lucide-react';

export default function SelfDestruct() {
  const [armed, setArmed] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Trigger "Reboot"
      setTimeout(() => {
        setCountdown(null);
        setArmed(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const initiateDestruct = () => {
    if (!armed) return;
    setCountdown(10);
  };

  // Full screen overlay when countdown is active
  if (countdown !== null) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center font-mono pointer-events-auto">
        <div className={`absolute inset-0 bg-red-600 ${countdown > 0 ? 'animate-pulse opacity-20' : 'opacity-0'}`}></div>
        
        {countdown > 0 ? (
           <div className="relative z-10 flex flex-col items-center animate-[shake_0.5s_infinite]">
              <AlertOctagon className="w-32 h-32 text-red-600 mb-8" />
              <h1 className="text-6xl md:text-9xl font-black text-red-600 tracking-widest">{countdown}</h1>
              <h2 className="text-xl md:text-3xl text-red-600 mt-8 tracking-[0.5em] font-bold text-center">SELF-DESTRUCT SEQUENCE INITIATED</h2>
              <p className="text-gray-400 mt-4 tracking-widest">CRITICAL DATABASE PURGE IMMINENT</p>
           </div>
        ) : (
           <div className="relative z-10 flex flex-col items-center">
              <Skull className="w-32 h-32 text-white mb-8" />
              <h1 className="text-4xl font-black text-white tracking-widest text-center">DATABASE PURGED</h1>
              <p className="text-gray-500 mt-4 tracking-widest animate-pulse">REBOOTING SYSTEM...</p>
           </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
        `}} />
      </div>
    );
  }

  return (
    <div className="bg-[#111] border border-red-600/30 p-6 mt-8 flex flex-col items-center justify-center text-center">
       <div className="mb-4 text-red-600/50">
          <ShieldAlert className="w-8 h-8 mx-auto mb-2" />
          <h2 className="text-xs font-bold tracking-[0.3em] uppercase">Emergency Protocol 0-0-0</h2>
       </div>

       <div className="flex flex-col items-center gap-4 bg-black p-8 border-2 border-dashed border-gray-800 rounded-lg">
          <button aria-label="Interactive Button" onClick={() => setArmed(!armed)}
             className={`px-4 py-2 text-xs font-bold tracking-widest transition-colors border ${
                armed ? 'bg-yellow-500 text-black border-yellow-500' : 'text-gray-500 border-gray-700 hover:text-white hover:border-gray-500'
             }`}
          >
             {armed ? 'SAFETY COVER LIFTED' : 'LIFT SAFETY COVER'}
          </button>

          <button aria-label="Interactive Button" onClick={initiateDestruct}
             disabled={!armed}
             className={`w-32 h-32 rounded-full border-4 shadow-2xl transition-all duration-300 flex items-center justify-center font-black tracking-widest text-lg ${
                armed 
                  ? 'bg-red-600 border-red-800 text-black hover:bg-red-500 hover:scale-95 cursor-pointer shadow-[0_0_50px_#dc2626]' 
                  : 'bg-red-950 border-red-900/50 text-red-900 cursor-not-allowed'
             }`}
          >
             PURGE
          </button>
       </div>
    </div>
  );
}
