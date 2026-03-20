import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import SolverPage from './pages/SolverPage'
import TutorialsPage from './pages/TutorialsPage'
import TutorialDetailPage from './pages/TutorialDetailPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solver" element={<SolverPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorials/:id" element={<TutorialDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
