'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static boot () {
    super.boot()
  }

  items () {
    return this.belongsToMany('App/Models/Item')
  }
}

module.exports = Category
