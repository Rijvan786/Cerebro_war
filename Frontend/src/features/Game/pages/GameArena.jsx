import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import Numpad from '../components/Numpad';
import TugOfWarBoard from '../components/TugOfWarBoard';
import { useGameLogic, LEVEL_LABELS } from '../hooks/useGameLogic';
import Loader from '../../../App/Loader';
import { useSelector } from 'react-redux';




export default function GameArena() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const teamAName  = location.state?.teamA      || 'Team A';
  const teamBName  = location.state?.teamB      || 'Team B';
  const gameTime   = location.state?.time       || 60;
  const difficulty = location.state?.difficulty || 'class5';
  const levelLabel = LEVEL_LABELS[difficulty]   || 'Class 5';

  const {
    timeLeft, ropePosition,
    teamAScore, teamBScore,
    problemA, problemB,
    submitAnswer, isGameOver, winner,
  } = useGameLogic(gameTime, difficulty);
  const Loading=useSelector(state=>state.auth.Loading)

  React.useEffect(() => {
    if (isGameOver) {
      const t = setTimeout(() => navigate('/gameover', {
        state: { winner, teamAScore, teamBScore, teamAName, teamBName },
      }), 800);
      return () => clearTimeout(t);
    }
  }, [isGameOver, winner, teamAScore, teamBScore, teamAName, teamBName, navigate]);
if(Loading){
  return (<Loader/>)
}
  return (
    <>
      <style>{`
        .arena-page {
          width: 100vw; height: 100vh;
          display: flex; flex-direction: row;
          overflow: hidden; position: relative;
          background: linear-gradient(135deg, #080c14 0%, #0f1628 55%, #080c14 100%);
          font-family: 'Outfit', sans-serif;
        }
        /* Grid mesh */
        .arena-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px);
          background-size: 48px 48px; pointer-events: none; z-index: 0;
        }
        .arena-side-a, .arena-side-b {
          flex: 0 0 340px;
          display: flex; align-items: stretch; justify-content: center;
          position: relative; z-index: 2;
        }
        .arena-side-a { border-right: 1px solid rgba(56,189,248,0.15); }
        .arena-side-b { border-left:  1px solid rgba(248,113,113,0.15); }
        .arena-center {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          position: relative; z-index: 2; overflow: hidden;
        }
        @media (max-width: 900px) {
          .arena-page { flex-direction: column; }
          .arena-side-a, .arena-side-b { flex: 0 0 auto; width: 100%; height: 45vh; border: none; border-bottom: 1px solid rgba(99,102,241,0.12); }
          .arena-center { height: auto; width: 100%; padding: 0.5rem; }
        }
      `}</style>

      <div className="arena-page">
        <div className="arena-side-a">
          <Numpad team="A" teamName={teamAName} problem={problemA} onSubmit={ans => submitAnswer('A', ans)} />
        </div>
        <div className="arena-center">
          <TugOfWarBoard
            ropePosition={ropePosition}
            teamAName={teamAName} teamBName={teamBName}
            teamAScore={teamAScore} teamBScore={teamBScore}
            timeLeft={timeLeft} levelLabel={levelLabel}
          />
        </div>
        <div className="arena-side-b">
          <Numpad team="B" teamName={teamBName} problem={problemB} onSubmit={ans => submitAnswer('B', ans)} />
        </div>
      </div>
    </>
  );
}
