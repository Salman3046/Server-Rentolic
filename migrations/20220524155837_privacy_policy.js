exports.up = function(knex) {
    return knex.schema.createTable("privacy_policy", table => {
        table.increments();
        table.string("title");
        table.text("content");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("privacy_policy");
};
