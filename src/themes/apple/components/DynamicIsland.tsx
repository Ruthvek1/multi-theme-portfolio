'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Terminal, Rocket, X, Code2, Server, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '@/core/PortfolioContext';

type IslandState = 'idle' | 'coding' | 'interview' | 'deploy';

export default function DynamicIsland() {
  const [state, setState] = useState<IslandState>('idle');
  const [deployProgress, setDeployProgress] = useState(0);
  const { personal } = usePortfolio();

  useEffect(() => {
    if (state === 'deploy') {
      setDeployProgress(0);
      const interval = setInterval(() => {
        setDeployProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [state]);

  const variants = {
    idle: {
      width: 150,
      height: 36,
      borderRadius: 18,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    coding: {
      width: 360,
      height: 160,
      borderRadius: 40,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    interview: {
      width: 340,
      height: 80,
      borderRadius: 40,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    deploy: {
      width: 240,
      height: 48,
      borderRadius: 24,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      
      {/* Interactive Controls */}
      <div className="flex gap-4 mb-10 opacity-60 hover:opacity-100 transition-opacity">
        <button aria-label="Interactive Button" onClick={() => setState(state === 'coding' ? 'idle' : 'coding')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="Coding Mode"><Terminal className="w-5 h-5 text-blue-400" /></button>
        <button aria-label="Interactive Button" onClick={() => setState(state === 'interview' ? 'idle' : 'interview')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="Incoming Interview"><Phone className="w-5 h-5 text-green-400" /></button>
        <button aria-label="Interactive Button" onClick={() => setState(state === 'deploy' ? 'idle' : 'deploy')} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors" title="Deploy"><Rocket className="w-5 h-5 text-orange-400" /></button>
      </div>

      <div className="relative flex justify-center items-start h-[200px] w-full">
        <motion.div
          layout
          variants={variants as any}
          initial="idle"
          animate={state}
          className="bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden relative cursor-pointer group"
          onClick={() => state === 'idle' && setState('coding')}
        >
          <div className="absolute inset-0 rounded-inherit shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] pointer-events-none" />

          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="w-full h-full flex justify-between items-center px-3"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-3 h-3 bg-white/20 rounded-full" />
              </motion.div>
            )}

            {state === 'coding' && (
              <motion.div 
                key="coding"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex flex-col p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start w-full">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-black border border-white/20 rounded-2xl shadow-lg flex items-center justify-center">
                       <Code2 className="w-8 h-8 text-blue-400" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-white font-mono font-semibold text-sm">Portfolio.tsx</div>
                      <div className="text-gray-400 text-xs font-mono mt-1">Compiling Next.js...</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                  </div>
                </div>
                <div className="mt-6 bg-black/50 border border-white/10 rounded-lg p-3 font-mono text-xs text-green-400 flex flex-col gap-1">
                  <span>&gt; npm run build</span>
                  <span className="text-gray-400">&gt; optimizing chunks...</span>
                  <span className="text-blue-400 animate-pulse">_</span>
                </div>
              </motion.div>
            )}

            {state === 'interview' && (
              <motion.div 
                key="interview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex justify-between items-center px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    R
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs font-medium">Big Tech Inc.</span>
                    <span className="text-white font-semibold">Recruiter</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div onClick={() => setState('idle')} className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors">
                    <Phone className="w-5 h-5 text-white rotate-[135deg]" />
                  </div>
                  <div onClick={() => setState('idle')} className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                </div>
              </motion.div>
            )}

            {state === 'deploy' && (
              <motion.div 
                key="deploy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full flex items-center px-4 gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                {deployProgress < 100 ? (
                  <Server className="w-5 h-5 text-orange-400 animate-pulse" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                )}
                
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1 font-mono">
                    <span className={deployProgress < 100 ? 'text-orange-400' : 'text-green-400'}>
                      {deployProgress < 100 ? 'Deploying...' : 'Live'}
                    </span>
                    <span className="text-gray-400">{deployProgress}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-75 ${deployProgress < 100 ? 'bg-orange-400' : 'bg-green-400'}`}
                      style={{ width: `${deployProgress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
