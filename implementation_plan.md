# Implementation Plan: tools.asapguide.com

This document outlines the architectural plan, design guidelines, hosting details, and implementation steps for building the tools website, starting with the **MCP Config Merger** tool.

---

## User Review Required

Please review the finalized technical decisions, design rules, and features for the first tool.

> [!IMPORTANT]
> **Hosting & Infrastructure**: We will use **Cloudflare Pages**. It is dedicated to hosting static frontend applications (like our Astro build) and has unlimited free bandwidth. We will *not* need Cloudflare Workers, as all tool logic (including JSON merging/parsing) will run instantly in the user's browser, maximizing speed and privacy.
>
> **Design Rules ("Analytics Crisp")**:
> - Background: Crisp white / light grey surfaces (`#F7F8FA` and `#FFFFFF`).
> - Primary Text / Headlines: Deep charcoal (`#121418`).
> - Interaction Driver (Tertiary): Vibrant Iris blue/purple (`#5A4FE0`).
> - Typography: Inter (Display: 3.5rem, H1: 1.9rem, Body: 0.92rem, Label: 0.7rem).
> - **CRITICAL constraint**: Flat design, no gradients, and the Iris blue/purple (`#5A4FE0`) must be used for exactly *one* primary action button per screen.

---

## Open Questions

None currently. Once you approve this plan, we will proceed to set up the Astro project and implement the design system and first tool.

---

## Proposed Tech Stack & Project Setup

1. **Framework**: Astro (Static site output)
2. **Styling**: Vanilla CSS utilizing CSS Custom Properties mapped directly to the `design.md` tokens.
3. **Routing**: Page-based routing (`src/pages/index.astro` and `src/pages/mcp-merger.astro`).
4. **Development Tooling**: standard Node.js / npm environment.

---

## Proposed Changes

### Component: Core Architecture

#### [NEW] [astro.config.mjs](file:///c:/Coding%20Project/AsapGuide%20Tools/astro.config.mjs)
Configure Astro for fully static output (`output: 'static'`) and integrate sitemap generation.

#### [NEW] [package.json](file:///c:/Coding%20Project/AsapGuide%20Tools/package.json)
Standard dependencies for Astro, including `@astrojs/sitemap` for SEO.

### Component: Global Layout & Styles

#### [NEW] [global.css](file:///c:/Coding%20Project/AsapGuide%20Tools/src/styles/global.css)
Inject the typography, colors, padding, and roundness design tokens from [design.md](file:///c:/Coding%20Project/AsapGuide%20Tools/design.md):
```css
:root {
  --color-primary: #121418;
  --color-secondary: #6A6F77;
  --color-tertiary: #5A4FE0;
  --color-neutral: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-on-primary: #FFFFFF;
  
  --font-family: 'Inter', sans-serif;
  
  --rounded-sm: 4px;
  --rounded-md: 8px;
  --rounded-lg: 14px;
  
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
}
```

#### [NEW] [Layout.astro](file:///c:/Coding%20Project/AsapGuide%20Tools/src/layouts/Layout.astro)
The base layout wrapper containing SEO-friendly `<head>` tags:
- Universal Google Font loading for **Inter**.
- Metatags for title, description, robots, sitemap link, and OpenGraph.
- A clean, semantic header and footer (referencing asapguide.com and your AI YouTube channel).

---

### Component: First Tool - MCP JSON Config Merger

This tool will help Claude/Cursor users merge custom Model Context Protocol (MCP) server blocks into their existing `claude_desktop_config.json` without breaking JSON syntax.

#### [NEW] [mcp-merger.astro](file:///c:/Coding%20Project/AsapGuide%20Tools/src/pages/mcp-merger.astro)
An interactive page featuring:
1. **Instruction Panel**: Clean steps explaining where the `claude_desktop_config.json` is stored on Windows and macOS, with a fast copy shortcut for the path.
2. **Visual Editor UI**:
   - **Left Panel (Existing Config)**: A text area for pasting the current JSON (optional, defaults to an empty template if blank).
   - **Right Panel (New Server Config)**: A text area for pasting the new MCP server config (can accept a full JSON configuration, or just the single server entry).
3. **Error Validation Engine**: Real-time validation checks for JSON syntax, alerting users with highlighted warnings for trailing commas, unbalanced braces, or missing quotation marks.
4. **Merge Logic**:
   - Parses both inputs.
   - Extracts server definitions (usually under the `"mcpServers"` key, but automatically detects if they paste a raw single server object instead).
   - Combines them under a single `"mcpServers"` object.
   - If a duplicate server name exists, prompts user options: *Overwrite*, *Keep Both (Rename)*, or *Skip*.
   - Outputs the formatted, validated JSON string.
5. **Primary Action**: A single, prominent Tertiary-colored (`#5A4FE0`) button: **"Copy Merged Config"** or **"Download config.json"**.
6. **Semantic Guide Section**: A comprehensive article detailing:
   - What the Model Context Protocol is.
   - How Claude Desktop uses this configuration.
   - Example server configurations (like filesystem, postgres, google-maps) to help users understand what to paste.

---

### Component: Homepage / Dashboard

#### [NEW] [index.astro](file:///c:/Coding%20Project/AsapGuide%20Tools/src/pages/index.astro)
- A minimalist showcase of tools.
- A search and filter bar.
- A card leading to the **MCP Config Merger**.
- Cards styled with paper-white surfaces (`#FFFFFF`), deep text (`#121418`), and subtle border dividers.

---

## Verification Plan

### Manual Verification
- Paste standard, valid, and malformed JSON into the editor.
- Test edge cases:
  - Merging duplicate server keys.
  - Parsing fragmented JSON configs (e.g. just a server body vs. full file).
  - Validation response times and responsiveness across mobile devices.
- Verify that only *one* primary button per screen uses the Accent color (`#5A4FE0`).
