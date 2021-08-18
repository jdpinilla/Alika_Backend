const express = require('express')
const mercadopago = require('mercadopago')
const router = express.Router()
const Order = require('../models/orderModels')

mercadopago.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
})

router.get('/mercadopago/ipn', (req, res) => {
    if (req.params.type === 'payment') {
        const paymentId = req.params.data.id;

        mercadopago.payment.get(paymentId).then( async(error,payment) => {
            const orderId = payment.external_reference;

            const order = await Order.find(orderId)

            if(order.totalPrice === )
        })
    }

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
        external_reference: newOrder._id,
        notification_url:``,
        items: newOrder.products
    }).then((preference) => {
        console.log(preference.body.id)
        res.send({ preferenceId: preference.body.id });
    }).catch(e => console.log(e))
});

module.exports = router