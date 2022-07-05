exports.up = function(knex) {
    return knex.schema.createTable("admin", table => {
        table.increments();
        table.string("admin_name");
        table.string("admin_email");
        table.string("admin_password");
        table.string("admin_phone");
        table.integer("status");
        table.datetime("last_login");
        table.integer("role");
        table.timestamps(true, true); 
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("admin");
};
