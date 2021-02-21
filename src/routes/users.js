const express = require('express');
const path = require("path"); 
const router = express.Router(); 
let multer = require("multer");
const {check, checkSchema, body} = require('express-validator');
const usersController = require("../controllers/users");

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
                            cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
                        }
                    }); 


router.get("/", usersController.login);
<<<<<<< HEAD
router.put("/", usersController.checkuser);


router.get("/register", usersController.create);
router.post("/register/create", usersController.creation);

=======
router.post("/", usersController.checkuser);


router.get("/register", usersController.create);
router.post("/register",
            [ 
                upload.fields([
                    {name: 'avatar', maxCount: 1}
                ]),
                check('name').isLength({min:1}).withMessage('Debes ingresar un nombre'),
                check('lastName').isLength({min:1}).withMessage('Debes ingresar un apellido '),
                check('email').isEmail().withMessage('No es un email válido'),
                check('password').isLength({min:6}).withMessage('Debes ingresar una contraseña'),
                check('repassword').custom((value, { req }) => {
                    if (value !== req.body.password) {
                      throw new Error('La confirmación de contraseña no concuerda');
                    }
                    return true;
                }),
                check('calleDeEntrega').isLength({min:1}).withMessage('Debes ingresar una calle de entrega'),
                check('cpDeEntrega').isLength({min:4}).withMessage('Debes ingresar un código postal de entrega'),
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
            ],
            usersController.creation);
>>>>>>> 7791b0297fa45f551b0754cb619a1876c4c490e0

router.put("/userEdition/save/:id", usersController.editionSave); 
router.get("/userEdition/:id", usersController.edition); 

router.delete("/userDelete/:id", usersController.delete);

router.get("/close/:id", usersController.logout);

module.exports = router;