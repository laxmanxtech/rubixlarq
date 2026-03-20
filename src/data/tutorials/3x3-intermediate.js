export default {
  id: '3x3-intermediate',
  title: 'Speed Up Your 3×3',
  subtitle: 'Introduction to CFOP',
  cubeType: '3x3',
  difficulty: 'Intermediate',
  estimatedTime: '3–5 hours',
  description: 'Move beyond the beginner method. Learn F2L, basic OLL, and key PLL algorithms used by speedcubers.',
  color: '#7C3AED',
  stages: [
    {
      id: 1,
      title: 'What is CFOP?',
      summary: 'Understand the faster method used by speedcubers worldwide.',
      content: `
CFOP stands for:
- **C** — Cross (same as beginner, but faster and on the bottom)
- **F** — F2L (First Two Layers — solved together, not separately)
- **O** — OLL (Orient Last Layer — yellow face in one or two looks)
- **P** — PLL (Permute Last Layer — complete solve)

**Why is it faster?**
The beginner method solves in ~100 moves. CFOP averages 50–60 moves — half the time.

**Do I need to know the full CFOP?**
No. You can learn "F2L intuition" without memorizing all 41 cases. Even knowing 4–5 basic F2L pairs reduces your solve time significantly.

**Prerequisite:** You should be able to solve consistently with the beginner method before starting CFOP.
      `,
      algorithm: null,
      tip: 'Most people spend 1–3 months on F2L before their times drop significantly. Be patient.',
    },
    {
      id: 2,
      title: 'Better Cross',
      summary: 'Solve the white cross on the bottom in 8 moves or fewer.',
      content: `
In CFOP, the cross goes on the **bottom** (not the top). This feels backward but gives you a better view of the cube while solving.

**Key improvements over beginner cross:**

**1. Plan it in your head first**
Before making a single move, flip the cube and look at where the 4 white edges need to go. Try to plan all 4 cross moves mentally. Start with 1 move planned, work up to 4.

**2. Use shorter paths**
Instead of always bringing edges to the bottom with F2, look for edges already near their slot. A well-planned cross should take 6–8 moves total.

**3. Solve cross edges together**
Sometimes you can solve 2 cross edges in the same move sequence instead of one at a time.

**Practice goal:** Solve the cross in under 5 seconds consistently.
      `,
      algorithm: null,
      tip: 'Practice "cross only" timed challenges. Solve just the cross 20 times and try to improve.',
    },
    {
      id: 3,
      title: 'F2L — The Concept',
      summary: 'Learn to solve corner-edge pairs together for the first two layers.',
      content: `
In the beginner method, you solved:
1. White corners (separate step)
2. Middle edges (separate step)

**F2L combines these:** You pair a white corner with its matching edge piece, then insert the pair into the correct slot together. This saves ~20 moves per solve.

**How to find a pair:**
- Look for a white corner (has white + 2 other colors)
- Find the edge that shares those 2 same colors
- That corner and edge are a "pair"

**Basic insertion (the most common case):**
Corner in top-right with white facing right, edge in top with matching color facing up:

**U R U' R'**

This is the same Right Trigger you already know!

**The 4 slots:** Each of the 4 F2L slots is a corner + edge pair. Solve them in any order.
      `,
      algorithm: 'U R U\' R\'',
      tip: 'Start by solving F2L slowly and correctly. Speed comes naturally after understanding the logic.',
    },
    {
      id: 4,
      title: 'F2L — Core Cases',
      summary: 'Learn the 4 most common F2L insertion patterns.',
      content: `
These 4 cases cover most of your F2L situations:

**Case 1 — Both pieces in top layer, easy insert:**
Edge matches front, corner white faces right:
**U R U' R'**

**Case 2 — Both pieces in top layer, other orientation:**
White faces front, edge matches right:
**U' F' U F**

**Case 3 — Corner in slot, edge in top:**
Edge is above the slot, corner is already in the right slot but at the wrong angle:
**U R U' R' U' F' U F** (extract corner first, then re-pair)

**Case 4 — Both pieces in top, need to align:**
Use U moves to bring the corner and edge together into Case 1 or Case 2, then insert.

**Key insight:** Always try to bring the pair together in the top layer before inserting.
      `,
      algorithm: 'U R U\' R\'',
      tip: 'Don\'t memorize all 41 F2L cases. Understand the logic and derive moves intuitively.',
    },
    {
      id: 5,
      title: 'OLL — Orient Last Layer',
      summary: 'Get all yellow stickers facing up in one or two algorithms.',
      content: `
OLL makes the entire top face yellow in one step (instead of two in the beginner method).

**Full OLL:** 57 algorithms — one for each possible top-layer orientation. Speedcubers memorize all of them eventually.

**2-Look OLL (recommended to start):** Only 9 algorithms needed.

**Look 1 — Make the cross:** (same as beginner Stage 5)
**F R U R' U' F'**

**Look 2 — Orient corners:** 7 cases, but start with just these 2:

**Sune:** R U R' U R U2 R'
**Anti-Sune:** R' U' R U' R' U2 R

With just these, you can solve any OLL in 2 looks by doing Sune or Anti-Sune from different angles.
      `,
      algorithm: 'R U R\' U R U2 R\'',
      tip: 'Learn 2-Look OLL first. Going to full OLL can wait until you\'re consistently under 1 minute.',
    },
    {
      id: 6,
      title: 'PLL — Permute Last Layer',
      summary: 'Complete the cube by solving the top layer\'s positions.',
      content: `
PLL places all last-layer pieces in the correct position. 21 total algorithms — but you only need 6 to start.

**Must-learn PLL algorithms:**

**U Perm (a):** R U' R U R U R U' R' U' R2
Move edges clockwise

**U Perm (b):** R2 U R U R' U' R' U' R' U R'
Move edges counter-clockwise

**T Perm:** R U R' U' R' F R2 U' R' U' R U R' F'
Swap 2 corners + 2 edges

**Y Perm:** F R U' R' U' R U R' F' R U R' U' R' F R F'
Swap 2 corners diagonally

**Z Perm:** M2 U M2 U M' U2 M2 U2 M' U2
Swap 2 pairs of adjacent edges

**H Perm:** M2 U M2 U2 M2 U M2
Swap 2 pairs of opposite edges

With these 6, you can handle any PLL case in at most 2 algorithms.
      `,
      algorithm: 'R U R\' U\' R\' F R2 U\' R\' U\' R U R\' F\'',
      tip: 'Learn U-perms first. They appear most frequently — about 1 in 6 solves ends with a U-perm.',
    },
  ],
}
