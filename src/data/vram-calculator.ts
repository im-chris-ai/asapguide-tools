/**
 * ====================================================================
 * MAINTENANCE PLAN: LLM VRAM Calculator
 * Last Checked: 2026-05-29
 *
 * HOW TO ADD OR UPDATE A MODEL
 * ─────────────────────────────
 * When adding a new model, you MUST verify and fill in ALL fields below.
 * Do NOT rely on memory or guesswork — always check the official source.
 *
 * Required Fields (verify from HuggingFace config.json or model card):
 *   paramsBillion   → Total parameter count in billions
 *   layers          → num_hidden_layers
 *   hiddenSize      → hidden_size
 *   attentionHeads  → num_attention_heads
 *   kvHeads         → num_key_value_heads
 *   headDim         → head_dim (or hidden_size / num_attention_heads if not listed)
 *   vocabSize       → vocab_size
 *   embeddingsTied  → tie_word_embeddings (true/false)
 *   maxContext      → max_position_embeddings (the EXACT token count, e.g. 131072)
 *                     ⚠️  Do NOT use marketing values ("128K", "256K") — get the exact int!
 *                     ⚠️  Source: https://huggingface.co/<org>/<model>/blob/main/config.json
 *
 * Optional Fields (only if applicable):
 *   activeParamsBillion  → For MoE: active parameter count
 *   attentionLayers      → For hybrid models: number of standard attention layers
 *   localLayersCount     → For sliding window: number of local attention layers
 *   globalLayersCount    → For sliding window: number of global attention layers
 *   slidingWindowSize    → sliding_window token count
 *   globalHeadDim        → For models with different local/global head dims (e.g. Gemma 4)
 *   hasKVCache           → Set to false ONLY for pure SSM models (e.g. Mamba)
 *
 * GPU Checklist (verify from official product pages or TechPowerUp):
 *   vramGB       → Official VRAM in GB
 *   bandwidthGBs → Memory bandwidth in GB/s
 *   tflopsFP16   → FP16 TFLOPs (theoretical peak)
 *   tdpWatts     → TDP in Watts
 * ====================================================================
 */

export interface ModelPreset {
  id: string;
  name: string;
  paramsBillion: number;
  activeParamsBillion?: number;
  layers: number;
  attentionLayers?: number;
  hasKVCache?: boolean;
  hiddenSize: number;
  attentionHeads: number;
  kvHeads: number;

  // High-Precision Estimation Properties
  vocabSize?: number;
  embeddingsTied?: boolean;
  headDim?: number;
  globalHeadDim?: number;
  globalKVHeads?: number;
  localLayersCount?: number;
  globalLayersCount?: number;
  slidingWindowSize?: number;

  // Context Window
  /** Native max context length in tokens. Source: config.json max_position_embeddings */
  maxContext?: number;
}

export interface GPUPreset {
  id: string;
  name: string;
  vramGB: number;
  bandwidthGBs: number;
  tflopsFP16: number;
  tdpWatts: number;
}

export interface QuantOption {
  id: string;
  name: string;
  bytesPerParam: number;
  group: 'weights' | 'kv-cache';
}

