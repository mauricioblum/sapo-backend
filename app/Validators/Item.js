'use strict'

class Item {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      name: 'required',
      type: 'required'
    }
  }
}

module.exports = Item
