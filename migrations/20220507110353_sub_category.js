

exports.up = function(knex) {
    return knex.schema.createTable("sub_category", table => {
        table.increments();
        table.string("category_id ");
        table.string("name");
        table.string("sub_cat_icon");
        table.text("sub_cat_image");
        table.text("form_field");
        table.integer("verification_required");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sub_category");
};
