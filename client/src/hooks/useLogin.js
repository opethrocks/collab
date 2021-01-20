import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import axios from 'axios';

const useLogin = () => {
  const [state, setState] = useContext(UserContext);

  function handleLogin() {
    axios
      .post('http://localhost:5000/api/login', {
        email: state.email,
        password: state.password
      })
      .then((res) => {
        setState((state) => ({
          ...state,
          authenticated: true,
          name: res.data.name,
          errors: [{ msg: '', param: '' }],
          email: undefined,
          password: undefined
        }));
      })

      .catch((err) =>
        setState((state) => ({ ...state, errors: err.response.data.errors }))
      );
  }

  function handleLogout() {
    axios.get('http://localhost:5000/api/logout').then(() => {
      setState((state) => ({
        ...state,
        authenticated: false,
        name: undefined
      }));
    });
  }

  return { handleLogin, handleLogout };
};

export default useLogin;
