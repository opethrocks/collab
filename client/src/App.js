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

export class App extends Component {
  state = {
    isRegistered: false,
    errors: [{ msg: '', param: '' }]
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
    this.state.errors.map((err) => {
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
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      errors: [{ msg: '', param: '' }]
    });
  };

  handleLogin = () => {
    const email = this.state.email;
    const password = this.state.password;

    axios
      .post('http://localhost:3000/api/login', { email, password })
      .then((res) => {
        this.setState({
          token: res.data.token
        });
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        if (error) {
          //Iterate response to extract message and parameter
          const errMsg = error.response.data.errors.map((err) => {
            return { msg: err.msg, param: err.param };
          });
          this.setState({
            errors: errMsg
          });
        }
      });
  };

  handleRegister = () => {
    const email = this.state.email;
    const name = this.state.name;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;

    axios
      .post('http://localhost:3000/api/register', {
        email,
        name,
        password,
        confirmPassword
      })
      .then((res) => {
        //If user exists, send error stating this and redirect to login
        if (res.status === 200) {
          this.setState({
            isRegistered: true,
            errors: [{ msg: res.data.error }]
          });
        }
      })
      .catch((error) => {
        //Iterate error response and retrieve error message
        if (error) {
          //Iterate response to extract message and parameter
          const errMsg = error.response.data.errors.map((err) => {
            return { msg: err.msg, param: err.param };
          });
          this.setState({
            errors: errMsg
          });
        }
      });
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
                <Link to="/login">Login</Link>
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
                serverErrors={this.state.errors}
                handleChange={this.handleLoginInput}
                handleInput={this.handleLogin}
                clearState={this.clearState}
              />
            </Route>
            <Route path="/register">
              <Register
                serverErrors={this.state.errors}
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
