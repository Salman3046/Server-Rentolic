exports.up = function(knex) {
    return knex.schema.createTable("lender", table => {
        table.increments();
        table.string("lender_name");
        table.string("lender_work_field");
        table.string("lender_email");
        table.string("lender_password");
        table.string("lender_phone");
        table.string("commission");
        table.string("commission_type");
        table.integer("status");
        table.integer("city");
        table.datetime("last_login");
        table.integer("role");
        table.string("doc_type1");
        table.string("doc_type2");
        table.string("lender_profile_pic");
        table.string("lender_description"); 

        table.timestamps(true, true); 
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("lender");
};
