import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import '../styles/Login.css';
import img from '../assets/icon.png';
import axios from 'axios';

function Login(props) {
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [errors, setErrors] = useState([{ msg: '', param: '' }]);

  //Make login request to api/login

  const handleLogin = () => {
    axios
      .post('http://localhost:5000/api/login', { email, password })
      .then((res) => {
        if (res.status === 200) {
          props.login(res.data.token, res.data.name);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.errors);
        }
      });
  };

  //Keep input in sync with state

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  //Display error messages in red under input boxes

  const displayErrorMessage = (name) => {
    if (errors.find((err) => err.param === name)) {
      return (
        <p className="errorMsg">
          {errors.filter((err) => err.param === name)[0].msg}
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
          serverErrors={errors}
          handleChange={handleEmailChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('email')}

        <Input
          param="password"
          type="password"
          serverErrors={errors}
          handleChange={handlePasswordChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('password')}

        <button onClick={handleLogin}>Login</button>

        {/* Link to register if new user */}
        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
