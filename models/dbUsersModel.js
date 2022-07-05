const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  findByName
};

async function add(users) {
  const [id] = await db("users").insert(users);
  return id;
}

function find() {
  return db("users");
}

function findById(id) {
  return db("users").where({id}).first();
}

function remove(id) {
  return db("users").where({id}).del();
}

function update(id, changes) {
  return db("users")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(name) {
  return db("users").where({name}).first();
}
