import React, { useRef, useEffect, useState } from 'react';
import { Cpu, ChevronDown, ChevronRight, Timer } from 'lucide-react';
import { Span } from '../types/game';
import { cn } from '../lib/utils';

interface TechnicalLogProps {
  logs: string[];
  spans: Span[];
}

const SpanItem: React.FC<{ span: Span }> = ({ span }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="border-l border-blue-900/30 pl-2 mb-2">
      <button 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left hover:bg-blue-950/20 transition-colors py-1"
      >
        {expanded ? <ChevronDown className="w-2 h-2" /> : <ChevronRight className="w-2 h-2" />}
        <span className="text-[9px] font-bold text-blue-300 uppercase">{span.name}</span>
        <span className="ml-auto text-[8px] text-blue-900 flex items-center gap-1">
          <Timer className="w-2 h-2" /> {span.duration_ms.toFixed(1)}ms
        </span>
      </button>
      
      {expanded && (
        <div className="mt-1 space-y-1 overflow-hidden">
          <div className="bg-black/40 p-1 rounded">
             <div className="text-[7px] text-gray-600 uppercase mb-0.5">Input</div>
             <pre className="text-[8px] text-gray-400 whitespace-pre-wrap font-mono leading-tight">{span.input_data}</pre>
          </div>
          <div className="bg-black/40 p-1 rounded">
             <div className="text-[7px] text-gray-600 uppercase mb-0.5">Output</div>
             <pre className="text-[8px] text-blue-400/80 whitespace-pre-wrap font-mono leading-tight">{span.output_data}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export const TechnicalLog: React.FC<TechnicalLogProps> = ({ logs, spans }) => {
  const [activeTab, setActiveTab] = useState<'LOGS' | 'TRACES'>('LOGS');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, spans, activeTab]);

  return (
    <div className="bg-gray-900/50 border border-blue-900/20 rounded flex flex-col h-[300px] backdrop-blur-sm">
      <div className="flex border-b border-blue-900/20">
        {(['LOGS', 'TRACES'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-grow py-2 text-[9px] font-bold tracking-widest transition-colors",
              activeTab === tab ? "bg-blue-950/40 text-blue-400" : "text-gray-600 hover:text-gray-400"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-3 scrollbar-hide"
      >
        {activeTab === 'LOGS' ? (
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="font-light flex gap-2 text-[10px] text-blue-400/70 font-mono">
                <span className="opacity-30">[{new Date().toLocaleTimeString()}]</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {spans.map((span, i) => <SpanItem key={i} span={span} />)}
            {spans.length === 0 && <div className="text-[9px] text-gray-700 italic">No traces captured in current context.</div>}
          </div>
        )}
      </div>
    </div>
  );
};