export const MODELS: ModelPreset[] = [
  // ── Gemma 4 Series (2026) ──
  {
    id: 'gemma4-31b-dense',
    name: 'Gemma 4 31B Dense (31.0B)',
    paramsBillion: 31.0,
    layers: 60,
    hiddenSize: 5376,
    attentionHeads: 32,
    kvHeads: 16,
    headDim: 256,
    globalHeadDim: 512,
    globalKVHeads: 4,
    vocabSize: 262144,
    embeddingsTied: false,
    localLayersCount: 50,
    slidingWindowSize: 1024,
    globalLayersCount: 10,
    maxContext: 262144  // Source: hf.co/google/gemma-4-31b-it config.json
  },
  {
    id: 'gemma4-26b-moe',
    name: 'Gemma 4 26B MoE (25.2B)',
    paramsBillion: 26.0,
    activeParamsBillion: 3.8,
    layers: 30,
    hiddenSize: 2816,
    attentionHeads: 16,
    kvHeads: 8,
    headDim: 256,
    globalHeadDim: 512,
    globalKVHeads: 2,
    vocabSize: 262144,
    embeddingsTied: false,
    localLayersCount: 25,
    slidingWindowSize: 1024,
    globalLayersCount: 5,
    maxContext: 262144  // Source: hf.co/google/gemma-4-27b-it config.json
  },
  {
    id: 'gemma4-12b',
    name: 'Gemma 4 12B (12.0B)',
    paramsBillion: 12.0,
    layers: 48,
    hiddenSize: 3840,
    attentionHeads: 16,
    kvHeads: 8,
    headDim: 256,
    globalHeadDim: 512,
    globalKVHeads: 1,
    vocabSize: 262144,
    embeddingsTied: false,
    localLayersCount: 40,
    globalLayersCount: 8,
    slidingWindowSize: 1024,
    maxContext: 262144  // Source: hf.co/google/gemma-4-12b-it config.json
  },
  {
    id: 'gemma4-e4b',
    name: 'Gemma 4 E4B (8.0B)',
    paramsBillion: 8.0,
    activeParamsBillion: 4.5,
    layers: 42,
    hiddenSize: 2560,
    attentionHeads: 8,
    kvHeads: 2,
    headDim: 256,
    globalHeadDim: 512,
    globalKVHeads: 2,
    localLayersCount: 35,
    globalLayersCount: 7,
    slidingWindowSize: 512,
    vocabSize: 262144,
    embeddingsTied: false,
    maxContext: 131072  // Source: blog.google/technology/google-deepmind/gemma-4/
  },
  {
    id: 'gemma4-e2b',
    name: 'Gemma 4 E2B (5.1B)',
    paramsBillion: 5.1,
    activeParamsBillion: 2.3,
    layers: 35,
    hiddenSize: 1536,
    attentionHeads: 8,
    kvHeads: 1,
    headDim: 256,
    globalHeadDim: 512,
    globalKVHeads: 1,
    localLayersCount: 28,
    globalLayersCount: 7,
    slidingWindowSize: 512,
    vocabSize: 262144,
    embeddingsTied: false,
    maxContext: 131072  // Source: blog.google/technology/google-deepmind/gemma-4/
  },
  // ── Qwen Series (2025-2026) ──
  {
    id: 'qwen3.6-27b',
    name: 'Qwen 3.6-27B (27.0B)',
    paramsBillion: 27.0,
    layers: 64,
    attentionLayers: 16,
    hiddenSize: 5120,
    attentionHeads: 24,
    kvHeads: 4,
    headDim: 256,
    vocabSize: 248320,
    embeddingsTied: false,
    maxContext: 262144  // Source: hf.co/Qwen/Qwen3.6-27B config.json
  },
  {
    id: 'qwen3.6-35b-moe',
    name: 'Qwen 3.6-35B-A3B (35.0B)',
    paramsBillion: 35.0,
    activeParamsBillion: 12.0,
    layers: 40,
    attentionLayers: 10,
    hiddenSize: 2048,
    attentionHeads: 16,
    kvHeads: 2,
    headDim: 256,
    vocabSize: 248320,
    embeddingsTied: false,
    maxContext: 262144  // Source: hf.co/Qwen/Qwen3.6-35B-A3B config.json
  },
  {
    id: 'qwen3.5-27b',
    name: 'Qwen 3.5-27B (27.0B)',
    paramsBillion: 27.0,
    layers: 64,
    attentionLayers: 16,
    hiddenSize: 5120,
    attentionHeads: 24,
    kvHeads: 4,
    headDim: 256,
    vocabSize: 248320,
    embeddingsTied: false,
    maxContext: 262144  // Source: hf.co/Qwen/Qwen3.5-27B config.json
  },
  {
    id: 'qwen3.5-9b',
    name: 'Qwen 3.5-9B (9.0B)',
    paramsBillion: 9.0,
    layers: 32,
    attentionLayers: 8,
    hiddenSize: 4096,
    attentionHeads: 16,
    kvHeads: 4,
    headDim: 256,
    vocabSize: 248320,
    embeddingsTied: false,
    maxContext: 262144  // Source: hf.co/Qwen/Qwen3.5-9B config.json
  },
  {
    id: 'qwen3-32b',
    name: 'Qwen 3-32B (32.8B)',
    paramsBillion: 32.8,
    layers: 64,
    hiddenSize: 8192,
    attentionHeads: 64,
    kvHeads: 8,
    headDim: 128,
    vocabSize: 151936,
    embeddingsTied: false,
    maxContext: 32768   // Source: hf.co/Qwen/Qwen3-32B config.json (extendable to 131072 via YaRN)
  },
  {
    id: 'qwen3-14b',
    name: 'Qwen 3-14B (14.8B)',
    paramsBillion: 14.8,
    layers: 40,
    hiddenSize: 5120,
    attentionHeads: 40,
    kvHeads: 8,
    headDim: 128,
    vocabSize: 151936,
    embeddingsTied: false,
    maxContext: 32768   // Source: hf.co/Qwen/Qwen3-14B config.json (extendable to 131072 via YaRN)
  },

  // ── Mistral Series ──
  {
    id: 'mistral-small-3',
    name: 'Mistral Small 3.2 (24.0B)',
    paramsBillion: 24.0,
    layers: 64,
    hiddenSize: 12288,
    attentionHeads: 48,
    kvHeads: 8,
    headDim: 128,
    vocabSize: 131072,
    embeddingsTied: false,
    maxContext: 131072  // Source: hf.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506 config.json
  },
  {
    id: 'mistral-nemo-12b',
    name: 'Mistral Nemo 12B (12.0B)',
    paramsBillion: 12.0,
    layers: 40,
    hiddenSize: 5120,
    attentionHeads: 32,
    kvHeads: 8,
    headDim: 128,
    vocabSize: 131072,
    embeddingsTied: false,
    maxContext: 131072  // Source: hf.co/mistralai/Mistral-Nemo-Instruct-2407 config.json
  },
  {
    id: 'mamba-codestral-7b',
    name: 'Codestral Mamba 7B (SSM)',
    paramsBillion: 7.0,
    hasKVCache: false,
    layers: 64,
    hiddenSize: 4096,
    attentionHeads: 32,
    kvHeads: 8,
    vocabSize: 32768,
    maxContext: 256000  // Source: hf.co/mistralai/mamba-codestral-7B-v0.1 (SSM; validated at 256K)
  },

  // ── GPT-OSS Series ──
  {
    id: 'gpt-oss-20b',
    name: 'GPT-OSS 20B (21.0B)',
    paramsBillion: 21.0,
    layers: 24,
    hiddenSize: 2880,
    attentionHeads: 64,
    kvHeads: 8,
    headDim: 64,
    vocabSize: 201088,
    embeddingsTied: false,
    localLayersCount: 12,
    slidingWindowSize: 128,
    globalLayersCount: 12,
    maxContext: 131072  // Source: platform.openai.com/docs/models/gpt-oss-20b
  },

  // ── Phi-4 Series ──
  {
    id: 'phi-4',
    name: 'Phi-4 (14.7B)',
    paramsBillion: 14.7,
    layers: 40,
    hiddenSize: 5120,
    attentionHeads: 40,
    kvHeads: 10,
    headDim: 128,
    vocabSize: 200064,
    embeddingsTied: false,
    maxContext: 16384   // Source: hf.co/microsoft/phi-4 config.json
  },
  {
    id: 'phi-4-reasoning',
    name: 'Phi-4-reasoning / reasoning-plus (14.7B)',
    paramsBillion: 14.7,
    layers: 40,
    hiddenSize: 5120,
    attentionHeads: 40,
    kvHeads: 10,
    headDim: 128,
    vocabSize: 200064,
    embeddingsTied: false,
    maxContext: 32768   // Source: hf.co/microsoft/Phi-4-reasoning config.json
  },
  {
    id: 'phi-4-reasoning-vision',
    name: 'Phi-4-reasoning-vision (15.0B)',
    paramsBillion: 15.0,
    layers: 40,
    hiddenSize: 5120,
    attentionHeads: 40,
    kvHeads: 10,
    headDim: 128,
    vocabSize: 200064,
    embeddingsTied: false,
    maxContext: 16384   // Source: hf.co/microsoft/Phi-4-reasoning-vision config.json
  },
  {
    id: 'phi-4-mini',
    name: 'Phi-4-mini (3.8B)',
    paramsBillion: 3.8,
    layers: 32,
    hiddenSize: 3072,
    attentionHeads: 24,
    kvHeads: 8,
    headDim: 96,
    vocabSize: 200064,
    embeddingsTied: true,
    maxContext: 131072  // Source: hf.co/microsoft/Phi-4-mini-instruct config.json
  }
];

