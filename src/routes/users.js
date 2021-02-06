const express = require('express');
const router = express.Router(); 
const usersController = require("../controllers/users");


router.get("/", usersController.login);
router.put("/", usersController.checkuser);
// porque login no es con post?

router.get("/register", usersController.creation);
router.post("/register/create", usersController.create);
// cambién la ruta de create a metodo post ok?

router.put("/userEdition/save/:id", usersController.editionSave); 
router.get("/userEdition/:id", usersController.edition); 

router.delete("/userDelete/:id", usersController.delete);

module.exports = router;