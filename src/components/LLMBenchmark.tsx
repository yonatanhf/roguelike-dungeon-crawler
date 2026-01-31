import React, { useState } from 'react';
import { BenchmarkData, LLMMetrics } from '../types/game';
import { BarChart2, Cpu, Globe, Zap, Search, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface LLMBenchmarkProps {
  benchmarks: BenchmarkData;
  currentMetrics?: LLMMetrics;
}

export const LLMBenchmark: React.FC<LLMBenchmarkProps> = ({ benchmarks, currentMetrics }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...new Set(benchmarks.metrics.map(m => m.category))];

  const filteredMetrics = activeCategory === 'All' 
    ? benchmarks.metrics 
    : benchmarks.metrics.filter(m => m.category === activeCategory);

  return (
    <div className="bg-gray-900/50 border border-cyan-900/30 rounded backdrop-blur-sm mt-4 flex flex-col h-[600px] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 bg-black/20 flex justify-between items-center">
        <div>
          <h2 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Globe className="w-3 h-3" /> Global Intelligence Index
          </h2>
          <p className="text-[8px] text-gray-500 mt-1 uppercase">Reference Data v2026.01.RC</p>
        </div>
        <div className="flex flex-col items-end">
            <div className="text-[10px] font-mono text-cyan-500">LAB_EFFICIENCY</div>
            <div className="text-lg font-mono text-white leading-none">{benchmarks.lab_score.toFixed(1)}</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex bg-black/40 p-1 border-b border-gray-800 overflow-x-auto scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-3 py-1 text-[8px] uppercase font-bold tracking-widest transition-colors rounded",
              activeCategory === cat ? "bg-cyan-950 text-cyan-400" : "text-gray-600 hover:text-gray-400"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Live Lab Telemetry */}
      {currentMetrics && (
        <div className="p-4 bg-cyan-950/10 border-b border-cyan-900/10 grid grid-cols-3 gap-4">
           <div>
             <div className="text-[7px] text-cyan-700 uppercase">Response Latency</div>
             <div className="text-xs font-mono text-cyan-400">{currentMetrics.latency_ms.toFixed(0)}ms</div>
           </div>
           <div>
             <div className="text-[7px] text-cyan-700 uppercase">Logic Alignment</div>
             <div className="text-xs font-mono text-cyan-400">{(currentMetrics.instruction_score * 100).toFixed(0)}%</div>
           </div>
           <div>
             <div className="text-[7px] text-cyan-700 uppercase">Tokens Generated</div>
             <div className="text-xs font-mono text-cyan-400">{currentMetrics.tokens_generated}</div>
           </div>
        </div>
      )}

      {/* Benchmark List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800">
        {filteredMetrics.map((m, idx) => (
          <div key={idx} className="group border-b border-gray-800/50 pb-3 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-200">{m.name}</span>
                    <span className="text-[7px] px-1 bg-gray-800 text-gray-400 rounded">{m.category}</span>
                </div>
                <div className="text-[8px] text-gray-500 mt-0.5 italic">{m.description}</div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-700 group-hover:text-cyan-500 transition-colors" />
            </div>

            <div className="flex items-center gap-4">
               <div className="flex-grow">
                  <div className="flex justify-between text-[7px] text-gray-500 mb-1 uppercase tracking-tighter">
                     <span>SOTA: {m.sota_model}</span>
                     <span>Target: {m.sota_score}{m.unit}</span>
                  </div>
                  <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-cyan-600/50 transition-all duration-1000" 
                        style={{ width: `${m.sota_score}%` }}
                    />
                  </div>
               </div>
               <div className="w-10 text-right">
                  <div className="text-[7px] text-gray-600 uppercase">Delta</div>
                  <div className="text-[10px] font-mono text-red-900/50">-{ (m.sota_score - benchmarks.lab_score).toFixed(1) }</div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Meta Info */}
      <div className="p-3 bg-black/40 border-t border-gray-800 flex justify-between items-center">
         <div className="flex gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[8px] text-gray-500 uppercase">Trend: Upward Reasoning</span>
         </div>
         <Info className="w-3 h-3 text-gray-700 hover:text-gray-400 cursor-help" />
      </div>
    </div>
  );
};
