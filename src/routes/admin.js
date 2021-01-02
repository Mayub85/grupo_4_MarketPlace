const express = require('express');
const router = express.Router(); 
const aController = require("../controllers/admin");

router.get("/", aController.admin);

router.get("/edit", aController.edit); //FALTA CREAR EJS Y CONTROLLER (OTRA OPCION ES UTILIZAR ADMIN, Y POR MEDIO DE OTROS PARAMETROS "CONVERTIRLA" EN PAGINA DE EDICION)

router.put("/create", aController.create);

module.exports = router;