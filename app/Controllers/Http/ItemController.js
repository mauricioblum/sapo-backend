'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with items
 */

const Item = use('App/Models/Item')
const Color = use('App/Models/Color')
const File = use('App/Models/File')
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
        return (
          Item.query()
            .where('type', 1)
            // .andWhere('active', true)
            .fetch()
        )
      } else if (type === 'found') {
        return (
          Item.query()
            .where('type', 2)
            // .andWhere('active', true)
            .fetch()
        )
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
  async store ({ request, response }) {
    try {
      const data = request.only([
        'name',
        'type',
        'category',
        'color',
        'location',
        'period',
        'description'
      ])
      if (data.type > 2 || data.type < 0) throw new Error('Invalid Type')
      const { to } = request.get()
      const category = await Category.find(data.category)
      const color = await Color.find(data.color)

      if (!category) throw new Error('Invalid Category')
      if (!color) throw new Error('Invalid Color')
      const file = await File.last()

      const item = await Item.create({
        ...data,
        active: false,
        file_id: file ? file.id : null
      })
      if (to) {
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
    } catch (err) {
      return response.status(417).send({ error: err.message })
    }
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
  async show ({ params, request, response, view }) {
    const item = await Item.findOrFail(params.id)

    return item
  }

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
