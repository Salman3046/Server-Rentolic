exports.up = function(knex) {
    return knex.schema.createTable("ads", table => {
        table.increments();
        table.string("adName");
        table.text("subtitle");
        table.string("buttonText");
        table.string("image");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("ads");
};
