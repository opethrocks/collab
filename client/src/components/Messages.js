import React, { useContext, useEffect } from 'react';
import SideMenu from './SideMenu';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function Messages(props) {
  const [state, setState] = useContext(UserContext);

  const menuItems = ['Conversations', 'Group Messages', 'Favorites'];

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/messages', { token: props.token })
      .catch((err) =>
        setState((state) => ({ ...state, authenticated: false }))
      );
  });

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <h1>{`${state.name}'s Messages`}</h1>
    </div>
  );
}

export default Messages;
