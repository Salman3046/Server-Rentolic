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

async function add(sub_category) {
  const [id] = await db("sub_category").insert(sub_category);
  return id;
}

function find(status) {
  return db("sub_category").where({status});
}

function findById(id) {
  return db("sub_category").where({id}).first();
}

function remove(id) {
  return db("sub_category").where({id}).del();
}

function update(id, changes) {
  return db("sub_category")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(category_id) {
  return db("sub_category").where({category_id});
}
