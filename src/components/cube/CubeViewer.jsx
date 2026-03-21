import { useEffect, useRef } from 'react'

// Register cubing.js TwistyPlayer web component
// This import side-effect registers <twisty-player> as a custom HTML element
let cubingLoaded = false
async function loadCubing() {
  if (cubingLoaded) return
  try {
    await import('cubing/twisty')
    cubingLoaded = true
  } catch (e) {
    console.warn('cubing.js failed to load:', e)
  }
}
loadCubing()

/**
 * CubeViewer — wraps the cubing.js TwistyPlayer web component.
 *
 * Props:
 *   cubeType: '2x2' | '3x3'
 *   setupAlg: string  — algorithm that puts cube into scrambled state (inverse of solution)
 *   alg: string       — the solution algorithm to animate
 *   height: number    — height in pixels (default 280)
 *   showControls: bool — show playback controls (default true)
 */
export default function CubeViewer({
  cubeType = '3x3',
  setupAlg = '',
  alg = '',
  height = 280,
  showControls = true,
}) {
  const playerRef = useRef(null)

  const puzzleId = cubeType === '2x2' ? '2x2x2' : '3x3x3'

  useEffect(() => {
    const el = playerRef.current
    if (!el) return

    const applyProps = () => {
      el.puzzle = puzzleId
      el.alg = alg || ''
      el.experimentalSetupAlg = setupAlg || ''
    }

    // Apply immediately (works if custom element is already defined)
    applyProps()
    // Also apply after custom element upgrades (handles async cubing.js load)
    customElements.whenDefined('twisty-player').then(applyProps)
  }, [puzzleId, alg, setupAlg])

  return (
    <div
      className="bg-[#0F172A] rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ height }}
    >
      {/* @ts-ignore — TwistyPlayer is a web component */}
      <twisty-player
        ref={playerRef}
        puzzle={puzzleId}
        alg={alg || ''}
        experimental-setup-alg={setupAlg || ''}
        hint-facelets="none"
        back-view="top-right"
        visualization="3D"
        control-panel={showControls ? 'bottom-row' : 'none'}
        style={{ width: '100%', height: `${height}px` }}
      />
    </div>
  )
}
