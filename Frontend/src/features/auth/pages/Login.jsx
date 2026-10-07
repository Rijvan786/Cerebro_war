import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import Loader from '../../../App/Loader'

const FLOATS = ['+','−','×','÷','%','π','∑','≠','Δ','∞']

const Login = () => {
  const [formData, setFormData] = useState({ emailOrUsername: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { handleLogin } = useAuth()

  const handleGoogleLogin = () => {
    window.location.href = 'https://cerebro-war.onrender.com/api/auth/google'
  }
  const navigate = useNavigate()
  const Loading=useSelector(state=>state.auth.Loading)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      const { emailOrUsername, password } = formData
      const isEmail = emailOrUsername.includes('@')
      const payload = isEmail
        ? { email: emailOrUsername, password, InstituteName: '' }
        : { InstituteName: emailOrUsername, password, email: '' }
      handleLogin(payload)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Unable to login')
    } finally {
     
    }
  }
 if (Loading) return <Loader />
  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        {FLOATS.map((s, i) => (
          <motion.span key={i} className="float-symbol"
            style={{ left:`${6+((i*41+13)%88)}%`, top:`${6+((i*53+7)%88)}%`,
              fontSize:`${1.3+(i%3)*0.6}rem`, color:`hsl(${220+i*18},70%,65%)` }}
            animate={{ y:[0,-26,0,26,0], rotate:[0,(i%2?1:-1)*(15+i*9),0], opacity:[0.1,0.22,0.1] }}
            transition={{ duration:8+(i%5)*2, delay:(i%4)*0.8, repeat:Infinity, repeatType:'mirror', ease:'easeInOut' }}
          >{s}</motion.span>
        ))}
        <motion.div className="auth-title-frame"
          initial={{ opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.7 }}>
          <span className="auth-corner-tr"/><span className="auth-corner-bl"/>
          <h1 className="auth-game-title">CEREBRO</h1>
          <p className="auth-game-sub">COSMIC OPERATOR LOGIN</p>
          <div className="auth-title-deco">
            <div className="auth-title-deco-line"/>
            <div className="auth-title-deco-dot"/>
            <div className="auth-title-deco-line"/>
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-card-wrap">
          <motion.div className="auth-card"
            initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

            <h2 className="auth-heading">ACCESS_PORTAL<span className="auth-heading-cursor">▋</span></h2>
            <p className="auth-subtext">Synchronizing neural link for mathematical combat.</p>

            <form className="auth-form" onSubmit={onSubmit}>
              {/* OPERATOR_ID */}
              <div className="auth-field">
                <label className="auth-label">OPERATOR_ID</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input className="auth-input" id="emailOrUsername" name="emailOrUsername" type="text"
                    autoComplete="username" value={formData.emailOrUsername} onChange={handleChange}
                    placeholder="Username/Email" required />
                </div>
              </div>

              {/* ENCRYPTION_KEY */}
              <div className="auth-field">
                <label className="auth-label">ENCRYPTION_KEY</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input className="auth-input" id="password" name="password" type="password"
                    autoComplete="current-password" value={formData.password} onChange={handleChange}
                    placeholder="Password" required />
                </div>
              </div>

              <div className="auth-row">
                <label className="auth-check-label">
                  <input type="checkbox" /> REMEMBER_ME
                </label>
                <Link to="/forgetmail" className="auth-link">FORGOT_SECRET?</Link>
              </div>

              {error && <div className="auth-alert auth-alert-err">⚠ {error}</div>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'INITIALIZING...' : 'INITIALIZE_LOGIN  →'}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span className="auth-divider-line"/>
              <span className="auth-divider-text">OR</span>
              <span className="auth-divider-line"/>
            </div>

            {/* Continue with Google */}
            <button
              type="button"
              id="google-login-btn"
              className="auth-google-btn"
              onClick={handleGoogleLogin}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.84l6.09-6.09C34.46 3.19 29.54 1 24 1 14.84 1 7.03 6.48 3.72 14.22l7.1 5.52C12.37 13.17 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.54 24.5c0-1.64-.15-3.22-.42-4.75H24v9.02h12.66c-.55 2.94-2.2 5.43-4.67 7.1l7.25 5.63C43.36 37.49 46.54 31.43 46.54 24.5z"/>
                <path fill="#FBBC05" d="M10.82 28.49A14.54 14.54 0 0 1 9.5 24c0-1.56.27-3.07.74-4.49l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.86.93 7.5 2.56 10.72l8.26-6.23z"/>
                <path fill="#34A853" d="M24 47c5.54 0 10.19-1.83 13.58-4.97l-7.25-5.63c-1.84 1.23-4.2 1.96-6.33 1.96-6.26 0-11.63-3.67-13.18-9.87l-8.26 6.23C7.03 41.52 14.84 47 24 47z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              CONTINUE_WITH_GOOGLE
            </button>

            <p className="auth-footer-text">
              NEW OPERATOR?{' '}
              <Link to="/register" className="auth-link">CREATE_ID</Link>
            </p>
          </motion.div>
        </div>

        {/* Status bar */}
        <div className="auth-statusbar">
          <div className="auth-statusbar-icons">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div className="auth-status-text">
            SYSTEM STATUS:&nbsp;
            <span className="auth-status-online">
              <span className="auth-status-dot"/>ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login