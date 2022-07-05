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

async function add(terms_condition) {
  const [id] = await db("terms_condition").insert(terms_condition);
  return id;
}

function find() {
  return db("terms_condition");
}

function findById(id) {
  return db("terms_condition").where({id});
}

function remove(id) {
  return db("terms_condition").where({id}).del();
}

function update(id, changes) {
  return db("terms_condition")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(title) {
  return db("terms_condition").where({title});
}
