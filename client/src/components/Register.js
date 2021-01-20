import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Input from './Input';
import img from '../assets/icon.png';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function Register() {
  const [errors, setErrors] = useState([{ msg: '', param: '' }]);

  const [state, setState] = useContext(UserContext);

  //Keep input in sync with state

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        // setEmail(e.target.value);
        setState((state) => ({ ...state, email: e.target.value }));
        break;
      case 'name':
        setState((state) => ({ ...state, name: e.target.value }));
        break;
      case 'password':
        setState((state) => ({ ...state, password: e.target.value }));
        break;
      case 'confirmPassword':
        setState((state) => ({ ...state, confirmPassword: e.target.value }));
        break;
      default:
        break;
    }
  };

  //Make post request to api/register

  const handleRegister = () => {
    axios
      .post('http://localhost:5000/api/register', {
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        name: state.name
      })
      .then((res) =>
        setState((state) => ({
          ...state,
          registered: true,
          status: res.data.msg
        }))
      )
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.errors);
        }
        if (err.response.status === 403) {
          setState((state) => ({
            ...state,
            registered: true,
            status: err.response.data.msg
          }));
        }
      });
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
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('email')}

        <Input
          param="name"
          type="text"
          serverErrors={errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('name')}

        <Input
          param="password"
          type="password"
          serverErrors={errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('password')}

        <Input
          param="confirmPassword"
          type="password"
          serverErrors={errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('confirmPassword')}

        <button onClick={handleRegister}>Register</button>

        {/* Link to login if user already registered */}
        <p>
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
