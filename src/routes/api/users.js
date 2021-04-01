const express = require('express');
const router = express.Router(); 
const uAPIController = require("../../controllers/api/usersAPIController");

router.get("/", uAPIController.getAll);
router.get("/:id", uAPIController.getByID);


module.exports = router;