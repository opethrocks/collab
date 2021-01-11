import React, { useState } from 'react';
import axios from 'axios';

function Dashboard(props) {
  axios.defaults.withCredentials = true;
  const [name, setName] = useState('user');
  const handleDashboard = () => {
    axios
      .post('http://localhost:5000/api/dashboard', { token: props.token })
      .then((res) => props.updateToken(res.data.token));
  };

  return (
    <div>
      <h1>Welcome {name}</h1>
      <button onClick={handleDashboard}>Dashboard</button>
    </div>
  );
}

export default Dashboard;
