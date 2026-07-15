import React, { useState, useEffect, useRef } from 'react';
import { Timer, Zap } from 'lucide-react';

type GameState = 'idle' | 'ready' | 'starting' | 'waiting' | 'go' | 'jumpStart' | 'finished';

export default function ReactionTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [lightsOn, setLightsOn] = useState(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startSequence = () => {
    setGameState('starting');
    setLightsOn(0);
    setReactionTime(null);
    
    // Light up one by one every 1 second
    let currentLight = 0;
    const interval = setInterval(() => {
      currentLight++;
      setLightsOn(currentLight);
      
      if (currentLight === 5) {
        clearInterval(interval);
        setGameState('waiting');
        
        // Random time between 1 and 3 seconds before lights out
        const holdTime = Math.random() * 2000 + 1000;
        timeoutRef.current = setTimeout(() => {
          setLightsOn(0);
          setGameState('go');
          startTimeRef.current = performance.now();
        }, holdTime);
      }
    }, 1000);
    
    timeoutRef.current = interval as any;
  };

  const handleClick = () => {
    if (gameState === 'idle' || gameState === 'finished' || gameState === 'jumpStart') {
      startSequence();
    } else if (gameState === 'starting' || gameState === 'waiting') {
      // Jump start!
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('jumpStart');
    } else if (gameState === 'go') {
      // Good reaction!
      const time = performance.now() - startTimeRef.current;
      setReactionTime(time);
      setGameState('finished');
    }
  };

  return (
    <div className="bg-[#111] border border-[#ff1801]/30 p-6 shadow-lg relative overflow-hidden group">
       <div className="flex items-center gap-3 mb-6 border-b border-[#ff1801]/20 pb-4">
          <Timer className="w-6 h-6 text-[#ff1801]" />
          <h2 className="text-xl font-black tracking-widest text-white italic">REACTION TELEMETRY</h2>
       </div>

       <div 
          onClick={handleClick}
          className="bg-[#0a0a0a] border-2 border-dashed border-gray-800 p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#ff1801]/50 transition-colors min-h-[300px]"
       >
          
          {/* Starting Grid Lights */}
          <div className="flex gap-4 mb-12 bg-black p-4 rounded-xl border border-gray-800">
             {[1, 2, 3, 4, 5].map(num => (
                <div key={num} className="flex flex-col gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-900 border-2 border-gray-700"></div>
                   <div className={`w-8 h-8 rounded-full border-2 transition-colors duration-150 ${
                      lightsOn >= num ? 'bg-red-600 border-red-400 shadow-[0_0_20px_#dc2626]' : 'bg-gray-900 border-gray-700'
                   }`}></div>
                </div>
             ))}
          </div>

          <div className="text-center h-24 flex flex-col justify-center">
             {gameState === 'idle' && (
                <div className="text-gray-400 font-bold uppercase tracking-widest animate-pulse">
                   CLICK TO START SEQUENCE
                </div>
             )}
             
             {gameState === 'starting' && (
                <div className="text-red-500 font-bold uppercase tracking-widest">
                   LIGHTS ON...
                </div>
             )}

             {gameState === 'waiting' && (
                <div className="text-red-500 font-black uppercase tracking-[0.2em] text-xl">
                   HOLD...
                </div>
             )}

             {gameState === 'jumpStart' && (
                <div>
                   <div className="text-yellow-500 font-black uppercase tracking-widest text-2xl mb-2">
                      JUMP START!
                   </div>
                   <div className="text-gray-500 text-xs">CLICK TO TRY AGAIN</div>
                </div>
             )}

             {gameState === 'go' && (
                <div className="text-green-500 font-black uppercase tracking-[0.5em] text-4xl">
                   GO!
                </div>
             )}

             {gameState === 'finished' && reactionTime && (
                <div>
                   <div className="text-white font-black text-4xl italic flex items-center justify-center gap-2 mb-2">
                      <Zap className="w-8 h-8 text-[#ff1801]" />
                      {(reactionTime / 1000).toFixed(3)}s
                   </div>
                   <div className="text-gray-500 text-xs font-bold tracking-widest">
                      {reactionTime < 200 ? 'F1 LEVEL REACTION!' : reactionTime < 300 ? 'GOOD START' : 'A BIT SLOW OFF THE LINE'}
                   </div>
                   <div className="text-gray-600 text-[10px] mt-4">CLICK TO RESTART</div>
                </div>
             )}
          </div>
       </div>
    </div>
  );
}
