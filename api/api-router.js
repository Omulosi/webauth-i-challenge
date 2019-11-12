const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/user-router.js');

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({api: 'API is live'})
});

module.exports = router;