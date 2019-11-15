const knex = require('knex');
const db = require('../data/db-config.js');

module.exports = {
  find,
  findBy,
  add,
  remove,
  update,
};

function find() {
  return db('users')
    .select('id', 'username', 'email');
}


function findBy(filterKey) {
  return db('users')
    .where(filterKey)
    .first();
}


function findById(id) {
  return db('users')
    .select('id', 'username', 'email')
    .where({ id })
    .first();
}

async function add(user) {
  const [id] = await db('users').insert(user);
  return findById(id);
}

function remove(id) {
}

function update(changes, id) {
}
