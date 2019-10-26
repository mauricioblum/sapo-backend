'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  static boot () {
    super.boot()

    this.addHook('afterSave', 'ItemHook.sendMailToAdmins')
    this.addHook('afterFind', 'ItemHook.getColorCategoryAndSize')
    this.addHook('afterFetch', 'ItemHook.getAllColorCategoryAndSize')
  }

  file () {
    return this.hasOne('App/Models/File')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Item
