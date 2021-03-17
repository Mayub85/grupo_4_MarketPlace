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
                check('calleDeEntrega').isLength({min:5}).withMessage('Debes ingresar una calle de entrega'),
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

router.get("/:id", usersController.data);

router.get("/edit/:id", usersController.dataEdit);
router.put("/edit/:id", usersController.dataEditSave);

module.exports = router;