import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import './AdminDashboard.css'

/* ── Constants ─────────────────────────────────────────── */
const STATUS_PIPELINE = ['NEW', 'REVIEWED', 'SHORTLISTED', 'INTERVIEW', 'PLACED']

const STATUS_COLORS = {
  NEW:        { bg: '#1e3a5f', text: '#60a5fa', dot: '#3b82f6' },
  REVIEWED:   { bg: '#1e3a2f', text: '#4ade80', dot: '#22c55e' },
  SHORTLISTED:{ bg: '#3a2a1e', text: '#fb923c', dot: '#f97316' },
  INTERVIEW:  { bg: '#2a1e3a', text: '#c084fc', dot: '#a855f7' },
  PLACED:     { bg: '#1e3a35', text: '#2dd4bf', dot: '#14b8a6' },
}

const CREX_YEAR = new Date().getFullYear()

const generateCrexId = (id) =>
  `CREX-${CREX_YEAR}-${String(id).padStart(4, '0')}`

/* ── Helper: build signed CV URL ────────────────────────── */
const getCvUrl = async (path) => {
  if (!path) return null
  const { data, error } = await supabase.storage
    .from('candidate-cvs')
    .createSignedUrl(path, 60 * 60) // 1 hour
  if (error) {
    console.error('Signed URL error:', error)
    return null
  }
  return data.signedUrl
}

/* ── Stats Card ─────────────────────────────────────────── */
const StatCard = ({ icon, label, value, sub, color }) => (
  <div className="stat-card" style={{ '--accent': color }}>
    <div className="stat-icon-wrap">{icon}</div>
    <div className="stat-body">
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  </div>
)

/* ── Status Badge ───────────────────────────────────────── */
const StatusBadge = ({ status }) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.NEW
  return (
    <span
      className="status-badge"
      style={{ background: colors.bg, color: colors.text }}
    >
      <span className="status-dot" style={{ background: colors.dot }} />
      {status}
    </span>
  )
}

