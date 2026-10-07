import React, { useState } from 'react';
import { motion } from 'framer-motion';


export default function Numpad({ team, problem, onSubmit, teamName }) {
  const [inputVal,  setInputVal]  = useState('');
  const [isWrong,   setIsWrong]   = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isTeamA   = team === 'A';
  const accent    = isTeamA ? '#38bdf8' : '#f87171';
  const accentDim = isTeamA ? 'rgba(56,189,248,0.18)'  : 'rgba(248,113,113,0.18)';
  const glowCol   = isTeamA ? 'rgba(56,189,248,0.35)'  : 'rgba(248,113,113,0.35)';
  const gradient  = isTeamA
    ? 'linear-gradient(135deg,#0369a1,#38bdf8)'
    : 'linear-gradient(135deg,#991b1b,#f87171)';

  const handleKey = (val) => {
    if (val === 'C')  { setInputVal(''); return; }
    if (val === '←')  { setInputVal(p => p.slice(0,-1)); return; }
    if (inputVal.length < 6) setInputVal(p => p + val);
  };

  const handleSubmit = () => {
    if (!inputVal) return;
    const correct = onSubmit(inputVal);
    if (correct) {
      setIsCorrect(true); setInputVal('');
      setTimeout(() => setIsCorrect(false), 500);
    } else {
      setIsWrong(true);  setInputVal('');
      setTimeout(() => setIsWrong(false), 500);
    }
  };

  const buttons = ['7','8','9','4','5','6','1','2','3','←','0','GO'];
  const feedColor = isWrong ? '#f87171' : isCorrect ? '#4ade80' : accent;

  return (
    <>
      <style>{`
        .np-wrap {
          display: flex; flex-direction: column;
          height: 100%; width: 100%;
          padding: 1rem 0.9rem;
        }
        .np-panel {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(18px);
          border-radius: 22px; padding: 1.2rem;
          border: 1px solid rgba(99,102,241,0.15);
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          display: flex; flex-direction: column; gap: 0.75rem; height: 100%;
        }

        /* Team title */
        .np-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.52rem, 1.4vw, 0.82rem);
          text-align: center; padding: 0.45rem 0.9rem;
          border-radius: 9999px;
          letter-spacing: 1px;
        }

        /* Question box */
        .np-q-box {
          border-radius: 14px; padding: 0.9rem 0.8rem;
          text-align: center;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .np-q-text {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.9rem, 2vw, 1.3rem);
          display: block; margin-bottom: 0.5rem;
          color: #f1f5f9;
        }
        .np-input {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.1rem, 2.2vw, 1.6rem);
          height: 2.8rem; display: flex;
          align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.1);
          transition: border-color 0.2s, box-shadow 0.2s;
          letter-spacing: 2px;
        }

        /* Numpad grid */
        .np-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 0.45rem; flex: 1;
        }
        .np-btn {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.85rem, 1.8vw, 1.2rem);
          padding: 0.75rem 0; border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: #e2e8f0; cursor: pointer;
          transition: all 0.1s;
          box-shadow: 0 3px 0 rgba(0,0,0,0.35);
        }
        .np-btn:active { transform: translateY(3px); box-shadow: 0 0 0 rgba(0,0,0,0.35); }
        .np-btn:hover:not(.np-go) {
          background: rgba(255,255,255,0.1);
          border-color: rgba(99,102,241,0.35);
        }
        .np-back {
          color: #818cf8; border-color: rgba(99,102,241,0.25);
        }
        .np-go {
          color: #fff; border: none; font-weight: 900;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="np-wrap">
        <div className="np-panel">
          {/* Team title */}
          <div className="np-title"
            style={{ color: accent, background: accentDim, border: `1.5px solid ${accent}40` }}
          >
            {isTeamA ? '🔵' : '🔴'} {teamName || `Team ${team}`}
          </div>

          {/* Question + input */}
          <motion.div className="np-q-box"
            animate={
              isWrong   ? { x:[-7,7,-7,7,0], borderColor:'#f87171' } :
              isCorrect ? { scale:[1,1.04,1], borderColor:'#4ade80' } :
              {}
            }
            transition={{ duration:0.32 }}
            style={{
              borderColor: isWrong ? '#f87171' : isCorrect ? '#4ade80' : `${accent}55`,
              boxShadow:   isWrong ? `0 0 18px rgba(248,113,113,0.35)` :
                           isCorrect ? `0 0 18px rgba(74,222,128,0.35)` :
                           `0 0 14px ${glowCol}`,
            }}
          >
            <span className="np-q-text" style={{ color: feedColor }}>
              {problem.question} = ?
            </span>
            <div className="np-input"
              style={{
                color: feedColor,
                borderColor: isWrong ? '#f87171' : isCorrect ? '#4ade80' : `${accent}55`,
                boxShadow: `0 0 8px ${isWrong ? 'rgba(248,113,113,0.25)' : isCorrect ? 'rgba(74,222,128,0.25)' : glowCol}`,
              }}
            >
              {inputVal || '▮'}
            </div>
          </motion.div>

          {/* Grid */}
          <div className="np-grid">
            {buttons.map(btn => {
              const isGo   = btn === 'GO';
              const isBack = btn === '←';
              return (
                <motion.button key={btn}
                  className={`np-btn${isGo?' np-go':''}${isBack?' np-back':''}`}
                  style={isGo ? { background: gradient, boxShadow:`0 4px 0 rgba(0,0,0,0.4), 0 0 16px ${glowCol}` } : {}}
                  whileHover={{ scale:1.04 }}
                  whileTap={{ scale:0.93, y:2 }}
                  onClick={() => isGo ? handleSubmit() : handleKey(btn)}
                >
                  {btn}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
