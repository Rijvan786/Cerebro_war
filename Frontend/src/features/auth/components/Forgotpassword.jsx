import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'
import Loader from '../../../App/Loader'
import { motion } from 'framer-motion'

const initialForm = { email: '', newpassword: '' }

const Forgotpassword = () => {
  const [form, setForm] = useState(initialForm)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { handleForgetPassword } = useAuth()
  const Loading = useSelector(state => state.auth.loading)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setMessage(''); setLoading(true)
    try {
      await handleForgetPassword({ email: form.email, newpassword: form.newpassword })
      setMessage('Password updated successfully.')
      setForm(initialForm)
    } catch (err) {
      setError(err?.message || 'Unable to update the password.')
    } finally { setLoading(false) }
  }

  if (Loading) return <Loader />

  return (
    <div style={{ position:'relative' }} className="auth-page-center">
      <div className="auth-center-orb-1"/>
      <div className="auth-center-orb-2"/>

      <motion.div className="auth-center-card"
        initial={{ opacity:0, y:24, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} transition={{ duration:0.55 }}>

        <div className="auth-card-top-row">
          <div>
            <h2 className="auth-heading">PWD_RESET<span className="auth-heading-cursor">▋</span></h2>
            <p className="auth-subtext">Enter your email and new access code to complete the reset.</p>
          </div>
          <Link to="/login" className="auth-link" style={{ marginLeft:'1rem', fontSize:'0.72rem', whiteSpace:'nowrap' }}>← LOGIN</Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">OPERATOR_EMAIL</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </span>
              <input className="auth-input" id="email" name="email" type="email" autoComplete="email"
                value={form.email} onChange={handleChange} placeholder="name@example.com" required />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label">NEW_ACCESS_CODE</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </span>
              <input className="auth-input has-toggle" id="newpassword" name="newpassword"
                type={showPass ? 'text' : 'password'} autoComplete="new-password"
                value={form.newpassword} onChange={handleChange} placeholder="Enter a new password" required />
              <button type="button" className="auth-toggle-btn" onClick={() => setShowPass(v => !v)}>
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          {error && <div className="auth-alert auth-alert-err">⚠ {error}</div>}
          {message && <div className="auth-alert auth-alert-ok">✓ {message}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'UPDATING...' : 'UPDATE_PASSWORD  →'}
          </button>
        </form>

        <p className="auth-footer-text">
          BACK TO <Link to="/login" className="auth-link">ACCESS_PORTAL</Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Forgotpassword
