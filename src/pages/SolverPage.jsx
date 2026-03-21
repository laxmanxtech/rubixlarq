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
import FaceGuide from '../components/cube/FaceGuide'
import StartingPosition from '../components/cube/StartingPosition'

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
  const [phase, setPhase] = useState('input') // 'input' | 'confirming' | 'solving'
  const [savedNotice, setSavedNotice] = useState(false)
  const [positionConfirmed, setPositionConfirmed] = useState(false)
  const [isEditingConfirm, setIsEditingConfirm] = useState(false)
  const [editSelectedColor, setEditSelectedColor] = useState('white')

  const cube = useCubeState(cubeType)
  const solver = useSolver(cubeType)

  // Reset when cube type changes
  const handleCubeTypeChange = (newType) => {
    setCubeType(newType)
    cube.resetAll()
    solver.reset()
    setPhase('input')
    setPositionConfirmed(false)
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
    // After solve, go to confirming phase so user can verify 3D preview
  }

  // Watch solver status — go to confirming after solve completes
  useEffect(() => {
    if (solver.isSolved) {
      setPhase('confirming')
    }
  }, [solver.isSolved])

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
              {phase === 'input' ? 'Enter Your Cube Colors'
                : phase === 'confirming' ? 'Confirm Your Cube'
                : 'Step-by-Step Solution'}
            </h1>
            <p className="text-[#64748B] text-sm mt-1">
              {phase === 'input'
                ? <>Step 1 — Pick a color below → Step 2 — Drag across stickers to fill → Step 3 — Click <strong>Next Face</strong> → repeat for all 6 faces</>
                : phase === 'confirming'
                ? 'Check the 3D cube below — does it match your physical cube exactly?'
                : 'Follow the moves below one by one to solve your cube.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {(phase === 'solving' || phase === 'confirming') && (
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
          <>
          {/* Step 0 — must confirm starting position before filling */}
          <StartingPosition
            cubeType={cubeType}
            confirmed={positionConfirmed}
            onConfirm={() => setPositionConfirmed(true)}
          />

          <div className={`grid lg:grid-cols-[300px_1fr] gap-6 transition-opacity ${!positionConfirmed ? 'opacity-30 pointer-events-none select-none' : ''}`}>

            {/* Left — face guide (how to rotate cube + which face to fill) */}
            <div>
              <FaceGuide
                activeFaceIndex={cube.activeFaceIndex}
                onFaceSelect={cube.setActiveFaceIndex}
              />
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
                  ? '⏳ Solving…'
                  : !cube.isFullyFilled
                    ? `Fill all ${cube.totalStickers} stickers first (${cube.totalStickers - cube.filledCount} remaining)`
                    : 'Validate & Solve →'}
              </button>

              {/* Progress log — visible while solving or after error */}
              <AnimatePresence>
                {solver.solveLog.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[#0F172A] rounded-xl p-4 font-mono text-xs space-y-1">
                      <p className="text-[#FBBF24] font-semibold mb-2 tracking-wide uppercase text-[10px]">
                        Solver log
                      </p>
                      {solver.solveLog.map((entry, i) => (
                        <div key={i} className="flex gap-2">
                          <span className="text-[#475569] flex-shrink-0">{entry.time}</span>
                          <span className={
                            entry.msg.startsWith('❌') ? 'text-red-400' :
                            entry.msg.startsWith('✓') ? 'text-[#10B981]' :
                            entry.msg.startsWith('  ') ? 'text-[#64748B]' :
                            'text-slate-300'
                          }>{entry.msg}</span>
                        </div>
                      ))}
                      {solver.isSolving && (
                        <div className="flex gap-2 items-center mt-1">
                          <span className="text-[#475569] flex-shrink-0">···</span>
                          <span className="text-[#FBBF24] animate-pulse">working…</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </>
        )}

        {/* ── CONFIRMING PHASE — 3D preview before solving ── */}
        {phase === 'confirming' && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Already solved case */}
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
              <div className="space-y-5">
                {/* 3D cube preview */}
                <div className="bg-[#0F172A] rounded-2xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
                    <span className="text-[#FBBF24] text-lg">🔍</span>
                    <div>
                      <p className="text-white font-bold text-sm">3D Preview — Your Scrambled Cube</p>
                      <p className="text-slate-400 text-xs">Rotate and zoom the 3D cube to inspect all sides</p>
                    </div>
                  </div>
                  <CubeViewer
                    cubeType={cubeType}
                    setupAlg={solver.setupAlg}
                    alg=""
                    height={380}
                    showControls
                  />
                </div>

                {/* 2D net reference */}
                <ResultPanel
                  stateByFace={cube.stateByFace}
                  cubeType={cubeType}
                  label="Your cube — all 6 faces flat view"
                />

                {/* Confirm / fix colors */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5">
                  <p className="text-sm font-semibold text-[#1E293B] mb-1">
                    Does the 3D cube above match your physical cube?
                  </p>
                  <p className="text-xs text-[#64748B] mb-4">
                    Rotate it with your mouse and check all 6 sides. If it matches — you're good to go!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setPhase('solving')}
                      className="flex-1 py-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-xl transition-colors text-sm"
                    >
                      ✓ Yes, this is my cube — Start Solving!
                    </button>
                    <button
                      onClick={() => setIsEditingConfirm(e => !e)}
                      className={`flex-1 py-3 border rounded-xl font-semibold transition-colors text-sm ${
                        isEditingConfirm
                          ? 'bg-[#FFF7ED] border-orange-300 text-orange-700'
                          : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      {isEditingConfirm ? '▲ Hide editor' : '✏️ Fix colors here'}
                    </button>
                  </div>
                </div>

                {/* Inline sticker editor — expands when user wants to fix */}
                <AnimatePresence>
                  {isEditingConfirm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white border border-orange-200 rounded-2xl p-5 space-y-4">
                        <p className="text-sm font-bold text-[#1E293B]">Fix sticker colors</p>

                        {/* Face tabs */}
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { id: 'U', label: 'Top', color: '#FFFFFF', border: '#CBD5E1' },
                            { id: 'R', label: 'Right', color: '#C41E3A', border: '#C41E3A' },
                            { id: 'F', label: 'Front', color: '#009B48', border: '#009B48' },
                            { id: 'D', label: 'Bottom', color: '#FFD500', border: '#A37F00' },
                            { id: 'L', label: 'Left', color: '#FF6B1A', border: '#FF6B1A' },
                            { id: 'B', label: 'Back', color: '#0046AD', border: '#0046AD' },
                          ].map(({ id, label, color, border }) => {
                            const faceIndexMap = { U: 0, R: 1, F: 2, D: 3, L: 4, B: 5 }
                            const idx = faceIndexMap[id]
                            const isActive = cube.activeFaceIndex === idx
                            return (
                              <button
                                key={id}
                                onClick={() => cube.setActiveFaceIndex(idx)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                  isActive ? 'shadow-sm scale-105' : 'opacity-70 hover:opacity-100'
                                }`}
                                style={{
                                  borderColor: border,
                                  backgroundColor: isActive ? color + '22' : 'transparent',
                                  color: isActive ? border : '#374151',
                                }}
                              >
                                <div className="w-3 h-3 rounded-sm border" style={{ backgroundColor: color, borderColor: border }} />
                                {label}
                              </button>
                            )
                          })}
                        </div>

                        {/* Color palette (compact) */}
                        <div className="flex flex-wrap gap-2 py-2 px-1">
                          {Object.entries({ white: '#FFFFFF', yellow: '#FFD500', green: '#009B48', blue: '#0046AD', red: '#C41E3A', orange: '#FF6B1A' }).map(([name, hex]) => (
                            <button
                              key={name}
                              onClick={() => setEditSelectedColor(name)}
                              title={name}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                editSelectedColor === name
                                  ? 'border-[#1B4FDB] ring-2 ring-[#1B4FDB]/30 scale-110'
                                  : 'border-[#E2E8F0] hover:border-[#94A3B8]'
                              }`}
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        </div>

                        {/* Face grid */}
                        <FaceInputPanel
                          faceId={cube.activeFaceId}
                          colors={cube.stateByFace[cube.activeFaceId]}
                          onColorChange={(faceId, index, color) => cube.setSticker(faceId, index, color)}
                          selectedColor={editSelectedColor}
                          cubeType={cubeType}
                        />

                        {/* Validation errors */}
                        {solver.isError && solver.errors.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-1">
                            <p className="text-xs font-semibold text-red-700">Fix these issues:</p>
                            {solver.errors.map((err, i) => (
                              <p key={i} className="text-xs text-red-600">• {err}</p>
                            ))}
                          </div>
                        )}

                        {/* Re-solve button */}
                        <button
                          onClick={() => solver.solve(cube.stateByFace)}
                          disabled={!cube.isFullyFilled || solver.isSolving}
                          className={`w-full py-3 rounded-xl font-bold text-white text-sm transition-all ${
                            cube.isFullyFilled && !solver.isSolving
                              ? 'bg-[#1B4FDB] hover:bg-[#1338A8]'
                              : 'bg-[#CBD5E1] cursor-not-allowed'
                          }`}
                        >
                          {solver.isSolving ? '⏳ Re-validating...' : '↻ Re-validate & Update Preview'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}

        {/* ── SOLVING PHASE ── */}
        {phase === 'solving' && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
