'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParticleCanvasProps {
  alphabet: string[];
  roofImageSrc: string;
  isActive?: boolean;
  soundProfile?: string;
  imageOffsetY?: string;
  curtainOffsetY?: number;
}

// Simple Web Audio API Wind Chime Synthesizer
class ChimeSynth {
  audioCtx: AudioContext | null = null;
  activeVoices = 0;
  maxVoices = 5;

  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
  }

  play(profile: string = 'bell') {
    if (!this.audioCtx || this.activeVoices >= this.maxVoices) return;
    
    // Resume context if suspended (browser policy)
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    this.activeVoices++;
    const ctx = this.audioCtx;

    // Create oscillator and gain node
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Ancient pentatonic scales (multiple octaves for variety)
    const chinesePentatonic = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
    const japaneseHirajoshi = [220.00, 246.94, 261.63, 329.63, 349.23, 440.00, 493.88, 523.25, 659.25, 698.46];
    
    let pitches = chinesePentatonic;
    let type: OscillatorType = 'sine';
    
    // Super soft and ethereal base settings
    let attack = 0.5; // Very slow fade in
    let decay = 3.5;  // Very slow fade out
    let volume = 0.04; // Extremely quiet

    // Apply profiles (all strictly sine/triangle for softness)
    if (profile === 'glass') {
      pitches = chinesePentatonic.slice(5); // High notes
      type = 'sine';
      attack = 0.3;
      decay = 4.0;
      volume = 0.03;
    } else if (profile === 'wood') {
      pitches = japaneseHirajoshi.slice(2, 7); // Mid notes
      type = 'triangle';
      attack = 0.15;
      decay = 1.5;
      volume = 0.04;
    } else if (profile === 'gong') {
      pitches = [110.00, 130.81, 146.83, 164.81]; // Very low
      type = 'sine';
      attack = 0.8;
      decay = 6.0;
      volume = 0.08;
    } else if (profile === 'harp') {
      pitches = japaneseHirajoshi.slice(4); // Mid-high notes
      type = 'sine';
      attack = 0.4;
      decay = 3.0;
      volume = 0.05;
    } else if (profile === 'bamboo') {
      pitches = chinesePentatonic.slice(3, 8); // Mid notes
      type = 'triangle';
      attack = 0.2;
      decay = 2.0;
      volume = 0.03;
    }

    const pitch = pitches[Math.floor(Math.random() * pitches.length)];
    
    // Add detune to create a slight chorus/ancient imperfection
    osc.type = type;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.detune.setValueAtTime((Math.random() - 0.5) * 15, ctx.currentTime);

    // Ethereal envelope: smooth fade in, smooth exponential fade out
    gain.gain.setValueAtTime(0, ctx.currentTime);
    
    // Fade in
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack); 
    
    // Fade out
    gain.gain.setTargetAtTime(0, ctx.currentTime + attack, decay / 3);

    osc.start(ctx.currentTime);
    // Add extra padding to let the tail fade out completely
    osc.stop(ctx.currentTime + attack + decay);

    osc.onended = () => {
      this.activeVoices--;
      osc.disconnect();
      gain.disconnect();
    };
  }
}

const chimeSynth = new ChimeSynth();

