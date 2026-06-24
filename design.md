---
version: alpha
name: Meta
description: Photography-first. Binary light/dark. Meta-Blue CTAs.
colors:
  primary: "#1C2B33"
  secondary: "#606770"
  tertiary: "#0866FF"
  neutral: "#F0F2F5"
  surface: "#FFFFFF"
  on-primary: "#FFFFFF"
  error: "#E41749"
  success: "#1DA462"
  warning: "#F5A623"
  border: "rgba(28, 43, 51, 0.1)"
typography:
  display:
    fontFamily: var(--font-family)
    fontSize: 4.75rem
    fontWeight: 700
    letterSpacing: "-0.03em"
  h1:
    fontFamily: var(--font-family)
    fontSize: 2.3rem
    fontWeight: 600
  body:
    fontFamily: var(--font-family)
    fontSize: 0.96rem
    lineHeight: 1.55
  label:
    fontFamily: var(--font-family)
    fontSize: 0.78rem
    fontWeight: 600
    letterSpacing: "0"
  fonts:
    primary: "'Inter', system-ui, -apple-system, sans-serif"
    serif: "'Fraunces', Georgia, serif"
rounded:
  sm: 6px
  md: 8px
  lg: 14px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 20px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
---
## Overview

Meta: photography-first retail store, binary light/dark surfaces, saturated Meta-blue CTAs. Includes interactive components like styled checkboxes, sliders, and searchable comboboxes.

## Colors

The palette is built around high-contrast neutrals and a single accent that drives interaction.

- **Primary (`#1C2B33`):** Headlines and core text.
- **Secondary (`#606770`):** Borders, captions, and metadata.
- **Tertiary (`#0866FF`):** The sole driver for interaction. Reserve it.
- **Neutral (`#F0F2F5`):** The page foundation.
- **Semantic Colors:** Added Error (`#E41749`), Success (`#1DA462`), and Warning (`#F5A623`) for status indications.

## Typography

- **Primary Font Family:** `'Inter', system-ui, -apple-system, sans-serif`
- **Serif Font Family:** `'Fraunces', Georgia, serif` (Used for tool titles and specific accents)

- **display:** 4.75rem (700)
- **h1:** 2.3rem (600)
- **body:** 0.96rem (1.55 line-height)
- **label:** 0.78rem (600)

## New UI Components

### 1. Styled Checkboxes (`.styled-checkbox`)
Custom-designed checkboxes that replace the default browser appearance.
- **Appearance:** 16x16px with a `1.5px solid #cbd5e1` border, 4px border-radius.
- **Active State:** When checked, background and border turn to Tertiary (`#0866FF`), with a custom white checkmark created via CSS pseudo-elements.
- **Focus:** Subtle Tertiary outline on keyboard focus (`box-shadow: 0 0 0 2px rgba(8, 102, 255, 0.2)`).

### 2. Sliders (`.slider`)
A clean, minimal range input.
- **Track:** 6px height with a subdued background (`rgba(28, 43, 51, 0.08)`).
- **Thumb:** 18x18px circular Tertiary thumb (`#0866FF`) with a subtle shadow (`box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15)`).
- **Interaction:** The thumb scales up on hover (`transform: scale(1.2)`).

### 3. Searchable Dropdown / Combobox (`.custom-select-container`)
A complex UI component for dropdowns with built-in search.
- **Structure:** Uses a `.custom-select-container` wrapping a text input (`.custom-select-search-input`), a custom chevron arrow (`.custom-select-arrow`), and an absolute-positioned dropdown list (`.custom-select-dropdown`).
- **Interaction:** Typing in the input filters the `.custom-select-options`. Selected options have a subtle background tint (`rgba(8, 102, 255, 0.08)`) and bolded text in Tertiary color.
- **Focus/Open State:** Outline glows with the Tertiary color and a soft shadow (`box-shadow: 0 0 0 3px rgba(8, 102, 255, 0.1)`).

## Do's and Don'ts

- **Do** use Tertiary for exactly one action per screen.
- **Do** let Neutral carry the composition — negative space is a feature.
- **Do** use the new custom form controls for a consistent cross-browser experience.
- **Don't** introduce gradients. This system is flat on purpose.
- **Don't** mix Tertiary with alternate accents; the single-accent rule is load-bearing.
