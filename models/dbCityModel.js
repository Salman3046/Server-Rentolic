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

async function add(city) {
  const [id] = await db("city").insert(city);
  return id;
}

function find() {
  return db("city");
}

function findById(id) {
  return db("city").where({id}).first();
}

function remove(id) {
  return db("city").where({id}).del();
}

function update(id, changes) {
  return db("city")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(city_name) {
  return db("city").where({city_name}).first();
}
