const jwt = require('jsonwebtoken');

module.exports = {
  generateAuthToken() {
    const token = jwt.sign(
      {
        _id: this._id,
        email: this.email
      },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: '15m' }
    );
    return token;
  }
};
