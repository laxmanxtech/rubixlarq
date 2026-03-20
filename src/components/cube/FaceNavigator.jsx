import { FACE_NAMES } from '../../utils/colorMap'

const FACE_ORDER = ['U', 'R', 'F', 'D', 'L', 'B']

export default function FaceNavigator({
  activeFaceIndex,
  onFaceChange,
  stateByFace,
  cubeType = '3x3',
}) {
  const totalFaces = 6
  const expectedPerFace = cubeType === '2x2' ? 4 : 9
  const activeFaceId = FACE_ORDER[activeFaceIndex]
  const faceInfo = FACE_NAMES[activeFaceIndex]

  const getFaceCompleteness = (faceId) => {
    const face = stateByFace[faceId] || []
    const filled = face.filter(c => c && c !== 'empty').length
    return { filled, total: expectedPerFace, complete: filled === expectedPerFace }
  }

  const currentFace = getFaceCompleteness(activeFaceId)

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      {/* Current face indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
            style={{ backgroundColor: faceInfo?.color || '#ccc' }}
          />
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
              Now filling
            </p>
            <p className="text-lg font-bold text-[#0F172A]">{faceInfo?.label || activeFaceId}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-[#1B4FDB]">
            {activeFaceIndex + 1}<span className="text-sm font-normal text-[#94A3B8]">/{totalFaces}</span>
          </p>
          <p className="text-xs text-[#64748B]">
            {currentFace.filled}/{currentFace.total} stickers
          </p>
        </div>
      </div>

      {/* Face dots — quick navigation */}
      <div className="flex justify-center gap-2 mb-4">
        {FACE_ORDER.map((faceId, i) => {
          const { complete } = getFaceCompleteness(faceId)
          const isActive = i === activeFaceIndex
          return (
            <button
              key={faceId}
              onClick={() => onFaceChange(i)}
              title={FACE_NAMES[i]?.label}
              className={`w-8 h-8 rounded-md text-xs font-bold border-2 transition-all ${
                isActive
                  ? 'border-[#1B4FDB] bg-[#EEF2FF] text-[#1B4FDB] scale-110'
                  : complete
                    ? 'border-[#10B981] bg-emerald-50 text-[#10B981]'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-[#CBD5E1]'
              }`}
            >
              {complete && !isActive ? '✓' : faceId}
            </button>
          )
        })}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onFaceChange(Math.max(0, activeFaceIndex - 1))}
          disabled={activeFaceIndex === 0}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={() => onFaceChange(Math.min(totalFaces - 1, activeFaceIndex + 1))}
          disabled={activeFaceIndex === totalFaces - 1}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-[#1B4FDB] text-sm font-medium text-white hover:bg-[#1338A8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next Face
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
