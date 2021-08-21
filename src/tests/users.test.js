const { server } = require('../index')
const mongoose = require('mongoose')
const User = require('../models/userModels')
const { initialUsers, api, getAllEmailsFromUsers } = require('./helpers')
describe('Creating new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        for (const user of initialUsers) {
            const userObject = new User(user)
            userObject.password = await userObject.encryptPassword(user.password)
            await userObject.save()

        }
    })
    test('works as expected creating a fresh email', async () => {
        const newUser = {
            fullName: 'TestCreated',
            email: 'testCreated@test.com',
            password: 'test123',
            confirm_password: 'test123'
        }
        await api
            .post('/user/signup')
            .send(newUser)
            .expect(200)

        const { res, emails } = await getAllEmailsFromUsers()
        expect(res.body).toHaveLength(initialUsers.length + 1)
        expect(emails).toContain(newUser.email)
    })
    test()
    afterAll(() => {
        mongoose.connection.close()
        server.close()
    })

})