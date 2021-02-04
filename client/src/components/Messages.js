import React, { useContext, useEffect } from 'react';
import SideMenu from './SideMenu';
import useMessage from '../hooks/useMessage';
import '../styles/Messages.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MessageContext } from '../context/messageContext';

library.add(fas, far, fab);

dom.i2svg();

function Messages() {
  const [msgState, setMsgState] = useContext(MessageContext);
  const { sendMessage, checkAuth, startWebsocket, wsConnection } = useMessage();

  const menuItems = ['Conversations', 'Group Messages', 'Favorites'];

  useEffect(() => {
    checkAuth();
    startWebsocket();
  }, []);

  const handleSend = () => {
    sendMessage();
    setMsgState((msgState) => ({ ...msgState, text: '' }));
  };

  const handleMessages = () => {
    return msgState.messages.map((msg, index) => {
      if (msg.incoming) {
        return (
          <div className="incoming-flex" key={index}>
            <p>{msg.timestamp}</p>
            <div className="incoming-message">{msg.text}</div>
          </div>
        );
      }
      return (
        <div className="outgoing-flex" key={index}>
          <p>{msg.timestamp}</p>
          <div className="outgoing-message">{msg.text}</div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    setMsgState((msgState) => ({ ...msgState, text: e.target.value }));
  };

  const checkWsConnection = () => {
    if (wsConnection.readyState === 'CLOSED') {
      startWebsocket();
    }
  };

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <div className="chat-container">
        <div className="chat-box">{handleMessages()}</div>
      </div>
      <button className="send-button" onClick={handleSend}>
        <i className="fas fa-paper-plane fa-2x"></i>
      </button>
      <div className="input-container">
        <textarea
          value={msgState.text}
          onChange={handleChange}
          onClick={checkWsConnection}
        />
      </div>
    </div>
  );
}

export default Messages;
