const mongoose = require('mongoose');

//Connect to mongo
const mongooseInit = async function () {
  //DB config
  const uri =
    process.env.NODE_ENV === 'production'
      ? process.env.MONGODB_URI
      : require('../config/keys').MongoURI;

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(uri, options);
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongooseInit;
