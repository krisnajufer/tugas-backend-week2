const m$users = require('../modules/users.module')

const { Router } = require('express')
const response = require('../helpers/response')

const UsersController = Router()

UsersController.get('/', async (req, res) => {
    const list = await m$users.listUsers()

    response.sendResponse(res, list)
})

UsersController.post('/', async (req, res) => {
    const add = await m$users.createUser(req.body)

    response.sendResponse(res, add)
})

UsersController.get('/:id', async (req, res) => {
    const detail = await m$users.detailUser(req.params.id)

    response.sendResponse(res, detail)
})

UsersController.put('/:id', async (req, res) => {
    const update = await m$users.updateUser(req.body, req.params.id)

    response.sendResponse(res, update)
})

UsersController.delete('/:id', async (req, res) => {
    const destroy = await m$users.destroyUser(req.params.id)

    response.sendResponse(res, destroy)
})

module.exports = UsersController