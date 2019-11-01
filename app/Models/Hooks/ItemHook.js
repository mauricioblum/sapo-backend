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
        url: `${Env.get('WEBSITE_URL')}/admin/item/${itemInstance.id}`
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

ItemHook.resolveItemMail = async itemInstance => {
  if (itemInstance.status_id === 2 && itemInstance.type === 1) {
    const user = await User.findOrFail(itemInstance.user_id)
    await Mail.send(
      ['emails.item_found'],
      {
        itemName: itemInstance.name,
        url: `${Env.get('WEBSITE_URL')}/user/item/view`
      },
      message => {
        message
          .to(user.email)
          .from('admin@sapo.canoas.ifrs.edu.br', 'SAPO | IFRS Canoas')
          .subject('Seu item foi encontrado!')
      }
    )
  }
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

ItemHook.clearItemParams = async itemInstance => {
  const cleanedItem = itemInstance

  cleanedItem.color_name = undefined
  cleanedItem.category_name = undefined
  cleanedItem.size_name = undefined

  return cleanedItem
}
