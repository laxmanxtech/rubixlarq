import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * StartingPosition — shows the mandatory Step 0 before filling any colors.
 * User must confirm they've set their cube to the correct starting position.
 */
export default function StartingPosition({ cubeType, onConfirm, confirmed }) {
  const [step, setStep] = useState(0)

  const steps3x3 = [
    {
      title: 'Find the White center',
      instruction: 'Look at all 6 faces of your cube. Find the face that has a WHITE sticker in the very center (middle position). That is your TOP face.',
      visual: (
        <div className="flex flex-col items-center gap-2">
          <div className="grid grid-cols-3 gap-1 p-2 bg-[#1E293B] rounded-xl">
            {['#aaa','#aaa','#aaa','#aaa','#FFFFFF','#aaa','#aaa','#aaa','#aaa'].map((c,i) => (
              <div key={i} className={`w-8 h-8 rounded-md border border-black/20 ${i===4 ? 'ring-2 ring-[#FBBF24] ring-offset-1' : ''}`} style={{backgroundColor: c}} />
            ))}
          </div>
          <p className="text-xs text-[#FBBF24] font-bold">← White center = TOP face</p>
        </div>
      ),
    },
    {
      title: 'Put White on top',
      instruction: 'Hold the cube so the White center faces UP toward the ceiling. Your hand holds the cube from the sides. White is looking up.',
      visual: (
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">☁️</div>
          <div className="flex flex-col items-center gap-1">
            <div className="grid grid-cols-3 gap-0.5 p-1.5 bg-[#1E293B] rounded-md">
              {Array(9).fill('#FFFFFF').map((c,i) => (
                <div key={i} className="w-6 h-6 rounded-sm border border-black/20" style={{backgroundColor: c}} />
              ))}
            </div>
            <div className="text-[10px] text-slate-400">← White face points UP</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Find the Green center',
      instruction: 'Keeping White on top, look at the 4 side faces. Find the face with a GREEN center sticker. Rotate the cube left or right (do NOT tilt) until that Green face is directly facing you.',
      visual: (
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-3 items-center">
            <div className="text-center">
              <div className="grid grid-cols-3 gap-0.5 p-1.5 bg-[#1E293B] rounded-md mb-1">
                {['#aaa','#aaa','#aaa','#aaa','#009B48','#aaa','#aaa','#aaa','#aaa'].map((c,i) => (
                  <div key={i} className={`w-5 h-5 rounded-sm border border-black/20 ${i===4 ? 'ring-2 ring-[#FBBF24]' : ''}`} style={{backgroundColor: c}} />
                ))}
              </div>
              <p className="text-[10px] text-[#FBBF24] font-bold">Front (faces you)</p>
            </div>
            <div className="text-2xl">👈</div>
            <div className="text-center">
              <div className="text-2xl mb-1">👤</div>
              <p className="text-[10px] text-slate-400">You</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Ready! This is your fixed position',
      instruction: 'White on top, Green facing you. Keep this orientation for the ENTIRE filling process. When you need to fill a different face, rotate the cube to see it, fill it, then mentally remember where you were.',
      visual: (
        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-3 grid-rows-3 w-32 h-32 relative">
            {/* Simple cube visual: top=white, front=green */}
            <div className="col-span-3 row-span-1 flex justify-center">
              <div className="grid grid-cols-3 gap-0.5 p-1 bg-[#1E293B] rounded-sm w-16">
                {Array(9).fill('#FFFFFF').map((c,i) => (
                  <div key={i} className="w-4 h-4 rounded-sm" style={{backgroundColor: c}} />
                ))}
              </div>
            </div>
            <div className="col-span-3 flex justify-center">
              <div className="grid grid-cols-3 gap-0.5 p-1 bg-[#1E293B] rounded-sm w-16">
                {Array(9).fill('#009B48').map((c,i) => (
                  <div key={i} className="w-4 h-4 rounded-sm" style={{backgroundColor: c}} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-[#10B981] font-bold">You are ready to start filling!</p>
        </div>
      ),
    },
  ]

  const steps2x2 = [
    {
      title: 'Find a White corner',
      instruction: 'Look at your 2×2 cube. Find any corner piece that has a WHITE sticker on it. The 2×2 has no center pieces, so we use a corner to set orientation.',
      visual: (
        <div className="flex flex-col items-center gap-2">
          <div className="grid grid-cols-2 gap-1 p-2 bg-[#1E293B] rounded-xl">
            {['#FFFFFF','#aaa','#aaa','#aaa'].map((c,i) => (
              <div key={i} className={`w-10 h-10 rounded-md border border-black/20 ${i===0 ? 'ring-2 ring-[#FBBF24]' : ''}`} style={{backgroundColor: c}} />
            ))}
          </div>
          <p className="text-xs text-[#FBBF24] font-bold">← White corner goes top-left</p>
        </div>
      ),
    },
    {
      title: 'Put White corner on top-front-left',
      instruction: 'Hold the cube so your white corner is at the TOP-FRONT-LEFT position (top layer, front face, left side). White sticker should face upward.',
      visual: (
        <div className="text-center">
          <div className="text-3xl mb-2">🔲</div>
          <p className="text-xs text-slate-300">White corner = top-front-left</p>
          <p className="text-xs text-[#FBBF24] mt-1">Keep this fixed throughout</p>
        </div>
      ),
    },
    {
      title: 'Ready! This is your fixed position',
      instruction: 'Keep this orientation for ALL 6 faces. Rotate the cube to see each face, fill it, then come back to this orientation before clicking Next Face.',
      visual: (
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">✅</div>
          <p className="text-xs text-[#10B981] font-bold">You are ready to start filling!</p>
        </div>
      ),
    },
  ]

  const steps = cubeType === '2x2' ? steps2x2 : steps3x3
  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1

  if (confirmed) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-[#0F172A] rounded-2xl overflow-hidden border-2 border-[#1B4FDB]/40">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-[#1B4FDB]/20 border-b border-[#1B4FDB]/30">
            <div className="flex items-center gap-2">
              <span className="text-lg">📌</span>
              <div>
                <p className="text-white font-bold text-sm">Before you start — Set your cube position</p>
                <p className="text-blue-300 text-xs">Complete these {steps.length} steps first</p>
              </div>
            </div>
            <div className="flex gap-1">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < step ? 'bg-[#10B981]' : i === step ? 'bg-[#FBBF24]' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="px-5 py-5 flex flex-col sm:flex-row items-start gap-5"
            >
              {/* Visual */}
              <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-36 min-h-[100px]">
                {currentStep.visual}
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-[#FBBF24] text-[#0F172A] rounded-full px-2 py-0.5">
                    Step {step + 1} of {steps.length}
                  </span>
                  <span className="text-white font-bold text-base">{currentStep.title}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{currentStep.instruction}</p>

                {/* Navigation */}
                <div className="flex items-center gap-3 mt-4">
                  {step > 0 && (
                    <button
                      onClick={() => setStep(s => s - 1)}
                      className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-white/10 rounded-xl transition-colors"
                    >
                      ← Back
                    </button>
                  )}
                  {isLastStep ? (
                    <button
                      onClick={onConfirm}
                      className="px-6 py-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm rounded-xl transition-colors"
                    >
                      ✓ I've set my cube — Start Filling!
                    </button>
                  ) : (
                    <button
                      onClick={() => setStep(s => s + 1)}
                      className="px-6 py-2 bg-[#1B4FDB] hover:bg-[#1338A8] text-white font-semibold text-sm rounded-xl transition-colors"
                    >
                      Got it — Next Step →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
