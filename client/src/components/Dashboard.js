import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import SideMenu from './SideMenu';
import { UserContext } from '../context/userContext';

function Dashboard(props) {
  const [state, setState] = useContext(UserContext);

  const menuItems = ['Notes', 'Documents', 'To-Do'];
  useEffect(() => {
    axios
      .post('http://localhost:5000/api/dashboard', { token: props.token })
      .catch((err) =>
        setState((state) => ({ ...state, authenticated: false }))
      );
  });

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <h1>{`${state.name}'s dashboard`}</h1>
    </div>
  );
}

export default Dashboard;
