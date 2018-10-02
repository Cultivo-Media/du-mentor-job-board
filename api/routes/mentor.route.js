const { Router } = require('express');

const { MentorModel } = require('../models/mentor.model');

const { hasMentorAccess } = require('../config/auth.config');

const handleError = require('../util/handleError');

const router = new Router();

/**
 * GET /mentors
 *
 * Gets all mentors (no auth because we do not care who makes a request for all mentors)
 */
router.get('/', async (req, res) => {
  const m = await MentorModel.find({}).exec();

  // Sort mentors by their first name
  const mentors = m.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  return res.send(mentors);
});

/**
 * POST /api/mentors/:id
 *
 * Updates a single mentor that has an _id that matches req.params.id;
 */
router.post('/:id', hasMentorAccess, async (req, res) => {
  // Validate body input
  const { body } = req;
  if (!body) {
    return handleError(res)({
      status: 422,
      message: 'Malformed body object supplied to POST /api/mentors/:id',
    });
  }

  // Update the organization
  let mentor;
  try {
    mentor = await MentorModel
      .findByIdAndUpdate({ _id: req.params.id }, body, { new: true })
      .exec();
  } catch (err) {
    return handleError(res)(err);
  }

  // Respond with the updated organization
  return res.send(mentor);
});

/**
 * GET /mentors/expertise
 *
 * Gets all the expertise accumulated from all mentors ensuring that there are no duplicates and
 *  each queried expertise is unique.
 */
router.get('/expertise', async (req, res) => {
  const unfilteredExpertise = await MentorModel.find({}).select('expertise').exec();
  // Merge the arrays together
  const mergedExpertise = unfilteredExpertise
    // Move to just an array of arrays
    .map(m => m.expertise.map(e => e.trim().toLowerCase()))
    // Merge arrays together
    .reduce((a, b) => a.concat(b), [])
    // Ensure that each one is a non-empty string
    .filter(String);
  // Ensure there are no duplicates by creating a set then creating an array
  const uniqueExpertise = [...new Set(mergedExpertise)];
  // Return with the result
  return res.send(uniqueExpertise);
});

module.exports = router;
