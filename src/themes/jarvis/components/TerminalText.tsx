import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TerminalTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function TerminalText({ text, delay = 0, className = "" }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset
    
    let i = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setDisplayedText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, 30); // Typing speed
      
      return () => clearInterval(intervalId);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-[1em] bg-current ml-1 align-middle"
      />
    </div>
  );
}
