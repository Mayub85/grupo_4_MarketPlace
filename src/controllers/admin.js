const path = require("path"); 
const fs = require("fs");
module.exports = {
    admin: function(req, res){
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

        res.render("admin", {brands: brands, pTypes: pTypes, pStates: pStates, state: state});
    },

    edit: function(req, res){
        
    },

    create: function(req, res){
        try {
            let {name, shortDescription, brand, code, largeDescription, specs, price, images, productType, productState } = req.body;
        
            let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
            prods = JSON.parse(prods);

            let oldProd = prods.find(p=> p.Name == name);

            if(!oldProd){
                let maxID = prods.reduce((max, prod) => max.Id > prod.Id ? max : prod);
                let newID = parseInt(maxID.Id) + 1;
                prods.push({
                    Id: newID,//FALTA CALCULAR ID
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
                res.redirect(`/admin?state=1&id=${newID}`);//OK
            } else{
                res.redirect(`/admin?state=2&pname=${name}`);//ya existe
            }
        } catch (error) {
            res.redirect(`/admin?state=0&msg=${error.toString()}`);//ya existe
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