import { useState, useEffect, useCallback } from 'react';
import { getRandomMCQ } from '../data/mcqQuestions';

export function useMCQLogic(initialTime = 60, level = 'class11') {
  const [timeLeft, setTimeLeft]     = useState(initialTime);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [questionA, setQuestionA]   = useState(() => getRandomMCQ(level));
  const [questionB, setQuestionB]   = useState(() => getRandomMCQ(level));
  const [feedbackA, setFeedbackA]   = useState(null); // 'correct' | 'wrong' | null
  const [feedbackB, setFeedbackB]   = useState(null);
  const [lockedA, setLockedA]       = useState(false);
  const [lockedB, setLockedB]       = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const t = setTimeout(() => setTimeLeft(s => s - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  const answerA = useCallback((optIdx) => {
    if (isGameOver || lockedA) return;
    setLockedA(true);
    const correct = optIdx === questionA.ans;
    setFeedbackA(correct ? 'correct' : 'wrong');
    if (correct) setTeamAScore(s => s + 1);
    setTimeout(() => {
      setFeedbackA(null);
      setQuestionA(getRandomMCQ(level));
      setLockedA(false);
    }, 900);
  }, [isGameOver, lockedA, questionA, level]);

  const answerB = useCallback((optIdx) => {
    if (isGameOver || lockedB) return;
    setLockedB(true);
    const correct = optIdx === questionB.ans;
    setFeedbackB(correct ? 'correct' : 'wrong');
    if (correct) setTeamBScore(s => s + 1);
    setTimeout(() => {
      setFeedbackB(null);
      setQuestionB(getRandomMCQ(level));
      setLockedB(false);
    }, 900);
  }, [isGameOver, lockedB, questionB, level]);

  const winner = isGameOver
    ? teamAScore > teamBScore ? 'Team A'
    : teamBScore > teamAScore ? 'Team B'
    : 'Tie'
    : null;

  return {
    timeLeft, teamAScore, teamBScore,
    questionA, questionB,
    feedbackA, feedbackB,
    answerA, answerB,
    isGameOver, winner,
  };
}
