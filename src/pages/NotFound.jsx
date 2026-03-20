import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🧩</div>
      <h1 className="text-4xl font-extrabold text-[#0F172A] mb-2">404</h1>
      <p className="text-[#64748B] text-lg mb-8">This page got scrambled and we can't find it.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#1B4FDB] hover:bg-[#1338A8] text-white font-semibold rounded-xl transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
