'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OptionsSchema extends Schema {
  up () {
    this.create('options', (table) => {
      table.increments()
      table.date('semester_end')
      table.timestamps()
    })
  }

  down () {
    this.drop('options')
  }
}

module.exports = OptionsSchema
