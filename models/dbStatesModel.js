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

async function add(states) {
  const [id] = await db("states").insert(states);
  return id;
}

function find() {
  return db("states");
}

function findById(id) {
  return db("states").where({id});
}

function remove(id) {
  return db("states").where({id}).del();
}

function update(id, changes) {
  return db("states")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(state_name) {
  return db("states").where({state_name});
}
