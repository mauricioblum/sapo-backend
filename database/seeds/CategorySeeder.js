'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class CategorySeeder {
  async run () {
    await Database.table('categories').insert([
      { name: 'Materiais Escolares' },
      { name: 'Agasalhos' },
      { name: 'Roupas' },
      { name: 'Mochilas e Bolsas' },
      { name: 'Produtos de Beleza' },
      { name: 'Acessórios' },
      { name: 'Livros' },
      { name: 'Eletrônicos' },
      { name: 'Outros' }
    ])
  }
}

module.exports = CategorySeeder
