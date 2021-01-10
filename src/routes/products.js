const express = require('express');
const router = express.Router(); 
const pController = require("../controllers/products");

router.get("/cart", pController.cart);

router.get("/detail/:id", pController.detail); //Implementé el controller de ProductDetail

module.exports = router;