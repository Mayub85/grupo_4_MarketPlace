const path = require("path"); 
const fs = require("fs");
const { exception } = require("console");
module.exports = {
    admin: function(req, res){
        res.render("admin");
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
            default:
                state={
                    showMessage: false
                }
            break;
        }


        let brands = fs.readFileSync(path.join(__dirname, "../", "data", "brands.json"), "utf-8");
        brands = JSON.parse(brands);

        let pTypes = fs.readFileSync(path.join(__dirname, "../", "data", "productTypes.json"), "utf-8");
        pTypes = JSON.parse(pTypes);

        let pStates = fs.readFileSync(path.join(__dirname, "../", "data", "productStates.json"), "utf-8");
        pStates = JSON.parse(pStates);

        res.render("./products/productCreation", {brands: brands, pTypes: pTypes, pStates: pStates, state: state});
    },

    
    productCreate: function(req, res){
        try {
            let {name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState } = req.body;
            
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);
            
            let oldProd = prods.find(p=> p.Name == name);
            
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
                    Images: [images], //TODO
                    ProductType: productType,
                    ProductState: productState,
                    Brand: brand,
                    Code: code
                });
                
                fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");
                res.redirect(`/admin/productCreation?state=1&id=${newID}`);//OK
            } else{
                res.redirect(`/admin/productCreation?state=2&pname=${name}`);//ya existe
            }
        } catch (error) {
            res.redirect(`/admin/productCreation?state=0&msg=${error.toString()}`);//ya existe
        }
    },

    productsList: function(req, res){
        let state = req.query.state;
        console.log("Estado: " + state);
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
                res.render("./products/productEdition", {product: oriProd, brands: brands, pTypes: pTypes, pStates: pStates, state: state});
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
            
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);
            
            let id = req.params.id;
            let product = prods.find(p=> p.Id == id);
            
            if(product){
                product.Name = name;
                product.ShortDescription = shortDescription;
                product.LargeDescription =largeDescription;
                product.Specs = specs.split("\n");
                product.Price = price;
                product.Images = [images]; //TODO
                product.ProductType = productType;
                product.ProductState = productState;
                product.Brand = brand;
                product.Code = code;
                
                fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");
                res.redirect(`/admin/productEdition/${id}?state=1&id=${id}`);//OK
            } else{
                throw new Error("No se ha podido encontrar el producto con ID: " + id);
            }
        } catch (error) {
            res.redirect(`/admin/productEdition/${id}?state=0&msg=${error.toString()}`);//ya existe
        }
    },

    productDelete: function(req, res){
        try {
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);
            prods = prods.filter(p=> p.id != req.params.id);
            // throw new Error("Este es un error de prueba");
            //fs.writeFileSync(path.join(__dirname, "../", "data", "products.json"), JSON.stringify(prods), "utf8");

            res.end('{"success" : "Borrado exitoso", "status" : 200}');
        } catch (error) {
            res.status(400).send({
                message: error.toString()
             });
        }
    }
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