const prisma = require('../helpers/database')
const Joi = require('joi')

class _transactions {

    listTransactions = async (id) => {
        try {
            const list = await prisma.transactions.findMany({
                where: {
                    user_id: parseInt(id)
                }
            })

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

    createTransaction = async (body, id) => {
        try {
            const schema = Joi.object({
                transaction_type: Joi.string().required(),
                amount: Joi.number().required(),
                description: Joi.string().required()
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
            const add = await prisma.transactions.create({
                data: {
                    user_id: parseInt(id),
                    transaction_type: body.transaction_type,
                    amount: parseInt(body.amount),
                    description: body.description
                }
            })

            return {
                status: true,
                code: 201,
                data: add
            }
        } catch (error) {
            console.error('createTransaction transaction module Error:', error);
            return {
                status: false,
                error
            }
        }
    }

    detailTransaction = async (user_id, transaction_id) => {
        try {
            const detail = await prisma.transactions.findMany({
                where: {
                    user_id,
                    id: parseInt(transaction_id)
                }
            })

            return {
                status: true,
                code: 200,
                data: detail
            }

        } catch (error) {
            console.error('DetailTransaction transactions module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    updateTransaction = async (body, transaction_id) => {
        try {
            const schema = Joi.object({
                transaction_type: Joi.string().required(),
                amount: Joi.number().required(),
                description: Joi.string().required()
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

            const update = await prisma.transactions.update({
                where: {
                    id: parseInt(transaction_id)
                },
                data: {
                    transaction_type: body.transaction_type,
                    amount: parseInt(body.amount),
                    description: body.description
                }
            })

            return {
                status: true,
                code: 200,
                data: update
            }
        } catch (error) {
            console.error('UpdateTransaction transactions module Error:', error)

            return {
                status: false,
                error
            }
        }
    }

    destroyTransaction = async (transaction_id) => {
        try {
            const destroy = await prisma.transactions.delete({
                where: {
                    id: parseInt(transaction_id)
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

module.exports = new _transactions()