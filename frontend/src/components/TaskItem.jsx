import { User, Calendar, Pencil, Trash2 } from "lucide-react";

export default function TaskItem({ task, onEdit, onDelete }) {
  const statusClass = `status-${task.status.replace(/\s/g, "")}`;

  return (
    <div className={`card card-${statusClass}`}>
      <div className="card-header">
        <strong className="card-title">{task.title}</strong>
        <span className={`status-badge ${statusClass}`}>{task.status}</span>
      </div>
      {task.description && <p className="card-desc">{task.description}</p>}
      <div className="card-meta">
        <span className="meta-item">
          <User size={14} className="meta-icon" />
          <strong>{task.assignedTo}</strong>
        </span>
        <span className="meta-divider">•</span>
        <span className="meta-item">
          <Calendar size={14} className="meta-icon" />
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        </span>
      </div>
      <div className="card-actions">
        <button className="btn-secondary btn-sm" onClick={() => onEdit(task)}>
          <Pencil size={14} />
          <span>Edit</span>
        </button>
        <button className="btn-danger btn-sm" onClick={() => onDelete(task._id)}>
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
