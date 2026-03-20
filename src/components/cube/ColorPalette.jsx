import { COLORS } from '../../utils/colorMap'

const colorList = Object.entries(COLORS).map(([name, val]) => ({
  name,
  hex: val.hex,
  label: val.label,
}))

export default function ColorPalette({ selectedColor, onColorSelect }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
        Choose a color, then drag across stickers
      </p>
      <div className="flex flex-wrap gap-3">
        {colorList.map(({ name, hex, label }) => (
          <button
            key={name}
            onClick={() => onColorSelect(name)}
            title={label}
            className={`relative flex flex-col items-center gap-1.5 group transition-transform ${
              selectedColor === name ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                selectedColor === name
                  ? 'border-[#1B4FDB] shadow-lg shadow-blue-200 ring-2 ring-[#1B4FDB]/30'
                  : 'border-[#E2E8F0] hover:border-[#94A3B8]'
              }`}
              style={{ backgroundColor: hex }}
            />
            <span className={`text-[10px] font-medium ${
              selectedColor === name ? 'text-[#1B4FDB]' : 'text-[#64748B]'
            }`}>
              {label}
            </span>
            {selectedColor === name && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#1B4FDB] rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Eraser tool */}
      <div className="mt-3 pt-3 border-t border-[#F1F5F9]">
        <button
          onClick={() => onColorSelect('empty')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
            selectedColor === 'empty'
              ? 'bg-[#FEF2F2] text-red-600 border border-red-200'
              : 'text-[#64748B] hover:bg-[#F8FAFC] border border-[#E2E8F0]'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eraser
        </button>
      </div>
    </div>
  )
}
