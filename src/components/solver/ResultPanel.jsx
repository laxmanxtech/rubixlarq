import { colorToHex } from '../../utils/colorMap'

/**
 * ResultPanel — 2D "unfolded net" diagram of the cube state.
 * Shows the expected state at the current step.
 *
 * Net layout (standard cross):
 *          [U]
 *     [L]  [F]  [R]  [B]
 *          [D]
 */

function FaceGrid({ colors, size, faceLabel, borderColor }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wide">{faceLabel}</span>
      <div
        className="grid gap-0.5 p-1 rounded-md"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          backgroundColor: borderColor || '#1E293B',
        }}
      >
        {colors.map((color, i) => (
          <div
            key={i}
            className="rounded-sm"
            style={{
              width: size === 2 ? 14 : 10,
              height: size === 2 ? 14 : 10,
              backgroundColor: color && color !== 'empty' ? colorToHex(color) : '#374151',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ResultPanel({ stateByFace, cubeType = '3x3', label = 'Expected state' }) {
  const size = cubeType === '2x2' ? 2 : 3

  // Empty placeholder if no state
  const emptyFace = Array(size * size).fill('empty')
  const U = stateByFace?.U || emptyFace
  const R = stateByFace?.R || emptyFace
  const F = stateByFace?.F || emptyFace
  const D = stateByFace?.D || emptyFace
  const L = stateByFace?.L || emptyFace
  const B = stateByFace?.B || emptyFace

  const faceWidth = size === 2 ? 32 : 36 // px for layout spacing

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-4">{label}</p>

      {/* Cross / unfolded net layout */}
      <div className="flex flex-col items-center gap-1">
        {/* Top row — U face centered */}
        <div style={{ paddingLeft: faceWidth + 4 }}>
          <FaceGrid colors={U} size={size} faceLabel="Top" borderColor="#1E293B" />
        </div>

        {/* Middle row — L, F, R, B */}
        <div className="flex items-center gap-1">
          <FaceGrid colors={L} size={size} faceLabel="Left" borderColor="#1E293B" />
          <FaceGrid colors={F} size={size} faceLabel="Front" borderColor="#1B4FDB" />
          <FaceGrid colors={R} size={size} faceLabel="Right" borderColor="#1E293B" />
          <FaceGrid colors={B} size={size} faceLabel="Back" borderColor="#1E293B" />
        </div>

        {/* Bottom row — D face centered */}
        <div style={{ paddingLeft: faceWidth + 4 }}>
          <FaceGrid colors={D} size={size} faceLabel="Bottom" borderColor="#1E293B" />
        </div>
      </div>

      <p className="text-[10px] text-[#94A3B8] text-center mt-3 leading-relaxed">
        This is the expected cube state after completing the current move.
        <br />Front face is highlighted in blue.
      </p>
    </div>
  )
}
