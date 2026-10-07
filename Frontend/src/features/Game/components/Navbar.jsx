import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hook/useAuth'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useSelector(state => state.auth)
  const { handleLogout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const onLogout = async () => {
    try {
      await handleLogout()
      navigate('/login')
    } catch {
      navigate('/login')
    }
  }

  /* Avatar initials from InstituteName or email */
  const initials = user?.InstituteName
    ? user.InstituteName.slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? '??'

  /* Role badge colour */
  const roleColor = {
    primary:          '#38bdf8',
    middle:           '#818cf8',
    secondary:        '#a78bfa',
    higher_secondary: '#f59e0b',
    Collage:          '#4ade80',
  }[user?.role] ?? '#64748b'

  return (
    <nav className="mw-navbar">
      {/* ── Left: Logo ── */}
      <div className="mw-nav-logo">
        <span className="mw-nav-logo-text">MATH-WAR</span>
        <span className="mw-nav-logo-dot" />
      </div>

      {/* ── Right: Profile + Logout ── */}
      <div className="mw-nav-right" ref={dropdownRef}>

        {/* Logout quick button */}
        <button
          id="navbar-logout-btn"
          className="mw-nav-logout-btn"
          onClick={onLogout}
          title="Logout"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          LOGOUT
        </button>

        {/* Profile avatar button */}
        <button
          id="navbar-profile-btn"
          className={`mw-nav-avatar ${open ? 'mw-nav-avatar--active' : ''}`}
          onClick={() => setOpen(v => !v)}
          title="Operator Profile"
        >
          {initials}
          <span className="mw-nav-avatar-ping" />
        </button>

        {/* ── Profile Dropdown ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="mw-profile-dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {/* Header */}
              <div className="mw-pd-header">
                <div className="mw-pd-avatar-lg">{initials}</div>
                <div className="mw-pd-header-info">
                  <span className="mw-pd-name">{user?.InstituteName ?? 'Unknown'}</span>
                  <span className="mw-pd-email">{user?.email ?? '—'}</span>
                </div>
              </div>

              <div className="mw-pd-divider" />

              {/* Info rows */}
              <div className="mw-pd-rows">
                <div className="mw-pd-row">
                  <span className="mw-pd-row-label">OPERATOR_ID</span>
                  <span className="mw-pd-row-val">{user?.InstituteName ?? '—'}</span>
                </div>
                <div className="mw-pd-row">
                  <span className="mw-pd-row-label">COMM_CHANNEL</span>
                  <span className="mw-pd-row-val mw-pd-row-val--sm">{user?.email ?? '—'}</span>
                </div>
                <div className="mw-pd-row">
                  <span className="mw-pd-row-label">ROLE</span>
                  <span className="mw-pd-role-badge" style={{ color: roleColor, borderColor: roleColor + '55', background: roleColor + '18' }}>
                    {user?.role ?? '—'}
                  </span>
                </div>
                {user?.contact && (
                  <div className="mw-pd-row">
                    <span className="mw-pd-row-label">CONTACT</span>
                    <span className="mw-pd-row-val">{user.contact}</span>
                  </div>
                )}
                <div className="mw-pd-row">
                  <span className="mw-pd-row-label">STATUS</span>
                  <span className="mw-pd-status">
                    <span className="mw-pd-status-dot" />ONLINE
                  </span>
                </div>
              </div>

              <div className="mw-pd-divider" />

              {/* Dropdown logout */}
              <button
                id="profile-dropdown-logout-btn"
                className="mw-pd-logout"
                onClick={onLogout}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                TERMINATE_SESSION
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
