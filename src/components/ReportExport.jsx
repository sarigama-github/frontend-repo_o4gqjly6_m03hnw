import { FileDown, LayoutGrid } from 'lucide-react'

export default function ReportExport() {
  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl bg-white/70 border border-white/60 backdrop-blur-xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Report Export</h3>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 text-slate-900 font-semibold shadow">Export PDF</button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-slate-900 font-semibold shadow">Export CSV</button>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-teal-400 text-slate-900 font-semibold shadow">Export GraphML</button>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {["Summary","Flows","Global Map","Evidence"].map((tab,i)=> (
              <div key={i} className="relative rounded-3xl p-6 bg-white/80 border border-white/60 shadow-xl min-h-[160px]">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/20 via-sky-400/20 to-indigo-400/20" />
                <div className="relative flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-white/70 border border-white/60 flex items-center justify-center">
                    <LayoutGrid className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{tab}</p>
                    <p className="text-sm text-slate-600 mt-1">Professional preview of the {tab.toLowerCase()} section with suspicious flows highlighted in a red gradient.</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
