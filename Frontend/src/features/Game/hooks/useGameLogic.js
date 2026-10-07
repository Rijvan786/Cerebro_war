import { useState, useEffect, useCallback } from 'react';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
function gcd(a, b) { return b === 0 ? Math.abs(a) : gcd(b, a % b); }
function lcmOf(a, b) { return Math.abs(a * b) / gcd(a, b); }

const TRIG = [
  { q: 'sin 0°', a: '0' }, { q: 'sin 30°', a: '0.5' }, { q: 'sin 90°', a: '1' },
  { q: 'cos 0°', a: '1' }, { q: 'cos 60°', a: '0.5' }, { q: 'cos 90°', a: '0' },
  { q: 'tan 0°', a: '0' }, { q: 'tan 45°', a: '1' },
];
const LOGS = [
  { q: 'log₁₀ 10', a: '1' }, { q: 'log₁₀ 100', a: '2' }, { q: 'log₁₀ 1000', a: '3' },
  { q: 'log₁₀ 1', a: '0' }, { q: 'log₂ 4', a: '2' }, { q: 'log₂ 8', a: '3' },
  { q: 'log₂ 16', a: '4' }, { q: 'log₃ 9', a: '2' }, { q: 'log₃ 27', a: '3' },
];
const PYTH = [[3,4,5],[5,12,13],[8,15,17],[7,24,25]];

function generateProblem(level = 'class5') {
  switch (level) {

    case 'class1': {
      const a = rand(1,9), b = rand(1,9);
      if (Math.random() > 0.5) return { question:`${a} + ${b} = ?`, answer:`${a+b}` };
      const [big,sm] = [Math.max(a,b), Math.min(a,b)];
      return { question:`${big} − ${sm} = ?`, answer:`${big-sm}` };
    }

    case 'class2': {
      if (Math.random() > 0.5) {
        const a=rand(10,50), b=rand(10,50);
        return { question:`${a} + ${b} = ?`, answer:`${a+b}` };
      }
      const a=rand(20,99), b=rand(1,a-1);
      return { question:`${a} − ${b} = ?`, answer:`${a-b}` };
    }

    case 'class3': {
      const a=rand(2,10), b=rand(2,10);
      return { question:`${a} × ${b} = ?`, answer:`${a*b}` };
    }

    case 'class4': {
      if (Math.random() > 0.5) {
        const a=rand(2,12), b=rand(2,12);
        return { question:`${a} × ${b} = ?`, answer:`${a*b}` };
      }
      const b=rand(2,12), r=rand(2,12);
      return { question:`${b*r} ÷ ${b} = ?`, answer:`${r}` };
    }

    case 'class5': {
      const t=rand(1,4);
      if(t===1){const a=rand(10,100),b=rand(10,100);return{question:`${a} + ${b} = ?`,answer:`${a+b}`};}
      if(t===2){const a=rand(20,100),b=rand(1,a-1);return{question:`${a} − ${b} = ?`,answer:`${a-b}`};}
      if(t===3){const a=rand(2,15),b=rand(2,15);return{question:`${a} × ${b} = ?`,answer:`${a*b}`};}
      const b=rand(2,12),r=rand(2,12);return{question:`${b*r} ÷ ${b} = ?`,answer:`${r}`};
    }

    case 'class6': {
      const t=rand(1,3);
      if(t===1){const a=rand(-20,20),b=rand(-20,20);return{question:`(${a}) + (${b}) = ?`,answer:`${a+b}`};}
      if(t===2){const a=rand(-30,30),b=rand(-20,20);return{question:`${a} − (${b}) = ?`,answer:`${a-b}`};}
      const a=rand(2,10),b=rand(2,10);return{question:`LCM(${a}, ${b}) = ?`,answer:`${lcmOf(a,b)}`};
    }

    case 'class7': {
      const t=rand(1,3);
      if(t===1){const a=rand(1,20),x=rand(1,30);return{question:`x + ${a} = ${x+a}, x = ?`,answer:`${x}`};}
      if(t===2){const p=rand(1,10)*10,tot=rand(1,10)*10;return{question:`${p}% of ${tot} = ?`,answer:`${p*tot/100}`};}
      const a=rand(1,10),b=rand(1,10),c=rand(2,5);return{question:`${a}:${b} = ${a*c}:?, ? = `,answer:`${b*c}`};
    }

    case 'class8': {
      const t=rand(1,3);
      if(t===1){const n=rand(2,20);return{question:`${n}² = ?`,answer:`${n*n}`};}
      if(t===2){const n=rand(2,7);return{question:`${n}³ = ?`,answer:`${n*n*n}`};}
      const a=rand(1,10),x=rand(1,10);return{question:`2x + ${a} = ${2*x+a}, x = ?`,answer:`${x}`};
    }

    case 'class9': {
      const t=rand(1,3);
      if(t===1){const g=rand(2,10),a=rand(2,8),b=rand(2,8);return{question:`HCF(${g*a}, ${g*b}) = ?`,answer:`${gcd(g*a,g*b)}`};}
      if(t===2){const n=rand(2,12);return{question:`√${n*n} = ?`,answer:`${n}`};}
      const a=rand(1,5),b=rand(1,10),x=rand(1,10);return{question:`${a}x + ${b} = ${a*x+b}, x = ?`,answer:`${x}`};
    }

    case 'class10': {
      const t=rand(1,3);
      if(t===1){const [p]=[[3,4,5],[5,12,13],[8,15,17],[7,24,25]][rand(0,3)];const tri=PYTH[rand(0,3)];return{question:`Legs: ${tri[0]}, ${tri[1]}. Hypotenuse = ?`,answer:`${tri[2]}`};}
      if(t===2){const a=rand(1,8),d=rand(1,5),n=rand(3,10);return{question:`AP: a=${a}, d=${d}, a${n} = ?`,answer:`${a+(n-1)*d}`};}
      const a=rand(1,8),b=rand(1,8);return{question:`x²−${a+b}x+${a*b}=0, smaller root = ?`,answer:`${Math.min(a,b)}`};
    }

    case 'class11': {
      const t=rand(1,3);
      if(t===1){const v=TRIG[rand(0,TRIG.length-1)];return{question:`${v.q} = ?`,answer:v.a};}
      if(t===2){const v=LOGS[rand(0,LOGS.length-1)];return{question:`${v.q} = ?`,answer:v.a};}
      const n=rand(4,8);return{question:`${n}P2 = ?`,answer:`${n*(n-1)}`};
    }

    case 'class12': {
      const t=rand(1,3);
      if(t===1){const n=rand(2,6);return{question:`d/dx(x^${n}) at x=1 = ?`,answer:`${n}`};}
      if(t===2){const c=rand(2,10),a=rand(1,5);return{question:`∫${c} dx from 0 to ${a} = ?`,answer:`${c*a}`};}
      const n=rand(4,10);return{question:`${n}C2 = ?`,answer:`${n*(n-1)/2}`};
    }

    case 'btech': {
      const t=rand(1,3);
      if(t===1){const a=rand(1,5),b=rand(1,5),c=rand(1,5),d=rand(1,5);return{question:`det|${a} ${b} / ${c} ${d}| = ?`,answer:`${a*d-b*c}`};}
      if(t===2){const v=TRIG[rand(0,TRIG.length-1)];return{question:`${v.q} (radians ok) = ?`,answer:v.a};}
      const n=rand(1,4);const res=(Math.pow(2,n+1))/(n+1);
      if(Number.isInteger(res))return{question:`∫x^${n} dx from 0→2 = ?`,answer:`${res}`};
      return{question:`∫2x dx from 0→3 = ?`,answer:`9`};
    }

    case 'medical': {
      const t=rand(1,3);
      if(t===1){const mg=[500,1000,2000,250,750][rand(0,4)];return{question:`${mg} mg = ? g`,answer:`${mg/1000}`};}
      if(t===2){const g=rand(1,10);return{question:`${g}g in 100ml = ?% (w/v)`,answer:`${g}`};}
      const c1=rand(2,10)*10,v1=rand(1,5)*10,c2=rand(1,5)*10;
      const v2=(c1*v1)/c2;
      if(Number.isInteger(v2))return{question:`C₁=${c1}%, V₁=${v1}ml, C₂=${c2}%, V₂=?`,answer:`${v2}`};
      return{question:`1:4 ratio → 1 part in ? total`,answer:`5`};
    }

    default: {
      const a=rand(1,20),b=rand(1,20);
      return { question:`${a} + ${b} = ?`, answer:`${a+b}` };
    }
  }
}

