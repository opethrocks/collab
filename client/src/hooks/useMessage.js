import { useContext } from 'react';
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext';
import { registerOnMessageCallback, send } from '../websocket';

import axios from 'axios';

const UseMessage = () => {
  //Callback called when message is recieved from websocket
  registerOnMessageCallback(recieveMessage);

  const [msgState, setMsgState] = useContext(MessageContext);
  const [state, setState] = useContext(UserContext);

  function recieveMessage(event) {
    let msg = JSON.parse(event);
    setMsgState({
      ...msgState,
      user: msg.username,
      messages: msgState.messages.concat({
        text: msg.text,
        incoming: true,
        timestamp: new Date().toLocaleString(),
      }),
    });
  }

  function sendMessage() {
    const message = {
      username: state.username,
      text: msgState.text,
    };
    send(JSON.stringify(message));
    handleSend();
  }

  function handleSend() {
    setMsgState({
      ...msgState,
      text: '',
      messages: msgState.messages.concat({
        text: msgState.text,
        incoming: false,
        timestamp: new Date().toLocaleString(),
      }),
    });
  }

  async function checkAuth() {
    try {
      await axios.post('/api/messages');
    } catch (err) {
      setState({
        ...state,
        authenticated: false,
        status: err.response?.data.msg,
      });
    }
  }

  return { sendMessage, checkAuth };
};

export default UseMessage;
