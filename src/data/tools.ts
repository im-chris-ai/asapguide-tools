export interface ToolEntry {
  id: string;
  title: string;
  description: string;
  path: string;
  category: 'ai-tools' | 'developer-tools' | 'utilities';
  lifecycle: 'static' | 'model-dependent';
  tags: string[];
  titleSearch: string;
  status: 'live' | 'soon';
}

export const TOOLS: ToolEntry[] = [
  {
    id: 'mcp-merger',
    title: 'MCP Config Merger',
    description: 'Combine MCP server configs into one valid JSON — no manual editing required.',
    path: '/mcp-merger',
    category: 'ai-tools',
    lifecycle: 'model-dependent',
    tags: ['ai-tools', 'developer-tools'],
    titleSearch: 'mcp json config merger',
    status: 'live'
  },
  {
    id: 'vram-calculator',
    title: 'LLM VRAM Calculator',
    description: 'Estimate VRAM requirements and check hardware compatibility for running LLMs locally.',
    path: '/vram-calculator',
    category: 'ai-tools',
    lifecycle: 'model-dependent',
    tags: ['ai-tools', 'developer-tools'],
    titleSearch: 'llm vram calculator gpu memory local running deepseek llama',
    status: 'live'
  },
  {
    id: 'token-counter',
    title: 'LLM Token Counter',
    description: 'Estimate token usage for GPT-4o, Claude, and Gemini instantly.',
    path: '/token-counter',
    category: 'ai-tools',
    lifecycle: 'model-dependent',
    tags: ['ai-tools'],
    titleSearch: 'llm token counter gpt-4o claude gemini',
    status: 'live'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Beautify, minify, and validate JSON instantly.',
    path: '/json-formatter',
    category: 'developer-tools',
    lifecycle: 'static',
    tags: ['developer-tools'],
    titleSearch: 'json formatter beautifier minifier',
    status: 'live'
  },
  {
    id: 'html-viewer',
    title: 'HTML Viewer',
    description: 'Instantly preview your HTML, CSS, and JS in a live sandbox.',
    path: '/html-viewer',
    category: 'developer-tools',
    lifecycle: 'static',
    tags: ['developer-tools'],
    titleSearch: 'html viewer preview sandbox live',
    status: 'live'
  },
  {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text to camelCase, snake_case, Title Case, and more.',
    path: '/case-converter',
    category: 'utilities',
    lifecycle: 'static',
    tags: ['utilities'],
    titleSearch: 'text case converter upper lower title',
    status: 'live'
  },
  {
    id: 'text-to-file',
    title: 'Text to File Converter',
    description: 'Convert and download raw text into multiple formats like TXT, MD, PDF, DOCX, HTML, JSON, or CSV with instant validation.',
    path: '/text-to-file',
    category: 'utilities',
    lifecycle: 'static',
    tags: ['utilities', 'developer-tools'],
    titleSearch: 'text to file converter download pdf docx markdown csv json text',
    status: 'live'
  },
  {
    id: 'lm-studio-tester',
    title: 'LM Studio Server Tester',
    description: 'Test connection, load/unload models, and chat with your local LM Studio instance directly from the browser.',
    path: '/lm-studio-tester',
    category: 'ai-tools',
    lifecycle: 'model-dependent',
    tags: ['ai-tools', 'developer-tools'],
    titleSearch: 'lm studio server tester local endpoint chat model load unload stream',
    status: 'live'
  }
];
