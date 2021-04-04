const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const chatSocket = require('./server/sockets/chatSocket');
const mongooseInit = require('./server/mongoose/Mongoose');
require('dotenv').config();

const app = express();

//Port
const port = process.env.PORT || 5000;

// //determine environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cookie Parser
app.use(cookieParser());

//Connect to mongoose db
mongooseInit();

//Cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

//Configure routes
app.use('/api', require('./server/routes'));

const httpServer = require('http')
  .createServer(app)
  .listen(port, () => console.log(`Server running on port ${port}`));

//Start SocketIO chat server
chatSocket(httpServer, corsOptions);
