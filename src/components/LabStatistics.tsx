import React from 'react';
import { LabStats } from '../types/game';
import { Activity, Brain, Users, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface LabStatisticsProps {
  stats: LabStats | undefined;
}

const StatBar: React.FC<{ label: string; value: number; max: number; color: string; icon: React.ReactNode }> = ({ label, value, max, color, icon }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] mb-1 uppercase tracking-wider text-gray-400">
        <span className="flex items-center gap-1">{icon} {label}</span>
        <span className="font-mono text-white">{value.toFixed(2)}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={cn("h-full transition-all duration-500", color)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export const LabStatistics: React.FC<LabStatisticsProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="bg-gray-900/50 border border-purple-900/30 p-4 rounded backdrop-blur-sm">
      <h2 className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Activity className="w-3 h-3" /> Lab Telemetry
      </h2>
      
      <StatBar 
        label="Swarm Cohesion" 
        value={stats.swarm_cohesion} 
        max={1.0} 
        color="bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" 
        icon={<Users className="w-3 h-3" />}
      />
      
      <StatBar 
        label="Neural Depth" 
        value={stats.memory_depth} 
        max={50} 
        color="bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
        icon={<Brain className="w-3 h-3" />}
      />
      
      <StatBar 
        label="System Entropy" 
        value={stats.entropy_level} 
        max={1.0} 
        color="bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" 
        icon={<Zap className="w-3 h-3" />}
      />

      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-800">
        <div className="text-center">
          <div className="text-[8px] text-gray-500 uppercase">Active Agents</div>
          <div className="text-lg font-mono text-white">{stats.active_agents}</div>
        </div>
        <div className="text-center">
          <div className="text-[8px] text-gray-500 uppercase">Compute (ms)</div>
          <div className="text-lg font-mono text-green-400">{stats.computation_time_ms.toFixed(1)}</div>
        </div>
      </div>
    </div>
  );
};
