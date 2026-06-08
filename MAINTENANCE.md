# AsapGuide Tools - Codebase Maintenance Guide

This document outlines the global architectural patterns, codebase organization, and workflows for adding and maintaining tools on `tools.asapguide.com`.

---

## 1. Directory Structure & Architecture

To scale to hundreds of tools, the codebase decouples layout, tool logic, and registry metadata. Each tool has a single configuration/data file:

```text
/src
├── data/
│   ├── tools.ts                    # Central Tool Registry (homepage source of truth)
│   └── [tool-id].ts                # Consolidated data, presets, and maintenance checklist for a tool
├── layouts/
│   └── Layout.astro                # Universal wrapper, SEO headers, footer
├── styles/
│   └── global.css                  # Global tokens and design system utilities
└── pages/
    ├── index.astro                 # Homepage (dynamically maps over tools.ts)
    └── [tool-name].astro           # Main tool page wrapper
```

---

## 2. Tool Lifecycle Classifications

Tools must be classified into one of two groups:

1.  **Static Utilities** (`static`): Self-contained tools that operate on standard algorithms (e.g. Case Converter, JSON Formatter). They require **zero maintenance**.
2.  **Model-Dependent Tools** (`model-dependent`): Tools that rely on live AI schemas, model configurations, or hardware specs. They require **periodic data updates** (typically monthly).

---

## 3. Workflow: Monthly Maintenance Run

For any AI-driven or developer-driven maintenance cycle (recommended monthly), follow this execution model:

### Step 1: Scan for Tool Config Files
Look at all data configurations under `src/data/` (excluding `tools.ts`).

### Step 2: Read the Local Tool Checklist
For each config file (e.g., `src/data/vram-calculator.ts`), read the **header comment block** at the top of the file to understand:
*   What live specs need research (e.g. GPU releases, new model configurations).
*   Which arrays in the file to update (e.g. `MODELS`, `GPUS`).
*   Which external websites or search keywords to check.

### Step 3: Research, Update, and Log
1.  Run the web searches or API checks defined in the header comment checklist.
2.  Update the data arrays directly inside the file with the new specs.
3.  Update the **`Last Checked`** timestamp in the header comment block.

---

## 4. Workflow: Adding a New Tool

To add a new utility to the platform, follow this workflow:

1.  **Create the Astro Page**: Create `src/pages/your-tool-name.astro` matching the layout patterns in [tool-template.md](file:///c:/Coding%20Project%20AsapGuide%20Tools/tool-template.md).
2.  **Register in the Central Tool Registry (`src/data/tools.ts`)**: Add your tool details to the export list in `src/data/tools.ts`. The homepage will automatically render the card.
3.  **Create Config File (if Model-Dependent)**: If the tool has data presets or requires updates, create `src/data/your-tool-name.ts` with a header maintenance checklist and corresponding configuration data.

---

## 5. Maintenance Verification Checklist

Before committing any updates:
1.  Run `npm run build` to verify standard compile checks pass.
2.  Open the local dev server (`npm run dev`) and test dropdown/slider ranges on mobile and desktop viewports.
3.  Ensure visual elements strictly respect the design system tokens in [design.md](file:///c:/Coding%20Project%20AsapGuide%20Tools/design.md).
