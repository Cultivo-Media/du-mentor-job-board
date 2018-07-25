const { fetchAndParseTypeform } = require('../util/typeform.util');
const { MentorModel } = require('../models/mentor.model');

/**
 * cacheMentorsTask()
 *
 * function
 *
 * A function that handles the following.
 *  1. Gets all mentors from the typeform
 *  2. Parses each mentor to find the right data.
 *  3. Saves only new mentors and updates any previous mentors.
 */
const cacheMentorsTask = async () => {
  const typeformData = await fetchAndParseTypeform();

  // Remove all existing mentors so we can update them with fresh mentors
  await MentorModel.remove().exec();

  // Create all the new mentors from the parsed typeform information
  await MentorModel.create(typeformData);

  console.info('Created new mentors');
};

module.exports = cacheMentorsTask;
