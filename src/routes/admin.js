const express = require('express');
const router = express.Router(); 
const aController = require("../controllers/admin");

router.get("/", aController.admin);

router.get("/productCreation", aController.productCreation);

router.put("/productCreation/create", aController.productCreate);

router.get("/productEdition", aController.productEdition); //FALTA CREAR EJS Y CONTROLLER (OTRA OPCION ES UTILIZAR ADMIN, Y POR MEDIO DE OTROS PARAMETROS "CONVERTIRLA" EN PAGINA DE EDICION)


module.exports = router;