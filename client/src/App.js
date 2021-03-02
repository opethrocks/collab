import React, { useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Messages from './components/Messages';
import { UserContext } from './context/userContext';
import { MessageProvider } from './context/messageContext';
import { createGlobalStyle } from 'styled-components';
import './styles/Font.css';

axios.defaults.withCredentials = true;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    position: relative;
    margin: 50px 0px 70px 0px;
  }
`;

function App() {
  const [state] = useContext(UserContext);

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
    <div>
      <GlobalStyle />
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
