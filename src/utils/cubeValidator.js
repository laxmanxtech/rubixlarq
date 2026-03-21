import { COLORS, FACE_CENTER_COLORS } from './colorMap'

// Expected count of each color on a solved/valid cube
const EXPECTED_COUNT_3X3 = 9  // 9 stickers per color
const EXPECTED_COUNT_2X2 = 4  // 4 stickers per color

/**
 * Validate a 3x3 cube state.
 * stateByFace: { U: [9 strings], R: [9], F: [9], D: [9], L: [9], B: [9] }
 * Returns: { valid: boolean, errors: string[] }
 */
export function validate3x3(stateByFace) {
  const errors = []
  const faces = ['U', 'R', 'F', 'D', 'L', 'B']

  // Check all faces are filled (no null/undefined)
  for (const face of faces) {
    const faceColors = stateByFace[face]
    if (!faceColors || faceColors.length !== 9) {
      errors.push(`Face ${face} does not have 9 stickers.`)
      continue
    }
    const unfilled = faceColors.filter(c => !c || c === 'empty').length
    if (unfilled > 0) {
      errors.push(`${unfilled} sticker(s) on the ${face} face are not filled in yet.`)
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  // Check center stickers match expected colors
  const centerIndex = 4 // center is always index 4 in a 3x3 face
  for (const face of faces) {
    const center = stateByFace[face][centerIndex]
    const expected = FACE_CENTER_COLORS[face]
    if (center !== expected) {
      errors.push(
        `The center of the ${face} face should be ${expected}, but you have ${center}. Centers don't move — check your cube orientation.`
      )
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  // Check color counts — each color should appear exactly 9 times
  const counts = {}
  for (const colorName of Object.keys(COLORS)) counts[colorName] = 0

  for (const face of faces) {
    for (const color of stateByFace[face]) {
      if (counts[color] !== undefined) counts[color]++
      else errors.push(`Unknown color "${color}" found on face ${face}.`)
    }
  }

  for (const [color, count] of Object.entries(counts)) {
    if (count !== EXPECTED_COUNT_3X3) {
      errors.push(
        `You have ${count} ${color} sticker${count !== 1 ? 's' : ''} — there should be exactly ${EXPECTED_COUNT_3X3}. Check your ${color} stickers.`
      )
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  return { valid: true, errors: [] }
}

/**
 * Validate a 2x2 cube state.
 * stateByFace: { U: [4 strings], R: [4], F: [4], D: [4], L: [4], B: [4] }
 */
export function validate2x2(stateByFace) {
  const errors = []
  const faces = ['U', 'R', 'F', 'D', 'L', 'B']

  // Check all faces are filled
  for (const face of faces) {
    const faceColors = stateByFace[face]
    if (!faceColors || faceColors.length !== 4) {
      errors.push(`Face ${face} does not have 4 stickers.`)
      continue
    }
    const unfilled = faceColors.filter(c => !c || c === 'empty').length
    if (unfilled > 0) {
      errors.push(`${unfilled} sticker(s) on the ${face} face are not filled in.`)
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  // Check color counts — each color should appear exactly 4 times
  const counts = {}
  for (const colorName of Object.keys(COLORS)) counts[colorName] = 0

  for (const face of faces) {
    for (const color of stateByFace[face]) {
      if (counts[color] !== undefined) counts[color]++
      else errors.push(`Unknown color "${color}" found.`)
    }
  }

  for (const [color, count] of Object.entries(counts)) {
    if (count !== EXPECTED_COUNT_2X2) {
      errors.push(
        `You have ${count} ${color} sticker${count !== 1 ? 's' : ''} — there should be exactly ${EXPECTED_COUNT_2X2}.`
      )
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  // Check corner pieces — each of the 8 physical corners must be a valid triplet.
  // (No two opposite-face colors on the same corner; all 8 unique pieces present.)
  // Positions: [face, index] using 2x2 face arrays [TL=0, TR=1, BL=2, BR=3]
  const CORNER_POSITIONS = {
    UFR: [['U',3],['F',1],['R',0]],
    UFL: [['U',2],['F',0],['L',1]],
    UBR: [['U',1],['R',1],['B',0]],
    UBL: [['U',0],['L',0],['B',1]],
    DFR: [['D',1],['F',3],['R',2]],
    DFL: [['D',0],['F',2],['L',3]],
    DBR: [['D',3],['R',3],['B',2]],
    DBL: [['D',2],['L',2],['B',3]],
  }
  const VALID_CORNERS = new Set([
    'green,red,white','green,orange,white','blue,red,white','blue,orange,white',
    'green,red,yellow','green,orange,yellow','blue,red,yellow','blue,orange,yellow',
  ])
  const FACE_LABEL = { U:'Top', R:'Right', F:'Front', D:'Bottom', L:'Left', B:'Back' }

  const foundPieces = []
  for (const [name, triples] of Object.entries(CORNER_POSITIONS)) {
    const colors = triples.map(([f,i]) => stateByFace[f][i])
    const key = colors.slice().sort().join(',')
    if (!VALID_CORNERS.has(key)) {
      const faces3 = triples.map(([f]) => FACE_LABEL[f]).join(' + ')
      errors.push(
        `Corner ${name} (${faces3}): colors "${colors.join(', ')}" are not a valid corner combination. ` +
        `Check those 3 faces near that corner — two opposite-face colors (like white+yellow or green+blue) can never share a corner.`
      )
    } else {
      foundPieces.push(key)
    }
  }

  if (errors.length > 0) return { valid: false, errors }

  if (new Set(foundPieces).size !== 8) {
    errors.push('Some corner pieces appear more than once — double-check that each corner has unique colors.')
    return { valid: false, errors }
  }

  return { valid: true, errors: [] }
}
