import React, { useContext, useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage';
import '../styles/Messages.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MessageContext } from '../context/messageContext';
import { createWebSocketConnection, close } from '../websocket';

library.add(fas, far, fab);

dom.i2svg();

function Messages() {
  const [msgState, setMsgState] = useContext(MessageContext);
  const { sendMessage, checkAuth } = useMessage();

  const chat = useRef(null);

  const menuItems = ['Conversations', 'Group Messages', 'Favorites'];

  useEffect(() => {
    chat.current.scrollTop =
      chat.current.scrollHeight - chat.current.clientHeight;
  });

  useEffect(() => {
    checkAuth();
    createWebSocketConnection();
  }, []);

  useEffect(() => {
    return () => close();
  }, []);

  const handleSend = () => {
    sendMessage();
  };

  const handleMessages = () => {
    return msgState.messages.map((msg, index) => {
      if (msg.incoming) {
        return (
          <div className="incoming-flex" key={index}>
            {msgState.user && (
              <p>
                Message from {msgState.user} @ {msg.timestamp}
              </p>
            )}
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

  return (
    <div>
      <div className="chat-container" ref={chat}>
        <div className="chat-box">{handleMessages()}</div>
      </div>
      <div className="input-container">
        <textarea value={msgState.text} onChange={handleChange} />
        <button className="send-button" onClick={handleSend}>
          <i className="fas fa-paper-plane fa-2x"></i>
        </button>
      </div>
    </div>
  );
}

export default Messages;
