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

async function add(privacy_policy) {
  const [id] = await db("privacy_policy").insert(privacy_policy);
  return id;
}

function find() {
  return db("privacy_policy");
}

function findById(id) {
  return db("privacy_policy").where({id});
}

function remove(id) {
  return db("privacy_policy").where({id}).del();
}

function update(id, changes) {
  return db("privacy_policy")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(title) {
  return db("privacy_policy").where({title});
}
