const prisma = require('../helpers/database')
const bcrypt = require('bcrypt')
const Joi = require('joi')

class _users {

    listUsers = async () => {
        try {
            const list = await prisma.users.findMany()

            return {
                status: true,
                code: 200,
                data: list
            }

        } catch (error) {
            console.error('listUser users module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    createUser = async (body) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const password = bcrypt.hashSync(body.password, 10)
            const add = await prisma.users.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createUser user module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailUser = async (user_id) => {
        try {
            const detail = await prisma.users.findMany({
                where: {
                    id: parseInt(user_id)
                }
            })

            return {
                status: true,
                code: 200,
                data: detail
            }

        } catch (error) {
            console.error('listUser users module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    updateUser = async (body, user_id) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required()
            }).options({ abortEarly: false })

            const validation = schema.validate(body)

            if (validation.error) {
                const errorDetails = validation.error.details.map(detail => detail.message)

                return {
                    status: false,
                    code: 422,
                    error: errorDetails.join(', ')
                }
            }

            const password = bcrypt.hashSync(body.password, 10)
            const update = await prisma.users.update({
                where: {
                    id: parseInt(user_id)
                },
                data: {
                    name: body.name,
                    email: body.email,
                    password
                }
            })

            return {
                status: true,
                code: 200,
                data: update
            }

        } catch (error) {
            console.error('updateUser users module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    destroyUser = async (user_id) => {
        try {
            const destroy = await prisma.users.delete({
                where: {
                    id: parseInt(user_id)
                }
            })

            return {
                status: true,
                code: 200
            }
        } catch (error) {
            console.error('destroyUser users module Error:', error);
            return {
                status: false,
                error
            }
        }
    }
}

module.exports = new _users()