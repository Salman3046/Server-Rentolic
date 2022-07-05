exports.up = function(knex) {
    return knex.schema.createTable("city", table => {
        table.increments();
        table.string("city_name");
        table.string("currency_name");
        table.string("currency_symbol");
        table.integer("status");
        table.integer("deleted");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("city");
};
