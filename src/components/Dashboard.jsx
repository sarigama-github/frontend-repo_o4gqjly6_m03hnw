import { motion } from 'framer-motion'
import { Gauge, ShieldAlert, Network, Hash, FileUp, BarChart3 } from 'lucide-react'
import { useState } from 'react'

const Tile = ({ title, value, suffix, accent = 'from-cyan-400 to-indigo-400', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative rounded-3xl p-5 backdrop-blur-xl bg-white/70 border border-white/60 shadow-2xl shadow-cyan-200/40"
  >
    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${accent} opacity-20`} />
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <p className="mt-1 text-3xl font-bold text-slate-900 tracking-tight">
          {value}
          {suffix && <span className="text-lg font-semibold text-slate-500 ml-1">{suffix}</span>}
        </p>
      </div>
      <div className="h-12 w-12 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center shadow-md">
        {children}
      </div>
    </div>
  </motion.div>
)

export default function Dashboard() {
  const [file, setFile] = useState(null)
  const [hash, setHash] = useState('—')

  const onDrop = async (e) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0]
    if (!f) return
    setFile({ name: f.name, size: f.size })
    // Fake hash generation UI demo
    const buf = await f.arrayBuffer()
    const hex = [...new Uint8Array(await crypto.subtle.digest('SHA-256', buf))].map(b => b.toString(16).padStart(2, '0')).join('')
    setHash(hex)
  }

  return (
    <section className="relative z-10 -mt-24">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="relative h-56 rounded-3xl border-2 border-dashed border-cyan-300/60 bg-white/70 backdrop-blur-xl flex items-center justify-center text-center shadow-2xl"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/30 via-sky-400/30 to-indigo-400/30" />
              <div className="relative">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-white/80 border border-white/60 flex items-center justify-center mb-3 shadow-md">
                  <FileUp className="h-7 w-7 text-cyan-600" />
                </div>
                <p className="text-slate-800 font-semibold">Drag & Drop PCAP</p>
                <p className="text-slate-600 text-sm">or click to browse</p>
                {file && (
                  <div className="mt-3 text-sm text-slate-700">
                    <p>File: <span className="font-medium">{file.name}</span> • {(file.size/1024/1024).toFixed(2)} MB</p>
                    <p className="truncate">SHA-256: <span className="font-mono">{hash}</span></p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <Tile title="Flows flagged TOR-like" value="23" suffix="%">
              <ShieldAlert className="h-6 w-6 text-cyan-600" />
            </Tile>
            <Tile title="Suspicious IPs" value="47">
              <Network className="h-6 w-6 text-indigo-600" />
            </Tile>
            <Tile title="Sessions analyzed" value="12,408">
              <BarChart3 className="h-6 w-6 text-sky-600" />
            </Tile>
            <Tile title="Latest hash" value={hash.slice(0, 10)} suffix="…" accent="from-purple-400 to-pink-400">
              <Hash className="h-6 w-6 text-purple-600" />
            </Tile>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-6 bg-white/70 border border-white/60 backdrop-blur-xl shadow-2xl">
            <h3 className="font-semibold text-slate-900">Detection Confidence</h3>
            <div className="mt-4 h-3 rounded-full bg-gradient-to-r from-cyan-200 via-sky-300 to-indigo-300">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
            </div>
            <p className="mt-3 text-sm text-slate-600">Statistical fingerprinting • JA3/TLS analysis • Bridge detection</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl p-6 bg-white/70 border border-white/60 backdrop-blur-xl shadow-2xl">
            <h3 className="font-semibold text-slate-900">Latest Analysis Timeline</h3>
            <div className="mt-4 space-y-4">
              {["PCAP Uploaded","JA3 profiles extracted","TOR bridge suspected","Sessions reconstructed","Report generated"].map((t,i)=> (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-1 top-1.5 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                  <p className="text-sm text-slate-700">{t}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
