const { fetchAndParseDefaultGoogleSheet } = require('../util/googleSheet.util');
const MentorModel = require('../models/mentor.model').model;

/**
 * parseSheetResponse()
 *
 * function
 *
 * Parses the data that google sheets responds with and returns something that is usable to save in
 *  the database.
 *
 * @param {object} googleSheet - A google sheet object we are going to save.
 */
const parseSheetResponse = googleSheet => googleSheet.map((row) => {
  // The expertise just need to be split into an array
  const expertise = row.expertise.split(',');

  console.log(row);

  // These are all the different types of characteristics we can have
  const typesOfCharacteristics = ['alumni', 'staff', 'faculty', 'parent', 'donor', 'communityMember'];
  // Filter the characteristics to those that are included (using a "X")
  const characteristics = typesOfCharacteristics.filter(c => row[c.toLowerCase()] && row[c.toLowerCase()].includes('X'));

  // These are all the different types of meeting types we can have
  const typesOfMeetingTypes = ['periodicMeeting', 'dedicatedMentoring', 'oneTimeMeeting', 'eventMeeting'];
  // Filter the meeting types to those that are included (using a "X")
  const meetingTypes = typesOfMeetingTypes.filter(c => row[c.toLowerCase()] && row[c.toLowerCase()].includes('X'));

  // These are all the different types of availability we can have
  const typesOfAvailability = ['earlyMorning', 'lateMorning', 'earlyAfternoon', 'lateAfternoon', 'evening'];
  // Filter the availability to those that are included (using a "X")
  const availability = typesOfAvailability.filter(c => row[c.toLowerCase()] && row[c.toLowerCase()].includes('X'));

  return {
    ...row,
    expertise,
    characteristics,
    meetingTypes,
    availability,
  };
});

/**
 * cacheMentorsTask()
 *
 * function
 *
 * A function that handles the following.
 *  1. Gets all mentors from the google sheet
 *  2. Parses each mentor to find the right data.
 *  3. Saves only new mentors and updates any previous mentors.
 */
const cacheMentorsTask = async () => {
  const sheet = await fetchAndParseDefaultGoogleSheet();

  // Parse the data from the sheet response from google sheets
  const parsedSheet = parseSheetResponse(sheet);

  // Remove all existing mentors so we can update them with fresh mentors
  await MentorModel.remove().exec();

  // Create all the new mentors from the parsed sheet
  await MentorModel.create(parsedSheet);

  console.info('Created new mentors');
};

module.exports = cacheMentorsTask;
