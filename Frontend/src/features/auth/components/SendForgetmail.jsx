import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import Loader from '../../../App/Loader'
import { motion } from 'framer-motion'


const SendForgetmail = () => {
  const [email, setemail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { handlesendForgetmail } = useAuth()
  const Loading  = useSelector(state => state.auth.Loading)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true); setemail('')
    try {
      await handlesendForgetmail({ email })
      setMessage('Password reset mail sent. Check your inbox.')
    } catch (err) {
      setError(err?.message || 'Unable to send reset mail.')
    } finally { setLoading(false) }
  }

  if (Loading) return <Loader />

  return (
    <div style={{ position:'relative' }} className="auth-page-center">
      <div className="auth-center-orb-1"/>
      <div className="auth-center-orb-2"/>

      <motion.div className="auth-center-card"
        initial={{ opacity:0, y:24, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.55 }}>

        <h2 className="auth-heading">FORGOT_SECRET<span className="auth-heading-cursor">▋</span></h2>
        <p className="auth-subtext">Enter your comm channel and we'll transmit a password reset link.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">COMM_CHANNEL</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input className="auth-input" id="email" name="email" type="email" autoComplete="email"
                value={email} onChange={e => setemail(e.target.value)} placeholder="name@example.com" required />
            </div>
          </div>

          {error && <div className="auth-alert auth-alert-err">⚠ {error}</div>}
          {message && <div className="auth-alert auth-alert-ok">✓ {message}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'TRANSMITTING...' : 'SEND_RESET_MAIL  →'}
          </button>
        </form>

        <p className="auth-footer-text">
          REMEMBERED IT? <Link to="/login" className="auth-link">ACCESS_PORTAL</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SendForgetmail
