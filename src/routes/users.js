const express = require('express');
const path = require("path"); 
const router = express.Router(); 
let multer = require("multer");
const {check, checkSchema, body} = require('express-validator');
const usersController = require("../controllers/users");
const userProfileMiddleware = require("../middlewares/userProfileMiddleware");
const db = require("../database/models");

let miStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join("public","images","users"));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({
                        storage: miStorage,
                        fileFilter(req, file, cb){
                            cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif');
                        }
                    }); 


router.get("/", usersController.login);
router.post("/", usersController.checkuser);


router.get("/register", usersController.create);
router.post("/register",
            [ 
                upload.fields([
                    {name: 'avatar', maxCount: 1}
                ]),
                check('name').isLength({min:2}).withMessage('Debes ingresar un nombre'),
                check('lastName').isLength({min:2}).withMessage('Debes ingresar un apellido'),
                check('email').normalizeEmail().isEmail().withMessage('No es un email válido'),
                check('password').not()
                                 .isEmpty().trim()
                                 .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "i")
                                 .withMessage('Debes ingresar una contraseña de al menos 8 caracteres. Debe contener al menos una mayúscula, un nro y un caracter especial.'),
                check('repassword').custom((value, { req }) => {
                    if (value !== req.body.password) {
                      throw new Error('La confirmación de contraseña no concuerda');
                    }
                    return true;
                }),
                check('ciudadDeEntrega').isLength({min:3}).withMessage('Debes ingresar una ciudad de entrega'),
                check('paisDeEntrega').isLength({min:4}).withMessage('Debes ingresar un país de entrega'),
                check('calleDeEntrega').isLength({min:5}).withMessage('Debes ingresar una dirección de entrega'),
                check('cpDeEntrega').isLength({min:4}).withMessage('Debes ingresar un código postal de entrega'),
                body("avatar").custom(function(value, {req}){
                    if(typeof req.files.avatar != "undefined" && req.files.avatar[0].size <= 2097150){
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
            ],
            usersController.creation);

router.get("/close/:id", usersController.logout);

router.get("/:id", userProfileMiddleware, usersController.data);

router.get("/edit/:id", userProfileMiddleware, usersController.dataEdit);
router.put("/edit/:id", [ 
                            upload.fields([
                                {name: 'avatar', maxCount: 1}
                            ]),
                            check('name').isLength({min:2}).withMessage('Debes ingresar un nombre'),
                            check('lastName').isLength({min:2}).withMessage('Debes ingresar un apellido '),
                            check('editPassword').custom((value, { req }) => {
                                if (value){
                                    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!.%*?&]{8,}$/;
                                    if(req.body.password != req.body.repassword){
                                        throw new Error('La confirmación de contraseña no concuerda');
                                    }
                                    if(!regex.test(req.body.password)){
                                        throw new Error('Debes ingresar una contraseña de al menos 8 caracteres. Debe contener al menos una mayúscula, un nro y un caracter especial.');
                                    }
                                } 
                                return true;
                            }),
                            check('calleDeEntrega').isLength({min:5}).withMessage('Debes ingresar una dirección de entrega'),
                            check('ciudadDeEntrega').isLength({min:3}).withMessage('Debes ingresar una ciudad de entrega'),
                            check('paisDeEntrega').isLength({min:4}).withMessage('Debes ingresar un país de entrega'),
                            check('cpDeEntrega').isLength({min:4}).withMessage('Debes ingresar un código postal de entrega'),
                            body("avatar").custom(async function(value, {req}){
                                let { id } = req.params;
                                let oriUser = await db.User.findByPk(id);
                                if(oriUser){
                                    //determinar si efectivamente, entre lo anterior y lo nuevo, hay al menos una imagen
                                    if(oriUser.avatar != "" && 
                                        ((typeof req.files.avatar != "undefined" && req.files.avatar[0].size <= 2097150) ||
                                            (typeof req.files.avatar == "undefined"))
                                        ) {
                                        return true;
                                    } else {
                                        if(typeof req.files.avatar != "undefined" && req.files.avatar[0].size <= 2097150){
                                            return true;
                                        } else {
                                            if(typeof req.files.avatar != "undefined"){
                                                for (let i = 0; i < req.files.avatar.length; i++) {
                                                    const imageFile = req.files.avatar[i];
                                                    let filePath = path.join(__dirname,"../../", "/public/images/users/", imageFile.filename); 
                                                    if (fs.existsSync(filePath)) {
                                                        fs.unlinkSync(filePath);
                                                    }
                                                }
                                            }
                                            throw new Error('La imagen es obligatoria (PDF, JPG o JPEG) y debe pesar hasta 2MB');
                                        }
                                    }
                                } else{
                                    console.log("admin.js router - image custom validator - oriUser no encontrado");
                                    throw new Error('Error inesperado');
                                }
                            })
                        ], usersController.dataEditSave);

module.exports = router;