import React, { useContext, useEffect, useRef, Component } from 'react';
import useMessage from '../../hooks/useMessage';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MessageContext } from '../../context/messageContext';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context/userContext';
import socket from '../../socket';
import SideBar from '../Navigation/SideBar/SideBar';
import styles from './Messages.module.css';

library.add(fas, far, fab);

dom.i2svg();

const Messages = () => {
  const [msgState, setMsgState] = useContext(MessageContext);

  const { sendMessage, checkAuth, websocketConnect } = useMessage();

  useEffect(() => {
    checkAuth();
    //Open websocket connection
    websocketConnect();
  }, []);

  const handleMessages = () => {
    return msgState.messages.map((msg) => {
      msgState.incoming ? (
        <div>
          <div className={styles.incoming}>
            <p>From {msgState.user}</p>
            <p>{msg.timestamp}</p>
            <div className={styles.incoming}>
              <p className={styles.message}>{msg.text}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.outgoing}>
          <p>{msg.timestamp}</p>
          <div className={styles.outgoing}>
            <p className={styles.message}>{msg.text}</p>
          </div>
        </div>
      );
    });
    // return msgState.messages.map((msg) =>
    //   msg.incoming ? (
    //     <div>
    //       <div className="incoming-flex" key={uuidv4()}>
    //         {msgState.user && (
    //           <div>
    //             <p>From {msgState.user}</p>
    //             <p>{msg.timestamp}</p>
    //           </div>
    //         )}
    //       </div>
    //       <div className="incoming-flex">
    //         <div className="incoming-message">
    //           <p className="message">{msg.text}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="outgoing-flex" key={uuidv4()}>
    //       <p>{msg.timestamp}</p>
    //       <div className="outgoing-message">
    //         <p className="message">{msg.text}</p>
    //       </div>
    //     </div>
    //   )
    // );
  };

  const handleChange = (e) => {
    setMsgState({ text: e.target.value });
  };

  return (
    <div>
      <SideBar />
      <div className={styles.Messages}>
        <div className={styles.chat}>
          {/* {handleMessages()} */}
          <div key={uuidv4()}>{handleMessages}</div>
        </div>

        <form>
          <textarea value={msgState.text} onChange={handleChange}></textarea>
          <button onClick={sendMessage}>
            <img className="fas fa-paper-plane fa-2x" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
