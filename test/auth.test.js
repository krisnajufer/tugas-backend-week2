const request = require('supertest')
const app = require('./server')
const port = 4042

beforeAll(async () => {
    server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
})

afterAll((done) => {
    done()
    server.close()
})

describe('auth', () => {
    test('login', async () => {
        const login = {
            email: "test@gmail.com",
            password: "test123"
        }
        const res = await request(server).post('/api/login').send(login)
        expect(res.status).toBe(200)
    })
})