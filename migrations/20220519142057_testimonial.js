exports.up = function(knex) {
    return knex.schema.createTable("testimonial", table => {
        table.increments();
        table.string("username");
        table.text("review");
        table.string("image");
        table.integer("is_featured");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("testimonial");
};
