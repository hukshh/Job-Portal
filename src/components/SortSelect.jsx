import './SortSelect.css';

const OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'salary-high', label: 'Salary: high → low' },
  { value: 'salary-low', label: 'Salary: low → high' },
];

export const SortSelect = ({ value, onChange }) => (
  <div className="sort-select">
    <label htmlFor="sort-jobs" className="sr-only">Sort jobs by</label>
    <select
      id="sort-jobs"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);
