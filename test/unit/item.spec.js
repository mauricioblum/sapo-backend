'use strict'

const { test, trait } = use('Test/Suite')('Item Tests')

trait('Test/ApiClient')

test('it should create an item when requested from API', async ({
  assert,
  client
}) => {
  const response = await client
    .post('/items')
    .send({
      name: 'Estojo Rosa',
      type: 1,
      category: 4,
      color: 6,
      description: 'Nao sei desta descriç˜åo!!!!!!'
    })
    .end()

  response.assertStatus(200)
  assert.equal(response.body.name, 'Estojo Rosa')
})
