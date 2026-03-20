import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCubeState } from '../hooks/useCubeState'
import { useSolver } from '../hooks/useSolver'
import ColorPalette from '../components/cube/ColorPalette'
import FaceInputPanel from '../components/cube/FaceInputPanel'
import FaceNavigator from '../components/cube/FaceNavigator'
import CubeViewer from '../components/cube/CubeViewer'
import StageList from '../components/solver/StageList'
import StepDisplay from '../components/solver/StepDisplay'
import ResultPanel from '../components/solver/ResultPanel'

function CubeTypeToggle({ cubeType, onChange }) {
  return (
    <div className="inline-flex items-center bg-[#F1F5F9] rounded-xl p-1 gap-1">
      {['2x2', '3x3'].map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            cubeType === type
              ? 'bg-white text-[#1B4FDB] shadow-sm border border-[#E2E8F0]'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
        >
          {type} Cube
        </button>
      ))}
    </div>
  )
}

function ProgressDots({ filled, total }) {
  const pct = Math.round((filled / total) * 100)
  return (
    <div className="flex items-center gap-3 text-sm">
      <div className="flex-1 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[#1B4FDB] rounded-full"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>
      <span className="text-[#64748B] font-mono text-xs flex-shrink-0">{filled}/{total}</span>
    </div>
  )
}

