import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Menu.css';

function Dashboard(props) {
  const [name, setName] = useState(props.name);
  const [item, setItem] = useState('dashboard');

  const handleDashboard = () => {
    axios
      .post('http://localhost:5000/api/dashboard', { token: props.token })
      .then((res) => {
        props.updateToken(res.data.token);
        setName(res.data.name);
      });
  };

  return (
    <div>
      <div className="sidebar">
        <a
          id="dashboard"
          className={item === 'dashboard' ? 'active' : ''}
          onClick={() => setItem('dashboard')}
          href="#dashboard"
        >
          Dashboard
        </a>

        <a
          className={item === 'messages' ? 'active' : ''}
          onClick={() => setItem('messages')}
          id="messages"
          href="#messages"
        >
          Messages
        </a>
      </div>
      <h1>{`${name}'s dashboard`}</h1>
      <button onClick={handleDashboard}>Dashboard</button>
    </div>
  );
}

export default Dashboard;
