import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Mini chart components (SVG, no deps) ─────────────────────────────────

function LineChart({ data, color = '#7C1C2E' }) {
  if (!data?.length) return null
  const w = 400, h = 120, pad = 12
  const vals = data.map(d => d.value)
  const min = Math.min(...vals), max = Math.max(...vals)
  const range = max - min || 1
  const pts = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (d.value - min) / range) * (h - pad * 2 - 24)
    return { x, y, label: d.label, value: d.value }
  })
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${path} L${pts[pts.length-1].x},${h-24} L${pts[0].x},${h-24} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace('#','')})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill={color} />
          <text x={p.x} y={h - 6} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">{p.label}</text>
        </g>
      ))}
    </svg>
  )
}

function BarChart({ data, color = '#0ea5e9' }) {
  if (!data?.length) return null
  const w = 400, h = 130, pad = 12, barGap = 8
  const vals = data.map(d => d.value)
  const max = Math.max(...vals)
  const barW = (w - pad * 2 - barGap * (data.length - 1)) / data.length

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 'auto' }}>
      {data.map((d, i) => {
        const barH = ((d.value / max) * (h - 32))
        const x = pad + i * (barW + barGap)
        const y = h - 20 - barH
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH}
              rx="4" fill={color} opacity="0.85" />
            <rect x={x} y={y} width={barW} height={4}
              rx="2" fill={color} />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.4)">{d.label}</text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fontSize="9.5" fill={color}>{d.value}</text>
          </g>
        )
      })}
    </svg>
  )
}

