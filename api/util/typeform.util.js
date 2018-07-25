const fetch = require('node-fetch');

// Validate input params
if (!process.env.TYPEFORM_ID) throw new Error('Environment variable TYPEFORM_ID is required to start the server.');
if (!process.env.TYPEFORM_OAUTH_TOKEN) throw new Error('Environment variable TYPEFORM_OAUTH_TOKEN is required to start the server.');

// Deconstruct and get the information
const { TYPEFORM_ID, TYPEFORM_OAUTH_TOKEN } = process.env;

const typeformIdMappings = {
  email: 'eLMS7WvowqD5',
  phone: 'kpcqKomK1Gjb',
  expertise: '71668172',
  meetingTypes: 'VKHlLaGpGLG2',
  availability: 'uzmePJyaFrON',
  name: 'F4Kup38Xju9B',
  company: 'IpZ9B5Sll4Kr',
  bio: 'hkWUGuUn0jvB',
  title: 'WLbUrNIduu5e',
  characteristics: 'Yd8U6gEdEHnC',
};

/**
 * TYPEFORM_API_URL
 *
 * string
 *
 * A string representing the API endpoint we connect to for typeform.
 */
const TYPEFORM_API_URL = 'https://api.typeform.com/forms/';

/**
 * fetchDataFromTypeform()
 *
 * function
 *
 * Makes an API request to typeform to fetch infromation about the responses to the desired
 *  typeform. This includes information about each response.
 */
const fetchDataFromTypeform = async () => {
  // Make the request
  const response = await fetch(`${TYPEFORM_API_URL}${TYPEFORM_ID}/responses?page_size=1000`, {
    headers: {
      // We need to have the proper oauth token for this to work
      Authorization: `Bearer ${TYPEFORM_OAUTH_TOKEN}`,
    },
  });
  // Convert to JSON
  return response.json();
};

/**
 * matchField()
 *
 * helper function
 *
 * Verifies if the answer's field matches the ID of the typeform mappings defined above.
 *
 * @param {array} answers - An array representing the answers field that we are matching.
 * @param {stirng} fieldName - A string we can use to get the typeform ID mapping.
 */
const matchField = (answers, fieldName) =>
  answers.find(a => a.field.id === typeformIdMappings[fieldName]);

/**
 * matchTextField()
 *
 * function
 *
 * Matches a text field using the match field function above.
 *
 * @param {array} answers
 * @param {string} fieldName
 */
const matchTextField = (answers, fieldName) => {
  const field = matchField(answers, fieldName);
  if (!field) return 'N/A';
  return field.text;
};

// Normalize functions to map the data returned from typeform to this format
const normalizeCharacteristics = characteristics => characteristics.map(c => c.toLowerCase());

const normalizeExpertise = expertise => [expertise];

const normalizeMeetingTypes = meetingTypes => meetingTypes.map((meetingType) => {
  switch (meetingType) {
    // event based
    case 'Event-based mentoring (ad-hoc, primarily during the school year)':
      return 'event-based-mentoring';
    // one time
    case 'One-time meeting with group(s) of student entrepreneurs (ad-hoc, primarily during summer)':
      return 'one-time-meeting';
    // periodic meeting
    case 'Periodic meeting with students based on their needs (during work hours, primarily during the school year)':
      return 'periodic-meeting';
    // dedicated mentoring
    case 'Dedicated mentoring for a student-led startup (8-week commitment during summer)':
      return 'dedicated-mentoring';
    default:
      return null;
  }
});

const normalizeAvailability = availabilities => availabilities.map((availability) => {
  switch (availability) {
    // early morning
    case 'Early morning (8-10 AM)':
      return 'early-morning';
    // late morning
    case 'Late morning (10 AM - 12 PM)':
      return 'late-morning';
    // early afternoon
    case 'Early afternoon (12 - 3 PM)':
      return 'early-afternoon';
    // late afternoon
    case 'Late afternoon (3 - 5 PM)':
      return 'late-afternoon';
    // evening
    case 'Evening (5-8 PM)':
      return 'evening';
    default:
      return null;
  }
});

/**
 * parseDataFromTypeform()
 *
 * function
 *
 * Parses the returned data from typeform into data that can be used within a mongoose model.
 *
 * @param {object} response - An object representing the response typeform provides
 */
const parseDataFromTypeform = response => response.items.map(({ answers }) => {
  if (!Array.isArray(answers)) return null;
  // Main string fields
  const mentorObject = {
    name: matchTextField(answers, 'name'),
    email: matchTextField(answers, 'email'),
    company: matchTextField(answers, 'company'),
    title: matchTextField(answers, 'title'),
    bio: matchTextField(answers, 'bio'),
  };

  // Configure characteristics
  const characteristicsField = matchField(answers, 'characteristics');
  const characteristics = normalizeCharacteristics(characteristicsField.choices.labels);

  // Configure expertise
  const expertiseFields = matchTextField(answers, 'expertise');
  const expertise = normalizeExpertise(expertiseFields);

  // Configure meeting types
  const meetingTypesField = matchField(answers, 'meetingTypes');
  const meetingTypes = normalizeMeetingTypes(meetingTypesField.choices.labels);

  // Configure availability
  const availabilityFields = matchField(answers, 'availability');
  const availability = normalizeAvailability(availabilityFields.choices.labels);

  return {
    ...mentorObject,
    characteristics,
    expertise,
    meetingTypes,
    availability,
  };
});

const fetchAndParseTypeform = async () => {
  const response = await fetchDataFromTypeform();
  return parseDataFromTypeform(response);
};

module.exports = {
  fetchAndParseTypeform,
};
