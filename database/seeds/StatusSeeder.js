'use strict'

/*
|--------------------------------------------------------------------------
| StatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class StatusSeeder {
  async run () {
    await Database.table('statuses').insert([
      { name: 'AGUARDANDO' },
      { name: 'RESOLVIDO' }
    ])
  }
}

module.exports = StatusSeeder