/* ── Main Dashboard ─────────────────────────────────────── */
const AdminDashboard = ({ session, onLogout }) => {
  const [members, setMembers]         = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState('')

  // Theme — default light for older demographic, persisted in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem('crex-admin-theme') || 'light'
  )
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('crex-admin-theme', next)
  }

  // Filters
  const [search, setSearch]           = useState('')
  const [filterCity, setFilterCity]   = useState('')
  const [filterStatus, setFilterStatus]       = useState('')

  // Expanded notes
  const [expandedNotes, setExpandedNotes] = useState({})
  const [noteValues, setNoteValues]       = useState({})
  const [savingNote, setSavingNote]       = useState({})

  // Status change loading
  const [statusLoading, setStatusLoading] = useState({})

  // CV download loading
  const [cvLoading, setCvLoading] = useState({})

  // Expanded candidate row
  const [expandedRow, setExpandedRow] = useState(null)

  /* ── Fetch all members ───────────────────────────────── */
  const fetchMembers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: fetchError } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setMembers(data || [])

      // Pre-fill note values
      const notes = {}
      data?.forEach(m => { notes[m.id] = m.admin_notes || '' })
      setNoteValues(notes)
    } catch (err) {
      setError(err.message || 'Failed to load members.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchMembers() }, [fetchMembers])

  /* ── Stats ────────────────────────────────────────────── */
  const today = new Date().toISOString().split('T')[0]
  const totalCount       = members.length
  const newTodayCount    = members.filter(m =>
    m.created_at?.startsWith(today)).length
  const shortlistedCount = members.filter(m => m.status === 'SHORTLISTED').length
  const placedCount      = members.filter(m => m.status === 'PLACED').length

  /* ── Filter options ───────────────────────────────────── */
  const cities = [...new Set(members.map(m => m.town_city).filter(Boolean))].sort()

  /* ── Filtered list ────────────────────────────────────── */
  const filtered = members.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || (
      m.full_name?.toLowerCase().includes(q) ||
      m.regular_phone?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q)
    )
    const matchCity   = !filterCity || m.town_city === filterCity
    const matchStatus = !filterStatus || (m.status || 'NEW') === filterStatus
    return matchSearch && matchCity && matchStatus
  })

  /* ── Update status ────────────────────────────────────── */
  const handleStatusChange = async (id, newStatus) => {
    setStatusLoading(prev => ({ ...prev, [id]: true }))
    try {
      const { error: updateError } = await supabase
        .from('members')
        .update({ status: newStatus })
        .eq('id', id)
      if (updateError) throw updateError
      setMembers(prev =>
        prev.map(m => m.id === id ? { ...m, status: newStatus } : m)
      )
    } catch (err) {
      alert('Failed to update status: ' + err.message)
    } finally {
      setStatusLoading(prev => ({ ...prev, [id]: false }))
    }
  }

  /* ── Save note ────────────────────────────────────────── */
  const handleSaveNote = async (id) => {
    setSavingNote(prev => ({ ...prev, [id]: true }))
    try {
      const { error: noteError } = await supabase
        .from('members')
        .update({ admin_notes: noteValues[id] })
        .eq('id', id)
      if (noteError) throw noteError
      setMembers(prev =>
        prev.map(m => m.id === id ? { ...m, admin_notes: noteValues[id] } : m)
      )
      setExpandedNotes(prev => ({ ...prev, [id]: false }))
    } catch (err) {
      alert('Failed to save note: ' + err.message)
    } finally {
      setSavingNote(prev => ({ ...prev, [id]: false }))
    }
  }

  /* ── Download CV ──────────────────────────────────────── */
  const handleCvDownload = async (member) => {
    if (!member.cv_file_path) return
    setCvLoading(prev => ({ ...prev, [member.id]: true }))
    try {
      const url = await getCvUrl(member.cv_file_path)
      if (url) {
        const link = document.createElement('a')
        link.href = url
        link.target = '_blank'
        link.rel = 'noopener noreferrer'
        link.click()
      } else {
        alert('Could not generate download link. Please try again.')
      }
    } finally {
      setCvLoading(prev => ({ ...prev, [member.id]: false }))
    }
  }

  /* ── Export CSV ───────────────────────────────────────── */
  const handleExportCSV = () => {
    const headers = [
      'Member ID', 'Full Name', 'Phone', 'Email', 'City/Town',
      'Region', 'Nationality', 'Job Title', 'Key Skills',
      'Languages', 'Certifications', 'Has CV', 'Status',
      'Admin Notes', 'Registered Date'
    ]

    const rows = filtered.map(m => [
      generateCrexId(m.id),
      m.full_name || '',
      m.regular_phone || '',
      m.email || '',
      m.town_city || '',
      m.region || '',
      m.nationality || '',
      m.title || '',
      (m.key_skills || []).join('; '),
      (m.languages_spoken || []).join('; '),
      m.professional_certifications || '',
      m.has_cv ? 'Yes' : 'No',
      m.status || 'NEW',
      m.admin_notes || '',
      m.created_at ? new Date(m.created_at).toLocaleDateString() : '',
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = `CREX-Members-${today}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  /* ── Logout ───────────────────────────────────────────── */
  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  /* ── Clear filters ────────────────────────────────────── */
  const clearFilters = () => {
    setSearch('')
    setFilterCity('')
    setFilterStatus('')
  }

  const hasActiveFilters = search || filterCity || filterStatus

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className={`admin-dashboard theme-${theme}`}>

      {/* ── Top Nav ─────────────────────────────────────── */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div className="dash-brand-box">CREX</div>
          <div className="dash-header-titles">
            <span className="dash-header-title">Admin Dashboard</span>
            <span className="dash-header-sub">Member Management</span>
          </div>
        </div>
        <div className="dash-header-right">
          <span className="dash-user-pill">
            <span className="dash-user-dot" />
            {session?.user?.email || 'Admin'}
          </span>

          {/* ── Theme Toggle ── */}
          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            id="theme-toggle"
          >
            {theme === 'dark' ? (
              /* Sun icon — switch to light */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon — switch to dark */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>

          <button className="dash-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      <main className="dash-main">

        {/* ── Page Title ──────────────────────────────────── */}
        <div className="dash-page-header">
          <div>
            <h1 className="dash-page-title">CREX Membership Dashboard</h1>
            <p className="dash-page-desc">View, manage, and track all registered CREX members</p>
          </div>
          <div className="dash-page-actions">
            <button className="dash-refresh-btn" onClick={fetchMembers} title="Refresh data">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"/>
                <polyline points="1 20 1 14 7 14"/>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
              </svg>
              Refresh
            </button>
            <button className="dash-export-btn" onClick={handleExportCSV} disabled={filtered.length === 0}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* ── Stats Bar ───────────────────────────────────── */}
        <div className="stats-grid">
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
            label="Total Members"
            value={totalCount}
            color="#d3a052"
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="New Members"
            value={newTodayCount}
            sub={today}
            color="#3b82f6"
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
            label="Shortlisted"
            value={shortlistedCount}
            color="#f97316"
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>}
            label="Placed"
            value={placedCount}
            color="#14b8a6"
          />
        </div>

        {/* ── Error ───────────────────────────────────────── */}
        {error && (
          <div className="dash-error-banner">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
            <button onClick={fetchMembers} className="dash-retry-btn">Retry</button>
          </div>
        )}

        {/* ── Filters ─────────────────────────────────────── */}
        <div className="dash-filters-wrap">
          <div className="dash-search-wrap">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, phone, or email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dash-search-input"
              id="dash-search"
            />
            {search && (
              <button className="clear-search-btn" onClick={() => setSearch('')}>×</button>
            )}
          </div>

          <div className="dash-filter-selects">
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="dash-filter-select"
              id="filter-status"
            >
              <option value="">All Statuses</option>
              {STATUS_PIPELINE.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={filterCity}
              onChange={e => setFilterCity(e.target.value)}
              className="dash-filter-select"
              id="filter-city"
            >
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Results count ────────────────────────────────── */}
        <div className="dash-results-row">
          <span className="dash-results-count">
            {loading ? 'Loading…' : `${filtered.length} member${filtered.length !== 1 ? 's' : ''}`}
            {hasActiveFilters && ` (filtered from ${totalCount})`}
          </span>
        </div>

        {/* ── Table ───────────────────────────────────────── */}
        {loading ? (
          <div className="dash-loading-state">
            <div className="dash-loading-spinner" />
            <p>Loading members from Supabase…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">📋</div>
            <h3>No members found</h3>
            <p>{hasActiveFilters ? 'Try adjusting your filters.' : 'No registrations yet.'}</p>
            {hasActiveFilters && (
              <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
            )}
          </div>
        ) : (
          <div className="dash-table-wrap">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Member ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>City/Town</th>
                  <th>Region</th>
                  <th>Nationality</th>
                  <th>CV</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, idx) => {
                  const crexId  = generateCrexId(m.id)
                  const status  = m.status || 'NEW'
                  const hasNote = m.admin_notes && m.admin_notes.trim()
                  const isExpanded = expandedRow === m.id

                  return (
                    <React.Fragment key={m.id}>
                      <tr
                        className={`dash-table-row ${isExpanded ? 'row-expanded' : ''}`}
                        onClick={() => setExpandedRow(isExpanded ? null : m.id)}
                      >
                        <td className="td-num">{idx + 1}</td>
                        <td>
                          <span className="crex-id-badge">{crexId}</span>
                        </td>
                        <td className="td-name">
                          <div className="candidate-avatar">
                            {(m.full_name || '?').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="candidate-name-wrap">
                            <span className="candidate-name">{m.full_name || '—'}</span>
                            <span className="candidate-email">{m.email || ''}</span>
                          </div>
                        </td>
                        <td className="td-phone">{m.regular_phone || '—'}</td>
                        <td>
                          {m.town_city
                            ? <span className="industry-tag">{m.town_city}</span>
                            : <span className="td-empty">—</span>}
                        </td>
                        <td className="td-edu">{m.region || '—'}</td>
                        <td className="td-loc">{m.nationality || '—'}</td>
                        <td onClick={e => e.stopPropagation()}>
                          {m.has_cv && m.cv_file_path ? (
                            <button
                              className="cv-download-btn"
                              onClick={() => handleCvDownload(m)}
                              disabled={cvLoading[m.id]}
                              title="Download CV"
                            >
                              {cvLoading[m.id] ? (
                                <span className="btn-spinner" />
                              ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                  <polyline points="7 10 12 15 17 10"/>
                                  <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                              )}
                              CV
                            </button>
                          ) : (
                            <span className="no-cv-tag">No CV</span>
                          )}
                        </td>
                        <td onClick={e => e.stopPropagation()}>
                          <div className="status-cell">
                            <StatusBadge status={status} />
                            <select
                              className="status-select"
                              value={status}
                              onChange={e => handleStatusChange(m.id, e.target.value)}
                              disabled={statusLoading[m.id]}
                              title="Change status"
                              id={`status-${m.id}`}
                            >
                              {STATUS_PIPELINE.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            {statusLoading[m.id] && <span className="btn-spinner" />}
                          </div>
                        </td>
                        <td onClick={e => e.stopPropagation()}>
                          <button
                            className={`notes-btn ${hasNote ? 'has-note' : ''}`}
                            onClick={() =>
                              setExpandedNotes(prev => ({ ...prev, [m.id]: !prev[m.id] }))
                            }
                            title={hasNote ? 'View/Edit note' : 'Add note'}
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="16" y1="13" x2="8" y2="13"/>
                              <line x1="16" y1="17" x2="8" y2="17"/>
                              <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            {hasNote ? 'Note ✓' : 'Note'}
                          </button>
                        </td>
                        <td className="td-date">
                          {m.created_at
                            ? new Date(m.created_at).toLocaleDateString('en-GB', {
                                day: '2-digit', month: 'short', year: 'numeric'
                              })
                            : '—'}
                        </td>
                      </tr>

                      {/* ── Expanded detail row ───────────────── */}
                      {isExpanded && (
                        <tr className="detail-row">
                          <td colSpan={11}>
                            <div className="detail-panel">
                              <div className="detail-grid">
                                <div className="detail-section">
                                  <h4>Personal</h4>
                                  <div className="detail-fields">
                                    <div className="detail-field">
                                      <span className="df-label">Gender</span>
                                      <span className="df-value">{m.gender || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">City / Town</span>
                                      <span className="df-value">{m.town_city || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Region</span>
                                      <span className="df-value">{m.region || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Nationality</span>
                                      <span className="df-value">{m.nationality || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Date of Birth</span>
                                      <span className="df-value">{m.date_of_birth || '—'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-section">
                                  <h4>Role & Skills</h4>
                                  <div className="detail-fields">
                                    <div className="detail-field">
                                      <span className="df-label">Job Title</span>
                                      <span className="df-value">{m.title || '—'}</span>
                                    </div>
                                    <div className="detail-field full-width">
                                      <span className="df-label">Key Skills</span>
                                      <div className="df-tags">
                                        {(m.key_skills || []).length > 0
                                          ? m.key_skills.map((s, i) => <span key={i} className="df-tag">{s}</span>)
                                          : <span className="df-value">—</span>}
                                      </div>
                                    </div>
                                    <div className="detail-field full-width">
                                      <span className="df-label">Languages Spoken</span>
                                      <div className="df-tags">
                                        {(m.languages_spoken || []).length > 0
                                          ? m.languages_spoken.map((l, i) => <span key={i} className="df-tag">{l}</span>)
                                          : <span className="df-value">—</span>}
                                      </div>
                                    </div>
                                    {m.professional_certifications && (
                                      <div className="detail-field full-width">
                                        <span className="df-label">Certifications</span>
                                        <span className="df-value">{m.professional_certifications}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* ── Notes editor ─────────────────── */}
                              {expandedNotes[m.id] && (
                                <div className="notes-editor-wrap">
                                  <label className="notes-label">
                                    Admin Notes for {m.full_name}
                                  </label>
                                  <textarea
                                    className="notes-textarea"
                                    value={noteValues[m.id] || ''}
                                    onChange={e =>
                                      setNoteValues(prev => ({ ...prev, [m.id]: e.target.value }))
                                    }
                                    placeholder="Add internal notes about this member…"
                                    rows={4}
                                  />
                                  <div className="notes-actions">
                                    <button
                                      className="notes-save-btn"
                                      onClick={() => handleSaveNote(m.id)}
                                      disabled={savingNote[m.id]}
                                    >
                                      {savingNote[m.id] ? 'Saving…' : '💾 Save Note'}
                                    </button>
                                    <button
                                      className="notes-cancel-btn"
                                      onClick={() => {
                                        setExpandedNotes(prev => ({ ...prev, [m.id]: false }))
                                        setNoteValues(prev => ({ ...prev, [m.id]: m.admin_notes || '' }))
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}

                              {hasNote && !expandedNotes[m.id] && (
                                <div className="saved-note-preview">
                                  <span className="saved-note-label">📝 Note:</span>
                                  <span className="saved-note-text">{m.admin_notes}</span>
                                  <button
                                    className="edit-note-btn"
                                    onClick={() =>
                                      setExpandedNotes(prev => ({ ...prev, [m.id]: true }))
                                    }
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Footer ──────────────────────────────────────── */}
        <div className="dash-footer">
          <span>CREX Admin Dashboard · {CREX_YEAR}</span>
          <span>Logged in as {session?.user?.email}</span>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
