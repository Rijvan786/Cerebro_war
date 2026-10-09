import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useAuth } from '../hook/useAuth'
import Loader from '../../../App/Loader'
import { motion } from 'framer-motion'
import PhoneInputPkg from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const PhoneInput = PhoneInputPkg.default ?? PhoneInputPkg;

const ROLES = ["primary","middle","secondary","higher_secondary","Collage"]
const FLOATS = ['∑','÷','∞','≈','×','π','%','Δ','≠','+']

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ InstituteName:'', email:'', contact:'', role:'', password:'', confirmPassword:'' })
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, seterror] = useState('')
  const [loading, setLoading] = useState(false)
  const redirectTimerRef = useRef(null)
  const { handleRegister } = useAuth()
  const { Loading } = useSelector(state => state.auth)

  useEffect(() => { return () => { if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current) } }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handlePhoneChange = (value) => {
    setForm((prev) => ({ ...prev, contact: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    seterror(''); setSuccess('')
    if (form.password !== form.confirmPassword) { seterror('Passwords do not match.'); return }
    if (form.InstituteName.includes('@')) { seterror("Cannot use '@' in username."); return }
    setLoading(true)
    try {
      const NewForm={
        InstituteName:form.InstituteName,
        email:form.email,
        contact:"+"+form.contact,
        role:form.role,
        password:form.password
      }
      await handleRegister(NewForm)
      setSuccess('Account created! Check your email to verify.')
      navigate('/resendmail')
    } catch (err) {
      seterror(err.message || 'Something went wrong.')
    } finally { setLoading(false) }
  }
   async function handleGoogleLogin(){
    window.location.href="https://cerebrowar-production.up.railway.app/api/auth/google";
   }
  if (Loading) return <Loader />

  return (
    <div className="auth-page">
      {/* LEFT */}
      <div className="auth-left">
        {FLOATS.map((s, i) => (
          <motion.span key={i} className="float-symbol"
            style={{ left:`${6+((i*43+17)%88)}%`, top:`${6+((i*59+11)%88)}%`,
              fontSize:`${1.3+(i%3)*0.6}rem`, color:`hsl(${220+i*18},70%,65%)` }}
            animate={{ y:[0,-26,0,26,0], rotate:[0,(i%2?1:-1)*(15+i*9),0], opacity:[0.1,0.22,0.1] }}
            transition={{ duration:8+(i%5)*2, delay:(i%4)*0.8, repeat:Infinity, repeatType:'mirror', ease:'easeInOut' }}
          >{s}</motion.span>
        ))}
        <motion.div className="auth-title-frame"
          initial={{ opacity:0, scale:0.93 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.7 }}>
          <span className="auth-corner-tr"/><span className="auth-corner-bl"/>
          <h1 className="auth-game-title">NEW<br/>OPERATOR</h1>
          <p className="auth-game-sub">CREATE YOUR IDENTITY</p>
          <div className="auth-title-deco">
            <div className="auth-title-deco-line"/>
            <div className="auth-title-deco-dot"/>
            <div className="auth-title-deco-line"/>
          </div>
        </motion.div>
      </div>

      {/* RIGHT — wider card for 6 fields */}
      <div className="auth-right auth-right-wide">
        <div className="auth-card-wrap">
          <motion.div className="auth-card"
            initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>

            <h2 className="auth-heading">REGISTER_PORTAL<span className="auth-heading-cursor">▋</span></h2>
            <p className="auth-subtext">Initialize your combat profile to enter the arena.</p>

            <form className="auth-form" onSubmit={handleSubmit}>

              {/* USERNAME */}
              <div className="auth-field">
                <label className="auth-label">USERNAME_ID</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </span>
                  <input className="auth-input" id="InstituteName" name="InstituteName" type="text"
                    autoComplete="username" value={form.InstituteName} onChange={handleChange}
                    placeholder="Choose operator name" required />
                </div>
              </div>

              {/* EMAIL */}
              <div className="auth-field">
                <label className="auth-label">COMM_CHANNEL</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input className="auth-input" id="email" name="email" type="email"
                    autoComplete="email" value={form.email} onChange={handleChange}
                    placeholder="name@example.com" required />
                </div>
              </div>

              {/* CONTACT */}
              <div className="auth-field">
                <label className="auth-label">CONTACT_SIGNAL</label>
                <div className="auth-phone-wrap">
                  <PhoneInput
                    country={"in"}
                    value={form.contact}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: "phone",
                      id: "phone",
                      required: true,
                      placeholder: "98765 43210",
                    }}
                    containerClass="auth-phone-container"
                    inputClass="auth-phone-input"
                    buttonClass="auth-phone-btn"
                    dropdownClass="auth-phone-dropdown"
                    searchClass="auth-phone-search"
                    enableSearch
                  />
                </div>
              </div>

              {/* ROLE */}
              <div className="auth-field">
                <label className="auth-label">OPERATOR_ROLE</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </span>
                  <select className="auth-select" id="role" name="role" value={form.role} onChange={handleChange} required>
                    <option value="" disabled>Select your role</option>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              {/* PASSWORD */}
              <div className="auth-field">
                <label className="auth-label">ACCESS_CODE</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </span>
                  <input className="auth-input has-toggle" id="password" name="password"
                    type={showPassword ? 'text' : 'password'} autoComplete="new-password"
                    value={form.password} onChange={handleChange}
                    placeholder="Create a strong password" required />
                  <button type="button" className="auth-toggle-btn" onClick={() => setShowPassword(v => !v)}>
                    {showPassword ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              <div className="auth-field">
                <label className="auth-label">VERIFY_CODE</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </span>
                  <input className="auth-input" id="confirmPassword" name="confirmPassword"
                    type="password" autoComplete="new-password"
                    value={form.confirmPassword} onChange={handleChange}
                    placeholder="Re-enter your password" required />
                </div>
              </div>

              {error && <div className="auth-alert auth-alert-err">⚠ {error}</div>}
              {success && <div className="auth-alert auth-alert-ok">✓ {success}</div>}

              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'INITIALIZING...' : 'DEPLOY_OPERATOR  →'}
              </button>

              {/* Divider */}
              <div className="auth-divider">
                <span className="auth-divider-line"/>
                <span className="auth-divider-text">OR</span>
                <span className="auth-divider-line"/>
              </div>

              {/* Continue with Google */}
              <button
                type="button"
                id="google-register-btn"
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

            </form>

            <p className="auth-footer-text">
              EXISTING OPERATOR?{' '}
              <Link to="/login" className="auth-link">ACCESS_PORTAL</Link>
            </p>
          </motion.div>
        </div>

        <div className="auth-statusbar">
          <div className="auth-statusbar-icons">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <div className="auth-status-text">
            SYSTEM STATUS:&nbsp;
            <span className="auth-status-online"><span className="auth-status-dot"/>ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
