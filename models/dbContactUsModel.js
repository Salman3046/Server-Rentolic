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

async function add(contact_us) {
  const [id] = await db("contact_us").insert(contact_us);
  return id;
}

function find() {
  return db("contact_us");
}

function findById(id) {
  return db("contact_us").where({id}).first();
}

function remove(id) {
  return db("contact_us").where({id}).del();
}

function update(id, changes) {
  return db("contact_us")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(address) {
  return db("contact_us").where({address}).first();
}
