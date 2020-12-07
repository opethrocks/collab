import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

import img from '../assets/icon.png';

function Register(props) {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleRegister = () => {
    props.handleInput();
  };

  const errMsg = '';

  return (
    <div className="page">
      <div className="box">
        <img src={img} alt="" />
        <label className="label">Email</label>
        <form className="box-flex">
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
            id={props.isErrors ? 'error' : 'input'}
            placeholder="What's your email address?"
            onChange={handleChange}
          />
          {props.serverErrors.find((err) => err.param === 'email') && (
            <p className="errorMsg">
              {props.serverErrors.filter((err) => err.param === 'email')[0].msg}
            </p>
          )}
        </form>

        <label className="label">Full Name</label>

        <form className="box-flex">
          <input
            className={
              props.serverErrors.find((err) => err.msg !== '') &&
              props.serverErrors.filter((err) => err.param === 'name').length >
                0
                ? 'error'
                : 'input'
            }
            type="text"
            name="name"
            id={props.isErrors ? 'error' : 'input'}
            placeholder="What's your name?"
            onChange={handleChange}
          />
          {props.serverErrors.find((err) => err.param === 'name') && (
            <p className="errorMsg">
              {props.serverErrors.filter((err) => err.param === 'name')[0].msg}
            </p>
          )}
        </form>
        <label className="label">Password</label>

        <form className="box-flex">
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
            id={props.isErrors ? 'error' : 'input'}
            placeholder="Enter a password with at least 8 characters"
            onChange={handleChange}
          />
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
          <input
            className={
              props.serverErrors.find((err) => err.msg !== '') &&
              props.serverErrors.filter((err) => err.param === 'password')
                .length > 0
                ? 'error'
                : 'input'
            }
            type="password"
            name="confirmPassword"
            id={props.isErrors ? 'error' : 'input'}
            placeholder="Re-enter Password"
            onChange={handleChange}
          />
          {props.serverErrors.find((err) => err.param === 'password') && (
            <p className="errorMsg">
              {
                props.serverErrors.filter((err) => err.param === 'password')[0]
                  .msg
              }
            </p>
          )}
        </form>
        <button onClick={handleRegister}>Register</button>
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