export const GPUS: GPUPreset[] = [
  // ── NVIDIA Blackwell (2025/2026) ──
  { id: 'rtx-5090-32g', name: 'Nvidia RTX 5090 (32GB)', vramGB: 32, bandwidthGBs: 1792, tflopsFP16: 340, tdpWatts: 575 },
  { id: 'rtx-5080-16g', name: 'Nvidia RTX 5080 (16GB)', vramGB: 16, bandwidthGBs: 896, tflopsFP16: 180, tdpWatts: 360 },
  { id: 'rtx-5070ti-16g', name: 'Nvidia RTX 5070 Ti (16GB)', vramGB: 16, bandwidthGBs: 896, tflopsFP16: 140, tdpWatts: 300 },
  { id: 'rtx-5070-12g', name: 'Nvidia RTX 5070 (12GB)', vramGB: 12, bandwidthGBs: 672, tflopsFP16: 110, tdpWatts: 250 },
  { id: 'rtx-5060ti-16g', name: 'Nvidia RTX 5060 Ti (16GB)', vramGB: 16, bandwidthGBs: 448, tflopsFP16: 95, tdpWatts: 180 },
  { id: 'rtx-5060-8g', name: 'Nvidia RTX 5060 (8GB)', vramGB: 8, bandwidthGBs: 448, tflopsFP16: 75, tdpWatts: 145 },
  { id: 'b200-192g', name: 'Nvidia B200 SXM (192GB)', vramGB: 192, bandwidthGBs: 8000, tflopsFP16: 2250, tdpWatts: 1000 },

  // ── NVIDIA Hopper & Ada Lovelace (2022-2024) ──
  { id: 'h200-141g', name: 'Nvidia H200 (141GB)', vramGB: 141, bandwidthGBs: 4800, tflopsFP16: 989, tdpWatts: 700 },
  { id: 'h100-80g', name: 'Nvidia H100 (80GB)', vramGB: 80, bandwidthGBs: 3350, tflopsFP16: 989, tdpWatts: 700 },
  { id: 'rtx-6000-ada', name: 'Nvidia RTX 6000 Ada (48GB)', vramGB: 48, bandwidthGBs: 960, tflopsFP16: 366, tdpWatts: 300 },
  { id: 'rtx-4090-24g', name: 'Nvidia RTX 4090 (24GB)', vramGB: 24, bandwidthGBs: 1008, tflopsFP16: 330, tdpWatts: 450 },
  { id: 'dual-rtx-4090-48g', name: 'Dual Nvidia RTX 4090 (48GB)', vramGB: 48, bandwidthGBs: 1008, tflopsFP16: 660, tdpWatts: 900 },
  { id: 'rtx-4080-16g', name: 'Nvidia RTX 4080 (16GB)', vramGB: 16, bandwidthGBs: 717, tflopsFP16: 195, tdpWatts: 320 },
  { id: 'rtx-4070tis-16g', name: 'Nvidia RTX 4070 Ti Super (16GB)', vramGB: 16, bandwidthGBs: 672, tflopsFP16: 142, tdpWatts: 285 },
  { id: 'rtx-4070-12g', name: 'Nvidia RTX 4070 (12GB)', vramGB: 12, bandwidthGBs: 504, tflopsFP16: 116, tdpWatts: 200 },
  { id: 'rtx-4060ti-16g', name: 'Nvidia RTX 4060 Ti (16GB)', vramGB: 16, bandwidthGBs: 288, tflopsFP16: 88, tdpWatts: 165 },
  { id: 'rtx-4060-8g', name: 'Nvidia RTX 4060 (8GB)', vramGB: 8, bandwidthGBs: 272, tflopsFP16: 60, tdpWatts: 115 },

  // ── NVIDIA Ampere (2020-2021) ──
  { id: 'rtx-3090-24g', name: 'Nvidia RTX 3090 (24GB)', vramGB: 24, bandwidthGBs: 936, tflopsFP16: 142, tdpWatts: 350 },
  { id: 'a100-80g', name: 'Nvidia A100 (80GB)', vramGB: 80, bandwidthGBs: 1935, tflopsFP16: 312, tdpWatts: 400 },
  { id: 'a100-40g', name: 'Nvidia A100 (40GB)', vramGB: 40, bandwidthGBs: 1555, tflopsFP16: 312, tdpWatts: 400 },
  { id: 'rtx-3060-12g', name: 'Nvidia RTX 3060 (12GB)', vramGB: 12, bandwidthGBs: 360, tflopsFP16: 57, tdpWatts: 170 },

  // ── AMD Radeon (RDNA 3) ──
  { id: 'rx-7900-xtx', name: 'Radeon RX 7900 XTX (24GB)', vramGB: 24, bandwidthGBs: 960, tflopsFP16: 122, tdpWatts: 355 },
  { id: 'rx-7800-xt', name: 'Radeon RX 7800 XT (16GB)', vramGB: 16, bandwidthGBs: 624, tflopsFP16: 76, tdpWatts: 263 },
  { id: 'rx-7700-xt', name: 'Radeon RX 7700 XT (12GB)', vramGB: 12, bandwidthGBs: 432, tflopsFP16: 56, tdpWatts: 245 },

  // ── Intel Arc (Alchemist & Battlemage) ──
  { id: 'arc-a770-16g', name: 'Arc A770 (16GB)', vramGB: 16, bandwidthGBs: 560, tflopsFP16: 39, tdpWatts: 225 },
  { id: 'arc-b580-12g', name: 'Arc B580 (12GB)', vramGB: 12, bandwidthGBs: 456, tflopsFP16: 50, tdpWatts: 190 },

  // ── Apple Silicon Unified Memory ──
  { id: 'mac-studio-128g', name: 'Apple Mac Studio (128GB Unified)', vramGB: 128, bandwidthGBs: 800, tflopsFP16: 54, tdpWatts: 150 },
  { id: 'mac-studio-64g', name: 'Apple Mac Studio (64GB Unified)', vramGB: 64, bandwidthGBs: 800, tflopsFP16: 54, tdpWatts: 150 }
];

