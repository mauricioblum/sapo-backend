'use strict'

const User = use('App/Models/User')

class UserController {
  async show ({ auth }) {
    const user = await User.findOrFail(auth.user.id)

    return user
  }

  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const user = await User.create({ ...data, type: 1 })

    return user
  }
}

module.exports = UserController
