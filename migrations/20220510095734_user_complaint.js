exports.up = function(knex) {
    return knex.schema.createTable("user_complaint", table => {
        table.increments();
        table.string("title");
        table.integer("user_id");
        table.text("complaint");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user_complaint");
};