export const QUANTIZATIONS: QuantOption[] = [
  // Weights quantizations
  { id: 'fp16', name: 'FP16 / BF16 (16-bit Standard)', bytesPerParam: 2.0, group: 'weights' },
  { id: 'q8_0', name: 'Q8_0 / INT8 (8-bit)', bytesPerParam: 1.0, group: 'weights' },
  { id: 'q6_k', name: 'Q6_K (6-bit)', bytesPerParam: 0.83, group: 'weights' },
  { id: 'q4_k_m', name: 'Q4_K_M / INT4 (4-bit)', bytesPerParam: 0.60, group: 'weights' },
  { id: 'mxfp4', name: 'MXFP4 (OCP Standard)', bytesPerParam: 0.516, group: 'weights' },
  { id: 'nvfp4', name: 'NVFP4 (NVIDIA Blackwell)', bytesPerParam: 0.53, group: 'weights' },
  { id: 'q2_k', name: 'Q2_K (2-bit)', bytesPerParam: 0.35, group: 'weights' },
  
  // KV Cache quantizations
  { id: 'kv-fp16', name: 'FP16 / BF16 (Default)', bytesPerParam: 2.0, group: 'kv-cache' },
  { id: 'kv-q8_0', name: 'Q8_0 / FP8 / INT8', bytesPerParam: 1.0, group: 'kv-cache' },
  { id: 'kv-q4_0', name: 'Q4_0 / INT4', bytesPerParam: 0.5, group: 'kv-cache' },
  { id: 'kv-nvfp4', name: 'NVFP4 (NVIDIA Blackwell)', bytesPerParam: 0.53, group: 'kv-cache' }
];
