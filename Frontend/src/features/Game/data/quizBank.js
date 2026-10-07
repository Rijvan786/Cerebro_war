// { q, opts:[A,B,C,D], ans:0-3, topic }
const Q = (q,opts,ans,topic) => ({q,opts,ans,topic});

export const QUIZ_BANK = {
  primary: {
    math: [
      Q('2 + 3 = ?',['4','5','6','7'],1,'Addition'),
      Q('10 - 4 = ?',['5','6','7','8'],1,'Subtraction'),
      Q('3 × 4 = ?',['10','12','14','16'],1,'Multiplication'),
      Q('15 ÷ 3 = ?',['3','4','5','6'],2,'Division'),
      Q('What is half of 20?',['8','9','10','11'],2,'Fractions'),
      Q('7 + 8 = ?',['13','14','15','16'],2,'Addition'),
      Q('5 × 5 = ?',['20','25','30','35'],1,'Multiplication'),
      Q('20 ÷ 4 = ?',['4','5','6','7'],1,'Division'),
    ],
    science: [
      Q('How many legs does a spider have?',['6','8','10','12'],1,'Animals'),
      Q('Which planet is closest to the Sun?',['Venus','Mercury','Earth','Mars'],1,'Space'),
      Q('Water boils at ?',['90°C','100°C','110°C','120°C'],1,'Matter'),
      Q('Plants make food by ?',['Breathing','Photosynthesis','Digestion','Respiration'],1,'Plants'),
      Q('The heart pumps ?',['Air','Water','Blood','Food'],2,'Human Body'),
      Q('Sound travels through ?',['Vacuum','Air','Space','None'],1,'Sound'),
    ],
    english: [
      Q('Opposite of "big" is ?',['small','tall','wide','long'],0,'Antonyms'),
      Q('Plural of "child" is ?',['childs','childen','children','child'],2,'Grammar'),
      Q('"She ___ to school." (correct verb)',['go','goes','gone','going'],1,'Grammar'),
      Q('Which is a noun?',['run','happy','dog','quickly'],2,'Parts of Speech'),
    ],
  },

  middle: {
    math: [
      Q('LCM of 4 and 6 = ?',['12','24','6','8'],0,'LCM'),
      Q('HCF of 12 and 18 = ?',['3','6','9','12'],1,'HCF'),
      Q('(-5) + (-3) = ?',['-2','-8','8','2'],1,'Integers'),
      Q('15% of 200 = ?',['25','30','35','40'],1,'Percentage'),
      Q('2³ = ?',['6','8','9','12'],1,'Exponents'),
      Q('√64 = ?',['6','7','8','9'],2,'Square Roots'),
      Q('x + 7 = 15, x = ?',['6','7','8','9'],2,'Algebra'),
      Q('Area of square side 5 = ?',['20','25','30','35'],1,'Geometry'),
    ],
    science: [
      Q('Photosynthesis produces ?',['O₂','CO₂','N₂','H₂'],0,'Biology'),
      Q('Atoms combine to form ?',['Elements','Molecules','Compounds','Mixtures'],1,'Chemistry'),
      Q('Newton\'s 1st law is about ?',['Inertia','Force','Motion','Energy'],0,'Physics'),
      Q('Blood type with no antigens: ?',['A','B','AB','O'],3,'Biology'),
      Q('Chemical symbol of Gold: ?',['Go','Gd','Au','Ag'],2,'Chemistry'),
      Q('Speed = Distance ÷ ?',['Mass','Time','Force','Energy'],1,'Physics'),
    ],
  },

  secondary: {
    math: [
      Q('Pythagorean triple: 3, 4, ?',['5','6','7','8'],0,'Geometry'),
      Q('Quadratic: x²-5x+6=0, roots?',['2,3','1,6','2,4','3,4'],0,'Algebra'),
      Q('sin²θ + cos²θ = ?',['0','1','2','sinθ'],1,'Trigonometry'),
      Q('AP: a=2,d=3. 5th term?',['12','14','15','17'],1,'Sequences'),
      Q('√(4×9) = ?',['6','12','36','3'],0,'Surds'),
      Q('Slope of y=3x+2 = ?',['2','3','5','1'],1,'Coordinate'),
    ],
    physics: [
      Q('F = ma. If m=5,a=3, F=?',['12N','15N','18N','20N'],1,'Laws of Motion'),
      Q('Speed of light ≈ ?',['3×10⁶','3×10⁸','3×10¹⁰','3×10⁴'],1,'Light'),
      Q('Unit of force: ?',['Joule','Watt','Newton','Pascal'],2,'Units'),
      Q('KE = ½mv². If m=2,v=3, KE=?',['6J','9J','12J','18J'],1,'Energy'),
      Q('Ohm\'s law: V = ?',['I/R','IR','I+R','I-R'],1,'Electricity'),
      Q('Acceleration due to gravity ≈ ?',['8.9','9.8','10.8','11.8'],1,'Gravitation'),
    ],
    chemistry: [
      Q('Atomic number of Carbon: ?',['4','6','12','8'],1,'Periodic Table'),
      Q('pH of acid: ?',['<7','=7','>7','=14'],0,'Acids & Bases'),
      Q('H₂O molecular weight: ?',['16','18','20','22'],1,'Molecules'),
      Q('Valency of Oxygen: ?',['1','2','3','4'],1,'Bonding'),
      Q('Metals conduct ?',['Sound','Light','Electricity','Heat+Electricity'],3,'Metals'),
      Q('NaCl is common ?',['Sugar','Salt','Sand','Soda'],1,'Compounds'),
    ],
    biology: [
      Q('Basic unit of life: ?',['Tissue','Cell','Organ','Atom'],1,'Cell Biology'),
      Q('DNA stands for: ?',['Deoxyribonucleic Acid','Diribonucleic Acid','Deoxyribose Acid','None'],0,'Genetics'),
      Q('Photosynthesis occurs in: ?',['Nucleus','Chloroplast','Mitochondria','Ribosome'],1,'Plants'),
      Q('Heart has how many chambers? ',['2','3','4','5'],2,'Human Body'),
      Q('RBC lifespan: ?',['30 days','60 days','120 days','180 days'],2,'Blood'),
      Q('Hormone for blood sugar: ?',['Insulin','Glucagon','Thyroxine','Adrenaline'],0,'Hormones'),
    ],
  },

  higher: {
    math: [
      Q('d/dx(sin x) = ?',['cos x','-cos x','-sin x','tan x'],0,'Calculus'),
      Q('∫cos x dx = ?',['sin x+C','-sin x+C','cos x+C','tan x+C'],0,'Calculus'),
      Q('log₂ 8 = ?',['2','3','4','6'],1,'Logarithm'),
      Q('6C2 = ?',['12','15','30','36'],1,'Combinations'),
      Q('lim(x→0) sinx/x = ?',['0','∞','1','undefined'],2,'Limits'),
      Q('i² = ?',['1','-1','i','0'],1,'Complex Numbers'),
    ],
    physics: [
      Q('E = mc². c is: ?',['Speed of sound','Speed of light','Charge','Capacitance'],1,'Relativity'),
      Q('Photoelectric effect: energy ∝ ?',['Intensity','Frequency','Wavelength','Amplitude'],1,'Modern Physics'),
      Q('Unit of electric field: ?',['N/C','V/m','Both N/C & V/m','Ohm'],2,'Electrostatics'),
      Q('Half-life of radioactive element means: ?',['Full decay','Half decay','Quarter decay','Double decay'],1,'Nuclear'),
      Q('Biot-Savart law relates to: ?',['Electric field','Magnetic field','Gravity','Light'],1,'Magnetism'),
    ],
    chemistry: [
      Q('Hybridization of CH₄: ?',['sp','sp²','sp³','sp³d'],2,'Bonding'),
      Q('Benzene molecular formula: ?',['C₆H₁₂','C₆H₆','C₆H₁₀','C₆H₈'],1,'Organic'),
      Q('Le Chatelier\'s principle relates to: ?',['Rate','Equilibrium','Entropy','Enthalpy'],1,'Equilibrium'),
      Q('Electronegativity highest in: ?',['Oxygen','Nitrogen','Fluorine','Chlorine'],2,'Periodic Trends'),
    ],
    biology: [
      Q('PCR is used to amplify: ?',['Proteins','DNA','RNA','Lipids'],1,'Biotechnology'),
      Q('Lac operon is found in: ?',['Eukaryotes','Prokaryotes','Fungi','Viruses'],1,'Genetics'),
      Q('Insulin is a: ?',['Lipid','Carbohydrate','Protein','Nucleic Acid'],2,'Biochemistry'),
    ],
    computerScience: [
      Q('Binary of 10: ?',['1000','1010','1100','1001'],1,'Number Systems'),
      Q('NOT(AND(1,0)) = ?',['0','1','X','undefined'],1,'Boolean'),
      Q('TCP/IP is a: ?',['Language','Protocol','Hardware','OS'],1,'Networks'),
    ],
  },

  college: {
    cs: {
      dsa: [
        Q('Time complexity of binary search: ?',['O(n)','O(log n)','O(n²)','O(1)'],1,'Searching'),
        Q('Stack follows: ?',['FIFO','LIFO','Random','Priority'],1,'Stack'),
        Q('Queue follows: ?',['LIFO','FIFO','Random','Sorted'],1,'Queue'),
        Q('Height of balanced BST with n nodes: ?',['O(n)','O(log n)','O(n²)','O(1)'],1,'Trees'),
        Q('Dijkstra finds: ?',['MST','Shortest path','Longest path','DFS tree'],1,'Graphs'),
        Q('Quicksort avg case: ?',['O(n)','O(n log n)','O(n²)','O(log n)'],1,'Sorting'),
        Q('A linked list node contains: ?',['Data only','Pointer only','Data+Pointer','Index'],2,'Linked List'),
        Q('Inorder traversal: ?',['Root-Left-Right','Left-Root-Right','Left-Right-Root','Right-Root-Left'],1,'Trees'),
      ],
      dbms: [
        Q('SQL SELECT returns: ?',['Rows','Columns','Tables','Databases'],0,'SQL'),
        Q('Primary key is: ?',['Nullable','Unique+NotNull','Duplicate allowed','Optional'],1,'Keys'),
        Q('ACID stands for: ?',['Atomic Consistent Isolated Durable','Active Cached Indexed Dynamic','None','All'],0,'Transactions'),
        Q('JOIN combines: ?',['Rows from one table','Columns','Rows from multiple tables','Databases'],2,'Joins'),
        Q('Normalization reduces: ?',['Speed','Redundancy','Security','Complexity'],1,'Normalization'),
        Q('Foreign key references: ?',['Same table','Primary key of another table','Any column','Index'],1,'Keys'),
        Q('DDL stands for: ?',['Data Definition Language','Data Driven Logic','Dynamic Data Layer','None'],0,'SQL'),
        Q('View is a: ?',['Physical table','Virtual table','Index','Trigger'],1,'Views'),
      ],
      os: [
        Q('Deadlock requires: ?',['2 conditions','3 conditions','4 conditions','1 condition'],2,'Deadlock'),
        Q('CPU scheduling: Round Robin uses: ?',['Priority','Time quantum','Arrival time','Burst time'],1,'Scheduling'),
        Q('Virtual memory uses: ?',['RAM only','Disk+RAM','Cache','ROM'],1,'Memory'),
        Q('Semaphore is used for: ?',['Scheduling','Synchronization','Memory mgmt','I/O'],1,'Synchronization'),
        Q('Page fault occurs when: ?',['Page in RAM','Page not in RAM','Cache miss','TLB hit'],1,'Paging'),
        Q('Thrashing happens due to: ?',['Too many processes','Insufficient RAM','Both','CPU speed'],2,'Performance'),
        Q('Fork() creates a: ?',['Thread','Child process','Semaphore','File'],1,'Processes'),
        Q('FIFO is a: ?',['Memory allocation','Page replacement','Scheduling','Disk algo'],1,'Page Replacement'),
      ],
      cn: [
        Q('IP address has how many bits (IPv4)? ',['16','32','64','128'],1,'IP Addressing'),
        Q('TCP is: ?',['Connectionless','Connection-oriented','Both','Neither'],1,'TCP/IP'),
        Q('DNS converts: ?',['IP to MAC','Domain to IP','IP to Domain','MAC to IP'],1,'DNS'),
        Q('HTTP default port: ?',['21','80','443','22'],1,'Protocols'),
        Q('OSI model has layers: ?',['5','6','7','8'],2,'OSI Model'),
        Q('Router operates at layer: ?',['1','2','3','4'],2,'OSI Model'),
        Q('Bandwidth unit: ?',['Hz','bps','Watts','Ohms'],1,'Fundamentals'),
        Q('Subnet mask 255.255.255.0 = /? ',['16','24','32','8'],1,'Subnetting'),
      ],
      oop: [
        Q('Encapsulation hides: ?',['Methods','Data','Both data & methods','Nothing'],2,'OOP Concepts'),
        Q('Inheritance allows: ?',['Code reuse','Data hiding','Polymorphism','Abstraction'],0,'Inheritance'),
        Q('Method overloading is: ?',['Runtime polymorphism','Compile-time polymorphism','Inheritance','Abstraction'],1,'Polymorphism'),
        Q('Abstract class can have: ?',['Only abstract methods','Concrete methods too','No methods','Only constructors'],1,'Abstraction'),
        Q('Constructor is called: ?',['Manually','On object creation','On object deletion','Never'],1,'Constructors'),
        Q('"this" keyword refers to: ?',['Parent class','Current object','Static method','None'],1,'OOP Concepts'),
      ],
      toc: [
        Q('DFA has: ?',['Non-deterministic transitions','Exactly one transition per input','Multiple transitions','No transitions'],1,'Automata'),
        Q('Regular languages are accepted by: ?',['PDA','TM','FA','CFG'],2,'Automata'),
        Q('CFL is accepted by: ?',['FA','PDA','TM','DFA'],1,'Pushdown Automata'),
        Q('Halting problem is: ?',['Decidable','Undecidable','NP-complete','P'],1,'Computability'),
        Q('Pumping lemma is for: ?',['Proving regular','Proving not regular','Both','CFG'],1,'Regular Languages'),
      ],
      ai: [
        Q('BFS uses: ?',['Stack','Queue','Priority Queue','Tree'],1,'Search'),
        Q('A* uses: ?',['f(n)=g(n)+h(n)','f(n)=g(n)','f(n)=h(n)','Random'],0,'Heuristic Search'),
        Q('Neural network activation function: ?',['Linear only','Non-linear','Boolean','String'],1,'Deep Learning'),
        Q('Supervised learning uses: ?',['Labeled data','Unlabeled data','No data','Random data'],0,'ML Types'),
        Q('Overfitting means: ?',['Good on train,bad on test','Good on test','Underfitting','Equal performance'],0,'ML Concepts'),
        Q('Perceptron is a: ?',['Single layer NN','Multi layer NN','CNN','RNN'],0,'Neural Networks'),
      ],
    },

    ece: {
      digitalElectronics: [
        Q('NAND is a: ?',['Universal gate','Basic gate','Special gate','None'],0,'Logic Gates'),
        Q('2\'s complement of 0101: ?',['1010','1011','0101','1111'],1,'Number Systems'),
        Q('Flip-flop stores: ?',['1 bit','1 byte','1 word','Multiple bits'],0,'Sequential'),
        Q('Multiplexer selects: ?',['One of many inputs','All inputs','No input','Output'],0,'Combinational'),
        Q('Binary 1010 = decimal: ?',['8','10','12','14'],1,'Number Systems'),
      ],
      signals: [
        Q('Fourier transform converts: ?',['Time→Frequency','Freq→Time','Both','Neither'],0,'Transforms'),
        Q('Sampling theorem: fs ≥ ?',['fmax','2×fmax','fmax/2','4×fmax'],1,'Sampling'),
        Q('LTI system property: ?',['Linear+Time-invariant','Linear only','Time-invariant only','None'],0,'Systems'),
        Q('Convolution in time = ? in frequency',['Addition','Multiplication','Division','Subtraction'],1,'Transforms'),
      ],
      communication: [
        Q('AM bandwidth = ?',['fm','2fm','fm/2','4fm'],1,'Modulation'),
        Q('FM has noise: ?',['More than AM','Less than AM','Same as AM','Zero'],1,'Modulation'),
        Q('Shannon capacity formula uses: ?',['SNR+Bandwidth','SNR only','Bandwidth only','Frequency'],0,'Channel Capacity'),
        Q('CDMA separates using: ?',['Frequency','Time','Code','Space'],2,'Multiple Access'),
      ],
      microprocessors: [
        Q('8085 is a: ?',['4-bit','8-bit','16-bit','32-bit'],1,'Microprocessors'),
        Q('Program counter holds: ?',['Data','Next instruction address','Stack top','Flag'],1,'Registers'),
        Q('Accumulator stores: ?',['Instructions','ALU result','Address','Flag'],1,'Registers'),
        Q('Interrupt is: ?',['Hardware only','Software only','Hardware or software','Neither'],2,'Interrupts'),
      ],
    },

    me: {
      thermodynamics: [
        Q('First law: Energy is: ?',['Created','Destroyed','Conserved','Halved'],2,'Laws'),
        Q('Entropy relates to: ?',['Order','Disorder','Energy','Temperature'],1,'Entropy'),
        Q('Carnot efficiency depends on: ?',['Working fluid','Temperature ratio','Pressure','Speed'],1,'Efficiency'),
        Q('Ideal gas: PV = ?',['nRT','nR/T','nT/R','RT/n'],0,'Gas Laws'),
        Q('Rankine cycle is used in: ?',['IC engines','Steam turbines','Gas turbines','Refrigeration'],1,'Cycles'),
      ],
      fluidMechanics: [
        Q('Pascal\'s law: Pressure is transmitted: ?',['Unequally','Equally in all directions','Upward only','Downward only'],1,'Pressure'),
        Q('Bernoulli equation is for: ?',['Viscous flow','Ideal flow','Compressible','Turbulent'],1,'Flow'),
        Q('Reynolds number for turbulent flow: ?',['<2000','2000-4000','>4000','=1'],2,'Flow Types'),
        Q('Viscosity unit (SI): ?',['Pa·s','N/m','kg/m','Pa'],0,'Properties'),
      ],
      engineeringMechanics: [
        Q('Moment = Force × ?',['Mass','Distance','Velocity','Acceleration'],1,'Moments'),
        Q('Friction force ∝ ?',['Normal force','Mass','Velocity','Area'],0,'Friction'),
        Q('Impulse = Force × ?',['Distance','Time','Mass','Velocity'],1,'Impulse'),
        Q('Equilibrium: ΣF = ?',['Max','Min','0','1'],2,'Statics'),
      ],
    },

    civil: {
      structuralAnalysis: [
        Q('Degree of static indeterminacy of fixed beam: ?',['1','2','3','4'],2,'Beams'),
        Q('Bending stress σ = M×y / ?',['A','I','E','V'],1,'Bending'),
        Q('Truss member carries: ?',['Only axial force','Only shear','Bending+axial','Torsion'],0,'Trusses'),
        Q('Muller-Breslau principle is for: ?',['Deflection','Influence lines','Shear force','Reactions'],1,'ILD'),
      ],
      soilMechanics: [
        Q('Void ratio e = Vv / ?',['Vs','Vt','Va','Vw'],0,'Phase Relations'),
        Q('Liquidity index > 1 means soil is: ?',['Stiff','Liquid','Plastic','Semi-solid'],1,'Consistency'),
        Q('Compaction improves: ?',['Permeability','Shear strength','Drainage','Settlement'],1,'Compaction'),
        Q('SPT gives: ?',['N-value','CBR','Plasticity','Voids'],0,'Testing'),
      ],
    },

    ee: {
      circuitTheory: [
        Q('KVL states: sum of voltages = ?',['Max','Min','0','Infinity'],2,'Circuit Laws'),
        Q('KCL states: sum of currents = ?',['Max','1','0','Infinity'],2,'Circuit Laws'),
        Q('Thevenin equivalent has: ?',['Voltage source + resistance','Current source + resistance','Resistance only','Voltage source only'],0,'Network Theorems'),
        Q('Resonance: XL = ?',['R','XC','0','Infinity'],1,'AC Circuits'),
        Q('Power factor = cos ?',['θ','sinθ','tanθ','φ'],0,'Power'),
      ],
      powerSystems: [
        Q('Load factor = average load / ?',['Min load','Peak load','Unit load','Base load'],1,'Load'),
        Q('Per unit system normalizes: ?',['Voltage','Current','Impedance','All of these'],3,'Per Unit'),
        Q('HVDC is used for: ?',['Short distance','Long distance','Local distribution','Generation'],1,'Transmission'),
        Q('Ferranti effect causes: ?',['Voltage drop','Voltage rise at no load','Current rise','Power loss'],1,'Lines'),
      ],
      controlSystems: [
        Q('Transfer function = Output / ? (in s-domain)',['Time','Input','Gain','Feedback'],1,'Basics'),
        Q('Steady state error for type-1 system with step input: ?',['Infinite','0','1','Constant'],1,'Error'),
        Q('Phase margin for stable system: ?',['<0°','0°','>0°','=180°'],2,'Stability'),
        Q('PID controller has: ?',['2 terms','3 terms','4 terms','1 term'],1,'Controllers'),
      ],
    },

    medical: {
      anatomy: [
        Q('Largest organ of body: ?',['Liver','Skin','Brain','Lungs'],1,'Organs'),
        Q('Femur is bone of: ?',['Arm','Thigh','Shin','Spine'],1,'Skeletal'),
        Q('Cranial nerves count: ?',['10','12','14','8'],1,'Nervous System'),
        Q('Mitral valve is in: ?',['Right heart','Left heart','Aorta','Pulmonary'],1,'Cardiovascular'),
      ],
      physiology: [
        Q('Normal blood pH: ?',['6.8','7.4','7.8','8.0'],1,'Blood'),
        Q('Resting heart rate (adult): ?',['40-60','60-80','80-100','100-120'],1,'Cardiovascular'),
        Q('GFR normal value: ?',['50 mL/min','125 mL/min','200 mL/min','25 mL/min'],1,'Renal'),
        Q('ADH acts on: ?',['Loop of Henle','Collecting duct','PCT','Glomerulus'],1,'Renal'),
        Q('Normal body temp (°F): ?',['96.4','97.6','98.6','99.6'],2,'Temperature'),
      ],
      pharmacology: [
        Q('Aspirin is a: ?',['Antibiotic','NSAID','Antifungal','Antihistamine'],1,'Drug Classes'),
        Q('Penicillin acts on: ?',['Cell membrane','Cell wall','DNA','Ribosomes'],1,'Antibiotics'),
        Q('Half-life means drug reduces to: ?',['25%','50%','75%','100%'],1,'Pharmacokinetics'),
        Q('Bioavailability of IV drug: ?',['50%','75%','100%','25%'],2,'Pharmacokinetics'),
      ],
      biochemistry: [
        Q('Enzyme that unwinds DNA: ?',['Helicase','Ligase','Polymerase','Primase'],0,'Molecular Bio'),
        Q('ATP is produced in: ?',['Nucleus','Mitochondria','Ribosome','ER'],1,'Metabolism'),
        Q('Insulin lowers: ?',['Blood glucose','Blood pressure','Heart rate','Temperature'],0,'Hormones'),
        Q('pH of stomach: ?',['1-2','3-4','5-6','7'],0,'Digestion'),
      ],
    },
  },
};

