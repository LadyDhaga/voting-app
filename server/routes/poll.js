const router = require('express').Router();
const handle = require('../handlers');
const auth = require('../middleware/auth');

router
  .route('/')
  .get(handle.showPolls) // Public route to get all polls
  .post(auth, handle.createPoll); // Protected route to create a poll

router.get('/user', auth, handle.usersPolls); // Protected route to get the polls of the authenticated user

router
  .route('/:id')
  .get(handle.getPoll) // Public route to get a specific poll by ID
  .put(auth, handle.vote) // Protected route to vote on a poll (changed to PUT)
  .delete(auth, handle.deletePoll); // Protected route to delete a specific poll by ID

module.exports = router;
