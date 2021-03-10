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
            }).then(data=>{
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
            }).catch(error=>{
                return res.render("./users/login", {errors: [{msg:"Algo salió mal, intente mas tarde."}]})
            });

        // let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
        // users = JSON.parse(users);

        // let user = users.find(u=> u.email == req.body.usuario && bcrypt.compareSync(req.body.password, u.password));
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
                let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
                users = JSON.parse(users);
                
                
                let preUser = users.find(u=>u.email == req.body.email);
                if(preUser){
                // res.send("Ya existe el usuario");
                return res.render("./users/register", {errors: [{msg:"El usuario ya existe"}], inputValues: req.session.inputValues});
                }
                
                let maxID = users.reduce((max, user) => max.Id > user.Id ? max : user);
                let newID = parseInt(maxID.id) + 1;

                let newUser = {...inputValues};
                newUser.id = newID;
                newUser.type = 1;
                newUser.password = bcrypt.hashSync(req.body.password, 12);
                newUser.avatar = req.files.avatar[0].filename;

                users.push(newUser);

                fs.writeFileSync(path.join(__dirname,"../data/users.json"), JSON.stringify(users));
                req.session.inputValues = undefined; //limpio la session de los valores de los inputs
                delete newUser.password;
                req.session.loggedUser = {... newUser};
                return res.redirect("/");
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

        delete: function (req, res){

        },

    }
