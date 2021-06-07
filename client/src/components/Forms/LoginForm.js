import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/userContext';
import styles from './Form.module.css';
import Logo from '../Logo/Logo';

const LoginForm = () => {
  const [loginState] = useContext(UserContext);

  const {
    handleLogin,
    loginInputChangeHanlder,
    switchToRegisterHandler,
  } = useLogin();

  //Display error messages in red under input boxes
  const displayErrorMessage = (name) => {
    if (loginState.errors?.find((err) => err.param === name)) {
      return (
        <p className={styles.errorMsg}>
          {loginState.errors?.filter((err) => err.param === name)[0].msg}
        </p>
      );
    }
  };

  return (
    <div className={styles.Form}>
      <div className={styles.box}>
        <Logo height="120px" />
        <Input
          param="email"
          type="text"
          serverErrors={loginState.errors}
          handleChange={loginInputChangeHanlder}
          submit={handleLogin}
        />

        {/* If errors are present for this element, display red text denoting error message */}
        {displayErrorMessage('email')}

        <Input
          param="password"
          type="password"
          serverErrors={loginState.errors}
          handleChange={loginInputChangeHanlder}
          submit={handleLogin}
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
            onClick={switchToRegisterHandler}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
