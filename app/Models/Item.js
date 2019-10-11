'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  static boot () {
    super.boot()
  }

  itemType () {
    return this.hasOne('App/Models/ItemType')
  }

  color () {
    return this.hasOne('App/Models/Color')
  }

  category () {
    return this.hasOne('App/Models/Category')
  }
}

module.exports = Item
