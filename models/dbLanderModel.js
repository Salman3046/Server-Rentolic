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

async function add(lender) {
  const [id] = await db("lender").insert(lender);
  return id;
}

function find() {
  return db("lender");
}

function findById(id) {
  return db("lender").where({id}).first();
}

function remove(id) {
  return db("lender").where({id}).del();
}

function update(id, changes) {
  return db("lender")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(lender_name) {
  return db("lender").where({lender_name}).first();
}
