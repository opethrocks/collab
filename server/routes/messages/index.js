const express = require('express');
const io = require('socket.io')(5001, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] }
});

const router = express.Router();

const tokenValidator = require('../../middlewares/tokenValidator');

//Socket io connection for messaging
io.on('connect', (socket) => {
  console.log('User has connected');
  socket.on('disconnect', () => console.log('user has disconnected'));
});

router.post('/', tokenValidator(), (req, res) => {});

module.exports = router;
