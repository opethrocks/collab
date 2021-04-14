import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/icon.png';
import useLogin from '../../hooks/useLogin';
import { UserContext } from '../../context/userContext';
import styles from './NavMenu.module.css';

function NavMenu() {
  const [state] = useContext(UserContext);

  //Logout function from useLogin hook
  const { handleLogout } = useLogin();

  return (
    <nav className={styles.NavMenu}>
      <img className="icon" src={img} alt=""></img>

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
}

export default NavMenu;
