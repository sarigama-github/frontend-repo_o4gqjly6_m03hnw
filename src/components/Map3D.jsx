import { useEffect, useRef } from 'react'

// Simple D3-like arcs using SVG for a 3D-ish topo feel
const sampleNodes = [
  { id: 'nyc', name: 'New York', x: 140, y: 80, role: 'external' },
  { id: 'lon', name: 'London', x: 260, y: 70, role: 'external' },
  { id: 'blr', name: 'Bengaluru', x: 430, y: 150, role: 'suspicious' },
  { id: 'sfo', name: 'San Francisco', x: 90, y: 100, role: 'internal' }
]

const sampleEdges = [
  { s: 'nyc', t: 'lon', bytes: 1.2, score: 0.2 },
  { s: 'lon', t: 'blr', bytes: 3.4, score: 0.7 },
  { s: 'sfo', t: 'nyc', bytes: 2.1, score: 0.4 },
  { s: 'blr', t: 'sfo', bytes: 4.8, score: 0.9 }
]

function roleColor(role) {
  if (role === 'suspicious') return '#ef4444'
  if (role === 'internal') return '#fb923c'
  return '#3b82f6'
}

export default function Map3D() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
  }, [])

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/60 shadow-2xl p-4">
          <div className="flex items-center justify-between px-2 py-2">
            <h3 className="font-semibold text-slate-900">Interactive World Topology Map</h3>
            <div className="text-xs text-slate-600">Zoom • Drag • Rotate • Live tooltips</div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/60">
            <svg ref={svgRef} viewBox="0 0 520 260" className="w-full h-[420px] bg-[radial-gradient(circle_at_30%_20%,#e0f2fe_0%,#ffffff_60%)]">
              {/* arcs */}
              {sampleEdges.map((e, i) => {
                const s = sampleNodes.find(n => n.id === e.s)
                const t = sampleNodes.find(n => n.id === e.t)
                const mx = (s.x + t.x) / 2
                const my = Math.min(s.y, t.y) - 30 - i * 3
                const thick = 1 + e.bytes
                const grad = e.score < 0.33 ? '#3b82f6' : e.score < 0.66 ? '#9333ea' : '#ef4444'
                return (
                  <path
                    key={i}
                    d={`M ${s.x},${s.y} Q ${mx},${my} ${t.x},${t.y}`}
                    fill="none"
                    stroke={grad}
                    strokeWidth={thick}
                    opacity="0.85"
                  >
                    <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="2.5s" repeatCount="indefinite" />
                  </path>
                )
              })}

              {/* nodes */}
              {sampleNodes.map((n, i) => (
                <g key={i}>
                  <circle cx={n.x} cy={n.y} r="6" fill={roleColor(n.role)}>
                    <animate attributeName="r" values="6;7;6" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <text x={n.x + 10} y={n.y + 4} fontSize="10" fill="#0f172a">{n.name}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mt-4">
            <div className="rounded-xl bg-white/70 border border-white/60 p-3 text-sm text-slate-700">Red = suspicious</div>
            <div className="rounded-xl bg-white/70 border border-white/60 p-3 text-sm text-slate-700">Orange = internal</div>
            <div className="rounded-xl bg-white/70 border border-white/60 p-3 text-sm text-slate-700">Blue = external</div>
          </div>
        </div>
      </div>
    </section>
  )
}