export default function SolverPage() {
  const [cubeType, setCubeType] = useState('3x3')
  const [selectedColor, setSelectedColor] = useState('white')
  const [phase, setPhase] = useState('input') // 'input' | 'solving'
  const [savedNotice, setSavedNotice] = useState(false)

  const cube = useCubeState(cubeType)
  const solver = useSolver(cubeType)

  // Reset when cube type changes
  const handleCubeTypeChange = (newType) => {
    setCubeType(newType)
    cube.resetAll()
    solver.reset()
    setPhase('input')
  }

  // Show "progress saved" toast
  useEffect(() => {
    if (phase === 'solving') {
      setSavedNotice(true)
      const t = setTimeout(() => setSavedNotice(false), 3000)
      return () => clearTimeout(t)
    }
  }, [phase])

  const handleSolve = async () => {
    await solver.solve(cube.stateByFace)
    if (solver.isSolved || solver.status === 'solved') {
      setPhase('solving')
    }
  }

  // Watch solver status changes after solve() resolves
  useEffect(() => {
    if (solver.isSolved && solver.steps.length === 0) {
      // Cube was already solved
      setPhase('solving')
    } else if (solver.isSolved) {
      setPhase('solving')
    }
  }, [solver.isSolved, solver.steps.length])

  const handleStartOver = () => {
    cube.resetAll()
    solver.reset()
    setPhase('input')
  }

  return (
    <div className="bg-[#F8FAFC] min-h-[calc(100vh-64px)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">
              {phase === 'input' ? 'Enter Your Cube Colors' : 'Step-by-Step Solution'}
            </h1>
            <p className="text-[#64748B] text-sm mt-1">
              {phase === 'input'
                ? 'Select a color, then drag across the stickers to fill each face.'
                : 'Follow the moves below to solve your cube.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {phase === 'solving' && (
              <button
                onClick={handleStartOver}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#64748B] border border-[#E2E8F0] rounded-xl hover:bg-white transition-colors"
              >
                ↺ Start Over
              </button>
            )}
            <CubeTypeToggle cubeType={cubeType} onChange={handleCubeTypeChange} />
          </div>
        </div>

        {/* Saved notice toast */}
        <AnimatePresence>
          {savedNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-[#10B981] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Progress saved to this device
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── INPUT PHASE ── */}
        {phase === 'input' && (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">

            {/* Left — 3D preview */}
            <div className="space-y-4">
              <CubeViewer
                cubeType={cubeType}
                setupAlg=""
                alg=""
                height={260}
                showControls={false}
              />
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 text-sm text-[#64748B]">
                <p className="font-semibold text-[#1E293B] mb-1">Orientation guide</p>
                <ul className="space-y-1 text-xs">
                  <li>⬜ <strong>Top face:</strong> White center</li>
                  <li>🟨 <strong>Bottom face:</strong> Yellow center</li>
                  <li>🟩 <strong>Front face:</strong> Green center</li>
                  <li>🟦 <strong>Back face:</strong> Blue center</li>
                  <li>🟥 <strong>Right face:</strong> Red center</li>
                  <li>🟧 <strong>Left face:</strong> Orange center</li>
                </ul>
              </div>
            </div>

            {/* Right — color input */}
            <div className="space-y-4">
              {/* Color palette */}
              <ColorPalette selectedColor={selectedColor} onColorSelect={setSelectedColor} />

              {/* Face input */}
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                <FaceInputPanel
                  faceId={cube.activeFaceId}
                  colors={cube.stateByFace[cube.activeFaceId]}
                  onColorChange={(faceId, index, color) => cube.setSticker(faceId, index, color)}
                  selectedColor={selectedColor}
                  cubeType={cubeType}
                />
              </div>

              {/* Face navigator */}
              <FaceNavigator
                activeFaceIndex={cube.activeFaceIndex}
                onFaceChange={cube.setActiveFaceIndex}
                stateByFace={cube.stateByFace}
                cubeType={cubeType}
              />

              {/* Overall progress */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Stickers filled
                </p>
                <ProgressDots filled={cube.filledCount} total={cube.totalStickers} />
              </div>

              {/* Error messages */}
              {solver.isError && solver.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-1">
                  <p className="text-sm font-semibold text-red-700 mb-2">Please fix these issues:</p>
                  {solver.errors.map((err, i) => (
                    <p key={i} className="text-sm text-red-600">• {err}</p>
                  ))}
                </div>
              )}

              {/* Solve button */}
              <button
                onClick={handleSolve}
                disabled={!cube.isFullyFilled || solver.isSolving}
                className={`w-full py-4 rounded-xl font-bold text-white text-base transition-all ${
                  cube.isFullyFilled && !solver.isSolving
                    ? 'bg-[#1B4FDB] hover:bg-[#1338A8] shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5'
                    : 'bg-[#CBD5E1] cursor-not-allowed'
                }`}
              >
                {solver.isSolving
                  ? '⏳ Solving...'
                  : !cube.isFullyFilled
                    ? `Fill all ${cube.totalStickers} stickers first (${cube.totalStickers - cube.filledCount} remaining)`
                    : 'Validate & Solve →'}
              </button>
            </div>
          </div>
        )}

        {/* ── SOLVING PHASE ── */}
        {phase === 'solving' && (
          <>
            {/* Already solved */}
            {solver.steps.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-extrabold text-[#0F172A] mb-2">Your cube is already solved!</h2>
                <p className="text-[#64748B] mb-6">The colors you entered form a completely solved cube.</p>
                <button onClick={handleStartOver} className="px-6 py-3 bg-[#1B4FDB] text-white font-semibold rounded-xl hover:bg-[#1338A8] transition-colors">
                  Try a different cube
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[1fr_200px_240px] gap-5">

                {/* 3D cube viewer */}
                <div className="space-y-4">
                  <CubeViewer
                    cubeType={cubeType}
                    setupAlg={solver.setupAlg}
                    alg={solver.algUpToCurrentStep}
                    height={320}
                    showControls
                  />

                  {/* Navigation controls */}
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={solver.prevStep}
                        disabled={solver.currentStepIndex === 0}
                        className="flex items-center gap-2 px-4 py-2.5 border border-[#E2E8F0] rounded-xl text-sm font-semibold text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1 justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      <span className="text-sm font-mono text-[#64748B] flex-shrink-0">
                        {solver.currentStepIndex + 1} / {solver.totalSteps}
                      </span>
                      <button
                        onClick={solver.nextStep}
                        disabled={solver.currentStepIndex === solver.totalSteps - 1}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1B4FDB] rounded-xl text-sm font-semibold text-white hover:bg-[#1338A8] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-1 justify-center"
                      >
                        Next Move
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* 2D result panel */}
                  <ResultPanel
                    stateByFace={cube.stateByFace}
                    cubeType={cubeType}
                    label="Your original cube state"
                  />
                </div>

                {/* Stage list */}
                <StageList stages={solver.stages} currentStep={solver.currentStep} />

                {/* Step display */}
                <StepDisplay
                  currentStep={solver.currentStep}
                  currentStepIndex={solver.currentStepIndex}
                  totalSteps={solver.totalSteps}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
