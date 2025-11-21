import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] pt-24 overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white pointer-events-none" />

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-300/60 bg-white/70 text-cyan-700 shadow-sm shadow-cyan-200/50">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              Live 3D Intelligence Canvas
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              Project VIZHI – Digital Forensic Intelligence for TOR Traffic Analysis
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-600">
              Real-time forensic intelligence, topology mapping, and anonymization tracking — powered by a high-fidelity 3D globe and cyber-grade analytics.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <button className="group relative overflow-hidden rounded-2xl px-6 py-3 font-semibold text-slate-900">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400" />
                <div className="absolute inset-0 backdrop-blur-xl bg-white/20" />
                <span className="relative inline-flex items-center gap-2">
                  Upload PCAP
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </button>
              <div className="px-5 py-3 rounded-2xl border border-white/60 bg-white/70 shadow-sm">
                <p className="text-sm text-slate-600">Supports PCAP, PCAPNG • Drag & Drop • SHA-256 hashing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
