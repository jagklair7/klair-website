import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Sparkline ─────────────────────────────────────────────────────────────
function Sparkline({ values = [], color = '#00e5ff', height = 36 }) {
  if (values.length < 2) return null
  const w = 120, h = height, pad = 2
  const min = Math.min(...values), max = Math.max(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (v - min) / range) * (h - pad * 2)
    return `${x},${y}`
  })
  const path = 'M' + pts.join(' L')
  const area = `${path} L${w - pad},${h} L${pad},${h} Z`
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: 120, height, display: 'block' }}>
      <defs>
        <linearGradient id={`sp-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp-${color.replace('#','')})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Network Throughput Chart ───────────────────────────────────────────────
function ThroughputChart({ data }) {
  if (!data?.length) return null
  const w = 560, h = 140, pad = { t: 10, r: 10, b: 28, l: 38 }
  const iw = w - pad.l - pad.r, ih = h - pad.t - pad.b
  const vals = data.map(d => d.value)
  const max = Math.max(...vals, 1)
  const pts = data.map((d, i) => ({
    x: pad.l + (i / (data.length - 1)) * iw,
    y: pad.t + (1 - d.value / max) * ih,
    label: d.label,
    value: d.value
  }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const area = `${path} L${pts[pts.length-1].x},${pad.t + ih} L${pts[0].x},${pad.t + ih} Z`

  // Grid lines
  const gridLines = [0, 0.25, 0.5, 0.75, 1].map(r => ({
    y: pad.t + r * ih,
    label: Math.round(max * (1 - r))
  }))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      <defs>
        <linearGradient id="throughput-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={pad.l} y1={g.y} x2={pad.l + iw} y2={g.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={pad.l - 6} y={g.y + 4} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.25)">{g.label}</text>
        </g>
      ))}
      <path d={area} fill="url(#throughput-grad)" />
      <path d={path} fill="none" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <text x={p.x} y={h - 6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.25)">{p.label}</text>
        </g>
      ))}
      {/* Last point highlight */}
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="4" fill="#00e5ff" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="8" fill="#00e5ff" fillOpacity="0.15" />
    </svg>
  )
}

// ── CPU / Memory Gauge ────────────────────────────────────────────────────
function ArcGauge({ value = 0, color = '#00e5ff', size = 80, label }) {
  const r = 30, cx = 40, cy = 40
  const circ = 2 * Math.PI * r
  const arc = circ * 0.75
  const offset = arc - (value / 100) * arc
  const rotation = 135

  const getColor = (v) => {
    if (v >= 90) return '#ef4444'
    if (v >= 75) return '#f59e0b'
    return color
  }
  const c = getColor(value)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size} viewBox="0 0 80 80">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"
          strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset="0"
          strokeLinecap="round"
          transform={`rotate(${rotation} ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="6"
          strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.6s ease, stroke 0.3s' }} />
        <text x={cx} y={cy + 2} textAnchor="middle" dominantBaseline="middle"
          fontSize="13" fontWeight="700" fill={c}>{value}%</text>
      </svg>
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}

// ── Remote Desktop Session Card ───────────────────────────────────────────
function SessionCard({ session }) {
  const statusColor = session.status === 'active' ? '#00e5ff' : session.status === 'idle' ? '#f59e0b' : '#ef4444'
  const statusLabel = session.status === 'active' ? 'Active' : session.status === 'idle' ? 'Idle' : 'Disconnected'
  const osBadge = { windows: '⊞', macos: '', linux: '🐧' }

  return (
    <div className="session-card">
      <div className="session-card__header">
        <div className="session-card__os">{osBadge[session.os] || '⊞'}</div>
        <div className="session-card__info">
          <div className="session-card__name">{session.hostname}</div>
          <div className="session-card__ip">{session.ip}</div>
        </div>
        <div className="session-card__status">
          <div className="session-status-dot" style={{ background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
          <span style={{ color: statusColor, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{statusLabel}</span>
        </div>
      </div>
      <div className="session-card__metrics">
        <ArcGauge value={session.cpu} color="#00e5ff" size={64} label="CPU" />
        <ArcGauge value={session.mem} color="#a78bfa" size={64} label="RAM" />
        <ArcGauge value={session.disk} color="#34d399" size={64} label="Disk" />
      </div>
      <div className="session-card__footer">
        <span className="session-tag">{session.user}</span>
        <span className="session-tag">{session.duration}</span>
        <button className="session-btn">Connect →</button>
      </div>
    </div>
  )
}

// ── Alert Row ─────────────────────────────────────────────────────────────
function AlertRow({ alert }) {
  const sev = { critical: '#ef4444', warning: '#f59e0b', info: '#00e5ff' }
  const c = sev[alert.severity] || '#94a3b8'
  return (
    <div className="alert-row">
      <div className="alert-row__bar" style={{ background: c }} />
      <div className="alert-row__icon" style={{ color: c }}>
        {alert.severity === 'critical' ? '⚠' : alert.severity === 'warning' ? '⚡' : 'ℹ'}
      </div>
      <div className="alert-row__body">
        <div className="alert-row__msg">{alert.message}</div>
        <div className="alert-row__meta">{alert.host} · {alert.time}</div>
      </div>
      <div className="alert-row__badge" style={{ background: `${c}18`, color: c, border: `1px solid ${c}30` }}>
        {alert.severity}
      </div>
    </div>
  )
}

// ── Network Node Map (simplified) ─────────────────────────────────────────
function NetworkMap() {
  const nodes = [
    { id: 'fw', label: 'Firewall', x: 50, y: 15, type: 'firewall', status: 'ok' },
    { id: 'sw1', label: 'Core SW', x: 50, y: 42, type: 'switch', status: 'ok' },
    { id: 'ap1', label: 'AP-01', x: 18, y: 68, type: 'ap', status: 'ok' },
    { id: 'ap2', label: 'AP-02', x: 50, y: 68, type: 'ap', status: 'warn' },
    { id: 'ap3', label: 'AP-03', x: 82, y: 68, type: 'ap', status: 'ok' },
    { id: 'srv', label: 'NAS', x: 20, y: 42, type: 'server', status: 'ok' },
    { id: 'cam', label: 'NVR', x: 80, y: 42, type: 'camera', status: 'ok' },
  ]
  const edges = [
    ['fw','sw1'],['sw1','ap1'],['sw1','ap2'],['sw1','ap3'],['sw1','srv'],['sw1','cam']
  ]
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]))
  const statusColor = { ok: '#34d399', warn: '#f59e0b', err: '#ef4444' }
  const typeIcon = { firewall: '🛡', switch: '⬡', ap: '📡', server: '🖥', camera: '📷' }

  return (
    <svg viewBox="0 0 100 90" style={{ width: '100%', height: 'auto' }}>
      {edges.map(([a, b], i) => {
        const na = nodeMap[a], nb = nodeMap[b]
        return (
          <line key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"
            strokeDasharray={na.status === 'warn' || nb.status === 'warn' ? '2,2' : undefined} />
        )
      })}
      {nodes.map(n => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="7" fill="rgba(255,255,255,0.04)" stroke={statusColor[n.status]} strokeWidth="0.8" />
          <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="6">{typeIcon[n.type]}</text>
          <text x={n.x} y={n.y + 11} textAnchor="middle" fontSize="4.5" fill="rgba(255,255,255,0.4)">{n.label}</text>
          {n.status !== 'ok' && (
            <circle cx={n.x + 5} cy={n.y - 5} r="2.5" fill={statusColor[n.status]} />
          )}
        </g>
      ))}
    </svg>
  )
}

// ── Static demo data ──────────────────────────────────────────────────────
const SESSIONS = [
  { hostname: 'WORKSTATION-04', ip: '192.168.1.42', os: 'windows', status: 'active', cpu: 67, mem: 72, disk: 48, user: 'j.miller', duration: '2h 14m' },
  { hostname: 'MacBook-CEO', ip: '192.168.1.18', os: 'macos', status: 'active', cpu: 22, mem: 58, disk: 31, user: 'p.zhang', duration: '45m' },
  { hostname: 'DEVBOX-LINUX', ip: '192.168.1.71', os: 'linux', status: 'idle', cpu: 4, mem: 34, disk: 87, user: 'k.osei', duration: '6h 02m' },
  { hostname: 'RECEPTION-PC', ip: '192.168.1.9', os: 'windows', status: 'active', cpu: 11, mem: 45, disk: 29, user: 'reception', duration: '1h 33m' },
]

const ALERTS = [
  { severity: 'critical', message: 'DEVBOX-LINUX disk usage above 85%', host: '192.168.1.71', time: '2 min ago' },
  { severity: 'warning', message: 'AP-02 signal degraded — 2.4GHz band', host: 'AP-02', time: '18 min ago' },
  { severity: 'info', message: 'Scheduled backup completed successfully', host: 'NAS', time: '1h ago' },
  { severity: 'warning', message: 'WORKSTATION-04 CPU sustained above 60%', host: '192.168.1.42', time: '2h ago' },
  { severity: 'info', message: 'New RDP session opened by k.osei', host: 'DEVBOX-LINUX', time: '6h ago' },
]

const THROUGHPUT_DATA = [
  { label: '00:00', value: 42 }, { label: '02:00', value: 28 }, { label: '04:00', value: 15 },
  { label: '06:00', value: 19 }, { label: '08:00', value: 87 }, { label: '10:00', value: 110 },
  { label: '12:00', value: 98 }, { label: '14:00', value: 130 }, { label: '16:00', value: 122 },
  { label: '18:00', value: 94 }, { label: '20:00', value: 76 }, { label: 'Now', value: 58 },
]

const KPI_DATA = [
  { label: 'Online Devices', value: '24 / 26', sub: '2 offline', color: '#00e5ff', spark: [18,20,21,22,22,24,23,24] },
  { label: 'Active Sessions', value: '4', sub: '↑ 2 vs yesterday', color: '#a78bfa', spark: [1,2,2,3,4,3,4,4] },
  { label: 'Avg Latency', value: '4.2 ms', sub: 'LAN round-trip', color: '#34d399', spark: [6,5,5,4,4,4,4,4] },
  { label: 'Open Alerts', value: '2', sub: '1 critical', color: '#f59e0b', spark: [0,1,0,0,2,3,2,2] },
]

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function Dashboard() {
  const [tick, setTick] = useState(0)
  const [networkIn, setNetworkIn] = useState(58)
  const [networkOut, setNetworkOut] = useState(34)

  // Simulate live ticking metrics
  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1)
      setNetworkIn(v => Math.max(10, Math.min(160, v + (Math.random() - 0.48) * 12)))
      setNetworkOut(v => Math.max(5, Math.min(80, v + (Math.random() - 0.5) * 8)))
    }, 2500)
    return () => clearInterval(id)
  }, [])

  const now = new Date()

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        :root {
          --cyan: #00e5ff;
          --violet: #a78bfa;
          --green: #34d399;
          --amber: #f59e0b;
          --red: #ef4444;
          --bg: #07090f;
          --surface: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.07);
          --text: rgba(255,255,255,0.85);
          --muted: rgba(255,255,255,0.35);
        }

        .km-wrap {
          min-height: 100vh;
          background: var(--bg);
          font-family: 'Syne', sans-serif;
          background-image:
            radial-gradient(ellipse 60% 40% at 10% 0%, rgba(0,229,255,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 90% 100%, rgba(167,139,250,0.06) 0%, transparent 60%);
        }

        /* ── Header ── */
        .km-header {
          padding: 96px 40px 0;
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .km-header::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 40px; right: 40px;
          height: 1px;
          background: linear-gradient(90deg, var(--cyan), transparent 60%);
          opacity: 0.4;
        }
        .km-header__inner {
          max-width: 1320px;
          margin: 0 auto;
          padding-bottom: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .km-wordmark {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }
        .km-wordmark__logo {
          width: 32px; height: 32px;
          background: linear-gradient(135deg, var(--cyan), var(--violet));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-family: 'Space Mono', monospace;
          color: #07090f;
          font-weight: 700;
        }
        .km-wordmark__name {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .km-header__title {
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          color: white;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .km-header__title span { color: var(--cyan); }
        .km-header__sub {
          font-size: 13px;
          color: var(--muted);
          margin-top: 8px;
          font-family: 'Space Mono', monospace;
        }
        .km-header__right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
        }
        .km-live-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 6px;
          padding: 7px 14px;
          font-size: 11px;
          font-weight: 700;
          color: var(--cyan);
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.05em;
        }
        .km-live-dot {
          width: 7px; height: 7px;
          background: var(--cyan);
          border-radius: 50%;
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        .km-clock {
          font-family: 'Space Mono', monospace;
          font-size: 22px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.05em;
        }
        .km-date {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--muted);
          text-align: right;
        }

        /* ── Body ── */
        .km-body {
          max-width: 1320px;
          margin: 0 auto;
          padding: 32px 40px 80px;
        }

        /* ── KPI Strip ── */
        .km-kpi-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .km-kpi {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: border-color 0.2s, transform 0.2s;
          position: relative;
          overflow: hidden;
        }
        .km-kpi::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--kpi-color, var(--cyan));
          opacity: 0.5;
        }
        .km-kpi:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }
        .km-kpi__left { flex: 1; min-width: 0; }
        .km-kpi__label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .km-kpi__value {
          font-size: 26px;
          font-weight: 800;
          color: var(--kpi-color, white);
          line-height: 1;
          letter-spacing: -0.02em;
          font-family: 'Space Mono', monospace;
        }
        .km-kpi__sub {
          font-size: 10px;
          color: var(--muted);
          margin-top: 5px;
          font-family: 'Space Mono', monospace;
        }

        /* ── Section label ── */
        .km-section-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .km-section-label::before {
          content: '';
          width: 16px; height: 1px;
          background: var(--cyan);
          opacity: 0.6;
        }

        /* ── Main grid ── */
        .km-main-grid {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 16px;
          margin-bottom: 20px;
        }

        /* ── Panel ── */
        .km-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          backdrop-filter: blur(8px);
        }
        .km-panel__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .km-panel__title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .km-panel__meta {
          font-size: 10px;
          font-family: 'Space Mono', monospace;
          color: var(--muted);
        }

        /* ── Network live stats ── */
        .km-net-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 16px;
        }
        .km-net-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .km-net-stat__val {
          font-family: 'Space Mono', monospace;
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
        .km-net-stat__label {
          font-size: 10px;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .km-net-stat__arrow { font-size: 12px; margin-right: 4px; }

        /* ── Network map panel ── */
        .km-netmap {
          padding: 20px;
        }

        /* ── Sessions grid ── */
        .km-sessions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }
        .session-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          transition: border-color 0.2s;
        }
        .session-card:hover { border-color: rgba(0,229,255,0.2); }
        .session-card__header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .session-card__os {
          font-size: 20px;
          line-height: 1;
        }
        .session-card__info { flex: 1; }
        .session-card__name {
          font-size: 13px;
          font-weight: 700;
          color: white;
          font-family: 'Space Mono', monospace;
        }
        .session-card__ip {
          font-size: 10px;
          color: var(--muted);
          font-family: 'Space Mono', monospace;
          margin-top: 2px;
        }
        .session-card__status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        .session-status-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .session-card__metrics {
          display: flex;
          justify-content: space-around;
          margin-bottom: 16px;
          padding: 12px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .session-card__footer {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .session-tag {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: var(--muted);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 3px 8px;
        }
        .session-btn {
          margin-left: auto;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: var(--cyan);
          background: rgba(0,229,255,0.07);
          border: 1px solid rgba(0,229,255,0.2);
          border-radius: 6px;
          padding: 5px 12px;
          cursor: pointer;
          transition: background 0.15s;
          letter-spacing: 0.04em;
        }
        .session-btn:hover { background: rgba(0,229,255,0.14); }

        /* ── Alerts ── */
        .km-alerts-panel { }
        .alert-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          position: relative;
          margin-bottom: 6px;
          background: rgba(255,255,255,0.02);
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .alert-row__bar {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
        }
        .alert-row__icon {
          font-size: 14px;
          flex-shrink: 0;
          margin-left: 6px;
        }
        .alert-row__body { flex: 1; min-width: 0; }
        .alert-row__msg {
          font-size: 12px;
          color: rgba(255,255,255,0.75);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .alert-row__meta {
          font-size: 10px;
          color: var(--muted);
          font-family: 'Space Mono', monospace;
          margin-top: 2px;
        }
        .alert-row__badge {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 2px 8px;
          border-radius: 4px;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* ── Bottom grid ── */
        .km-bottom-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 16px;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .km-main-grid { grid-template-columns: 1fr; }
          .km-bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .km-sessions-grid { grid-template-columns: 1fr; }
          .km-kpi-strip { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .km-header { padding: 90px 20px 0; }
          .km-body { padding: 20px 20px 60px; }
          .km-kpi-strip { grid-template-columns: 1fr 1fr; gap: 10px; }
        }
      `}} />

      <Navbar />

      <div className="km-wrap">
        {/* ── Header ── */}
        <div className="km-header">
          <div className="km-header__inner">
            <div>
              <div className="km-wordmark">
                <div className="km-wordmark__logo">K</div>
                <div className="km-wordmark__name">Klair Monitoring</div>
              </div>
              <div className="km-header__title">
                Infrastructure <span>Overview</span>
              </div>
              <div className="km-header__sub">
                Site: HQ · Edmonton, AB · 26 managed endpoints
              </div>
            </div>
            <div className="km-header__right">
              <Clock />
              <div className="km-live-badge">
                <div className="km-live-dot" />
                Live · Refreshes every 30s
              </div>
            </div>
          </div>
        </div>

        <div className="km-body">

          {/* ── KPI Strip ── */}
          <div className="km-kpi-strip" style={{ marginBottom: 24 }}>
            {KPI_DATA.map((k, i) => (
              <div key={i} className="km-kpi" style={{ '--kpi-color': k.color }}>
                <div className="km-kpi__left">
                  <div className="km-kpi__label">{k.label}</div>
                  <div className="km-kpi__value">{k.value}</div>
                  <div className="km-kpi__sub">{k.sub}</div>
                </div>
                <Sparkline values={k.spark} color={k.color} />
              </div>
            ))}
          </div>

          {/* ── Network + Map ── */}
          <div className="km-section-label" style={{ marginBottom: 12 }}>Network Monitoring</div>
          <div className="km-main-grid" style={{ marginBottom: 20 }}>
            <div className="km-panel">
              <div className="km-panel__head">
                <div className="km-panel__title">Throughput — LAN / WAN</div>
                <div className="km-panel__meta">Last 24h · Mbps</div>
              </div>
              <div className="km-net-stats">
                <div className="km-net-stat">
                  <div className="km-net-stat__val" style={{ color: '#00e5ff' }}>
                    <span className="km-net-stat__arrow" style={{ color: '#00e5ff' }}>↓</span>
                    {networkIn.toFixed(1)} Mb/s
                  </div>
                  <div className="km-net-stat__label">Inbound</div>
                </div>
                <div className="km-net-stat">
                  <div className="km-net-stat__val" style={{ color: '#a78bfa' }}>
                    <span className="km-net-stat__arrow" style={{ color: '#a78bfa' }}>↑</span>
                    {networkOut.toFixed(1)} Mb/s
                  </div>
                  <div className="km-net-stat__label">Outbound</div>
                </div>
                <div className="km-net-stat">
                  <div className="km-net-stat__val" style={{ color: '#34d399' }}>4.2 ms</div>
                  <div className="km-net-stat__label">Latency</div>
                </div>
                <div className="km-net-stat">
                  <div className="km-net-stat__val" style={{ color: 'rgba(255,255,255,0.7)' }}>0.01%</div>
                  <div className="km-net-stat__label">Packet Loss</div>
                </div>
              </div>
              <ThroughputChart data={THROUGHPUT_DATA} />
            </div>

            {/* Network Map */}
            <div className="km-panel km-netmap">
              <div className="km-panel__head">
                <div className="km-panel__title">Topology</div>
                <div className="km-panel__meta">7 nodes</div>
              </div>
              <NetworkMap />
              <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap' }}>
                {[['#34d399','Operational'],['#f59e0b','Degraded'],['#ef4444','Down']].map(([c,l]) => (
                  <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Remote Sessions ── */}
          <div className="km-section-label">Remote Desktop Sessions</div>
          <div className="km-sessions-grid">
            {SESSIONS.map((s, i) => <SessionCard key={i} session={s} />)}
          </div>

          {/* ── Alerts + Summary ── */}
          <div className="km-bottom-grid">
            {/* Summary panel */}
            <div className="km-panel">
              <div className="km-panel__head">
                <div className="km-panel__title">System Health</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Firewall', val: '99.98%', color: '#34d399', status: 'Operational' },
                  { label: 'DNS / DHCP', val: '100%', color: '#34d399', status: 'Operational' },
                  { label: 'Wi-Fi APs', val: '2/3 OK', color: '#f59e0b', status: 'Degraded' },
                  { label: 'NAS Backup', val: '99.5%', color: '#34d399', status: 'Operational' },
                  { label: 'VPN Gateway', val: '99.9%', color: '#34d399', status: 'Operational' },
                  { label: 'IP Cameras', val: '100%', color: '#34d399', status: 'Operational' },
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: row.color, boxShadow: `0 0 5px ${row.color}`, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: row.color }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="km-panel km-alerts-panel">
              <div className="km-panel__head">
                <div className="km-panel__title">Recent Alerts</div>
                <div className="km-panel__meta">Last 24h</div>
              </div>
              {ALERTS.map((a, i) => <AlertRow key={i} alert={a} />)}
            </div>
          </div>

        </div>
      </div>

      <Footer onPolicyClick={() => {}} />
    </>
  )
}

// ── Live Clock ────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <div style={{ textAlign: 'right' }}>
      <div className="km-clock">{time.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</div>
      <div className="km-date">{time.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  )
}
