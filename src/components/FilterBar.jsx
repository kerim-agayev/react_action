import './FilterBar.css'

const FILTERS = ['all', 'active', 'completed']

export default function FilterBar({ filter, onFilter }) {
  return (
    <div className="filter-bar">
      {FILTERS.map(f => (
        <button
          key={f}
          className={`filter-btn ${filter === f ? 'active' : ''}`}
          onClick={() => onFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}
