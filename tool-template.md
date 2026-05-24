# AsapGuide Tools - Page Template & Guidelines

This document serves as the structural blueprint for creating any new tool page on AsapGuide Tools. Following this guarantees a consistent UI that aligns with the "Meta" design system and the established homepage aesthetic. Read this file whenever asked to create a new tool page.

## 1. Page Structure

Every tool page must follow a **White Hero → Grey Workspace → White SEO Guide** flow. 
The global `<body>` background is `var(--color-neutral)` (Grey), so the hero and guide sections need an explicit white background.

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="..." description="...">
  
  <!-- 1. Full-width White Hero -->
  <div class="tool-hero">
    ...
  </div>

  <!-- 2. Grey Workspace Container -->
  <div class="workspace">
    ...
  </div>

  <!-- 3. White SEO Guide (Bottom) -->
  <div class="guide-wrap">
    ...
  </div>

</Layout>
```

## 2. The Hero Section
The hero must span full-width, have a white surface, and feature the 2-line Fraunces serif headline (with a blue italic accent).

**HTML:**
```html
<div class="tool-hero">
  <p class="eyebrow">AI Tools</p>
  <h1 class="tool-title">Tool <em class="accent">Name</em> Here</h1>
  <p class="tool-desc">Short description of what the tool does.</p>
</div>
```

**Category Rule:**
The `.eyebrow` text MUST perfectly match one of our official categories:
- `AI Tools`
- `Developer Tools`
- `Utilities`

**Key CSS classes:**
- `.tool-hero`: `background: var(--color-surface); padding: 64px 24px 56px; text-align: center; border-bottom: 1px solid var(--color-border);`
- `.tool-title`: `font-family: var(--font-serif); font-size: clamp(2.6rem, 5vw, 4rem); font-weight: 800; color: var(--color-primary); letter-spacing: -0.025em;`
- `.accent`: `font-style: italic; color: var(--color-tertiary);`

## 3. The Workspace
The workspace holds the interactive tool logic. It sits on the neutral background and is constrained to a max-width.

**HTML:**
```html
<div class="workspace">
  <!-- Tool components go here -->
</div>
```

**Key CSS classes:**
- `.workspace`: `max-width: 1140px; margin: 0 auto; padding: 40px 24px 64px; display: flex; flex-direction: column; gap: 20px;`

## 4. UI Components

### Panels & Editor Grids
For side-by-side inputs (like comparison tools or editors):
```html
<div class="editor-grid">
  <div class="editor-panel">
    <div class="panel-bar">
      <div class="panel-bar-left">
        <span class="step-num">1</span>
        <h2>Panel Title</h2>
      </div>
      <div class="panel-bar-right">
        <!-- Compact Buttons -->
      </div>
    </div>
    <!-- Inputs / Textareas -->
  </div>
</div>
```

- panel-bar flexbox MUST use `flex-wrap: nowrap` and elements inside should have `white-space: nowrap` so titles and buttons never break into multiple lines.

### Buttons
Maintain uniform compact sizing across panel bars.
- **Ghost Buttons (`.btn-ghost`)**: For secondary actions. `padding: 6px 12px; font-size: 0.8rem; background: var(--color-surface); border: 1px solid var(--color-border);`. Must include `text-transform: none; letter-spacing: 0; display: inline-flex;` to prevent global `<label>` or button styles from bleeding in.
- **Primary Buttons (`.btn-primary`)**: For primary actions. When placed inside `.panel-bar-right`, override the padding/font-size to match the ghost buttons (`padding: 6px 12px; font-size: 0.8rem; border-radius: var(--rounded-sm);`) so heights align perfectly in the same row.

### Inputs & Textareas
All inputs must use `background: var(--color-surface)` and `border: 1px solid var(--color-border)`. On focus, use a blue ring:
```css
textarea:focus, input:focus {
  border-color: var(--color-tertiary);
  box-shadow: 0 0 0 3px rgba(8,102,255,0.1);
  outline: none;
}
```

## 5. SEO Article Section
Every tool needs an educational article at the bottom for SEO. This section must have a white background spanning full-width, with a constrained content column inside.

**HTML:**
```html
<div class="guide-wrap">
  <article class="seo-guide">
    <h2>Article Title</h2>
    <p>Body copy...</p>
  </article>
</div>
```

**Key CSS classes:**
- `.guide-wrap`: `background: var(--color-surface); border-top: 1px solid var(--color-border);`
- `.seo-guide`: `max-width: 1140px; margin: 0 auto; padding: 48px 24px 64px;`

## 6. Defensive CSS & UI Robustness

To ensure tools never break layout autonomously, ALWAYS apply these defensive CSS rules:

1. **Flexbox Wrapping:** Any `.panel-bar` or flex row containing variable-length text/tags must be able to wrap gracefully on small screens (`flex-wrap: wrap`) or child elements must be allowed to shrink (`min-width: 0`).
2. **Safe Truncation:** Any element using `white-space: nowrap` must be paired with `overflow: hidden`, `text-overflow: ellipsis`, and have a `max-width` boundary so it truncates instead of blowing out the container.
3. **Generous Grid Minimums:** When using `grid-template-columns: repeat(auto-fit, minmax(X, 1fr))`, ensure `X` is wide enough to handle multi-word titles and tags without overflowing (e.g., use a `200px` minimum for stat cards, not `150px`).

## 7. The Input Container Focus Pattern

When combining an input (like a `<textarea>`) with an attached toolbar or footer (like character counts) in a single visual block, NEVER use separate borders and focus rings on the input.

**HTML:**
Wrap them in `.input-container` so the focus ring applies to the entire group:
```html
<div class="input-container">
  <textarea id="text-input" spellcheck="false" placeholder="Paste text..."></textarea>
  
  <div class="input-footer">
    <span><strong id="val-chars">0</strong> Characters</span>
  </div>
