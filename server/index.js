const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
require('dotenv').config();

const app = express();

//Body Parser
app.use(express.json());
app.use(express.urlencoded());

//Cors
app.use(cors());

//Port
const port = process.env.PORT || 5000;

//DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//Express session middleware to allow us to track user accross sessions
app.use(
  session({
    secret: 'Joan Villalobos',
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

//Configure routes
const users = require('./api/routes/users');
app.use('/api/users', users);

app.listen(port, () => console.log(`Server running on port ${port}`));
