import React, { useState } from 'react';
import Icon from './Icon';
import './TaskItem.css';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'priorityHigh';
      case 'low': return 'priorityLow';
      default: return 'priorityMedium';
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'high': return 'High Priority';
      case 'low': return 'Low Priority';
      default: return 'Medium Priority';
    }
  };

  const handleDelete = () => {
    if (showConfirm) {
      onDelete(task.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <div className="task-checkbox-container">
            <input
              type="checkbox"
              id={`task-${task.id}`}
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              className="task-checkbox"
            />
            <label htmlFor={`task-${task.id}`} className="checkbox-label">
              <Icon name="check" size={12} className="checkmark" />
            </label>
          </div>            <div className="task-details">
            <div className="task-title-row">
              <h3 className="task-title">{task.title}</h3>
              <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {formatDate(task.createdAt)}
              </span>
              <span className={`task-priority priority-${task.priority || 'medium'}`}>
                <Icon name={getPriorityIcon(task.priority || 'medium')} size={12} />
                {getPriorityLabel(task.priority || 'medium')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="action-button edit-button"
            title="Edit task"
          >
            <Icon name="edit" size={16} />
          </button>
          
          {!showConfirm ? (
            <button
              onClick={handleDelete}
              className="action-button delete-button"
              title="Delete task"
            >
              <Icon name="delete" size={16} />
            </button>
          ) : (
            <div className="delete-confirm">
              <button
                onClick={handleDelete}
                className="action-button confirm-delete"
                title="Confirm delete"
              >
                <Icon name="confirm" size={16} />
              </button>
              <button
                onClick={handleCancelDelete}
                className="action-button cancel-delete"
                title="Cancel delete"
              >
                <Icon name="cancel" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
