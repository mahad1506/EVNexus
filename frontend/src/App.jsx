import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AboutContactPage from './pages/AboutContact.jsx'
import AssistantPage from './pages/Assistant.jsx'
import CataloguePage from './pages/Catalouge.jsx'
import ComparePage from './pages/Compare.jsx'
import HomePage from './pages/home.jsx'
import MapPage from './pages/Map.jsx'
import ReviewsPage from './pages/Reviews.jsx'
import ToolsPage from './pages/Tools.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CataloguePage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/about" element={<AboutContactPage />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  )
}

export default App
