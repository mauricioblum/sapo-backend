'use strict'

/*
|--------------------------------------------------------------------------
| ItemTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class ItemTypeSeeder {
  async run () {
    await Database.table('item_types').insert([
      { name: 'PERDIDO' },
      { name: 'ACHADO' }
    ])
  }
}

module.exports = ItemTypeSeeder
