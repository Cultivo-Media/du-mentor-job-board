const { Router } = require('express');

const MentorModel = require('../models/mentor.model').model;

const router = new Router();

/**
 * GET /mentors
 *
 * Gets all mentors
 */
router.get('/', async (req, res) => {
  const mentors = await MentorModel.find({});

  return res.send(mentors);
});

module.exports = router;
