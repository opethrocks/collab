import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import useRegister from '../../hooks/useRegister';
import { UserContext } from '../../context/userContext';
import styles from './Form.module.css';
import Logo from '../Logo/Logo';

const RegisterForm = () => {
  const [state] = useContext(UserContext);

  //Register function to make api call to server
  const {
    handleRegister,
    registerInputChangeHanlder,
    switchToLoginHandler,
  } = useRegister();

  //Display error messages in red under input boxes
  const displayErrorMessage = (name) => {
    if (state.errors?.find((err) => err.param === name)) {
      return (
        <p className={styles.errorMsg}>
          {state.errors?.filter((err) => err.param === name)[0].msg}
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
          serverErrors={state.errors}
          handleChange={registerInputChangeHanlder}
          submit={handleRegister}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('email')}

        <Input
          param="username"
          type="text"
          serverErrors={state.errors}
          handleChange={registerInputChangeHanlder}
          submit={handleRegister}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('username')}

        <Input
          param="password"
          type="password"
          serverErrors={state.errors}
          handleChange={registerInputChangeHanlder}
          submit={handleRegister}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('password')}

        <Input
          param="confirmPassword"
          type="password"
          serverErrors={state.errors}
          handleChange={registerInputChangeHanlder}
          submit={handleRegister}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('confirmPassword')}

        <button className="login-button" onClick={handleRegister}>
          Register
        </button>

        {/* Link to login if user already registered */}
        <p>
          Already registered?{' '}
          <Link to="/login" onClick={switchToLoginHandler}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