// ── Level label map ──────────────────────────────────────
export const LEVEL_LABELS = {
  class1:'Class 1', class2:'Class 2', class3:'Class 3', class4:'Class 4', class5:'Class 5',
  class6:'Class 6', class7:'Class 7', class8:'Class 8',
  class9:'Class 9', class10:'Class 10', class11:'Class 11', class12:'Class 12',
  btech:'B.Tech', medical:'Medical',
};

// ── Hook ────────────────────────────────────────────────
export function useGameLogic(initialTime = 60, level = 'class5') {
  const [timeLeft, setTimeLeft]     = useState(initialTime);
  const [ropePosition, setRopePosition] = useState(0);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [problemA, setProblemA]     = useState(() => generateProblem(level));
  const [problemB, setProblemB]     = useState(() => generateProblem(level));
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(t);
    } else if (timeLeft === 0 && !isGameOver) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  useEffect(() => {
    if (ropePosition <= -10 || ropePosition >= 10) setIsGameOver(true);
  }, [ropePosition]);

  const submitAnswer = useCallback((team, inputAnswer) => {
    if (isGameOver) return false;
    if (team === 'A') {
      if (inputAnswer === problemA.answer) {
        setTeamAScore(s => s + 1);
        setRopePosition(p => Math.max(-10, p - 1));
        setProblemA(generateProblem(level));
        return true;
      }
    } else {
      if (inputAnswer === problemB.answer) {
        setTeamBScore(s => s + 1);
        setRopePosition(p => Math.min(10, p + 1));
        setProblemB(generateProblem(level));
        return true;
      }
    }
    return false;
  }, [isGameOver, problemA, problemB, level]);

  return {
    timeLeft, ropePosition, teamAScore, teamBScore,
    problemA, problemB, submitAnswer, isGameOver,
    winner: isGameOver
      ? (ropePosition < 0 ? 'Team A' : ropePosition > 0 ? 'Team B' : 'Tie')
      : null,
  };
}
