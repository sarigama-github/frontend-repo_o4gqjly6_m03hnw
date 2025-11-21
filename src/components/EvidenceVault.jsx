import { Archive, Download, GitBranch } from 'lucide-react'

const items = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  hash: 'f9b2a7c6...' + (1000 + i),
  timestamp: new Date(Date.now() - i * 86400000).toISOString(),
  artifacts: ['flows.csv', 'graph.graphml', 'report.pdf']
}))

export default function EvidenceVault() {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-white/70 border border-white/60 backdrop-blur-xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Evidence Vault</h3>
          </div>

          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map(it => (
              <div key={it.id} className="relative rounded-3xl p-5 bg-white/80 border border-white/60 shadow-xl">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-sky-400/20 to-indigo-400/20" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center">
                      <Archive className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">SHA-256</p>
                      <p className="font-mono text-slate-900">{it.hash}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{new Date(it.timestamp).toLocaleString()}</p>
                  <div className="mt-4 grid gap-2">
                    {it.artifacts.map((a, i) => (
                      <button key={i} className="group flex items-center justify-between w-full rounded-xl bg-white/80 border border-white/60 px-3 py-2 text-sm hover:shadow">
                        <span>{a}</span>
                        <Download className="h-4 w-4 text-cyan-600 group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-cyan-400/60 pl-6">
            <div className="flex items-center gap-2 text-slate-700">
              <GitBranch className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-medium">Chain of custody</span>
            </div>
            <div className="mt-3 space-y-3">
              {["Captured","Processed","Analyzed","Packaged","Signed"].map((s,i)=> (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-1 top-1.5 h-2 w-2 rounded-full bg-cyan-500" />
                  <p className="text-sm text-slate-600">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
