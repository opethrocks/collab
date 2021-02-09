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
    axios.post('/api/dashboard').catch((err) => {
      setState((state) => ({
        ...state,
        authenticated: false,
        status: err.response.data.msg,
      }));
    });
  });

  return (
    <div>
      <h1>{`${state.username}'s dashboard`}</h1>
    </div>
  );
}

export default Dashboard;
