import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import './TaskForm.css';

const TaskForm = ({ onSubmit, onCancel, initialTask = null }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || '');
      setPriority(initialTask.priority || 'medium');
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority: priority
    });

    // Reset form if not editing
    if (!initialTask) {
      setTitle('');
      setDescription('');
      setPriority('medium');
    }
    setError('');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
    onCancel();
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>{initialTask ? 'Edit Task' : 'Add New Task'}</h2>
          <button 
            type="button" 
            className="close-button"
            onClick={handleCancel}
            aria-label="Close form"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="task-title">Title *</label>
            <input
              type="text"
              id="task-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(''); 
              }}
              placeholder="Enter task title"
              className={error ? 'input-error' : ''}
              autoComplete="off"
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description (optional)"
              rows="4"
              autoComplete="off"
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {initialTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
