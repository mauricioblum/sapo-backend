'use strict'

/*
|--------------------------------------------------------------------------
| SizeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class SizeSeeder {
  async run () {
    await Database.table('sizes').insert([
      { name: 'Muito Pequeno' },
      { name: 'Pequeno' },
      { name: 'Médio' },
      { name: 'Grande' }
    ])
  }
}

module.exports = SizeSeeder