// Helper: get all questions for a given path
export function getQuestions(level, branch, subject) {
  try {
    if (level === 'college') return QUIZ_BANK.college[branch][subject] || [];
    return QUIZ_BANK[level]?.[branch] || [];
  } catch { return []; }
}

// Get random question
export function getRandomQuestion(level, branch, subject) {
  const pool = getQuestions(level, branch, subject);
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Subject display names
export const SUBJECT_LABELS = {
  // School
  math:'Mathematics', science:'Science', english:'English',
  physics:'Physics', chemistry:'Chemistry', biology:'Biology',
  computerScience:'Computer Science',
  // CS
  dsa:'Data Structures & Algorithms', dbms:'Database Management',
  os:'Operating Systems', cn:'Computer Networks',
  oop:'Object Oriented Programming', toc:'Theory of Computation',
  ai:'Artificial Intelligence & ML',
  // ECE
  digitalElectronics:'Digital Electronics', signals:'Signals & Systems',
  communication:'Communication Systems', microprocessors:'Microprocessors',
  // ME
  thermodynamics:'Thermodynamics', fluidMechanics:'Fluid Mechanics',
  engineeringMechanics:'Engineering Mechanics',
  // Civil
  structuralAnalysis:'Structural Analysis', soilMechanics:'Soil Mechanics',
  // EE
  circuitTheory:'Circuit Theory', powerSystems:'Power Systems',
  controlSystems:'Control Systems',
  // Medical
  anatomy:'Anatomy', physiology:'Physiology',
  pharmacology:'Pharmacology', biochemistry:'Biochemistry',
};

export const BRANCH_LABELS = {
  cs:'Computer Science (CS)', ece:'Electronics & Comm (ECE)',
  me:'Mechanical Engineering (ME)', civil:'Civil Engineering',
  ee:'Electrical Engineering (EE)', medical:'Medical (MBBS)',
};

export const BRANCH_SUBJECTS = {
  cs: ['dsa','dbms','os','cn','oop','toc','ai'],
  ece: ['digitalElectronics','signals','communication','microprocessors'],
  me: ['thermodynamics','fluidMechanics','engineeringMechanics'],
  civil: ['structuralAnalysis','soilMechanics'],
  ee: ['circuitTheory','powerSystems','controlSystems'],
  medical: ['anatomy','physiology','pharmacology','biochemistry'],
};

export const SCHOOL_SUBJECTS = {
  primary: ['math','science','english'],
  middle: ['math','science'],
  secondary: ['math','physics','chemistry','biology'],
  higher: ['math','physics','chemistry','biology','computerScience'],
};
