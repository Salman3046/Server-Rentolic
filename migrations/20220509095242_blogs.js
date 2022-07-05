exports.up = function(knex) {
    return knex.schema.createTable("blogs", table => {
        table.increments();
        table.string("name");
        table.string("degisation");
        table.string("image");
        table.text("blog");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("blogs");
};
