'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot () {
    super.boot()
  }

  item () {
    return this.hasOne('App/Models/Item')
  }

  status () {
    return this.hasOne('App/Models/Status')
  }
}

module.exports = Order
