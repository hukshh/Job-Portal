import { FILTER_TYPES } from '../constants/jobFilters';
import './SearchPanel.css';

export const SearchPanel = ({
  searchTerm,
  onSearch,
  selectedType,
  onSelectType,
  filters = FILTER_TYPES,
}) => (
  <section className="search-panel">
    <label htmlFor="search-input" className="sr-only">
      Search by role, company, or keyword
    </label>
    <input
      id="search-input"
      type="text"
      value={searchTerm}
      placeholder="Search by role, company, or keyword"
      onChange={(event) => onSearch(event.target.value)}
    />

    <div className="filter-row">
      {filters.map((filter) => (
        <button
          key={filter}
          className={filter === selectedType ? 'active' : ''}
          onClick={() => onSelectType(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  </section>
);

