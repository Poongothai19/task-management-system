import { Search, Filter, Plus } from "lucide-react";

export default function FilterBar({ search, setSearch, status, setStatus, onAdd }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <Filter size={15} className="filter-icon" />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <button className="btn-primary" onClick={onAdd}>
        <Plus size={16} />
        <span>Add Task</span>
      </button>
    </div>
  );
}
