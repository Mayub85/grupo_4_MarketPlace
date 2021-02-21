const express = require('express');
const router = express.Router(); 
const usersController = require("../controllers/users");


router.get("/", usersController.login);
router.put("/", usersController.checkuser);


router.get("/register", usersController.create);
router.post("/register/create", usersController.creation);


router.put("/userEdition/save/:id", usersController.editionSave); 
router.get("/userEdition/:id", usersController.edition); 

router.delete("/userDelete/:id", usersController.delete);

module.exports = router;