
exports.up = function(knex) {
  return knex.schema.createTable('products', function (table){
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('thumbnail', 255).notNullable();
      table.decimal('price', 8, 2).notNullable();
  })
};


exports.down = function(knex) {
    return knex.schema
        .dropTable('products');
};
