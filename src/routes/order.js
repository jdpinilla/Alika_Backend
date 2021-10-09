const express = require('express');
const fs = require('fs')
const router = express.Router();
const Order = require('../models/orderModels');


router.get('/', async (req, res) => {
  const orders = await Order.find({});
  res.json({
    status:200,
    message:'Success',
    data:orders,
  });
})

router.post('/add', async (req,res,next) => {
  const { products, user, finalPrice } = req.body;

  if(!products || products.length === 0) {
    res.status(400).json({
      error: "Name is missing"
    })
  }
  else if(!user || user.length === 0) {
    res.status(400).json({
      error: "user is missing"
  })
  }
  else if (!finalPrice || finalPrice === 0) {
    res.status(400).json({
        error: "finalPrice is missing"
    })
  } else {
    try {
      const newOrder = new Order({products, user, finalPrice});
      const orderSaved = await newOrder.save();
      res.json(orderSaved)
    } catch (e) {
      next(e)
    }
  }
})

router.put('/edit/:id', async (req,res,next) => {
  try {
    const { id } = req.params;
    const orderUpdated = await Order.findByidAndUpdate({ id }, req.body);

    res.status(200).json(orderUpdated)
  } catch (e){
    res.status(400)
    next(e)
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderToDelete = await Order.findByIdAndRemove(id)
    if (!orderToDelete) {
      res.status(400)
    } else {
      res.status(204).json(orderToDelete)
    }
  }
  catch (e){
    res.status(400)
    next(e)
  }
})

module.exports = router;