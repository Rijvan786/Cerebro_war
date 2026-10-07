import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { INTEGRATION_BANK } from '../data/integrationQuestions';



const LEVEL_TABS = [
  { key: 'class12', label: '📘 Class 12' },
  { key: 'btech',   label: '🎓 B.Tech'   },
];

export default function IntegrationSheet() {
  const navigate = useNavigate();
  const [level, setLevel]       = useState('class12');
  const [revealed, setRevealed] = useState({});

  const questions = INTEGRATION_BANK[level] || [];
  const toggle    = (key) => setRevealed(prev => ({ ...prev, [key]: !prev[key] }));

  // Group by topic
  const grouped = questions.reduce((acc, q, i) => {
    if (!acc[q.topic]) acc[q.topic] = [];
    acc[q.topic].push({ ...q, _idx: i });
    return acc;
  }, {});

  return (
    <>
      <style>{`
        .int-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
          font-family: 'Outfit', 'Space Grotesk', sans-serif;
          color: #f1f5f9;
          padding-bottom: 4rem; position: relative; overflow: hidden;
        }
        /* Grid mesh */
        .int-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none;
        }
        /* Orbs */
        .io-1 { position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;
                 width:550px;height:550px;background:radial-gradient(circle,rgba(99,102,241,0.18),transparent 70%);
                 top:-200px;left:-180px; }
        .io-2 { position:absolute;border-radius:50%;filter:blur(90px);pointer-events:none;
                 width:450px;height:450px;background:radial-gradient(circle,rgba(139,92,246,0.14),transparent 70%);
                 bottom:-150px;right:-150px; }

        /* ─ Header ─ */
        .int-hdr {
          position: sticky; top: 0; z-index: 50;
          background: rgba(8,12,20,0.88); backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(99,102,241,0.18);
          padding: 0.85rem 1.5rem;
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .int-back {
          padding: 0.45rem 1.1rem; border-radius: 9999px;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(99,102,241,0.22);
          color: #818cf8; font-size: 0.85rem; font-weight: 600;
          cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;
        }
        .int-back:hover { background: rgba(99,102,241,0.12); border-color: #6366f1; color: #c7d2fe; }
        .int-hdr-title {
          flex: 1; font-family: 'Press Start 2P', monospace;
          font-size: clamp(0.5rem, 2vw, 0.8rem); letter-spacing: 1.5px;
          background: linear-gradient(135deg, #e0e7ff, #818cf8, #c4b5fd);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .int-hdr-badge {
          font-size: 0.75rem; font-weight: 700;
          padding: 0.3rem 0.9rem; border-radius: 9999px;
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(167,139,250,0.3);
          color: #a78bfa;
        }

        /* ─ Info banner ─ */
        .int-banner {
          position: relative; z-index: 10;
          margin: 1.5rem auto; width: min(860px, 94vw);
          padding: 0.9rem 1.4rem; border-radius: 14px;
          background: rgba(251,191,36,0.07);
          border: 1px solid rgba(251,191,36,0.2);
          color: #fde68a; font-size: 0.9rem; font-weight: 500;
          display: flex; align-items: center; gap: 0.6rem;
        }

        /* ─ Tabs ─ */
        .int-tabs {
          position: relative; z-index: 10;
          display: flex; gap: 0.6rem;
          padding: 0 1rem 0.5rem;
          width: min(860px, 94vw); margin: 0 auto;
        }
        .int-tab {
          padding: 0.5rem 1.4rem; border-radius: 9999px;
          font-size: 0.95rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s;
          background: rgba(255,255,255,0.04);
          border: 1.5px solid rgba(99,102,241,0.15);
          color: #64748b; font-family: 'Outfit', sans-serif;
        }
        .int-tab.active {
          background: rgba(99,102,241,0.18); border-color: #6366f1;
          color: #c7d2fe; box-shadow: 0 0 16px rgba(99,102,241,0.25);
        }
        .int-tab:hover:not(.active) { border-color: #6366f1; color: #94a3b8; }

        /* ─ Content ─ */
        .int-content {
          position: relative; z-index: 10;
          width: min(860px, 94vw); margin: 1rem auto 0; padding: 0 0.5rem;
        }

        .int-section { margin-bottom: 2.2rem; }
        .int-section-title {
          font-size: 1rem; font-weight: 700; letter-spacing: 0.5px;
          color: #818cf8; margin-bottom: 1rem;
          padding-left: 0.9rem;
          border-left: 3px solid #6366f1;
        }

        /* ─ Card ─ */
        .int-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 18px; padding: 1.3rem 1.6rem;
          margin-bottom: 0.8rem; position: relative; overflow: hidden;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .int-card:hover {
          border-color: rgba(99,102,241,0.35);
          box-shadow: 0 4px 22px rgba(99,102,241,0.12);
        }
        .int-card-num {
          position: absolute; top: 1rem; right: 1.3rem;
          font-family: 'Press Start 2P', monospace; font-size: 0.42rem;
          color: rgba(99,102,241,0.3);
        }
        .int-q {
          font-size: clamp(1.05rem, 2.5vw, 1.25rem); font-weight: 600;
          color: #f1f5f9; margin-bottom: 1rem; line-height: 1.55;
        }

        .int-btn-row { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .int-hint-btn, .int-ans-btn {
          padding: 0.4rem 1.1rem; border-radius: 9999px;
          font-size: 0.88rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s; font-family: 'Outfit', sans-serif;
        }
        .int-hint-btn {
          background: rgba(251,191,36,0.08);
          border: 1.5px solid rgba(251,191,36,0.3); color: #fbbf24;
        }
        .int-hint-btn:hover { background: rgba(251,191,36,0.16); border-color: #fbbf24; box-shadow: 0 0 12px rgba(251,191,36,0.2); }
        .int-ans-btn {
          background: rgba(74,222,128,0.08);
          border: 1.5px solid rgba(74,222,128,0.3); color: #4ade80;
        }
        .int-ans-btn:hover { background: rgba(74,222,128,0.16); border-color: #4ade80; box-shadow: 0 0 12px rgba(74,222,128,0.2); }

        .int-hint-box, .int-ans-box {
          margin-top: 0.75rem; padding: 0.8rem 1.1rem; border-radius: 12px;
          font-size: 0.95rem; overflow: hidden;
        }
        .int-hint-box { background: rgba(251,191,36,0.07); border: 1px solid rgba(251,191,36,0.25); color: #fde68a; }
        .int-ans-box  { background: rgba(74,222,128,0.08); border: 1px solid rgba(74,222,128,0.28); color: #86efac; font-weight: 700; font-size: 1.05rem; }

        @media(max-width:600px){
          .int-hdr { padding: 0.8rem 1rem; }
          .int-content { padding: 0 0.3rem; }
          .int-card { padding: 1rem 1.1rem; }
        }
      `}</style>

      <div className="int-page">
        <div className="io-1"/><div className="io-2"/>

        {/* Header */}
        <div className="int-hdr">
          <button className="int-back" onClick={() => navigate(-1)}>← Back</button>
          <span className="int-hdr-title">📐 Integration Question Bank</span>
          <span className="int-hdr-badge">📝 Written Practice</span>
        </div>

        {/* Banner */}
        <div className="int-banner">
          ⚠️ Integration needs written/derivation answers — use as a practice worksheet, not for MCQ game.
        </div>

        {/* Tabs */}
        <div className="int-tabs">
          {LEVEL_TABS.map(t => (
            <button key={t.key} className={`int-tab${level===t.key?' active':''}`}
              onClick={() => { setLevel(t.key); setRevealed({}); }}
            >{t.label}</button>
          ))}
        </div>

        {/* Questions */}
        <div className="int-content">
          {Object.entries(grouped).map(([topic, qs]) => (
            <div className="int-section" key={topic}>
              <div className="int-section-title">📌 {topic}</div>
              {qs.map(item => (
                <motion.div key={item._idx} className="int-card"
                  initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
                  transition={{ delay: item._idx * 0.04 }}
                >
                  <span className="int-card-num">#{item._idx + 1}</span>
                  <p className="int-q">{item.q}</p>
                  <div className="int-btn-row">
                    <button className="int-hint-btn" onClick={() => toggle(`h_${item._idx}`)}>
                      💡 {revealed[`h_${item._idx}`] ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button className="int-ans-btn" onClick={() => toggle(`a_${item._idx}`)}>
                      ✅ {revealed[`a_${item._idx}`] ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {revealed[`h_${item._idx}`] && (
                      <motion.div className="int-hint-box"
                        initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                      >
                        💡 Hint: {item.hint}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <AnimatePresence>
                    {revealed[`a_${item._idx}`] && (
                      <motion.div className="int-ans-box"
                        initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                      >
                        ✅ Answer: {item.ans}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
