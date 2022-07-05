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

async function add(slider) {
  const [id] = await db("slider").insert(slider);
  return id;
}

function find() {
  return db("slider");
}

function findById(id) {
  return db("slider").where({id});
}

function remove(id) {
  return db("slider").where({id}).del();
}

function update(id, changes) {
  return db("slider")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(title) {
  return db("slider").where({title});
}
