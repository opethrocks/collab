import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useLogin from '../../../hooks/useLogin';
import { UserContext } from '../../../context/userContext';
import Logo from '../../Logo/Logo';
import styles from './NavMenu.module.css';

const NavMenu = (props) => {
  const [state] = useContext(UserContext);

  //Logout function from useLogin hook
  const { handleLogout } = useLogin();

  return (
    <nav className={styles.NavMenu}>
      <Logo height="5px" clicked={props.toggleDrawer} />

      <li className={styles.leftItem}>
        {state.authenticated && <Link to="/dashboard">Dashboard</Link>}
      </li>
      <li className={styles.leftItem}>
        {state.authenticated && <Link to="/messages">Messages</Link>}
      </li>

      {/* Tab to Login/Logout depending on whether we have successfull login*/}
      <li className={styles.rightItem}>
        {state.authenticated ? (
          <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
      {/* Tab for register component */}
      <li className={styles.rightItem}>
        {!state.authenticated && <Link to="/register">Register</Link>}
      </li>
    </nav>
  );
};

export default NavMenu;
