import { useState, useCallback, useEffect } from 'react'
import { FACE_CENTER_COLORS } from '../utils/colorMap'

// Default empty state — all stickers set to 'empty'
function createEmptyFace(size) {
  return Array(size * size).fill('empty')
}

// For a solved (all-white-top) initial display — centers filled, rest empty
function createInitialFace(faceId, size) {
  const face = createEmptyFace(size)
  if (size === 3) {
    // Pre-fill center sticker (index 4) with the correct center color
    face[4] = FACE_CENTER_COLORS[faceId]
  }
  return face
}

const FACES = ['U', 'R', 'F', 'D', 'L', 'B']

function getInitialState(cubeType) {
  const size = cubeType === '2x2' ? 2 : 3
  const state = {}
  for (const face of FACES) {
    state[face] = createInitialFace(face, size)
  }
  return state
}

/**
 * useCubeState — manages the color state of all 6 faces of the cube.
 *
 * stateByFace: { U: [colors], R: [colors], F: [colors], D: [colors], L: [colors], B: [colors] }
 * Each color is a string like 'white', 'red', etc., or 'empty' if not filled.
 */
export function useCubeState(cubeType = '3x3') {
  const [stateByFace, setStateByFace] = useState(() => getInitialState(cubeType))
  const [activeFaceIndex, setActiveFaceIndex] = useState(0)

  // When cube type changes (2x2 ↔ 3x3), reset state to correct grid size
  useEffect(() => {
    setStateByFace(getInitialState(cubeType))
    setActiveFaceIndex(0)
  }, [cubeType])

  const activeFaceId = FACES[activeFaceIndex]

  // Set a single sticker color
  const setSticker = useCallback((faceId, stickerIndex, color) => {
    setStateByFace(prev => ({
      ...prev,
      [faceId]: prev[faceId].map((c, i) => i === stickerIndex ? color : c),
    }))
  }, [])

  // Set multiple stickers at once (for drag-fill)
  const setStickerRange = useCallback((faceId, stickerIndices, color) => {
    setStateByFace(prev => ({
      ...prev,
      [faceId]: prev[faceId].map((c, i) => stickerIndices.includes(i) ? color : c),
    }))
  }, [])

  // Reset a single face to empty (keeping center for 3x3)
  const resetFace = useCallback((faceId) => {
    const size = cubeType === '2x2' ? 2 : 3
    setStateByFace(prev => ({
      ...prev,
      [faceId]: createInitialFace(faceId, size),
    }))
  }, [cubeType])

  // Reset entire cube to initial state
  const resetAll = useCallback(() => {
    setStateByFace(getInitialState(cubeType))
    setActiveFaceIndex(0)
  }, [cubeType])

  // Check if all stickers on all faces are filled
  const isFullyFilled = Object.values(stateByFace).every(
    face => face.every(c => c && c !== 'empty')
  )

  // Count filled stickers across all faces
  const filledCount = Object.values(stateByFace).reduce(
    (sum, face) => sum + face.filter(c => c && c !== 'empty').length, 0
  )
  const totalStickers = cubeType === '2x2' ? 24 : 54

  return {
    stateByFace,
    activeFaceIndex,
    activeFaceId,
    setActiveFaceIndex,
    setSticker,
    setStickerRange,
    resetFace,
    resetAll,
    isFullyFilled,
    filledCount,
    totalStickers,
    faces: FACES,
  }
}
