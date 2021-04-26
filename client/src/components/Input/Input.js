import React from 'react';
import useLogin from '../../hooks/useLogin';
import styles from './Input.module.css';

const Input = (props) => {
  const { handleLogin } = useLogin();

  //Apply error class to inputs if errors are present
  const applyErrorClass = (paramName) => {
    const param = props.serverErrors?.find((err) => err.param === paramName);
    if (param) return styles.error;

    return '';
  };

  //Keep input in sync with state in UserContext
  // const handleInput = (e) => {
  //   props.handleChange();
  // };

  //Format label for inputs based on value passed in
  const createLabel = (param) => {
    if (param !== 'confirmPassword')
      return param
        .split()
        .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
        .join('');

    return 'Confirm password';
  };

  //Display error messages in red under input boxes
  const displayErrorMessage = (type) => {
    if (props.serverErrors?.find((err) => err.param === type)) {
      return props.serverErrors?.filter((err) => err.param === type)[0].msg;
    }
  };

  //Create placeholder for inputs based on value passed in
  const createPlaceholder = (param) => {
    if (param === 'confirmPassword') return 'Re-enter password';
    if (param === 'username') return 'Enter username';
    return `Enter ${param}`;
  };

  const createInputComponent = (param, type) => {
    let err = props.serverErrors?.find((err) => err.param === type)
      ? props.serverErrors?.filter((err) => err.param === type)[0].msg
      : `Enter ${param}`;

    return (
      <div className={styles.Input}>
        <label>{createLabel(param)}</label>
        <form onSubmit={props.submit}>
          <input
            className={applyErrorClass(param)}
            type={type}
            name={param}
            id={param}
            placeholder={err}
            onChange={props.handleChange}
          />
        </form>
      </div>
    );
  };
  return <div>{createInputComponent(props.param, props.type)}</div>;
};

export default Input;
