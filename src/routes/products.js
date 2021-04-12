const express = require('express');
const router = express.Router(); 
const pController = require("../controllers/products");

router.get("/cart", pController.cart);

router.post("/cart/add/:id", pController.cartAdd);

router.post("/cart/remove/:id", pController.cartRemove);

router.post("/cart/updateQty/:id/:qty", pController.updateQty);

router.get("/cart", pController.cart);

router.get("/detail/:id", pController.detail);

router.get("/search", pController.search);

module.exports = router;