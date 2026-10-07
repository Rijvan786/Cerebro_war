import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';



const MCQ_LEVELS = new Set(['class11','class12','btech','medical']);

const SYMBOLS = ['+','−','×','÷','√','π','∞','Σ'];
const floats = SYMBOLS.map((s, i) => ({
  s,
  left: `${8 + ((i * 41 + 13) % 84)}%`,
  top:  `${5 + ((i * 57 + 9)  % 88)}%`,
  dur:  8 + (i % 4) * 2.5,
  del:  i * 0.6,
  size: `${1.3 + (i % 3) * 0.6}rem`,
  rot:  (i % 2 === 0 ? 1 : -1) * (25 + i * 12),
  hue:  220 + i * 20,
}));

const EDU_LEVELS = [
  { id:'primary',   emoji:'🏫', label:'Primary',      sub:'Class 1 – 5',     classes:['class1','class2','class3','class4','class5'],  classLabels:['Class 1','Class 2','Class 3','Class 4','Class 5'] },
  { id:'middle',    emoji:'📚', label:'Middle',        sub:'Class 6 – 8',     classes:['class6','class7','class8'],                    classLabels:['Class 6','Class 7','Class 8'] },
  { id:'secondary', emoji:'🎓', label:'Secondary',     sub:'Class 9 – 10',    classes:['class9','class10'],                            classLabels:['Class 9','Class 10'] },
  { id:'higher',    emoji:'🏛️', label:'Higher Sec',    sub:'Class 11 – 12',   classes:['class11','class12'],                           classLabels:['Class 11','Class 12'] },
  { id:'college',   emoji:'🔬', label:'College',       sub:'B.Tech / Medical', classes:['btech','medical'],                            classLabels:['B.Tech','Medical'] },
];

