'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemsSchema extends Schema {
  up () {
    this.table('items', (table) => {
      // alter table
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('items', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ItemsSchema
