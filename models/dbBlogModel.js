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

async function add(blogs) {
  const [id] = await db("blogs").insert(blogs);
  return id;
}

function find() {
  return db("blogs");
}

function findById(id) {
  return db("blogs").where({id}).first();
}

function remove(id) {
  return db("blogs").where({id}).del();
}

function update(id, changes) {
  return db("blogs")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(name) {
  return db("blogs").where({name}).first();
}
