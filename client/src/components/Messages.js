import React, { useContext, useEffect, useRef } from 'react';
import useMessage from '../hooks/useMessage';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { MessageContext } from '../context/messageContext';
import { createWebSocketConnection, close } from '../websocket';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const MessageStyles = styled.div`
  .chat-container {
    position: relative;
  }

  .chat-box {
    padding: 10px;
    margin: 0px 15px 0px 15px;

    @media screen and (min-width: 600px) {
      margin: 0px 150px 0px 150px;
    }
  }

  .incoming-message {
    height: auto;
    max-width: 250px;
    border: 0.5px solid rgb(194, 194, 194);
    padding: 0px 10px 0px 10px;
    background-color: rgb(220, 239, 253);
    border-radius: 10px;
    box-shadow: 0 0 10px #75e4b9;
  }

  .incoming-flex {
    display: flex;
    flex-direction: column wrap;
    align-items: flex-start;
    font-size: medium;
    @media screen and (min-width: 600px) {
      font-size: large;
    }
  }

  .outgoing-message {
    height: auto;
    max-width: 250px;
    border: 0.5px solid rgb(194, 194, 194);
    padding: 0px 10px 0px 10px;
    background-color: rgb(135, 243, 202);
    border-radius: 10px;
    box-shadow: 0 0 10px #b8d8f0;
  }

  .message {
    word-wrap: break-word;
  }

  .outgoing-flex {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    @media screen and (min-width: 600px) {
      font-size: large;
    }
  }

  .input-area {
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    bottom: 0;
    @media screen and (min-width: 600px) {
      left: calc(25vw / 2);
    }
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin: 5px;
  font-size: large;
  font-family: 'Montserrat', sans-serif;
  border: 2px solid rgb(196, 196, 196);
  border-radius: 5px;
  outline: none;
  resize: none;
  width: 70vw;

  &:focus {
    border: 2px solid #75e4b9;
  }
`;

const Button = styled.button`
  background-color: #75e4b9;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  padding: 10px;
  outline: none;
  @media screen and (min-width: 600px) {
    padding: 15px;
  }
`;

library.add(fas, far, fab);

dom.i2svg();

function Messages() {
  const [msgState, setMsgState] = useContext(MessageContext);
  const { sendMessage, checkAuth } = useMessage();

  const chat = useRef(null);

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
    return msgState.messages.map((msg) => {
      if (msg.incoming) {
        return (
          <div key={uuidv4()}>
            <div className="incoming-flex">
              {msgState.user && (
                <div>
                  <p>From {msgState.user}</p>
                  <p>{msg.timestamp}</p>
                </div>
              )}
            </div>
            <div className="incoming-flex">
              <div className="incoming-message">
                <p className="message">{msg.text}</p>
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="outgoing-flex" key={uuidv4()}>
          <p>{msg.timestamp}</p>
          <div className="outgoing-message">
            <p className="message">{msg.text}</p>
          </div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    setMsgState((msgState) => ({ ...msgState, text: e.target.value }));
  };

  return (
    <MessageStyles className="chat-container">
      <MessageStyles className="chat-box" ref={chat}>
        {handleMessages()}
      </MessageStyles>

      <MessageStyles className="input-area">
        <TextArea value={msgState.text} onChange={handleChange}></TextArea>
        <Button className="send-button" onClick={handleSend}>
          <i className="fas fa-paper-plane fa-2x"></i>
        </Button>
      </MessageStyles>
    </MessageStyles>
  );
}

export default Messages;
