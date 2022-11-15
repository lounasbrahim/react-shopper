require("dotenv").config();
const express = require("express");
const products = require("./products.json");

module.exports = function getRoutes() {
  const router = express.Router();

  router.get("/products", getProducts);
  router.get("/products/:productId", getProduct);

  return router;
};

function getProducts(req, res) {
  return res.status(200).json({ products });
}

function getProduct(req, res) {
  try {
    const { productId } = req.params;
    const product = products.find((product) => product.id === productId);

    if (!product) {
      throw Error(`there is no Product for id : ${productId}`);
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(404).json({ statusCode: 404, messsage: error.message });
  }
}
