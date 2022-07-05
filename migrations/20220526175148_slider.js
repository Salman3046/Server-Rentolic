exports.up = function(knex) {
    return knex.schema.createTable("slider", table => {
        table.increments();
        table.string("title");
        table.text("content");
        table.string("image");
        table.string("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("slider");
};
