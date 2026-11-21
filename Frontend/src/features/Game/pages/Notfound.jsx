import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const SYMBOLS = ['+', '−', '×', '÷', '√', 'π', '∞', '∑', '∫', '≠', '≈', 'Δ'];
const floats = SYMBOLS.map((s, i) => ({
  s,
  left: `${5 + ((i * 37 + 11) % 90)}%`,
  top:  `${5 + ((i * 53 + 7)  % 85)}%`,
  dur:  7 + (i % 5) * 2,
  del:  (i % 4) * 0.8,
  size: `${1.4 + (i % 3) * 0.7}rem`,
  rot:  (i % 2 === 0 ? 1 : -1) * (20 + i * 10),
  hue:  220 + (i * 18),
}));

export default function Notfound() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .home-page {
          position: relative; width: 100%; min-height: 100vh;
          display: flex; flex-direction: column; align-items: stretch;
          overflow: hidden;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
        }
        .home-content {
          flex: 1; display: flex; align-items: center; justify-content: center;
          position: relative;
        }

        /* Grid mesh */
        .home-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }

        /* ─ Ambient orbs ─ */
        .h-orb-1 {
          position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none;
          width:600px; height:600px;
          background: radial-gradient(circle, rgba(244,63,94,0.22), transparent 70%);
          top:-200px; left:-180px;
          animation: orbDrift 18s ease-in-out infinite alternate;
        }
        .h-orb-2 {
          position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none;
          width:500px; height:500px;
          background: radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%);
          bottom:-160px; right:-160px;
          animation: orbDrift 22s ease-in-out infinite alternate-reverse;
        }
        .h-orb-3 {
          position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none;
          width:300px; height:300px;
          background: radial-gradient(circle, rgba(34,211,238,0.12), transparent 70%);
          top:55%; left:50%; transform:translateX(-50%);
        }
        @keyframes orbDrift {
          0%   { transform: translate(0,0); }
          100% { transform: translate(60px, 40px); }
        }

        /* ─ Floating symbols ─ */
        .h-float {
          position:absolute; pointer-events:none;
          font-family: 'Press Start 2P', monospace;
          font-weight:700; opacity:0.1;
          text-shadow:0 0 12px currentColor;
          user-select:none;
        }

        /* ─ Main card ─ */
        .home-card {
          position: relative; z-index: 10;
          width: min(860px, 92vw);
          text-align: center;
          padding: 3rem 2.5rem;
        }

        /* ─ Eyebrow chip ─ */
        .home-chip {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.4rem 1.1rem; border-radius: 9999px;
          background: rgba(244,63,94,0.12);
          border: 1px solid rgba(244,63,94,0.3);
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.5px;
          color: #fb7185; margin-bottom: 1.4rem;
        }

        /* ─ Title ─ */
        .home-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(2rem, 7vw, 4.4rem);
          line-height: 1.2; letter-spacing: 2px;
          margin-bottom: 0.8rem;
          background: linear-gradient(135deg, #fecdd3 10%, #f43f5e 50%, #818cf8 90%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─ Subtitle ─ */
        .home-sub {
          font-size: 1.05rem; font-weight: 500; color: #94a3b8;
          margin-bottom: 2.2rem; line-height: 1.6;
          max-width: 580px; margin-left: auto; margin-right: auto;
        }
        .home-sub span {
          color: #38bdf8;
          font-weight: 600;
        }

        /* ─ Broken rope visual ─ */
        .rope-vis {
          display: flex; align-items: center; justify-content: center;
          gap: 1.2rem; margin-bottom: 2.6rem;
          padding: 1.6rem 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(244,63,94,0.22);
          border-radius: 24px;
          backdrop-filter: blur(12px);
        }
        .rope-team {
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
        }
        .rope-team-emoji { font-size: 2.4rem; }
        .rope-team-label {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.45rem; letter-spacing: 1px;
          color: #64748b;
        }
        .rope-svg { width: 220px; max-width: 100%; }

        /* ─ Buttons ─ */
        .home-btn-row {
          display: flex; flex-direction: column; align-items: center; gap: 0.9rem;
        }
        .btn-start {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.72rem, 2vw, 0.95rem); letter-spacing: 2px;
          padding: 1.1rem 2.8rem; border-radius: 9999px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-start:hover  { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(99,102,241,0.55); }
        .btn-start:active { transform: translateY(1px);  box-shadow: 0 4px 14px rgba(99,102,241,0.3); }

        .btn-integration {
          font-family: 'Press Start 2P', monospace;
          font-size: 0.52rem; letter-spacing: 1px;
          padding: 0.7rem 1.8rem; border-radius: 9999px;
          background: rgba(139,92,246,0.12);
          border: 1.5px solid rgba(167,139,250,0.35);
          color: #a78bfa; cursor: pointer;
          transition: all 0.2s;
        }
        .btn-integration:hover {
          background: rgba(139,92,246,0.22);
          border-color: #a78bfa;
          box-shadow: 0 0 18px rgba(139,92,246,0.25);
          transform: translateY(-2px);
        }

        .btn-back-link {
          background: transparent;
          border: none;
          color: #64748b;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 0.2rem;
        }
        .btn-back-link:hover {
          color: #cbd5e1;
          text-decoration: underline;
        }

        .home-tagline {
          margin-top: 0.6rem;
          font-size: 0.78rem; color: #475569; letter-spacing: 1px;
        }

        @media (max-width: 600px) {
          .home-card { padding: 2.2rem 1.2rem; }
          .rope-vis { padding: 1.2rem 0.8rem; gap: 0.6rem; }
          .rope-svg { width: 140px; }
          .btn-start { width: 100%; padding: 1rem 1.5rem; }
        }
      `}</style>

      <div className="home-page">
        <Navbar />

        <div className="home-content">
          <div className="h-orb-1" />
          <div className="h-orb-2" />
          <div className="h-orb-3" />

          {/* Floating symbols */}
          {floats.map((f, i) => (
            <motion.span
              key={i} className="h-float"
              style={{ left: f.left, top: f.top, fontSize: f.size, color: `hsl(${f.hue},80%,70%)` }}
              animate={{ y: [0, -30, 0, 30, 0], x: [0, 15, -10, 5, 0], rotate: [0, f.rot, 0], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: f.dur, delay: f.del, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
            >
              {f.s}
            </motion.span>
          ))}

          <div className="home-card">
            {/* Eyebrow Chip */}
            <motion.div
              className="home-chip"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ⚠ 404 • SECTOR NOT FOUND
            </motion.div>

            {/* Title */}
            <motion.h1
              className="home-title"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              404 VOID
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="home-sub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              The coordinate you tried to pull broke the arena matrix!
              Looks like this path resulted in <span>division by zero</span>.
            </motion.p>

            {/* Broken rope / 404 Visual */}
            <motion.div
              className="rope-vis"
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="rope-team">
                <motion.span className="rope-team-emoji"
                  animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
                  🧮
                </motion.span>
                <span className="rope-team-label">TEAM A</span>
              </div>

              {/* Broken rope graphic with snap effect */}
              <motion.div animate={{ x: [0, 4, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                <svg viewBox="0 0 220 80" className="rope-svg">
                  <defs>
                    <linearGradient id="snapGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="snapGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#fb7185" />
                    </linearGradient>
                    <filter id="nfGlow">
                      <feGaussianBlur stdDeviation="3" result="glow" />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Left severed rope strand */}
                  <path d="M 12 40 Q 55 32 85 36" stroke="url(#snapGradLeft)" strokeWidth="9" strokeLinecap="round" fill="none" filter="url(#nfGlow)"/>
                  <line x1="85" y1="36" x2="92" y2="34" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />

                  {/* Disconnection spark / 404 Node */}
                  <circle cx="110" cy="38" r="14" fill="#1e112a" stroke="#f43f5e" strokeWidth="2.5" filter="url(#nfGlow)">
                    <animate attributeName="r" values="12;15;12" dur="1.2s" repeatCount="indefinite"/>
                  </circle>
                  <text x="110" y="42" textAnchor="middle" fill="#f43f5e" fontSize="9" fontFamily="'Press Start 2P', monospace" fontWeight="bold">?</text>

                  {/* Right severed rope strand */}
                  <line x1="128" y1="42" x2="135" y2="40" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                  <path d="M 135 40 Q 165 44 208 40" stroke="url(#snapGradRight)" strokeWidth="9" strokeLinecap="round" fill="none" filter="url(#nfGlow)"/>
                </svg>
              </motion.div>

              <div className="rope-team">
                <motion.span className="rope-team-emoji"
                  animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2.2, repeat: Infinity }}>
                  🛸
                </motion.span>
                <span className="rope-team-label">LOST VOID</span>
              </div>
            </motion.div>

            {/* Buttons Row identical to Home page styling */}
            <motion.div
              className="home-btn-row"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
            >
              <motion.button
                className="btn-start"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
              >
                ▶ BACK TO ARENA ◀
              </motion.button>

              <motion.button
                className="btn-integration"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/setup')}
              >
                ⚔ Go To Game Setup
              </motion.button>

              <button
                type="button"
                className="btn-back-link"
                onClick={() => navigate(-1)}
              >
                ← Return to Previous Page
              </button>

              <p className="home-tagline">Coordinate missing • Recalibrate neural link • Enter the arena</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
