import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import img from '../../assets/icon.png';
import useRegister from '../../hooks/useRegister';
import { UserContext } from '../../context/userContext';
import styles from './Dialogue.module.css';

function Register() {
  const [state, setState] = useContext(UserContext);

  //Register function to make api call to server
  const { handleRegister } = useRegister();

  //Keep input in sync with UserContext state
  const handleChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setState((state) => ({ ...state, email: e.target.value }));
        break;
      case 'username':
        setState((state) => ({ ...state, username: e.target.value }));
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

  //Display error messages in red under input boxes
  const displayErrorMessage = (name) => {
    if (state.errors?.find((err) => err.param === name)) {
      return (
        <div className={styles.errorMsg}>
          {state.errors?.filter((err) => err.param === name)[0].msg}
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

        {/* If errors are present display error message in red */}
        {displayErrorMessage('email')}

        <Input
          param="username"
          type="text"
          serverErrors={state.errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('username')}

        <Input
          param="password"
          type="password"
          serverErrors={state.errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('password')}

        <Input
          param="confirmPassword"
          type="password"
          serverErrors={state.errors}
          handleChange={handleChange}
        />

        {/* If errors are present display error message in red */}
        {displayErrorMessage('confirmPassword')}

        <button className="login-button" onClick={handleRegister}>
          Register
        </button>

        {/* Link to login if user already registered */}
        <p>
          Already registered?{' '}
          <Link to="/login" onClick={() => setState((state) => ({}))}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
