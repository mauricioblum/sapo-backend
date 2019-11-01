'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/items', 'ItemController.index')
Route.get('/items/:id', 'ItemController.show')
Route.get('/reports/resolved', 'ItemController.resolved')
Route.post('/items', 'ItemController.store').middleware(['auth']).validator('Item')
Route.put('/items/:id', 'ItemController.edit').middleware(['auth'])
Route.put('/items/status/:id', 'ItemController.status').middleware(['auth'])
Route.delete('/items/:id', 'ItemController.destroy').middleware(['auth'])

Route.get('/user/get', 'UserController.show').middleware(['auth'])

Route.post('/admin', 'UserController.store')
Route.post('/sessions/admin', 'SessionController.admin')
Route.post('/sessions/user', 'SessionController.user')

Route.post('/user/login', 'LoginController.user')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')

// Route.post('/search', 'SearchController.store')
Route.post('/find', 'SearchController.find')
Route.post('/search', 'SearchController.search')

Route.get('/order', 'OrderController.index')
Route.post('/order', 'OrderController.store')
Route.put('/order/:orderId', 'OrderController.update').middleware(['auth'])

Route.get('/options/semester/get', 'OptionController.index')
Route.post('/options/semester/set', 'OptionController.update')
