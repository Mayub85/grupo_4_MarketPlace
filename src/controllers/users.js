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

        data: function (req, res){
            let { id } = req.params;
            db.User.findByPk(id)
            .then((data)=>{
                if(data){
                    let oriUser = data;
                    return res.render("./users/data", {user: oriUser});
                } else{
                    throw new Error("No se encontró un usuario con id: " + id.toString());
                }
            })
            .catch(error=>{
                return res.redirect(`/admin/userEdition?state=0&msg=${error.toString()}`);
            });
        },

        

        dataEdit: function (req, res){
            try {
                let state = req.query.state;
                let firstLoad = Object.keys(req.query).length == 0;
                switch (state) {
                    case "0":
                        state={
                            showMessage: true,
                            msg: req.query.msg,
                            color: "red"
                        }
                    break;
                    case "1":
                        state={
                            showMessage: true,
                            msg: `Se editó correctamente el usuario con ID: ${req.query.id}` ,
                            color: "green"
                        }
                    break;
                    case "3":
                    state={
                        showMessage: true,
                        msg: req.session.pcErrors.errors,
                        color: "red",
                        isArray: true
                    }
                break;
                    default:
                        state={
                            showMessage: false
                        }
                    break;
                }
    
                let { id } = req.params;
                db.User.findByPk(id)
                .then((data)=>{
                    if(data){
                        let oriUser = data;
                        let usrInput = req.session.usrInput ? req.session.usrInput : undefined;
                        req.session.userAvatar = data.avatar;
                        return res.render("./users/edit", {user: oriUser, state: state, usrInput: usrInput, firstLoad: firstLoad});
                    } else{
                        return res.render("./users/edit", {user: {id: id}, state: state, usrInput: undefined, firstLoad: firstLoad})
                    }
                })
                .catch(error=>{
                    return res.redirect(`/users/edit?state=0&msg=${error.toString()}`);
                })
    
            } catch (error) {
                res.redirect(`/users/edit?state=0&msg=${error.toString()}`);
            }
        },

        dataEditSave: function (req, res){
            let id = 0;
            let uUser;
            try {
                let {editPassword, password, repassword, name, lastName, avatar, calleDeEntrega, ciudadDeEntrega, paisDeEntrega, cpDeEntrega} = req.body;
                let errors = validationResult(req);
                id = req.params.id;

                let usrInput = {...req.body}
                req.session.usrInput = usrInput;
            
                if(errors.isEmpty()) {
                    let newAvatar = req.session.userAvatar;
                    if(typeof req.files != "undefined" && typeof req.files.avatar != "undefined" && req.files.avatar.length > 0){
                        newAvatar = req.files.avatar[0].filename;
                    }

                    if(newAvatar == ""){
                        newAvatar = "default.jpg";
                    }

                    uUser = {
                        avatar: newAvatar,
                        name: name,
                        lastName: lastName,
                        // country_id
                        paisDeEntrega: paisDeEntrega,
                        calleDeEntrega: calleDeEntrega,
                        ciudadDeEntrega: ciudadDeEntrega,
                        cpDeEntrega: cpDeEntrega
                    }

                    if(editPassword){
                        uUser.password = bcrypt.hashSync(password, 12);
                    } 

                    db.User.update({
                                    ...uUser
                                    },
                                    {
                                        where:{
                                                id: id  
                                            }
                                    }    
                    )
                    .then(result=>{
                        if(result && result.length > 0 && result[0] == 1){
                            req.session.userAvatar = uUser.avatar;
                            return res.redirect(`/users/edit/${id}?state=1&id=${id}`);//OK
                        } else{
                            if(typeof req.files.avatar != "undefined"){
                                let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                                if (fs.existsSync(avatarPath)) {
                                    fs.unlinkSync(avatarPath);
                                }
                            }
                            return res.redirect(`/users/edit/${id}?state=0&msg=No se ha podido encontrar el usuario con ID: ${id}`);
                        }
                    })
                    .catch(error=>{
                        return res.redirect(`/users/edit/${id}?state=0&msg=${error.toString()}`);
                    });
                } else {
                    if(typeof req.files != "undefined" && typeof req.files.avatar != "undefined"){
                        let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                        if (fs.existsSync(avatarPath)) {
                            fs.unlinkSync(avatarPath);
                        }
                    }
                    req.session.pcErrors = errors;
                    res.redirect(`/users/edit/${id}?state=3`); 
                }
            } catch (error) {
                if(typeof req.files != "undefined" && typeof req.files.avatar != "undefined"){
                    let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath);
                    }
                }
                res.redirect(`/users/edit/${id}?state=0&msg=${error.toString()}`);//ya existe
            }
        },

    }
