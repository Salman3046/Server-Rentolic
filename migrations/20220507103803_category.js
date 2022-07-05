

exports.up = function(knex) {
    return knex.schema.createTable("category", table => {
        table.increments();
        table.string("category_name");
        table.string("icon"); 
        table.string("image");
        table.integer("status");
        table.integer("deleted");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("category");
};
