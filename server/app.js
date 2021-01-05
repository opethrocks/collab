const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Cookie Parser
app.use(cookieParser());

//Cors
const corsOptions = { origin: 'http://localhost:3000', credentials: true };
app.use(cors(corsOptions));

//Port
const port = process.env.PORT || 5000;

//DB config
const db = require('./config/keys').MongoURI;

//Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

//Configure routes

app.use('/api', require('./routes'));

app.listen(port, () => console.log(`Server running on port ${port}`));
