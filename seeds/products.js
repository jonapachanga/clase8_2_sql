
exports.seed = async function(knex) {
  await knex('products').del()
  await knex('products').insert([
    {id: 1, title: 'IPhone 13', price: 120365.00, thumbnail: '/cellphone21x21.png'},
    {id: 2, title: 'Xiaomi Box', price: 10590.00, thumbnail: '/xiaomi_box.png'},
    {id: 3, title: 'Chromecast 3', price: 10590.00, thumbnail: '/chromecast.png'}
  ]);
};
