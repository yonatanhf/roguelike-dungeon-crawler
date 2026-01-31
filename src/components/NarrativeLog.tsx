import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NarrativeLogProps {
  history: string[];
  isLoading: boolean;
  turnCount: number;
}

export const NarrativeLog: React.FC<NarrativeLogProps> = ({ history, isLoading, turnCount }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  return (
    <div className="bg-gray-900/50 border border-green-900/20 rounded flex flex-col h-full min-h-[400px]">
      <div className="p-4 border-b border-green-900/10 flex justify-between items-center bg-black/20">
        <h2 className="text-[10px] font-bold text-green-800 uppercase tracking-[0.2em] flex items-center gap-2">
          <Terminal className="w-3 h-3" /> Narrative Stream
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-green-900 animate-pulse font-mono tracking-tighter">LIVE_FEED</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]" />
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-grow p-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-green-900/20"
      >
        <AnimatePresence mode="popLayout">
          {history.map((line, i) => {
            const eventId = turnCount - (history.length - 1 - i);
            const isLast = i === history.length - 1;
            
            return (
              <motion.div 
                key={`${eventId}-${i}`}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs leading-relaxed transition-all duration-700 ${
                  isLast ? 'text-green-400 font-medium' : 'text-gray-500'
                }`}
              >
                <div className="text-[8px] text-gray-800 mb-1 font-mono uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-800 rounded-full" />
                  EVENT_ID_0x{eventId.toString(16).toUpperCase().padStart(4, '0')}
                </div>
                <p className="pl-3 border-l border-gray-900/50">{line}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {isLoading && (
          <div className="text-green-500/50 text-[10px] animate-pulse flex items-center gap-2 font-mono italic">
            <span>Analyzing patterns... Orchestrating reality...</span>
          </div>
        )}
      </div>
    </div>
  );
};
