'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Order = use('App/Models/Order')
const Item = use('App/Models/Item')
const Color = use('App/Models/Color')
const Category = use('App/Models/Category')
const User = use('App/Models/User')
const Mail = use('Mail')

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new order.
   * GET orders/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only(['id_item', 'name', 'email'])

    const item = await Item.findOrFail(data.id_item)
    const color = await Color.find(item.color)
    const category = await Category.find(item.category)

    const order = await Order.create({ ...data, status: 1 })

    const admins = await User.all()

    admins.toJSON().forEach(async admin => {
      await Mail.send(
        ['emails.new_order'],
        {
          username: data.name,
          email: data.email,
          name: item.name,
          category: category.name,
          color: color.name
        },
        message => {
          message
            .to(admin.email)
            .from('admin@sapo.canoas.ifrs.edu.br', 'SAPO | IFRS Canoas')
            .subject('Um novo pedido foi registrado no sistema!')
        }
      )
    })

    return order
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing order.
   * GET orders/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = OrderController
