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

  handleLoginInput = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleRegisterInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isErrors: false
    });
    this.state.inputErrors.map((err) => {
      if (e.target.name === err.param) {
        this.setState({
          errors: [{ msg: '', param: '' }]
        });
      }
    });
  };

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

  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then((res) => {
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
        if (res.status === 200) {
          this.setState({
            isRegistered: true
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
          <nav>
            <ul>
              <li className="dashboard">
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                {this.state.token ? (
                  <Link onClick={this.handleLogout}>Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            {/* <Route path="/" exact component={Dashboard} /> */}
            <Route path="/login">
              <Login
                statusMsg={this.state.status}
                serverErrors={this.state.inputErrors}
                handleChange={this.handleLoginInput}
                handleInput={this.handleLogin}
                clearState={this.clearState}
              />
            </Route>
            <Route path="/register">
              <Register
                serverErrors={this.state.inputErrors}
                clearState={this.clearState}
                handleChange={this.handleRegisterInput}
                handleInput={this.handleRegister}
              />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
          {this.state.isRegistered && <Redirect to="/login" />}
          {this.state.token && <Redirect to="/dashboard" />}
        </div>
      </Router>
    );
  }
}

export default App;
