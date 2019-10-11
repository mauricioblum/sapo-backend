'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemTypeSchema extends Schema {
  up () {
    this.create('item_types', table => {
      table.increments()
      table.string('name').notNullable()
    })
  }

  down () {
    this.drop('item_types')
  }
}

module.exports = ItemTypeSchema
