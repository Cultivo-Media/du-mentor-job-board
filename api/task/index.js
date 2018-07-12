const cacheMentorsTask = require('./cacheMentors.task');

// Create a runTasks function that handles caching the mentors (the only task we have)
const runTasks = async () => {
  await cacheMentorsTask();

  console.info('Finished running tasks.');
};

module.exports = runTasks;
