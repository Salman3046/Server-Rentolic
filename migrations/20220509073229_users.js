exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
        table.increments();
        table.string("username");
        table.string("email");
        table.string("phone");
        table.string("password");
        table.string("fullName");
        table.integer("status");
        table.integer("city");
        table.integer("email_verified");
        table.integer("refer_code");
        table.integer("refer_by");
        table.integer("status");
        table.timestamps(true, true);
      });
}; 

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
