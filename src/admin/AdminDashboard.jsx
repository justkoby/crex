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
  const [applicants, setApplicants]   = useState([])
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
  const [filterIndustry, setFilterIndustry] = useState('')
  const [filterEducation, setFilterEducation] = useState('')
  const [filterLocation, setFilterLocation]   = useState('')
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

  /* ── Fetch all applicants ─────────────────────────────── */
  const fetchApplicants = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: fetchError } = await supabase
        .from('applicants')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setApplicants(data || [])

      // Pre-fill note values
      const notes = {}
      data?.forEach(a => { notes[a.id] = a.admin_notes || '' })
      setNoteValues(notes)
    } catch (err) {
      setError(err.message || 'Failed to load candidates.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchApplicants() }, [fetchApplicants])

  /* ── Stats ────────────────────────────────────────────── */
  const today = new Date().toISOString().split('T')[0]
  const totalCount       = applicants.length
  const newTodayCount    = applicants.filter(a =>
    a.created_at?.startsWith(today)).length
  const shortlistedCount = applicants.filter(a => a.status === 'SHORTLISTED').length
  const placedCount      = applicants.filter(a => a.status === 'PLACED').length

  /* ── Filter options ───────────────────────────────────── */
  const industries  = [...new Set(applicants.map(a => a.industry).filter(Boolean))].sort()
  const educations  = [...new Set(applicants.map(a => a.highest_education).filter(Boolean))].sort()
  const locations   = [...new Set(applicants.map(a => a.preferred_location).filter(Boolean))].sort()

  /* ── Filtered list ────────────────────────────────────── */
  const filtered = applicants.filter(a => {
    const q = search.toLowerCase()
    const matchSearch = !q || (
      a.full_name?.toLowerCase().includes(q) ||
      a.phone?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q)
    )
    const matchIndustry  = !filterIndustry  || a.industry === filterIndustry
    const matchEducation = !filterEducation || a.highest_education === filterEducation
    const matchLocation  = !filterLocation  || a.preferred_location === filterLocation
    const matchStatus    = !filterStatus    || (a.status || 'NEW') === filterStatus
    return matchSearch && matchIndustry && matchEducation && matchLocation && matchStatus
  })

  /* ── Update status ────────────────────────────────────── */
  const handleStatusChange = async (id, newStatus) => {
    setStatusLoading(prev => ({ ...prev, [id]: true }))
    try {
      const { error: updateError } = await supabase
        .from('applicants')
        .update({ status: newStatus })
        .eq('id', id)
      if (updateError) throw updateError
      setApplicants(prev =>
        prev.map(a => a.id === id ? { ...a, status: newStatus } : a)
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
        .from('applicants')
        .update({ admin_notes: noteValues[id] })
        .eq('id', id)
      if (noteError) throw noteError
      setApplicants(prev =>
        prev.map(a => a.id === id ? { ...a, admin_notes: noteValues[id] } : a)
      )
      setExpandedNotes(prev => ({ ...prev, [id]: false }))
    } catch (err) {
      alert('Failed to save note: ' + err.message)
    } finally {
      setSavingNote(prev => ({ ...prev, [id]: false }))
    }
  }

  /* ── Download CV ──────────────────────────────────────── */
  const handleCvDownload = async (applicant) => {
    if (!applicant.cv_file_path) return
    setCvLoading(prev => ({ ...prev, [applicant.id]: true }))
    try {
      const url = await getCvUrl(applicant.cv_file_path)
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
      setCvLoading(prev => ({ ...prev, [applicant.id]: false }))
    }
  }

  /* ── Export CSV ───────────────────────────────────────── */
  const handleExportCSV = () => {
    const headers = [
      'CREX ID', 'Full Name', 'Phone', 'Email', 'Industry',
      'Education', 'Experience', 'Location', 'Status',
      'Former Work', 'Job Title', 'Employment Type',
      'Key Skills', 'Languages', 'Has CV', 'Admin Notes',
      'Registered Date'
    ]

    const rows = filtered.map(a => [
      generateCrexId(a.id),
      a.full_name || '',
      a.phone || '',
      a.email || '',
      a.industry || '',
      a.highest_education || '',
      a.years_experience || '',
      a.preferred_location || '',
      a.status || 'NEW',
      a.former_place_of_work || '',
      a.job_title_role || '',
      a.employment_type || '',
      (a.key_skills || []).join('; '),
      (a.languages_spoken || []).join('; '),
      a.has_cv ? 'Yes' : 'No',
      a.admin_notes || '',
      a.created_at ? new Date(a.created_at).toLocaleDateString() : '',
    ])

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = `CREX-Candidates-${today}.csv`
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
    setFilterIndustry('')
    setFilterEducation('')
    setFilterLocation('')
    setFilterStatus('')
  }

  const hasActiveFilters = search || filterIndustry || filterEducation || filterLocation || filterStatus

  /* ── Render ───────────────────────────────────────────── */
  return (
    <div className={`admin-dashboard theme-${theme}`}>

      {/* ── Top Nav ─────────────────────────────────────── */}
      <header className="dash-header">
        <div className="dash-header-left">
          <div className="dash-brand-box">CREX</div>
          <div className="dash-header-titles">
            <span className="dash-header-title">Admin Dashboard</span>
            <span className="dash-header-sub">Candidate Management</span>
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
            <h1 className="dash-page-title">Candidate Database</h1>
            <p className="dash-page-desc">View, manage, and track all registered CREX candidates</p>
          </div>
          <div className="dash-page-actions">
            <button className="dash-refresh-btn" onClick={fetchApplicants} title="Refresh data">
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
            label="Total Candidates"
            value={totalCount}
            color="#d3a052"
          />
          <StatCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            label="New Today"
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
            <button onClick={fetchApplicants} className="dash-retry-btn">Retry</button>
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
              value={filterIndustry}
              onChange={e => setFilterIndustry(e.target.value)}
              className="dash-filter-select"
              id="filter-industry"
            >
              <option value="">All Industries</option>
              {industries.map(i => <option key={i} value={i}>{i}</option>)}
            </select>

            <select
              value={filterEducation}
              onChange={e => setFilterEducation(e.target.value)}
              className="dash-filter-select"
              id="filter-education"
            >
              <option value="">All Education</option>
              {educations.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <select
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
              className="dash-filter-select"
              id="filter-location"
            >
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
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
            {loading ? 'Loading…' : `${filtered.length} candidate${filtered.length !== 1 ? 's' : ''}`}
            {hasActiveFilters && ` (filtered from ${totalCount})`}
          </span>
        </div>

        {/* ── Table ───────────────────────────────────────── */}
        {loading ? (
          <div className="dash-loading-state">
            <div className="dash-loading-spinner" />
            <p>Loading candidates from Supabase…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="dash-empty-state">
            <div className="dash-empty-icon">📋</div>
            <h3>No candidates found</h3>
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
                  <th>CREX ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Industry</th>
                  <th>Education</th>
                  <th>Location</th>
                  <th>CV</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Registered</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a, idx) => {
                  const crexId  = generateCrexId(a.id)
                  const status  = a.status || 'NEW'
                  const hasNote = a.admin_notes && a.admin_notes.trim()
                  const isExpanded = expandedRow === a.id

                  return (
                    <React.Fragment key={a.id}>
                      <tr
                        className={`dash-table-row ${isExpanded ? 'row-expanded' : ''}`}
                        onClick={() => setExpandedRow(isExpanded ? null : a.id)}
                      >
                        <td className="td-num">{idx + 1}</td>
                        <td>
                          <span className="crex-id-badge">{crexId}</span>
                        </td>
                        <td className="td-name">
                          <div className="candidate-avatar">
                            {(a.full_name || '?').split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
                          </div>
                          <div className="candidate-name-wrap">
                            <span className="candidate-name">{a.full_name || '—'}</span>
                            <span className="candidate-email">{a.email || ''}</span>
                          </div>
                        </td>
                        <td className="td-phone">{a.phone || '—'}</td>
                        <td>
                          {a.industry
                            ? <span className="industry-tag">{a.industry}</span>
                            : <span className="td-empty">—</span>}
                        </td>
                        <td className="td-edu">{a.highest_education || '—'}</td>
                        <td className="td-loc">{a.preferred_location || '—'}</td>
                        <td onClick={e => e.stopPropagation()}>
                          {a.has_cv && a.cv_file_path ? (
                            <button
                              className="cv-download-btn"
                              onClick={() => handleCvDownload(a)}
                              disabled={cvLoading[a.id]}
                              title="Download CV"
                            >
                              {cvLoading[a.id] ? (
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
                              onChange={e => handleStatusChange(a.id, e.target.value)}
                              disabled={statusLoading[a.id]}
                              title="Change status"
                              id={`status-${a.id}`}
                            >
                              {STATUS_PIPELINE.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            {statusLoading[a.id] && <span className="btn-spinner" />}
                          </div>
                        </td>
                        <td onClick={e => e.stopPropagation()}>
                          <button
                            className={`notes-btn ${hasNote ? 'has-note' : ''}`}
                            onClick={() =>
                              setExpandedNotes(prev => ({ ...prev, [a.id]: !prev[a.id] }))
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
                          {a.created_at
                            ? new Date(a.created_at).toLocaleDateString('en-GB', {
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
                                      <span className="df-value">{a.gender || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">City</span>
                                      <span className="df-value">{a.city || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Region</span>
                                      <span className="df-value">{a.region || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Nationality</span>
                                      <span className="df-value">{a.nationality || '—'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-section">
                                  <h4>Employment</h4>
                                  <div className="detail-fields">
                                    <div className="detail-field">
                                      <span className="df-label">Former Work</span>
                                      <span className="df-value">{a.former_place_of_work || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Job Title</span>
                                      <span className="df-value">{a.job_title_role || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Type</span>
                                      <span className="df-value">{a.employment_type || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Available</span>
                                      <span className="df-value">{a.available_start_time || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Relocate?</span>
                                      <span className="df-value">{a.willing_to_relocate || '—'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="detail-section">
                                  <h4>Qualifications</h4>
                                  <div className="detail-fields">
                                    <div className="detail-field">
                                      <span className="df-label">Experience</span>
                                      <span className="df-value">{a.years_experience || '—'}</span>
                                    </div>
                                    <div className="detail-field">
                                      <span className="df-label">Institutions</span>
                                      <span className="df-value">{a.institutions_attended || '—'}</span>
                                    </div>
                                    <div className="detail-field full-width">
                                      <span className="df-label">Key Skills</span>
                                      <div className="df-tags">
                                        {(a.key_skills || []).length > 0
                                          ? a.key_skills.map((s, i) => <span key={i} className="df-tag">{s}</span>)
                                          : <span className="df-value">—</span>}
                                      </div>
                                    </div>
                                    <div className="detail-field full-width">
                                      <span className="df-label">Languages</span>
                                      <div className="df-tags">
                                        {(a.languages_spoken || []).length > 0
                                          ? a.languages_spoken.map((l, i) => <span key={i} className="df-tag">{l}</span>)
                                          : <span className="df-value">—</span>}
                                      </div>
                                    </div>
                                    {a.certifications && (
                                      <div className="detail-field full-width">
                                        <span className="df-label">Certifications</span>
                                        <span className="df-value">{a.certifications}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* ── Notes editor ─────────────────── */}
                              {expandedNotes[a.id] && (
                                <div className="notes-editor-wrap">
                                  <label className="notes-label">
                                    Admin Notes for {a.full_name}
                                  </label>
                                  <textarea
                                    className="notes-textarea"
                                    value={noteValues[a.id] || ''}
                                    onChange={e =>
                                      setNoteValues(prev => ({ ...prev, [a.id]: e.target.value }))
                                    }
                                    placeholder="Add internal notes about this candidate…"
                                    rows={4}
                                  />
                                  <div className="notes-actions">
                                    <button
                                      className="notes-save-btn"
                                      onClick={() => handleSaveNote(a.id)}
                                      disabled={savingNote[a.id]}
                                    >
                                      {savingNote[a.id] ? 'Saving…' : '💾 Save Note'}
                                    </button>
                                    <button
                                      className="notes-cancel-btn"
                                      onClick={() => {
                                        setExpandedNotes(prev => ({ ...prev, [a.id]: false }))
                                        setNoteValues(prev => ({ ...prev, [a.id]: a.admin_notes || '' }))
                                      }}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}

                              {hasNote && !expandedNotes[a.id] && (
                                <div className="saved-note-preview">
                                  <span className="saved-note-label">📝 Note:</span>
                                  <span className="saved-note-text">{a.admin_notes}</span>
                                  <button
                                    className="edit-note-btn"
                                    onClick={() =>
                                      setExpandedNotes(prev => ({ ...prev, [a.id]: true }))
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
