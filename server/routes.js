require('dotenv').config()
const express = require('express')
const products = require('./products.json')
const stripe = require('stripe')(process.env.STRIPE_API_SECRET)

const { validateCartItems } = require('use-shopping-cart/src/serverUtil')

module.exports = function getRoutes() {
  const router = express.Router()

  router.get('/products', getProducts)
  router.get('/products/:productId', getProduct)
  router.post('/checkout-sessions', createCheckoutSession)
  return router
}

function getProducts(req, res) {
  return res.status(200).json({ products })
}

function getProduct(req, res) {
  try {
    const { productId } = req.params
    const product = products.find(product => product.id === productId)

    if (!product) {
      throw Error(`there is no Product for id : ${productId}`)
    }
    return res.status(200).json({ product })
  } catch (error) {
    return res.status(404).json({ statusCode: 404, messsage: error.message })
  }
}
async function createCheckoutSession(req, res) {
  try {
    let cartItems = req.body
    console.log('cartItems: ', cartItems)
    console.log('products: ', products)
    console.log('are equal :', cartItems == products)

    const line_items = validateCartItems(products, cartItems)

    const origin =
      process.env.NODE_ENV === 'production'
        ? req.headers.origin
        : 'http://localhost:3000'

    const params = {
      submit_type: 'pay',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      line_items,
      success_url: `${origin}/result?sesion_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
      mode: 'payment'
    }
    const cheeckoutSession = await stripe.checkout.sessions.create(params)

    return res.status(200).json(cheeckoutSession)
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message })
  }
}
