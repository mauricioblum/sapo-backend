'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Order extends Model {
  static boot () {
    super.boot()

    this.addHook('afterUpdate', 'OrderHook.sendMailToUser')
  }

  item () {
    return this.hasOne('App/Models/Item')
  }
}

module.exports = Order
