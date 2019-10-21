'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with items
 */

const Item = use('App/Models/Item')
const Color = use('App/Models/Color')
const Category = use('App/Models/Category')
const Mail = use('Mail')

class ItemController {
  /**
   * Show a list of all items.
   * GET items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const items = Item.all()
    const { type } = request.get()

    if (type) {
      if (type === 'lost') {
        return Item.query()
          .where('type', 1)
          .andWhere('active', true)
          .fetch()
      } else if (type === 'found') {
        return Item.query()
          .where('type', 2)
          .andWhere('active', true)
          .fetch()
      }
    } else {
      return items
    }
  }

  /**
   * Render a form to be used for creating a new item.
   * GET items/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new item.
   * POST items
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request }) {
    const data = request.only([
      'name',
      'type',
      'category',
      'color',
      'description'
    ])

    const item = await Item.create({ ...data, active: false })
    const { to } = request.get()

    if (to) {
      const category = await Category.find(item.category)
      const color = await Color.find(item.color)

      await Mail.send(
        ['emails.confirm_item'],
        {
          name: item.name,
          category: category.name,
          color: color.name,
          description: item.description
        },
        message => {
          message
            .to(to)
            .from('admin@sapo.canoas.ifrs.edu.br', 'SAPO | IFRS Canoas')
            .subject('Confirmação de Pedido')
        }
      )
    }

    return item
  }

  /**
   * Display a single item.
   * GET items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing item.
   * GET items/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const item = await Item.findOrFail(params.id)

    const { active } = request.all()

    item.active = active

    await item.save()

    return item
  }

  /**
   * Update item details.
   * PUT or PATCH items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a item with id.
   * DELETE items/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = ItemController
