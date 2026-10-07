import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BRANCH_LABELS, BRANCH_SUBJECTS, SCHOOL_SUBJECTS, SUBJECT_LABELS,
} from '../data/quizBank';



const LEVELS = [
  { id:'primary',   emoji:'🏫', label:'Primary',      sub:'Class 1–5' },
  { id:'middle',    emoji:'📚', label:'Middle School', sub:'Class 6–8' },
  { id:'secondary', emoji:'🎓', label:'Secondary',     sub:'Class 9–10' },
  { id:'higher',    emoji:'🏛️', label:'Higher Sec',    sub:'Class 11–12' },
  { id:'college',   emoji:'🔬', label:'College',       sub:'B.Tech / Medical' },
];

const BRANCHES = Object.entries(BRANCH_LABELS).map(([id,label]) => ({ id, label }));

const SUBJECT_ICONS = {
  math:'🔢', science:'🔭', english:'📝', physics:'⚡', chemistry:'🧪', biology:'🧬',
  computerScience:'💻', dsa:'🌳', dbms:'🗄️', os:'🖥️', cn:'🌐', oop:'🧩',
  toc:'🤖', ai:'🧠', digitalElectronics:'💡', signals:'📡', communication:'📻',
  microprocessors:'⚙️', thermodynamics:'🔥', fluidMechanics:'💧',
  engineeringMechanics:'⚖️', structuralAnalysis:'🏗️', soilMechanics:'🪨',
  circuitTheory:'🔌', powerSystems:'⚡', controlSystems:'🎛️',
  anatomy:'🫀', physiology:'🩺', pharmacology:'💊', biochemistry:'🧬',
};

const BRANCH_ICONS = { cs:'💻', ece:'📡', me:'⚙️', civil:'🏗️', ee:'⚡', medical:'⚕️' };

const slide = (dir=1) => ({
  initial:{ opacity:0, x:60*dir }, animate:{ opacity:1, x:0 }, exit:{ opacity:0, x:-60*dir },
  transition:{ duration:0.3 },
});

