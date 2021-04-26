import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

//Custom hook to register user and set appropriate state
const useRegister = () => {
  const [state, setState] = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/register', {
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        username: state.username,
      });

      //Here we set user as registered, show a status message
      //and reset user credentials in state.
      setState({
        ...state,
        registered: true,
        status: res.data.msg,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        username: undefined,
      });
    } catch (err) {
      //If any errors we set as status message notification
      if (err.response.status === 400) {
        setState((prevState) => {
          return { ...prevState, errors: err.response.data.errors };
        });
      }
      //If user already register we redirect to login
      //and reset user credentials in state
      if (err.response.status === 403) {
        setState({
          ...state,
          registered: true,
          status: err.response.data.msg,
          email: undefined,
          password: undefined,
          confirmPassword: undefined,
          username: undefined,
        });
      }
    }
  };
  //Keep input in sync with UserContext state
  const registerInputChangeHanlder = (e) => {
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

  const switchToLoginHandler = () => {
    setState({});
  };

  return { handleRegister, registerInputChangeHanlder, switchToLoginHandler };
};

export default useRegister;
