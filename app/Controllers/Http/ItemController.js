'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with items
 */

const Item = use('App/Models/Item')
const File = use('App/Models/File')
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
  async index ({ request, response, auth }) {
    let items = await Item.all()
    const { type } = request.get()

    if (auth.user) {
      items = await Item.query().where('user_id', auth.user.id).fetch()

      return items
    }

    if (type) {
      if (type === 'lost') {
        return (
          Item.query()
            .with('user')
            .where('type', 1)
            .andWhere('status_id', 1)
            .fetch()
        )
      } else if (type === 'found') {
        return (
          Item.query()
            .with('user')
            .where('type', 2)
            .andWhere('status_id', 1)
            .fetch()
        )
      }
    } else {
      return items
    }
  }

  async resolved ({ request, response, view }) {
    const items = await Item.query().with('user').where('status_id', 2).fetch()
    return items
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
  async store ({ request, response, auth }) {
    try {
      const data = request.only([
        'name',
        'type',
        'size',
        'category',
        'color',
        'location',
        'period',
        'description',
        'file_id'
      ])
      if (data.type > 2 || data.type < 0) throw new Error('Invalid Type')
      const { to } = request.get()

      const item = await Item.create({
        ...data,
        user_id: auth.user.id,
        active: false,
        status_id: 1
      })
      if (to) {
        await Mail.send(
          ['emails.confirm_item'],
          {
            name: item.name,
            size: item.size_name,
            category: item.category_name,
            color: item.color_name,
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

    const data = request.only(['active'])

    item.active = data.active

    await item.save()

    return item
  }

  async status ({ params, request }) {
    const item = await Item.findOrFail(params.id)

    const data = request.only(['status_id'])

    item.status_id = data.status_id

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
  async destroy ({ params, request, response }) {
    const item = await Item.findOrFail(params.id)

    try {
      item.delete()
      return response.status(200).send({ message: 'Item deleted!' })
    } catch (err) {
      return response.status(301).send({ error: 'Erro ao remover!' })
    }
  }
}

module.exports = ItemController
