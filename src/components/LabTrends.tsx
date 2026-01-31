import React from 'react';
import { TrendingUp, GitBranch, Star, Clock } from 'lucide-react';

interface TrendItem {
  id: string;
  name: string;
  category: string;
  growth: string;
  stars: string;
  lastUpdated: string;
}

const TRENDING_PROJECTS: TrendItem[] = [
  { id: '1', name: 'OpenClaw-v2', category: 'Orchestration', growth: '+12%', stars: '18.4k', lastUpdated: '2h ago' },
  { id: '2', name: 'DeepSeek-R1', category: 'Reasoning', growth: '+45%', stars: '32.1k', lastUpdated: '1d ago' },
  { id: '3', name: 'Agent-Lightning', category: 'Optimization', growth: '+8%', stars: '12.6k', lastUpdated: '5h ago' },
  { id: '4', name: 'Terminal-Bench-SOTA', category: 'Agentic', growth: '+22%', stars: '4.2k', lastUpdated: '12h ago' },
];

export const LabTrends: React.FC = () => {
  return (
    <div className="bg-gray-900/50 border border-green-900/20 rounded p-4 backdrop-blur-sm mt-4">
      <h2 className="text-[10px] font-bold text-green-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <TrendingUp className="w-3 h-3" /> Lab Trends
      </h2>
      
      <div className="space-y-3">
        {TRENDING_PROJECTS.map((project) => (
          <div key={project.id} className="group cursor-pointer">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-200 group-hover:text-green-400 transition-colors">{project.name}</span>
                <span className="text-[7px] text-gray-600 uppercase tracking-tighter">{project.category}</span>
              </div>
              <span className="text-[9px] font-mono text-green-600">{project.growth}</span>
            </div>
            
            <div className="flex gap-3 text-[7px] text-gray-600 uppercase">
              <span className="flex items-center gap-1"><Star className="w-2 h-2" /> {project.stars}</span>
              <span className="flex items-center gap-1"><GitBranch className="w-2 h-2" /> Fork</span>
              <span className="flex items-center gap-1 ml-auto"><Clock className="w-2 h-2" /> {project.lastUpdated}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 border border-gray-800 rounded text-[8px] text-gray-500 hover:text-gray-300 hover:border-gray-700 uppercase tracking-[0.1em] transition-all">
        Explore Neural Network
      </button>
    </div>
  );
};
