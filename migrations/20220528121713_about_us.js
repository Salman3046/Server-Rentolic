exports.up = function(knex) {
    return knex.schema.createTable("about_us", table => {
        table.increments(00000);
        table.string("about_us");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("about_us");
};
