import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/icon.png';
import useLogin from '../hooks/useLogin';
import { UserContext } from '../context/userContext';

function NavMenu() {
  const [state] = useContext(UserContext);

  const { handleLogout } = useLogin();

  return (
    <div>
      <nav>
        <ul>
          <img className="icon" src={img} alt="" />

          <li className="left-item">
            {state.authenticated && <Link to="/dashboard">Dashboard</Link>}
          </li>
          <li className="left-item">
            {state.authenticated && <Link to="/messages">Messages</Link>}
          </li>

          {/* Tab to Login/Logout depending on whether we have successfull login*/}
          <li className="right-item">
            {state.authenticated ? (
              <Link to="/login" onClick={() => handleLogout()}>
                Logout
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          {/* Tab for register component */}
          <li className="right-item">
            {!state.authenticated && <Link to="/register">Register</Link>}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavMenu;
