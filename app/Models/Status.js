'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Status extends Model {
  static boot () {
    super.boot()
  }

  orders () {
    return this.belongsTo('App/Models/Order')
  }
}

module.exports = Status
