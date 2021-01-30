import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './SideMenu';
import { UserContext } from '../context/userContext';

function Dashboard(props) {
  const [state, setState] = useContext(UserContext);

  //Menu items to pass into the SideMenu component
  const menuItems = ['Notes', 'Documents', 'To-Do'];

  //On Component mount make api to api/tokenValidator to
  //validate the auth token, if not authenticated then log user out.
  useEffect(() => {
<<<<<<< HEAD
    axios.post('http://localhost:5000/api/dashboard').catch((err) => {
=======
    axios.post('/api/dashboard').catch((err) => {
>>>>>>> 852d9d6... Reinitialize
      setState((state) => ({
        ...state,
        authenticated: false,
        status: err.response.data.msg
      }));
    });
  });

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <h1>{`${state.username}'s dashboard`}</h1>
    </div>
  );
}

export default Dashboard;
