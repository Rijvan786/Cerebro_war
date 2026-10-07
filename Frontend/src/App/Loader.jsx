import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation } from 'react-router'
import './Loader.css'

/* ─────────────────────────────────────────────────────────
   Shared theme colours matching the dark design system
───────────────────────────────────────────────────────── */
const BASE  = '#1a1f2e'
const SHINE = '#2d3548'

/* ─────────────────────────────────────────────────────────
   Helper: one form field row  (label + input bar)
───────────────────────────────────────────────────────── */
const SklField = ({ labelWidth = '40%' }) => (
  <div className="skl-field">
    <Skeleton width={labelWidth} height={11} borderRadius={3} />
    <Skeleton width="100%" height={44} borderRadius={14} />
  </div>
)

/* ─────────────────────────────────────────────────────────
   AUTH skeleton  (Register + Login share the split layout)
   Register has 6 fields; Login has 2 + remember-me row
───────────────────────────────────────────────────────── */
const AuthSkeleton = ({ isRegister = true }) => (
  <div className="auth-page">
    {/* LEFT branding panel */}
    <div className="auth-left">
      <div className="skl-title-frame">
        <Skeleton width={110} height={30} borderRadius={4} style={{ marginBottom: 6 }} />
        <Skeleton width={130} height={30} borderRadius={4} style={{ marginBottom: 18 }} />
        <Skeleton width={170} height={12} borderRadius={3} style={{ marginBottom: 16 }} />
        <div className="skl-deco">
          <Skeleton width={40} height={2} />
          <Skeleton circle width={8} height={8} />
          <Skeleton width={24} height={2} />
        </div>
      </div>
    </div>

    {/* RIGHT form panel */}
    <div className={`auth-right${isRegister ? ' auth-right-wide' : ''}`}>
      <div className="auth-card-wrap">
        <div className="auth-card">
          {/* Heading */}
          <Skeleton width="60%" height={22} borderRadius={4} style={{ marginBottom: 8 }} />
          <Skeleton width="88%" height={13} borderRadius={3} style={{ marginBottom: 4 }} />
          <Skeleton width="65%" height={13} borderRadius={3} style={{ marginBottom: 28 }} />

          <div className="skl-form">
            {isRegister ? (
              <>
                {/* USERNAME */}
                <SklField labelWidth="38%" />
                {/* EMAIL */}
                <SklField labelWidth="44%" />
                {/* CONTACT — phone row: flag button + input */}
                <div className="skl-field">
                  <Skeleton width="42%" height={11} borderRadius={3} />
                  <div className="skl-phone-row">
                    <Skeleton width={52} height={44} borderRadius={14} />
                    <Skeleton width="100%" height={44} borderRadius={14} style={{ marginLeft: 4 }} />
                  </div>
                </div>
                {/* ROLE */}
                <SklField labelWidth="46%" />
                {/* PASSWORD — with SHOW badge */}
                <div className="skl-field">
                  <Skeleton width="40%" height={11} borderRadius={3} />
                  <div className="skl-password-row">
                    <Skeleton width="100%" height={44} borderRadius={14} />
                    <Skeleton width={36} height={14} borderRadius={3} className="skl-show-btn" />
                  </div>
                </div>
                {/* CONFIRM PASSWORD */}
                <SklField labelWidth="36%" />
              </>
            ) : (
              <>
                {/* OPERATOR_ID */}
                <SklField labelWidth="42%" />
                {/* ENCRYPTION_KEY */}
                <div className="skl-field">
                  <Skeleton width="44%" height={11} borderRadius={3} />
                  <div className="skl-password-row">
                    <Skeleton width="100%" height={44} borderRadius={14} />
                    <Skeleton width={36} height={14} borderRadius={3} className="skl-show-btn" />
                  </div>
                </div>
                {/* Remember me + Forgot */}
                <div className="skl-auth-row">
                  <Skeleton width={100} height={12} borderRadius={3} />
                  <Skeleton width={100} height={12} borderRadius={3} />
                </div>
              </>
            )}

            {/* Submit button */}
            <Skeleton width="100%" height={48} borderRadius={9999} />

            {/* OR divider */}
            <div className="skl-divider">
              <Skeleton width="100%" height={1} />
              <Skeleton width={24} height={12} borderRadius={3} />
              <Skeleton width="100%" height={1} />
            </div>

            {/* Google button */}
            <Skeleton width="100%" height={46} borderRadius={9999} />
          </div>

          {/* Footer link */}
          <div className="skl-footer-text">
            <Skeleton width={190} height={12} borderRadius={3} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="auth-statusbar">
        <div className="skl-statusbar-left">
          <Skeleton circle width={16} height={16} />
          <Skeleton circle width={16} height={16} />
        </div>
        <Skeleton width={160} height={11} borderRadius={3} />
      </div>
    </div>
  </div>
)

