exports.up = function(knex) {
    return knex.schema.createTable("contact_us", table => {
        table.increments();
        table.text("address");
        table.string("gmail");
        table.string("phone");
        table.string("facebook");
        table.string("instagram"); 
        table.string("twitter");
        table.string("linkedin");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("contact_us");
};
