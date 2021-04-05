import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import styled from 'styled-components';
import '../styles/Menu.css';

const Sidebar = styled.div`
  margin: 0;
  padding: 0;
  width: 200px;
  background-color: rgb(235, 245, 252);
  position: absolute;
  height: 90%;
  overflow: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px#75e4b9;
`;

const StyledLink = styled.li`
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

//   .sidebar a {
//     display: block;
//     color: black;
//     padding: 16px;
//     text-decoration: none;
//   }

//   .sidebar a.active {
//     background-color: #75e4b9;
//     color: white;
//   }

//   .sidebar a:hover:not(.active) {
//     background-color: rgb(170, 170, 170);
//     color: white;
//   }

//   div.content {
//     margin-left: 200px;
//     padding: 1px 16px;
//     height: 1000px;
//   }

//   @media screen and (max-width: 700px) {
//     .sidebar {
//       width: 100%;
//       height: auto;
//       position: relative;
//     }
//     .sidebar a {
//       float: left;
//     }
//     div.content {
//       margin-left: 0;
//     }
//   }
// `;

function SideMenu() {
  const [state] = useContext(UserContext);

  const activeUsers = () => {
    const users = [...state.users];
    return users.map((user) => <p>{user.username}</p>);
  };

  return (
    <div className="sidebar">
      <p>test</p>
      <div>{activeUsers()}</div>
    </div>
  );
}

export default SideMenu;
