import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import tutorial2x2 from '../data/tutorials/2x2-beginner'
import tutorial3x3 from '../data/tutorials/3x3-beginner'
import tutorial3x3int from '../data/tutorials/3x3-intermediate'

const tutorials = [tutorial2x2, tutorial3x3, tutorial3x3int]

const difficultyColors = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-purple-100 text-purple-700',
}

export default function TutorialsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-[#0F172A] mb-2">Learn to Solve</h1>
        <p className="text-[#64748B] text-lg">
          Step-by-step guides for 2×2 and 3×3 Rubik's cubes — from your very first solve to speed-cubing basics.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {tutorials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/tutorials/${t.id}`}
              className="block bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#1B4FDB] hover:shadow-md transition-all group"
            >
              {/* Cube size badge */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-lg mb-4 font-mono"
                style={{ backgroundColor: t.color }}
              >
                {t.cubeType === '2x2' ? '2²' : '3³'}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColors[t.difficulty]}`}>
                  {t.difficulty}
                </span>
                <span className="text-xs text-[#64748B]">{t.estimatedTime}</span>
              </div>

              <h2 className="text-lg font-bold text-[#1E293B] mb-1 group-hover:text-[#1B4FDB] transition-colors">
                {t.title}
              </h2>
              <p className="text-sm text-[#64748B] mb-1">{t.subtitle}</p>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{t.description}</p>

              <div className="mt-4 flex items-center gap-1 text-sm font-semibold" style={{ color: t.color }}>
                Start learning
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
