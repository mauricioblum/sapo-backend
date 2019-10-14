'use strict'

const ItemHook = (exports = module.exports = {})
const Mail = use('Mail')
const User = use('App/Models/User')
const Env = use('Env')

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
          .subject('Um novo pedido foi registrado no sistema!')
      }
    )
  })
}
