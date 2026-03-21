import { useState } from 'react'
import { colorToHex } from '../../utils/colorMap'

const FACES = [
  { id: 'U', label: 'Top',    arrow: '⬆️', dir: 'Look DOWN at the cube from above',    color: '#FFFFFF', border: '#CBD5E1' },
  { id: 'F', label: 'Front',  arrow: '👁️', dir: 'Face looking directly at you',         color: '#009B48', border: '#009B48' },
  { id: 'R', label: 'Right',  arrow: '➡️', dir: 'Tilt cube left — right side faces you', color: '#C41E3A', border: '#C41E3A' },
  { id: 'L', label: 'Left',   arrow: '⬅️', dir: 'Tilt cube right — left side faces you', color: '#FF6B1A', border: '#FF6B1A' },
  { id: 'D', label: 'Bottom', arrow: '⬇️', dir: 'Flip cube — look at the bottom face',  color: '#FFD500', border: '#A37F00' },
  { id: 'B', label: 'Back',   arrow: '🔄', dir: 'Rotate 180° — back is now facing you', color: '#0046AD', border: '#0046AD' },
]

/**
 * FaceChecker — click a face direction to inspect its sticker colors.
 * Shown in the input phase once all stickers are filled, as a quick
 * verification step before clicking Validate & Solve.
 */
export default function FaceChecker({ stateByFace, cubeType }) {
  const [activeFaceId, setActiveFaceId] = useState('U')
  const size = cubeType === '2x2' ? 2 : 3
  const face = FACES.find(f => f.id === activeFaceId)
  const colors = stateByFace[activeFaceId] ?? []

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-[#0F172A] px-4 py-3 flex items-center gap-2">
        <span className="text-[#FBBF24]">✅</span>
        <div>
          <p className="text-white font-bold text-sm">Check your cube — click each face to verify</p>
          <p className="text-slate-400 text-xs">Make sure each face matches your physical cube before solving</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Face direction buttons */}
        <div className="grid grid-cols-3 gap-2">
          {FACES.map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFaceId(f.id)}
              className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl border-2 text-xs font-semibold transition-all ${
                activeFaceId === f.id
                  ? 'scale-105 shadow-sm'
                  : 'border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
              style={activeFaceId === f.id ? {
                borderColor: f.border,
                backgroundColor: f.color + '18',
                color: f.border,
              } : {}}
            >
              <span className="text-base">{f.arrow}</span>
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {/* Active face info */}
        <div
          className="rounded-xl border-2 px-3 py-2 text-xs text-center font-medium"
          style={{ borderColor: face.border, backgroundColor: face.color + '12', color: face.border }}
        >
          {face.dir}
        </div>

        {/* Sticker grid */}
        <div className="flex justify-center">
          <div
            className="grid gap-2 p-3 bg-[#1E293B] rounded-xl"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {colors.map((color, i) => {
              const isEmpty = !color || color === 'empty'
              return (
                <div
                  key={i}
                  className="rounded-lg border-2 border-black/20"
                  style={{
                    width: size === 2 ? 64 : 52,
                    height: size === 2 ? 64 : 52,
                    backgroundColor: isEmpty ? '#334155' : colorToHex(color),
                    borderColor: isEmpty ? '#475569' : 'rgba(0,0,0,0.25)',
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* Face label */}
        <p className="text-center text-xs text-[#94A3B8]">
          Showing: <span className="font-semibold text-[#475569]">{face.label} face ({face.id})</span>
          {' · '}colors as you entered them
        </p>
      </div>
    </div>
  )
}
