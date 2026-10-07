import React from 'react';
import { motion } from 'framer-motion';


/*
  ROPE_Y_PERCENT = 48  → rope is at 48% height of the arena
  Character SVG viewBox "0 0 80 130"
  - Hand that grips rope is at y ≈ 62 in SVG coords
  - So character's top = ROPE_Y - (62/130)*charHeight
  We render charHeight = 110px
  → handOffset = (62/130)*110 ≈ 52px from top of SVG
  → charTop = ropeY_px - 52
  We handle this with CSS: align hand to rope via negative top offset
*/

function CartoonHuman({
  isFlipped = false,
  shirtColor = '#2563eb',
  pantsColor = '#1e3a5f',
  skinColor = '#FDBCB4',
  hairColor = '#5c3d1e',
  delay = 0,
}) {
  const lean = isFlipped ? [6, 11, 6] : [-6, -11, -6];

  return (
    <motion.svg
      viewBox="0 0 80 130"
      width="72"
      height="110"
      style={{
        transform: isFlipped ? 'scaleX(-1)' : 'none',
        display: 'block',
        overflow: 'visible',
      }}
    >
      {/*  whole body lean - pivot at feet (y=128) */}
      <motion.g
        animate={{ rotate: lean }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
        style={{ transformOrigin: '40px 128px' }}
      >
        {/* ── LEGS ── */}
        {/* Back leg */}
        <motion.g
          animate={{ rotate: [-12, -6, -12] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
          style={{ transformOrigin: '38px 96px' }}
        >
          <rect x="30" y="96" width="14" height="24" rx="7" fill={pantsColor} />
          <rect x="22" y="116" width="20" height="8" rx="4" fill="#2a2a2a" />
        </motion.g>

        {/* Front leg */}
        <motion.g
          animate={{ rotate: [12, 6, 12] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.15 }}
          style={{ transformOrigin: '46px 96px' }}
        >
          <rect x="36" y="96" width="14" height="24" rx="7" fill={pantsColor} />
          <rect x="36" y="116" width="20" height="8" rx="4" fill="#2a2a2a" />
        </motion.g>

        {/* ── TORSO ── */}
        <rect x="22" y="62" width="36" height="36" rx="10" fill={shirtColor} />
        {/* Stripes on shirt */}
        <rect x="22" y="70" width="36" height="3" rx="1" fill="rgba(255,255,255,0.15)" />
        {/* Belt */}
        <rect x="22" y="96" width="36" height="5" rx="2" fill="#444" />
        <rect x="35" y="95" width="10" height="7" rx="2" fill="#aaa" />

        {/* ── NECK ── */}
        <rect x="34" y="53" width="12" height="12" rx="5" fill={skinColor} />

        {/* ── BACK ARM (reaches toward rope, outstretched) ── */}
        <motion.g
          animate={{ rotate: [-35, -25, -35] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
          style={{ transformOrigin: '28px 68px' }}
        >
          {/* Upper arm */}
          <rect x="8" y="62" width="22" height="11" rx="5.5" fill={shirtColor} />
          {/* Forearm */}
          <motion.g
            animate={{ rotate: [25, 15, 25] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ transformOrigin: '8px 67px' }}
          >
            <rect x="-10" y="62" width="20" height="10" rx="5" fill={skinColor} />
            {/* Fist gripping rope */}
            <ellipse cx="-8" cy="67" rx="8" ry="8" fill={skinColor} />
            <line x1="-11" y1="63" x2="-11" y2="71" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-8"  y1="62" x2="-8"  y2="72" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="-5"  y1="63" x2="-5"  y2="71" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" strokeLinecap="round" />
          </motion.g>
        </motion.g>

        {/* ── FRONT ARM (braced behind, pulling) ── */}
        <motion.g
          animate={{ rotate: [22, 32, 22] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.1 }}
          style={{ transformOrigin: '52px 68px' }}
        >
          <rect x="50" y="62" width="20" height="11" rx="5.5" fill={shirtColor} />
          <motion.g
            animate={{ rotate: [-18, -28, -18] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.1 }}
            style={{ transformOrigin: '70px 67px' }}
          >
            <rect x="68" y="62" width="18" height="10" rx="5" fill={skinColor} />
            <ellipse cx="84" cy="67" rx="7" ry="7" fill={skinColor} />
          </motion.g>
        </motion.g>

        {/* ── HEAD ── */}
        <ellipse cx="40" cy="38" rx="20" ry="22" fill={skinColor} stroke="rgba(0,0,0,0.05)" strokeWidth="1" />

        {/* ── HAIR ── */}
        <ellipse cx="40" cy="20" rx="20" ry="11" fill={hairColor} />
        <rect x="20" y="20" width="40" height="9" rx="4" fill={hairColor} />
        <ellipse cx="21" cy="32" rx="5" ry="9" fill={hairColor} />

        {/* ── FACE ── */}
        {/* Ears */}
        <ellipse cx="20" cy="38" rx="4.5" ry="6" fill={skinColor} />
        <ellipse cx="60" cy="38" rx="4.5" ry="6" fill={skinColor} />
        {/* Eye whites */}
        <ellipse cx="32" cy="36" rx="5.5" ry="6.5" fill="white" />
        <ellipse cx="48" cy="36" rx="5.5" ry="6.5" fill="white" />
        {/* Pupils looking toward rope */}
        <motion.ellipse
          animate={{ cx: [30.5, 29.5, 30.5] }}
          transition={{ duration: 0.5, repeat: Infinity, delay }}
          cy="37" rx="3" ry="3.5" fill="#111"
        />
        <motion.ellipse
          animate={{ cx: [46.5, 45.5, 46.5] }}
          transition={{ duration: 0.5, repeat: Infinity, delay }}
          cy="37" rx="3" ry="3.5" fill="#111"
        />
        {/* Effort eyebrows */}
        <path d="M25 29 Q32 25 38 29" stroke={hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M42 29 Q48 25 55 29" stroke={hairColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Nose */}
        <ellipse cx="40" cy="43" rx="2.5" ry="1.8" fill="rgba(0,0,0,0.1)" />
        {/* Gritting grin */}
        <path d="M30 49 Q40 56 50 49" stroke="#b0392b" strokeWidth="2" fill="white" strokeLinecap="round" />
        {/* Cheek blush */}
        <ellipse cx="23" cy="44" rx="5" ry="3" fill="rgba(255,110,90,0.28)" />
        <ellipse cx="57" cy="44" rx="5" ry="3" fill="rgba(255,110,90,0.28)" />

        {/* ── SWEAT ── */}
        <motion.ellipse cx="62" cy="22"
          animate={{ cy: [22, 6, 22], opacity: [1, 0, 1] }}
          transition={{ duration: 1.0, repeat: Infinity, delay }}
          rx="2.5" ry="4.5" fill="rgba(100,200,255,0.85)"
        />
        <motion.ellipse cx="65" cy="32"
          animate={{ cy: [32, 16, 32], opacity: [1, 0, 1] }}
          transition={{ duration: 1.3, repeat: Infinity, delay: delay + 0.4 }}
          rx="2" ry="3.5" fill="rgba(100,200,255,0.7)"
        />

        {/* ── EFFORT SPARKS (on the pulling side) ── */}
        <motion.g animate={{ opacity: [0.1, 1, 0.1] }} transition={{ duration: 0.38, repeat: Infinity, delay }}>
          <line x1="2"  y1="52" x2="-7" y2="44" stroke="#ffd166" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="2"  y1="64" x2="-8" y2="64" stroke="#ffd166" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="2"  y1="76" x2="-7" y2="84" stroke="#ffd166" strokeWidth="2.2" strokeLinecap="round" />
        </motion.g>
      </motion.g>
    </motion.svg>
  );
}

/* ─────────────────────────────── */
export default function TugOfWarBoard({
  ropePosition,
  teamAName = 'Team A',
  teamBName = 'Team B',
  teamAScore = 0,
  teamBScore = 0,
  timeLeft = 60,
  levelLabel = 'Class 5',
}) {
  const pct = Math.max(18, Math.min(82, 50 + ropePosition * 3));
  const teamAWinning = ropePosition < 0;
  const teamBWinning = ropePosition > 0;

  /*
    Rope is at CSS "top: 48%" inside .tow-arena-inner.
    Character SVG height = 110px, hand (fist) is at y=67 in viewBox(0,0,80,130)
    → handRatio = 67/130 ≈ 0.515
    → handOffset from SVG top = 0.515 * 110 ≈ 56.7 px
    So we position character with:  top = "calc(48% - 57px)"   ← hand aligns to rope
  */
  const CHAR_TOP = 'calc(48% - 57px)';

  return (
    <>
      <style>{`
        .tow-board {
          width:100%; height:100%;
          display:flex; flex-direction:column;
          align-items:center; justify-content:center;
          position:relative; overflow:hidden;
          font-family:'Press Start 2P','Courier New',monospace;
          padding:0.5rem 0.7rem; gap:0.55rem;
        }
        /* Subtle side tints */
        .tow-board::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(to right,
            rgba(56,189,248,0.08),transparent 40%,
            transparent 60%,rgba(248,113,113,0.08));
          pointer-events:none;
        }

        /* ─ Scores ─ */
        .tow-scores {
          display:flex; width:100%;
          justify-content:space-around; align-items:center; flex-shrink:0;
        }
        .tow-score-box {
          text-align:center;
          background:rgba(255,255,255,0.04);
          backdrop-filter:blur(10px);
          border-radius:14px; padding:0.45rem 0.9rem;
          border:1.5px solid rgba(99,102,241,0.2);
        }
        .tow-score-label { font-size:clamp(0.34rem,0.9vw,0.54rem); display:block; margin-bottom:0.2rem; }
        .tow-score-num   { font-size:clamp(0.9rem,2.2vw,1.6rem); display:block; }

        /* ─ Timer ─ */
        .tow-timer {
          font-family:'Press Start 2P',monospace;
          font-size:clamp(0.8rem,1.8vw,1.3rem);
          padding:0.38rem 1rem;
          background:rgba(255,255,255,0.05);
          border:1.5px solid rgba(99,102,241,0.25); border-radius:14px;
          backdrop-filter:blur(10px);
          box-shadow:0 0 14px rgba(99,102,241,0.2);
        }
        .tow-level-badge {
          font-family:'Press Start 2P',monospace;
          font-size:clamp(0.3rem,0.7vw,0.46rem);
          padding:0.2rem 0.7rem;
          background:rgba(99,102,241,0.08);
          border:1px solid rgba(99,102,241,0.2); border-radius:9999px;
          color:#818cf8; letter-spacing:0.5px;
          text-align:center; margin-top:0.18rem;
        }

        /* ─ Advantage bar ─ */
        .tow-adv-wrap { width:86%; flex-shrink:0; }
        .tow-adv-labels {
          display:flex; justify-content:space-between;
          font-size:clamp(0.33rem,0.8vw,0.5rem);
          margin-bottom:0.18rem; padding:0 0.15rem;
        }
        .tow-adv-bg {
          width:100%; height:8px; border-radius:8px;
          background:rgba(255,255,255,0.06); overflow:hidden;
          border:1px solid rgba(99,102,241,0.15);
        }
        .tow-adv-fill {
          height:100%;
          background:linear-gradient(to right,#38bdf8,#818cf8);
          border-radius:8px; transition:width 0.4s ease;
        }

        /* ─ Rope arena ─ */
        .tow-arena {
          width:96%; flex:1;
          background:rgba(255,255,255,0.03);
          border:1px solid rgba(99,102,241,0.2); border-radius:22px;
          position:relative; backdrop-filter:blur(8px);
          box-shadow:0 8px 32px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.05);
          overflow:hidden; min-height:180px;
        }
        /* Ground */
        .tow-ground {
          position:absolute; bottom:0; left:0; right:0; height:28px;
          background:linear-gradient(to top,rgba(30,41,59,0.8),transparent);
          border-top:1px solid rgba(99,102,241,0.12);
        }
        .tow-center-flag {
          position:absolute; left:50%; top:0; bottom:0;
          width:1px; background:rgba(255,255,255,0.08);
          transform:translateX(-50%);
        }
        .tow-arena-inner {
          width:100%; height:100%; position:relative; min-height:180px;
        }

        /* ─ Rope segments ─ */
        .rope-seg {
          position:absolute; height:10px; border-radius:5px;
          top:48%; transform:translateY(-50%); z-index:4;
          box-shadow:0 2px 8px rgba(0,0,0,0.4);
        }
        /* ─ Knot ─ */
        .rope-knot {
          position:absolute; width:22px; height:22px; border-radius:50%;
          background:linear-gradient(135deg,#818cf8,#6366f1);
          border:2px solid rgba(255,255,255,0.25);
          top:48%; transform:translate(-50%,-50%); z-index:7;
          display:flex; align-items:center; justify-content:center;
          font-size:0.48rem; font-weight:bold; color:#fff;
          box-shadow:0 0 16px rgba(99,102,241,0.7), 0 0 32px rgba(99,102,241,0.4);
          animation: knotPulse 0.9s infinite alternate;
        }
        @keyframes knotPulse {
          from { box-shadow:0 0 10px rgba(99,102,241,0.5); }
          to   { box-shadow:0 0 22px rgba(99,102,241,0.8), 0 0 40px rgba(99,102,241,0.4); }
        }

        /* Character slots */
        .team-a-chars {
          position:absolute; top:${CHAR_TOP};
          display:flex; flex-direction:row; gap:2px;
          z-index:5; align-items:flex-start;
        }
        .team-b-chars {
          position:absolute; top:${CHAR_TOP};
          display:flex; flex-direction:row; gap:2px;
          z-index:5; align-items:flex-start;
        }

        /* ─ Status strip ─ */
        .tow-status {
          font-size:clamp(0.35rem,0.9vw,0.55rem);
          padding:0.28rem 0.9rem; border-radius:9999px;
          background:rgba(99,102,241,0.08);
          border:1px solid rgba(99,102,241,0.18);
          color:#818cf8; letter-spacing:1px;
          text-align:center; flex-shrink:0;
        }
      `}</style>

      <div className="tow-board">
        {/* ── Scores + Timer ── */}
        <div className="tow-scores">
          <motion.div className="tow-score-box"
            animate={teamAWinning ? { scale:[1,1.06,1] } : {}}
            transition={{ duration:0.4 }}
            style={{ borderColor: teamAWinning ? 'rgba(56,189,248,0.5)':'rgba(99,102,241,0.2)' }}
          >
            <span className="tow-score-label" style={{ color:'#38bdf8' }}>🔵 {teamAName}</span>
            <span className="tow-score-num"   style={{ color:'#38bdf8' }}>{teamAScore}</span>
          </motion.div>

          <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <motion.div className="tow-timer"
              animate={{ color: timeLeft<=10 ? ['#f87171','#e0e7ff','#f87171'] : '#e0e7ff' }}
              transition={{ duration:0.5, repeat: timeLeft<=10 ? Infinity : 0 }}
            >
              ⏱ {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
            </motion.div>
            <div className="tow-level-badge">📚 {levelLabel}</div>
          </div>

          <motion.div className="tow-score-box"
            animate={teamBWinning ? { scale:[1,1.06,1] } : {}}
            transition={{ duration:0.4 }}
            style={{ borderColor: teamBWinning ? 'rgba(248,113,113,0.5)':'rgba(99,102,241,0.2)' }}
          >
            <span className="tow-score-label" style={{ color:'#f87171' }}>🔴 {teamBName}</span>
            <span className="tow-score-num"   style={{ color:'#f87171' }}>{teamBScore}</span>
          </motion.div>
        </div>

        {/* ── Advantage bar ── */}
        <div className="tow-adv-wrap">
          <div className="tow-adv-labels">
            <span style={{ color:'#6ec6f5' }}>← {teamAName}</span>
            <span style={{ color:'#ff8a80' }}>{teamBName} →</span>
          </div>
          <div className="tow-adv-bg">
            <div className="tow-adv-fill" style={{ width:`${100-pct}%` }} />
          </div>
        </div>

        {/* ── Rope Arena ── */}
        <div className="tow-arena">
          <div className="tow-arena-inner">
            <div className="tow-ground" />
            <div className="tow-center-flag" />

            {/* Rope left segment */}
            <motion.div className="rope-seg"
              style={{ left:'3%', background:'linear-gradient(to right,#38bdf8,#818cf8)' }}
              animate={{ width:`${pct - 3}%` }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
            />

            {/* Rope right segment */}
            <motion.div className="rope-seg"
              style={{ background:'linear-gradient(to right,#818cf8,#f87171)' }}
              animate={{ left:`${pct}%`, width:`${95 - pct}%` }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
            />

            {/* Knot */}
            <motion.div className="rope-knot"
              animate={{ left:`${pct}%` }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
            >◉</motion.div>

            {/* ── Team A: 2 characters LEFT of knot (right-facing, pulling left) ── */}
            <motion.div
              className="team-a-chars"
              animate={{ left:`calc(${pct}% - 155px)` }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
            >
              {/* Back character (slightly smaller / faded) */}
              <CartoonHuman isFlipped={false} shirtColor="#1d4ed8" pantsColor="#1e3a5f" skinColor="#F0A899" hairColor="#7c5a3a" delay={0.2} />
              {/* Front character — right at rope */}
              <CartoonHuman isFlipped={false} shirtColor="#2563eb" pantsColor="#1e3a5f" skinColor="#FDBCB4" hairColor="#5c3d1e" delay={0} />
            </motion.div>

            {/* ── Team B: 2 characters RIGHT of knot (left-facing, pulling right) ── */}
            <motion.div
              className="team-b-chars"
              animate={{ left:`calc(${pct}% + 12px)` }}
              transition={{ type:'spring', stiffness:80, damping:18 }}
            >
              {/* Front character — right at rope */}
              <CartoonHuman isFlipped={true} shirtColor="#dc2626" pantsColor="#7f1d1d" skinColor="#F5C5A3" hairColor="#1a1a1a" delay={0} />
              {/* Back character */}
              <CartoonHuman isFlipped={true} shirtColor="#b91c1c" pantsColor="#7f1d1d" skinColor="#E8B49A" hairColor="#3d2b1f" delay={0.2} />
            </motion.div>
          </div>
        </div>

        {/* ── Status ── */}
        <div className="tow-status">
          {ropePosition === 0
            ? '⚡ PERFECTLY BALANCED ⚡'
            : ropePosition < 0
            ? `🔵 ${teamAName.toUpperCase()} IS PULLING AHEAD!`
            : `🔴 ${teamBName.toUpperCase()} IS PULLING AHEAD!`}
        </div>
      </div>
    </>
  );
}
