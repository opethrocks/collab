import React, { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { v4 as uuidv4 } from 'uuid';
import styles from './Sidebar.module.css';

function SideMenu() {
  const [state] = useContext(UserContext);

  const activeUsers = () => {
    const users = [...state.users];
    return users.map((user) => <p key={uuidv4()}>{user.username}</p>);
  };

  return (
    <div className={styles.sidebar}>
      <p>test</p>
      <div>{activeUsers()}</div>
    </div>
  );
}

export default SideMenu;
