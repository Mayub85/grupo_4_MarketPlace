const express = require('express');
const router = express.Router(); 
const pAPIController = require("../../controllers/api/productsAPIController");

router.get("/", pAPIController.getAll);
router.get("/types", pAPIController.getTypes);
router.get("/:id", pAPIController.getByID);

module.exports = router;