const express = require('express');
const bcrypt = require('bcryptjs')

const User = require('../users/user-model.js');

const router = express.Router();


router.post('/login', (req, res) => {
  let {username, email, password} = req.body;

  if (!(username && email && password)) {
    res.status(400).json({error: 'Please provide username, email and password'})
  }

  User.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({message: `Welcome ${user.username}!`});
      } else {
        res.status(400).json({message: 'Invalid credentials'});
      }
    })
    .catch(err => {
      res.status(500).json({message: `Login failed: ${err}`});
    })
});

router.post('/register', (req, res) => {
  let user =  {username, email, password} = req.body;

  if (!(username && email && password)) {
    res.status(401).json({error: 'Please provide username, email and password'})
  }

  const hash = bcrypt.hashSync(password, 12);
  user.password = hash;

  User.add(user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch (err => {
    res.status(500).json({ message: 'Registration failed: ' + err });
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({message: 'Logout unsuccessful'})
      } else {
        res.status(200).json({message: 'Logout successful'})
      }
    })
  } else {
    res.status(200).json({message: 'Aleady logged out!'})
  }
})
module.exports = router;
