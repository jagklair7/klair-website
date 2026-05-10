import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Helpers ───────────────────────────────────────────────────
function timeAgo(iso) {
  if (!iso) return 'never'
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000)
  if (diff < 60)    return `${diff}s ago`
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function uptimeStr(secs) {
  if (!secs) return '—'
  const d = Math.floor(secs / 86400)
  const h = Math.floor((secs % 86400) / 3600)
  const m = Math.floor((secs % 3600) / 60)
  if (d > 0) return `${d}d ${h}h`
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

// ── Mini arc gauge ────────────────────────────────────────────
function MiniGauge({ value = 0, color = '#00e5ff', label }) {
  const r = 18, cx = 22, cy = 22
  const circ = 2 * Math.PI * r
  const arc  = circ * 0.75
  const c = value >= 90 ? '#ef4444' : value >= 75 ? '#f59e0b' : color
  const offset = arc - (Math.min(value, 100) / 100) * arc
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)"
          strokeWidth="4" strokeDasharray={`${arc} ${circ - arc}`}
          strokeLinecap="round" transform={`rotate(135 ${cx} ${cy})`} />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={c}
          strokeWidth="4" strokeDasharray={`${arc} ${circ - arc}`}
          strokeDashoffset={offset} strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
        <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fontWeight="700" fill={c}>{value ?? '—'}%</text>
      </svg>
      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}

// ── AV Badge ──────────────────────────────────────────────────
function AVBadge({ status, avName }) {
  const cfg = {
    protected: { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)',  icon: '🛡', label: 'Protected'  },
    outdated:  { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  icon: '⚠', label: 'Outdated'   },
    disabled:  { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   icon: '✗', label: 'Disabled'   },
    none:      { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',  border: 'rgba(239,68,68,0.2)',    icon: '✗', label: 'No AV'      },
    unknown:   { color: '#94a3b8', bg: 'rgba(148,163,184,0.08)', border: 'rgba(148,163,184,0.15)', icon: '?', label: 'Unknown'   },
  }
  const c = cfg[status] || cfg.unknown
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 6, padding: '3px 9px',
    }}>
      <span style={{ fontSize: 11 }}>{c.icon}</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: c.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {avName ? `${avName}` : c.label}
      </span>
    </div>
  )
}

// ── OS Icon ───────────────────────────────────────────────────
function OSIcon({ os }) {
  const icons = { windows: '⊞', macos: '', linux: '🐧', unknown: '?' }
  return <span style={{ fontSize: 18 }}>{icons[os] || icons.unknown}</span>
}

// ── Device Card ───────────────────────────────────────────────
function DeviceCard({ device }) {
  const online = device.is_online
  const statusColor = online ? '#34d399' : '#ef4444'
  const hasAgent = device.agent_installed

  return (
    <div className="dev-card" style={{ '--status-color': statusColor }}>
      {/* Status bar */}
      <div className="dev-card__bar" />

      <div className="dev-card__head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="dev-card__os-wrap">
            <OSIcon os={device.os || 'unknown'} />
            {hasAgent && <div className="dev-card__agent-dot" title="Klair Agent installed" />}
          </div>
          <div>
            <div className="dev-card__name">{device.hostname || device.ip}</div>
            <div className="dev-card__ip">{device.ip} · {device.vendor || 'Unknown vendor'}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {online ? 'Online' : 'Offline'}
            </span>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Mono, monospace' }}>
            {timeAgo(device.last_seen)}
          </span>
        </div>
      </div>

      {/* Metrics — only shown if agent is installed */}
      {hasAgent && (
        <div className="dev-card__metrics">
          <MiniGauge value={Math.round(device.cpu_pct || 0)} color="#00e5ff" label="CPU" />
          <MiniGauge value={Math.round(device.mem_pct || 0)} color="#a78bfa" label="RAM" />
          <MiniGauge value={Math.round(device.disk_pct || 0)} color="#34d399" label="Disk" />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4, flex: 1, paddingLeft: 8 }}>
            <div className="dev-meta-row">
              <span className="dev-meta-label">RAM</span>
              <span className="dev-meta-val">{device.mem_total_gb ? `${device.mem_total_gb} GB` : '—'}</span>
            </div>
            <div className="dev-meta-row">
              <span className="dev-meta-label">Disk</span>
              <span className="dev-meta-val">{device.disk_total_gb ? `${device.disk_total_gb} GB` : '—'}</span>
            </div>
            <div className="dev-meta-row">
              <span className="dev-meta-label">Uptime</span>
              <span className="dev-meta-val">{uptimeStr(device.uptime_secs)}</span>
            </div>
            <div className="dev-meta-row">
              <span className="dev-meta-label">Ping</span>
              <span className="dev-meta-val">{device.ping_ms ? `${device.ping_ms} ms` : '—'}</span>
            </div>
          </div>
        </div>
      )}

      {/* No agent — just show ping */}
      {!hasAgent && (
        <div className="dev-card__no-agent">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
            No agent installed · {device.ping_ms ? `${device.ping_ms}ms ping` : 'Network device'}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>MAC: {device.mac}</span>
        </div>
      )}

      {/* AV Status */}
      <div className="dev-card__footer">
        <AVBadge status={device.av_status || 'unknown'} avName={hasAgent ? device.av_name : null} />
        {device.definition_date && (
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: 'Space Mono, monospace' }}>
            Defs: {device.definition_date}
          </span>
        )}
        {!hasAgent && (
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>
            Install agent for full visibility
          </span>
        )}
      </div>
    </div>
  )
}

