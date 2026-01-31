import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Entity } from '../types/game';

interface DungeonCellProps {
  index: number;
  isRevealed: boolean;
  isVisible: boolean;
  isWall: boolean;
  monster: Entity | undefined;
  isPlayer: boolean;
  onClick: (index: number) => void;
}

const SPRITES = {
  monster: '👾',
  player: '🤖',
  wall: '🧱'
};

export const DungeonCell: React.FC<DungeonCellProps> = memo(({ 
  index, 
  isRevealed, 
  isVisible, 
  isWall, 
  monster, 
  isPlayer, 
  onClick 
}) => {
  return (
    <motion.div 
      whileHover={isVisible && !isWall ? { scale: 1.05 } : {}}
      onClick={() => isVisible && !isWall && onClick(index)}
      className={cn(
        "relative aspect-square transition-all duration-300 flex items-center justify-center text-lg",
        !isRevealed ? "bg-black" : "bg-gray-900",
        !isVisible && isRevealed ? "opacity-30 grayscale" : "opacity-100",
        isWall ? "shadow-inner" : "border border-gray-800/30",
        isVisible && !isWall && "cursor-pointer hover:border-green-900/50 hover:bg-green-900/5"
      )}
    >
      {isRevealed && isWall && (
        <span className="opacity-40">{SPRITES.wall}</span>
      )}

      {isVisible && monster && (
        <div className="relative group/ent w-full h-full flex items-center justify-center">
           <span className="z-10 filter drop-shadow-[0_0_5px_rgba(239,68,68,0.5)] scale-110">
              {SPRITES.monster}
           </span>
           {/* Entity Hover HP */}
           <div className="absolute -top-1 left-0 right-0 h-0.5 bg-gray-800 rounded-full opacity-0 group-hover/ent:opacity-100 transition-opacity overflow-hidden">
              <div 
                className="bg-red-500 h-full" 
                style={{ width: `${(monster.hp / monster.max_hp) * 100}%` }} 
              />
           </div>
        </div>
      )}
      
      {isVisible && isPlayer && (
        <motion.div 
          layoutId="player-indicator"
          className="relative z-10 scale-125 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
        >
          {SPRITES.player}
          <div className="absolute inset-0 bg-green-500/20 blur-sm animate-pulse rounded-full"/>
        </motion.div>
      )}
      
      {!isRevealed && (
        <div className="text-[6px] text-gray-800 font-bold opacity-30 select-none font-mono">{index}</div>
      )}
      
      {isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent pointer-events-none opacity-20"/>
      )}
    </motion.div>
  );
}, (prev, next) => {
  // Custom equality check for performance
  return (
    prev.isRevealed === next.isRevealed &&
    prev.isVisible === next.isVisible &&
    prev.isWall === next.isWall &&
    prev.isPlayer === next.isPlayer &&
    prev.monster === next.monster
  );
});
