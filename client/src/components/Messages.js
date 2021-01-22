import React, { useContext, useEffect } from 'react';
import SideMenu from './SideMenu';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { io } from 'socket.io-client';
import '../styles/Messages.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

dom.i2svg();

function Messages(props) {
  const [state, setState] = useContext(UserContext);

  const menuItems = ['Conversations', 'Group Messages', 'Favorites'];

  useEffect(() => {
    const socket = io('http://localhost:5001');
    axios
      .post('http://localhost:5000/api/messages', { token: props.token })
      .catch((err) =>
        setState((state) => ({ ...state, authenticated: false }))
      );
  });

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <div className="chat-container">
        <div className="chat-box">
          <div className="flex-container">
            <div className="incoming-message">
              Test message, Hello world i like turtles
            </div>
          </div>

          <div className="outgoing-message">
            Test message, Hello world I eat pizza
          </div>
        </div>
      </div>
      <button className="send-button">
        <i class="fas fa-paper-plane fa-2x"></i>
      </button>
      <div className="input-container">
        <textarea />
      </div>
    </div>
  );
}

export default Messages;
