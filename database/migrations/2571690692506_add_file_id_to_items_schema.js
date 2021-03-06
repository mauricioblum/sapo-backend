'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddFileIdToItemsSchema extends Schema {
  up () {
    this.table('items', table => {
      // alter table
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('items', table => {
      // reverse alternations
    })
  }
}

module.exports = AddFileIdToItemsSchema
