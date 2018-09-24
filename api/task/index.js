const cacheMentorsTask = require('./cacheMentors.task');
const generateDefaultUserTask = require('./user.task');

// Create a runTasks function that handles caching the mentors (the only task we have)
const runTasks = async () => {
  await cacheMentorsTask();
  await generateDefaultUserTask();

  console.info('Finished running tasks.');
};

module.exports = runTasks;
