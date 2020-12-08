import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import img from '../assets/icon.png';

function Login(props) {
  const handleLogin = () => {
    props.handleInput();
  };

  const handleChange = (e) => {
    props.handleChange(e);
  };

  return (
    <div className="page">
      <div className="box">
        {props.statusMsg.find((status) => status.msg !== '') &&
          props.statusMsg.map((status) => (
            <div className="success-alert" key={status.msg}>
              <strong>{status.msg}</strong>
            </div>
          ))}
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
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          {props.serverErrors.find((err) => err.param === 'email') && (
            <p className="errorMsg">
              {props.serverErrors.filter((err) => err.param === 'email')[0].msg}
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
            id="password"
            placeholder="Enter password"
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
        <button onClick={handleLogin}>Login</button>
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
