const express = require('express');
const router = express.Router(); 
const aController = require("../controllers/admin");
const path = require("path");
const fs = require("fs");
let multer = require("multer");
const {check, body} = require('express-validator');
let adminMiddleware = require("../middlewares/adminMiddleware");


let miStorage = multer.diskStorage({ //configuración del storage
    destination: function(req, file, cb){
        //console.log(path.join("..","..","/public","images","users"));
        if(req.originalUrl.includes("/admin/usersCreation")){
            cb(null, path.join("public","images","users"));
        } else {
            cb(null, path.join("public","images","products")); //esta carpeta debe existir (ojo de escribir bien la ruta -fijarse si no hay que hacer un ../ )
        }
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
                        storage: miStorage,
                        fileFilter(req, file, cb){
                            //req.errorMayub = {msg:"Sarasa"}; //PARA PROBAR LO DE PASARLE ESTO CON DATA Y VALIDAR LUEGO
                            cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
                        }
                    }); 

router.get("/", adminMiddleware, aController.admin);

router.get("/nop", aController.nop);

router.get("/productCreation", adminMiddleware, aController.productCreation);

router.get("/productsList", adminMiddleware, aController.productsList);

router.put("/productCreation/create", 
            [ 
                upload.fields([
                                {name: 'images'}
                            ]),
                check('name').isLength({min:1}).withMessage('Debes ingresar un nombre de producto'),
                check('shortDescription').isLength({min:1}).withMessage('La descripción corta es obligatoria'),
                check('code').isLength({min:1}).withMessage('Debes ingresar un código de producto'),
                check('largeDescription').isLength({min:1}).withMessage('La descripción larga es obligatoria'),
                check('specs').isLength({min:1}).withMessage('Las especificaciones son obligatorias'),
                check('price').isFloat({min:0.01}).withMessage('El precio debe ser un valor mayor a 0'),
                body("images").custom(function(value, {req}){
                    if(typeof req.files.images != "undefined" && req.files.images.filter(im=> im.size > 5242880).length == 0){  //req.files.images[0].size <= 5242880){
                        return true;
                    } else {
                        if(typeof req.files.images != "undefined"){
                            for (let i = 0; i < req.files.images.length; i++) {
                                const imageFile = req.files.images[i];
                                let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                                if (fs.existsSync(filePath)) {
                                    fs.unlinkSync(filePath);
                                }
                            }
                        }
                        throw new Error('Al menos una image es obligatoria (PDF, JPG o JPEG) y deben pesar hasta 5MB');
                    }
                })
            ], aController.productCreate);

router.put("/productEdition/save/:id", 
            [ 
                upload.fields([
                                {name: 'images'}
                            ]),
                check('name').isLength({min:1}).withMessage('Debes ingresar un nombre de producto'),
                check('shortDescription').isLength({min:1}).withMessage('La descripción corta es obligatoria'),
                check('code').isLength({min:1}).withMessage('Debes ingresar un código de producto'),
                check('largeDescription').isLength({min:1}).withMessage('La descripción larga es obligatoria'),
                check('specs').isLength({min:1}).withMessage('Las especificaciones son obligatorias'),
                check('price').isFloat({min:0.01}).withMessage('El precio debe ser un valor mayor a 0'),
                body("images").custom(function(value, {req}){
                    //Primero tengo q recuperar los nombres de los files ya subidos
                    let { id } = req.params;
                    let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
                    prods = JSON.parse(prods);
                    let oriProd = prods.find(p=> p.Id == id);
                    if(oriProd){
                        //determinar si efectivamente, entre lo anterior y lo nuevo, hay al menos una imagen
                        if(oriProd.Images.length > 0 && 
                            ((typeof req.files.images != "undefined" && req.files.images.filter(im=> im.size > 5242880).length == 0) ||
                             (typeof req.files.images == "undefined"))
                          ) {
                            return true;
                        } else {
                            if(typeof req.files.images != "undefined" && req.files.images.filter(im=> im.size > 5242880).length == 0){  //req.files.images[0].size <= 5242880){
                                return true;
                            } else {
                                if(typeof req.files.images != "undefined"){
                                    for (let i = 0; i < req.files.images.length; i++) {
                                        const imageFile = req.files.images[i];
                                        let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                                        if (fs.existsSync(filePath)) {
                                            fs.unlinkSync(filePath);
                                        }
                                    }
                                }
                                throw new Error('Al menos una image es obligatoria (PDF, JPG o JPEG) y deben pesar hasta 5MB');
                            }
                        }
                    } else{
                        console.log("admin.js router - image custom validator - oriProd no encontrado");
                        throw new Error('Error inesperado');
                    }
                })
            ], aController.productEditionSave); 

router.get("/productEdition/:id", adminMiddleware, aController.productEdition); 

router.delete("/productDelete/:id", aController.productDelete);

router.post("/imageDelete/:id/:filename", aController.imageDelete);

router.get("/usersList", adminMiddleware, aController.usersList);

router.get("/usersCreation", adminMiddleware, aController.usersCreation);
router.put("/usersCreation", [ 
                                    upload.fields([
                                        {name: 'avatar', maxCount: 1}
                                    ]),
                                    check('name').isLength({min:1}).withMessage('Debes ingresar un nombre'),
                                    check('lastName').isLength({min:1}).withMessage('Debes ingresar un apellido '),
                                    check('email').isEmail().withMessage('No es un email válido'),
                                    check('password').isLength({min:6}).withMessage('Debes ingresar una contraseña'),
                                    body("avatar").custom(function(value, {req}){
                                        if(typeof req.files.avatar != "undefined" && req.files.avatar[0].size <= 209715){
                                            return true;
                                        } else {
                                            if(typeof req.files.avatar != "undefined"){
                                                let filePath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                                                if (fs.existsSync(filePath)) {
                                                    fs.unlinkSync(filePath);
                                                }
                                            }
                                            throw new Error('La imagen es obligatoria y hasta 2MB');
                                        }
                                    })
                                ], aController.usersAdminCreation);


module.exports = router;