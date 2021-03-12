    const path = require("path"); 
    const fs = require("fs");
    const {validationResult} = require('express-validator');
    const bcrypt = require ("bcrypt");
    const db = require("../database/models");

    module.exports = {
        users: function(req, res){
            res.render("login"); 
        },

        login: function (req, res){
            res.render ("./users/login")
        },

        logout: function (req, res){
            if (req.params.id != undefined) {
                req.session.loggedUser = undefined;
                res.cookie("recordarme", 0, {maxAge: 0});
                res.redirect("/");
            } 
        },

        checkuser: function (req, res){
            db.User.findAll({
                where: { 
                    email: req.body.usuario
                }
            })
            .then(data=>{
                if(data && data.length>0){
                    if(bcrypt.compareSync(req.body.password, data[0].password)){
                        delete data[0].dataValues.password;
                        req.session.loggedUser = {...data[0].dataValues};
                        if(req.body.remember != undefined){ 
                            res.cookie("recordarme", data[0].dataValues.id, { maxAge: 1296000});//nombre de la cookie, valor a guardar, duración de la cookie
                        }
                        return res.redirect("/");  
                    }  else{
                        return res.render("./users/login", {errors: [{msg:"Verifique los datos ingresados."}]})  
                    }
                }else{
                    return res.render("./users/login", {errors: [{msg:"Verifique los datos ingresados."}]})  
                }
            })
            .catch(error=>{
                console.log(error);
                return res.render("./users/login", {errors: [{msg:"Algo salió mal, intente mas tarde."}]})
            });
        },

        create: function (req, res){
            if(typeof(req.inputValues) != "undefined"){
                res.render("./users/register", {inputValues: req.inputValues});
            } else if(typeof(req.session.inputValues) != "undefined"){   
                res.render("./users/register", {inputValues: req.session.inputValues});
            } else {
            res.render("./users/register");
            }
        },
        
        creation: function (req, res){
            let inputValues = undefined;
            if(typeof(req.inputValues) != "undefined"){
                inputValues = req.inputValues
            } else{
                inputValues = {
                    name: req.body.name, 
                    lastName: req.body.lastName, 
                    email: req.body.email,
                    calleDeEntrega: req.body.calleDeEntrega, 
                    ciudadDeEntrega: req.body.ciudadDeEntrega, 
                    paisDeEntrega: req.body.paisDeEntrega, 
                    cpDeEntrega: req.body.cpDeEntrega,
                };
            }
            req.session.inputValues = inputValues;
            let errors = validationResult(req);

            if(errors.isEmpty()) {
                db.User.findAll({
                    where: { 
                        email: req.body.email
                    },
                    paranoid: false
                })
                .then(data=>{
                    if(data && data.length > 0){
                        return res.render("./users/register", {errors: [{msg:"El usuario ya existe"}], inputValues: req.session.inputValues});
                    } else {
                        let newUser = {...inputValues};
                        newUser.type = 1;
                        newUser.password = bcrypt.hashSync(req.body.password, 12);
                        newUser.avatar = req.files.avatar[0].filename;

                        db.User.create({
                            ...newUser
                        })
                        .then((r)=>{
                            newUser.id = r.id;
                            req.session.inputValues = undefined; //limpio la session de los valores de los inputs
                            delete newUser.password;
                            req.session.loggedUser = {...newUser};
                            return res.redirect("/");
                        })
                        .catch(error=>{
                            req.session.pcErrors = errors;
                            console.log(error);
                            return res.redirect(`/users/register?state=3`);
                        });
                    }
                })
                .catch(error=>{
                    console.log(error);
                    if(typeof req.files.avatar != "undefined"){
                        let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                        if (fs.existsSync(avatarPath)) {
                            fs.unlinkSync(avatarPath);
                        }
                    }
                    return res.render("./users/register", {errors: [{msg:"Algo salió mal, intente mas tarde."}], inputValues: req.session.inputValues});
                });
            } else {
                //Borro la imagen de avatar si es que se subió
                if(typeof req.files.avatar != "undefined"){
                    let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath);
                    }
                }
                console.log(errors.errors);
                res.render("./users/register", {errors: errors.errors, inputValues: req.session.inputValues});
            }
        },

        editionSave: function (req, res){

        },

        edition: function (req, res){

        },

    }
