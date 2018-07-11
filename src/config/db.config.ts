import * as mongoose from 'mongoose';

// Set the DB_NAME (the db we will connect to)
const DB_NAME = 'du-mentor-job-board';

// Configure a new connection
const connection = mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
  useNewUrlParser: true,
});

export {
  connection,
};
