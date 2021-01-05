import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import '../styles/Login.css';
import img from '../assets/icon.png';

function Login(props) {
  //Handle login methods passed from App.js; login when clicked

  const handleLogin = () => {
    props.handleInput();
  };

  //Keep input elements in sync with application state in App.js

  const handleChange = (e) => {
    props.handleChange(e);
  };

  //Display error messages in red under input boxes

  const displayErrorMessage = (name) => {
    if (props.serverErrors.find((err) => err.param === name)) {
      return (
        <p className="errorMsg">
          {props.serverErrors.filter((err) => err.param === name)[0].msg}
        </p>
      );
    }
  };

  //Display notification box when status changes

  const displayNotification = () => {
    if (props.statusMsg) {
      return (
        <div className="success-alert">
          <strong>{props.statusMsg}</strong>
        </div>
      );
    }
  };

  return (
    <div className="page">
      <div className="box">
        {/* If new status message flash notification box with message */}
        {displayNotification()}

        <img src={img} alt="" />
        <Input
          param="email"
          type="text"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('email')}

        <Input
          param="password"
          type="password"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('password')}

        <button onClick={handleLogin}>Login</button>

        {/* Link to register if new user */}
        <p>
          New user?{' '}
          <Link to="/register" onClick={props.clearState}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
