'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Option = use('App/Models/Option')

/**
 * Resourceful controller for interacting with options
 */
class OptionController {
  /**
   * Show a list of all options.
   * GET options
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const option = await Option.find(1)

    return option
  }

  /**
   * Update option details.
   * PUT or PATCH options/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const option = await Option.find(1)

    option.semester_end = request.input('date')

    await option.save()

    return option
  }
}

module.exports = OptionController
