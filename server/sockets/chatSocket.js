const chatConnect = function (httpServer, corsOptions) {
  const io = require('socket.io')(httpServer, {
    cors: corsOptions,
  });

  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    socket.username = username;
    next();
  });

  io.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({ userID: id, username: socket.username });
    }
    socket.emit('users', users);
  });

  io.on('connection', (socket) => {
    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username,
    });
  });
};

module.exports = chatConnect;
