import React, { Component } from 'react';
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

axios.defaults.withCredentials = true;

export class App extends Component {
  state = {
    isRegistered: false,
    inputErrors: [{ msg: '', param: '' }],
    status: [{ msg: '' }]
  };

  //User input from login component

  handleLoginInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  //User input from register component

  handleRegisterInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  //Remove user input when switching between login and register components

  clearState = () => {
    this.setState({
      isRegistered: false,
      email: undefined,
      name: undefined,
      password: undefined,
      confirmPassword: undefined,
      inputErrors: [{ msg: '', param: '' }],
      status: [{ msg: '' }]
    });
  };

  //Create post request for login and add errors to state

  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then((res) => {
        //Set token from response
        this.setState({
          token: res.cookie.token
        });
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        this.setState({
          inputErrors: error.response.data.errors
        });
      });
  };

  //Create post request for register component

  handleRegister = () => {
    const email = this.state.email;
    const name = this.state.name;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    axios
      .post('http://localhost:5000/api/register', {
        email,
        name,
        password,
        confirmPassword
      })
      .then((res) => {
        //Upon successful registration
        if (res.status === 200) {
          this.setState({
            isRegistered: true,
            status: res.data.status
          });
        }
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        if (error.response.status == 400) {
          this.setState({
            inputErrors: error.response.data.errors
          });
        }
        //If user is already registered
        if (error.response.status == 403) {
          this.setState({
            isRegistered: true,
            status: error.response.data.status
          });
        }
      });
  };

  handleLogout = () => {
    axios.post('http://localhost:5000/api/users/logout');
  };

  render() {
    return (
      <Router>
        <div className="App">
          {/* Navigation bar */}
          <nav>
            <ul>
              {/* Tab to Dashboard */}
              <li className="dashboard">
                <Link to="/">Dashboard</Link>
              </li>
              {/* Tab to Login/Logout depending on whether we have an auth token */}
              <li>
                {this.state.token ? (
                  <Link onClick={this.handleLogout}>Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              {/* Tab for register component */}
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            {/* Login route */}
            <Route path="/login">
              <Login
                statusMsg={this.state.status}
                serverErrors={this.state.inputErrors}
                handleChange={this.handleLoginInput}
                handleInput={this.handleLogin}
                clearState={this.clearState}
              />
            </Route>
            {/* Register route */}
            <Route path="/register">
              <Register
                serverErrors={this.state.inputErrors}
                clearState={this.clearState}
                handleChange={this.handleRegisterInput}
                handleInput={this.handleRegister}
              />
            </Route>
            {/* Dashboard route */}
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
          {/* Redirect to login if user is registered */}
          {this.state.isRegistered && <Redirect to="/login" />}
          {/* Redirect to Dashboard if user is logged in */}
          {this.state.token && <Redirect to="/dashboard" />}
        </div>
      </Router>
    );
  }
}

export default App;
