import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tutorials', label: 'Learn' },
    { to: '/solver', label: 'Solve' },
  ]

  return (
    <header className="bg-[#0F172A] sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 grid grid-cols-2 grid-rows-2 gap-0.5 rounded-sm overflow-hidden">
              <div className="bg-[#C41E3A]"></div>
              <div className="bg-[#FFD500]"></div>
              <div className="bg-[#009B48]"></div>
              <div className="bg-[#0046AD]"></div>
            </div>
            <span className="text-white font-bold text-xl tracking-tight group-hover:text-[#FBBF24] transition-colors">
              Rubix<span className="text-[#1B4FDB]">Larq</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'bg-[#1B4FDB] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/solver"
              className="ml-3 px-4 py-2 bg-[#1B4FDB] hover:bg-[#1338A8] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Solve My Cube →
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="sm:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden overflow-hidden pb-4"
            >
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                    location.pathname === to
                      ? 'bg-[#1B4FDB] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
