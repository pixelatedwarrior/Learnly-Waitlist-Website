# Lernly Waitlist Design System

This document outlines the design principles, tokens, and components that maintain the visual identity of the Lernly waitlist website.

---

## 1. Visual Theme & Atmosphere
The design aims to evoke the feeling of a **Stationery/Academic Journal**. It balances modern SaaS efficiency with a high-end, tactile, and human experience.

*   **Aesthetic:** Stationery / Editorial (Minimalist with organic textures).
*   **Density:** Spacious (High use of whitespace to reduce cognitive load).
*   **Tone:** Sophisticated, Focused, and Trusted.

---

## 2. Color Palette & Roles (Tokens)
We use a primary "Paper & Ink" palette with secondary accents for interaction and brand warmth.

### Brand Colors
*   `learnly-bg`: `#fff8f2` (Warm off-white background)
*   `learnly-ink`: `#1e1b16` (Deep charcoal, used for heavy text)
*   `learnly-primary`: `#8B5CF6` (Violet - used for CTAs and main emphasis)
*   `learnly-secondary`: `#855300` (Earthy brown - used for subtle depth)
*   `learnly-surface`: `#f5ede4` (Subtle grey-tan for card backgrounds)

### Semantic Tokens
*   **Success**: Default Tailwind `green-500`
*   **Warning**: `#fea619` (Highlighter gold)
*   **Error**: Default Tailwind `red-500`
*   **Highlight**: `#fea619` with 20% opacity (Used for `.ink-highlighter`)

---

## 3. Typography Rules
Typography is the core of our "Journal" identity. We pair a high-quality serif for prestige with a modern sans-serif for clarity.

### Font Families
*   **Serif (Display/Headings)**: `Newsreader`
*   **Sans (Body/Utility)**: `Plus Jakarta Sans`

### Type Scale
| Level | Font Family | Size | Weight | Tracking |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | Newsreader | 72px (4.5rem) | 400 (Italic) | -0.02em |
| **H2** | Newsreader | 48px (3rem) | 400 (Medium) | -0.01em |
| **Body (LG)** | Jakarta Sans | 20px (1.25rem) | 400 | Normal |
| **Body (MD)** | Jakarta Sans | 16px (1rem) | 400 | Normal |
| **Labels** | Jakarta Sans | 12px (0.75rem) | 700 (Bold) | 0.2em (Caps) |

---

## 4. Layout Principles & Spacing
We follow a 32px base grid system, celebrated with visible dot patterns in the background.

*   **Spacing Scale:** 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 128px.
*   **Grid System:** 12-column flex/grid system; Max-width container of `1280px` (`max-w-7xl`).
*   **Dot Grid Background:** `radial-gradient(circle, rgba(30, 27, 22, 0.12) 1.2px, transparent 1.2px)` at `32px` intervals.

---

## 5. Component Stylings

### Buttons
*   **Primary**: `rounded-full`, `px-8 py-4`, `bg-learnly-primary`, `text-white`.
*   **Shadow**: `journal-shadow`.
*   **Hover**: `scale-105`, `transition-all`.

### Inputs
*   **Style**: `rounded-full`, `bg-white`, `border-none`.
*   **Shadow**: `journal-shadow`.
*   **Focus State**: `ring-2 ring-learnly-primary`.

### Cards
*   **Container**: `bg-white`, `rounded-[2rem]`, `p-8`.
*   **Hand-drawn Feel**: Use `.asymmetric-border` (`border-radius: 2% 98% 3% 97% / 96% 4% 94% 6%`) for subtle organic variations.
*   **Decoration**: `border-l-[12px] border-orange-200/30` for internal card sidebars.

---

## 6. Depth & Elevation
Depth is created through soft, wide shadows and subtle noise textures rather than heavy gradients.

*   **Shadow (`journal-shadow`)**: `box-shadow: 0 10px 40px -10px rgba(30, 27, 22, 0.08)`.
*   **Texture (`paper-texture`)**: SVG fractal noise filter at 3% opacity.
*   **Z-index Strategy**:
    *   Base: 0
    *   Interactive: 10
    *   Floating Accents: 20

---

## 7. Do's and Don'ts

*   **Do**: Use `italic` for H1/Display elements to humanize the tech.
*   **Do**: Always use `sentence case` for headings.
*   **Do**: Mix textures (Grain + Dot Grid) to achieve the "Stationery" look.
*   **Don't**: Use standard square buttons. Always use `rounded-full`.
*   **Don't**: Use pure black `#000`. Only use `learnly-ink` for text.
*   **Don't**: Over-animate. Stick to smooth, spring-based entrances.

---

## 8. Responsive Behavior

*   **Breakpoints**:
    *   Mobile: `< 640px`
    *   Tablet: `< 768px`
    *   Desktop: `> 1024px`
*   **Behaviors**:
    *   Waitlist form collapses from Row to Column on mobile.
    *   Features Grid switches from 3 columns to 1 column.
    *   Hero font size adjusts from `7xl` to `5xl`.
