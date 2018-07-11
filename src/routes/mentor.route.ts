import { Router } from 'express';

import { MentorModel } from '../models/mentor.model';

const router = Router();

/**
 * GET /mentors
 *
 * Gets all mentors (no auth because we do not care who makes a request for all mentors)
 */
router.get('/', async (req: Request, res: Response) => {
  const mentors = await MentorModel.find({});

  return res.send(mentors);
});

export default router;
