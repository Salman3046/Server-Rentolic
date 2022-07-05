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

async function add(ads) {
  const [id] = await db("ads").insert(ads);
  return id;
}

function find() {
  return db("ads");
}

function findById(id) {
  return db("ads").where({id}).first();
}

function remove(id) {
  return db("ads").where({id}).del();
}

function update(id, changes) {
  return db("ads")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(adName) {
  return db("ads").where({adName}).first();
}
