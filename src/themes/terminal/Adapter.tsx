'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/core/PortfolioContext';
import CRTEffect from './components/CRTEffect';
import { Download, ExternalLink, Play, Code } from 'lucide-react';

type HistoryItem = {
  id: string;
  type: 'input' | 'output' | 'system';
  content: React.ReactNode;
};

const COMMANDS = ['help', 'whoami', 'skills', 'projects', 'timeline', 'certs', 'contact', 'get-resume', 'clear'];

export default function TerminalAdapter() {
  const portfolio = usePortfolio();
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [booting, setBooting] = useState(true);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const hasBooted = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    window.addEventListener('click', focusInput);
    return () => window.removeEventListener('click', focusInput);
  }, []);

  // Boot sequence
  useEffect(() => {
    if (hasBooted.current) return;
    hasBooted.current = true;

    const bootLines = [
      'NEURO-OS v9.0.1 INITIALIZING...',
      'LOADING KERNEL...',
      'MOUNTING FILE SYSTEMS... OK',
      'ESTABLISHING SECURE CONNECTION...',
      'ACCESS GRANTED.'
    ];

    let delay = 0;
    bootLines.forEach((line, idx) => {
      setTimeout(() => {
        setHistory(prev => [...prev, { id: `boot-${idx}`, type: 'system', content: <Typewriter text={line} speed={20} /> }]);
      }, delay);
      delay += 500 + Math.random() * 500;
    });

    setTimeout(() => {
      setBooting(false);
      setHistory(prev => [...prev, { 
        id: 'welcome', 
        type: 'system', 
        content: (
          <div className="mt-4 mb-2 text-[#00ff41]">
            Welcome to the Cyberpunk Terminal.<br/>
            Type <span className="text-white font-bold">'help'</span> to see available commands or click the suggestions above.
          </div>
        )
      }]);
    }, delay + 500);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add input to history
    setHistory(prev => [...prev, { id: Date.now().toString(), type: 'input', content: trimmed }]);

    let output: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="grid grid-cols-2 gap-2 mt-2 mb-4 text-[#00ff41]/80">
            <div><span className="text-white">whoami</span> - Display user bio</div>
            <div><span className="text-white">skills</span> - List loaded subroutines</div>
            <div><span className="text-white">projects</span> - View cyber-constructs</div>
            <div><span className="text-white">timeline</span> - Access chronolog</div>
            <div><span className="text-white">certs</span> - View security clearances</div>
            <div><span className="text-white">contact</span> - Open comms channels</div>
            <div><span className="text-white">get-resume</span> - Extract secure dossier</div>
            <div><span className="text-white">clear</span> - Purge terminal buffer</div>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <div className="mt-2 mb-4">
            <h1 className="text-2xl font-bold text-white mb-1">{portfolio.personal?.name}</h1>
            <h2 className="text-[#00ff41] mb-4">[{portfolio.personal?.title}]</h2>
            <p className="text-[#00ff41]/80 leading-relaxed max-w-2xl">{portfolio.personal?.bio}</p>
          </div>
        );
        break;
      case 'skills':
        output = (
          <div className="mt-2 mb-4 space-y-4">
            {(portfolio.skills as any[])?.map((group: any, i: number) => (
              <div key={i}>
                <div className="text-white border-b border-[#00ff41]/30 inline-block mb-2 pr-8">{group.category}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items?.map((item: string, j: number) => (
                    <span key={j} className="text-[#00ff41]/80">[{item}]</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="mt-2 mb-4 space-y-8">
            {portfolio.projects?.map((proj) => (
              <div key={proj.id} className="border-l-2 border-[#00ff41]/50 pl-4">
                <div className="text-white font-bold text-xl">{proj.title}</div>
                <div className="text-[#00ff41]/60 text-sm mb-2">&gt; {proj.subtitle}</div>
                <div className="text-[#00ff41]/80 text-sm mb-4 max-w-2xl">{proj.description}</div>
                <div className="flex gap-4">
                  {proj.liveUrl && (
                    <a aria-label="Link" href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-[#00ff41] px-4 py-1 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                      <Play className="w-3 h-3" /> [PLAY DEMO]
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a aria-label="Link" href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border border-white/50 px-4 py-1 text-white hover:bg-white hover:text-black transition-colors">
                      <Code className="w-3 h-3" /> [SOURCE CODE]
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case 'timeline':
        output = (
          <div className="mt-2 mb-4 space-y-6">
            <div className="text-white font-bold">--- COMBAT LOG (Experience) ---</div>
            {portfolio.experience?.map((exp: any, i: number) => (
              <div key={i}>
                <div className="text-[#00ff41]">{exp.period || exp.startDate}</div>
                <div className="text-white font-bold">{exp.role} @ {exp.company}</div>
                <div className="text-[#00ff41]/70 text-sm">{exp.description}</div>
              </div>
            ))}
            <div className="text-white font-bold mt-8">--- TRAINING SIMULATIONS (Education) ---</div>
            {portfolio.education?.map((edu: any, i: number) => (
              <div key={i}>
                <div className="text-[#00ff41]">{edu.period || edu.startDate}</div>
                <div className="text-white font-bold">{edu.degree}</div>
                <div className="text-[#00ff41]/70 text-sm">{edu.school}</div>
              </div>
            ))}
          </div>
        );
        break;
      case 'certs':
        output = (
          <div className="mt-2 mb-4 space-y-4">
            {portfolio.certifications?.map((cert, i) => (
              <div key={i} className="flex flex-col gap-2 border border-[#00ff41]/20 p-4 max-w-lg">
                <div>
                  <div className="text-white font-bold">{cert.name}</div>
                  <div className="text-[#00ff41]/60 text-sm">ISSUER: {cert.issuer}</div>
                </div>
                <div className="flex gap-4 mt-2">
                  {(cert.url || cert.fileUrl) && (
                    <a aria-label="Link" href={cert.url || cert.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs border border-dashed border-[#00ff41] px-2 py-1 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors">
                      <ExternalLink className="w-3 h-3" /> [VIEW CREDENTIAL]
                    </a>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case 'contact':
        output = (
          <div className="mt-2 mb-4 space-y-2 text-[#00ff41]/80">
            <div><span className="text-white">EMAIL:</span> {portfolio.personal?.email}</div>
            <div><span className="text-white">PHONE:</span> {portfolio.personal?.phone}</div>
            <div><span className="text-white">LOCATION:</span> {portfolio.personal?.location}</div>
            <div className="mt-4 text-white">OPEN FREQUENCIES:</div>
            <div className="flex gap-4">
              {portfolio.socials?.github && <a aria-label="Link" href={portfolio.socials.github} target="_blank" rel="noreferrer" className="underline hover:text-white">[GITHUB]</a>}
              {portfolio.socials?.linkedin && <a aria-label="Link" href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" className="underline hover:text-white">[LINKEDIN]</a>}
              {portfolio.socials?.instagram && <a aria-label="Link" href={portfolio.socials.instagram} target="_blank" rel="noreferrer" className="underline hover:text-white">[INSTAGRAM]</a>}
            </div>
          </div>
        );
        break;
      case 'get-resume':
        output = (
          <div className="mt-2 mb-4">
            <div className="text-white mb-2">Extracting dossier...</div>
            {portfolio.personal?.resumeUrl ? (
              <a aria-label="Link" href={portfolio.personal.resumeUrl} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#00ff41] text-black px-6 py-2 font-bold hover:bg-white transition-colors shadow-[0_0_15px_#00ff41]">
                <Download className="w-4 h-4" /> [DOWNLOAD DOSSIER]
              </a>
            ) : (
              <div className="text-red-500">ERROR: DOSSIER NOT FOUND IN FILE SYSTEM.</div>
            )}
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return; // Don't add output for clear
      default:
        output = <div className="text-red-500 mt-2 mb-4">Command not found: {trimmed}. Type 'help' for available commands.</div>;
    }

    setHistory(prev => [...prev, { id: Date.now().toString() + '-out', type: 'output', content: output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="w-full h-screen bg-[#0a0a0a] text-[#00ff41] font-mono overflow-hidden relative selection:bg-[#00ff41] selection:text-black">
      <CRTEffect />
      
      {/* Clickable Command Shortcuts Bar - Enhanced for Non-Tech Users */}
      {!booting && (
        <div className="absolute top-0 left-0 w-full bg-[#00ff41]/10 border-b border-[#00ff41]/50 p-3 z-40 flex flex-wrap items-center gap-3 text-xs backdrop-blur-sm pointer-events-auto shadow-[0_4px_20px_rgba(0,255,65,0.2)]">
          <span className="text-white font-bold animate-pulse px-2 bg-[#00ff41]/20 border border-[#00ff41]">&gt; CLICK ANY COMMAND TO EXPLORE:</span>
          {COMMANDS.map(cmd => (
            <button aria-label="Interactive Button" key={cmd} 
              onClick={() => handleCommand(cmd)}
              className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41] hover:text-black hover:border-[#00ff41] transition-colors focus:outline-none font-bold tracking-widest shadow-[inset_0_0_10px_rgba(0,255,65,0.1)]"
            >
              {cmd.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {/* Terminal Viewport */}
      <div className="absolute inset-0 z-30 p-6 pt-24 overflow-y-auto custom-scrollbar pointer-events-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-1">
          
          {history.map((item) => (
            <div key={item.id} className="w-full">
              {item.type === 'input' && (
                <div className="flex gap-2">
                  <span className="text-white">guest@netrunner:~$</span>
                  <span>{item.content}</span>
                </div>
              )}
              {(item.type === 'output' || item.type === 'system') && (
                <div className="animate-[fade-in_0.2s_ease-out]">
                  {item.content}
                </div>
              )}
            </div>
          ))}

          {!booting && (
            <div className="flex gap-2 items-center mt-2">
              <span className="text-white">guest@netrunner:~$</span>
              <input 
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-[#00ff41] focus:ring-0 p-0"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          )}
          
          <div ref={endRef} className="h-4" />
        </div>
      </div>
    </div>
  );
}

// Simple Typewriter component for system boot messages
function Typewriter({ text, speed = 50 }: { text: string, speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayed}</span>;
}
