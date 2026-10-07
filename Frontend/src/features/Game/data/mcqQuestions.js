// ans = index of correct option (0=A, 1=B, 2=C, 3=D)
// Integration questions REMOVED — see integrationQuestions.js for those

export const MCQ_BANKS = {

  class11: [
    // ── Trigonometry ──
    { topic:'Trigonometry', q:'sin 30° = ?',                  opts:['0','1/2','√3/2','1'],               ans:1 },
    { topic:'Trigonometry', q:'cos 60° = ?',                  opts:['1','√3/2','1/2','0'],                ans:2 },
    { topic:'Trigonometry', q:'tan 45° = ?',                  opts:['0','1/√3','√3','1'],                 ans:3 },
    { topic:'Trigonometry', q:'sin 90° = ?',                  opts:['0','1/2','√3/2','1'],                ans:3 },
    { topic:'Trigonometry', q:'cos 0° = ?',                   opts:['0','1/2','√3/2','1'],                ans:3 },
    { topic:'Trigonometry', q:'sin 60° = ?',                  opts:['1/2','1','√3/2','0'],                ans:2 },
    { topic:'Trigonometry', q:'cos 30° = ?',                  opts:['1/2','1','√3/2','0'],                ans:2 },
    { topic:'Trigonometry', q:'tan 0° = ?',                   opts:['1','0','∞','1/2'],                   ans:1 },
    { topic:'Trigonometry', q:'sin²θ + cos²θ = ?',            opts:['0','2','sinθ','1'],                  ans:3 },
    { topic:'Trigonometry', q:'sec 60° = ?',                  opts:['1','2','√2','1/2'],                  ans:1 },
    { topic:'Trigonometry', q:'1 + tan²θ = ?',                opts:['sec²θ','cos²θ','cosec²θ','cot²θ'],  ans:0 },
    { topic:'Trigonometry', q:'cosec 30° = ?',                opts:['2','1','√2','1/2'],                  ans:0 },

    // ── Logarithm ──
    { topic:'Logarithm', q:'log₁₀ 100 = ?',                   opts:['1','2','3','10'],                   ans:1 },
    { topic:'Logarithm', q:'log₂ 8 = ?',                      opts:['2','4','3','6'],                    ans:2 },
    { topic:'Logarithm', q:'log₃ 27 = ?',                     opts:['3','2','9','6'],                    ans:0 },
    { topic:'Logarithm', q:'log₁₀ 1 = ?',                     opts:['1','-1','0','10'],                  ans:2 },
    { topic:'Logarithm', q:'log₂ 16 = ?',                     opts:['2','4','8','3'],                    ans:1 },
    { topic:'Logarithm', q:'log₁₀ 1000 = ?',                  opts:['2','3','4','10'],                   ans:1 },
    { topic:'Logarithm', q:'log(mn) = ?',                     opts:['log m − log n','log m × log n','log m + log n','m/n'], ans:2 },
    { topic:'Logarithm', q:'log₅ 125 = ?',                    opts:['2','3','4','5'],                    ans:1 },

    // ── Sequences ──
    { topic:'Sequences', q:'AP: a=2, d=3. Find 5th term',     opts:['12','14','17','15'],                ans:1 },
    { topic:'Sequences', q:'Sum of 1st 10 natural numbers',   opts:['45','50','55','60'],                 ans:2 },
    { topic:'Sequences', q:'GP: a=2, r=3. Find 4th term',     opts:['18','27','54','81'],                 ans:2 },
    { topic:'Sequences', q:'AP: 3,7,11,... Find 6th term',    opts:['21','23','25','27'],                 ans:1 },
    { topic:'Sequences', q:'Sum of AP with a=1, d=2, n=5',    opts:['15','20','25','30'],                 ans:2 },
    { topic:'Sequences', q:'GP: a=3, r=2. Sum of 4 terms',    opts:['30','42','45','48'],                 ans:2 },

    // ── Permutation & Combination ──
    { topic:'P & C', q:'5P2 = ?',                             opts:['10','20','25','5'],                  ans:1 },
    { topic:'P & C', q:'6C2 = ?',                             opts:['12','15','30','36'],                 ans:1 },
    { topic:'P & C', q:'4! = ?',                              opts:['12','16','24','48'],                 ans:2 },
    { topic:'P & C', q:'7C0 = ?',                             opts:['0','7','1','∞'],                    ans:2 },
    { topic:'P & C', q:'nCr + nC(r-1) = ?',                  opts:['nCr','(n+1)Cr','nPr','n!'],         ans:1 },
    { topic:'P & C', q:'How many ways to arrange 3 books in a row?', opts:['3','6','9','12'],            ans:1 },

    // ── Algebra & Equations ──
    { topic:'Quadratics', q:'Roots of x²−5x+6=0',            opts:['2,3','1,6','2,4','3,4'],             ans:0 },
    { topic:'Quadratics', q:'Discriminant of 2x²+3x+1=0',    opts:['1','4','7','17'],                    ans:0 },
    { topic:'Quadratics', q:'Sum of roots of x²−7x+10=0',    opts:['5','7','10','2'],                    ans:1 },
    { topic:'Quadratics', q:'Product of roots of x²−7x+10=0',opts:['5','7','10','2'],                    ans:2 },

    // ── Sets & Relations ──
    { topic:'Sets', q:'A∪A\' = ?',                            opts:['A','A\'','U','∅'],                   ans:2 },
    { topic:'Sets', q:'n(A∪B) = n(A)+n(B)−?',                opts:['n(A)','n(B)','n(A∩B)','n(U)'],      ans:2 },
    { topic:'Sets', q:'A∩A\' = ?',                            opts:['A','U','∅','A\''],                   ans:2 },
  ],

  class12: [
    // ── Derivatives ──
    { topic:'Derivatives', q:'d/dx (sin x) = ?',              opts:['cos x','-cos x','-sin x','tan x'],  ans:0 },
    { topic:'Derivatives', q:'d/dx (cos x) = ?',              opts:['sin x','-sin x','tan x','sec x'],   ans:1 },
    { topic:'Derivatives', q:'d/dx (x²) = ?',                 opts:['x','2','2x','x²'],                  ans:2 },
    { topic:'Derivatives', q:'d/dx (eˣ) = ?',                 opts:['eˣ','xe^(x-1)','e','xeˣ'],         ans:0 },
    { topic:'Derivatives', q:'d/dx (ln x) = ?',               opts:['ln x','1/x','x','eˣ'],              ans:1 },
    { topic:'Derivatives', q:'d/dx (x³) at x=2 = ?',         opts:['6','8','12','24'],                   ans:2 },
    { topic:'Derivatives', q:'d/dx (tan x) = ?',              opts:['sec x','sec²x','-sec²x','cot x'],   ans:1 },
    { topic:'Derivatives', q:'d/dx (xⁿ) = ?',                opts:['nxⁿ','nxⁿ⁻¹','xⁿ⁻¹','(n-1)xⁿ'],   ans:1 },

    // ── Limits ──
    { topic:'Limits', q:'lim(x→0) sin(x)/x = ?',             opts:['0','∞','1','undefined'],             ans:2 },
    { topic:'Limits', q:'lim(x→∞) 1/x = ?',                  opts:['1','∞','0','-1'],                   ans:2 },
    { topic:'Limits', q:'lim(x→2) (x²−4)/(x−2) = ?',        opts:['0','2','4','∞'],                    ans:2 },
    { topic:'Limits', q:'lim(x→0) (eˣ−1)/x = ?',             opts:['0','1','e','∞'],                    ans:1 },

    // ── Matrices ──
    { topic:'Matrices', q:'Order A=2×3, B=3×4. AB order?',   opts:['3×3','2×4','4×2','3×2'],             ans:1 },
    { topic:'Matrices', q:'Identity matrix of 3×3, |I| = ?', opts:['0','3','1','9'],                      ans:2 },
    { topic:'Matrices', q:'det [[1,2],[3,4]] = ?',            opts:['-2','2','10','-10'],                  ans:0 },
    { topic:'Matrices', q:'Transpose of a matrix swaps?',     opts:['Rows','Columns','Rows & Columns','Diagonal'], ans:2 },
    { topic:'Matrices', q:'A matrix of order 2×3 has how many elements?', opts:['5','6','9','8'],         ans:1 },
    { topic:'Matrices', q:'det [[2,0],[0,3]] = ?',            opts:['5','6','0','1'],                      ans:1 },

    // ── Probability ──
    { topic:'Probability', q:'P(sure event) = ?',             opts:['0','0.5','1','∞'],                   ans:2 },
    { topic:'Probability', q:'P(impossible event) = ?',       opts:['0','0.5','1','-1'],                  ans:0 },
    { topic:'Probability', q:'A die rolled. P(even) = ?',     opts:['1/6','1/3','1/2','2/3'],             ans:2 },
    { topic:'Probability', q:'A coin tossed. P(heads) = ?',   opts:['0','1/4','1/2','1'],                 ans:2 },
    { topic:'Probability', q:'P(A)=0.3, P(A\') = ?',         opts:['0.3','0.7','1.3','0'],               ans:1 },
    { topic:'Probability', q:'2 coins tossed. P(2 heads)=?',  opts:['1/4','1/2','1','3/4'],              ans:0 },
    { topic:'Probability', q:'P(A∪B)=P(A)+P(B) when events are?', opts:['Independent','Mutually exclusive','Exhaustive','Complementary'], ans:1 },

    // ── Vectors ──
    { topic:'Vectors', q:'|î| = ?',                           opts:['0','1','2','√2'],                    ans:1 },
    { topic:'Vectors', q:'î · ĵ = ?',                        opts:['1','0','-1','∞'],                    ans:1 },
    { topic:'Vectors', q:'î × î = ?',                        opts:['1','0','î','∞'],                     ans:1 },
    { topic:'Vectors', q:'Magnitude of (3î + 4ĵ) = ?',       opts:['3','4','5','7'],                     ans:2 },
  ],

  btech: [
    // ── Matrices ──
    { topic:'Matrices', q:'det [[1,2],[3,4]] = ?',            opts:['-2','2','10','-10'],                 ans:0 },
    { topic:'Matrices', q:'det [[2,0],[0,3]] = ?',            opts:['5','6','0','1'],                     ans:1 },
    { topic:'Matrices', q:'Transpose of [1,2,3] order?',      opts:['3×1','1×3','3×3','1×1'],            ans:1 },
    { topic:'Matrices', q:'Rank of null matrix = ?',          opts:['1','0','∞','undefined'],             ans:1 },
    { topic:'Matrices', q:'det of Identity matrix (3×3) = ?', opts:['0','3','1','9'],                     ans:2 },

    // ── Complex Numbers ──
    { topic:'Complex', q:'|3 + 4i| = ?',                      opts:['3','4','5','7'],                    ans:2 },
    { topic:'Complex', q:'i² = ?',                            opts:['1','-1','i','0'],                    ans:1 },
    { topic:'Complex', q:'i⁴ = ?',                            opts:['-1','i','1','-i'],                  ans:2 },
    { topic:'Complex', q:'Conjugate of (3+4i) = ?',           opts:['3-4i','-3+4i','-3-4i','4+3i'],     ans:0 },
    { topic:'Complex', q:'(1+i)² = ?',                        opts:['2i','-2i','2','1+2i'],              ans:0 },
    { topic:'Complex', q:'i³ = ?',                            opts:['i','-i','1','-1'],                  ans:1 },
    { topic:'Complex', q:'Argument of (1+i) = ?',             opts:['π/2','π/4','π/3','π'],              ans:1 },

    // ── Calculus (Limits & Derivatives only) ──
    { topic:'Calculus', q:'lim(x→0) sin(x)/x = ?',           opts:['0','∞','1','undefined'],             ans:2 },
    { topic:'Calculus', q:'d/dx(tan x) = ?',                  opts:['sec x','sec²x','-sec²x','cot x'],  ans:1 },
    { topic:'Calculus', q:'lim(x→∞) 1/x = ?',                opts:['1','∞','0','-1'],                   ans:2 },
    { topic:'Calculus', q:'d/dx(xⁿ) = ?',                    opts:['nxⁿ','nxⁿ⁻¹','xⁿ⁺¹','(n-1)xⁿ'],   ans:1 },
    { topic:'Calculus', q:'d/dx(eˣ) = ?',                    opts:['eˣ','xeˣ','e','eˣ⁻¹'],              ans:0 },
    { topic:'Calculus', q:'lim(x→2)(x²−4)/(x−2) = ?',       opts:['0','2','4','∞'],                    ans:2 },

    // ── Number Systems ──
    { topic:'Binary', q:'Binary 1010 in decimal = ?',         opts:['8','10','12','16'],                  ans:1 },
    { topic:'Binary', q:'Binary 1111 in decimal = ?',         opts:['14','15','16','8'],                  ans:1 },
    { topic:'Binary', q:'2⁸ = ?',                             opts:['128','256','512','64'],              ans:1 },
    { topic:'Binary', q:'Decimal 12 in binary = ?',           opts:['1010','1100','1110','1001'],         ans:1 },

    // ── Boolean Logic ──
    { topic:'Boolean', q:'NOT(0) = ?',                        opts:['0','1','X','undefined'],             ans:1 },
    { topic:'Boolean', q:'AND: 1·0 = ?',                      opts:['0','1','∞','undefined'],            ans:0 },
    { topic:'Boolean', q:'OR: 1+0 = ?',                       opts:['0','1','∞','undefined'],            ans:1 },
    { topic:'Boolean', q:'NAND(1,1) = ?',                     opts:['0','1','X','undefined'],             ans:0 },
  ],

  medical: [
    // ── Units & Conversions ──
    { topic:'Units', q:'1 kg = ? g',                           opts:['10','100','1000','10000'],          ans:2 },
    { topic:'Units', q:'500 mg = ? g',                         opts:['0.05','0.5','5','50'],              ans:1 },
    { topic:'Units', q:'1 L = ? mL',                           opts:['10','100','1000','10000'],          ans:2 },
    { topic:'Units', q:'2.5 L = ? mL',                         opts:['25','250','2500','25000'],          ans:2 },
    { topic:'Units', q:'1 mmol = ? μmol',                      opts:['10','100','1000','0.001'],          ans:2 },
    { topic:'Units', q:'1 mL water ≈ ? g',                     opts:['0.1','0.5','1','10'],               ans:2 },

    // ── Physiology ──
    { topic:'Physiology', q:'Normal blood pH = ?',             opts:['6.8','7.4','7.8','8.0'],           ans:1 },
    { topic:'Physiology', q:'Fasting blood glucose (mg/dL)?',  opts:['40-60','70-100','120-150','150+'], ans:1 },
    { topic:'Physiology', q:'Normal heart rate (adult) bpm?',  opts:['40-60','60-80','80-100','100+'],   ans:1 },
    { topic:'Physiology', q:'Normal body temp (°F) = ?',       opts:['96.4','98.6','100.4','102'],       ans:1 },
    { topic:'Physiology', q:'RBC lifespan = ?',                opts:['30 days','60 days','120 days','180 days'], ans:2 },
    { topic:'Physiology', q:'Normal SpO₂ range = ?',           opts:['80-85%','85-90%','90-95%','95-100%'], ans:3 },

    // ── Drug Calculations ──
    { topic:'Drug Calc', q:'5% w/v = ? g in 100 mL',          opts:['0.5g','5g','50g','500g'],           ans:1 },
    { topic:'Drug Calc', q:'Dose: 2mg/kg. Wt=60kg. Dose=?',   opts:['30mg','60mg','90mg','120mg'],       ans:3 },
    { topic:'Drug Calc', q:'500mL in 4hr. Rate (mL/hr) = ?',  opts:['100','125','150','200'],            ans:1 },
    { topic:'Drug Calc', q:'Dose: 0.5mg/kg. Wt=40kg. Dose=?', opts:['10mg','15mg','20mg','25mg'],       ans:2 },
    { topic:'Drug Calc', q:'Drug dilution: 10mg in 5mL. Conc?', opts:['1mg/mL','2mg/mL','5mg/mL','10mg/mL'], ans:1 },

    // ── Chemistry ──
    { topic:'Chemistry', q:'pH of pure water = ?',             opts:['0','7','14','1'],                  ans:1 },
    { topic:'Chemistry', q:'Atomic number of Carbon = ?',      opts:['4','6','12','8'],                  ans:1 },
    { topic:'Chemistry', q:'Molecular weight of water = ?',    opts:['16','18','20','22'],               ans:1 },
    { topic:'Chemistry', q:'Valency of Oxygen = ?',            opts:['1','2','3','4'],                   ans:1 },
    { topic:'Chemistry', q:'Avogadro number ≈ ?',              opts:['6.02×10²³','3.14×10²³','9.8×10²³','1×10²³'], ans:0 },
    { topic:'Chemistry', q:'Molecular weight of NaCl = ?',     opts:['48.5','58.5','68.5','78.5'],       ans:1 },

    // ── Reasoning ──
    { topic:'Physiology', q:'Blood type with no antigens = ?', opts:['A','B','AB','O'],                  ans:3 },
    { topic:'Physiology', q:'Universal blood donor group = ?', opts:['A','B','AB','O'],                  ans:3 },
    { topic:'Reasoning',  q:'If a drug\'s half-life is 4hr, after 8hr what % remains?', opts:['50%','25%','12.5%','75%'], ans:1 },
    { topic:'Reasoning',  q:'pH < 7 means solution is: ?',    opts:['Neutral','Basic','Acidic','Saturated'], ans:2 },
  ],
};

export function getRandomMCQ(level) {
  const bank = MCQ_BANKS[level] || MCQ_BANKS.class11;
  return bank[Math.floor(Math.random() * bank.length)];
}
