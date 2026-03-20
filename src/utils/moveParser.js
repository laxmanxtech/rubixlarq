// Convert Rubik's cube move notation to plain English descriptions

const FACE_NAMES = {
  U: 'Top',
  D: 'Bottom',
  R: 'Right',
  F: 'Front',
  B: 'Back',
  L: 'Left',
  M: 'Middle (same direction as L)',
  E: 'Equator (same direction as D)',
  S: 'Standing (same direction as F)',
  x: 'whole cube (same direction as R)',
  y: 'whole cube (same direction as U)',
  z: 'whole cube (same direction as F)',
}

/**
 * Convert a single move notation to English.
 * Examples: "R" → "Turn the Right face clockwise"
 *           "U'" → "Turn the Top face counter-clockwise"
 *           "F2" → "Turn the Front face 180° (half turn)"
 */
export function moveToEnglish(move) {
  if (!move || !move.trim()) return ''

  const m = move.trim()
  const isPrime = m.endsWith("'")
  const isDouble = m.endsWith('2')
  const face = isPrime || isDouble ? m.slice(0, -1) : m

  const faceName = FACE_NAMES[face] || face

  if (isDouble) {
    return `Turn the ${faceName} face 180° (two turns)`
  }
  if (isPrime) {
    if (face === 'M' || face === 'E' || face === 'S') {
      return `Turn the ${faceName} slice counter-clockwise`
    }
    return `Turn the ${faceName} face counter-clockwise`
  }
  // Regular clockwise
  if (face === 'M' || face === 'E' || face === 'S') {
    return `Turn the ${faceName} slice clockwise`
  }
  return `Turn the ${faceName} face clockwise`
}

/**
 * Parse a full algorithm string into individual moves.
 * Handles: R, U', F2, M2, etc.
 */
export function parseAlgorithm(algString) {
  if (!algString) return []
  return algString.trim().split(/\s+/).filter(Boolean)
}

/**
 * Invert an algorithm string.
 * Used to compute the setup-alg for TwistyPlayer from a solution alg.
 * "R U R'" → "R U' R'"  (reversed, each move inverted)
 */
export function invertAlgorithm(algString) {
  if (!algString) return ''
  const moves = parseAlgorithm(algString)
  return moves.reverse().map(move => {
    if (move.endsWith("'")) return move.slice(0, -1)
    if (move.endsWith('2')) return move  // self-inverse
    return move + "'"
  }).join(' ')
}

/**
 * Count total moves in an algorithm string.
 */
export function moveCount(algString) {
  return parseAlgorithm(algString).length
}
