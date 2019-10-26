'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSchema extends Schema {
  up () {
    this.create('items', table => {
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
        .integer('size')
        .unsigned()
        .references('id')
        .inTable('sizes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('color')
        .unsigned()
        .references('id')
        .inTable('colors')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('image_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('description', 254)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('items')
  }
}

module.exports = ItemSchema
