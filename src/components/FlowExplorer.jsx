import { useMemo, useState } from 'react'

const mock = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  src_ip: `10.0.${(i%6)+1}.${(i*7)%255}`,
  dst_ip: `${(i%3)+45}.12.${(i%9)+10}.${(i*13)%255}`,
  bytes: Math.floor(2000 + Math.random()*90000),
  ja3: ['771,4865-4866-4867,0-23-65281','771,49195-49196,10-23-43'][i%2],
  tor_score: +(Math.random()).toFixed(2),
  duration: +(2+Math.random()*60).toFixed(1)
}))

function Prob({ p }) {
  const w = Math.round(p*100)
  const color = p < 0.33 ? 'bg-cyan-400' : p < 0.66 ? 'bg-purple-500' : 'bg-rose-500'
  return (
    <div className="w-24 h-2 rounded-full bg-slate-200">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${w}%` }} />
    </div>
  )
}

export default function FlowExplorer() {
  const [q, setQ] = useState('')
  const data = useMemo(() => mock.filter(r => Object.values(r).join(' ').includes(q)), [q])

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-white/70 border border-white/60 backdrop-blur-xl shadow-2xl p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-slate-900">Flow Explorer</h3>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search IP, JA3, bytes..." className="w-72 bg-white/70 border border-white/60 rounded-xl px-3 py-2 text-sm outline-none" />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-sm text-slate-700">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="py-2 pr-6">src_ip</th>
                  <th className="py-2 pr-6">dst_ip</th>
                  <th className="py-2 pr-6">bytes</th>
                  <th className="py-2 pr-6">JA3</th>
                  <th className="py-2 pr-6">tor_score</th>
                  <th className="py-2 pr-6">duration</th>
                </tr>
              </thead>
              <tbody>
                {data.map(r => (
                  <tr key={r.id} className="group hover:bg-white/80 transition">
                    <td className="py-3 pr-6 font-mono">{r.src_ip}</td>
                    <td className="py-3 pr-6 font-mono">{r.dst_ip}</td>
                    <td className="py-3 pr-6">{r.bytes.toLocaleString()}</td>
                    <td className="py-3 pr-6 truncate max-w-[280px]">{r.ja3}</td>
                    <td className="py-3 pr-6"><Prob p={r.tor_score} /></td>
                    <td className="py-3 pr-6">{r.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