/* ─────────────────────────────────────────────────────────
   HOME skeleton  (hero: chip + title + rope visual + buttons)
───────────────────────────────────────────────────────── */
const HomeSkeleton = () => (
  <div className="skl-home-page">
    <div className="skl-home-card">
      {/* Eyebrow chip */}
      <div className="skl-center">
        <Skeleton width={180} height={28} borderRadius={9999} style={{ marginBottom: 24 }} />
      </div>
      {/* Title — two lines like "MATH / TUG OF WAR" */}
      <div className="skl-center">
        <Skeleton width="70%" height={48} borderRadius={6} style={{ marginBottom: 8 }} />
        <Skeleton width="60%" height={48} borderRadius={6} style={{ marginBottom: 20 }} />
      </div>
      {/* Subtitle */}
      <div className="skl-center">
        <Skeleton width="80%" height={18} borderRadius={4} style={{ marginBottom: 6 }} />
        <Skeleton width="55%" height={18} borderRadius={4} style={{ marginBottom: 32 }} />
      </div>
      {/* Rope visual card */}
      <div className="skl-rope-vis">
        <Skeleton width={80} height={80} borderRadius={12} />
        <Skeleton width={200} height={60} borderRadius={16} />
        <Skeleton width={80} height={80} borderRadius={12} />
      </div>
      {/* Buttons */}
      <div className="skl-center" style={{ flexDirection: 'column', gap: '12px' }}>
        <Skeleton width={240} height={54} borderRadius={9999} />
        <Skeleton width={200} height={38} borderRadius={9999} />
        <Skeleton width={260} height={14} borderRadius={4} style={{ marginTop: 8 }} />
      </div>
    </div>
  </div>
)

/* ─────────────────────────────────────────────────────────
   GAME SETUP skeleton  (header + 2 panels + actions)
───────────────────────────────────────────────────────── */
const GameSetupSkeleton = () => (
  <div className="skl-setup-page">
    <div className="skl-setup-wrap">
      {/* Header */}
      <div className="skl-center" style={{ flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
        <Skeleton width={180} height={26} borderRadius={9999} />
        <Skeleton width={240} height={36} borderRadius={6} />
        <Skeleton width={280} height={16} borderRadius={4} />
      </div>

      {/* Panel 1 — Teams + Time */}
      <div className="skl-setup-panel">
        {/* Teams row */}
        <div className="skl-teams-row">
          <div className="skl-field">
            <Skeleton width="50%" height={11} borderRadius={3} />
            <Skeleton width="100%" height={44} borderRadius={12} />
          </div>
          <div className="skl-field">
            <Skeleton width="50%" height={11} borderRadius={3} />
            <Skeleton width="100%" height={44} borderRadius={12} />
          </div>
        </div>
        {/* Time */}
        <Skeleton width="40%" height={11} borderRadius={3} style={{ marginTop: 16, marginBottom: 10 }} />
        <div className="skl-time-row">
          <Skeleton width="23%" height={36} borderRadius={9999} />
          <Skeleton width="23%" height={36} borderRadius={9999} />
          <Skeleton width="23%" height={36} borderRadius={9999} />
          <Skeleton width="23%" height={36} borderRadius={9999} />
        </div>
      </div>

      {/* Panel 2 — Education level + class grid */}
      <div className="skl-setup-panel">
        <Skeleton width="44%" height={11} borderRadius={3} style={{ marginBottom: 12 }} />
        <div className="skl-edu-grid">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skl-edu-card">
              <Skeleton circle width={36} height={36} />
              <Skeleton width="70%" height={10} borderRadius={3} />
              <Skeleton width="55%" height={9} borderRadius={3} />
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="skl-center" style={{ flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <Skeleton width={220} height={52} borderRadius={9999} />
        <Skeleton width={160} height={34} borderRadius={9999} />
      </div>
    </div>
  </div>
)

/* ─────────────────────────────────────────────────────────
   GENERIC GAME skeleton  (arena / gameover / quiz pages)
   — simple centred card with pulsing blocks
───────────────────────────────────────────────────────── */
const GameSkeleton = () => (
  <div className="skl-game-page">
    {/* Scoreboard bar */}
    <div className="skl-score-bar">
      <Skeleton width={100} height={36} borderRadius={10} />
      <Skeleton width={80}  height={48} borderRadius={12} />
      <Skeleton width={100} height={36} borderRadius={10} />
    </div>
    {/* Arena / question card */}
    <div className="skl-arena-card">
      <Skeleton width="55%" height={22} borderRadius={4} style={{ marginBottom: 16, alignSelf: 'center' }} />
      <Skeleton width="100%" height={64} borderRadius={14} style={{ marginBottom: 24 }} />
      {/* Answer options */}
      <div className="skl-options-grid">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} width="100%" height={52} borderRadius={12} />
        ))}
      </div>
    </div>
    {/* Numpad strip */}
    <div className="skl-numpad">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} width={54} height={54} borderRadius={10} />
      ))}
    </div>
  </div>
)

/* ─────────────────────────────────────────────────────────
   Main Loader — picks the right skeleton by current route
───────────────────────────────────────────────────────── */
const Loader = () => {
  const { pathname } = useLocation()

  const renderSkeleton = () => {
    if (pathname === '/register') return <AuthSkeleton isRegister={true}  />
    if (pathname === '/login')    return <AuthSkeleton isRegister={false} />
    if (pathname === '/')         return <HomeSkeleton />
    if (pathname === '/setup')    return <GameSetupSkeleton />
    /* arena, mcq-play, game-over, quiz, integration → generic game layout */
    return <GameSkeleton />
  }

  return (
    <SkeletonTheme baseColor={BASE} highlightColor={SHINE}>
      {renderSkeleton()}
    </SkeletonTheme>
  )
}

export default Loader
