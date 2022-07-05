exports.up = function(knex) {
    return knex.schema.createTable("booking", table => {
        table.increments();
        table.integer("user_id");
        table.integer("product_id");
        table.string("address");
        table.string("city");
        table.string("state");
        table.integer("pincode");
        table.string("doc_dl");
        table.string("doc_id");
        table.string("price_unit");
        table.double("payable_amount");
        table.string("period");
        table.string("start_date");
        table.string("end_date");
        table.varchar("start_time");
        table.varchar("end_time");
        table.timestamp("booking_date");
        table.integer("status");
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("booking");
};
