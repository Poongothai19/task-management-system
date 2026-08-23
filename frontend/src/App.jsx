import { useEffect, useState, useCallback } from "react";
import * as api from "./services/api";
import { useAuth } from "./context/AuthContext";
import { useTheme } from "./context/ThemeContext";
import { User, Sun, Moon, LogOut, CheckSquare, Loader2 } from "lucide-react";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  const { user, token, loading: authLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [page, setPage] = useState("login"); // "login" | "register"
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (status) params.status = status;
      if (search) params.search = search;
      const res = await api.getTasks(params);
      setTasks(res.data.data);
    } catch (err) {
      setError("Failed to load tasks. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  useEffect(() => {
    if (!token) return;
    const delay = setTimeout(fetchTasks, 300);
    return () => clearTimeout(delay);
  }, [fetchTasks, token]);

  const handleAdd = () => { setEditingTask(null); setShowForm(true); };
  const handleEdit = (task) => { setEditingTask(task); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await api.deleteTask(id);
      fetchTasks();
    } catch {
      setError("Failed to delete task.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingTask) {
        await api.updateTask(editingTask._id, formData);
      } else {
        await api.createTask(formData);
      }
      setShowForm(false);
      fetchTasks();
    } catch {
      setError("Failed to save task.");
    }
  };

  // Show spinner while checking existing token
  if (authLoading) {
    return (
      <div className="state-msg" style={{ marginTop: "40vh" }}>
        <Loader2 className="spinner" size={24} />
        <span>Loading...</span>
      </div>
    );
  }

  // Not logged in — show auth pages
  if (!token) {
    return page === "login"
      ? <LoginPage onSwitch={() => setPage("register")} />
      : <RegisterPage onSwitch={() => setPage("login")} />;
  }

  // Logged in — show dashboard
  return (
    <div className="container">
      {/* Header */}
      <div className="app-header">
        <div className="header-brand">
          <CheckSquare className="brand-icon" size={26} />
          <h1>Task Management Dashboard</h1>
        </div>
        <div className="header-actions">
          <span className="welcome-text">
            <User size={15} />
            <span>{user?.name}</span>
          </span>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="btn-danger btn-sm" onClick={logout} title="Log Out">
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onAdd={handleAdd}
      />

      {loading && (
        <div className="state-msg">
          <Loader2 className="spinner" size={20} />
          <span>Loading tasks...</span>
        </div>
      )}
      {error && <div className="state-msg error-text">{error}</div>}
      {!loading && !error && tasks.length === 0 && (
        <div className="state-msg">No tasks found. Click "+ Add Task" to get started!</div>
      )}

      {!loading &&
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

      {showForm && (
        <TaskForm
          initialData={editingTask}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}
