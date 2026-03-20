export default {
  id: '2x2-beginner',
  title: 'Solve the 2×2 Cube',
  subtitle: 'Beginner Method',
  cubeType: '2x2',
  difficulty: 'Beginner',
  estimatedTime: '30 min',
  description: 'Learn to solve the Pocket Cube using a simple 4-stage method. Great for first-timers.',
  color: '#10B981',
  stages: [
    {
      id: 1,
      title: 'Understand the Notation',
      summary: 'Learn the move language before we begin solving.',
      content: `
The 2×2 cube uses the same notation as the 3×3, but only for the outer layers. You'll mainly use three faces:

**R** — Right face, turn clockwise
**U** — Up face (top), turn clockwise
**F** — Front face, turn clockwise

Adding **'** (prime) means counter-clockwise: R' = Right face, turn counter-clockwise
Adding **2** means turn twice (180°): U2 = Up face, turn twice

Think of the cube as fixed in space — your hands move the faces, not the whole cube.
      `,
      algorithm: null,
      tip: 'Hold the cube with white on top and green facing you throughout this method.',
    },
    {
      id: 2,
      title: 'Solve the Bottom Layer',
      summary: 'Get all 4 corners of the bottom layer in the right place.',
      content: `
The 2×2 has only 8 corner pieces — no edge pieces. We solve 4 corners at a time.

**Step 1:** Hold the cube with yellow on top.

**Step 2:** Look at the bottom layer (white should be going to the bottom). Find white corners and move them to the bottom layer.

To insert a bottom corner that is stuck in the top layer:
- If the white sticker faces the **front**: do **F' U' F**
- If the white sticker faces the **right**: do **R U R'**
- If the white sticker faces **up**: do **R U2 R' U' R U R'**

Repeat until all 4 white corners are on the bottom with white facing down.
      `,
      algorithm: 'R U R\'',
      tip: 'Don\'t worry about matching side colors in this step — just get white on the bottom face.',
    },
    {
      id: 3,
      title: 'Orient the Top Layer (OLL)',
      summary: 'Make all yellow stickers face up.',
      content: `
Now all white corners are solved. The top layer (yellow) needs to be oriented — all yellow stickers should face up.

Look at the top face. You'll see one of these patterns:

**Already done:** All yellow up — skip to Stage 4!

**Cross pattern:** 4 yellows in a cross — use the algorithm once.

**L-shape or dot:** Use the algorithm 2-3 times.

**The OLL Algorithm:**
Hold the cube so the L-shape corner of yellow is at the back-right. Then do:

**R U R' U R U2 R'**

Repeat until all 4 yellow stickers face up.
      `,
      algorithm: 'R U R\' U R U2 R\'',
      tip: 'After each repetition, check the top face before doing the algorithm again.',
    },
    {
      id: 4,
      title: 'Permute the Top Layer (PBL)',
      summary: 'Move the top corners to their correct positions.',
      content: `
All yellow stickers face up — great! Now we need to move the top corners to the right positions so the side colors match.

**Check:** Look at the sides of the top layer. Find two corners that have matching colors on the same side. Those two "headlights" tell you the solved side.

**Hold** that matching side facing you (towards you).

**Do this algorithm:**

**R U' R F2 R' U R'**

Check again. If not solved, find the new matching side and repeat.

If no two corners match at all, do the algorithm once from any position, then find the matching side.
      `,
      algorithm: 'R U\' R F2 R\' U R\'',
      tip: 'The cube is solved when all 4 sides have matching colors on the top layer. Well done!',
    },
  ],
}
