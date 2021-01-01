const express = require('express');
const router = express.Router(); 
const pController = require("../controllers/products");


// router.get("/", (req, res) =>{
//     res.render("products");
// });

// router.get("/:id", (req, res) =>{
//     res.send("Producto id: " + req.params.id);
// });

router.get("/cart", pController.cart);

router.get("/detail/:id", pController.detail);

module.exports = router;