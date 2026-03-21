/**
 * Quick Node.js test — verifies cubejs solver + facelet conversion work correctly.
 * Run: node test-solver.mjs
 *
 * Edit CUBE_STATE below with your actual colors to diagnose a specific cube.
 */

// ── Facelet helpers ──────────────────────────────────────────────────────────

const COLORS = {
  white:  { face: 'U' },
  yellow: { face: 'D' },
  green:  { face: 'F' },
  blue:   { face: 'B' },
  red:    { face: 'R' },
  orange: { face: 'L' },
}

const FACE_ORDER = ['U', 'R', 'F', 'D', 'L', 'B']

function colorToFace(c) { return COLORS[c]?.face ?? '?' }

function stateTo3x3FaceletString(stateByFace) {
  return FACE_ORDER.map(f => stateByFace[f].map(colorToFace).join('')).join('')
}

function convert2x2To3x3Facelets(stateByFace) {
  let out = ''
  for (const face of FACE_ORDER) {
    const c = stateByFace[face]   // [TL, TR, BL, BR]
    out += [colorToFace(c[0]), face, colorToFace(c[1]), face, face, face, colorToFace(c[2]), face, colorToFace(c[3])].join('')
  }
  return out
}

// ── Test cube states — edit these! ─────────────────────────────────────────
// Solved 3x3 (should report "already solved")
const SOLVED_3X3 = {
  U: Array(9).fill('white'),
  R: Array(9).fill('red'),
  F: Array(9).fill('green'),
  D: Array(9).fill('yellow'),
  L: Array(9).fill('orange'),
  B: Array(9).fill('blue'),
}

// Simple 1-move scramble: U move (rotate top face 90° clockwise)
const SCRAMBLED_3X3 = {
  U: ['white','white','white','white','white','white','white','white','white'],
  R: ['blue','blue','blue','red','red','red','red','red','red'],
  F: ['red','red','red','green','green','green','green','green','green'],
  D: ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
  L: ['green','green','green','orange','orange','orange','orange','orange','orange'],
  B: ['orange','orange','orange','blue','blue','blue','blue','blue','blue'],
}

// ── YOUR cube state — paste your colors here ────────────────────────────────
// Replace each face array with your actual 9 colors (TL→TR→ML→MC→MR→BL→BM→BR)
const MY_CUBE = {
  U: ['white','white','white','white','white','white','white','white','white'],
  R: ['red','red','red','red','red','red','red','red','red'],
  F: ['green','green','green','green','green','green','green','green','green'],
  D: ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow'],
  L: ['orange','orange','orange','orange','orange','orange','orange','orange','orange'],
  B: ['blue','blue','blue','blue','blue','blue','blue','blue','blue'],
}

// ── Run tests ────────────────────────────────────────────────────────────────

async function runTest(label, stateByFace, cubeType = '3x3') {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(`TEST: ${label}`)
  console.log(`${'─'.repeat(60)}`)

  const facelets = cubeType === '3x3'
    ? stateTo3x3FaceletString(stateByFace)
    : convert2x2To3x3Facelets(stateByFace)

  console.log(`Facelet string (${facelets.length} chars): ${facelets}`)

  // Check for invalid '?' characters
  if (facelets.includes('?')) {
    console.error('❌ Facelet string contains "?" — some colors are unrecognized!')
    return
  }

  // Load cubejs
  console.log('Loading cubejs...')
  const t0 = Date.now()
  const mod = await import('cubejs')
  const Cube = mod.default ?? mod
  console.log(`  ✓ Loaded in ${Date.now() - t0}ms`)

  if (typeof Cube.initSolver !== 'function') {
    console.error('❌ Cube.initSolver is not a function! CJS interop issue.')
    console.log('  mod keys:', Object.keys(mod))
    return
  }

  console.log('Running initSolver (builds pruning tables)...')
  const t1 = Date.now()
  Cube.initSolver()
  console.log(`  ✓ initSolver done in ${Date.now() - t1}ms`)

  if (typeof Cube.fromString !== 'function') {
    console.error('❌ Cube.fromString is not a function!')
    return
  }

  const cube = Cube.fromString(facelets)
  console.log(`  ✓ Cube.fromString OK, isSolved: ${cube.isSolved()}`)

  if (cube.isSolved()) {
    console.log('  ✓ Cube is already solved — no moves needed.')
    return
  }

  console.log('Solving...')
  const t2 = Date.now()
  const solution = cube.solve()
  console.log(`  ✓ Solved in ${Date.now() - t2}ms`)
  console.log(`  Solution: ${solution}`)
  console.log(`  Move count: ${solution.trim().split(/\s+/).length}`)
}

(async () => {
  try {
    await runTest('Solved 3x3 (should say already solved)', SOLVED_3X3, '3x3')
    await runTest('Scrambled 3x3 (U move)', SCRAMBLED_3X3, '3x3')
    await runTest('MY CUBE', MY_CUBE, '3x3')
    console.log('\n✅ All tests done.')
  } catch (err) {
    console.error('\n❌ Test crashed:', err.message)
    console.error(err.stack)
  }
})()
