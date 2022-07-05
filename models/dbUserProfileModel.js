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

async function add(user_profile) {
  const [id] = await db("user_profile").insert(user_profile);
  return id;
}

function find() {
  return db("user_profile");
}

function findById(id) {
  return db("user_profile").where({id}).first();
}

function remove(id) {
  return db("user_profile").where({id}).del();
}

function update(id, changes) {
  return db("user_profile")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(user_id) {
  return db("user_profile").where({user_id}).first();
}
