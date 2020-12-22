import React from 'react';
import { Link } from 'react-router-dom';
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

  return (
    <div className="page">
      <div className="box">
        {/* If new status message flash notification box with message */}
        {props.statusMsg.find((status) => status.msg !== '') &&
          props.statusMsg.map((status) => (
            <div className="success-alert" key={status.msg}>
              <strong>{status.msg}</strong>
            </div>
          ))}
        <img src={img} alt="" />
        <label className="label">Email</label>
        <form className="box-flex">
          {/* Apply error class to input if errors are present */}
          <input
            className={
              props.serverErrors.find((err) => err.msg !== '') &&
              props.serverErrors.filter((err) => err.param === 'email').length >
                0
                ? 'error'
                : 'input'
            }
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          {/* If errors are present for this element, display red text denoting error message */}
          {displayErrorMessage('email')}
        </form>
        <label className="label">Password</label>
        <form className="box-flex">
          {/* Apply error class to input if errors are present */}
          <input
            className={
              props.serverErrors.find((err) => err.msg !== '') &&
              props.serverErrors.filter((err) => err.param === 'password')
                .length > 0
                ? 'error'
                : 'input'
            }
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
          {/* If errors are present for this element, display red text denoting error message */}
          {displayErrorMessage('password')}
        </form>
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
