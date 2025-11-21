import { Link, useLocation } from 'react-router-dom'
import { Menu, X, LayoutDashboard, Globe2, Table2, Archive, FileText } from 'lucide-react'
import { useState } from 'react'

const NavLink = ({ to, icon: Icon, children }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
        active
          ? 'bg-white/70 text-slate-900 shadow-lg shadow-cyan-200/40 border border-cyan-400/60'
          : 'text-slate-700 hover:text-slate-900 hover:bg-white/60 border border-white/40'
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? 'text-cyan-600' : 'text-slate-500 group-hover:text-cyan-600'}`} />
      <span className="font-medium tracking-tight">{children}</span>
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl shadow-2xl shadow-cyan-200/30">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 via-sky-400 to-indigo-400 shadow-lg shadow-cyan-300/40" />
              <div className="leading-tight">
                <p className="text-sm uppercase tracking-widest text-slate-500">Project</p>
                <p className="font-semibold text-slate-900">VIZHI</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <NavLink to="/map" icon={Globe2}>Topology Map</NavLink>
              <NavLink to="/flows" icon={Table2}>Flow Explorer</NavLink>
              <NavLink to="/evidence" icon={Archive}>Evidence Vault</NavLink>
              <NavLink to="/reports" icon={FileText}>Reports</NavLink>
            </div>
            <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 rounded-xl border border-white/50 bg-white/70">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {open && (
            <div className="md:hidden px-4 pb-4 grid gap-2">
              <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
              <NavLink to="/map" icon={Globe2}>Topology Map</NavLink>
              <NavLink to="/flows" icon={Table2}>Flow Explorer</NavLink>
              <NavLink to="/evidence" icon={Archive}>Evidence Vault</NavLink>
              <NavLink to="/reports" icon={FileText}>Reports</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
