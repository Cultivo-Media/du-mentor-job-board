const mongoose = require('mongoose');

// Set the DB_NAME (the db we will connect to)
const DB_NAME = 'du-mentor-job-board';

// We need some way to know if we're running on a production environment
const production = process.env.NODE_ENV === 'production';

let connectionUrl;

// If we are running a production instance, we need to handle the URL in a certain manner
// We need to make sure we are connecting to a secure instance on the server
if (production) {
  const { mongoUser, mongoPassword } = process.env;
  // Validate input
  if (!mongoUser) throw new Error('No mongoUser specified, specify a user in the environment config');
  if (!mongoPassword) throw new Error('No mongoPassword specified, specify a password in the environment config');

  connectionUrl = `mongodb://${mongoUser}:${mongoPassword}@localhost:27017/${DB_NAME}`;
} else {
  connectionUrl = `mongodb://localhost:27017/${DB_NAME}`;
}

// Configure a new connection
const connection = mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
});

module.exports = {
  connection,
};
