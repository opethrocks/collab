import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import '../styles/Menu.css';

function SideMenu() {
  const [state] = useContext(UserContext);

  // const [activeItem, setActiveItem] = useState();
  // const displayMenuItem = () => {
  //   //Iterate menu items passed in from parent component
  //   return props.menuItem.map((item) => {
  //     return (
  //       <nav>
  //         <a
  //           key={item}
  //           onClick={() => setActiveItem(item)}
  //           className={activeItem === item ? 'active' : ''}
  //           href={`#${item}`}
  //         >
  //           {item}
  //         </a>
  //       </nav>
  //     );
  //   });
  // };
  return (
    <div className="sidebar">
      <h3>{`${state.username}'s messages`}</h3>
      {/* {displayMenuItem()} */}
    </div>
  );
}

export default SideMenu;
