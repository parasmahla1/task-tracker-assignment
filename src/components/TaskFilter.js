import React from 'react';
import Icon from './Icon';
import './TaskFilter.css';

const TaskFilter = ({ 
  filter, 
  onFilterChange, 
  taskCounts = { all: 0, completed: 0, pending: 0 } 
}) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all, icon: 'filterAll' },
    { key: 'pending', label: 'Pending', count: taskCounts.pending, icon: 'filterPending' },
    { key: 'completed', label: 'Completed', count: taskCounts.completed, icon: 'filterCompleted' }
  ];

  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {filters.map(({ key, label, count, icon }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`filter-button ${filter === key ? 'active' : ''}`}
          >
            <Icon name={icon} size={18} />
            <span className="filter-label">{label}</span>
            <span className="filter-count">{count}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;
