import { Router } from 'express';

import { MentorModel } from '../models/mentor.model';

const router = Router();

/**
 * GET /mentors
 *
 * Gets all mentors (no auth because we do not care who makes a request for all mentors)
 */
router.get('/', async (req, res) => {
  const mentors = await MentorModel.find({});

  return res.send(mentors);
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

export default router;
