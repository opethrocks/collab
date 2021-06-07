import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;
