const express = require('express');
const router = express.Router(); 
const pController = require("../controllers/products");

router.get("/cart", pController.cart);

router.get("/detail/:id", pController.detail); //Falta implementar el controller

module.exports = router;