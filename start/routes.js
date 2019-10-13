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

Route.post('/items', 'ItemController.store')
Route.put('/items/:id', 'ItemController.edit').middleware(['auth'])

Route.post('/admin', 'UserController.store')
Route.post('/sessions', 'SessionController.store')

Route.post('/user/login', 'LoginController.user')

Route.get('/files/:id', 'FileController.show')
Route.post('/files', 'FileController.store')

Route.post('/search', 'SearchController.store')
Route.post('/find', 'SearchController.find')
