'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table
        .string('email', 254)
        .notNullable()
        .unique()
      table
        .integer('status')
        .unsigned()
        .references('id')
        .inTable('statuses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('id_item')
        .unsigned()
        .references('id')
        .inTable('items')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
