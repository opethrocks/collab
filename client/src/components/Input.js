import React from 'react';
import '../styles/Login.css';

function Input(props) {
  //Apply error class to inputs if errors are present

  const applyErrorClass = (name) => {
    if (props.serverErrors.find((err) => err.msg !== '')) {
      if (props.serverErrors.filter((err) => err.param === name).length > 0) {
        return 'error';
      }
      return 'input';
    }
  };

  //Keep input in sync with application state; this method is passed as props from Register.js

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
    } else {
      return 'Confirm password';
    }
  };

  //Create placeholder for inputs based on value passed in

  const createPlaceholder = (param) => {
    if (param === 'confirmPassword') {
      return 'Re-enter your password';
    } else {
      return `Enter your ${param}`;
    }
  };

  const createInputComponent = (param, type) => {
    return (
      <div>
        <label className="label">{createLabel(param)}</label>
        <form className="box-flex">
          <input
            className={applyErrorClass(param)}
            type={type}
            name={param}
            id={param}
            placeholder={createPlaceholder(param)}
            onChange={handleChange}
          />
        </form>
      </div>
    );
  };
  return <div>{createInputComponent(props.param, props.type)}</div>;
}

export default Input;
