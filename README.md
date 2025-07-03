# React Task Tracker

A modern, responsive task management application built with React.js featuring user authentication, task CRUD operations, filtering, and local storage persistence.

## Features

### Features
- **Authentication**: Username-based authentication with localStorage persistence
- **Task Management**: 
  - Add new tasks with title and optional description
  - Edit existing tasks with inline modal editing
  - Delete tasks with confirmation dialog
  - Toggle task completion status
- **Task Display**: 
  - Clear visual distinction between completed and pending tasks
  - Creation date and time display
  - Task status indicators
- **Smart Filtering**: 
  - Filter by All, Completed, or Pending tasks
  - Real-time task count display for each filter
- **Data Persistence**: 
  - All data stored in localStorage
  - Automatic data restoration on page refresh
  - Sample data initialization for new users


## Tech Stack

- **Frontend**: React.js (Functional Components + Hooks)
- **Styling**: CSS3 
- **State Management**: React useState and useEffect hooks
- **Data Storage**: Browser localStorage API

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

### Deployed URL
```
react-task-tracker80.netlify.app
```

This creates an optimized production build in the `build` folder.
