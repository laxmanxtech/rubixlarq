import { useState, useCallback, useRef } from 'react'
import { colorToHex, FACE_CENTER_COLORS } from '../../utils/colorMap'

/**
 * FaceInputPanel — interactive grid for drag-to-fill cube sticker colors.
 * Supports 2x2 (4 cells) and 3x3 (9 cells).
 */
export default function FaceInputPanel({ faceId, colors, onColorChange, selectedColor, cubeType = '3x3' }) {
  const size = cubeType === '2x2' ? 2 : 3
  const isDraggingRef = useRef(false)
  const [lastFilled, setLastFilled] = useState(null)

  const fillCell = useCallback((index) => {
    // Don't allow changing the center sticker on 3x3 (it's always fixed)
    if (cubeType === '3x3' && index === 4) return
    if (colors[index] === selectedColor) return  // already this color, skip
    onColorChange(faceId, index, selectedColor)
    setLastFilled(index)
  }, [faceId, colors, selectedColor, onColorChange, cubeType])

  const handleMouseDown = useCallback((e, index) => {
    e.preventDefault()
    isDraggingRef.current = true
    fillCell(index)
  }, [fillCell])

  const handleMouseEnter = useCallback((index) => {
    if (isDraggingRef.current) fillCell(index)
  }, [fillCell])

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  // Global mouseup in case user releases outside the grid
  const handleMouseLeaveGrid = useCallback(() => {
    // Don't stop drag when leaving grid — allow dragging back in
  }, [])

  const isCenterCell = (index) => cubeType === '3x3' && index === 4

  const getCellStyle = (index, color) => {
    const isEmpty = !color || color === 'empty'
    const isCenter = isCenterCell(index)
    return {
      backgroundColor: isEmpty ? '#F1F5F9' : colorToHex(color),
      cursor: isCenter ? 'default' : 'crosshair',
      opacity: isCenter ? 0.9 : 1,
    }
  }

  return (
    <div
      className="select-none"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeaveGrid}
    >
      <div
        className="grid gap-1.5 p-2 bg-[#1E293B] rounded-xl w-fit mx-auto"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {colors.map((color, index) => {
          const isCenter = isCenterCell(index)
          const isEmpty = !color || color === 'empty'
          return (
            <div
              key={index}
              className={`
                w-14 h-14 rounded-lg border-2 flex items-center justify-center
                transition-all duration-75 relative
                ${isCenter
                  ? 'border-white/30 cursor-default'
                  : isEmpty
                    ? 'border-dashed border-[#475569] hover:border-[#94A3B8]'
                    : 'border-black/20 hover:border-white/40 cursor-crosshair'
                }
                ${lastFilled === index ? 'scale-105' : ''}
              `}
              style={getCellStyle(index, color)}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              {isCenter && (
                <span className="text-[10px] font-bold text-white/60 select-none">
                  {faceId}
                </span>
              )}
              {isEmpty && !isCenter && (
                <svg className="w-4 h-4 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>
          )
        })}
      </div>
      <p className="text-center text-xs text-[#94A3B8] mt-2 select-none">
        Hold and drag to fill multiple stickers
      </p>
    </div>
  )
}
