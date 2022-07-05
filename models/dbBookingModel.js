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

async function add(booking) {
  const [id] = await db("booking").insert(booking);
  return id;
}

function find() {
  return db("booking");
}

function findById(id) {
  return db("booking").where({id}).first();
}

function remove(id) {
  return db("booking").where({id}).del();
}

function update(id, changes) {
  return db("booking")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(user_id) {
  return db("booking").where({user_id}).first();
}
