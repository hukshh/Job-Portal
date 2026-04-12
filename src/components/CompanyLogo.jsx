import './CompanyLogo.css';

/**
 * Generates a placeholder company logo using the company's initials.
 * Used in JobCard and JobDetailModal when no real logo is available.
 *
 * Same idea as Avatar but styled differently (square-ish, not circle)
 */

const COLORS = [
  ['#e0f2fe', '#0284c7'],
  ['#dcfce7', '#16a34a'],
  ['#fef9c3', '#ca8a04'],
  ['#ede9fe', '#7c3aed'],
  ['#fee2e2', '#dc2626'],
  ['#f3e8ff', '#9333ea'],
];

const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
};

export const CompanyLogo = ({ company, size = 40 }) => {
  const initials = company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const [bg, color] = getColor(company);

  return (
    <div
      className="company-logo"
      style={{ width: size, height: size, background: bg, color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
};
