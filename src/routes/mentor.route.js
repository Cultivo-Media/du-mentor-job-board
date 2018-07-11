const { Router } = require('express');

const { MentorModel } = require('../models/mentor.model');

const router = new Router();

/**
 * GET /mentors
 *
 * Gets all mentors (no auth because we do not care who makes a request for all mentors)
 */
router.get('/', async (req, res) => {
  const mentors = await MentorModel.find({});

  return res.send(mentors);
});

module.exports = router;
