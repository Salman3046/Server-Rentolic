exports.up = function(knex) {
    return knex.schema.createTable("product_click", table => {
        table.increments();
        table.integer("product_id");
        table.string("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("product_click");
};
