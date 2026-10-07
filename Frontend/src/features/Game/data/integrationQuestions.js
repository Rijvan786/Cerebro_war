// ─────────────────────────────────────────────────────────────────────────────
//  INTEGRATION QUESTION BANK
//  These questions require written/derivation answers, so they are NOT used
//  in the MCQ Arena game. They are kept here for reference / worksheet use.
// ─────────────────────────────────────────────────────────────────────────────

export const INTEGRATION_BANK = {

  // ── Class 12 Level ──────────────────────────────────────────────────────────
  class12: [
    {
      topic: 'Basic Integration',
      q: '∫ sin x dx = ?',
      ans: '−cos x + C',
      hint: 'Derivative of cos x is −sin x, so reverse it.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ cos x dx = ?',
      ans: 'sin x + C',
      hint: 'Derivative of sin x is cos x.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ eˣ dx = ?',
      ans: 'eˣ + C',
      hint: 'eˣ is its own derivative and integral.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ xⁿ dx = ?  (n ≠ −1)',
      ans: 'xⁿ⁺¹ / (n+1) + C',
      hint: 'Increase power by 1, divide by new power.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ 1/x dx = ?',
      ans: 'ln|x| + C',
      hint: 'Special case of power rule where n = −1.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ sec²x dx = ?',
      ans: 'tan x + C',
      hint: 'Derivative of tan x is sec²x.',
    },
    {
      topic: 'Basic Integration',
      q: '∫ 2x dx = ?',
      ans: 'x² + C',
      hint: 'Use power rule: ∫ axⁿ dx = a·xⁿ⁺¹/(n+1) + C.',
    },
    {
      topic: 'Definite Integrals',
      q: '∫₀³ 2x dx = ?',
      ans: '9',
      hint: '[x²]₀³ = 9 − 0 = 9.',
    },
    {
      topic: 'Definite Integrals',
      q: '∫₂⁵ 1 dx = ?',
      ans: '3',
      hint: '[x]₂⁵ = 5 − 2 = 3.',
    },
    {
      topic: 'Definite Integrals',
      q: '∫₀¹ x² dx = ?',
      ans: '1/3',
      hint: '[x³/3]₀¹ = 1/3 − 0 = 1/3.',
    },
  ],

  // ── B.Tech Level ─────────────────────────────────────────────────────────────
  btech: [
    {
      topic: 'Integration by Substitution',
      q: '∫ 2x·(x²+1)³ dx = ?',
      ans: '(x²+1)⁴ / 4 + C',
      hint: 'Let u = x²+1, then du = 2x dx.',
    },
    {
      topic: 'Integration by Parts',
      q: '∫ x·eˣ dx = ?',
      ans: 'xeˣ − eˣ + C = eˣ(x−1) + C',
      hint: 'Use IBP: ∫u dv = uv − ∫v du. Let u=x, dv=eˣdx.',
    },
    {
      topic: 'Integration by Parts',
      q: '∫ x·sin x dx = ?',
      ans: '−x cos x + sin x + C',
      hint: 'IBP: u=x, dv=sin x dx → du=dx, v=−cos x.',
    },
    {
      topic: 'Partial Fractions',
      q: '∫ 1/(x²−1) dx = ?',
      ans: '½ ln|(x−1)/(x+1)| + C',
      hint: 'Split: 1/(x²−1) = A/(x−1) + B/(x+1).',
    },
    {
      topic: 'Definite Integrals',
      q: '∫₀² x² dx = ?',
      ans: '8/3',
      hint: '[x³/3]₀² = 8/3.',
    },
    {
      topic: 'Definite Integrals',
      q: '∫₀^π sin x dx = ?',
      ans: '2',
      hint: '[−cos x]₀^π = −cos π + cos 0 = 1 + 1 = 2.',
    },
    {
      topic: 'Standard Forms',
      q: '∫ 1/√(1−x²) dx = ?',
      ans: 'sin⁻¹x + C',
      hint: 'Standard result from inverse trig.',
    },
    {
      topic: 'Standard Forms',
      q: '∫ 1/(1+x²) dx = ?',
      ans: 'tan⁻¹x + C',
      hint: 'Standard result: d/dx(tan⁻¹x) = 1/(1+x²).',
    },
  ],
};

// Helper to get all integration questions for a level
export function getIntegrationQuestions(level) {
  return INTEGRATION_BANK[level] || INTEGRATION_BANK.class12;
}
