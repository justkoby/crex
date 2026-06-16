import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

/**
 * AdminPage
 * Wraps AdminLogin + AdminDashboard.
 * Checks for an existing Supabase session on mount so that
 * refreshing the page doesn't log the admin out.
 */
const AdminPage = () => {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Restore session from Supabase storage
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null)
      setChecking(false)
    })

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0e1a',
        color: 'rgba(230,237,243,0.5)',
        fontFamily: 'Inter, sans-serif',
        gap: '14px',
        fontSize: '14px'
      }}>
        <span style={{
          width: 24, height: 24,
          border: '2px solid rgba(211,160,82,0.3)',
          borderTopColor: '#d3a052',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block'
        }} />
        Verifying session…
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin onLogin={(sess) => setSession(sess)} />
  }

  return (
    <AdminDashboard
      session={session}
      onLogout={() => setSession(null)}
    />
  )
}

export default AdminPage
