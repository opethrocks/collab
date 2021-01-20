import React, { useState } from 'react';
import '../styles/Menu.css';

function SideMenu(props) {
  const [activeItem, setActiveItem] = useState();
  const displayMenuItem = () => {
    return props.menuItem.map((item) => {
      return (
        <a
          id={item}
          onClick={() => setActiveItem(item)}
          className={activeItem === item ? 'active' : ''}
          href={`#${item}`}
        >
          {item}
        </a>
      );
    });
  };
  return <div className="sidebar">{displayMenuItem()}</div>;
}

export default SideMenu;
