import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import img from '../assets/icon.png';
import useLogin from '../hooks/useLogin';
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
`;

const Error = styled.p`
  &.error-msg {
    align-self: flex-start;
    margin: 0px;
    color: red;
  }
`;

function Login() {
  const [state, setState] = useContext(UserContext);

  const { handleLogin } = useLogin();

  //Keep input in sync with state in UserContext
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setState((state) => ({ ...state, email: e.target.value }));
    } else if (e.target.name === 'password') {
      setState((state) => ({ ...state, password: e.target.value }));
    }
  };

  //Display error messages in red under input boxes
  const displayErrorMessage = (name) => {
    if (state.errors && state.errors.find((err) => err.param === name)) {
      return (
        <Error className="error-msg">
          {state.errors.filter((err) => err.param === name)[0].msg}
        </Error>
      );
    }
  };

  return (
    <LoginStyle className="page">
      <LoginStyle className="box">
        <Icon src={img} alt=""></Icon>
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

        <LoginButton onClick={handleLogin}>Login</LoginButton>

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
      </LoginStyle>
    </LoginStyle>
  );
}

export default Login;
