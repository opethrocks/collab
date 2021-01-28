import React, { useContext, useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import useMessage from '../hooks/useMessage';
import '../styles/Messages.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MessageContext } from '../context/messageContext';
import { startWebsocketConnection, close } from '../websocket';

library.add(fas, far, fab);

dom.i2svg();

function Messages() {
  const [msgState, setMsgState] = useContext(MessageContext);
  const [input, setInput] = useState();
  const { sendMessage, checkAuth } = useMessage();

  const menuItems = ['Conversations', 'Group Messages', 'Favorites'];

  useEffect(() => {
    checkAuth();
    startWebsocketConnection();

    return () => close();
  }, []);

  const handleSend = () => {
    sendMessage();
    setInput('');
  };

  const incomingMessages = () => {
    return msgState.messages.map((msg) => {
      return (
        <div className="flex-container">
          <div className="incoming-message">{msg.text}</div>
        </div>
      );
    });
  };

  const outgoingMessages = () => {
    return msgState.outgoing.map((msg) => {
      return (
        <div className="outgoing-flex">
          <div className="outgoing-message">{msg}</div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    setMsgState((msgState) => ({ ...msgState, text: input }));
  };

  return (
    <div>
      <SideMenu menuItem={menuItems} />
      <div className="chat-container">
        <div className="chat-box">
          {incomingMessages()}
          {outgoingMessages()}
        </div>
      </div>
      <button className="send-button" onClick={handleSend}>
        {/* <i className="fas fa-paper-plane fa-2x"></i> */}
      </button>
      <div className="input-container">
        <textarea value={input} onChange={handleChange} />
      </div>
    </div>
  );
}

export default Messages;
