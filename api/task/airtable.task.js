const Airtable = require('airtable');

const { MentorModel } = require('../models/mentor.model');

// Ensure that we have all proper API variables to connect to Airtable
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('Environment variable AIRTABLE_API_KEY is required to run cultivo-media-innovation-map');
}
if (!process.env.AIRTABLE_BASE) {
  throw new Error('Environment variable AIRTABLE_BASE is required to run cultivo-media-innovation-map');
}
if (!process.env.AIRTABLE_TABLE) {
  throw new Error('Environment variable AIRTABLE_TABLE is required to run cultivo-media-innovation-map');
}

const { AIRTABLE_API_KEY, AIRTABLE_BASE, AIRTABLE_TABLE } = process.env;

// Configure the Airtable "base" so we can connect to it
const base = new Airtable({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
}).base(AIRTABLE_BASE);

/**
 * fetchDataFromAirtable()
 *
 * function
 *
 * The Airtable API connector that gives us access to connecting with Airtable.
 */
const fetchDataFromAirtable = () => new Promise((resolve, reject) => base(AIRTABLE_TABLE)
  .select({
    view: 'Grid view',
  })
  .firstPage((err, records) => {
    if (err) return reject(err);

    return resolve(records);
  }));

/**
 * mapCharacteristicsFromStrings()
 *
 * helper function
 *
 * Returns characteristics in an "enum" format based off of strings from the airtable.
 *
 * @param {String} characteristic - A string representing a characteristic of a user.
 */
const mapCharacteristicsFromStrings = (characteristic) => {
  switch (characteristic) {
    case 'Faculty':
      return 'faculty';
    case 'Staff':
      return 'staff';
    case 'Alumni':
      return 'alumni';
    case 'Community Member':
      return 'community-member';
    case 'Donor':
      return 'donor';
    case 'Parent':
      return 'parent';
    default:
      return null;
  }
};

/**
 * mapMeetingTypesFromStrings()
 *
 * helper function
 *
 * Returns a meeting type in an "enum" format based off of strings from the airtable.
 *
 * @param {String} meetingType - A string representing a type of meeting the mentor can have.
 */
const mapMeetingTypesFromStrings = (meetingType) => {
  switch (meetingType) {
    case 'Periodic meeting with students based on their needs (during work hours':
      return 'periodic';
    case 'One-time meeting with group(s) of student entrepreneurs (ad-hoc, primarily during summer)':
      return 'one-time';
    case 'Dedicated mentoring for a student-led startup (8-week commitment during summer)':
      return 'dedicated';
    case 'Event-based mentoring (ad-hoc, primarily during the school year)':
      return 'event-based';
    default:
      return null;
  }
};

/**
 * mapAvailabilityFromStrings()
 *
 * helper function
 *
 * Returns an availability type in an "enum" format based off of strings from the airtable.
 *
 * @param {String} availability - A string representing a type of availability the mentor can have.
 */
const mapAvailabilityFromStrings = (availability) => {
  switch (availability) {
    case 'Early morning (8-10 AM)':
      return 'early-morning';
    case 'Late morning (10 AM - 12 PM)':
      return 'late-morning';
    case 'Early afternoon (12 - 3 PM)':
      return 'early-afternoon';
    case 'Late afternoon (3 - 5 PM)':
      return 'late-afternoon';
    case 'Evening (5-8 PM)':
      return 'evening';
    default:
      return null;
  }
};

/**
 * mapRecordFromAirtable()
 *
 * function
 *
 * Maps all data from Airtable to a format that can be used within our DB.
 *
 * @param {Object} record - An Airtable record used to get data
 */
const mapRecordFromAirtable = record => ({
  name: record.get('name') || '',
  company: record.get('company') || 'N/A',
  title: record.get('title') || 'N/A',
  bio: record.get('bio') || 'N/A',
  characteristics: record.get('characteristics').map(mapCharacteristicsFromStrings),
  expertise: record.get('expertise'),
  meetingTypes: record.get('meetingTypes').map(mapMeetingTypesFromStrings),
  availability: record.get('availability').map(mapAvailabilityFromStrings),
});

/**
 * fetchAirtableTask()
 *
 * function
 *
 * Main task for pulling data from Airtable and then caching it to our database.
 */
const fetchAirtableTask = async () => {
  const records = await fetchDataFromAirtable();
  const mappedDataRecords = records.map(mapRecordFromAirtable);

  // Delete all existing organizations before we update them
  await MentorModel.remove().exec();

  // Create all new organizations
  await MentorModel.create(mappedDataRecords);

  console.info('Create new organizations.');
};

module.exports = fetchAirtableTask;
