const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const db = require("../database/models");
const {Op, literal} = require("sequelize");
const bcrypt = require ("bcrypt");
const bfgFunctions = require("../utils/bfgFunctions");

module.exports = {
    admin: function(req, res){
        req.session.usrInput = null;
        res.render("admin");
    },

    nop: function(req, res){
        req.session.usrInput = null;
        res.render("nop");
    },

    productCreation: function(req, res){
        let state = req.query.state;
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
                    msg: `Se creó el producto con ID: ${req.query.id}` ,
                    color: "green"
                }
            break;
            case "2":
                state={
                    showMessage: true,
                    msg: `Ya existe el producto con nombre: ${req.query.pname} `,
                    color: "yellow"
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


        // let brands = fs.readFileSync(path.join(__dirname, "../", "data", "brands.json"), "utf-8");
        // brands = JSON.parse(brands);
        let brandsPromise = db.Brand.findAll();

        // let pTypes = fs.readFileSync(path.join(__dirname, "../", "data", "productTypes.json"), "utf-8");
        // pTypes = JSON.parse(pTypes);
        let pTypesPromise = db.Type.findAll();

        // let pStates = fs.readFileSync(path.join(__dirname, "../", "data", "productStates.json"), "utf-8");
        // pStates = JSON.parse(pStates);
        let pStatesPromise = db.State.findAll();

        let countriesPromise = db.Country.findAll();

        Promise.all([brandsPromise, pTypesPromise, pStatesPromise, countriesPromise])
        .then((data)=>{ 
            let brands = data[0];
            let pTypes = data[1];
            let pStates = data[2];
            let countries = data[3];
            
            let usrInput = req.session.usrInput ? req.session.usrInput : null;
            res.render("./products/productCreation", {brands: brands, pTypes: pTypes, pStates: pStates, state: state, countries: countries, usrInput: usrInput});
        })
        .catch((error)=>{
            res.send(error.toString());
        });

    },

    
    productCreate: async function(req, res){
        try {
            let {name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState } = req.body;
            let errors = validationResult(req);

            let usrInput = {
                Name: name,
                ShortDescription: shortDescription,
                Brand: brand,
                Code: code,
                LargeDescription: largeDescription,
                Specs: specs,
                Price: price,
                ProductType: productType,
                ProductState: productState,
            }
            req.session.usrInput = usrInput;

            if(errors.isEmpty()) {
                // let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
                // prods = JSON.parse(prods);
                // let oldProd = prods.find(p=> p.Name == name);//verifico si existe uno con igual nombre (es una validación poco seria, pero es a fines prácticos)
                
                let prod = await db.Product.findAll({
                    where:{
                         name: name         
                   }
                });

                
                if(prod.length == 0){
                    // let newProd = {
                    //                 Name: name,
                    //                 ShortDescription: shortDescription,
                    //                 LargeDescription: largeDescription,
                    //                 Specs: specs,//specs.split("\n"),
                    //                 Price: price,
                    //                 Images: req.files.images.map(i=> {return i.filename}),
                    //                 ProductType: productType,
                    //                 ProductState: productState,
                    //                 Brand: brand,
                    //                 Code: code
                    //             }
                    db.Product.create({
                                            name: name,
                                            ShortDescription: shortDescription,
                                            LargeDescription: largeDescription,
                                            Specs: specs,//specs.split("\n"),
                                            Price: price,
                                            Images: JSON.stringify(req.files.images.map(i=> {return i.filename})),
                                            ProductType: productType,
                                            ProductState: productState,
                                            Brand: brand,
                                            Code: code
                                        })
                    .then((r)=>{
                        req.session.usrInput = null;
                        res.redirect(`/admin/productCreation?state=1&id=${r.dataValues.id}`);
                    })
                    .catch(error=>{
                        req.session.pcErrors = errors;
                        console.log(error);
                        res.redirect(`/admin/productCreation?state=3`);
                    });
                 
                } else{//si ya existe
                    if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                        for (let i = 0; i < req.files.images.length; i++) {
                            const imageFile = req.files.images[i];
                            let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath);
                            }
                        }
                    }
                    res.redirect(`/admin/productCreation?state=2&pname=${name}`);//ya existe
                }
            } else {
                if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                    for (let i = 0; i < req.files.images.length; i++) {
                        const imageFile = req.files.images[i];
                        let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    }
                }
                req.session.pcErrors = errors;
                // console.log(errors);
                res.redirect(`/admin/productCreation?state=3`);

            }
            
        } catch (error) {
            if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                for (let i = 0; i < req.files.images.length; i++) {
                    const imageFile = req.files.images[i];
                    let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }
            res.redirect(`/admin/productCreation?state=0&msg=${error.toString()}`);
        }
    },

    productsList: function(req, res){
        let state = req.query.state;
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
                    msg: `Se borró el producto con ID: ${req.query.id}` ,
                    color: "green"
                }
            break;
            case "2":
                state={
                    showMessage: true,
                    msg: `Ya existe el producto con nombre: ${req.query.pname} `,
                    color: "yellow"
                }
            break;
            default:
                state={
                    showMessage: false
                }
            break;
        }

        db.Product.findAll()
        .then(prods=>{
            bfgFunctions.imagesParser(prods);
            return res.render("./products/productsList", {products: prods, state: state});
        })
        .catch(errors=>{
            req.session.pcErrors = errors;
            console.log(errors);
            res.redirect(`/admin/productsListn?state=0&msg=Se produjo un error`);
        });
    },
    
    productEdition: function(req, res){
        try {
            let state = req.query.state;
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
                        msg: `Se editó correctamente el producto con ID: ${req.query.id}` ,
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

            let brandsPromise = db.Brand.findAll();
            let pTypesPromise = db.Type.findAll();
            let pStatesPromise = db.State.findAll();
            let productPromise = db.Product.findByPk(id);
    
            Promise.all([brandsPromise, pTypesPromise, pStatesPromise, productPromise])
            .then((data)=>{
                let brands = data[0];
                let pTypes = data[1];
                let pStates = data[2];
                let oriProd = data[3];
                if(oriProd){
                    oriProd.Specs = oriProd.Specs.replace(/\\r/g, "");
                    oriProd.Specs = oriProd.Specs.replace(/\"/g, "");
                    oriProd.Specs = oriProd.Specs.split(",");
                    bfgFunctions.imagesParser([oriProd]);
                    req.session.ImagesArray = oriProd.Images;
                    let usrInput = req.session.usrInput ? req.session.usrInput : null;
                    return res.render("./products/productEdition", {product: oriProd, brands: brands, pTypes: pTypes, pStates: pStates, state: state, usrInput: usrInput});
                } else{
                    throw new Error("No se encontró un producto con id: " + id.toString());
                }
            })
            .catch(error=>{
                return res.redirect(`/admin/productEdition?state=0&msg=${error.toString()}`);
            })

        } catch (error) {
            res.redirect(`/admin/productEdition?state=0&msg=${error.toString()}`);
        }
    },

    productEditionSave: function(req, res){
        let id = 0;
        try {
            let {name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState } = req.body;
            let errors = validationResult(req);
            id = req.params.id;

            let usrInput = {
                Name: name,
                ShortDescription: shortDescription,
                Brand: brand,
                Code: code,
                LargeDescription: largeDescription,
                Specs: specs,
                Price: price,
                ProductType: productType,
                ProductState: productState,
            }
            req.session.usrInput = usrInput;
            
            if(errors.isEmpty()) {
                let images;
                if(req.session.ImagesArray != undefined && req.session.ImagesArray.length > 0){
                    images = [...req.files.images.map(i=> {return i.filename}), ...req.session.ImagesArray];
                } else{
                    images = req.files.images.map(i=> {return i.filename});
                }

                db.Product.update({
                                    name: name,
                                    ShortDescription: shortDescription,
                                    LargeDescription: largeDescription,
                                    Specs: specs,//specs.split("\n"),
                                    Price: price,
                                    Images: JSON.stringify(images),
                                    ProductType: productType,
                                    ProductState: productState,
                                    Brand: brand,
                                    Code: code
                                },
                                {
                                    where:{
                                            id: id  
                                        }
                                }    
                )
                .then(result=>{
                    if(result && result.length > 0 && result[0] == 1){
                        req.session.ImagesArray = images;
                        return res.redirect(`/admin/productEdition/${id}?state=1&id=${id}`);//OK
                    } else{
                        throw new Error("No se ha podido encontrar el producto con ID: " + id);
                    }
                })
                .catch(error=>{
                    return res.redirect(`/admin/productEdition/${id}?state=0&msg=${error.toString()}`);
                });

            } else {
                if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                    for (let i = 0; i < req.files.images.length; i++) {
                        const imageFile = req.files.images[i];
                        let filePath = path.join(__dirname,"../../", "/public/images/products/", imageFile.filename); 
                        if (fs.existsSync(filePath)) {
                            fs.unlinkSync(filePath);
                        }
                    }
                }
                req.session.pcErrors = errors;
                // console.log(errors);
                res.redirect(`/admin/productEdition/${id}?state=3`); 
            }
        } catch (error) {
            res.redirect(`/admin/productEdition/${id}?state=0&msg=${error.toString()}`);//ya existe
        }
    },

    productDelete: function(req, res){
        let id = 0;
        try {
            id = req.params.id;
            db.Product.destroy(
                {
                    where: {
                                id: id 
                            }
                })
                .then(result=>{
                    if(result == 1){
                        return res.end(JSON.stringify({"success" : "Borrado exitoso", "status" : 200}));
                    } else{
                        return res.status(400).send(JSON.stringify({
                            message: "No se ha podido encontrar el producto con ID: " + id
                        }));
                    }
                })
                .catch(error=>{
                    return res.status(400).send(JSON.stringify({
                        message: error.toString()
                     }));
                });
        } catch (error) {
            return res.status(400).send(JSON.stringify({
                message: error.toString()
             }));
        }
    },

    imageDelete: function(req, res){
        try {
            //
            let pId = req.params.id;
            let filename = req.params.filename;
            let images;
            if(req.session.ImagesArray != undefined && req.session.ImagesArray.length > 0){
                images = req.session.ImagesArray;
            } else{
                images = [];
            }

            let imgInArr = images.find(im=> im.toLowerCase() == filename.toLowerCase());
            if(imgInArr){
                let filePath = path.join(__dirname,"../../", "/public/images/products/", filename); 
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                images = images.filter(im=> im.toLowerCase() != filename.toLowerCase());
                
                db.Product.update({
                    Images: JSON.stringify(images),
                },
                {
                    where:{
                            id: pId  
                        }
                })
                .then(result=>{
                    if(result && result.length > 0 && result[0] == 1){
                        req.session.ImagesArray = images;
                        return res.end(JSON.stringify({"success" : "Borrado exitoso", "status" : 200}));
                    } else{
                        return res.status(400).send({
                            message: "No se ha podido encontrar la imagen"
                        });
                    }
                })
                .catch(error=>{
                    return res.status(400).send({
                        message: error.toString()
                    });
                });
            }
        } catch (error) {
            return res.status(400).send({
                message: error.toString()
             });
        }
    },

    usersList: function(req, res){
        db.User.findAll()
        .then(users=>{
            res.render("./users/usersList", {users: users});
        })
        .catch(error=>{
            res.render("error", {msg:"UPS! algo no fue bien", img: "broken.jpg"});
        });
    },

    usersCreation: function(req, res){
        let state = req.query.state;
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
                    msg: `Se creó el usuario con ID: ${req.query.id}` ,
                    color: "green"
                }
            break;
            case "2":
                state={
                    showMessage: true,
                    msg: `Ya existe un usuario con nombre: ${req.query.pname} `,
                    color: "yellow"
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
        let usrInput = req.session.usrInput ? req.session.usrInput : null;
        res.render("./users/registerAdmin", {state: state, usrInput: usrInput});

    },
    usersAdminCreation: function(req, res){
        try {
            let {name, lastName, email, password} = req.body;
            let errors = validationResult(req);

            let inputValues = undefined;
            if(typeof(req.inputValues) != "undefined"){
                inputValues = req.inputValues
            } else{
                inputValues = {
                    name: name,
                    lastName: lastName,
                    email: email,
                    password: password,
                };
            }
            req.session.inputValues = inputValues;

            if(errors.isEmpty()) {
                let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
                users = JSON.parse(users);
                                
                let preUser = users.find(u=>u.email == req.body.email);
                if(preUser){
                // res.send("Ya existe el usuario");
                    return res.render("./users/registerAdmin", {errors: [{msg:"El usuario ya existe"}], inputValues: req.session.inputValues});
                }
                
                let maxID = users.reduce((max, user) => max.Id > user.Id ? max : user);
                let newID = parseInt(maxID.id) + 1;

                let newUser = {...inputValues};
                newUser.id = newID;
                newUser.type = 0;//Con esto le digo q va a ser un admin
                newUser.password = bcrypt.hashSync(req.body.password, 12);
                newUser.avatar = req.files.avatar[0].filename;

                users.push(newUser);

                fs.writeFileSync(path.join(__dirname,"../data/users.json"), JSON.stringify(users));
                req.session.inputValues = undefined; //limpio la session de los valores de los inputs
                delete newUser.password;
                return res.redirect("/admin/usersList");
            } else {
                //Borro la imagen de avatar si es que se subió
                if(typeof req.files.avatar != "undefined"){
                    let avatarPath = path.join(__dirname,"../../", "/public/images/users/", req.files.avatar[0].filename); 
                    if (fs.existsSync(avatarPath)) {
                        fs.unlinkSync(avatarPath);
                    }
                }
                console.log(errors.errors);
                return res.render("./users/registerAdmin", {errors: errors.errors, inputValues: req.session.inputValues});
                // return res.redirect(`/admin/registerAdmin?state=0&msg=${error.toString()}`);
            }
//
        } catch (error) {
            if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                for (let i = 0; i < req.files.images.length; i++) {
                    const imageFile = req.files.images[i];
                    let filePath = path.join(__dirname,"../../", "/public/images/users/", imageFile.filename); 
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
            }
            return res.redirect(`/admin/registerAdmin?state=0&msg=${error.toString()}`);
        }
    },

}


function fakeRemoveProducts(arr){
    let rnd = getRandomArbitrary(1,4); 
    let newArr = arr.map(e=> e);
    for (let i=0; i<rnd; i++) {
        newArr.pop();
    }
    return newArr;

    
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}