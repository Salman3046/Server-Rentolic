exports.up = function(knex) {
    return knex.schema.createTable("sub_category_ads", table => {
        table.increments();
        table.string("adName");
        table.text("link");
        table.string("image");
        table.integer("category_id");
        table.integer("sub_category_id");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sub_category_ads");
};
