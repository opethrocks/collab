import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const useLogin = () => {
  const [authState, setAuthState] = useContext(UserContext);

  //Use credentials entered by user to make api call to api/login
  //to authenticate user and retrieve a login token.

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        email: authState.email,
        password: authState.password,
      });

      setAuthState({
        authenticated: true,
        username: res.data.username,
        errors: [{ msg: '', param: '' }],
      });
    } catch (err) {
      //If any errors, set appropriate state for error display on login component
      setAuthState((prevState) => {
        return { ...prevState, errors: err.response?.data.errors };
      });
    }
  };

  const loginInputChangeHanlder = (e) => {
    if (e.target.value === '')
      setAuthState({ email: undefined, password: undefined });
    if (e.target.name === 'email')
      setAuthState((prevState) => {
        return { ...prevState, email: e.target.value };
      });
    if (e.target.name === 'password')
      setAuthState((prevState) => {
        return { ...prevState, password: e.target.value };
      });
  };

  //In order to log out, we make a request to api/logout to delete
  //the token from response object and unauthenticate the user.
  //We then redirect to the login page.

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout');
      setAuthState({ authenticated: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  const switchToRegisterHandler = () => {
    setAuthState({});
  };

  return {
    handleLogin,
    handleLogout,
    loginInputChangeHanlder,
    switchToRegisterHandler,
  };
};

export default useLogin;
