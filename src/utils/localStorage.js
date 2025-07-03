// localStorage utility functions for tasks and user data

export const STORAGE_KEYS = {
  TASKS: 'taskTracker_tasks',
  USER: 'taskTracker_user',
  DARK_MODE: 'taskTracker_darkMode'
};

// Task operations
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error getting tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

export const addTask = (task) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    ...task,
    completed: false,
    priority: task.priority || 'medium',
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id, updates) => {
  const tasks = getTasks();
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
    saveTasks(tasks);
    return tasks[taskIndex];
  }
  return null;
};

export const deleteTask = (id) => {
  const tasks = getTasks();
  const filteredTasks = tasks.filter(task => task.id !== id);
  saveTasks(filteredTasks);
  return filteredTasks;
};

// User operations
export const getUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing user from localStorage:', error);
  }
};

// Initialize with sample data if no tasks exist
export const initializeSampleData = () => {
  const existingTasks = getTasks();
  if (existingTasks.length === 0) {
    const sampleTasks = [
      {
        id: 1,
        title: "Complete React assignment",
        description: "Build task tracker with login, task management, and filtering",
        completed: false,
        priority: 'high',
        createdAt: "2023-07-01T10:00:00Z"
      }
    ];
    saveTasks(sampleTasks);
  }
};

// Dark mode operations
export const getDarkMode = () => {
  try {
    const darkMode = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return darkMode === 'true';
  } catch (error) {
    console.error('Error getting dark mode from localStorage:', error);
    return false;
  }
};

export const saveDarkMode = (isDarkMode) => {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDarkMode.toString());
  } catch (error) {
    console.error('Error saving dark mode to localStorage:', error);
  }
};
