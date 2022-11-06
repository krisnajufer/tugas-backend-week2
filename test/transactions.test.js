const request = require('supertest')
const app = require('./server')
const port = 4043

beforeAll(async () => {
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
    const login = {
        email: "test@gmail.com",
        password: "test123"
    }
    const res = await request(server).post('/api/login').send(login)
    token = res.body.data.token
})

afterAll((done) => {
    done()
    server.close()
})

describe('Transactions', () => {
    let id

    test('List Transactions', async () => {
        const res = await request(server).get('/api/transactions').set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Add Transactions', async () => {
        const add = {
            transaction_type: "IN",
            amount: "200000",
            description: "test transactions"
        }
        const res = await request(app).post('/api/transactions').send(add).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(201)
        id = res.body.data.id
    })

    test('Detail Transactions', async () => {
        const res = await request(server).get('/api/transactions/' + id).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

    test('Update Transactions', async () => {
        const put = {
            transaction_type: "OUT",
            amount: "250000",
            description: "test transactions update"
        }
        const res = await request(app).put('/api/transactions/' + id).send(put).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    });

    test('Delete Transactions', async () => {
        const res = await request(app).delete('/api/transactions/' + id).set("Authorization", `Bearer ${token}`)
        expect(res.status).toBe(200)
    })

})