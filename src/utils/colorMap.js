// Maps between color names, hex values, and facelet notation
// Standard Rubik's cube color scheme (Western color scheme)

export const COLORS = {
  white:  { hex: '#FFFFFF', face: 'U', label: 'White'  },
  yellow: { hex: '#FFD500', face: 'D', label: 'Yellow' },
  green:  { hex: '#009B48', face: 'F', label: 'Green'  },
  blue:   { hex: '#0046AD', face: 'B', label: 'Blue'   },
  red:    { hex: '#C41E3A', face: 'R', label: 'Red'    },
  orange: { hex: '#FF6B1A', face: 'L', label: 'Orange' },
}

// Color name → hex
export const colorToHex = (colorName) => COLORS[colorName]?.hex ?? '#CCCCCC'

// Color name → facelet letter (U/D/F/B/R/L)
export const colorToFace = (colorName) => COLORS[colorName]?.face ?? '?'

// Hex → color name
export const hexToColor = (hex) => {
  const entry = Object.entries(COLORS).find(([, v]) => v.hex === hex)
  return entry ? entry[0] : null
}

// All color names as array
export const COLOR_NAMES = Object.keys(COLORS)

// Face order for the 3x3 facelet string: U R F D L B
// Each face has 9 stickers, top-left to bottom-right
export const FACE_ORDER_3X3 = ['U', 'R', 'F', 'D', 'L', 'B']
export const FACE_ORDER_2X2 = ['U', 'R', 'F', 'D', 'L', 'B']

// Face index to name mapping
export const FACE_NAMES = {
  0: { id: 'U', label: 'Top (White)',   short: 'TOP',   color: '#FFFFFF' },
  1: { id: 'R', label: 'Right (Red)',   short: 'RIGHT', color: '#C41E3A' },
  2: { id: 'F', label: 'Front (Green)', short: 'FRONT', color: '#009B48' },
  3: { id: 'D', label: 'Bottom (Yellow)', short: 'BOTTOM', color: '#FFD500' },
  4: { id: 'L', label: 'Left (Orange)', short: 'LEFT',  color: '#FF6B1A' },
  5: { id: 'B', label: 'Back (Blue)',   short: 'BACK',  color: '#0046AD' },
}

// Center sticker color for each face (centers never move)
export const FACE_CENTER_COLORS = {
  U: 'white',
  R: 'red',
  F: 'green',
  D: 'yellow',
  L: 'orange',
  B: 'blue',
}

// Convert our color array state to cubejs facelet string
// stateByFace: { U: [9 colors], R: [9 colors], F: [9 colors], D: [9 colors], L: [9 colors], B: [9 colors] }
export function stateTo3x3FaceletString(stateByFace) {
  return FACE_ORDER_3X3.map(face =>
    stateByFace[face].map(color => colorToFace(color)).join('')
  ).join('')
}

// Convert 2x2 state to facelet string (4 stickers per face)
export function stateTo2x2FaceletString(stateByFace) {
  return FACE_ORDER_2X2.map(face =>
    stateByFace[face].map(color => colorToFace(color)).join('')
  ).join('')
}

/**
 * Convert a 2x2 cube state into a 3x3 facelet string for the cubejs solver.
 *
 * The 2x2 is just the 8 corners of a 3x3. We place the 2x2 corner colors into
 * the 3x3 corner positions and fill all edge/center positions with the solved
 * face color. cubejs then solves the corners (= solves the 2x2).
 *
 * 2x2 sticker indices per face: [0=TL, 1=TR, 2=BL, 3=BR]
 * These map to 3x3 corner positions:  [0=TL, 2=TR, 6=BL, 8=BR]
 */
export function convert2x2To3x3Facelets(stateByFace) {
  const faces = ['U', 'R', 'F', 'D', 'L', 'B']
  let facelets = ''
  for (const face of faces) {
    const colors = stateByFace[face]   // [TL, TR, BL, BR]
    const c = face  // center face letter (U/R/F/D/L/B) — solved edges use this
    // 3x3 positions [0..8]:
    // 0=TL(corner)  1=top-edge(solved)  2=TR(corner)
    // 3=left-edge(solved)  4=center(solved)  5=right-edge(solved)
    // 6=BL(corner)  7=bottom-edge(solved)  8=BR(corner)
    facelets += [
      colorToFace(colors[0]),  // 0 TL corner
      c,                       // 1 top edge — solved
      colorToFace(colors[1]),  // 2 TR corner
      c,                       // 3 left edge — solved
      c,                       // 4 center — solved
      c,                       // 5 right edge — solved
      colorToFace(colors[2]),  // 6 BL corner
      c,                       // 7 bottom edge — solved
      colorToFace(colors[3]),  // 8 BR corner
    ].join('')
  }
  return facelets
}
