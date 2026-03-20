export default {
  id: '3x3-beginner',
  title: 'Solve the 3×3 Cube',
  subtitle: 'Layer by Layer Method',
  cubeType: '3x3',
  difficulty: 'Beginner',
  estimatedTime: '1–2 hours',
  description: 'The classic beginner method — solve the cube layer by layer. Used worldwide to teach first solves.',
  color: '#1B4FDB',
  stages: [
    {
      id: 1,
      title: 'Learn the Notation',
      summary: 'Understand the move language used in all Rubik\'s cube algorithms.',
      content: `
Every Rubik's cube algorithm uses a simple notation. There are 6 faces:

**U** — Up (top face)
**D** — Down (bottom face)
**R** — Right face
**L** — Left face
**F** — Front face (facing you)
**B** — Back face

**Modifiers:**
- No modifier = clockwise (when looking directly at that face)
- **'** (prime) = counter-clockwise
- **2** = 180° turn (same either way)

**Examples:**
- **R** = turn right face clockwise
- **U'** = turn top face counter-clockwise
- **F2** = turn front face 180°

Hold the cube consistently: white on top, green facing you. This is your fixed orientation throughout the solve.
      `,
      algorithm: null,
      tip: 'Write the notation on a sticky note while learning. After a week, you\'ll know it by heart.',
    },
    {
      id: 2,
      title: 'White Cross',
      summary: 'Form a white cross on the top face, with side colors matching.',
      content: `
Goal: Make a white cross on the top (white) face AND have the edge pieces match the center colors on each side.

**Why centers matter:** The center pieces never move. The red center always stays red, green always green. They define which color belongs on which side.

**Finding white edges:** Look for pieces with one white sticker and one colored sticker. There are 4 edge pieces with white.

**Method:**
1. Find a white edge in the bottom layer. Look at its non-white color.
2. Rotate the bottom layer until that edge is under its matching center.
3. Do **F2** to flip it up to the cross position.
4. Repeat for all 4 white edges.

**If the white edge is in the middle layer:** do **U R U' R'** or similar to get it to the bottom first.

**If white is already on top but wrong side:** do **F2 U R U'** to reposition it.
      `,
      algorithm: 'F2',
      tip: 'Don\'t worry if you mess up other pieces while solving the cross — you\'ll fix them later.',
    },
    {
      id: 3,
      title: 'White Corners',
      summary: 'Complete the white face by solving the 4 corner pieces.',
      content: `
Your white cross is done. Now add the 4 white corners to complete the white face.

**Find white corners:** Look in the bottom layer (between the bottom and the side faces) for pieces with a white sticker. Each corner has 3 colors.

**For each corner:**

1. Look at the corner's non-white colors. Find the matching slot on the top right (between two matching centers).
2. Move the corner to be directly below its target slot.
3. Hold the cube so the target slot is at the **front-right-top** position.
4. Do the **Right Trigger** to insert it:

**R U R' U'**

Repeat this trigger until the corner pops into place correctly (white facing up). It may take 1–5 repetitions.

**Corner stuck in wrong place on top:** do **R U R'** once to get it out, then reposition.
      `,
      algorithm: 'R U R\' U\'',
      tip: 'The Right Trigger (R U R\' U\') is the most important algorithm in beginner cubing. Master it!',
    },
    {
      id: 4,
      title: 'Middle Layer Edges',
      summary: 'Solve the 4 edge pieces of the middle (second) layer.',
      content: `
The white face is complete! Flip the cube over — yellow on top now.

**Goal:** Solve the 4 middle layer edges (the ones without yellow).

**Find middle edges:** Look at the top layer for edges that have NO yellow sticker. These belong in the middle layer.

**Inserting a middle edge — two cases:**

**Case 1: Edge goes to the right**
- Align the edge's top color with its matching center (rotate U layer)
- Do: **U R U' R' U' F' U F**

**Case 2: Edge goes to the left**
- Align the edge's top color with the opposite center
- Do: **U' L' U L U F U' F'**

**Stuck piece:** If a middle edge is in the middle layer but wrong, insert any random edge from the top to kick it out, then solve it properly.
      `,
      algorithm: 'U R U\' R\' U\' F\' U F',
      tip: 'Take it slow here. These are the longest algorithms so far. Breaking them into two parts helps.',
    },
    {
      id: 5,
      title: 'Yellow Cross',
      summary: 'Orient the top layer to make a yellow cross.',
      content: `
Two layers done! Now we work only on the top (yellow) layer.

**Goal:** Get all yellow stickers facing up, starting with a cross shape.

Look at the top face. You'll see one of these:
- **Dot** (only center yellow) → use algorithm 3 times
- **L-shape** (2 yellows + center) → hold L at back-left, use once
- **Line** (3 yellows in a row) → hold line going left-right, use once
- **Cross** → already done! Skip to Stage 6.

**Yellow Cross Algorithm:**
**F R U R' U' F'**

After each run, look at the top face and adjust.
      `,
      algorithm: 'F R U R\' U\' F\'',
      tip: 'You don\'t need to worry about corner or side colors at this point — just the cross shape.',
    },
    {
      id: 6,
      title: 'Orient Yellow Corners',
      summary: 'Get all yellow corner stickers facing up.',
      content: `
You have a yellow cross. Now get the yellow corners facing up too.

Look at the top face. Find a yellow corner that is NOT facing up. Position it at the **front-right** and do:

**R U R' U R U2 R'** (Sune algorithm)

Check again. You may need to do this 2–4 times from different starting positions.

**Important:** After the algorithm, rotate ONLY the top layer (U or U') to find the next unsolved corner. Don't rotate the whole cube unless instructed.

When all yellow stickers face up, the top face is a solid yellow.
      `,
      algorithm: 'R U R\' U R U2 R\'',
      tip: 'Keep the rest of the cube stable while doing Sune. Only the U face turns freely.',
    },
    {
      id: 7,
      title: 'Permute Yellow Corners',
      summary: 'Move the top corners to their correct positions.',
      content: `
Yellow face is complete. But the corners may be in the wrong spots.

**Check:** Look at the side faces near the top corners. Find two adjacent corners that share the same side color — these are "headlights."

**Hold** that "headlights" side facing away from you (back).

**Do:**
**U R U' L' U R' U' L**

Check again. Repeat if needed. The corners will cycle into position.

**No headlights visible:** Do the algorithm once from any position — headlights will appear.
      `,
      algorithm: 'U R U\' L\' U R\' U\' L',
      tip: 'This algorithm cycles 3 corners. It takes 1–3 repetitions maximum.',
    },
    {
      id: 8,
      title: 'Permute Yellow Edges',
      summary: 'Final step — put the last 4 edges in the correct positions.',
      content: `
Almost there! The final step moves the top layer edges into their correct positions.

**Check:** Look at each side of the top layer. Find a side where the top edge color matches the center below it — that's your "solved side."

**Hold that solved side facing you.**

**Do:**
**M2 U M2 U2 M2 U M2**

(M = middle slice, turn the same direction as L)

If no side is solved yet, do the algorithm once to create a solved side, then repeat from that position.

**Your cube is solved!** 🎉
      `,
      algorithm: 'M2 U M2 U2 M2 U M2',
      tip: 'The M move takes practice. It\'s the middle column turning — same direction as the L face.',
    },
  ],
}
