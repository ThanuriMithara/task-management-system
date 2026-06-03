import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
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

  const getStatusColor = (status) => {
    if (status === 'To Do') return '#ff4d4d';
    if (status === 'In Progress') return '#ffa500';
    if (status === 'Completed') return '#00c853';
    return '#gray';
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
        <h3>Your Tasks</h3>
        {error && <p style={styles.error}>{error}</p>}

        {/* Kanban Board */}
        <div style={styles.kanban}>
          {/* To Do Column */}
          <div style={styles.column}>
            <h4 style={{...styles.columnTitle, backgroundColor: '#ff4d4d'}}>
              To Do
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
              In Progress
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
              Completed
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