// Default imports
const { Router } = require('express');

// Auth configuration (this allows us to have auth context on each request)
const { attachAuthContextMiddleware } = require('./config/auth.config');

// Configure routes
const mentorRoute = require('./routes/mentor.route');
const authRoute = require('./routes/auth.route');

const router = new Router();

// Middleware
router.use(attachAuthContextMiddleware);

// Routes
router.use('/mentors', mentorRoute);
router.use('/auth', authRoute);

module.exports = router;
