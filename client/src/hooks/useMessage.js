import { useContext } from 'react';
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext';
import { send, registerOnMessageCallback } from '../websocket';
import axios from 'axios';

const UseMessage = () => {
  registerOnMessageCallback(recieveMessage);

  const [msgState, setMsgState] = useContext(MessageContext);
  const [state, setState] = useContext(UserContext);

  function recieveMessage(event) {
    let msg = JSON.parse(event);
    setMsgState((msgState) => ({
      ...msgState,
      messages: msgState.messages.concat({ text: msg.text, incoming: true })
    }));
  }

  function sendMessage() {
    const message = {
      username: state.username,
      text: msgState.text
    };
    send(JSON.stringify(message));
    handleOutgoing();
  }

  function checkAuth() {
    axios.post('/api/messages').catch((err) =>
      setState((state) => ({
        ...state,
        authenticated: false,
        status: err.response.data.msg
      }))
    );
  }

  function handleOutgoing() {
    setMsgState((msgState) => ({
      ...msgState,
      messages: msgState.messages.concat({
        text: msgState.text,
        incoming: false
      })
    }));
  }

  return { sendMessage, checkAuth };
};

export default UseMessage;
