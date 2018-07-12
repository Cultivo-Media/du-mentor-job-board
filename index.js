// Default imports
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');

// Configure data from the config
require('dotenv').config();

// Configure the DB
require('./api/config/db.config');

// Get the API
const api = require('./api');
const tasks = require('./api/task');

// Configure the dev application
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
  dir: './client',
});
const handle = app.getRequestHandler();

const start = async () => {
  await app.prepare();

  const server = express();

  // Allow json requests and use /api for the api
  // Attach body parser and cookie parser
  server.use(bodyParser.json({ limit: '10mb' }));
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser());
  server.use('/api', api);

  // Handle other requests using next
  server.get('*', (req, res) => handle(req, res));

  // Setup the default port
  const DEFAULT_PORT = process.env.PORT || 4003;

  // Start the application
  server.listen(DEFAULT_PORT, async () => {
    // Ensure we run tasks when the application starts
    await tasks();
    console.info(`Application running on port ${DEFAULT_PORT}.`);

    // Schedule the job to run that the top of the hour, every hour
    schedule.scheduleJob('0 * * * *', () => {
      tasks();
    });
  });
};

start();
