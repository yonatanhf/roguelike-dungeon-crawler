import React from 'react';
import { Entity } from '../types/game';
import { Activity, Shield, Hash, Users } from 'lucide-react';
import { cn } from '../lib/utils';

interface HUDProps {
  player: Entity | undefined;
  turnCount: number;
  entityCount: number;
}

export const HUD: React.FC<HUDProps> = ({ player, turnCount, entityCount }) => {
  return (
    <div className="bg-gray-900/50 border border-green-900/30 p-4 rounded backdrop-blur-sm">
      <h2 className="text-xs font-bold text-green-700 uppercase tracking-[0.3em] mb-4 flex justify-between items-center">
        <span>Biometric Link</span>
        <Activity className="w-3 h-3 animate-pulse text-green-500" />
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-gray-500 uppercase flex items-center gap-1">
              <Shield className="w-2 h-2" /> Vitality
            </span>
            <span className="text-green-500 font-bold">{player?.hp}%</span>
          </div>
          <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500 ease-out shadow-[0_0_8px_rgba(34,197,94,0.5)]",
                player && player.hp < 30 ? "bg-red-500" : "bg-green-500"
              )}
              style={{ width: `${player?.hp}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-800/50 p-2 rounded border border-gray-700/30 text-center">
            <div className="text-[8px] text-gray-500 uppercase flex items-center justify-center gap-1">
              <Hash className="w-2 h-2" /> Turns
            </div>
            <div className="text-sm text-blue-400 font-bold">{turnCount}</div>
          </div>
          <div className="bg-gray-800/50 p-2 rounded border border-gray-700/30 text-center">
            <div className="text-[8px] text-gray-500 uppercase flex items-center justify-center gap-1">
              <Users className="w-2 h-2" /> Entities
            </div>
            <div className="text-sm text-yellow-500 font-bold">{entityCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
