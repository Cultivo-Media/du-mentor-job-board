// Configure data from the config
require('dotenv').config();
// Get the cacheMentorsTask
const { cacheMentorsTask } = require('./task');

// Create a startup function that handles caching the mentors
const startup = async () => {
  await cacheMentorsTask();

  console.info('Finished running tasks');
};

// Start the migration task
startup();
