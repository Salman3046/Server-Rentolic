exports.up = function(knex) {
    return knex.schema.createTable("contact", table => {
        table.increments();
        table.string("name");
        table.string("email");
        table.string("subject");
        table.string("phone");
        table.text("message");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("contact");
};
