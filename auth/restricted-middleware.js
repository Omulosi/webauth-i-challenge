const bcrypt = require('bcryptjs');
const User = require('../users/user-model');

function restricted(req, res, next) {
  const { username, password, email } = req.headers;

  if (username && password && email) {
    User.findBy({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({message: 'Invalid credentials'});
        }
      })
      .catch(err => {
        res.status(500).json({message: `Login failed: ${err}`});
      })

  } else {
    res.status(400).json({message: 'Please provide credentials'})
  }
}

module.exports = restricted;
