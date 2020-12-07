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
        {props.serverErrors.find((err) => err.msg !== '') &&
          props.serverErrors.map((err) => (
            <div className="success-alert" key={err.msg}>
              <strong>{err.msg}</strong>
            </div>
          ))}
        <img src={img} alt="" />
        <label className="label">Email</label>
        <form className="box-flex">
          <input
            className="input"
            type="text"
            name="email"
            id="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </form>
        <label className="label">Password</label>

        <form className="box-flex">
          <input
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            onChange={handleChange}
          />
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
