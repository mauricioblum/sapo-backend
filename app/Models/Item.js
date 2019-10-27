'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'ItemHook.sendMailToAdmins')
    this.addHook('afterSave', 'ItemHook.resolveItemMail')
    this.addHook('afterFind', 'ItemHook.getColorCategoryAndSize')
    this.addHook('afterFetch', 'ItemHook.getAllColorCategoryAndSize')
    this.addHook('beforeUpdate', 'ItemHook.clearItemParams')
  }

  file () {
    return this.hasOne('App/Models/File')
  }

  user () {
    return this.belongsTo('App/Models/User', 'user_id')
  }
}

module.exports = Item
