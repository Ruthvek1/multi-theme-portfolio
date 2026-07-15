'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { KeyRound, Unlock, Lock } from 'lucide-react';

export default function LockpickMinigame() {
  const [pins, setPins] = useState([false, false, false, false]);
  const [activePin, setActivePin] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  const handlePick = (index: number) => {
    if (isUnlocked) return;
    
    // Only allow picking the current active pin in sequence
    if (index === activePin) {
      const newPins = [...pins];
      newPins[index] = true;
      setPins(newPins);
      setActivePin(activePin + 1);
      
      if (activePin === 3) {
        setIsUnlocked(true);
        triggerEscapeSequence();
      }
    } else if (index > activePin) {
      // Picked out of order, reset!
      setPins([false, false, false, false]);
      setActivePin(0);
    }
  };

  const triggerEscapeSequence = () => {
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
    }, 4000);
  };

  return (
    <div className="max-w-2xl mx-auto mb-32 border-4 border-white/20 bg-[#061e38] p-8 text-center relative overflow-hidden">
       
       {isFlashing && (
         <div className="absolute inset-0 bg-red-600/50 mix-blend-color-burn animate-pulse z-0"></div>
       )}

       <div className="relative z-10">
          <div className="flex justify-center mb-6">
             {isUnlocked ? (
               <Unlock className="w-16 h-16 text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
             ) : (
               <Lock className="w-16 h-16 text-gray-400" />
             )}
          </div>
          
          <h2 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
             {isUnlocked ? 'ACCESS GRANTED' : 'PICK THE LOCK'}
          </h2>
          <p className="text-cyan-300 font-mono text-sm mb-8 uppercase tracking-widest">
             {isUnlocked ? 'Escape route compromised. Proceed to extraction.' : 'Click the pins in sequence from left to right to breach the mainframe.'}
          </p>

          <div className="flex justify-center gap-4 md:gap-8">
             {pins.map((isPicked, index) => (
                <button aria-label="Interactive Button" key={index}
                   onClick={() => handlePick(index)}
                   disabled={isUnlocked}
                   className={`w-16 h-32 md:w-20 md:h-40 border-4 transition-all duration-300 relative group overflow-hidden
                     ${isPicked 
                        ? 'border-green-400 bg-green-900/30 shadow-[0_0_20px_rgba(74,222,128,0.5)]' 
                        : 'border-gray-500 bg-gray-800 hover:border-cyan-400 hover:bg-gray-700'
                     }
                   `}
                >
                   {/* The tumbler graphic inside */}
                   <div className={`absolute left-0 right-0 bg-gray-400 w-full transition-all duration-500
                      ${isPicked ? 'top-full h-0 opacity-0' : 'top-1/2 -translate-y-1/2 h-1/2'}
                   `}>
                      <div className="w-full h-1 bg-black/40 mt-2"></div>
                      <div className="w-full h-1 bg-black/40 mt-4"></div>
                   </div>
                   
                   {!isPicked && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <KeyRound className="w-6 h-6 text-cyan-300" />
                      </div>
                   )}
                </button>
             ))}
          </div>

          {isUnlocked && (
             <div className="mt-8 animate-in fade-in zoom-in duration-700">
                <div className="bg-red-900/50 border border-red-500 p-4 font-black text-red-400 text-2xl tracking-[0.5em] mb-6 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                   WARNING: ALL CCTV DISABLED
                </div>
                <div className="border-4 border-cyan-500/50 relative overflow-hidden group">
                   <div className="absolute top-0 left-0 bg-cyan-600 text-white font-bold text-xs uppercase px-2 py-1 z-10 shadow-md">
                      Facility Blueprint Secured
                   </div>
                   <Image src="/assets/prison-blueprint.png" alt="Prison Blueprint Map" className="w-full h-auto object-cover opacity-80 mix-blend-screen group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" width={800} height={600} />
                   
                   {/* Scanning line effect over the map */}
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-16 w-full animate-[scan_3s_ease-in-out_infinite]"></div>
                </div>
                <div className="mt-4 bg-green-900/30 border border-green-500/50 p-2 font-mono text-green-300 text-xs">
                   System override successful. Escape route downloaded.
                </div>
             </div>
          )}
       </div>
    </div>
  );
}
