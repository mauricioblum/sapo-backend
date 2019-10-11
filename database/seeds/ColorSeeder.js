'use strict'

/*
|--------------------------------------------------------------------------
| ColorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class ColorSeeder {
  async run () {
    await Database.table('colors').insert([
      { name: 'Branco' },
      { name: 'Preto' },
      { name: 'Vermelho' },
      { name: 'Laranja' },
      { name: 'Amarelo' },
      { name: 'Verde' },
      { name: 'Azul' },
      { name: 'Marrom' },
      { name: 'Cinza' },
      { name: 'Outro' }
    ])
  }
}

module.exports = ColorSeeder
