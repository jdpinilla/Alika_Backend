const express = require('express')
const mercadopago = require('mercadopago')
const router = express.Router()
const Order = require('../models/orderModels')

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
})


router.post('/', (req, res) => {
    const order = req.body.cart
    console.log(order)
    const items = order.map(item => {
        const pedido = {
            title: item.name,
            unit_price: item.priceCOP,
            quantity: item.quantity
        }
        return pedido
    })
    const newOrder = new Order({ products: items })
    mercadopago.preferences.create({
        items: newOrder.products
    }).then((preference) => {
        console.log(preference.body.id)
        res.send({ preferenceId: preference.body.id });
    }).catch(e => console.log(e))
});

module.exports = router