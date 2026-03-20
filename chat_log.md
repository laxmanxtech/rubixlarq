# RubixLarq — Project Chat Log
> Full conversation log of planning decisions made before development started.
> Date: 2026-03-20

---

## Session 1 — Idea & Requirements Gathering

### User's Original Idea
Build an online website for learning Rubik's cube with two core sections:
1. **Tutorial Section** — Teach all techniques for different Rubik's cube varieties, step-by-step with detailed help
2. **Live Solving Section** — User selects cube type, uploads images of all 6 sides, system solves and shows step-by-step instructions with progress checking

### Infrastructure Available
- Netlify and Vercel access
- GitHub access
- Does not want to store lots of user data

---

## Session 2 — Requirements Refinement

### Key Decisions Made

**Image recognition dropped:**
- Original idea: AI reads cube photos and detects colors
- Decision: Too expensive (API cost per image), unreliable due to lighting/angle
- **Replaced with: 3D interactive cube where users drag-and-fill colors manually**

**Cube type scope:**
- Only 2x2 and 3x3 (no 4x4, 5x5, 6x6)
- Applies to both the solver and tutorial sections

**Color input UX:**
- User drags a color from palette and fills multiple stickers in one drag gesture
- One face fixed as "front" to reduce orientation confusion
- User confirms each face before moving to next

**Solver display:**
- Move notation (R, U', F2...) + Plain English description ("Turn Right face clockwise")
- Steps grouped by stage (e.g., "Stage 1: White Cross — 5 moves")
- 2D side panel showing expected cube state after each stage
- Back/Forward navigation between steps
- 3D cube updates live to show expected state at each step

**Tutorials:**
- Content written into the website (not user-provided)
- Covers: 2x2 beginner, 3x3 beginner (layer-by-layer), 3x3 intermediate (intro to F2L/CFOP)
- Target audience: Beginners and intermediate learners

**User login / progress:**
- No login for Phase 1
- Use device localStorage to save progress
- "Your progress is saved" indicator shown to user
- Login/accounts deferred to Phase 2 or later

---

## Session 3 — Tech Stack & Architecture Decisions

### Technology Choices

| Component | Choice | Reason |
|---|---|---|
| Frontend framework | React + Vite | Fast build, modern, component-friendly |
| 3D Cube rendering | cubing.js | Purpose-built for Rubik's cubes — handles 2x2/3x3, rendering, solving, animation |
| Styling | Tailwind CSS | Fast, clean UI without writing raw CSS |
| State / Storage | localStorage | No backend needed, zero cost |
| Deployment | Vercel | Free tier, GitHub auto-deploy |
| Backend | None needed | All solving done client-side in browser |

**Option A chosen:** React only, no backend, solver runs in browser. Zero server cost.

### No API Keys Required
Since everything runs client-side with cubing.js, no external APIs are needed for Phase 1.
A `.env.example` file will be created for future use (analytics, error tracking etc.) but no values required now.

### Domain Decision
- Website name: **rubixlarq**
- Recommended domain: `rubixlarq.com` (check availability)
- Alternatives: `rubixlarq.io`, `rubixlarq.dev`
- Recommended registrar: Namecheap or Cloudflare Registrar

---

## Session 4 — UI & Design Decisions

### Design Philosophy
- Human touch — not AI-generated looking
- Warm, approachable, fun (it's a puzzle game audience)
- Not corporate or flat

### Color Palette
| Role | Color | Hex |
|---|---|---|
| Primary Blue | Deep Royal Blue | `#1B4FDB` |
| Accent Green | Emerald | `#10B981` |
| Highlight Yellow | Warm Yellow | `#FBBF24` |
| Background | Off-White / Light | `#F8FAFC` |
| Dark sections | Deep Navy | `#0F172A` |
| Text primary | Slate Dark | `#1E293B` |

### Build Order
1. Local build first, test fully
2. Deploy to Vercel
3. Mobile validation deferred to later phase

---

## Open Items / Deferred to Later Phases
- [ ] User login / accounts / cross-device progress
- [ ] Mobile drag-to-fill UX (desktop only for Phase 1)
- [ ] 4x4+ cube support (explicitly excluded)
- [ ] Image upload / color detection (dropped entirely)
- [ ] Analytics / tracking
- [ ] Domain purchase and DNS setup

---

## Information Still Needed from User
- GitHub username (for repo setup instructions)
- Vercel account email (for deployment instructions)
- Domain preference: `.com`, `.io`, or `.dev`

---
*Log maintained by Claude Code — updated as decisions are made*
