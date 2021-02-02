const express = require('express');
const WebSocket = require('ws');

const router = express.Router();

const tokenValidator = require('../../middlewares/tokenValidator');

const port = process.env.PORT || 8080;

//Web socket server
const wss = new WebSocket.Server({ port });

//Broadcast messages to all connected clients
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

router.post('/', tokenValidator(), (req, res, next) => {
  next();
});

module.exports = router;
