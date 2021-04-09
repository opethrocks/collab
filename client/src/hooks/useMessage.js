import { useContext } from 'react';
import { MessageContext } from '../context/messageContext';
import { UserContext } from '../context/userContext';
import socket from '../socket';
import axios from 'axios';

const UseMessage = () => {
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

    handleSend();
  }

  function formatDate(date) {
    const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

    const daysPassed = calcDaysPassed(new Date(), date);

    const hour = date.getHours();
    const minutes = `${date.getMinutes()}`.padEnd(2, 0);
    const amOrPm = `${hour < 12 ? 'AM' : 'PM'}`;

    if (daysPassed === 0) return `Today at ${hour}:${minutes} ${amOrPm}`;
    if (daysPassed === 1) return `Yesterday at ${hour}:${minutes} ${amOrPm}`;
    if (daysPassed >= 7) return `${daysPassed} days ago`;
    else {
      return new Intl.DateTimeFormat(navigator.locale).format();
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

  function webSocket() {
    //Get username from userContext and assign it to
    //socket.auth and connect socket to server
    const { username } = state;
    socket.auth = { username };
    socket.connect();

    //Display error messages to console
    //Will implement error messages in UI soon
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        console.log(err.message, username);
      }
    });

    //Build user object
    socket.on('users', (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      //put the current user first and then sort by username
      const userList = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      setState({ ...state, users: new Set(userList) });
    });
    //When user connects add username to state.users
    socket.on('user connected', (user) => {
      state.users.add(user);
    });
  }

  return { sendMessage, checkAuth, webSocket };
};

export default UseMessage;
