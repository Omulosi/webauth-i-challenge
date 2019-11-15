const express = require('express');
const restricted = require('../auth/restricted-middleware');

const User = require('./user-model.js');

const router = express.Router();

router.get('/', restricted, (req, res) => {
  User.find()
  .then(users => {
    res.json(users);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

module.exports = router;
