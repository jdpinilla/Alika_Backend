const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialProducts = [
    {
        name: 'Test1',
        categories: ['test'],
        priceCOP: 10,
        priceUSD: 2,
        image: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
        description: 'Test1',
        cantidad: 1,
    },
    {
        name: 'Test2',
        categories: ['test'],
        priceCOP: 10,
        priceUSD: 2,
        image: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
        description: 'Test2',
        cantidad: 1,
    }
]
const initialUsers = [
    {
        fullName: 'Test1',
        email: 'test1@test.com',
        password: 'test123',
    },
    {
        fullName: 'Test2',
        email: 'test2@test.com',
        password: 'test123',
    }
]
const getAllNamesFromProducts = async () => {
    const res = await api.get('/product')
    return {
        names: res.body.map(product => product.name),
        res
    }
}

const getAllEmailsFromUsers = async () => {
    const res = await api.get('/user')
    return {
        emails: res.body.map(user => user.email),
        res
    }
}
module.exports = { initialProducts, api, getAllNamesFromProducts, initialUsers, getAllEmailsFromUsers }