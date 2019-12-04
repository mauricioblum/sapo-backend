'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Search = use('App/Models/Search')
const Item = use('App/Models/Item')
/**
 * Resourceful controller for interacting with searches
 */
class SearchController {
  /**
   * Show a list of all searches.
   * GET searches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {}

  async search ({ request, response }) {
    const data = request.only(['name', 'category', 'color', 'size'])
    const existingData = Object.entries(data).reduce((a, [k, v]) => (v ? { ...a, [k]: v } : a), {})
    console.log(existingData)

    let items
    if (existingData.name) {
      const remainingData = existingData
      delete remainingData.name
      if (remainingData.category || remainingData.color || remainingData.size) {
        items = await Item.query()
          .where('name', 'LIKE', `%${data.name}%`)
          .andWhere('active', true)
          .andWhere(remainingData).orderBy('id', 'asc').fetch()
      } else {
        items = await Item.query()
          .where('name', 'LIKE', `%${data.name}%`)
          .andWhere('active', true)
          .orderBy('id', 'asc').fetch()
      }
    } else {
      items = await Item.query()
        .where(existingData).orderBy('id', 'asc')
        .andWhere('active', true).fetch()
    }

    return items
  }

  async find ({ request, response }) {
    const data = request.only(['name', 'category', 'color', 'size'])

    let currentSearch

    if (data.name && data.size && data.category) {
      currentSearch = await Item.query()
        .where('name', 'ilike', data.name)
        .andWhere('category', data.category)
        .andWhere('size', data.size)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.name && data.category) {
      currentSearch = await Item.query()
        .where('name', 'ilike', data.name)
        .andWhere('category', data.category)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.name && data.size) {
      currentSearch = await Item.query()
        .where('name', 'ilike', data.name)
        .andWhere('size', data.size)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.category && data.size) {
      currentSearch = await Item.query()
        .where('category', data.category)
        .andWhere('size', data.size)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.name) {
      currentSearch = await Item.query()
        .where('name', 'ilike', data.name)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.category) {
      currentSearch = await Item.query()
        .where('category', data.category)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    if (data.size) {
      currentSearch = await Item.query()
        .where('size', data.size)
        .andWhere('type', 1)
        .fetch()
      return currentSearch
    }

    return currentSearch
  }

  /**
   * Render a form to be used for creating a new search.
   * GET searches/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {}

  /**
   * Create/save a new search.
   * POST searches
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.only([
      'name',
      'type',
      'category',
      'color',
      'description'
    ])

    const search = await Search.create({
      ...data
    })

    return search
  }

  /**
   * Display a single search.
   * GET searches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing search.
   * GET searches/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update search details.
   * PUT or PATCH searches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a search with id.
   * DELETE searches/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = SearchController
