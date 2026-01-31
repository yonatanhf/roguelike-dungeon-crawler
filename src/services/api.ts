import axios from 'axios';
import { GameState, ActionPayload } from '../types/game';

const API_BASE = '/api';
const WS_BASE = `ws://${window.location.host}/ws`;

export const api = {
  startGame: async (): Promise<GameState> => {
    const response = await axios.post(`${API_BASE}/start`);
    return response.data;
  },

  performAction: async (payload: ActionPayload): Promise<GameState> => {
    const response = await axios.post(`${API_BASE}/action`, payload);
    return response.data;
  },

  getState: async (): Promise<GameState> => {
    const response = await axios.get(`${API_BASE}/state`);
    return response.data;
  },

  updateConfig: async (config: any): Promise<GameState> => {
    const response = await axios.post(`${API_BASE}/config`, config);
    return response.data;
  },

  updateSecrets: async (secrets: any): Promise<GameState> => {
    const response = await axios.post(`${API_BASE}/secrets`, secrets);
    return response.data;
  },

  createTelemetrySocket: () => {
    return new WebSocket(`${WS_BASE}/telemetry`);
  }
};
