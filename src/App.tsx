import React from 'react';
import { useDungeon } from './hooks/useDungeon';
import { HUD } from './components/HUD';
import { NarrativeLog } from './components/NarrativeLog';
import { TechnicalLog } from './components/TechnicalLog';
import { UserIdentity } from './components/UserIdentity';
import { LabStatistics } from './components/LabStatistics';
import { LabTrends } from './components/LabTrends';
import { LabControls } from './components/LabControls';
import { LLMBenchmark } from './components/LLMBenchmark';
import { DungeonGrid } from './components/DungeonGrid';
import { RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const { gameState, loading, initGame, movePlayer, updateConfig, updateSecrets } = useDungeon();

  if (!gameState) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-green-500 font-mono space-y-4">
        <RefreshCw className="w-8 h-8 animate-spin" />
        <div className="animate-pulse tracking-[0.5em] text-xs uppercase">Connecting to Neural Core...</div>
      </div>
    );
  }

  const player = gameState.entities.find(e => e.type === 'player');

  return (
    <div className="min-h-screen bg-black text-gray-300 p-4 sm:p-6 font-mono selection:bg-green-500 selection:text-black overflow-x-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
        
        {/* Sidebar: Control & Feedback */}
        <div className="xl:col-span-1 flex flex-col gap-4 order-2 xl:order-1 h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-900">
          
          <UserIdentity 
            user={gameState.user} 
            secrets={gameState.secrets} 
            onUpdateSecrets={updateSecrets}
            disabled={loading}
          />

          <HUD 
            player={player} 
            turnCount={gameState.turn_count} 
            entityCount={gameState.entities.length} 
          />
          
          <LabControls 
            config={gameState.config} 
            onUpdate={updateConfig} 
            disabled={loading}
          />
          
          <LabStatistics stats={gameState.stats} />
          
          <LabTrends />
          
          <TechnicalLog 
            logs={gameState.system_logs} 
            spans={gameState.recent_spans}
          />

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(127, 29, 29, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            onClick={initGame}
            className="w-full py-3 bg-red-950/10 border border-red-900/30 text-red-900 hover:text-red-500 hover:border-red-500 transition-all rounded text-[10px] uppercase font-bold tracking-[0.2em] flex items-center justify-center gap-2 mt-auto"
          >
            <Zap className="w-3 h-3" /> Purge Memory & Reboot
          </motion.button>
        </div>

        {/* Middle: Grid & Benchmarks */}
        <div className="xl:col-span-2 order-1 xl:order-2 space-y-6">
          <DungeonGrid 
            gridSize={gameState.grid_size}
            wallIndices={gameState.wall_indices}
            revealedIndices={gameState.revealed_indices}
            visibleIndices={gameState.visible_indices}
            entities={gameState.entities}
            onCellClick={movePlayer}
          />

          {gameState.stats && (
            <LLMBenchmark 
              benchmarks={gameState.stats.benchmarks} 
              currentMetrics={gameState.stats.last_llm_metrics} 
            />
          )}
        </div>

        {/* Right: Narrative */}
        <div className="xl:col-span-1 order-3 h-full">
          <NarrativeLog 
            history={gameState.narrative_history}
            isLoading={loading}
            turnCount={gameState.turn_count}
          />
        </div>

      </div>

      {/* Lab Footer */}
      <footer className="mt-12 text-center">
        <div className="inline-block px-4 py-1 border border-gray-900 rounded-full">
          <span className="text-[8px] text-gray-800 uppercase tracking-[0.5em]">
            Agentic Lab Environment • OpenClaw v0.2.0 • Stable Core
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
