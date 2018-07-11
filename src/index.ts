// Configure data from the config
import dotenv from 'dotenv';
dotenv.config();
// Default imports
import Express from 'express';
import schedule from 'node-schedule';

const DEFAULT_PORT = process.env.PORT || 4003;

// Get the cacheMentorsTask
import { cacheMentorsTask } from './task';

// Configure the DB
import './config/db.config';

const app = Express();

// Auth configuration (this allows us to have auth context on each request)
import { attachAuthContextMiddleware } from './config/auth.config';
app.use(attachAuthContextMiddleware);

// Configure routes
import mentorRoute from './routes/mentor.route';
app.use('/mentors', mentorRoute);

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
