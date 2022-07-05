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

async function add(user_complaint) {
  const [id] = await db("user_complaint").insert(user_complaint);
  return id;
}

function find() {
  return db("user_complaint");
}

function findById(id) {
  return db("user_complaint").where({id}).first();
}

function remove(id) {
  return db("user_complaint").where({id}).del();
}

function update(id, changes) {
  return db("user_complaint")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(user_id) {
  return db("user_complaint").where({user_id}).first();
}
