import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/icon.png';
import useLogin from '../hooks/useLogin';
import { UserContext } from '../context/userContext';
import styled from 'styled-components';

const TopNav = styled.nav`
  list-style-type: none;
  background-color: rgb(235, 245, 252);
  border-radius: 10px;
  @media screen and (min-width: 600px) {
    height: 50px;
  }
  height: 40px;
  position: sticky;
  top: 0;
`;

const StyledLink = styled(Link)`
  display: block;
  color: black;
  font-size: small;
  @media screen and (min-width: 600px) {
    font-size: medium;
    padding: 15px 15px;
  }
  text-align: center;
  padding: 10px 10px;
  text-decoration: none;
  &:hover {
    background-color: #75e4b9;
    border-radius: 10px;
  }
`;

const LeftItem = styled.li`
  float: left;
`;

const RightItem = styled.li`
  float: right;
`;

const Icon = styled.img`
  max-height: 40px;
  max-width: 40px;
  @media screen and {
    max-height: 50px;
    max-width: 50px;
  }
  float: left;
`;

function NavMenu() {
  const [state] = useContext(UserContext);

  //Logout function from useLogin hook
  const { handleLogout } = useLogin();

  return (
    <TopNav>
      <Icon className="icon" src={img} alt=""></Icon>

      <LeftItem>
        {state.authenticated && (
          <StyledLink to="/dashboard">Dashboard</StyledLink>
        )}
      </LeftItem>
      <LeftItem>
        {state.authenticated && (
          <StyledLink to="/messages">Messages</StyledLink>
        )}
      </LeftItem>

      {/* Tab to Login/Logout depending on whether we have successfull login*/}
      <RightItem>
        {state.authenticated ? (
          <StyledLink to="/login" onClick={handleLogout}>
            Logout
          </StyledLink>
        ) : (
          <StyledLink to="/login">Login</StyledLink>
        )}
      </RightItem>
      {/* Tab for register component */}
      <RightItem>
        {!state.authenticated && (
          <StyledLink to="/register">Register</StyledLink>
        )}
      </RightItem>
    </TopNav>
  );
}

export default NavMenu;
