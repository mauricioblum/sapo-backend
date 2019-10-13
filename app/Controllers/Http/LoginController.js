'use strict'

const Axios = use('Axios')

class LoginController {
  /**
   *
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async user ({ request }) {
    const data = request.only(['username', 'password'])

    const login = await Axios.post(
      `http://moodle.canoas.ifrs.edu.br/login/token.php?username=${data.username}&password=${data.password}&service=moodle_mobile_app`
    )

    const user = await Axios.get(
      `http://moodle.canoas.ifrs.edu.br/webservice/rest/server.php?wstoken=${login.data.token}&wsfunction=core_user_get_users_by_field&field=username&values[0]=${data.username}&moodlewsrestformat=json`
    )

    return user.data
  }

  async admin ({ request }) {}
}

module.exports = LoginController
