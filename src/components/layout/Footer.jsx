import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-2">
              <div className="w-6 h-6 grid grid-cols-2 grid-rows-2 gap-0.5 rounded-sm overflow-hidden">
                <div className="bg-[#C41E3A]"></div>
                <div className="bg-[#FFD500]"></div>
                <div className="bg-[#009B48]"></div>
                <div className="bg-[#0046AD]"></div>
              </div>
              <span className="text-white font-bold text-lg">
                Rubix<span className="text-[#1B4FDB]">Larq</span>
              </span>
            </div>
            <p className="text-sm text-slate-500">Learn. Solve. Master.</p>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/tutorials" className="hover:text-white transition-colors">Learn</Link>
            <Link to="/solver" className="hover:text-white transition-colors">Solve</Link>
          </nav>

          {/* Credit */}
          <p className="text-xs text-slate-600 text-center sm:text-right">
            © {new Date().getFullYear()} RubixLarq
            <br />
            Built for puzzle enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}
