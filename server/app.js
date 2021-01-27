const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const WebSocket = require('ws');
const path = require('path');

require('dotenv').config();

const app = express();

//Web socket server
const wss = new WebSocket.Server({
  noServer: true,
  autoAcceptConnections: false,
  clientTracking: true
});

//Broadcast messages to all connected clients

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cookie Parser
app.use(cookieParser());

//Cors
const corsOptions = { origin: 'http://localhost:3000', credentials: true };
app.use(cors(corsOptions));

//DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//Configure routes
app.use('/api', require('./routes'));

//determine environment
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(__dirname + '/public'));
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, resp) => {
    resp.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

//Port
const port = process.env.PORT || 5000;

var server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request);
  });
});
