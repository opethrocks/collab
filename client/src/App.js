import React, { useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import './styles/App.css';
import './styles/Alert.css';
import { UserContext } from './context/userContext';
import { MessageProvider } from './context/messageContext';

import useLogin from './hooks/useLogin';
axios.defaults.withCredentials = true;

function App() {
  const [state] = useContext(UserContext);

  const { handleLogout } = useLogin();

  //If user is ever unauthenticated, make request to api/logout to
  //remove the token and log the user out
  if (state.authenticated === false) handleLogout();

  //Display notification box when status changes
  const displayNotification = () => {
    if (state.status) {
      return (
        <div className="success-alert">
          <strong>{state.status}</strong>
        </div>
      );
    }
  };

  return (
    <Router>
      <div className="App">
        <NavMenu />

        {/* If new status message flash notification box with message */}
        <div className="alert-box">{displayNotification()}</div>

        <Switch>
          <Route path="/" exact />
          {/* Login route */}
          <Route path="/login">
            <Login />
          </Route>
          {/* Register route */}
          <Route path="/register">
            <Register />
          </Route>
          {/* Dashboard route */}
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          {/* Messages route */}
          <Route path="/messages">
            <MessageProvider>
              <Messages />
            </MessageProvider>
          </Route>
        </Switch>
        {/* Redirect to login if user is registered */}
        {state.registered && <Redirect to="/login" />}

        {/* Redirect to login if user logs out */}
        {!state.authenticated && <Redirect to="/login" />}

        {/* Redirect to Dashboard if user is logged in */}
        {state.authenticated && <Redirect to="/dashboard" />}
      </div>
    </Router>
  );
}

export default App;
