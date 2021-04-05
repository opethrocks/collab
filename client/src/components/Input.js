import React from 'react';
import styled from 'styled-components';
import useLogin from '../hooks/useLogin';

const LabelStyles = styled.label`
  display: flex;
  margin: 15px 0px 10px 5px;
  font-size: medium;
  font-weight: bold;
  @media screen and (min-width: 600px) {
    font-size: large;
    margin-top: 25px;
  }
`;

const InputStyles = styled.input`
  padding: 8px;
  font-size: medium;
  font-family: 'Montserrat', sans-serif;
  border: 2px solid rgb(155, 155, 155);
  border-radius: 5px;
  width: 250px;
  &.error {
    border: 1px solid red;
  }
  @media screen and (min-width: 600px) {
    font-size: large;
  }
`;

function Input(props) {
  const { handleLogin } = useLogin();
  //Apply error class to inputs if errors are present
  const applyErrorClass = (name) => {
    if (
      props.serverErrors &&
      props.serverErrors?.find((err) => err.msg !== '')
    ) {
      if (props.serverErrors?.filter((err) => err.param === name).length > 0) {
        return 'error';
      }
      return 'input';
    }
  };

  //Keep input in sync with state in UserContext
  const handleChange = (e) => {
    props.handleChange(e);
  };

  //Format label for inputs based on value passed in
  const createLabel = (param) => {
    if (param !== 'confirmPassword') {
      return param
        .split()
        .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
        .join('');
    }
    return 'Confirm password';
  };

  //Create placeholder for inputs based on value passed in
  const createPlaceholder = (param) => {
    if (param === 'confirmPassword') return 'Re-enter password';
    else if (param === 'username') return 'Enter username';
    else return `Enter ${param}`;
  };

  const createInputComponent = (param, type) => {
    return (
      <div>
        <LabelStyles>{createLabel(param)}</LabelStyles>

        <form onSubmit={handleLogin}>
          <InputStyles
            className={applyErrorClass(param)}
            type={type}
            name={param}
            id={param}
            placeholder={createPlaceholder(param)}
            onChange={handleChange}
          ></InputStyles>
        </form>
      </div>
    );
  };
  return <div>{createInputComponent(props.param, props.type)}</div>;
}

export default Input;
