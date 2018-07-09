const mongoose = require('mongoose');

const DB_NAME = 'du-mentor-job-board';

const connection = mongoose.createConnection(`mongodb://localhost/${DB_NAME}`, {
  useMongoClient: true,
});

module.exports = {
  connection,
};
