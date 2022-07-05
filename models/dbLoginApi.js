const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

module.exports = {
  add,
  find,
  findById
};

async function add(users) {
  const [id] = await db("users").insert(users);
  return id;
}

function find() {
  return db("users");
}

function findById(phone) {
  return db("users").where({phone}).first();
}

