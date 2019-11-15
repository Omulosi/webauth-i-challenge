const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries and resets primary keys
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'john', email: 'john@gmail.com', password: bcrypt.hashSync('1234', 11)},
        {username: 'nero', email: 'nero@gmail.com', password: bcrypt.hashSync('1234', 11)},
        {username: 'abba', email: 'abba@gmail.com', password: bcrypt.hashSync('1234', 11)},
      ]);
    });
};
