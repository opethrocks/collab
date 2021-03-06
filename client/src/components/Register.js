import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import img from '../assets/icon.png';
import useRegister from '../hooks/useRegister';
import { UserContext } from '../context/userContext';
import styled from 'styled-components';

const LoginStyle = styled.div`
  &.box {
    height: auto;
    border: 0.5px solid rgb(194, 194, 194);
    padding: 20px;
    margin: 30px;
    background-color: rgb(235, 245, 252);
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    @media screen and (min-width: 600px) {
      padding: 50px;
    }
  }

  &.page {
    display: flex;
    justify-content: center;
  }
`;

const LoginButton = styled.button`
  padding: 5px 20px 5px 20px;
  background-color: #75e4b9;
  font-size: medium;
  font-family: 'Montserrat', sans-serif;
  color: #000000;
  margin: 30px 0px 10px 0px;
  border-radius: 5px;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 96px;
  height: auto;
  @media screen and (min-width: 600px) {
    width: 128px;
  }
`;

const Error = styled.p`
  &.error-msg {
    align-self: flex-start;
    margin: 0px;
    color: red;
  }
`;

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
        <Error className="error-msg">
          {state.errors?.filter((err) => err.param === name)[0].msg}
        </Error>
      );
    }
  };

  return (
    <LoginStyle className="page">
      <LoginStyle className="box">
        <Icon src={img} alt="" />

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

        <LoginButton className="login-button" onClick={handleRegister}>
          Register
        </LoginButton>

        {/* Link to login if user already registered */}
        <p>
          Already registered?{' '}
          <Link to="/login" onClick={() => setState((state) => ({}))}>
            Login
          </Link>
        </p>
      </LoginStyle>
    </LoginStyle>
  );
}

export default Register;
