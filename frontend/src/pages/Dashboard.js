import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    due_date: '',
    assigned_to: 1
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data.tasks);
    } catch (err) {
      setError('Failed to fetch tasks!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowForm(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'Medium',
        due_date: '',
        assigned_to: 1
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to create task!');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const task = tasks.find(t => t.id === id);
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        ...task,
        status
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task!');
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h2 style={styles.navTitle}>Task Management System</h2>
        <div>
          <span style={styles.welcome}>Welcome, {user?.name}!</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h3>Your Tasks</h3>
          <button
            style={styles.addBtn}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Task'}
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {/* Task Creation Form */}
        {showForm && (
          <div style={styles.formBox}>
            <h4>Create New Task</h4>
            <form onSubmit={handleCreateTask}>
              <input
                style={styles.input}
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                required
              />
              <textarea
                style={styles.input}
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <select
                style={styles.input}
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                style={styles.input}
                type="date"
                value={newTask.due_date}
                onChange={(e) => setNewTask({...newTask, due_date: e.target.value})}
              />
              <button style={styles.submitBtn} type="submit">
                Create Task
              </button>
            </form>
          </div>
        )}

        {/* Kanban Board */}
        <div style={styles.kanban}>
          {/* To Do Column */}
          <div style={styles.column}>
            <h4 style={{...styles.columnTitle, backgroundColor: '#ff4d4d'}}>
              To Do ({tasks.filter(t => t.status === 'To Do').length})
            </h4>
            {tasks.filter(t => t.status === 'To Do').map(task => (
              <div key={task.id} style={styles.card}>
                <h5 style={styles.cardTitle}>{task.title}</h5>
                <p style={styles.cardDesc}>{task.description}</p>
                <p style={styles.cardPriority}>Priority: {task.priority}</p>
                <button
                  style={styles.moveBtn}
                  onClick={() => updateStatus(task.id, 'In Progress')}
                >
                  Move to In Progress →
                </button>
              </div>
            ))}
          </div>

          {/* In Progress Column */}
          <div style={styles.column}>
            <h4 style={{...styles.columnTitle, backgroundColor: '#ffa500'}}>
              In Progress ({tasks.filter(t => t.status === 'In Progress').length})
            </h4>
            {tasks.filter(t => t.status === 'In Progress').map(task => (
              <div key={task.id} style={styles.card}>
                <h5 style={styles.cardTitle}>{task.title}</h5>
                <p style={styles.cardDesc}>{task.description}</p>
                <p style={styles.cardPriority}>Priority: {task.priority}</p>
                <button
                  style={styles.moveBtn}
                  onClick={() => updateStatus(task.id, 'Completed')}
                >
                  Move to Completed →
                </button>
              </div>
            ))}
          </div>

          {/* Completed Column */}
          <div style={styles.column}>
            <h4 style={{...styles.columnTitle, backgroundColor: '#00c853'}}>
              Completed ({tasks.filter(t => t.status === 'Completed').length})
            </h4>
            {tasks.filter(t => t.status === 'Completed').map(task => (
              <div key={task.id} style={styles.card}>
                <h5 style={styles.cardTitle}>{task.title}</h5>
                <p style={styles.cardDesc}>{task.description}</p>
                <p style={styles.cardPriority}>Priority: {task.priority}</p>
                <p style={styles.done}>✅ Done!</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5'
  },
  navbar: {
    backgroundColor: '#1a73e8',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navTitle: {
    color: 'white',
    margin: 0
  },
  welcome: {
    color: 'white',
    marginRight: '15px'
  },
  logoutBtn: {
    padding: '8px 15px',
    backgroundColor: 'white',
    color: '#1a73e8',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  content: {
    padding: '30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addBtn: {
    padding: '10px 20px',
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  formBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#00c853',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  kanban: {
    display: 'flex',
    gap: '20px',
    marginTop: '20px'
  },
  column: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  columnTitle: {
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    textAlign: 'center',
    marginTop: 0
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  cardTitle: {
    margin: '0 0 5px 0',
    color: '#333'
  },
  cardDesc: {
    color: '#666',
    fontSize: '13px'
  },
  cardPriority: {
    fontSize: '12px',
    color: '#999'
  },
  moveBtn: {
    backgroundColor: '#1a73e8',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  done: {
    color: '#00c853',
    fontWeight: 'bold'
  },
  error: {
    color: 'red'
  }
};

export default Dashboard;