export default function ParticleCanvas({ alphabet, roofImageSrc, isActive = true, soundProfile = 'bell', imageOffsetY, curtainOffsetY = 0 }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const roofRef = useRef<HTMLImageElement>(null);
  const [roofLoaded, setRoofLoaded] = useState(false);

  // Mouse tracking
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000 });

  useEffect(() => {
    // If the image is cached, onLoad might not fire. Check if it's already complete.
    if (roofRef.current && roofRef.current.complete) {
      setRoofLoaded(true);
    }
  }, [roofImageSrc]);

  useEffect(() => {
    // Initialize audio context on first interaction
    const initAudio = () => {
      chimeSynth.init();
      window.removeEventListener('click', initAudio);
      window.removeEventListener('mousemove', initAudio);
    };
    window.addEventListener('click', initAudio);
    window.addEventListener('mousemove', initAudio);

    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('mousemove', initAudio);
    };
  }, []);

  useEffect(() => {
    if (!roofLoaded || !canvasRef.current || !containerRef.current || !roofRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let roofBottomY = 0;
    let roofWidth = 0;
    let roofStartX = 0;
    
    const updateBounds = () => {
      if (!roofRef.current || !containerRef.current || !canvasRef.current) return;
      
      const roofRect = roofRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      roofBottomY = roofRect.bottom - containerRect.top + curtainOffsetY;
      roofWidth = roofRect.width;
      roofStartX = roofRect.left - containerRect.left;
      
      width = containerRect.width;
      height = containerRect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      if (ctx) {
        ctx.scale(dpr, dpr);
        ctx.font = '13px "Space Mono", monospace';
        ctx.fillStyle = '#2B2118';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
      }
    };

    updateBounds();

    const numStrands = 14;
    const charSpacing = 16;
    
    class Strand {
      relX: number; // 0.0 to 1.0 relative to roof width
      length: number;
      phase: number;
      swaySpeed: number;
      amplitude: number;
      drift: number;
      chars: string[];
      offsetY: number;
      speed: number;
      
      displacements: number[];
      velocities: number[];
      lastChimeTime: number;
      
      constructor(index: number) {
        const strandSpacing = 1 / numStrands;
        this.relX = (strandSpacing * index) + (strandSpacing / 2);
        
        this.length = Math.floor(Math.random() * 10) + 18;
        
        this.phase = Math.random() * Math.PI * 2;
        this.swaySpeed = 0.001 + Math.random() * 0.002;
        this.amplitude = 15 + Math.random() * 25;
        
        const centerDist = (index / numStrands) - 0.5;
        this.drift = centerDist * (30 + Math.random() * 40);
        
        this.speed = 0.3 + Math.random() * 0.3;
        this.offsetY = 0;
        
        this.chars = [];
        this.displacements = [];
        this.velocities = [];
        for (let i = 0; i < this.length + 1; i++) {
          this.chars.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
          this.displacements.push(0);
          this.velocities.push(0);
        }
        
        this.lastChimeTime = 0;
      }
      
      update(time: number, mouse: typeof mouseRef.current) {
        this.offsetY += this.speed;
        
        if (this.offsetY >= charSpacing) {
          this.offsetY -= charSpacing;
          this.chars.pop();
          this.chars.unshift(alphabet[Math.floor(Math.random() * alphabet.length)]);
          
          this.displacements.pop();
          this.displacements.unshift(0);
          this.velocities.pop();
          this.velocities.unshift(0);
        }

        const now = Date.now();
        const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

        for (let i = 0; i < this.length; i++) {
          const currentY = roofBottomY + (i * charSpacing) + this.offsetY;
          const depthProgress = i / this.length;
          const curlFactor = depthProgress < 0.6 ? 0 : Math.pow((depthProgress - 0.6) / 0.4, 2);
          
          // Calculate absolute X for physics
          const absoluteX = roofStartX + (this.relX * roofWidth);
          const baseX = absoluteX
                      + (this.drift * curlFactor) 
                      + Math.sin(time * this.swaySpeed + this.phase + (depthProgress * 2)) * this.amplitude * curlFactor;

          const dx = mouse.x - baseX;
          const dy = mouse.y - currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const radius = 100;
          let pushForce = 0;
          
          if (dist < radius) {
            const force = (radius - dist) / radius;
            const direction = dx > 0 ? -1 : 1;
            pushForce = force * direction * 25;
            
            if (mouseSpeed > 2 && now - this.lastChimeTime > 250) {
              chimeSynth.play(soundProfile);
              this.lastChimeTime = now;
            }
          }

          const stiffness = 0.1 - (depthProgress * 0.08);
          const damping = 0.85;

          const acceleration = (pushForce - this.displacements[i]) * stiffness;
          this.velocities[i] = (this.velocities[i] + acceleration) * damping;
          this.displacements[i] += this.velocities[i];
          
          if (i > 0) {
             const pullFromAbove = (this.displacements[i-1] - this.displacements[i]) * 0.2;
             this.displacements[i] += pullFromAbove;
          }
        }
      }
      
      draw(ctx: CanvasRenderingContext2D, time: number) {
        for (let i = 0; i < this.length; i++) {
          const currentY = roofBottomY + (i * charSpacing) + this.offsetY;
          const depthProgress = i / this.length;
          
          const curlFactor = depthProgress < 0.6 ? 0 : Math.pow((depthProgress - 0.6) / 0.4, 2);
          const idleDrift = depthProgress * 2;
          
          const absoluteX = roofStartX + (this.relX * roofWidth);
          const baseX = absoluteX
                      + (this.drift * curlFactor) 
                      + Math.sin(time * this.swaySpeed + this.phase + (depthProgress * 2)) * this.amplitude * curlFactor
                      + Math.sin(time * 0.005 + this.phase) * idleDrift;

          const currentX = baseX + this.displacements[i];
                         
          const maxOpacity = 0.85;
          let opacity = maxOpacity * (1 - Math.pow(depthProgress, 2));
          
          if (i === 0) opacity *= (this.offsetY / charSpacing);
          if (i === this.length - 1) opacity *= (1 - (this.offsetY / charSpacing));

          ctx.save();
          ctx.globalAlpha = Math.max(0, opacity);
          ctx.fillText(this.chars[i], currentX, currentY);
          ctx.restore();
        }
      }
    }

    const strands: Strand[] = [];
    for (let i = 0; i < numStrands; i++) {
      strands.push(new Strand(i));
    }

    let animationFrameId: number;
    let time = 0;
    
    const render = () => {
      if (!isActive) return;

      ctx.clearRect(0, 0, width, height);
      time++;
      
      mouseRef.current.vx = mouseRef.current.x - mouseRef.current.lastX;
      mouseRef.current.vy = mouseRef.current.y - mouseRef.current.lastY;
      mouseRef.current.lastX = mouseRef.current.x;
      mouseRef.current.lastY = mouseRef.current.y;
      
      strands.forEach(strand => {
        strand.update(time, mouseRef.current);
        strand.draw(ctx, time);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    if (isActive) {
      render();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // Use ResizeObserver for robust layout tracking
    const resizeObserver = new ResizeObserver(() => {
      updateBounds();
    });
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(roofRef.current);

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [alphabet, roofLoaded, roofImageSrc, isActive]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none flex flex-col items-center">
      <img 
        ref={roofRef}
        src={roofImageSrc} 
        alt="Cultural Roof"
        className={`w-full max-w-[480px] object-contain z-20 pointer-events-auto ${imageOffsetY || 'mt-[12vh]'}`}
        style={{ filter: 'drop-shadow(10px 10px 15px rgba(43, 33, 24, 0.4))' }}
        onLoad={() => setRoofLoaded(true)}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-auto" />
    </div>
  );
}
