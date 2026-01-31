export type EntityType = 'player' | 'monster' | 'npc' | 'item';

export interface Entity {
  id: string;
  type: EntityType;
  position: number;
  hp: number;
  max_hp: number;
  metadata: Record<string, any>;
}

export interface LLMMetrics {
  provider: string;
  model: string;
  latency_ms: number;
  instruction_score: number;
  context_adherence: number;
  tokens_generated: number;
}

export interface BenchmarkMetric {
  name: string;
  category: string;
  description: string;
  sota_model: string;
  sota_score: number;
  unit: string;
}

export interface BenchmarkData {
  name: string;
  metrics: BenchmarkMetric[];
  lab_score: number;
}

export interface LabStats {
  swarm_cohesion: number;
  memory_depth: number;
  entropy_level: number;
  active_agents: number;
  computation_time_ms: number;
  last_llm_metrics?: LLMMetrics;
  benchmarks: BenchmarkData;
}

export interface LabConfig {
  visibility_radius: number;
  swarm_aggression: number;
  memory_recall_limit: number;
  llm_temperature: number;
}

export interface Span {
  name: string;
  input_data: string;
  output_data: string;
  duration_ms: number;
}

export interface LabSecrets {
  openai_api_key?: string;
  anthropic_api_key?: string;
  gemini_api_key?: string;
  huggingface_token?: string;
  active_provider: string;
}

export interface UserProfile {
  id: string;
  subscription_status: string;
  credits_remaining: number;
  usage_tier: string;
}

export interface GameState {
  entities: Entity[];
  grid_size: number;
  wall_indices: number[];
  revealed_indices: number[];
  visible_indices: number[];
  narrative_history: string[];
  system_logs: string[];
  recent_spans: Span[];
  turn_count: number;
  memories: any[];
  stats: LabStats;
  config: LabConfig;
  secrets: LabSecrets;
  user: UserProfile;
}

export interface ActionPayload {
  action: string;
  target: number;
}
