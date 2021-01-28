const express = require('express');
const router = express.Router(); 
const aController = require("../controllers/admin");

router.get("/", aController.admin);

router.get("/productCreation", aController.productCreation);

router.get("/productsList", aController.productsList);

router.put("/productCreation/create", aController.productCreate);

router.put("/productEdition/save/:id", aController.productEditionSave); 

router.get("/productEdition/:id", aController.productEdition); 

router.delete("/productDelete/:id", aController.productDelete);

module.exports = router;