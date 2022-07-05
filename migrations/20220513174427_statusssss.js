exports.up = function(knex) {
    return knex.schema.createTable("statusssss", table => {
        table.increments();
        table.string("status_id");
        table.string("status_name");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("statusssss");
};
