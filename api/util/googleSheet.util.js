const axios = require('axios');

// We must have a googleSheetDocumentKey in order to successfully fetch data from the google sheet
if (typeof process.env.googleSheetDocumentKey !== 'string') throw new Error('googleSheetDocumentKey is required in environment');
const { googleSheetDocumentKey } = process.env;

/**
 * parseGoogleSheet
 *
 * function
 *
 * Parses a google sheet to be able to be used by its columns.
 *
 * @param {Array} entries - An array of sheet entries we map over.
 */
const parseGoogleSheet = entries => entries.map((entry) => {
  const res = {};
  Object.keys(entry).forEach((key) => {
    if (key.indexOf('gsx$') === 0) {
      const label = key.substr(4);
      res[label] = entry[key].$t;
    }
  });
  return res;
});

/**
 * buildUrl()
 *
 * function
 *
 * A helper function that generates a string of a URL we can query to find the correct sheet.
 *
 * @param {string} id - A string representing the ID of the google sheet
 * @param {string} mode - The type of data we want returned with this request.
 * @param {string} sheetNum - A number to be used to fetch the correct sheet.
 */
const buildUrl = (id, mode, sheetNum = 1) => `https://spreadsheets.google.com/feeds/${mode}/${id}/${sheetNum}/public/values?alt=json`;

/**
 * fetchGoogleSheet()
 *
 * function
 *
 * Fetches a google sheet.
 *
 * @param {string} id - An ID of the google sheet we want to request.
 */
const fetchGoogleSheet = async (id) => {
  const queryUrl = buildUrl(id, 'list');
  const response = await axios.get(queryUrl);
  return response.data;
};

/**
 * fetchAndParseGoogleSheet()
 *
 * function
 *
 * Main function that enacts all of the logic. From here we fetch a google sheet and then we parse
 *  the sheet to have the correct response sent.
 *
 * @param {string} id - An ID of a google sheet we want to query.
 */
const fetchAndParseGoogleSheet = async (id) => {
  const googleSheet = await fetchGoogleSheet(id);
  const parsedSheet = parseGoogleSheet(googleSheet.feed.entry);

  return parsedSheet;
};

/**
 * fetchAndParseDefaultGoogleSheet()
 *
 * function
 *
 * Fetches the default google sheet (the ID is configured in the environment), then it parses that
 *  google sheet so it can be used in a response.
 */
const fetchAndParseDefaultGoogleSheet = () => fetchAndParseGoogleSheet(googleSheetDocumentKey);

module.exports = {
  fetchAndParseDefaultGoogleSheet
};
