import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const useLogin = () => {
  const [state, setState] = useContext(UserContext);

  //Use credentials entered by user to make api call to api/login
  //to authenticate user and retrieve a login token.
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', {
        email: state.email,
        password: state.password,
      });

      setState({
        ...state,
        authenticated: true,
        username: res.data.username,
        errors: [{ msg: '', param: '' }],
        email: undefined,
        password: undefined,
        status: undefined,
      });
    } catch (err) {
      //If any errors, set appropriate state for error display on login component
      setState({ ...state, errors: err.response?.data.errors });
    }
  }
  //In order to log out, we make a request to api/logout to delete
  //the token from response object and unauthenticate the user.
  //We then redirect to the login page.
  async function handleLogout() {
    try {
      await axios.get('/api/logout');
      setState({});
    } catch (err) {
      console.log(err.message);
    }
  }

  return { handleLogin, handleLogout };
};

export default useLogin;
