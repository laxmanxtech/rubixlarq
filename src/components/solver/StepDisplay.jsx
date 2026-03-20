import { motion, AnimatePresence } from 'framer-motion'
import { moveToEnglish } from '../../utils/moveParser'

const MOVE_COLORS = {
  // Standard moves — blue
  default: { bg: '#1B4FDB22', text: '#93C5FD', border: '#1B4FDB44' },
  // Prime moves — purple
  prime:   { bg: '#7C3AED22', text: '#C4B5FD', border: '#7C3AED44' },
  // Double moves — yellow
  double:  { bg: '#D9770622', text: '#FCD34D', border: '#D9770644' },
}

function getMoveStyle(move) {
  if (!move) return MOVE_COLORS.default
  if (move.endsWith("'")) return MOVE_COLORS.prime
  if (move.endsWith('2')) return MOVE_COLORS.double
  return MOVE_COLORS.default
}

export default function StepDisplay({ currentStep, currentStepIndex, totalSteps }) {
  if (!currentStep) return null

  const { move, stageName, stageDescription, moveIndexInStage, totalMovesInStage } = currentStep
  const style = getMoveStyle(move)
  const english = moveToEnglish(move)
  const isLastStep = currentStepIndex === totalSteps - 1

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
      {/* Stage label */}
      <div className="px-4 py-3 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
              {stageName}
            </p>
            <p className="text-xs text-[#94A3B8] mt-0.5">{stageDescription}</p>
          </div>
          <span className="text-xs font-mono bg-[#E2E8F0] text-[#64748B] px-2 py-1 rounded-md">
            {moveIndexInStage + 1}/{totalMovesInStage} in stage
          </span>
        </div>
      </div>

      {/* Move display */}
      <div className="px-6 py-6 text-center bg-[#0F172A]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStepIndex}-${move}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.15 }}
          >
            {/* Big move notation */}
            <div
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl text-5xl font-extrabold font-mono mb-4 border-2"
              style={{
                backgroundColor: style.bg,
                color: style.text,
                borderColor: style.border,
              }}
            >
              {move}
            </div>

            {/* English description */}
            <p className="text-slate-200 text-base font-medium leading-relaxed max-w-xs mx-auto">
              {english}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step progress */}
      <div className="px-4 py-3 border-t border-[#E2E8F0]">
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
          <span>Overall progress</span>
          <span className="font-semibold">{currentStepIndex + 1} / {totalSteps} moves</span>
        </div>
        <div className="h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1B4FDB] to-[#10B981] rounded-full"
            animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        {isLastStep && (
          <p className="text-center text-xs text-[#10B981] font-semibold mt-2">
            🎉 Last move! Your cube should be solved.
          </p>
        )}
      </div>
    </div>
  )
}
