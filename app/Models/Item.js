'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  static boot () {
    super.boot()

    this.addHook('afterSave', 'ItemHook.sendMailToAdmins')
  }

  image () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = Item