export default function GameSetup() {
  const navigate = useNavigate();
  const [teamA, setTeamA]       = useState('Team A');
  const [teamB, setTeamB]       = useState('Team B');
  const [time, setTime]         = useState(60);
  const [eduLevel, setEduLevel] = useState(null);
  const [level, setLevel]       = useState('class5');

  const selectedEdu = EDU_LEVELS.find(e => e.id === eduLevel);
  const isMCQ       = MCQ_LEVELS.has(level);

  return (
    <>
      <style>{`
        .setup-page {
          position: relative; width: 100%; min-height: 100vh;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; padding: 2rem 0;
        }
        .setup-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }

        /* Orbs */
        .so-1 { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none;
                 width:550px; height:550px; background:radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%);
                 top:-200px; left:-180px; }
        .so-2 { position:absolute; border-radius:50%; filter:blur(90px); pointer-events:none;
                 width:450px; height:450px; background:radial-gradient(circle,rgba(139,92,246,0.15),transparent 70%);
                 bottom:-160px; right:-160px; }

        .setup-float { position:absolute; pointer-events:none; font-family:'Press Start 2P',monospace;
                        font-weight:700; opacity:0.08; text-shadow:0 0 10px currentColor; user-select:none; }

        /* Container */
        .setup-wrap {
          position: relative; z-index: 10;
          width: min(700px, 94vw); padding: 0 0 1rem;
          text-align: center;
        }

        /* Header */
        .setup-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          padding: 0.35rem 1rem; border-radius: 9999px;
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.25);
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.5px;
          color: #818cf8; margin-bottom: 1.2rem;
        }
        .setup-title {
          font-family: 'Press Start 2P', monospace;
          font-size: clamp(1.2rem, 4vw, 2.2rem);
          letter-spacing: 2px; margin-bottom: 0.6rem;
          background: linear-gradient(135deg, #e0e7ff, #818cf8, #c4b5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .setup-sub {
          font-size: 0.88rem; color: #475569; margin-bottom: 2rem;
        }

        /* Panel */
        .setup-panel {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(99,102,241,0.18);
          border-radius: 24px; padding: 1.8rem; margin-bottom: 1.2rem;
          text-align: left;
        }
        .s-label {
          font-family: 'Press Start 2P', monospace; font-size: 0.52rem;
          letter-spacing: 1px; color: #818cf8; display: block; margin-bottom: 0.6rem;
        }
        .s-input {
          width: 100%; padding: 0.8rem 1.1rem; border-radius: 12px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(99,102,241,0.2);
          color: #f1f5f9; font-family: 'Outfit', sans-serif; font-size: 1rem;
          outline: none; margin-bottom: 1.2rem; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .s-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
        .s-input::placeholder { color: #334155; }

        .teams-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .label-a { color: #38bdf8; }
        .label-b { color: #f87171; }

        /* Time buttons */
        .time-row { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.3rem; }
        .time-btn {
          font-family: 'Press Start 2P', monospace; font-size: 0.55rem;
          padding: 0.55rem 1rem; border-radius: 9999px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(99,102,241,0.2);
          color: #94a3b8; cursor: pointer; transition: all 0.15s; flex: 1;
        }
        .time-btn.active {
          background: rgba(99,102,241,0.2); border-color: #6366f1;
          color: #e0e7ff; box-shadow: 0 0 14px rgba(99,102,241,0.3);
        }
        .time-btn:hover:not(.active) { border-color: #6366f1; color: #c7d2fe; }

        /* Education level grid */
        .edu-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 0.5rem; margin-bottom: 0.8rem; }
        @media(max-width:600px){ .edu-grid { grid-template-columns: repeat(3,1fr); } }

        .edu-card {
          display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
          padding: 0.7rem 0.3rem; border-radius: 14px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(99,102,241,0.15);
          cursor: pointer; transition: all 0.18s; text-align: center;
        }
        .edu-card:hover { background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.4); transform: translateY(-2px); }
        .edu-card.active {
          background: rgba(99,102,241,0.18); border-color: #6366f1;
          box-shadow: 0 0 18px rgba(99,102,241,0.3);
        }
        .edu-emoji { font-size: 1.5rem; }
        .edu-label {
          font-family: 'Press Start 2P', monospace; font-size: 0.38rem;
          color: #94a3b8; line-height: 1.4;
        }
        .edu-card.active .edu-label { color: #c7d2fe; }
        .edu-sub {
          font-family: 'Press Start 2P', monospace; font-size: 0.32rem;
          color: #475569;
        }
        .edu-card.active .edu-sub { color: #818cf8; }

        /* Class buttons */
        .class-row { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.3rem; }
        .class-btn {
          font-family: 'Press Start 2P', monospace; font-size: 0.48rem;
          padding: 0.45rem 0.9rem; border-radius: 9999px;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(99,102,241,0.18);
          color: #94a3b8; cursor: pointer; transition: all 0.15s;
        }
        .class-btn.active {
          background: rgba(99,102,241,0.2); border-color: #6366f1;
          color: #e0e7ff; box-shadow: 0 0 12px rgba(99,102,241,0.25);
        }
        .class-btn:hover:not(.active) { border-color: #6366f1; color: #c7d2fe; }

        .level-badge {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-top: 0.7rem; padding: 0.35rem 0.9rem; border-radius: 9999px;
          background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2);
          font-family: 'Press Start 2P', monospace; font-size: 0.42rem;
          color: #818cf8;
        }
        .mcq-chip {
          background: rgba(139,92,246,0.15); border: 1px solid rgba(167,139,250,0.3);
          color: #a78bfa; padding: 0.2rem 0.6rem; border-radius: 9999px;
          font-size: 0.38rem;
        }

        /* Action buttons */
        .setup-actions { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; }
        .btn-go {
          font-family: 'Press Start 2P', monospace; font-size: 0.8rem; letter-spacing: 1.5px;
          padding: 1rem 2.8rem; border-radius: 9999px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 8px 28px rgba(99,102,241,0.45);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-go:hover  { transform: translateY(-3px); box-shadow: 0 14px 36px rgba(99,102,241,0.55); }
        .btn-go:active { transform: translateY(1px);  box-shadow: 0 4px 12px rgba(99,102,241,0.3); }

        .btn-back {
          font-family: 'Press Start 2P', monospace; font-size: 0.52rem;
          padding: 0.6rem 1.4rem; border-radius: 9999px;
          background: transparent;
          border: 1.5px solid rgba(99,102,241,0.2);
          color: #64748b; cursor: pointer; transition: all 0.2s;
        }
        .btn-back:hover { border-color: #6366f1; color: #818cf8; }
      `}</style>

      <div className="setup-page">
        <div className="so-1"/><div className="so-2"/>

        {floats.map((f,i) => (
          <motion.span key={i} className="setup-float"
            style={{ left:f.left, top:f.top, fontSize:f.size, color:`hsl(${f.hue},80%,70%)` }}
            animate={{ y:[0,-28,0,28,0], x:[0,12,-10,5,0], rotate:[0,f.rot,0], opacity:[0.05,0.12,0.05] }}
            transition={{ duration:f.dur, delay:f.del, repeat:Infinity, repeatType:'mirror', ease:'easeInOut' }}
          >{f.s}</motion.span>
        ))}

        <div className="setup-wrap">
          <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
            <span className="setup-eyebrow">⚙️ Configure Your Battle</span>
            <h1 className="setup-title">GAME SETUP</h1>
            <p className="setup-sub">Choose your teams, time, and level to begin</p>
          </motion.div>

          <motion.div className="setup-panel" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2, duration:0.5 }}>
            {/* Teams */}
            <div className="teams-row">
              <div>
                <span className="s-label label-a">🔵 LEFT TEAM</span>
                <input className="s-input" value={teamA} onChange={e=>setTeamA(e.target.value)} maxLength={12} placeholder="Team A"/>
              </div>
              <div>
                <span className="s-label label-b">🔴 RIGHT TEAM</span>
                <input className="s-input" value={teamB} onChange={e=>setTeamB(e.target.value)} maxLength={12} placeholder="Team B"/>
              </div>
            </div>

            {/* Time */}
            <span className="s-label">⏱ GAME DURATION</span>
            <div className="time-row">
              {[30,60,90,120].map(t => (
                <button key={t} className={`time-btn${time===t?' active':''}`} onClick={()=>setTime(t)}>{t}s</button>
              ))}
            </div>
          </motion.div>

          {/* Level */}
          <motion.div className="setup-panel" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3, duration:0.5 }}>
            <span className="s-label">🎓 EDUCATION LEVEL</span>
            <div className="edu-grid">
              {EDU_LEVELS.map(edu => (
                <motion.button key={edu.id} className={`edu-card${eduLevel===edu.id?' active':''}`}
                  onClick={()=>{ setEduLevel(edu.id); setLevel(edu.classes[0]); }}
                  whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                >
                  <span className="edu-emoji">{edu.emoji}</span>
                  <span className="edu-label">{edu.label}</span>
                  <span className="edu-sub">{edu.sub}</span>
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selectedEdu && (
                <motion.div key={selectedEdu.id}
                  initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                  transition={{ duration:0.25 }} style={{ overflow:'hidden' }}
                >
                  <span className="s-label" style={{ marginTop:'0.8rem' }}>📌 SELECT CLASS / STREAM</span>
                  <div className="class-row">
                    {selectedEdu.classes.map((cls,i) => (
                      <motion.button key={cls} className={`class-btn${level===cls?' active':''}`}
                        onClick={()=>setLevel(cls)} whileTap={{ scale:0.94 }}
                      >
                        {selectedEdu.classLabels[i]}
                      </motion.button>
                    ))}
                  </div>
                  <div className="level-badge">
                    ✅ {selectedEdu.classLabels[selectedEdu.classes.indexOf(level)] || selectedEdu.classLabels[0]}
                    {isMCQ && <span className="mcq-chip">🧠 MCQ MODE</span>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Actions */}
          <motion.div className="setup-actions" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45, type:'spring', stiffness:180 }}>
            <motion.button className="btn-go" whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={() => {
                const route = MCQ_LEVELS.has(level) ? '/mcq-play' : '/play';
                navigate(route, { state:{ teamA, teamB, time, difficulty:level } });
              }}
            >
              {isMCQ ? '🧠 START MCQ BATTLE' : '▶ BATTLE START ◀'}
            </motion.button>
            <button className="btn-back" onClick={()=>navigate('/')}>← BACK TO HOME</button>
          </motion.div>
        </div>
      </div>
    </>
  );
}
