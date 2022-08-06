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

async function add(sub_category_ads) {
  const [id] = await db("sub_category_ads").insert(sub_category_ads);
  return id;
}

function find() {
  return db("sub_category_ads");
}

function findById(id) {
  return db("sub_category_ads").where({id});
}

function remove(id) {
  return db("sub_category_ads").where({id}).del();
}

function update(id, changes) {
  return db("sub_category_ads")
    .where({id})
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findByName(adName) {
  return db("sub_category_ads").where({adName});
}
