exports.up = function(knex) {
    return knex.schema.createTable("terms_condition", table => {
        table.increments();
        table.string("title");
        table.text("content");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("terms_condition");
};
