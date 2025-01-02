const express = require('express');
const { resolve } = require('path');
const cors=require('cors')



const app = express();
app.use(cors())

const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.send('api testing');
});

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  let total = (newItemPrice + cartTotal).toString();
  res.send(total);
});

function totalDays(shippingMethod, distance) {
  let days;
  if (shippingMethod == 'standard') {
    days = distance / 50;
  } else if ((shippingMethod = 'express')) {
    days = distance / 100;
  }
  return days;
}

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(totalDays(shippingMethod, distance).toString());
});

function overallCost(weight, distance) {
  let packageCost = weight * distance * 0.1;
  return packageCost;
}
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(overallCost(weight, distance).toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = purchaseAmount * 2;
  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
