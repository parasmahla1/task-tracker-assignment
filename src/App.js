import React, { useState, useEffect, useMemo } from 'react';
import Login from './components/Login';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import Icon from './components/Icon';
import { 
  getUser, 
  getTasks, 
  addTask, 
  updateTask, 
  deleteTask,
  initializeSampleData,
  getDarkMode,
  saveDarkMode
} from './utils/localStorage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize app
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
    }
    
    const savedDarkMode = getDarkMode();
    setIsDarkMode(savedDarkMode);
    
    initializeSampleData();
    setTasks(getTasks());
  }, []);

  // Apply dark mode to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.background = '#1a1a1a';
      document.body.style.color = '#e9ecef';
    } else {
      document.body.style.background = '#f8f9fa';
      document.body.style.color = '#333';
    }
  }, [isDarkMode]);

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
  };

  // Handle dark mode toggle
  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    saveDarkMode(newMode);
  };

  // Task operations
  const handleAddTask = (taskData) => {
    addTask(taskData);
    setTasks(getTasks());
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData) => {
    updateTask(editingTask.id, taskData);
    setTasks(getTasks());
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks(getTasks());
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      updateTask(taskId, { completed: !task.completed });
      setTasks(getTasks());
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply status filter
    switch (filter) {
      case 'completed':
        result = result.filter(task => task.completed);
        break;
      case 'pending':
        result = result.filter(task => !task.completed);
        break;
      default:
        // 'all' - no additional filtering
        break;
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    return result;
  }, [tasks, filter, searchQuery]);

  // Calculate task counts
  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  }), [tasks]);

  // Show login if no user
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <Header 
        user={user} 
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />
      
      <main className="main-content">
        <div className="dashboard">
          <div className="dashboard-header">
            <h2>Your Tasks</h2>
            <button 
              onClick={() => setShowTaskForm(true)}
              className="add-task-button"
            >
              <Icon name="plus" size={18} />
              Add Task
            </button>
          </div>

          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      {showTaskForm && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleAddTask}
          onCancel={handleCancelForm}
          initialTask={editingTask}
        />
      )}
    </div>
  );
}

export default App;
