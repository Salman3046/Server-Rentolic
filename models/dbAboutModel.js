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

async function add(about_us) {
  const [id] = await db("about_us").insert(about_us);
  return id;
}

function find() {
  return db("about_us");
}

function findById(id) {
  return db("about_us").where({id}).first();
}

function remove(id) {
  return db("about_us").where({id}).del();
}

function update(id, changes) {
  return db("about_us")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(about_us) {
  return db("about_us").where({about_us}).first();
}
