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

async function add(products) {
  const [id] = await db("products").insert(products);
  return id;
}

function find() {
  return db("products");
}

function findById(id) {
  return db("products").where({id});
}

function remove(id) {
  return db("products").where({id}).del();
}

function update(id, changes) {
  return db("products")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(lender_id) {
  return db("products").where({lender_id});
}
