const m$transactions = require('../modules/transactions.module')

const { Router } = require('express')
const response = require('../helpers/response')
const authorize = require('../middleware/auth-middleware')

const TransactionsController = Router()

TransactionsController.get('/', authorize, async (req, res) => {
    const list = await m$transactions.listTransactions(req.users.id)

    response.sendResponse(res, list)
})

TransactionsController.post('/', authorize, async (req, res) => {

    const add = await m$transactions.createTransaction(req.body, req.users.id)

    response.sendResponse(res, add)
})

TransactionsController.get('/:id', authorize, async (req, res) => {
    const detail = await m$transactions.detailTransaction(req.users.id, req.params.id)

    response.sendResponse(res, detail)
})

TransactionsController.put('/:id', authorize, async (req, res) => {
    const update = await m$transactions.updateTransaction(req.body, req.params.id)

    response.sendResponse(res, update)
})

TransactionsController.delete('/:id', authorize, async (req, res) => {
    const destroy = await m$transactions.destroyTransaction(req.params.id)

    response.sendResponse(res, destroy)
})


module.exports = TransactionsController