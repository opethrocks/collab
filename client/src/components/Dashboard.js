import React from 'react';
import axios from 'axios';

function Dashboard() {
  const handleDashboard = () => {
    axios
      .post('http://localhost:5000/api/users/dashboard')
      .then((res) => console.log(res.cookie));
  };
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleDashboard}>Dashboard</button>
    </div>
  );
}

export default Dashboard;
