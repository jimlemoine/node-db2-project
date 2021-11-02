
exports.up = function(knex) {
  return knex.schema.table('cars', table => {
      table.renameColumn('car_id', 'id')
  })
};

exports.down = function(knex) {
//   return knex.schema.table('cars', table => {
//       table.renameColumn('id', 'car_id')
//   })
};
