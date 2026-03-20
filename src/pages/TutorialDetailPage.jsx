import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import tutorial2x2 from '../data/tutorials/2x2-beginner'
import tutorial3x3 from '../data/tutorials/3x3-beginner'
import tutorial3x3int from '../data/tutorials/3x3-intermediate'

const allTutorials = {
  '2x2-beginner': tutorial2x2,
  '3x3-beginner': tutorial3x3,
  '3x3-intermediate': tutorial3x3int,
}

function AlgorithmBlock({ alg }) {
  if (!alg) return null
  const moves = alg.split(' ')
  return (
    <div className="my-4 p-4 bg-[#0F172A] rounded-xl flex flex-wrap gap-2 items-center">
      <span className="text-[#64748B] text-xs mr-2 font-mono">Algorithm:</span>
      {moves.map((move, i) => (
        <span
          key={i}
          className="font-mono text-lg font-bold px-2 py-1 rounded-md"
          style={{
            backgroundColor: move.includes("'") ? '#7C3AED22' : move.includes('2') ? '#D9770622' : '#1B4FDB22',
            color: move.includes("'") ? '#A78BFA' : move.includes('2') ? '#FBBF24' : '#93C5FD',
          }}
        >
          {move}
        </span>
      ))}
    </div>
  )
}

function ContentRenderer({ text }) {
  const lines = text.trim().split('\n')
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return <div key={i} className="h-2" />

        // Bold **text**
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g)
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="text-[#1E293B]">{part.slice(2, -2)}</strong>
          }
          return part
        })

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const content = trimmed.slice(2)
          const contentParts = content.split(/(\*\*[^*]+\*\*)/g).map((p, j) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={j}>{p.slice(2, -2)}</strong>
              : p
          )
          return (
            <div key={i} className="flex gap-2">
              <span className="text-[#1B4FDB] mt-1 flex-shrink-0">•</span>
              <p className="text-[#374151] leading-relaxed">{contentParts}</p>
            </div>
          )
        }

        return <p key={i} className="text-[#374151] leading-relaxed">{rendered}</p>
      })}
    </div>
  )
}

export default function TutorialDetailPage() {
  const { id } = useParams()
  const tutorial = allTutorials[id]
  const [currentStage, setCurrentStage] = useState(0)
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`tutorial-${id}-completed`) || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(`tutorial-${id}-completed`, JSON.stringify(completed))
  }, [completed, id])

  if (!tutorial) {
    return (
      <div className="text-center py-20">
        <p className="text-[#64748B]">Tutorial not found.</p>
        <Link to="/tutorials" className="mt-4 inline-block text-[#1B4FDB] font-semibold">← Back to tutorials</Link>
      </div>
    )
  }

  const stage = tutorial.stages[currentStage]
  const isCompleted = completed.includes(stage.id)
  const allDone = tutorial.stages.every(s => completed.includes(s.id))

  const markComplete = () => {
    if (!isCompleted) setCompleted(prev => [...prev, stage.id])
    if (currentStage < tutorial.stages.length - 1) setCurrentStage(currentStage + 1)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Back */}
      <Link to="/tutorials" className="inline-flex items-center gap-1 text-sm text-[#64748B] hover:text-[#1B4FDB] transition-colors mb-6">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All tutorials
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold font-mono"
            style={{ backgroundColor: tutorial.color }}
          >
            {tutorial.cubeType === '2x2' ? '2²' : '3³'}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">{tutorial.title}</h1>
            <p className="text-[#64748B] text-sm">{tutorial.subtitle}</p>
          </div>
        </div>
        {allDone && (
          <div className="mt-3 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full">
            ✓ Tutorial complete! Great work.
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Sidebar — stage list */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">Stages</p>
            </div>
            {tutorial.stages.map((s, i) => {
              const done = completed.includes(s.id)
              const active = i === currentStage
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStage(i)}
                  className={`w-full text-left px-4 py-3 flex items-start gap-3 border-b border-[#E2E8F0] last:border-0 transition-colors ${
                    active ? 'bg-[#EEF2FF]' : 'hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    done ? 'bg-[#10B981] text-white' : active ? 'bg-[#1B4FDB] text-white' : 'bg-[#E2E8F0] text-[#94A3B8]'
                  }`}>
                    {done ? '✓' : i + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-medium leading-snug ${active ? 'text-[#1B4FDB]' : 'text-[#1E293B]'}`}>
                      {s.title}
                    </p>
                    <p className="text-xs text-[#94A3B8] mt-0.5 leading-snug">{s.summary}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden">
                {/* Stage header */}
                <div
                  className="px-6 py-4 border-b border-[#E2E8F0]"
                  style={{ borderLeftColor: tutorial.color, borderLeftWidth: 4 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#64748B] uppercase">
                      Stage {stage.id} of {tutorial.stages.length}
                    </span>
                    {isCompleted && (
                      <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                        ✓ Done
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-[#0F172A]">{stage.title}</h2>
                  <p className="text-[#64748B] text-sm mt-1">{stage.summary}</p>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <ContentRenderer text={stage.content} />
                  <AlgorithmBlock alg={stage.algorithm} />
                  {stage.tip && (
                    <div className="mt-5 flex gap-3 p-4 bg-[#FBBF2415] border border-[#FBBF2440] rounded-xl">
                      <span className="text-xl flex-shrink-0">💡</span>
                      <p className="text-sm text-[#92400E] leading-relaxed">{stage.tip}</p>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between gap-4">
                  <button
                    onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
                    disabled={currentStage === 0}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#64748B] hover:text-[#1E293B] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  <button
                    onClick={markComplete}
                    className="px-6 py-2 rounded-xl text-sm font-semibold text-white transition-colors"
                    style={{ backgroundColor: tutorial.color }}
                  >
                    {currentStage === tutorial.stages.length - 1 ? 'Finish Tutorial ✓' : 'Got it — Next Stage →'}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
