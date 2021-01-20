import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

//Custom hook to register user and set appropriate state
const useRegister = () => {
  const [state, setState] = useContext(UserContext);

  const handleRegister = () => {
    axios
      .post('http://localhost:5000/api/register', {
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        name: state.name
      })
      .then((res) => {
        //Here we set user as registered, show a status message
        //and reset user credentials in state.
        setState((state) => ({
          ...state,
          registered: true,
          status: res.data.msg,
          email: undefined,
          password: undefined,
          confirmPassword: undefined,
          name: undefined
        }));
        //Reset error messages in order to show error notification
        //for 5 seconds
        setTimeout(() => {
          setState((state) => ({ ...state, status: undefined }));
        }, 5000);
      })
      //If any errors we set as status message notification
      .catch((err) => {
        if (err.response.status === 400) {
          setState((state) => ({ ...state, errors: err.response.data.errors }));
        }
        //If user already register we redirect to login
        //and reset user credentials in state
        if (err.response.status === 403) {
          setState((state) => ({
            ...state,
            registered: true,
            status: err.response.data.msg,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            name: undefined
          }));
        }
        //Reset error messages in order to show error notification
        //for 5 seconds
        setTimeout(() => {
          setState((state) => ({ ...state, status: undefined }));
        }, 5000);
      });
  };
  return { handleRegister };
};

export default useRegister;
