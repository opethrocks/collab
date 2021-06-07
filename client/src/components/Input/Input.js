import React from 'react';
import useLogin from '../../hooks/useLogin';
import styles from './Input.module.css';

const Input = (props) => {
  //Apply error class to inputs if errors are present
  const applyErrorClass = (paramName) => {
    const param = props.serverErrors?.find((err) => err.param === paramName);
    if (param) return styles.error;

    return '';
  };

  //Format label for inputs based on value passed in
  const createLabel = (param) => {
    if (param !== 'confirmPassword')
      return param
        .split()
        .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
        .join('');

    return 'Confirm password';
  };

  //Create placeholder for inputs based on value passed in
  const createPlaceholder = (param) => {
    if (param === 'confirmPassword') return 'Re-enter password';
    if (param === 'username') return 'Enter username';
    return `Enter ${param}`;
  };

  const createInputComponent = (param, type) => {
    return (
      <div className={styles.Input}>
        <label>{createLabel(param)}</label>
        <form onSubmit={props.submit}>
          <input
            className={applyErrorClass(param)}
            type={type}
            name={param}
            id={param}
            placeholder={createPlaceholder(param)}
            onChange={props.handleChange}
          />
        </form>
      </div>
    );
  };
  return <div>{createInputComponent(props.param, props.type)}</div>;
};

export default Input;
