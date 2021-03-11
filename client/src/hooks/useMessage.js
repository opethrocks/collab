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

  function formatDate(date) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

    const daysPassed = calcDaysPassed(new Date(), date);

    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const year = date.getFullYear();

    const hour = date.getHours();
    const minutes = `${date.getMinutes()}`.padEnd(2, 0);
    const amOrPm = `${hour < 12 ? 'AM' : 'PM'}`;

    if (daysPassed === 0) return `Today at ${hour}:${minutes} ${amOrPm}`;
    if (daysPassed === 1) return `Yesterday at ${hour}:${minutes} ${amOrPm}`;
    if (daysPassed >= 7) return `${daysPassed} days ago`;
    else {
      return new Intl.DateTimeFormat(navigator.locale).format();
      // return `${month}/${day}/${year} @ ${
      //   hour > 12 ? hour - 12 : hour
      // }:${minutes} ${hour < 12 ? 'AM' : 'PM'}`;
    }
  }

  function handleSend() {
    const date = new Date();

    setMsgState({
      ...msgState,
      text: '',
      messages: msgState.messages.concat({
        text: msgState.text,
        incoming: false,
        timestamp: formatDate(date),
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
