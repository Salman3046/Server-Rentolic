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

async function add(contact) {
  const [id] = await db("contact").insert(contact);
  return id;
}

function find() {
  return db("contact");
}

function findById(id) {
  return db("contact").where({id}).first();
}

function remove(id) {
  return db("contact").where({id}).del();
}

function update(id, changes) {
  return db("contact")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(name) {
  return db("contact").where({name}).first();
}
