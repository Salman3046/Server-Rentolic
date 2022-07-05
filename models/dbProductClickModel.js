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

async function add(product_click) {
  const [id] = await db("product_click").insert(product_click);
  return id;
}

function find() {
  return db("product_click");
}

function findById(id) {
  return db("product_click").where({id});
}

function remove(id) {
  return db("product_click").where({id}).del();
}

function update(id, changes) {
  return db("product_click")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(product_id) {
  return db("product_click").where({product_id});
}
