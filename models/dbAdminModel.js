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

async function add(admin) {
  const [id] = await db("admin").insert(admin);
  return id;
}

function find() {
  return db("admin");
}

function findById(id) {
  return db("admin").where({id}).first();
}

function remove(id) {
  return db("admin").where({id}).del();
}

function update(id, changes) {
  return db("admin")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(admin_name) {
  return db("admin").where({admin_name}).first();
}
