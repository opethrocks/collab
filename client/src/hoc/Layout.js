import React, { useState } from 'react';
import Aux from './Aux';
import NavMenu from '../components/Navigation/NavMenu/NavMenu';
import SideBar from '../components/Navigation/SideBar/SideBar';

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const toggleSideDrawer = () => {
    setShowSideDrawer((prevState) => {
      return !prevState;
    });
  };

  return (
    <div>
      <NavMenu toggleDrawer={toggleSideDrawer} />
      <SideBar open={showSideDrawer} closed={toggleSideDrawer} />
    </div>
  );
};

export default Layout;
