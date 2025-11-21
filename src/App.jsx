import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import Map3D from './components/Map3D'
import FlowExplorer from './components/FlowExplorer'
import EvidenceVault from './components/EvidenceVault'
import ReportExport from './components/ReportExport'

function Landing() {
  return (
    <div className="min-h-screen bg-[conic-gradient(at_20%_10%,#e6f4ff_0%,#ffffff_30%,#f1f5ff_60%,#ffffff_100%)]">
      <Navbar />
      <Hero />
      <Dashboard />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<Map3D />} />
        <Route path="/flows" element={<FlowExplorer />} />
        <Route path="/evidence" element={<EvidenceVault />} />
        <Route path="/reports" element={<ReportExport />} />
      </Routes>
    </div>
  )
}
