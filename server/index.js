const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//Body Parser
app.use(bodyParser.json());

//Port
const port = process.env.PORT || 3000;

//DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const loginRoute = require('./routes/api/login');
const registerRoute = require('./routes/api/register');

//Define routes
app.use('/api/login', loginRoute);
app.use('/api/register', registerRoute);

app.listen(port, console.log(`Server running on port ${port}`));
