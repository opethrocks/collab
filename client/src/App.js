import React, { useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './styles/App.css';
import img from './assets/icon.png';

axios.defaults.withCredentials = true;

function App() {
  const [token, setToken] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [registered, setRegistered] = useState(false);
  const [status, setStatus] = useState(undefined);
  // //Display notification box when status changes

  const displayNotification = () => {
    if (status) {
      return (
        <div className="success-alert">
          <strong>{status}</strong>
        </div>
      );
    }
  };

  //Set token and username based on response from api

  const handleLogin = (token, name) => {
    setToken(token);
    setName(name);
  };

  //Set registered to true and add status message from api/register

  const handleRegister = (status) => {
    setRegistered(true);
    setStatus(status);
  };

  //Set token from response from login api

  const updateToken = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation bar */}
        <nav>
          <ul>
            <img className="icon" src={img} alt="" />

            {/* Tab to Login/Logout depending on whether we have an auth token */}
            <li>
              {token ? (
                <Link to="/login" onClick={() => setToken(undefined)}>
                  Logout
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            {/* Tab for register component */}
            <li>{!token && <Link to="/register">Register</Link>}</li>
          </ul>
        </nav>
        {/* If new status message flash notification box with message */}
        {displayNotification()}

        <Switch>
          <Route path="/" exact />
          {/* Login route */}
          <Route path="/login">
            <Login login={handleLogin} />
          </Route>
          {/* Register route */}
          <Route path="/register">
            <Register register={handleRegister} />
          </Route>
          {/* Dashboard route */}
          <Route path="/dashboard">
            <Dashboard
              username={name}
              updateToken={updateToken}
              token={token}
            />
          </Route>
        </Switch>
        {/* Redirect to login if user is registered */}

        {registered && <Redirect to="/login" />}

        {/* Redirect to login if user logs out */}

        {!token && <Redirect to="/login" />}

        {/* Redirect to Dashboard if user is logged in */}

        {token && <Redirect to="/dashboard" />}
      </div>
    </Router>
  );
}

export default App;
