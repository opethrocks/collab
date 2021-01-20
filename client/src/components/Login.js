import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import '../styles/Login.css';
import img from '../assets/icon.png';
import useLogin from '../hooks/useLogin';
import { UserContext } from '../context/userContext';

function Login() {
  const [state, setState] = useContext(UserContext);

  const { handleLogin, handleLogout } = useLogin();

  if (state.authenticated === false) handleLogout();

  //Keep input in sync with state in UserContext
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setState((state) => ({ ...state, email: e.target.value }));
    }
    setState((state) => ({ ...state, password: e.target.value }));
  };

  //Display error messages in red under input boxes
  const displayErrorMessage = (name) => {
    if (state.errors && state.errors.find((err) => err.param === name)) {
      return (
        <p className="errorMsg">
          {state.errors.filter((err) => err.param === name)[0].msg}
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
          serverErrors={state.errors}
          handleChange={handleChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('email')}

        <Input
          param="password"
          type="password"
          serverErrors={state.errors}
          handleChange={handleChange}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('password')}

        <button onClick={handleLogin}>Login</button>

        {/* Link to register if new user */}
        <p>
          New user?{' '}
          <Link
            to="/register"
            //Reset state errors and status on redirect to register
            onClick={() => setState((state) => ({}))}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
