'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SearchSchema extends Schema {
  up () {
    this.create('searches', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table
        .integer('type')
        .unsigned()
        .references('id')
        .inTable('item_types')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('category')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('color')
        .unsigned()
        .references('id')
        .inTable('colors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('description', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('searches')
  }
}

module.exports = SearchSchema