</div>
```

**Key CSS:**
Apply borders and `:focus-within` to the container, and remove borders from the textarea:
```css
.input-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--rounded-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Important so children don't bleed out of rounded corners */
}
.input-container:focus-within {
  border-color: var(--color-tertiary);
  box-shadow: 0 0 0 3px rgba(8,102,255,0.1);
}
textarea {
  background: transparent;
  border: none;
  outline: none;
}
.input-footer {
  background: transparent;
  border-top: 1px solid var(--color-border);
}
```

## 8. The Stats Grid Pattern

Whenever a tool needs to display outputs, metrics, or comparisons (like token counts or costs), use the `.stats-grid` and `.stat-card` pattern instead of raw text.

**HTML:**
```html
<div class="stats-grid">
  <div class="stat-card">
    <div class="stat-header">
      <h3>Metric Title</h3>
      <span class="model-tag">Tag</span>
    </div>
    <div class="stat-value">0</div>
    <div class="stat-sub">Subtitle explanation</div>
  </div>
</div>
```

**Key CSS classes:**
- `.stats-grid`: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;` (Use exact counts like 3 or 4 for desktop, dropping to `1fr` on mobile media queries to avoid orphan cards).
- `.stat-card`: `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--rounded-lg); padding: 20px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.02);`
- `.stat-value`: `font-family: var(--font-family); font-size: 2.2rem; font-weight: 700; color: var(--color-primary); line-height: 1;`

## 9. Symmetrical Sub-Toolbar & Decluttering Pattern

When designing side-by-side workspace editors, keep the primary panel headers clean by restricting them to titles and at most two high-level buttons (e.g. `Download` and `Copy`). 

Place detailed formatting controls, dropdowns, and toggles inside a dedicated `.editor-toolbar` sub-header nested inside the `.input-container`. To maintain vertical alignment and symmetry, add toolbars to both containers:
- **Left/Input Toolbar**: Displays a label tag (e.g. `Source Editor`) and secondary actions (e.g. `Sample`, `Clear`).
- **Right/Output Toolbar**: Displays segmented mode controls (`Beautify`/`Minify`) and select dropdowns.

**HTML:**
```html
<div class="input-container">
  <div class="editor-toolbar">
    <span class="toolbar-label">Source Editor</span>
    <div class="toolbar-actions">
      <button class="btn-toolbar">Action</button>
    </div>
  </div>
  <textarea></textarea>
</div>
```

**Key CSS:**
- `.editor-toolbar`: `display: flex; align-items: center; justify-content: space-between; background: #F5F7FA; border-bottom: 1px solid var(--color-border); padding: 6px 12px; min-height: 40px;`
- `.toolbar-label`: `font-size: 0.72rem; font-weight: 700; color: var(--color-secondary); text-transform: uppercase; letter-spacing: 0.05em;`
- `.btn-toolbar`: `background: none; border: 1px solid transparent; font-size: 0.76rem; font-weight: 600; padding: 3px 8px; color: var(--color-secondary);`

## 10. Segmented State Control Pattern

Avoid placing loose state-toggling buttons inside headers. Instead, group mutually exclusive state controls (like `Beautify` vs `Minify` or `OS Windows` vs `OS Mac`) into a segmented control:

**HTML:**
```html
<div class="segmented-control">
  <button class="segment-btn active">Option A</button>
  <button class="segment-btn">Option B</button>
</div>
```

**Key CSS:**
- `.segmented-control`: `display: flex; background: rgba(28, 43, 51, 0.06); padding: 2px; border-radius: var(--rounded-sm);`
- `.segment-btn`: `background: none; border: none; font-size: 0.74rem; font-weight: 600; padding: 4px 10px; border-radius: 4px;`
- `.segment-btn.active`: `background: var(--color-surface); color: var(--color-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.08);`

## 11. Astro HTML Curly Braces Safety

Because Astro parses HTML templates as JSX, any raw curly braces `{` or `}` written in plain HTML (such as in documentation, code snippet labels, or mock templates) will trigger compilation failures if they contain characters like colons (e.g., `<code>{"key": "val"}</code>`).

**Prevention Rule:**
Always escape raw curly braces inside HTML markup by wrapping them in Astro template literal expressions:
`<code>{`{"key": "val"}`}</code>`

## 12. Branding & Navigation Constraints

Do not introduce external links pointing back to main sites or landing directories in the tool headers/footers unless explicitly requested. Keep the layout focused exclusively on the utility index.

## 13. Script Lifecycles & View Transitions (Instant Routing)

Because the site uses Astro's `<ClientRouter />` to transition between pages without refreshing the browser:
- **Rule**: All `<script>` tags that control interactive tools MUST include the `data-astro-rerun` attribute:
  ```astro
  <script data-astro-rerun>
    // Tool interactive logic here
  </script>
  ```
- **Global Event Listeners**: If your script binds event listeners to global scopes like `document` or `window`, you must check for and clean up old handlers so they do not stack up on page transition:
  ```javascript
  if (window._myHandler) {
    document.removeEventListener('keydown', window._myHandler);
  }
  window._myHandler = (e) => { ... };
  document.addEventListener('keydown', window._myHandler);
  ```


