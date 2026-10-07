import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useMCQLogic } from '../hooks/useMCQLogic';



const OPTION_LABELS = ['A', 'B', 'C', 'D'];
const LEVEL_LABELS  = { class11:'Class 11', class12:'Class 12', btech:'B.Tech', medical:'Medical' };

/* ─ Player panel ────────────────────────────────────────────── */
function PlayerPanel({ side, teamName, score, question, feedback, locked, onAnswer }) {
  const isA    = side === 'A';
  const accent = isA ? '#38bdf8' : '#f87171';
  const glow   = isA ? 'rgba(56,189,248,0.25)' : 'rgba(248,113,113,0.25)';
  const grad   = isA ? 'linear-gradient(135deg,#0369a1,#38bdf8)' : 'linear-gradient(135deg,#991b1b,#f87171)';

  return (
    <div className={`mp mp-${side}`}>
      {/* Header */}
      <div className="mp-header" style={{ borderColor: accent }}>
        <span className="mp-emoji">{isA ? '🔵' : '🔴'}</span>
        <span className="mp-name" style={{ color: accent }}>{teamName}</span>
        <span className="mp-score" style={{ background: grad, boxShadow: `0 0 14px ${glow}` }}>
          {score}
        </span>
      </div>

      {/* Topic */}
      <span className="mp-topic" style={{ color: accent, borderColor: accent }}>
        📌 {question?.topic || '—'}
      </span>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={question?.q} className="mp-q-card"
          style={{ borderColor: accent, boxShadow: `0 0 20px ${glow}` }}
          initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-14 }}
          transition={{ duration:0.28 }}
        >
          <p className="mp-q-text">{question?.q}</p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="mp-opts-grid">
        {question?.opts?.map((opt, i) => {
          let cls = 'mp-opt';
          if (feedback === 'correct' && i === question.ans) cls += ' opt-correct';
          else if (feedback === 'wrong' && i === question.ans) cls += ' opt-reveal';
          return (
            <motion.button key={i} className={cls}
              style={{ '--accent': accent, '--glow': glow }}
              onClick={() => onAnswer(i)}
              disabled={locked}
              whileHover={!locked ? { scale:1.03 } : {}}
              whileTap={!locked  ? { scale:0.96 } : {}}
            >
              <span className="opt-lbl" style={{ background: accent }}>{OPTION_LABELS[i]}</span>
              <span className="opt-txt">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div className={`mp-feedback ${feedback}`}
            initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:1.2 }}
            transition={{ duration:0.22 }}
          >
            {feedback === 'correct' ? '✅ CORRECT!' : '❌ WRONG!'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─ Main page ───────────────────────────────────────────────── */
export default function MCQArena() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const teamAName  = location.state?.teamA      || 'Team A';
  const teamBName  = location.state?.teamB      || 'Team B';
  const gameTime   = location.state?.time       || 60;
  const level      = location.state?.difficulty || 'class11';
  const levelLabel = LEVEL_LABELS[level]        || 'Advanced';

  const { timeLeft, teamAScore, teamBScore, questionA, questionB,
          feedbackA, feedbackB, answerA, answerB, isGameOver, winner,
  } = useMCQLogic(gameTime, level);

  useEffect(() => {
    if (isGameOver) {
      setTimeout(() => navigate('/gameover', {
        state: { winner, teamAScore, teamBScore, teamAName, teamBName },
      }), 900);
    }
  }, [isGameOver]);

  const timePct   = (timeLeft / gameTime) * 100;
  const timerCol  = timeLeft <= 10 ? '#f87171' : timeLeft <= 20 ? '#fbbf24' : '#22d3ee';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap');

        .mcq-page {
          width:100vw; min-height:100vh;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
          display:flex; flex-direction:column; align-items:center;
          font-family:'Space Grotesk','Outfit',sans-serif;
          overflow:hidden; position:relative;
        }
        /* Grid mesh */
        .mcq-page::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size:48px 48px; pointer-events:none;
        }
        /* Ambient orbs */
        .mq-o1 { position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;
                  width:500px;height:500px;background:radial-gradient(circle,rgba(56,189,248,0.15),transparent 70%);
                  top:-180px;left:-160px; }
        .mq-o2 { position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;
                  width:460px;height:460px;background:radial-gradient(circle,rgba(248,113,113,0.14),transparent 70%);
                  top:-160px;right:-150px; }
        .mq-o3 { position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none;
                  width:340px;height:340px;background:radial-gradient(circle,rgba(99,102,241,0.12),transparent 70%);
                  bottom:-100px;left:50%;transform:translateX(-50%); }

        /* ─ Header ─ */
        .mcq-hdr {
          position:relative;z-index:10;width:100%;
          display:flex;align-items:center;justify-content:space-between;
          padding:0.75rem 1.5rem;gap:1rem;flex-wrap:wrap;
          background:rgba(8,12,20,0.8);backdrop-filter:blur(14px);
          border-bottom:1px solid rgba(99,102,241,0.18);
        }
        .mcq-scores {
          display:flex;align-items:center;gap:0.9rem;
          font-family:'Press Start 2P',monospace;font-size:0.55rem;
        }
        .mcq-vs { color:#475569; }
        .mcq-timer-wrap { display:flex;flex-direction:column;align-items:center;gap:0.25rem; }
        .mcq-timer-txt {
          font-family:'Press Start 2P',monospace;font-size:1rem;letter-spacing:2px;
        }
        .mcq-bar-bg { width:160px;height:5px;border-radius:5px;background:rgba(255,255,255,0.08);overflow:hidden; }
        .mcq-bar-fill { height:100%;border-radius:5px;transition:width 1s linear,background 0.3s; }
        .mcq-lvl-chip {
          font-family:'Press Start 2P',monospace;font-size:0.46rem;letter-spacing:1px;
          padding:0.3rem 0.85rem;border-radius:9999px;
          border:1.5px solid rgba(167,139,250,0.35);color:#a78bfa;
          background:rgba(139,92,246,0.1);
        }

        /* ─ Arena ─ */
        .mcq-arena {
          position:relative;z-index:5;flex:1;width:100%;
          display:flex;align-items:stretch;justify-content:center;
          gap:0;padding:0.8rem 0.5rem;max-width:1320px;margin:0 auto;
        }

        /* ─ Player panel ─ */
        .mp {
          flex:1;display:flex;flex-direction:column;gap:0.7rem;
          padding:1.2rem;position:relative;max-width:510px;
        }
        .mp-A { border-right:1px solid rgba(56,189,248,0.12); }
        .mp-B { border-left:1px solid rgba(248,113,113,0.12); }

        .mp-header {
          display:flex;align-items:center;gap:0.6rem;
          padding:0.6rem 1rem;border-radius:14px;
          background:rgba(255,255,255,0.04);
          border:1.5px solid;backdrop-filter:blur(8px);
        }
        .mp-emoji { font-size:1.2rem; }
        .mp-name  { font-size:1rem;font-weight:700;flex:1;color:#f1f5f9; }
        .mp-score {
          font-family:'Press Start 2P',monospace;font-size:0.95rem;
          color:#080c14;padding:0.2rem 0.65rem;border-radius:10px;
          font-weight:900;min-width:2rem;text-align:center;
        }

        .mp-topic {
          font-size:0.7rem;font-weight:600;letter-spacing:0.8px;
          padding:0.2rem 0.7rem;border-radius:9999px;
          border:1px solid;background:rgba(255,255,255,0.03);
          display:inline-block;align-self:flex-start;
        }

        .mp-q-card {
          background:rgba(255,255,255,0.05);border-radius:16px;
          padding:1.2rem 1.4rem;border:1.5px solid;
          backdrop-filter:blur(6px);min-height:88px;
          display:flex;align-items:center;justify-content:center;
        }
        .mp-q-text {
          font-size:clamp(1rem,2.4vw,1.3rem);font-weight:600;
          color:#f1f5f9;text-align:center;line-height:1.55;margin:0;
        }

        .mp-opts-grid { display:grid;grid-template-columns:1fr 1fr;gap:0.5rem;flex:1; }
        .mp-opt {
          display:flex;align-items:center;gap:0.6rem;
          padding:0.65rem 0.8rem;border-radius:12px;
          background:rgba(255,255,255,0.05);
          border:1.5px solid rgba(255,255,255,0.1);
          color:#e2e8f0;cursor:pointer;
          transition:all 0.15s;text-align:left;
          font-family:'Space Grotesk',sans-serif;font-size:clamp(0.82rem,1.7vw,0.97rem);font-weight:600;
        }
        .mp-opt:hover:not(:disabled) {
          background:rgba(var(--accent-rgb,56,189,248),0.1);
          border-color:var(--accent,#38bdf8);
          transform:translateY(-1px);
          box-shadow:0 4px 14px var(--glow,rgba(56,189,248,0.2));
        }
        .mp-opt:disabled { opacity:0.55;cursor:not-allowed; }
        .mp-opt.opt-correct { background:rgba(74,222,128,0.18)!important;border-color:#4ade80!important;box-shadow:0 0 16px rgba(74,222,128,0.35); }
        .mp-opt.opt-reveal  { background:rgba(74,222,128,0.1)!important;border-color:#4ade80!important; }
        .opt-lbl {
          font-family:'Press Start 2P',monospace;font-size:0.46rem;
          color:#080c14;width:22px;height:22px;border-radius:7px;
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;font-weight:900;
        }
        .opt-txt { flex:1; }

        .mp-feedback {
          position:absolute;inset:0;border-radius:16px;
          display:flex;align-items:center;justify-content:center;
          font-family:'Press Start 2P',monospace;
          font-size:clamp(0.85rem,1.8vw,1.2rem);
          pointer-events:none;z-index:20;backdrop-filter:blur(5px);
        }
        .mp-feedback.correct { background:rgba(74,222,128,0.25);color:#86efac;border:2px solid #4ade80;box-shadow:0 0 28px rgba(74,222,128,0.45); }
        .mp-feedback.wrong   { background:rgba(248,113,113,0.25);color:#fca5a5;border:2px solid #f87171;box-shadow:0 0 28px rgba(248,113,113,0.45); }

        /* Divider */
        .mcq-divider {
          width:1px;background:linear-gradient(to bottom,transparent,rgba(99,102,241,0.3),transparent);
          flex-shrink:0;align-self:stretch;margin:1rem 0;
        }

        @media(max-width:700px) {
          .mcq-arena { flex-direction:column; }
          .mp-A,.mp-B { border:none;border-bottom:1px solid rgba(255,255,255,0.07); }
          .mcq-divider { display:none; }
        }
      `}</style>

      <div className="mcq-page">
        <div className="mq-o1"/><div className="mq-o2"/><div className="mq-o3"/>

        {/* Header */}
        <div className="mcq-hdr">
          <div className="mcq-scores">
            <span style={{ color:'#38bdf8' }}>🔵 {teamAName}: <strong>{teamAScore}</strong></span>
            <span className="mcq-vs">VS</span>
            <span style={{ color:'#f87171' }}>🔴 {teamBName}: <strong>{teamBScore}</strong></span>
          </div>

          <div className="mcq-timer-wrap">
            <motion.span className="mcq-timer-txt" style={{ color: timerCol }}
              animate={timeLeft <= 10 ? { opacity:[1,0.35,1] } : { opacity:1 }}
              transition={{ duration:0.5, repeat:timeLeft<=10?Infinity:0 }}
            >
              ⏱ {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}
            </motion.span>
            <div className="mcq-bar-bg">
              <div className="mcq-bar-fill" style={{ width:`${timePct}%`, background:timerCol }}/>
            </div>
          </div>

          <span className="mcq-lvl-chip">📚 {levelLabel}</span>
        </div>

        {/* Arena */}
        <div className="mcq-arena">
          <PlayerPanel side="A" teamName={teamAName} score={teamAScore}
            question={questionA} feedback={feedbackA} locked={!!feedbackA} onAnswer={answerA} />
          <div className="mcq-divider"/>
          <PlayerPanel side="B" teamName={teamBName} score={teamBScore}
            question={questionB} feedback={feedbackB} locked={!!feedbackB} onAnswer={answerB} />
        </div>
      </div>
    </>
  );
}
