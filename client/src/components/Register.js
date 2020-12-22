import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

import img from '../assets/icon.png';

function Register(props) {
  //Keep inputs in sync with application state in App.js
  const handleChange = (e) => {
    props.handleChange(e);
  };

  //Make post request to api
  const handleRegister = () => {
    props.handleInput();
  };

  return (
    <div className="page">
      <div className="box">
        <img src={img} alt="" />
        <label className="label">Email</label>
        <form className="box-flex">
          {/* Apply error class if errors are present for this element */}
          <input
            className={
              props.serverErrors &&
              props.serverErrors.filter((err) => err.param === 'email').length >
                0
                ? 'error'
                : 'input'
            }
            type="text"
            name="email"
            id="input"
            placeholder="What's your email address?"
            onChange={handleChange}
          />
          {/* If errors are present display error message in red */}

          {props.serverErrors.find((err) => err.param === 'email') && (
            <p className="errorMsg">
              {props.serverErrors.filter((err) => err.param === 'email')[0].msg}
            </p>
          )}
        </form>

        <label className="label">Full Name</label>

        <form className="box-flex">
          {/* Apply error class if errors are present for this element */}
          <input
            className={
              props.serverErrors &&
              props.serverErrors.filter((err) => err.param === 'name').length >
                0
                ? 'error'
                : 'input'
            }
            type="text"
            name="name"
            id="input"
            placeholder="What's your name?"
            onChange={handleChange}
          />
          {/* If errors are present display error message in red */}
          {props.serverErrors.find((err) => err.param === 'name') && (
            <p className="errorMsg">
              {props.serverErrors.filter((err) => err.param === 'name')[0].msg}
            </p>
          )}
        </form>
        <label className="label">Password</label>

        <form className="box-flex">
          {/* Apply error class if errors are present for this element */}
          <input
            className={
              props.serverErrors &&
              props.serverErrors.filter((err) => err.param === 'password')
                .length > 0
                ? 'error'
                : 'input'
            }
            type="password"
            name="password"
            id="input"
            placeholder="Enter a password with at least 8 characters"
            onChange={handleChange}
          />
          {/* If errors are present display error message in red */}
          {props.serverErrors.find((err) => err.param === 'password') && (
            <p className="errorMsg">
              {
                props.serverErrors.filter((err) => err.param === 'password')[0]
                  .msg
              }
            </p>
          )}
        </form>
        <label className="label">Confirm password</label>

        <form className="box-flex">
          {/* Apply errors class if errors are present for this element */}
          <input
            className={
              props.serverErrors &&
              props.serverErrors.filter(
                (err) => err.param === 'confirmPassword'
              ).length > 0
                ? 'error'
                : 'input'
            }
            type="password"
            name="confirmPassword"
            id="input"
            placeholder="Re-enter Password"
            onChange={handleChange}
          />
          {/* If errors are present display error message in red */}

          {props.serverErrors.find(
            (err) => err.param === 'confirmPassword'
          ) && (
            <p className="errorMsg">
              {
                props.serverErrors.filter(
                  (err) => err.param === 'confirmPassword'
                )[0].msg
              }
            </p>
          )}
        </form>
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
