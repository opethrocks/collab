import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Input from './Input';

import img from '../assets/icon.png';

function Register(props) {
  //Keep inputs in sync with application state in App.js

  const handleChange = (e) => {
    props.handleChange(e);
  };

  //Make post request to api; method passed as props from App.js

  const handleRegister = () => {
    props.handleInput();
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
        <img src={img} alt="" />

        <Input
          param="email"
          type="text"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('email')}

        <Input
          param="name"
          type="text"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('name')}

        <Input
          param="password"
          type="password"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('password')}

        <Input
          param="confirmPassword"
          type="password"
          serverErrors={props.serverErrors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('confirmPassword')}

        <button onClick={handleRegister}>Register</button>

        {/* Link to login if user already registered */}
        <p>
          Already registered?{' '}
          <Link to="/login" onClick={props.clearState}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
