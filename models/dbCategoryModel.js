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

async function add(category) {
  const [id] = await db("category").insert(category);
  return id;
}

function find() {
  return db("category");
}

function findById(id) {
  return db("category").where({id}).first();
}

function remove(id) {
  return db("category").where({id}).del();
}

function update(id, changes) {
  return db("category")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(lender_id) {
  return db("category").where({lender_id});
}