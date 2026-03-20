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

  return { valid: true, errors: [] }
}
