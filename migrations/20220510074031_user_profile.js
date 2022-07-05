exports.up = function(knex) {
    return knex.schema.createTable("user_profile", table => {
        table.increments();
        table.integer("user_id");
        table.string("documents");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user_profile");
};
