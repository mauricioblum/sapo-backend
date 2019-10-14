'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ColorsItemSchema extends Schema {
  up () {
    this.create('colors_items', table => {
      table.increments()
      table
        .integer('color_id')
        .unsigned()
        .references('id')
        .inTable('colors')
        .onDelete('CASCADE')
      table
        .integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('colors_items')
  }
}

module.exports = ColorsItemSchema
