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

async function add(testimonial) {
  const [id] = await db("testimonial").insert(testimonial);
  return id;
}

function find() {
  return db("testimonial");
}

function findById(id) {
  return db("testimonial").where({id}).first();
}

function remove(id) {
  return db("testimonial").where({id}).del();
}

function update(id, changes) {
  return db("testimonial")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(username) {
  return db("testimonial").where({username});
}
