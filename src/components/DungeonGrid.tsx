import React from 'react';
import { Entity } from '../types/game';
import { DungeonCell } from './DungeonCell';

interface DungeonGridProps {
  gridSize: number;
  wallIndices: number[];
  revealedIndices: number[];
  visibleIndices: number[];
  entities: Entity[];
  onCellClick: (index: number) => void;
}

export const DungeonGrid: React.FC<DungeonGridProps> = ({ 
  gridSize, 
  wallIndices,
  revealedIndices,
  visibleIndices,
  entities, 
  onCellClick 
}) => {
  const player = entities.find(e => e.type === 'player');
  const monsters = entities.filter(e => e.type === 'monster');

  return (
    <div className="bg-gray-900/30 border border-gray-800 p-2 rounded-lg relative overflow-hidden group">
      {/* Grid Header Info */}
      <div className="absolute top-4 left-4 z-20 text-[10px] text-gray-600 group-hover:text-green-900 transition-colors pointer-events-none font-mono">
        GRID_SCAN_COORD: {Math.sqrt(gridSize)}x{Math.sqrt(gridSize)}<br/>
        REF_SYSTEM: WGS84_ROGUE
      </div>

      <div className="grid grid-cols-12 gap-1 aspect-square bg-gray-950 p-1">
        {Array.from({ length: gridSize }).map((_, i) => {
          const isRevealed = revealedIndices.includes(i);
          const isVisible = visibleIndices.includes(i);
          const isWall = wallIndices.includes(i);
          const monsterAtCell = monsters.find(m => m.position === i);
          const isPlayer = player?.position === i;

          return (
            <DungeonCell
              key={i}
              index={i}
              isRevealed={isRevealed}
              isVisible={isVisible}
              isWall={isWall}
              monster={monsterAtCell}
              isPlayer={isPlayer}
              onClick={onCellClick}
            />
          );
        })}
      </div>
    </div>
  );
};
