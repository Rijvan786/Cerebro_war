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

export default function Home() {
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
          background: radial-gradient(circle, rgba(99,102,241,0.22), transparent 70%);
          top:-200px; left:-180px;
          animation: orbDrift 18s ease-in-out infinite alternate;
        }
        .h-orb-2 {
          position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none;
          width:500px; height:500px;
          background: radial-gradient(circle, rgba(139,92,246,0.18), transparent 70%);
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
          padding: 3.5rem 2.5rem;
        }

        /* ─ Eyebrow chip ─ */
        .home-chip {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.4rem 1.1rem; border-radius: 9999px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.5px;
          color: #818cf8; margin-bottom: 1.6rem;
        }

        /* ─ Title ─ */
        .home-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.8rem, 6vw, 4rem);
          line-height: 1.25; letter-spacing: 2px;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #e0e7ff 10%, #818cf8 50%, #c4b5fd 90%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ─ Subtitle ─ */
        .home-sub {
          font-size: 1.05rem; font-weight: 500; color: #64748b;
          margin-bottom: 2.8rem; line-height: 1.6;
        }

        /* ─ Rope visual ─ */
        .rope-vis {
          display: flex; align-items: center; justify-content: center;
          gap: 1.2rem; margin-bottom: 3rem;
          padding: 1.8rem 2rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(99,102,241,0.18);
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
        .rope-svg { width: 200px; max-width: 100%; }
        .rope-status {
          font-family: 'Press Start 2P', monospace; font-size: 0.48rem;
          letter-spacing: 1px; color: #818cf8;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          padding: 0.35rem 0.9rem; border-radius: 9999px;
          display: block; margin-top: 0.5rem;
        }

        /* ─ Buttons ─ */
        .home-btn-row {
          display: flex; flex-direction: column; align-items: center; gap: 0.9rem;
        }
        .btn-start {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.75rem, 2vw, 1rem); letter-spacing: 2px;
          padding: 1.1rem 3rem; border-radius: 9999px;
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

        .home-tagline {
          margin-top: 0.6rem;
          font-size: 0.78rem; color: #334155; letter-spacing: 1px;
        }

        @media (max-width: 600px) {
          .home-card { padding: 2.5rem 1.2rem; }
          .rope-vis { padding: 1.2rem 0.8rem; gap: 0.6rem; }
          .rope-svg { width: 130px; }
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
            {/* Eyebrow */}
            <motion.div
              className="home-chip"
              initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ⚡ Competitive Math Platform
            </motion.div>

            {/* Title */}
            <motion.h1
              className="home-title"
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
             CEREBRO1
            </motion.h1>

            <motion.p
              className="home-sub"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              Pull the rope with math power — solve faster, win bigger!
            </motion.p>

            {/* Rope visual */}
            <motion.div
              className="rope-vis"
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="rope-team">
                <motion.span className="rope-team-emoji"
                  animate={{ rotate: [0,6,-6,0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                  🧮
                </motion.span>
                <span className="rope-team-label">TEAM A</span>
              </div>

              <motion.div animate={{ x: [0,3,-3,0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
                <svg viewBox="0 0 200 80" className="rope-svg">
                  <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%"   stopColor="#38bdf8" />
                      <stop offset="50%"  stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#f87171" />
                    </linearGradient>
                    <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                  </defs>
                  <path d="M16 40 Q100 28 184 40" stroke="url(#rg)" strokeWidth="10" strokeLinecap="round" fill="none" filter="url(#glow)"/>
                  <circle cx="100" cy="34" r="12" fill="#6366f1" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                    <animate attributeName="r" values="10;14;10" dur="1.4s" repeatCount="indefinite"/>
                  </circle>
                  <text x="100" y="39" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">!</text>
                </svg>
              </motion.div>

              <div className="rope-team">
                <motion.span className="rope-team-emoji"
                  animate={{ rotate: [0,-6,6,0] }} transition={{ duration: 2.5, repeat: Infinity }}>
                  🏆
                </motion.span>
                <span className="rope-team-label">TEAM B</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="home-btn-row"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
            >
              <motion.button
                className="btn-start"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/setup')}
              >
                ▶ START GAME ◀
              </motion.button>

              <motion.button
                className="btn-integration"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/integration')}
              >
                📐 Integration Practice Sheet
              </motion.button>

              <p className="home-tagline">Answer fast • Pull the rope • Claim victory</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}