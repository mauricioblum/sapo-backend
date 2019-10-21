'use strict'

const OrderHook = (exports = module.exports = {})

const Mail = use('Mail')
const Item = use('App/Models/Item')
const Env = use('Env')

OrderHook.sendMailToUser = async orderInstance => {
  if (orderInstance.status === 3) {
    const item = await Item.findOrFail(orderInstance.id_item)
    await Mail.send(
      ['emails.item_found'],
      {
        itemName: item.name,
        url: `${Env.get('APP_URL')}/items/${item.id}`
      },
      message => {
        message
          .to(orderInstance.email)
          .from('admin@sapo.canoas.ifrs.edu.br', 'SAPO | IFRS Canoas')
          .subject('Seu item foi encontrado!')
      }
    )
  }
}