export default function QuizHub() {
  const navigate = useNavigate();
  const [step, setStep]       = useState(0); // 0=level, 1=branch(if college)/subject, 2=subject(college)
  const [level, setLevel]     = useState(null);
  const [branch, setBranch]   = useState(null);
  const [subject, setSubject] = useState(null);
  const [mode, setMode]       = useState('vs'); // 'solo' | 'vs'
  const [teamA, setTeamA]     = useState('Team A');
  const [teamB, setTeamB]     = useState('Team B');
  const [time, setTime]       = useState(60);

  const isCollege = level?.id === 'college';
  const stepCount = isCollege ? 4 : 3; // level,branch,subject,config vs level,subject,config

  const pickLevel = (lv) => { setLevel(lv); setBranch(null); setSubject(null); setStep(1); };
  const pickBranch = (br) => { setBranch(br); setSubject(null); setStep(2); };
  const pickSubject = (s) => { setSubject(s); setStep(isCollege ? 3 : 2); };

  const startGame = () => {
    navigate('/quiz-play', { state: {
      level: level?.id, branch: branch?.id || null,
      subject, mode, teamA, teamB, time,
      levelLabel: level?.label,
      subjectLabel: SUBJECT_LABELS[subject] || subject,
    }});
  };

  const subjectList = isCollege && branch
    ? BRANCH_SUBJECTS[branch.id].map(s => ({ id:s, label: SUBJECT_LABELS[s], icon: SUBJECT_ICONS[s] }))
    : level ? (SCHOOL_SUBJECTS[level.id]||[]).map(s=>({ id:s, label:SUBJECT_LABELS[s], icon:SUBJECT_ICONS[s] })) : [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Press+Start+2P&display=swap');
        .qhub-page {
          min-height:100vh; width:100%;
          background: linear-gradient(135deg,#0a0a1a 0%,#0f1535 40%,#1a0a2e 100%);
          display:flex; flex-direction:column; align-items:center;
          font-family:'Rajdhani',sans-serif; position:relative; overflow:hidden;
        }
        .qhub-page::before {
          content:''; position:absolute; inset:0;
          background-image:
            linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),
            linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px);
          background-size:48px 48px; pointer-events:none;
        }
        .qhub-orb { position:absolute; border-radius:50%; filter:blur(100px); pointer-events:none; }
        .qhub-orb-1 { width:500px;height:500px;background:rgba(99,102,241,0.18);top:-150px;left:-100px; }
        .qhub-orb-2 { width:400px;height:400px;background:rgba(236,72,153,0.12);bottom:-100px;right:-100px; }
        .qhub-orb-3 { width:300px;height:300px;background:rgba(16,185,129,0.1);top:50%;left:50%;transform:translate(-50%,-50%); }
        .qhub-header {
          position:relative; z-index:10; text-align:center; padding:2.5rem 1rem 1rem;
        }
        .qhub-title {
          font-family:'Press Start 2P',monospace; font-size:clamp(1.2rem,4vw,2.2rem);
          color:#fff; text-shadow:0 0 30px rgba(99,102,241,0.8),0 0 60px rgba(99,102,241,0.4);
          margin-bottom:0.5rem; letter-spacing:2px;
        }
        .qhub-sub { font-size:1.1rem; color:#a5b4fc; letter-spacing:2px; }
        /* Progress bar */
        .qhub-progress {
          position:relative; z-index:10;
          display:flex; gap:0.5rem; align-items:center; padding:0.8rem 2rem; justify-content:center;
        }
        .qhub-step-dot {
          width:32px;height:32px;border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-family:'Press Start 2P',monospace;font-size:0.55rem;
          transition:all 0.3s;
        }
        .qhub-step-dot.done  { background:#6366f1;color:#fff;box-shadow:0 0 10px rgba(99,102,241,0.6); }
        .qhub-step-dot.active{ background:linear-gradient(135deg,#6366f1,#ec4899);color:#fff;box-shadow:0 0 18px rgba(99,102,241,0.8); }
        .qhub-step-dot.todo  { background:rgba(255,255,255,0.08);color:#6b7280;border:1px solid rgba(255,255,255,0.1); }
        .qhub-step-line { flex:1;max-width:40px;height:2px;border-radius:2px;background:rgba(99,102,241,0.3); }
        /* Card grid */
        .qhub-body {
          position:relative;z-index:10;
          width:90%;max-width:900px;padding:1rem 0 3rem;
          flex:1;display:flex;flex-direction:column;align-items:center;gap:1rem;
        }
        .qhub-step-title {
          font-family:'Press Start 2P',monospace;font-size:0.65rem;
          color:#a5b4fc;letter-spacing:2px;text-align:center;margin-bottom:0.5rem;
        }
        .qhub-grid { display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:0.8rem;width:100%; }
        .qhub-card {
          display:flex;flex-direction:column;align-items:center;gap:0.4rem;
          padding:1rem 0.6rem;border-radius:16px;cursor:pointer;
          background:rgba(255,255,255,0.04);
          border:1.5px solid rgba(255,255,255,0.08);
          transition:all 0.2s;text-align:center;
        }
        .qhub-card:hover {
          background:rgba(99,102,241,0.15);
          border-color:rgba(99,102,241,0.6);
          transform:translateY(-3px);
          box-shadow:0 8px 24px rgba(99,102,241,0.25);
        }
        .qhub-card.selected {
          background:linear-gradient(135deg,rgba(99,102,241,0.3),rgba(236,72,153,0.2));
          border-color:#6366f1;
          box-shadow:0 0 20px rgba(99,102,241,0.4);
        }
        .qhub-card-icon { font-size:2rem;line-height:1; }
        .qhub-card-label { font-size:0.85rem;font-weight:700;color:#e2e8f0;line-height:1.3; }
        .qhub-card-sub   { font-size:0.7rem;color:#94a3b8; }
        /* Config section */
        .qhub-config { width:100%; display:flex; flex-direction:column; gap:1rem; }
        .qhub-config-panel {
          background:rgba(255,255,255,0.04);border:1.5px solid rgba(99,102,241,0.3);
          border-radius:18px;padding:1.2rem 1.4rem;
        }
        .qhub-config-label {
          font-family:'Press Start 2P',monospace;font-size:0.55rem;
          color:#a5b4fc;display:block;margin-bottom:0.8rem;letter-spacing:1px;
        }
        .qhub-mode-row { display:flex;gap:0.6rem; }
        .qhub-mode-btn {
          flex:1;padding:0.7rem;border-radius:12px;border:1.5px solid rgba(255,255,255,0.1);
          background:rgba(255,255,255,0.05);color:#e2e8f0;font-size:0.95rem;font-weight:700;
          cursor:pointer;transition:all 0.18s;
        }
        .qhub-mode-btn.active {
          background:linear-gradient(135deg,#6366f1,#8b5cf6);
          border-color:#6366f1;box-shadow:0 0 16px rgba(99,102,241,0.4);
        }
        .qhub-input {
          width:100%;padding:0.7rem 1rem;border-radius:10px;
          border:1.5px solid rgba(99,102,241,0.3);
          background:rgba(255,255,255,0.06);color:#f1f5f9;
          font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:600;
          outline:none;transition:border 0.2s;box-sizing:border-box;
        }
        .qhub-input:focus { border-color:#6366f1; }
        .qhub-team-row { display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-top:0.4rem; }
        .qhub-time-row { display:flex;gap:0.4rem;flex-wrap:wrap;margin-top:0.4rem; }
        .qhub-time-btn {
          flex:1;padding:0.5rem 0.8rem;border-radius:20px;font-size:0.85rem;font-weight:700;
          border:1.5px solid rgba(99,102,241,0.3);background:rgba(255,255,255,0.05);
          color:#e2e8f0;cursor:pointer;transition:all 0.15s;
        }
        .qhub-time-btn.active { background:#6366f1;border-color:#6366f1;color:#fff; }
        .qhub-summary {
          background:rgba(99,102,241,0.12);border:1.5px solid rgba(99,102,241,0.4);
          border-radius:14px;padding:0.8rem 1.2rem;
          font-size:0.95rem;color:#a5b4fc;line-height:1.8;
        }
        .qhub-start-btn {
          font-family:'Press Start 2P',monospace;font-size:1rem;
          padding:1rem 2.5rem;border:none;border-radius:50px;cursor:pointer;
          background:linear-gradient(135deg,#6366f1,#ec4899);
          color:#fff;box-shadow:0 8px 30px rgba(99,102,241,0.4);
          transition:all 0.15s;letter-spacing:1px;
        }
        .qhub-start-btn:hover { transform:translateY(-2px);box-shadow:0 12px 40px rgba(99,102,241,0.5); }
        .qhub-start-btn:active { transform:translateY(2px); }
        .qhub-back-btn {
          background:transparent;border:1.5px solid rgba(255,255,255,0.1);
          border-radius:30px;padding:0.5rem 1.2rem;color:#94a3b8;
          cursor:pointer;font-size:0.85rem;font-weight:600;transition:all 0.15s;
        }
        .qhub-back-btn:hover { border-color:rgba(255,255,255,0.3);color:#e2e8f0; }
        .qhub-nav-row { display:flex;gap:1rem;align-items:center;margin-top:0.5rem; }
        @media(max-width:600px){ .qhub-grid{ grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="qhub-page">
        <div className="qhub-orb qhub-orb-1" />
        <div className="qhub-orb qhub-orb-2" />
        <div className="qhub-orb qhub-orb-3" />

        {/* Header */}
        <div className="qhub-header">
          <h1 className="qhub-title">🧠 QUIZ BATTLE</h1>
          <div className="qhub-sub">SELECT YOUR ARENA</div>
        </div>

        {/* Progress */}
        <div className="qhub-progress">
          {['LEVEL', isCollege?'BRANCH':'SUBJECT', isCollege?'SUBJECT':'CONFIG', isCollege?'CONFIG':''].filter(Boolean).map((label,i)=>(
            <React.Fragment key={i}>
              {i>0 && <div className="qhub-step-line" />}
              <div className={`qhub-step-dot ${step>i?'done':step===i?'active':'todo'}`}>{step>i?'✓':i+1}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="qhub-body">
          <AnimatePresence mode="wait">

            {/* STEP 0 — Level */}
            {step===0 && (
              <motion.div key="s0" style={{width:'100%'}} {...slide(1)}>
                <div className="qhub-step-title">🎓 CHOOSE YOUR EDUCATION LEVEL</div>
                <div className="qhub-grid">
                  {LEVELS.map(lv=>(
                    <motion.div key={lv.id} className={`qhub-card${level?.id===lv.id?' selected':''}`}
                      onClick={()=>pickLevel(lv)} whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                      <span className="qhub-card-icon">{lv.emoji}</span>
                      <span className="qhub-card-label">{lv.label}</span>
                      <span className="qhub-card-sub">{lv.sub}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="qhub-nav-row" style={{marginTop:'1.5rem'}}>
                  <button className="qhub-back-btn" onClick={()=>navigate('/')}>← Home</button>
                </div>
              </motion.div>
            )}

            {/* STEP 1 — Branch (college) OR Subject (school) */}
            {step===1 && (
              <motion.div key="s1" style={{width:'100%'}} {...slide(1)}>
                <div className="qhub-step-title">
                  {isCollege ? '🏛️ CHOOSE YOUR BRANCH' : '📚 CHOOSE SUBJECT'}
                </div>
                <div className="qhub-grid">
                  {isCollege
                    ? BRANCHES.map(br=>(
                        <motion.div key={br.id} className={`qhub-card${branch?.id===br.id?' selected':''}`}
                          onClick={()=>pickBranch(br)} whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                          <span className="qhub-card-icon">{BRANCH_ICONS[br.id]||'📘'}</span>
                          <span className="qhub-card-label">{br.label}</span>
                        </motion.div>
                      ))
                    : subjectList.map(s=>(
                        <motion.div key={s.id} className={`qhub-card${subject===s.id?' selected':''}`}
                          onClick={()=>pickSubject(s.id)} whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                          <span className="qhub-card-icon">{s.icon||'📖'}</span>
                          <span className="qhub-card-label">{s.label}</span>
                        </motion.div>
                      ))
                  }
                </div>
                <div className="qhub-nav-row">
                  <button className="qhub-back-btn" onClick={()=>setStep(0)}>← Back</button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Subject (college only) */}
            {step===2 && isCollege && (
              <motion.div key="s2" style={{width:'100%'}} {...slide(1)}>
                <div className="qhub-step-title">📖 CHOOSE SUBJECT</div>
                <div className="qhub-grid">
                  {subjectList.map(s=>(
                    <motion.div key={s.id} className={`qhub-card${subject===s.id?' selected':''}`}
                      onClick={()=>pickSubject(s.id)} whileHover={{scale:1.03}} whileTap={{scale:0.97}}>
                      <span className="qhub-card-icon">{s.icon||'📖'}</span>
                      <span className="qhub-card-label">{s.label}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="qhub-nav-row">
                  <button className="qhub-back-btn" onClick={()=>setStep(1)}>← Back</button>
                </div>
              </motion.div>
            )}

            {/* FINAL STEP — Config */}
            {((step===2 && !isCollege)||(step===3 && isCollege)) && (
              <motion.div key="cfg" style={{width:'100%'}} {...slide(1)}>
                <div className="qhub-step-title">⚙️ CONFIGURE YOUR GAME</div>
                <div className="qhub-config">
                  {/* Summary */}
                  <div className="qhub-summary">
                    🎓 {level?.label} &nbsp;
                    {branch ? `• 🏛️ ${BRANCH_LABELS[branch.id]}` : ''} &nbsp;
                    • 📖 {SUBJECT_LABELS[subject]||subject}
                  </div>

                  {/* Mode */}
                  <div className="qhub-config-panel">
                    <span className="qhub-config-label">🎮 GAME MODE</span>
                    <div className="qhub-mode-row">
                      <button className={`qhub-mode-btn${mode==='solo'?' active':''}`} onClick={()=>setMode('solo')}>
                        🧑 Solo Practice
                      </button>
                      <button className={`qhub-mode-btn${mode==='vs'?' active':''}`} onClick={()=>setMode('vs')}>
                        ⚔️ 2-Player VS
                      </button>
                    </div>
                  </div>

                  {/* Team names (VS only) */}
                  {mode==='vs' && (
                    <div className="qhub-config-panel">
                      <span className="qhub-config-label">👥 PLAYER NAMES</span>
                      <div className="qhub-team-row">
                        <input className="qhub-input" value={teamA} onChange={e=>setTeamA(e.target.value)} maxLength={12} placeholder="Player 1" />
                        <input className="qhub-input" value={teamB} onChange={e=>setTeamB(e.target.value)} maxLength={12} placeholder="Player 2" />
                      </div>
                    </div>
                  )}

                  {/* Timer */}
                  <div className="qhub-config-panel">
                    <span className="qhub-config-label">⏱ GAME TIME</span>
                    <div className="qhub-time-row">
                      {[30,60,90,120].map(t=>(
                        <button key={t} className={`qhub-time-btn${time===t?' active':''}`} onClick={()=>setTime(t)}>{t}s</button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="qhub-nav-row" style={{marginTop:'1rem',justifyContent:'center'}}>
                  <button className="qhub-back-btn" onClick={()=>setStep(isCollege?2:1)}>← Back</button>
                  <motion.button className="qhub-start-btn" whileHover={{scale:1.04}} whileTap={{scale:0.97}} onClick={startGame}>
                    🚀 START QUIZ
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
