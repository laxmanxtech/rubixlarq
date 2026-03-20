import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  show: { transition: { staggerChildren: 0.12 } },
}

function CubeFace({ colors }) {
  return (
    <div className="grid grid-cols-3 gap-0.5 w-16 h-16">
      {colors.map((c, i) => (
        <div key={i} className="rounded-sm" style={{ backgroundColor: c }} />
      ))}
    </div>
  )
}

function AnimatedCube() {
  const faces = [
    ['#C41E3A','#C41E3A','#FFD500','#C41E3A','#C41E3A','#009B48','#0046AD','#FF6B1A','#C41E3A'],
    ['#FFD500','#FFD500','#FFD500','#009B48','#FFD500','#FFD500','#FFD500','#FFD500','#0046AD'],
    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
  ]
  return (
    <motion.div
      className="flex gap-3 items-center"
      animate={{ rotateY: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {faces.map((f, i) => <CubeFace key={i} colors={f} />)}
    </motion.div>
  )
}

const features = [
  {
    icon: '📖',
    title: 'Step-by-Step Tutorials',
    desc: 'Start from zero. Learn the beginner method for 2x2 and 3x3 with clear diagrams and algorithms.',
    color: 'from-blue-500/10 to-blue-500/5',
    border: 'border-blue-200',
  },
  {
    icon: '🧩',
    title: 'Interactive 3D Solver',
    desc: 'Enter your scrambled cube by filling colors on a 3D model. Get a personalized solution with move-by-move guidance.',
    color: 'from-emerald-500/10 to-emerald-500/5',
    border: 'border-emerald-200',
  },
  {
    icon: '🎯',
    title: 'Learn Real Algorithms',
    desc: 'Every step shows the move notation (R, U, F...) and plain English so you actually understand what you\'re doing.',
    color: 'from-yellow-500/10 to-yellow-500/5',
    border: 'border-yellow-200',
  },
]

const steps = [
  { num: '01', title: 'Choose your cube', desc: 'Select 2x2 or 3x3 Rubik\'s cube to get started.' },
  { num: '02', title: 'Fill in your colors', desc: 'Drag colors onto the 3D cube model — face by face — to match your scrambled cube.' },
  { num: '03', title: 'Follow the steps', desc: 'Get a clear stage-by-stage solution with 3D animations and plain English instructions.' },
]

export default function Home() {
  return (
    <div className="bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0F172A] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B4FDB]/20 via-transparent to-[#10B981]/10 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="flex-1 text-center lg:text-left">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-[#1B4FDB]/20 border border-[#1B4FDB]/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                Free · No account needed · Works in browser
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Master the
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4FDB] to-[#10B981]"> Rubik's Cube</span>
                <br />from scratch
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Interactive tutorials and a live 3D solver — learn at your own pace or get step-by-step help solving the cube you're holding right now.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/tutorials"
                  className="px-6 py-3 bg-[#1B4FDB] hover:bg-[#1338A8] text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Start Learning →
                </Link>
                <Link
                  to="/solver"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-colors text-center"
                >
                  Solve My Cube
                </Link>
              </motion.div>
            </div>

            {/* Animated cube visual */}
            <motion.div
              variants={fadeUp}
              className="flex-shrink-0 flex flex-col items-center gap-4"
            >
              <AnimatedCube />
              <p className="text-slate-500 text-sm">Your scrambled cube, solved.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#0F172A] mb-3">Everything you need to solve it</h2>
          <p className="text-[#64748B] text-lg">Built for beginners, useful for everyone.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-gradient-to-br ${f.color} border ${f.border} rounded-2xl p-6`}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">{f.title}</h3>
              <p className="text-[#64748B] text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-[#E2E8F0] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#0F172A] mb-3">How the solver works</h2>
            <p className="text-[#64748B]">Three steps to solving your cube.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#1B4FDB] font-extrabold text-lg font-mono">{s.num}</span>
                </div>
                <h3 className="font-bold text-[#1E293B] mb-2">{s.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/solver"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#1B4FDB] hover:bg-[#1338A8] text-white font-semibold rounded-xl transition-colors"
            >
              Try the Solver
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cube types */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              size: '2×2',
              label: 'Pocket Cube',
              desc: 'The smaller sibling. Fewer pieces but still a proper challenge. Perfect for beginners.',
              color: '#10B981',
              bg: 'bg-emerald-50 border-emerald-200',
              to: '/tutorials/2x2-beginner',
            },
            {
              size: '3×3',
              label: 'Standard Cube',
              desc: 'The classic. Learn the layer-by-layer beginner method, then level up to faster techniques.',
              color: '#1B4FDB',
              bg: 'bg-blue-50 border-blue-200',
              to: '/tutorials/3x3-beginner',
            },
          ].map((cube) => (
            <motion.div
              key={cube.size}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`${cube.bg} border rounded-2xl p-8 flex items-center gap-6`}
            >
              <div
                className="text-5xl font-extrabold font-mono flex-shrink-0"
                style={{ color: cube.color }}
              >
                {cube.size}
              </div>
              <div>
                <div className="font-bold text-[#1E293B] text-lg mb-1">{cube.label}</div>
                <p className="text-[#64748B] text-sm mb-4 leading-relaxed">{cube.desc}</p>
                <Link
                  to={cube.to}
                  className="text-sm font-semibold transition-colors"
                  style={{ color: cube.color }}
                >
                  Start tutorial →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
