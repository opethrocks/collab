import React, { useContext } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './components/Forms/LoginForm';
import Register from './components/Forms/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import Messages from './components/Messages/Messages';
import { UserContext } from './context/userContext';
import { MessageProvider } from './context/messageContext';
import styles from './styles/App.module.css';
import Aux from './hoc/Aux';
import Layout from './hoc/Layout';

axios.defaults.withCredentials = true;

const App = () => {
  const [state, setState] = useContext(UserContext);

  //Display notification box when status changes
  const displayNotification = () => {
    setTimeout(() => {
      setState((prevState) => {
        return { ...prevState, status: null };
      });
    }, 5000);
    return <p className={styles.successAlert}>{state.status}</p>;
  };

  return (
    <div className={styles.App}>
      <Router>
        <Layout />

        {/* If new status message flash notification box with message */}
        <div className={styles.alertContainer}>
          {state.status && displayNotification()}
        </div>

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
};

export default App;
