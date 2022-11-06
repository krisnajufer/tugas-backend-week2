const UsersController = require('./controllers/UsersController')
const AuthController = require('./controllers/AuthController')
const TransactionsController = require('./controllers/TransactionsController')

const _routes = [
    ['users', UsersController],
    ['', AuthController],
    ['transactions', TransactionsController],
]

const routes = (app) => {
    _routes.forEach(route => {
        const [url, controller] = route

        // http://localhost:8000/api
        app.use(`/api/${url}`, controller)
    })
}

module.exports = routes