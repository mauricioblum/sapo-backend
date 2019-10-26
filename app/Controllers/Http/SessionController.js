'use strict'

const Axios = use('Axios')
const User = use('App/Models/User')

class SessionController {
  async admin ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    return token
  }

  async user ({ request, response, auth }) {
    const data = request.only(['username', 'password'])

    const login = await Axios.post(
      `http://moodle.canoas.ifrs.edu.br/login/token.php?username=${data.username}&password=${data.password}&service=moodle_mobile_app`
    )

    const user = await Axios.get(
      `http://moodle.canoas.ifrs.edu.br/webservice/rest/server.php?wstoken=${login.data.token}&wsfunction=core_user_get_users_by_field&field=username&values[0]=${data.username}&moodlewsrestformat=json`
    )
    if (user.data.length) {
      const userExists = await User.findBy('username', user.data[0].username)
      if (!userExists) {
        const createdUser = {
          username: user.data[0].username,
          email: user.data[0].email,
          password: data.password,
          type: 2
        }
        const persistUser = await User.create(createdUser)
        const token = await auth.attempt(persistUser.email, data.password)

        return token
      } else {
        const token = await auth.attempt(userExists.email, data.password)

        return token
      }
    } else {
      return response.status(401).send({ error: 'User not found!' })
    }
  }
}

module.exports = SessionController
