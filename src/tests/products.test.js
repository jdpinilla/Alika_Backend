const { server } = require('../index')
const mongoose = require('mongoose')
const Products = require('../models/productModels')
const { initialProducts, api, getAllNamesFromProducts } = require('./helpers')

beforeEach(async () => {
    await Products.deleteMany({})

    //parallel
    // const productObjects = initialProducts.map(product => new Product(product))
    // const promises = productObjects.map(product => product.save())
    // await Promise.all(promises)

    //sequential
    for (const product of initialProducts) {
        const productObject = new Products(product)
        await productObject.save()
    }
})
describe("GET all products", () => {
    test('Products are returned as json', async () => {
        await api
            .get('/product')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('The are products inside', async () => {
        const { res } = await getAllNamesFromProducts()
        expect(res.body).toHaveLength(initialProducts.length)
    })

    test('The firs product is Test1', async () => {

        const { names } = await getAllNamesFromProducts()
        expect(names).toContain('Test1')
    })
})

describe("POST a product", () => {
    test('A valid product can be added', async () => {
        const newProduct = {
            name: 'TestPost',
            categories: ['test'],
            priceCOP: 10,
            priceUSD: 2,
            image: 'https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800',
            description: 'Test of the POST',
            cantidad: 1,
        }

        await api
            .post('/product/add')
            .send(newProduct)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const { names, res } = await getAllNamesFromProducts()

        expect(res.body).toHaveLength(initialProducts.length + 1)
        expect(names).toContain(newProduct.name)
    })

    test("A invalid product can't be added", async () => {
        const newProduct = {
            name: '',
            categories: [''],
            priceCOP: 10,
            priceUSD: 2,
            image: '',
        }

        await api
            .post('/product/add')
            .send(newProduct)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const res = await api.get('/product')
        expect(res.body).toHaveLength(initialProducts.length)

    })
})

describe("UPDATE a product", () => {
    test('A valid product can be updated', async () => {
        const nametoUpdate = {
            name: 'TestToUpdate'
        }
        const { res: firstRes } = await getAllNamesFromProducts()
        const { body: product } = firstRes
        const productToUpdate = product[0]
        await api
            .put(`/product/edit/${productToUpdate.id}`)
            .send(nametoUpdate)
            .expect(200)
        const { names } = await getAllNamesFromProducts()
        expect(names).not.toContain(productToUpdate.name)
    })
    test("A invalid product can't be updated", async () => {
        const nametoUpdate = {
            name: 'TestToUpdate'
        }
        await api
            .put('/product/edit/1234')
            .set(nametoUpdate)
            .expect(400)

        const { names } = await getAllNamesFromProducts()
        expect(names).not.toContain(nametoUpdate)
    })
})

describe("DELETE a product", () => {
    test("A product be deleted successfully", async () => {
        const { res: firstRes } = await getAllNamesFromProducts()
        const { body: products } = firstRes
        const productToDelete = products[0]
        await api
            .delete(`/product/delete/${productToDelete.id}`)
            .expect(204)

        const { names, res: secondRes } = await getAllNamesFromProducts()
        expect(secondRes.body).toHaveLength(initialProducts.length - 1)
        expect(names).not.toContain(productToDelete.name)
    })

    test("A invalid product can't be deleted", async () => {
        await api
            .delete('/product/delete/1234')
            .expect(400)

        const { res } = await getAllNamesFromProducts()
        expect(res.body).toHaveLength(initialProducts.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})