/**
 * Calculates a profile completion score (0-100).
 * Each field has a weight — adjust as needed.
 */
const FIELDS = [
  { key: 'fullName',  weight: 20 },
  { key: 'headline', weight: 15 },
  { key: 'bio',      weight: 20 },
  { key: 'location', weight: 10 },
  { key: 'phone',    weight: 10 },
];

const RESUME_WEIGHT = 25;

/**
 * @param {Object} profile - user.profile object
 * @param {*} resume - user.resume (truthy = uploaded)
 * @returns {{ score: number, missing: string[] }}
 */
export const calcProfileCompletion = (profile = {}, resume = null) => {
  let score = 0;
  const missing = [];

  for (const field of FIELDS) {
    if (profile[field.key]?.trim()) {
      score += field.weight;
    } else {
      missing.push(field.key);
    }
  }

  if (resume) {
    score += RESUME_WEIGHT;
  } else {
    missing.push('resume');
  }

  return { score, missing };
};
