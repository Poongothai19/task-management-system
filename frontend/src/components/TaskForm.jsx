import { useState } from "react";
import { X, Check, PlusCircle, Edit3 } from "lucide-react";

const EMPTY_FORM = {
  title: "",
  description: "",
  status: "Pending",
  assignedTo: "",
  dueDate: "",
};

export default function TaskForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(
    initialData
      ? { ...initialData, dueDate: initialData.dueDate?.slice(0, 10) }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.assignedTo.trim()) errs.assignedTo = "Assigned To is required";
    if (!form.dueDate) errs.dueDate = "Due date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            {initialData ? <Edit3 size={20} className="modal-title-icon" /> : <PlusCircle size={20} className="modal-title-icon" />}
            <h2>{initialData ? "Edit Task" : "Add New Task"}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Title *</label>
          <input
            name="title"
            placeholder="e.g. Design Homepage"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <div className="error-text">{errors.title}</div>}

          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            placeholder="Add any relevant notes or details..."
            value={form.description}
            onChange={handleChange}
          />

          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <label>Assigned To *</label>
          <input
            name="assignedTo"
            placeholder="e.g. John Doe"
            value={form.assignedTo}
            onChange={handleChange}
          />
          {errors.assignedTo && <div className="error-text">{errors.assignedTo}</div>}

          <label>Due Date *</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <div className="error-text">{errors.dueDate}</div>}

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              <X size={15} />
              <span>Cancel</span>
            </button>
            <button type="submit" className="btn-primary">
              <Check size={15} />
              <span>Save Task</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
