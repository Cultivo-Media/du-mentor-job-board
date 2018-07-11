// Configure data from the config
import * as dotenv from 'dotenv';
dotenv.config();
// Default imports
import * as Express from 'express';
import * as schedule from 'node-schedule';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

const DEFAULT_PORT = process.env.PORT || 4003;

// Get the cacheMentorsTask
import { cacheMentorsTask } from './task';

// Configure the DB
import './config/db.config';

const app = Express();

// Attach body parser and cookie parser
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

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
