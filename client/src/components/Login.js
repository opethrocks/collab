import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import img from '../assets/icon.png';
import useLogin from '../hooks/useLogin';
import { UserContext } from '../context/userContext';
import styles from '../styles/Dialogue.module.css';

function Login() {
  const [state, setState] = useContext(UserContext);

  const { handleLogin } = useLogin();

  //Keep input in sync with state in UserContext
  const handleChange = (e) => {
    if (e.target.value === '')
      setState({ ...state, email: undefined, password: undefined });
    if (e.target.name === 'email')
      setState({ ...state, email: e.target.value });
    if (e.target.name === 'password')
      setState({ ...state, password: e.target.value });
  };

  //Display error messages in red under input boxes
  const displayErrorMessage = (type) => {
    if (state.errors?.find((err) => err.param === type)) {
      return (
        <div className={styles.errorMsg}>
          {state.errors?.filter((err) => err.param === type)[0].msg}
        </div>
      );
    }
  };

  return (
    <div className={styles.Dialogue}>
      <div className={styles.box}>
        <img src={img} alt=""></img>
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
