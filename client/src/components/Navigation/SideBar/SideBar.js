import React, { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { v4 as uuidv4 } from 'uuid';
import classes from './Sidebar.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop';
import Logo from '../../Logo/Logo';

function SideBar(props) {
  const [state] = useContext(UserContext);

  // const activeUsers = () => {
  //   const users = [...state.users];
  //   return users.map((user) => <p key={uuidv4()}>{user.username}</p>);
  // };

  // let attachedClasses = [classes.SideDrawer, classes.Close];
  // if (props.open) {
  //   attachedClasses = [classes.SideDrawer, classes.Open];
  // }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={classes.SideDrawer}>
        {/* <div className={classes.Logo}>
          <Logo size="30px" />
        </div>
        <nav>
          <ul>
            <li>test</li>
          </ul>
        </nav> */}
      </div>
    </Aux>
  );
}

export default SideBar;
