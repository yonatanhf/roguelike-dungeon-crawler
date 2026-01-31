import React from 'react';
import { LabConfig } from '../types/game';
import { Settings, Eye, Users, Database, Thermometer } from 'lucide-react';

interface LabControlsProps {
  config: LabConfig;
  onUpdate: (newConfig: Partial<LabConfig>) => void;
  disabled?: boolean;
}

const ControlSlider: React.FC<{ 
  label: string; 
  value: number; 
  min: number; 
  max: number; 
  step: number; 
  icon: React.ReactNode;
  onChange: (val: number) => void;
  disabled?: boolean;
}> = ({ label, value, min, max, step, icon, onChange, disabled }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center text-[8px] uppercase tracking-tighter text-gray-500">
      <span className="flex items-center gap-1">{icon} {label}</span>
      <span className="font-mono text-cyan-500">{value}</span>
    </div>
    <input 
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-600 disabled:opacity-30"
    />
  </div>
);

export const LabControls: React.FC<LabControlsProps> = ({ config, onUpdate, disabled }) => {
  return (
    <div className="bg-gray-900/50 border border-gray-800 p-4 rounded backdrop-blur-sm mt-4">
      <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Settings className="w-3 h-3" /> System Parameters
      </h2>

      <div className="space-y-4">
        <ControlSlider 
          label="Visual Range"
          value={config.visibility_radius}
          min={1}
          max={6}
          step={1}
          icon={<Eye className="w-2 h-2" />}
          onChange={(v) => onUpdate({ visibility_radius: v })}
          disabled={disabled}
        />

        <ControlSlider 
          label="Swarm Aggression"
          value={config.swarm_aggression}
          min={0}
          max={1}
          step={0.1}
          icon={<Users className="w-2 h-2" />}
          onChange={(v) => onUpdate({ swarm_aggression: v })}
          disabled={disabled}
        />

        <ControlSlider 
          label="Memory Recall"
          value={config.memory_recall_limit}
          min={0}
          max={5}
          step={1}
          icon={<Database className="w-2 h-2" />}
          onChange={(v) => onUpdate({ memory_recall_limit: v })}
          disabled={disabled}
        />

        <ControlSlider 
          label="Thermal Noise (Temp)"
          value={config.llm_temperature}
          min={0}
          max={1.5}
          step={0.1}
          icon={<Thermometer className="w-2 h-2" />}
          onChange={(v) => onUpdate({ llm_temperature: v })}
          disabled={disabled}
        />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800/50 text-[7px] text-gray-600 italic">
        * Parameters are synchronized with the Neural Core in real-time.
      </div>
    </div>
  );
};
