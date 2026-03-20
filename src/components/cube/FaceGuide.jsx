/**
 * FaceGuide — shows the user exactly how to rotate their physical cube
 * to see the face they need to fill in.
 * Highlights the currently active face.
 */

const FACE_INSTRUCTIONS = [
  {
    index: 0,
    id: 'U',
    label: 'Top Face',
    faceColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    emoji: '⬆️',
    action: 'Look straight DOWN at the cube from above',
    detail: 'Hold cube normally. Look at the top surface.',
    diagram: 'top',
  },
  {
    index: 1,
    id: 'R',
    label: 'Right Face',
    faceColor: '#C41E3A',
    borderColor: '#C41E3A',
    emoji: '➡️',
    action: 'Tilt the cube — bring the RIGHT side to face you',
    detail: 'Keep White on top. Tilt the cube left so the right side faces you.',
    diagram: 'right',
  },
  {
    index: 2,
    id: 'F',
    label: 'Front Face',
    faceColor: '#009B48',
    borderColor: '#009B48',
    emoji: '👁️',
    action: 'Look straight at the cube — this is the face facing you',
    detail: 'Hold the cube normally. White on top. The face looking at you is the Front.',
    diagram: 'front',
  },
  {
    index: 3,
    id: 'D',
    label: 'Bottom Face',
    faceColor: '#FFD500',
    borderColor: '#A37F00',
    emoji: '⬇️',
    action: 'Flip the cube upside down — look at the bottom',
    detail: 'Turn the whole cube toward you (forward flip). Yellow face should now face up.',
    diagram: 'bottom',
  },
  {
    index: 4,
    id: 'L',
    label: 'Left Face',
    faceColor: '#FF6B1A',
    borderColor: '#FF6B1A',
    emoji: '⬅️',
    action: 'Tilt the cube — bring the LEFT side to face you',
    detail: 'Keep White on top. Tilt the cube right so the left side faces you.',
    diagram: 'left',
  },
  {
    index: 5,
    id: 'B',
    label: 'Back Face',
    faceColor: '#0046AD',
    borderColor: '#0046AD',
    emoji: '🔄',
    action: 'Rotate the whole cube 180° — the back is now the front',
    detail: 'Keep White on top. Spin the cube around (rotate it 180°). The face now facing you is the Back.',
    diagram: 'back',
  },
]

// Mini cube diagram showing which face is highlighted
function MiniCubeDiagram({ face }) {
  const faceColors = {
    top:    { top: '#FFFFFF', front: '#888', right: '#888', left: '#888', bottom: '#888', back: '#888' },
    front:  { top: '#888', front: '#009B48', right: '#888', left: '#888', bottom: '#888', back: '#888' },
    right:  { top: '#888', front: '#888', right: '#C41E3A', left: '#888', bottom: '#888', back: '#888' },
    left:   { top: '#888', front: '#888', right: '#888', left: '#FF6B1A', bottom: '#888', back: '#888' },
    bottom: { top: '#888', front: '#888', right: '#888', left: '#888', bottom: '#FFD500', back: '#888' },
    back:   { top: '#888', front: '#888', right: '#888', left: '#888', bottom: '#888', back: '#0046AD' },
  }
  const c = faceColors[face] || faceColors.front

  // Simple isometric cube drawing using divs
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      {/* Top face */}
      <div
        className="absolute border border-black/20 rounded-sm"
        style={{
          width: 30, height: 14,
          top: 2, left: 18,
          backgroundColor: c.top,
          transform: 'skewX(-30deg)',
        }}
      />
      {/* Front face */}
      <div
        className="absolute border border-black/20 rounded-sm"
        style={{
          width: 28, height: 22,
          top: 14, left: 6,
          backgroundColor: c.front,
        }}
      />
      {/* Right face */}
      <div
        className="absolute border border-black/20 rounded-sm"
        style={{
          width: 14, height: 22,
          top: 14, left: 34,
          backgroundColor: c.right,
          transform: 'skewY(30deg)',
        }}
      />
    </div>
  )
}

export default function FaceGuide({ activeFaceIndex, onFaceSelect }) {
  const active = FACE_INSTRUCTIONS[activeFaceIndex]

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#0F172A] px-4 py-3">
        <p className="text-xs font-semibold text-[#FBBF24] uppercase tracking-wide">
          How to see each face
        </p>
        <p className="text-white text-sm font-bold mt-0.5">
          Now filling: {active?.label}
        </p>
      </div>

      {/* Active face instruction — prominent */}
      <div
        className="mx-4 mt-4 mb-3 p-3 rounded-xl border-2"
        style={{ borderColor: active?.borderColor, backgroundColor: active?.faceColor + '15' }}
      >
        <div className="flex items-start gap-3">
          <MiniCubeDiagram face={active?.diagram} />
          <div>
            <p className="text-sm font-bold text-[#1E293B] leading-snug">{active?.action}</p>
            <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{active?.detail}</p>
          </div>
        </div>
      </div>

      {/* All faces list — quick reference */}
      <div className="px-4 pb-4">
        <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wide mb-2">
          All 6 faces — click to jump
        </p>
        <div className="space-y-1">
          {FACE_INSTRUCTIONS.map((f) => {
            const isActive = f.index === activeFaceIndex
            return (
              <button
                key={f.id}
                onClick={() => onFaceSelect(f.index)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-[#EEF2FF]'
                    : 'hover:bg-[#F8FAFC]'
                }`}
              >
                <div
                  className="w-4 h-4 rounded flex-shrink-0 border"
                  style={{ backgroundColor: f.faceColor, borderColor: f.borderColor }}
                />
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-semibold ${isActive ? 'text-[#1B4FDB]' : 'text-[#374151]'}`}>
                    {f.label}
                  </span>
                  <span className="text-[10px] text-[#94A3B8] ml-2 hidden sm:inline">
                    {f.action.split('—')[0].trim()}
                  </span>
                </div>
                {isActive && (
                  <span className="text-[10px] font-bold text-[#1B4FDB] flex-shrink-0">← now</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
