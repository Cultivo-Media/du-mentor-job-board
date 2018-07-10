// Configure data from the config
require('dotenv').config();
// Default imports
const express = require('express');
const schedule = require('node-schedule');

const DEFAULT_PORT = process.env.PORT || 4003;

// Get the cacheMentorsTask
const { cacheMentorsTask } = require('./task');

// Configure the DB
require('./config/db.config');

const app = express();
// Configure routes
app.use('/mentors', require('./routes/mentor.route'));

// Create a runTasks function that handles caching the mentors (the only task we have)
const runTasks = async () => {
  await cacheMentorsTask();

  console.info('Finished running tasks.');
};

app.listen(DEFAULT_PORT, () => {
  console.info(`Application running on port ${DEFAULT_PORT}.`);
});

// Schedule the job to run that the top of the hour, every hour
schedule.scheduleJob('0 * * * *', () => {
  runTasks();
});
