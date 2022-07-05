

exports.up = function(knex) {
    return knex.schema.createTable("products", table => {
        table.increments();
        table.integer("category_id ");
        table.integer("sub_category_id ");
        table.string("product_id");
        table.string("product_name");
        table.string("city");
        table.text("address");
        table.text("description");
        table.string("hour_price");
        table.string("day_price");
        table.string("month_price");
        table.string("min_book_hour_price");
        table.string("min_book_day_price");
        table.string("min_book_month_price");
        table.string("document");
        table.text("images");
        table.longtext("fields");
        table.string("seller_name");
        table.string("seller_mobile");
        table.string("seller_email");
        table.string("lat");
        table.string("log");
        table.string("is_featured");
        table.integer("status");
        table.integer("is_delete");
        table.integer("is_approued");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("products");
};
