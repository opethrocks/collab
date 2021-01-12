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
import img from './assets/icon.png';

axios.defaults.withCredentials = true;

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistered: false,
      inputErrors: [{ msg: '', param: '' }],
      status: '',
      token: undefined,
      name: undefined
    };
  }

  //User input from login component

  handleInput = (e) => {
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
      status: ''
    });
  };

  //Create post request for login and add errors to state

  handleLogin = () => {
    const { email, password } = this.state;

    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          this.clearState();
          this.setState({
            ...this.state,
            token: res.data.token,
            name: res.data.name
          });
        }
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        console.log(error);
        this.setState({
          ...this.state,
          inputErrors: error.response.data.errors
        });
      });
  };

  //Create post request for register component

  handleRegister = () => {
    const { email, password, name, confirmPassword } = this.state;

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
            ...this.state,
            isRegistered: true,
            status: res.data.msg
          });
        }
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        if (error.response.status === 400) {
          this.setState({
            ...this.state,
            inputErrors: error.response.data.errors
          });
        }
        //If user is already registered
        if (error.response.status === 403) {
          this.setState({
            ...this.state,
            isRegistered: true,
            status: error.response.data.msg
          });
        }
      });
  };

  handleLogout = () => {
    this.setState({
      ...this.state,
      token: undefined
    });
  };

  updateToken = (newToken) => {
    this.setState({
      ...this.state,
      token: newToken
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          {/* Navigation bar */}
          <nav>
            <ul>
              <img className="icon" src={img} alt="" />

              {/* Tab to Login/Logout depending on whether we have an auth token */}
              <li>
                {this.state.token ? (
                  <Link to="/login" onClick={this.handleLogout}>
                    Logout
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              {/* Tab for register component */}
              <li>
                {!this.state.token && <Link to="/register">Register</Link>}
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/" exact />
            {/* Login route */}
            <Route path="/login">
              <Login
                statusMsg={this.state.status}
                serverErrors={this.state.inputErrors}
                handleChange={this.handleInput}
                handleInput={this.handleLogin}
                clearState={this.clearState}
              />
            </Route>
            {/* Register route */}
            <Route path="/register">
              <Register
                serverErrors={this.state.inputErrors}
                clearState={this.clearState}
                handleChange={this.handleInput}
                handleInput={this.handleRegister}
              />
            </Route>
            {/* Dashboard route */}
            <Route path="/dashboard">
              <Dashboard
                token={this.state.token}
                updateToken={this.updateToken}
                name={this.state.name}
              />
            </Route>
          </Switch>
          {/* Redirect to login if user is registered */}

          {this.state.isRegistered && <Redirect to="/login" />}

          {/* Redirect to login if user logs out */}

          {!this.state.token && <Redirect to="/login" />}

          {/* Redirect to Dashboard if user is logged in */}

          {this.state.token && <Redirect to="/dashboard" />}
        </div>
      </Router>
    );
  }
}

export default App;
