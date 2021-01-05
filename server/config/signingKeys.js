const { v4: uuidv4 } = require('uuid');

module.exports = {
  accessKey: uuidv4(),
  refreshKey: uuidv4(),
  accessCsrf: uuidv4(),
  refreshCsrf: uuidv4()
};
