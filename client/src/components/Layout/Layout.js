import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import NavMenu from '../Navigation/NavMenu/NavMenu';

class Layout extends Component {
  state = {};

  render() {
    return (
      <Aux>
        <NavMenu />
      </Aux>
    );
  }
}

export default Layout;
