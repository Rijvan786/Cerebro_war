import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion } from 'framer-motion';


export default function GameOver() {
  const navigate = useNavigate();
  const location = useLocation();
  const winner     = location.state?.winner    || 'Tie';
  const teamAScore = location.state?.teamAScore ?? 0;
  const teamBScore = location.state?.teamBScore ?? 0;
  const teamAName  = location.state?.teamAName  || 'Team A';
  const teamBName  = location.state?.teamBName  || 'Team B';

  const isTie      = winner === 'Tie';
  const winnerName = winner === 'Team A' ? teamAName : winner === 'Team B' ? teamBName : 'DRAW';

  // Dynamic colours
  const winnerGrad  = isTie
    ? 'linear-gradient(135deg,#f59e0b,#fbbf24)'
    : winner === 'Team A'
      ? 'linear-gradient(135deg,#0369a1,#38bdf8)'
      : 'linear-gradient(135deg,#991b1b,#f87171)';
  const winnerColor = isTie ? '#fbbf24' : winner === 'Team A' ? '#38bdf8' : '#f87171';
  const glowColor   = isTie ? 'rgba(251,191,36,0.4)' : winner === 'Team A' ? 'rgba(56,189,248,0.35)' : 'rgba(248,113,113,0.35)';

  // Star particles
  const stars = Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * 360,
    dist:  120 + (i % 3) * 60,
    dur:   1.5 + (i % 4) * 0.4,
    delay: i * 0.05,
    size:  6 + (i % 3) * 4,
  }));

  return (
    <>
      <style>{`
        .go-page {
          position: relative; width: 100%; min-height: 100vh;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; font-family: 'Outfit', sans-serif;
        }
        .go-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }

        /* Orbs */
        .go-orb-1 { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none;
                     width:550px; height:550px; top:-200px; left:-180px;
                     background:radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%); }
        .go-orb-2 { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none;
                     width:450px; height:450px; bottom:-150px; right:-150px;
                     background:radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%); }

        /* Burst ring */
        .go-burst {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 1px; height: 1px; pointer-events: none; z-index: 5;
        }
        .go-star {
          position: absolute; border-radius: 50%;
          top: 50%; left: 50%;
        }

        /* Main card */
        .go-card {
          position: relative; z-index: 10;
          width: min(640px, 92vw); text-align: center;
          padding: 3rem 2.5rem 2.5rem;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 28px;
        }

        /* Confetti row */
        .go-emoji-row { font-size: 2.2rem; margin-bottom: 0.8rem; }

        /* Title */
        .go-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.2rem, 5vw, 2.4rem);
          letter-spacing: 3px; margin-bottom: 0.6rem;
          color: #e0e7ff;
          text-shadow: 0 0 30px rgba(99,102,241,0.6);
        }

        /* Winner banner */
        .go-winner-banner {
          display: inline-block;
          margin: 0.5rem 0 1.8rem;
          padding: 0.7rem 2rem; border-radius: 9999px;
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.75rem, 3vw, 1.2rem);
          letter-spacing: 2px;
          box-shadow: 0 0 32px var(--winner-glow, rgba(99,102,241,0.4));
        }

        /* Score panel */
        .go-score-panel {
          display: flex; justify-content: space-around; align-items: center;
          padding: 1.6rem; border-radius: 20px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(99,102,241,0.15);
          margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem;
        }
        .go-score-team {
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .go-team-label {
          font-family: 'Press Start 2P', monospace; font-size: 0.55rem;
          letter-spacing: 1px; color: #64748b;
        }
        .go-score-num {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(2rem, 8vw, 3.5rem);
          line-height: 1;
        }
        .go-vs {
          font-family: 'Press Start 2P', monospace; font-size: 1rem;
          color: #334155; letter-spacing: 2px;
        }

        /* Button row */
        .go-btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        .btn-play-again {
          font-family: 'Press Start 2P', monospace; font-size: 0.7rem; letter-spacing: 1.5px;
          padding: 0.95rem 2.2rem; border-radius: 9999px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-play-again:hover  { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(99,102,241,0.55); }
        .btn-play-again:active { transform: translateY(1px);  box-shadow: 0 4px 12px rgba(99,102,241,0.3); }
        .btn-home {
          font-family: 'Press Start 2P', monospace; font-size: 0.6rem;
          padding: 0.85rem 1.6rem; border-radius: 9999px;
          background: transparent; border: 1.5px solid rgba(99,102,241,0.25);
          color: #64748b; cursor: pointer; transition: all 0.2s;
        }
        .btn-home:hover { border-color: #6366f1; color: #818cf8; }
      `}</style>

      <div className="go-page">
        <div className="go-orb-1"/><div className="go-orb-2"/>

        {/* Burst particles on winner */}
        {!isTie && (
          <div className="go-burst">
            {stars.map((s, i) => {
              const rad = (s.angle * Math.PI) / 180;
              const x = Math.cos(rad) * s.dist;
              const y = Math.sin(rad) * s.dist;
              return (
                <motion.div key={i} className="go-star"
                  style={{ width: s.size, height: s.size, background: winnerColor, marginLeft: -s.size/2, marginTop: -s.size/2 }}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                  animate={{ x, y, opacity: [0, 1, 0], scale: [0, 1.2, 0.3] }}
                  transition={{ duration: s.dur, delay: 0.3 + s.delay, ease: 'easeOut' }}
                />
              );
            })}
          </div>
        )}

        <div className="go-card">
          {/* Emoji row */}
          <motion.div className="go-emoji-row"
            initial={{ opacity:0, y:-16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          >
            {isTie ? '🤝🎮🤝' : '🏆🎉🏆'}
          </motion.div>

          {/* Title */}
          <motion.h1 className="go-title"
            initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }}
            transition={{ type:'spring', bounce:0.5, duration:0.7 }}
          >
            {isTie ? "IT'S A DRAW!" : 'WINNER!'}
          </motion.h1>

          {/* Winner banner */}
          <motion.div
            className="go-winner-banner"
            style={{ background: winnerGrad, '--winner-glow': glowColor, color: '#fff' }}
            initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.35, duration:0.5 }}
          >
            {isTie ? '🤝 NOBODY' : winner === 'Team A' ? `🔵 ${winnerName}` : `🔴 ${winnerName}`}
          </motion.div>

          {/* Score */}
          <motion.div className="go-score-panel"
            initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.5, duration:0.5 }}
          >
            <div className="go-score-team">
              <span className="go-team-label" style={{ color:'#38bdf8' }}>🔵 {teamAName}</span>
              <span className="go-score-num" style={{ color:'#38bdf8' }}>{teamAScore}</span>
            </div>
            <span className="go-vs">VS</span>
            <div className="go-score-team">
              <span className="go-team-label" style={{ color:'#f87171' }}>🔴 {teamBName}</span>
              <span className="go-score-num" style={{ color:'#f87171' }}>{teamBScore}</span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div className="go-btns"
            initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            transition={{ delay:0.7, type:'spring', stiffness:180 }}
          >
            <motion.button className="btn-play-again" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={() => navigate('/setup')}
            >▶ PLAY AGAIN</motion.button>
            <button className="btn-home" onClick={() => navigate('/')}>🏠 HOME</button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