function UptimeWidget({ data }) {
  return (
    <div className="uptime-list">
      {data.map((s, i) => {
        const status = s.meta?.status || 'operational'
        const isOp = status === 'operational'
        const isDeg = status === 'degraded'
        return (
          <div key={i} className="uptime-row">
            <div className="uptime-row__left">
              <div className={`uptime-dot ${isOp ? 'uptime-dot--green' : isDeg ? 'uptime-dot--yellow' : 'uptime-dot--red'}`} />
              <span className="uptime-row__name">{s.label}</span>
            </div>
            <div className="uptime-row__right">
              <span className="uptime-row__val">{s.value}%</span>
              <span className={`uptime-badge ${isOp ? 'uptime-badge--green' : isDeg ? 'uptime-badge--yellow' : 'uptime-badge--red'}`}>
                {isOp ? 'Operational' : isDeg ? 'Degraded' : 'Down'}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ActivityTable({ data }) {
  function timeAgo(iso) {
    const d = new Date(iso), now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }
  const icons = { ticket: '🎫', client: '👤', system: '⚙️', security: '🔒', invoice: '📄' }
  const statusColors = { resolved: '#10b981', new: '#0ea5e9', success: '#10b981', open: '#f59e0b', sent: '#a78bfa' }

  return (
    <div className="activity-list">
      {data.map((row, i) => {
        const type = row.meta?.type || 'system'
        const status = row.meta?.status || ''
        return (
          <div key={i} className="activity-row">
            <div className="activity-row__icon">{icons[type] || '📌'}</div>
            <div className="activity-row__body">
              <div className="activity-row__label">{row.label}</div>
              <div className="activity-row__sub">{row.meta?.user} · {timeAgo(row.recorded_at)}</div>
            </div>
            <div className="activity-row__status" style={{ color: statusColors[status] || '#94a3b8' }}>
              {status}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── KPI Card ──────────────────────────────────────────────────────────────
function KPICard({ title, data, config }) {
  if (!data?.length) return null
  const d = data[0]
  const change = d.meta?.change
  const trend = d.meta?.trend
  const val = config.prefix + (Number.isInteger(d.value) ? d.value.toLocaleString() : d.value) + config.suffix

  return (
    <div className="kpi-card">
      <div className="kpi-card__title">{title}</div>
      <div className="kpi-card__value" style={{ color: config.color }}>{val}</div>
      {change !== undefined && (
        <div className={`kpi-card__change ${trend === 'up' ? 'kpi-card__change--up' : 'kpi-card__change--down'}`}>
          {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}{config.suffix || (change < 10 ? '' : '%')} vs last month
        </div>
      )}
      <div className="kpi-card__bar" style={{ '--kpi-color': config.color }} />
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────────────────
export default function Dashboard({ demo = false }) {
  const [widgets, setWidgets] = useState([])
  const [dataMap, setDataMap] = useState({})
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      // Always load demo client for now
      const { data: clients } = await supabase
        .from('dashboard_clients')
        .select('*')
        .eq('slug', 'demo')
        .single()
      setClient(clients)

      const { data: wgts } = await supabase
        .from('dashboard_widgets')
        .select('*')
        .eq('client_id', clients?.id)
        .order('position')
      setWidgets(wgts || [])

      const { data: allData } = await supabase
        .from('dashboard_data')
        .select('*')
        .in('widget_id', (wgts || []).map(w => w.id))
        .order('recorded_at')

      const map = {}
      for (const d of allData || []) {
        if (!map[d.widget_id]) map[d.widget_id] = []
        map[d.widget_id].push(d)
      }
      setDataMap(map)
      setLoading(false)
    }
    load()
  }, [])

  const kpis = widgets.filter(w => w.type === 'kpi')
  const charts = widgets.filter(w => w.type === 'line_chart' || w.type === 'bar_chart')
  const uptime = widgets.find(w => w.type === 'uptime')
  const table = widgets.find(w => w.type === 'table')

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .db-wrap {
          min-height: 100vh;
          background: #080c1a;
          background-image:
            radial-gradient(ellipse at 20% 10%, rgba(124,28,46,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(14,165,233,0.08) 0%, transparent 50%);
        }
        .db-hero {
          padding: 110px 32px 40px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .db-hero__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .db-hero__eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(124,28,46,0.9);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .db-hero__eyebrow::before {
          content: '';
          width: 20px; height: 1px;
          background: var(--burgundy);
        }
        .db-hero__title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(26px, 3vw, 38px);
          color: white;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .db-hero__sub {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
        }
        .db-hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 20px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #10b981;
        }
        .db-hero__badge-dot {
          width: 7px; height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .db-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 32px 32px 80px;
        }

        /* KPI grid */
        .db-kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .kpi-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
          backdrop-filter: blur(12px);
        }
        .kpi-card:hover {
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-2px);
        }
        .kpi-card__title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
        }
        .kpi-card__value {
          font-family: 'DM Serif Display', serif;
          font-size: 34px;
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .kpi-card__change {
          font-size: 12px;
          font-weight: 600;
        }
        .kpi-card__change--up { color: #10b981; }
        .kpi-card__change--down { color: #f87171; }
        .kpi-card__bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--kpi-color);
          opacity: 0.4;
        }

        /* Chart grid */
        .db-chart-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        /* Glass panel */
        .db-panel {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 28px;
          backdrop-filter: blur(12px);
        }
        .db-panel__title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .db-panel__title-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--burgundy);
        }

        /* Bottom grid */
        .db-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 16px;
        }

        /* Uptime */
        .uptime-list { display: flex; flex-direction: column; gap: 10px; }
        .uptime-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .uptime-row__left { display: flex; align-items: center; gap: 10px; }
        .uptime-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .uptime-dot--green { background: #10b981; box-shadow: 0 0 6px #10b981; }
        .uptime-dot--yellow { background: #f59e0b; box-shadow: 0 0 6px #f59e0b; }
        .uptime-dot--red { background: #ef4444; box-shadow: 0 0 6px #ef4444; }
        .uptime-row__name { font-size: 13px; color: rgba(255,255,255,0.7); }
        .uptime-row__right { display: flex; align-items: center; gap: 10px; }
        .uptime-row__val { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); }
        .uptime-badge { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border-radius: 6px; }
        .uptime-badge--green { background: rgba(16,185,129,0.12); color: #10b981; }
        .uptime-badge--yellow { background: rgba(245,158,11,0.12); color: #f59e0b; }
        .uptime-badge--red { background: rgba(239,68,68,0.12); color: #ef4444; }

        /* Activity */
        .activity-list { display: flex; flex-direction: column; gap: 2px; }
        .activity-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          transition: background 0.15s;
        }
        .activity-row:hover { background: rgba(255,255,255,0.04); }
        .activity-row__icon { font-size: 18px; flex-shrink: 0; }
        .activity-row__body { flex: 1; min-width: 0; }
        .activity-row__label { font-size: 13px; color: rgba(255,255,255,0.75); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .activity-row__sub { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }
        .activity-row__status { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; flex-shrink: 0; }

        /* Demo banner */
        .db-demo-banner {
          background: linear-gradient(90deg, rgba(124,28,46,0.15), rgba(14,165,233,0.1));
          border: 1px solid rgba(124,28,46,0.25);
          border-radius: 12px;
          padding: 14px 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .db-demo-banner__text {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
        }
        .db-demo-banner__text strong { color: white; }
        .db-demo-banner__cta {
          font-size: 13px;
          font-weight: 700;
          color: white;
          background: var(--burgundy);
          padding: 8px 18px;
          border-radius: 8px;
          text-decoration: none;
          transition: opacity 0.15s;
          white-space: nowrap;
        }
        .db-demo-banner__cta:hover { opacity: 0.85; }

        .db-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          color: rgba(255,255,255,0.3);
          font-size: 15px;
          gap: 12px;
        }
        .db-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.1);
          border-top-color: var(--burgundy);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 1024px) {
          .db-kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .db-chart-grid { grid-template-columns: 1fr; }
          .db-bottom-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .db-hero { padding: 100px 20px 32px; }
          .db-body { padding: 24px 20px 60px; }
          .db-kpi-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .db-panel { padding: 20px; }
        }
      `}} />

      <Navbar />

      <div className="db-wrap">
        {/* Header */}
        <div className="db-hero">
          <div className="db-hero__inner">
            <div>
              <div className="db-hero__eyebrow">Business Intelligence</div>
              <div className="db-hero__title">{client?.name || 'Dashboard'}</div>
              <div className="db-hero__sub">
                {new Date().toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
            <div className="db-hero__badge">
              <div className="db-hero__badge-dot" />
              Live Data
            </div>
          </div>
        </div>

        <div className="db-body">
          {/* Demo banner */}
          {demo && (
            <div className="db-demo-banner">
              <div className="db-demo-banner__text">
                <strong>This is a demo dashboard.</strong> Your real dashboard will be connected to your actual business data.
              </div>
              <a href="/#contact" className="db-demo-banner__cta">Get Your Dashboard →</a>
            </div>
          )}

          {loading ? (
            <div className="db-loading">
              <div className="db-spinner" />
              Loading dashboard…
            </div>
          ) : (
            <>
              {/* KPIs */}
              <div className="db-kpi-grid">
                {kpis.map(w => (
                  <KPICard key={w.id} title={w.title} data={dataMap[w.id]} config={w.config} />
                ))}
              </div>

              {/* Charts */}
              <div className="db-chart-grid">
                {charts.map(w => (
                  <div key={w.id} className="db-panel">
                    <div className="db-panel__title">
                      {w.title}
                      <div className="db-panel__title-dot" />
                    </div>
                    {w.type === 'line_chart' && <LineChart data={dataMap[w.id]} color={w.config?.color} />}
                    {w.type === 'bar_chart' && <BarChart data={dataMap[w.id]} color={w.config?.color} />}
                  </div>
                ))}
              </div>

              {/* Bottom: uptime + activity */}
              <div className="db-bottom-grid">
                {uptime && (
                  <div className="db-panel">
                    <div className="db-panel__title">
                      {uptime.title}
                      <div className="db-panel__title-dot" style={{ background: '#10b981' }} />
                    </div>
                    <UptimeWidget data={dataMap[uptime.id] || []} />
                  </div>
                )}
                {table && (
                  <div className="db-panel">
                    <div className="db-panel__title">
                      {table.title}
                      <div className="db-panel__title-dot" style={{ background: '#0ea5e9' }} />
                    </div>
                    <ActivityTable data={dataMap[table.id] || []} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer onPolicyClick={() => {}} />
    </>
  )
}
