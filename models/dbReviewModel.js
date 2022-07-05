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

async function add(review) {
  const [id] = await db("review").insert(review);
  return id;
}

function find() {
  return db("review");
}

function findById(id) {
  return db("review").where({id});
}

function remove(id) {
  return db("review").where({id}).del();
}

function update(id, changes) {
  return db("review")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(product_id) {
  return db("review").where({product_id});
}
