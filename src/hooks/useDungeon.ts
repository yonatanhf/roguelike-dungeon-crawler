import { useState, useCallback, useEffect } from 'react';
import { api } from '../services/api';
import { GameState } from '../types/game';

export const useDungeon = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.startGame();
      setGameState(data);
    } catch (err) {
      setError('Failed to initialize neural core.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const movePlayer = useCallback(async (targetIndex: number) => {
    if (!gameState) return;
    
    // Optimistic check: Don't move into walls locally to save an API call
    if (gameState.wall_indices.includes(targetIndex)) return;

    setLoading(true);
    try {
      const data = await api.performAction({ action: 'explore', target: targetIndex });
      setGameState(data);
    } catch (err) {
      setError('Neural sync interrupted.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [gameState]);

  const updateConfig = useCallback(async (newConfig: any) => {
    setLoading(true);
    try {
      const data = await api.updateConfig(newConfig);
      setGameState(data);
    } catch (err) {
      setError('Failed to update config.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSecrets = useCallback(async (newSecrets: any) => {
    setLoading(true);
    try {
      const data = await api.updateSecrets(newSecrets);
      setGameState(data);
    } catch (err) {
      setError('Identity verification failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Socket Telemetry
  useEffect(() => {
    if (!gameState) return;
    
    const socket = api.createTelemetrySocket();
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'STATE_UPDATE') {
        setGameState(data.payload);
      }
    };

    return () => socket.close();
  }, [!!gameState]);

  // Keyboard Controls
  useEffect(() => {
    if (!gameState || loading) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const player = gameState.entities.find(ent => ent.type === 'player');
      if (!player) return;

      const dim = Math.sqrt(gameState.grid_size);
      const x = player.position % dim;
      const y = Math.floor(player.position / dim);
      let target = -1;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (y > 0) target = player.position - dim;
          break;
        case 'ArrowDown':
        case 's':
          if (y < dim - 1) target = player.position + dim;
          break;
        case 'ArrowLeft':
        case 'a':
          if (x > 0) target = player.position - 1;
          break;
        case 'ArrowRight':
        case 'd':
          if (x < dim - 1) target = player.position + 1;
          break;
      }

      if (target !== -1) {
        movePlayer(target);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, loading, movePlayer]);

  return {
    gameState,
    loading,
    error,
    initGame,
    movePlayer,
    updateConfig,
    updateSecrets
  };
};
