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
