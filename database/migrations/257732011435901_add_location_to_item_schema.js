'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddLocationToItemSchema extends Schema {
  up () {
    this.table('items', table => {
      // alter table
      table.string('location')
      table.string('period', 30)
    })
  }

  down () {
    this.table('items', table => {
      // reverse alternations
    })
  }
}

module.exports = AddLocationToItemSchema
