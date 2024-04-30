// sessionsRoute.js

import express from 'express';
import session from 'express-session';

const router = express.Router();

// Configure express-session middleware
router.use(session({
  secret: 'hyteckiosk',
  resave: false,
  saveUninitialized: true,
}));

// Route to create a new session and return session ID
router.post('/startSession', (req, res) => {
  // Generate a session ID using express-session
  const sessionId = req.sessionID;

  // Return the session ID to the client
  res.json({ sessionId });
});

export default router;
