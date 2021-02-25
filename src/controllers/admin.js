const path = require("path");
const fs = require("fs");
const {validationResult} = require('express-validator');
const db = require ("../database/models");
const {Op, literal} = require("sequelize");
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

        Promise.all([brandsPromise, pTypesPromise, pStatesPromise])
        .then((data)=>{ 
            let brands = data[0];
            let pTypes = data[1];
            let pStates = data[2];
            console.log(data);
            let usrInput = req.session.usrInput ? req.session.usrInput : null;
            res.render("./products/productCreation", {brands: brands, pTypes: pTypes, pStates: pStates, state: state, usrInput: usrInput});
        })
        .catch((error)=>{
            res.send(error.toString());
        });

    },

    
    productCreate: function(req, res){
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
                let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
                prods = JSON.parse(prods);
                
                let oldProd = prods.find(p=> p.Name == name);//verifico si existe uno con igual nombre (es una validación poco seria, pero es a fines prácticos)
                if(!oldProd){
                    let maxID = prods.reduce((max, prod) => max.Id > prod.Id ? max : prod);
                    let newID = parseInt(maxID.Id) + 1;
                    prods.push({
                        Id: newID,
                        Name: name,
                        ShortDescription: shortDescription,
                        LargeDescription: largeDescription,
                        Specs: specs.split("\n"),
                        Price: price,
                        Images: req.files.images.map(i=> {return i.filename}),
                        ProductType: productType,
                        ProductState: productState,
                        Brand: brand,
                        Code: code
                    });
                    
                    fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");
                    req.session.usrInput = null;
                    res.redirect(`/admin/productCreation?state=1&id=${newID}`); 

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

        let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
        prods = JSON.parse(prods);

        res.render("./products/productsList", {products: prods, state: state});
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
            
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);

            let brands = fs.readFileSync(path.join(__dirname, "../", "data", "brands.json"), "utf-8");
            brands = JSON.parse(brands);

            let pTypes = fs.readFileSync(path.join(__dirname, "../", "data", "productTypes.json"), "utf-8");
            pTypes = JSON.parse(pTypes);

            let pStates = fs.readFileSync(path.join(__dirname, "../", "data", "productStates.json"), "utf-8");
            pStates = JSON.parse(pStates);

            let oriProd = prods.find(p=> p.Id == id);
            if(oriProd){
                let usrInput = req.session.usrInput ? req.session.usrInput : null;
                res.render("./products/productEdition", {product: oriProd, brands: brands, pTypes: pTypes, pStates: pStates, state: state, usrInput: usrInput});
            } else{
                throw new Error("No se encontró un producto con id: " + id.toString());
            }
        } catch (error) {
            res.redirect(`/admin/productEdition?state=0&msg=${error.toString()}`);
        }
    },

    productEditionSave: function(req, res){
        try {
            let {name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState } = req.body;
            let errors = validationResult(req);
            let id = req.params.id;

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
                let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
                prods = JSON.parse(prods);
                
                let product = prods.find(p=> p.Id == id);
                
                if(product){
                    product.Name = name;
                    product.ShortDescription = shortDescription;
                    product.LargeDescription = largeDescription;
                    product.Specs = specs.split("\n");
                    product.Price = price;
                    if(typeof req.files != "undefined" && typeof req.files.images != "undefined" && req.files.images.length > 0){
                        for (let i = 0; i < req.files.images.length; i++) {
                            const imageFile = req.files.images[i];
                            product.Images.push(imageFile.filename);
                        }
                    }
                    product.ProductType = productType;
                    product.ProductState = productState;
                    product.Brand = brand;
                    product.Code = code;
                    
                    fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");
                    res.redirect(`/admin/productEdition/${id}?state=1&id=${id}`);//OK
                } else{
                    throw new Error("No se ha podido encontrar el producto con ID: " + id);
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
                res.redirect(`/admin/productEdition/${id}?state=3`); 
            }
        } catch (error) {
            res.redirect(`/admin/productEdition/${id}?state=0&msg=${error.toString()}`);//ya existe
        }
    },

    productDelete: function(req, res){
        try {
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);
            prods = prods.filter(p=> p.Id != req.params.id);
            // throw new Error("Este es un error de prueba");
            fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");

            return res.end(JSON.stringify({"success" : "Borrado exitoso", "status" : 200}));
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
            //Borrar file y borrar item JSON

            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);
            let prod = prods.find(p=> p.Id == pId);

            if(prod){
                let imgInArr = prod.Images.find(im=> im.toLowerCase() == filename.toLowerCase());
                if(imgInArr){
                    let filePath = path.join(__dirname,"../../", "/public/images/products/", filename); 
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                    prod.Images = prod.Images.filter(im=> im.toLowerCase() != filename.toLowerCase());
                    fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");
                    return res.end(JSON.stringify({"success" : "Borrado exitoso", "status" : 200}));
                }
                throw new Error(`La imagen de nombre ${filename} no pudo ser encontrada en el storage.`);
            }
            throw new Error(`El producto con id ${pId} no pudo ser encontrado.`);
        } catch (error) {
            return res.status(400).send({
                message: error.toString()
             });
        }
    },
    usersList: function(req, res){
    

        let users = fs.readFileSync(path.join(__dirname, "../", "data", "users.json"), "utf-8");
        users = JSON.parse(users);

        res.render("./users/usersList", {users: users});
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