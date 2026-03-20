# RubixLarq — Full Implementation Planner
> Version 1.0 | Created: 2026-03-20
> Stack: React + Vite + cubing.js + Tailwind CSS + Vercel

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Credentials & Setup Checklist](#3-credentials--setup-checklist)
4. [Folder Structure](#4-folder-structure)
5. [UI Design System](#5-ui-design-system)
6. [Phase 1 — Core Solver (Days 1–4)](#6-phase-1--core-solver-days-14)
7. [Phase 2 — Complete Solver + 2x2 (Days 5–8)](#7-phase-2--complete-solver--2x2-days-58)
8. [Phase 3 — Tutorial Section (Days 9–15)](#8-phase-3--tutorial-section-days-915)
9. [Phase 4 — Polish & Deploy (Days 16–18)](#9-phase-4--polish--deploy-days-1618)
10. [Component Breakdown](#10-component-breakdown)
11. [Page Structure & Routes](#11-page-structure--routes)
12. [Cube Solver Logic](#12-cube-solver-logic)
13. [Tutorial Content Outline](#13-tutorial-content-outline)
14. [Deployment Guide](#14-deployment-guide)
15. [Future Phases](#15-future-phases)

---

## 1. Project Overview

**RubixLarq** is a web-based Rubik's cube learning and solving platform.

### Two Core Features:
| Feature | Description |
|---|---|
| **Interactive Solver** | User inputs current cube state via 3D drag-and-fill interface, gets step-by-step solution |
| **Tutorial Library** | Structured guides for 2x2 and 3x3 cubes, beginner through intermediate |

### Guiding Principles:
- Desktop-first (mobile deferred)
- No backend, no login, no external APIs
- All solving and rendering happens in the browser
- Human-touch design — warm, approachable, not corporate
- LocalStorage for progress persistence

---

## 2. Tech Stack

```
React 18          — UI framework
Vite              — Build tool (fast dev server + production builds)
cubing.js         — 3D Rubik's cube rendering, move animation, solver algorithms
Tailwind CSS      — Utility-first styling
React Router v6   — Page navigation
Framer Motion     — Page transitions and UI animations
localStorage API  — Save user progress, no backend needed
Vercel            — Hosting and deployment (free tier)
GitHub            — Source control, triggers Vercel auto-deploy
```

### Why cubing.js?
- Purpose-built for Rubik's cubes in the browser
- Supports 2x2 (pocket cube) and 3x3 natively
- Built-in solver (uses Kociemba algorithm for 3x3)
- 3D rendering via WebGL
- Move animation built-in
- Actively maintained, good documentation

---

## 3. Credentials & Setup Checklist

### What You Need to Provide

| Item | Where to get it | Required for |
|---|---|---|
| **GitHub account** | github.com | Code storage, auto-deploy trigger |
| **Vercel account** | vercel.com (sign in with GitHub) | Deployment |
| **GitHub repo name** | You decide — suggest: `rubixlarq` | Code repository |

### No API Keys Needed for Phase 1
Everything runs client-side. No external paid services needed.

### .env.example (for future use)
```env
# RubixLarq Environment Variables
# Phase 1: None required — all client-side

# Phase 2+ (future — leave blank for now):
# VITE_ANALYTICS_ID=        # Google Analytics or Plausible
# VITE_ERROR_TRACKING=      # Sentry DSN (optional)
# VITE_SITE_URL=            # https://rubixlarq.com
```

### Setup Steps (One-time)
```bash
# 1. Install Node.js (if not installed)
# Download from: https://nodejs.org — install LTS version

# 2. Install project
npm create vite@latest rubixlarq -- --template react
cd rubixlarq
npm install

# 3. Install dependencies
npm install cubing tailwindcss @tailwindcss/vite react-router-dom framer-motion

# 4. Run local dev server
npm run dev
# Opens at http://localhost:5173
```

---

## 4. Folder Structure

```
rubixlarq/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── og-image.png              # Social share image
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Nav bar with logo + links
│   │   │   ├── Footer.jsx        # Links, credit
│   │   │   └── PageWrapper.jsx   # Page fade-in animation wrapper
│   │   │
│   │   ├── cube/
│   │   │   ├── CubeViewer.jsx    # 3D cube renderer (cubing.js wrapper)
│   │   │   ├── ColorPalette.jsx  # Drag-source color swatches
│   │   │   ├── FaceInputPanel.jsx# 2D face grid for color drag-fill
│   │   │   ├── FaceNavigator.jsx # "Now filling: FRONT face" label + nav
│   │   │   └── CubeValidator.jsx # Validates cube state is solvable
│   │   │
│   │   ├── solver/
│   │   │   ├── SolverPage.jsx    # Main solver controller
│   │   │   ├── StageList.jsx     # All stages in sidebar
│   │   │   ├── StageCard.jsx     # Single stage: name + moves count
│   │   │   ├── MoveDisplay.jsx   # Notation + English description
│   │   │   ├── ResultPanel.jsx   # 2D cube net showing expected state
│   │   │   └── ProgressBar.jsx   # Visual stage completion bar
│   │   │
│   │   ├── tutorial/
│   │   │   ├── TutorialList.jsx  # Grid of all tutorials
│   │   │   ├── TutorialCard.jsx  # Card: title, difficulty, cube type
│   │   │   ├── TutorialPage.jsx  # Full tutorial with stages
│   │   │   ├── TutorialStage.jsx # One stage: text + diagram + moves
│   │   │   └── DiagramCube.jsx   # Small static 3D cube for illustration
│   │   │
│   │   └── home/
│   │       ├── Hero.jsx          # Landing section
│   │       ├── FeatureCards.jsx  # "Learn" and "Solve" feature blocks
│   │       └── HowItWorks.jsx    # 3-step visual explainer
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SolverPage.jsx        # /solver
│   │   ├── TutorialsPage.jsx     # /tutorials
│   │   ├── TutorialDetailPage.jsx# /tutorials/:id
│   │   └── NotFound.jsx          # 404
│   │
│   ├── hooks/
│   │   ├── useCubeState.js       # Cube color state management
│   │   ├── useSolver.js          # Run solver, parse stages
│   │   └── useLocalStorage.js    # Persist/load from localStorage
│   │
│   ├── utils/
│   │   ├── cubeValidator.js      # Check cube state validity
│   │   ├── moveParser.js         # Convert move notation to English
│   │   ├── colorMap.js           # Color name → hex → cubing.js color
│   │   └── stageGrouper.js       # Group raw moves into named stages
│   │
│   ├── data/
│   │   └── tutorials/
│   │       ├── 3x3-beginner.js
│   │       ├── 3x3-intermediate.js
│   │       └── 2x2-beginner.js
│   │
│   ├── styles/
│   │   └── index.css             # Tailwind base + custom CSS vars
│   │
│   ├── App.jsx                   # Router setup
│   └── main.jsx                  # React entry point
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── planner.md                    # This file
└── chat_log.md                   # Project discussion log
```

---

## 5. UI Design System

### Color Palette
```css
--color-blue:        #1B4FDB;   /* Primary — buttons, links, accents */
--color-blue-dark:   #1338A8;   /* Hover state for blue */
--color-blue-light:  #EEF2FF;   /* Blue tinted backgrounds */
--color-green:       #10B981;   /* Success, confirm, stage complete */
--color-green-dark:  #059669;   /* Hover state for green */
--color-yellow:      #FBBF24;   /* Highlight, cube face accent */
--color-yellow-dark: #D97706;   /* Hover state for yellow */
--color-white:       #F8FAFC;   /* Page background */
--color-navy:        #0F172A;   /* Dark sections, footer */
--color-text:        #1E293B;   /* Primary body text */
--color-text-muted:  #64748B;   /* Secondary text, labels */
--color-border:      #E2E8F0;   /* Card borders, dividers */
```

### Rubik's Cube Face Colors (for sticker palette)
```css
--cube-white:   #FFFFFF;
--cube-yellow:  #FFD500;
--cube-red:     #C41E3A;
--cube-orange:  #FF6B1A;
--cube-blue:    #0046AD;
--cube-green:   #009B48;
```
> Note: Red and Orange must have clear labels — they look similar on screen.

### Typography
```
Font family:    'Inter' (Google Fonts) — clean, modern, readable
Headings:       Bold, tight tracking
Body:           Regular, 1.6 line height
Code/notation:  'JetBrains Mono' — for move notation like R, U', F2
```

### Component Styles
```
Cards:          White bg, 1px border, 8px radius, soft shadow
Buttons primary: Blue bg, white text, 6px radius, scale on hover
Buttons secondary: White bg, blue border, blue text
Stage complete: Green checkmark badge
Current step:   Blue highlighted left border
```

---

## 6. Phase 1 — Core Solver (Days 1–4)

### Goal: Working 3x3 color input + solve + step display. Deployed.

#### Day 1 — Project Setup
- [ ] Create Vite + React project
- [ ] Install all dependencies (cubing.js, Tailwind, React Router, Framer Motion)
- [ ] Set up Tailwind config with custom colors
- [ ] Create folder structure
- [ ] Create Header, Footer, PageWrapper layout components
- [ ] Create Home page with Hero section
- [ ] Set up React Router with Home, Solver, Tutorials routes
- [ ] Initialize GitHub repo and push
- [ ] Connect to Vercel — first deploy

#### Day 2 — 3D Cube Color Input
- [ ] CubeViewer: integrate cubing.js 3D cube renderer
- [ ] ColorPalette: 6 color swatches (W/Y/R/O/B/G) with labels
- [ ] FaceInputPanel: 2D grid (3x3) for drag-to-fill
- [ ] FaceNavigator: "Now filling: FRONT face" label + Prev/Next face buttons
- [ ] Drag-to-fill logic: hold color, drag across stickers to fill multiple
- [ ] Per-sticker erase/reset (right-click or eraser tool)
- [ ] useCubeState hook: store all 6 faces × 9 stickers state
- [ ] Live 3D preview updates as user fills colors

#### Day 3 — Validator + Solver
- [ ] cubeValidator.js: check 9 stickers per face, 6 of each color, valid corner/edge combos
- [ ] Error display: friendly messages ("You have 10 orange stickers — should be 9. Check your top face.")
- [ ] useSolver hook: call cubing.js solver with validated cube state
- [ ] stageGrouper.js: group solution moves into named stages (White Cross, White Corners, etc.)
- [ ] moveParser.js: convert R, U', F2 → "Turn Right face clockwise", "Turn Up face counter-clockwise twice"

#### Day 4 — Step Display + 2D Result Panel
- [ ] StageList sidebar: all stages listed, current highlighted
- [ ] MoveDisplay: current stage moves one by one, with notation + English
- [ ] Back/Forward buttons: navigate between individual moves
- [ ] ResultPanel: 2D cube net (cross layout) showing expected state at current step
- [ ] 3D cube animates each move when user clicks Next
- [ ] ProgressBar: visual indicator of solve progress
- [ ] localStorage save: auto-save current step so refresh doesn't lose place
- [ ] "Progress saved" toast notification

---

## 7. Phase 2 — Complete Solver + 2x2 (Days 5–8)

#### Day 5–6 — 2x2 Support
- [ ] Extend useCubeState for 2x2 (4 stickers per face)
- [ ] 2x2 FaceInputPanel (2x2 grid)
- [ ] cubing.js 2x2 solver integration
- [ ] 2x2 stage grouper (different stages than 3x3)
- [ ] Cube type selector on Solver page (toggle 2x2 / 3x3)

#### Day 7 — UX Improvements
- [ ] "Start Over" button — reset cube to all white
- [ ] "Fill all white" shortcut — reset a single face
- [ ] Keyboard shortcuts: Arrow keys for Next/Back steps
- [ ] Zoom in/out on 3D cube viewer
- [ ] Smooth cube rotation animation on face change

#### Day 8 — Testing & Bug Fix
- [ ] Test 10+ different cube states (valid and invalid)
- [ ] Test all edge cases in validator
- [ ] Fix any step-sync bugs (3D animation vs step counter)
- [ ] Deploy Phase 2 to Vercel

---

## 8. Phase 3 — Tutorial Section (Days 9–15)

#### Day 9–10 — Tutorial Framework
- [ ] TutorialList page: grid of tutorial cards
- [ ] TutorialCard component: title, difficulty badge, cube type tag, time estimate
- [ ] TutorialPage: renders stages from data file
- [ ] TutorialStage: heading + explanation text + algorithm formula + DiagramCube
- [ ] localStorage: save which tutorials are completed/in-progress

#### Day 11–12 — 3x3 Beginner Content
Write and structure content for `3x3-beginner.js`:
- [ ] Stage 1: Understanding notation (R, U, F, L, D, B and ' and 2)
- [ ] Stage 2: White Cross (4 white edges on top)
- [ ] Stage 3: White Corners (complete white face)
- [ ] Stage 4: Middle Layer Edges (solve second layer)
- [ ] Stage 5: Yellow Cross (top yellow cross)
- [ ] Stage 6: Orient Top Corners
- [ ] Stage 7: Permute Top Corners
- [ ] Stage 8: Permute Top Edges (solve complete)

#### Day 13 — 2x2 Beginner Content
Write and structure content for `2x2-beginner.js`:
- [ ] Stage 1: Notation for 2x2
- [ ] Stage 2: Solve bottom layer (2 corners)
- [ ] Stage 3: Complete bottom layer (all 4 corners)
- [ ] Stage 4: Orient top layer (Ortega OLL)
- [ ] Stage 5: Permute top layer (Ortega PBL)

#### Day 14–15 — 3x3 Intermediate Content
Write and structure content for `3x3-intermediate.js`:
- [ ] Stage 1: What is F2L (First Two Layers)?
- [ ] Stage 2: F2L Concept — slot solving
- [ ] Stage 3: 4 basic F2L cases with algorithms
- [ ] Stage 4: Introduction to OLL (57 cases → learn the easy ones first)
- [ ] Stage 5: Introduction to PLL (21 cases → learn U perms + T perm + Y perm)
- [ ] Stage 6: Practice strategy and finger tricks intro

---

## 9. Phase 4 — Polish & Deploy (Days 16–18)

#### Day 16 — UI Polish
- [ ] Home page: add animated 3D cube in hero section
- [ ] Smooth page transitions (Framer Motion)
- [ ] Loading states: spinner when solver is computing
- [ ] Error boundary: friendly fallback if something crashes
- [ ] SEO: meta tags, title, description, og:image

#### Day 17 — Performance & Accessibility
- [ ] Lazy load tutorial pages
- [ ] Color contrast check (WCAG AA compliance)
- [ ] Keyboard navigation through all interactive elements
- [ ] Focus indicators visible
- [ ] Alt text on all diagrams

#### Day 18 — Final Deploy
- [ ] Test full flow: input cube → validate → solve → follow steps → complete
- [ ] Test tutorial: browse → open → read all stages → mark complete
- [ ] Final Vercel production deploy
- [ ] Connect custom domain (rubixlarq.com)

---

## 10. Component Breakdown

### CubeViewer.jsx
```
Props: cubeState, cubeType (2x2|3x3), highlightFace, animateMove
State: rotation angles, animation queue
Renders: cubing.js TwistyPlayer component
Behavior: rotates to show highlighted face, animates move on command
```

### FaceInputPanel.jsx
```
Props: faceIndex, faceColors, onColorChange, activeColor
State: isDragging, lastFilledCell
Renders: NxN grid of colored squares
Behavior: mousedown starts drag, mouseover fills cell with activeColor
```

### ColorPalette.jsx
```
Props: selectedColor, onColorSelect
Renders: 6 colored circles with labels (White, Yellow, Red, Orange, Blue, Green)
Behavior: click to select active color for drag-fill
```

### MoveDisplay.jsx
```
Props: move, moveIndex, totalMoves, stageName
Renders: large notation (R), English description, stage name
Example: "R" → "Turn the RIGHT face CLOCKWISE"
```

### ResultPanel.jsx
```
Props: cubeState (expected state at current step)
Renders: 2D net diagram of all 6 cube faces
Colors: matches cube face colors, sticker-by-sticker
Layout: cross/unfolded net format
```

---

## 11. Page Structure & Routes

```
/                   → Home page (Hero + Features + How It Works)
/solver             → Solver page (cube type select + input + solve steps)
/tutorials          → Tutorial list (grid of all tutorials)
/tutorials/3x3-beginner      → 3x3 beginner guide
/tutorials/3x3-intermediate  → 3x3 intermediate guide
/tutorials/2x2-beginner      → 2x2 beginner guide
*                   → 404 Not Found page
```

---

## 12. Cube Solver Logic

### 3x3 Solving
- Library: `cubing.js` built-in solver (Kociemba-based, runs in browser via WebWorker)
- Input: 54-character string representing all 54 stickers in standard order
- Output: sequence of moves (e.g., `R U R' U' R' F R2 U' R' U' R U R' F'`)
- Grouping into stages: use move count heuristics + known algorithm patterns

### Stage Grouping for 3x3 (Layer by Layer Method)
```
Stage 1: White Cross       — typically moves 1–8
Stage 2: White Corners     — typically moves 9–18
Stage 3: Middle Layer      — typically moves 19–30
Stage 4: Yellow Cross      — typically moves 31–36
Stage 5: Orient Corners    — typically moves 37–44
Stage 6: Permute Corners   — typically moves 45–52
Stage 7: Permute Edges     — typically moves 53–end
```
> Note: Exact move grouping is heuristic — we detect "progress checkpoints" by inspecting cube state between groups.

### 2x2 Solving
- Library: `cubing.js` 2x2 solver
- Stages: Bottom Layer → Top Layer Orient → Top Layer Permute

### Cube State Format (cubing.js)
```
Face order: U (Up/White), R (Right), F (Front), D (Down/Yellow), L (Left), B (Back)
Sticker order per face: top-left to bottom-right, row by row
Color codes: U=white, R=red, F=green, D=yellow, L=orange, B=blue (standard)
```

---

## 13. Tutorial Content Outline

### 3x3 Beginner — "Solve Your First 3x3"
| Stage | Name | Key Algorithm |
|---|---|---|
| 1 | Learn the Notation | No algorithm — understand R, U, F, L, D, B, ', 2 |
| 2 | White Cross | No fixed algorithm — intuitive |
| 3 | White Corners | R U R' U' (Right Trigger) |
| 4 | Middle Layer | U R U' R' U' F' U F |
| 5 | Yellow Cross | F R U R' U' F' |
| 6 | Orient Corners | R U R' U R U2 R' (Sune) |
| 7 | Permute Corners | U R U' L' U R' U' L (A-perm) |
| 8 | Permute Edges | M2 U M2 U2 M2 U M2 |

### 2x2 Beginner — "Solve the Pocket Cube"
| Stage | Name | Key Algorithm |
|---|---|---|
| 1 | Notation for 2x2 | R, U, F only (no middle slices) |
| 2 | Bottom Layer | Intuitive corner pairing |
| 3 | Top Layer (OLL) | R U R' U R U2 R' |
| 4 | Top Layer (PBL) | R U' R F2 R' U R' |

### 3x3 Intermediate — "Speed Cubing Intro"
| Stage | Name | Key Concept |
|---|---|---|
| 1 | What is F2L | Pair corner + edge together |
| 2 | F2L Cases | 4 core F2L insertions |
| 3 | OLL Introduction | Orient last layer in 1–2 looks |
| 4 | PLL Introduction | U perms, T perm, Y perm |
| 5 | Finger Tricks | Execute algorithms faster |

---

## 14. Deployment Guide

### Step 1 — GitHub Setup
```bash
# In project folder
git init
git add .
git commit -m "Initial commit: RubixLarq project setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rubixlarq.git
git push -u origin main
```

### Step 2 — Vercel Setup
1. Go to vercel.com → Log in with GitHub
2. Click "Add New Project"
3. Select your `rubixlarq` GitHub repo
4. Framework: Vite (auto-detected)
5. Build command: `npm run build` (auto-detected)
6. Output directory: `dist` (auto-detected)
7. Click Deploy

### Step 3 — Auto Deploy
Every `git push` to `main` branch automatically triggers a new Vercel deploy.

### Step 4 — Custom Domain (rubixlarq.com)
1. Buy domain from Namecheap (recommended) or Cloudflare Registrar
2. In Vercel: Project Settings → Domains → Add `rubixlarq.com`
3. Vercel gives you DNS records to add in Namecheap
4. Add the records in Namecheap DNS settings
5. Wait 5–30 minutes for propagation

### Domain Cost
- `rubixlarq.com` — ~$10–14/year (check availability on namecheap.com first)
- `rubixlarq.io` — ~$30–40/year
- `rubixlarq.dev` — ~$12–15/year
- Hosting: $0 (Vercel free tier is generous)

---

## 15. Future Phases

### Phase 5 — User Accounts (Optional)
- [ ] Auth: Supabase (free tier, PostgreSQL, auth built-in)
- [ ] Save solve history per user
- [ ] Tutorial completion tracking across devices
- [ ] Cost: Supabase free tier (500MB, 50,000 MAU)

### Phase 6 — Mobile Support
- [ ] Touch-friendly color input (tap-to-select, tap-to-fill instead of drag)
- [ ] Responsive layout for all screen sizes
- [ ] PWA (installable on phone home screen)

### Phase 7 — Advanced Features
- [ ] Timer for speed-cubing practice
- [ ] Scramble generator (random scramble to practice)
- [ ] Solve statistics (move count, time taken)
- [ ] Community feature: share your solve (optional)

---

## Status Tracker

| Phase | Status | Notes |
|---|---|---|
| Phase 1 — Core Solver | ⬜ Not started | |
| Phase 2 — 2x2 + UX | ⬜ Not started | |
| Phase 3 — Tutorials | ⬜ Not started | |
| Phase 4 — Polish + Deploy | ⬜ Not started | |

---

*Planner maintained by Claude Code — updated as implementation progresses*