// ── Summary strip ─────────────────────────────────────────────
function SummaryStrip({ devices }) {
  const online    = devices.filter(d => d.is_online).length
  const offline   = devices.filter(d => !d.is_online).length
  const protected_ = devices.filter(d => d.av_status === 'protected').length
  const atRisk    = devices.filter(d => ['outdated','disabled','none'].includes(d.av_status)).length
  const agented   = devices.filter(d => d.agent_installed).length

  const stats = [
    { label: 'Total Devices', value: devices.length, color: 'rgba(255,255,255,0.7)' },
    { label: 'Online',        value: online,          color: '#34d399' },
    { label: 'Offline',       value: offline,         color: offline > 0 ? '#ef4444' : 'rgba(255,255,255,0.3)' },
    { label: 'AV Protected',  value: protected_,      color: '#34d399' },
    { label: 'At Risk',       value: atRisk,          color: atRisk > 0 ? '#ef4444' : 'rgba(255,255,255,0.3)' },
    { label: 'Agent Installed', value: agented,       color: '#00e5ff' },
  ]

  return (
    <div className="lm-strip">
      {stats.map((s, i) => (
        <div key={i} className="lm-strip__item">
          <div className="lm-strip__val" style={{ color: s.color }}>{s.value}</div>
          <div className="lm-strip__label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}

// ── Filter bar ────────────────────────────────────────────────
function FilterBar({ filter, setFilter, search, setSearch, total }) {
  const filters = ['all', 'online', 'offline', 'at-risk', 'agent']
  return (
    <div className="lm-filterbar">
      <div className="lm-filters">
        {filters.map(f => (
          <button key={f} className={`lm-filter-btn ${filter === f ? 'lm-filter-btn--active' : ''}`}
            onClick={() => setFilter(f)}>
            {f === 'all' ? `All (${total})` : f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>
      <input
        className="lm-search"
        type="text"
        placeholder="Search hostname, IP, vendor…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function LiveMonitoring() {
  const [devices, setDevices]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [lastScan, setLastScan] = useState(null)
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')
  const navigate = useNavigate()

  // Load devices from device_latest view
  const fetchDevices = useCallback(async () => {
    const { data, error } = await supabase
      .from('device_latest')
      .select('*')
      .order('is_online', { ascending: false })
      .order('last_seen', { ascending: false })

    if (error) {
      console.error('Fetch error:', error)
      return
    }
    setDevices(data || [])
    setLoading(false)
  }, [])

  const fetchLastScan = useCallback(async () => {
    const { data } = await supabase
      .from('network_scans')
      .select('scanned_at, total_found, duration_ms')
      .order('scanned_at', { ascending: false })
      .limit(1)
      .single()
    if (data) setLastScan(data)
  }, [])

  useEffect(() => {
    fetchDevices()
    fetchLastScan()

    // Realtime subscription — update device list when anything changes
    const channel = supabase
      .channel('devices-live')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'devices',
      }, () => {
        fetchDevices()
        fetchLastScan()
      })
      .subscribe()

    // Also poll every 30s as a fallback
    const poll = setInterval(() => {
      fetchDevices()
      fetchLastScan()
    }, 30000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(poll)
    }
  }, [fetchDevices, fetchLastScan])

  // Filter + search
  const filtered = devices.filter(d => {
    const q = search.toLowerCase()
    const matchSearch = !q ||
      (d.hostname || '').toLowerCase().includes(q) ||
      (d.ip || '').includes(q) ||
      (d.vendor || '').toLowerCase().includes(q) ||
      (d.mac || '').includes(q)

    const matchFilter =
      filter === 'all'     ? true :
      filter === 'online'  ? d.is_online :
      filter === 'offline' ? !d.is_online :
      filter === 'at-risk' ? ['outdated','disabled','none'].includes(d.av_status) :
      filter === 'agent'   ? d.agent_installed :
      true

    return matchSearch && matchFilter
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        .lm-wrap {
          min-height: 100vh;
          background: #07090f;
          background-image:
            radial-gradient(ellipse 50% 40% at 5% 0%, rgba(0,229,255,0.05) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 95% 100%, rgba(167,139,250,0.06) 0%, transparent 55%);
          font-family: 'Syne', sans-serif;
        }

        /* Header */
        .lm-header {
          padding: 96px 40px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: relative;
        }
        .lm-header::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 40px; right: 40px;
          height: 1px;
          background: linear-gradient(90deg, #00e5ff, transparent 60%);
          opacity: 0.35;
        }
        .lm-header__inner {
          max-width: 1320px;
          margin: 0 auto;
          padding-bottom: 28px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .lm-title {
          font-size: clamp(26px, 3vw, 42px);
          font-weight: 800;
          color: white;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .lm-title span { color: #00e5ff; }
        .lm-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.3);
          margin-top: 8px;
          font-family: 'Space Mono', monospace;
        }
        .lm-scan-badge {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-align: right;
          line-height: 1.6;
        }
        .lm-scan-badge strong { color: rgba(255,255,255,0.6); }

        /* Body */
        .lm-body {
          max-width: 1320px;
          margin: 0 auto;
          padding: 28px 40px 80px;
        }

        /* Summary strip */
        .lm-strip {
          display: flex;
          gap: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        .lm-strip__item {
          flex: 1;
          padding: 16px 20px;
          border-right: 1px solid rgba(255,255,255,0.05);
          text-align: center;
        }
        .lm-strip__item:last-child { border-right: none; }
        .lm-strip__val {
          font-family: 'Space Mono', monospace;
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 4px;
        }
        .lm-strip__label {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Filter bar */
        .lm-filterbar {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .lm-filters {
          display: flex;
          gap: 4px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          padding: 4px;
        }
        .lm-filter-btn {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          border-radius: 7px;
          border: none;
          background: none;
          color: rgba(255,255,255,0.4);
          cursor: pointer;
          transition: all 0.15s;
          text-transform: capitalize;
        }
        .lm-filter-btn:hover { color: white; background: rgba(255,255,255,0.06); }
        .lm-filter-btn--active { background: rgba(0,229,255,0.1); color: #00e5ff; }
        .lm-search {
          flex: 1;
          max-width: 300px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 9px 14px;
          font-size: 12px;
          font-family: 'Space Mono', monospace;
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }
        .lm-search::placeholder { color: rgba(255,255,255,0.2); }
        .lm-search:focus { border-color: rgba(0,229,255,0.3); }

        /* Device grid */
        .lm-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 14px;
        }

        /* Device card */
        .dev-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 18px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.15s;
        }
        .dev-card:hover {
          border-color: rgba(255,255,255,0.12);
          transform: translateY(-2px);
        }
        .dev-card__bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--status-color);
          opacity: 0.6;
        }
        .dev-card__head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 14px;
        }
        .dev-card__os-wrap {
          position: relative;
          width: 32px; height: 32px;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .dev-card__agent-dot {
          position: absolute;
          bottom: -2px; right: -2px;
          width: 8px; height: 8px;
          background: #00e5ff;
          border-radius: 50%;
          border: 2px solid #07090f;
          box-shadow: 0 0 4px #00e5ff;
        }
        .dev-card__name {
          font-size: 13px;
          font-weight: 700;
          color: white;
          font-family: 'Space Mono', monospace;
          letter-spacing: -0.01em;
        }
        .dev-card__ip {
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          font-family: 'Space Mono', monospace;
          margin-top: 2px;
        }
        .dev-card__metrics {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 12px;
        }
        .dev-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 8px;
        }
        .dev-meta-label {
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.25);
        }
        .dev-meta-val {
          font-size: 10px;
          font-family: 'Space Mono', monospace;
          color: rgba(255,255,255,0.6);
        }
        .dev-card__no-agent {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 10px 0;
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 12px;
        }
        .dev-card__footer {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Empty state */
        .lm-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 80px 20px;
          color: rgba(255,255,255,0.2);
        }
        .lm-empty__icon { font-size: 40px; margin-bottom: 16px; }
        .lm-empty__title { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
        .lm-empty__sub { font-size: 13px; line-height: 1.6; }
        .lm-empty__code {
          display: inline-block;
          margin-top: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px 20px;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: #00e5ff;
          text-align: left;
          line-height: 1.8;
        }

        /* Loading */
        .lm-loading {
          display: flex; align-items: center; justify-content: center;
          min-height: 50vh; gap: 12px;
          color: rgba(255,255,255,0.3); font-size: 14px;
        }
        .lm-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.08);
          border-top-color: #00e5ff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Responsive */
        @media (max-width: 768px) {
          .lm-header { padding: 90px 20px 0; }
          .lm-body { padding: 20px 20px 60px; }
          .lm-strip { flex-wrap: wrap; }
          .lm-strip__item { flex: 1 1 30%; }
          .lm-grid { grid-template-columns: 1fr; }
          .lm-filterbar { flex-direction: column; align-items: stretch; }
          .lm-search { max-width: 100%; }
        }
      `}</style>

      <Navbar />

      <div className="lm-wrap">
        <div className="lm-header">
          <div className="lm-header__inner">
            <div>
              <div className="lm-title">Live <span>Device</span> Monitoring</div>
              <div className="lm-sub">
                Site: HQ · Edmonton, AB · Real-time via Klair Agent
              </div>
            </div>
            <div className="lm-scan-badge">
              {lastScan ? (
                <>
                  <div><strong>Last scan:</strong> {timeAgo(lastScan.scanned_at)}</div>
                  <div><strong>{lastScan.total_found}</strong> devices found · {lastScan.duration_ms}ms</div>
                </>
              ) : (
                <div>Waiting for first scan…</div>
              )}
            </div>
          </div>
        </div>

        <div className="lm-body">
          {loading ? (
            <div className="lm-loading">
              <div className="lm-spinner" />
              Loading devices…
            </div>
          ) : (
            <>
              <SummaryStrip devices={devices} />
              <FilterBar
                filter={filter} setFilter={setFilter}
                search={search} setSearch={setSearch}
                total={devices.length}
              />

              <div className="lm-grid">
                {filtered.length === 0 && devices.length === 0 ? (
                  <div className="lm-empty">
                    <div className="lm-empty__icon">📡</div>
                    <div className="lm-empty__title">No devices detected yet</div>
                    <div className="lm-empty__sub">
                      Start the Klair Agent on a machine in your network to begin scanning.
                    </div>
                    <div className="lm-empty__code">
                      # Install dependencies<br />
                      npm install<br /><br />
                      # Configure .env then run<br />
                      node agent.js
                    </div>
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="lm-empty">
                    <div className="lm-empty__icon">🔍</div>
                    <div className="lm-empty__title">No devices match your filter</div>
                    <div className="lm-empty__sub">Try a different filter or search term.</div>
                  </div>
                ) : (
                  filtered.map(d => <DeviceCard key={d.id} device={d} />)
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
