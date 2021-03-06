'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ItemType extends Model {
  static boot () {
    super.boot()
  }

  items () {
    return this.hasMany('App/Models/Item')
  }
}

module.exports = ItemType
