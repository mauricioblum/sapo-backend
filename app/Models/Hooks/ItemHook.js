'use strict'

const ItemHook = (exports = module.exports = {})
const Mail = use('Mail')
const User = use('App/Models/User')
const Env = use('Env')
const Color = use('App/Models/Color')
const Category = use('App/Models/Category')
const Size = use('App/Models/Size')

ItemHook.sendMailToAdmins = async itemInstance => {
  const admins = await User.all()

  admins.toJSON().forEach(async admin => {
    await Mail.send(
      ['emails.new_order'],
      {
        name: itemInstance.name,
        url: `${Env.get('APP_URL')}/items/${itemInstance.id}`
      },
      message => {
        message
          .to(admin.email)
          .from('admin@sapo.canoas.ifrs.edu.br', 'SAPO | IFRS Canoas')
          .subject('Um novo item foi registrado no sistema!')
      }
    )
  })
}

ItemHook.getColorCategoryAndSize = async itemInstance => {
  const color = await Color.findOrFail(itemInstance.color)
  const category = await Category.findOrFail(itemInstance.category)
  const size = await Size.findOrFail(itemInstance.size)

  itemInstance.color_name = color.name
  itemInstance.category_name = category.name
  itemInstance.size_name = size.name
}

ItemHook.getAllColorCategoryAndSize = async instances => {
  for (const itemInstance of instances) {
    const color = await Color.findOrFail(itemInstance.color)
    const category = await Category.findOrFail(itemInstance.category)
    const size = await Size.findOrFail(itemInstance.size)

    itemInstance.color_name = color.name
    itemInstance.category_name = category.name
    itemInstance.size_name = size.name
  }
}
