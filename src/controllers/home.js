const path = require("path"); 
const fs = require("fs");
const db = require ("../database/models");
const { deepStrictEqual } = require("assert");
const Brand = require("../database/models/Brand");

module.exports = {
    home: function(req, res){      
        //Lo viejo con FS:
        // let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
        // prods = JSON.parse(prods);
        // res.render("index",  { DEALS: fakeMultiplyProducts(prods), NEWS: fakeMultiplyProducts(prods), USED: fakeMultiplyProducts(prods), FEATURED: fakeMultiplyProducts(prods), PRESALE: fakeMultiplyProducts(prods)});
        //****************/        
        //Así busco los productos que tengan marca "NINTENDO"  usando association
        // db.Product.findAll({
        //     include: [{
        //         association: "brands",
        //         where: { name: "NINTENDO"}  
        //     }],
        // }).then((pr)=>{
        //     console.log("Nano:");
        //     console.log(pr);
        // });

        db.Product.findAll()                       
        .then((products) => {
            for (let i=0; i<products.length; i++) { //ESTE FOR lo hice para convertir la columna Images (que es un texto), a un array de strings
                let prod = products[i];
                if(prod.Images && prod.Images.length > 0){
                    prod.Images = JSON.parse(prod.Images);
                }
            }
            res.render("index",  { DEALS: fakeMultiplyProducts(products), NEWS: fakeMultiplyProducts(products), USED: fakeMultiplyProducts(products), FEATURED: fakeMultiplyProducts(products), PRESALE: fakeMultiplyProducts(products)});
        }).catch((error) => {
            console.log(error);
            res.send(error);
        });

    }

}

function fakeMultiplyProducts(arr){
    let rnd = getRandomArbitrary(1,11); 
    let newArr = arr.map(e=> e);
    for (let i=0; i<rnd; i++) {
        let it = getRandomArbitrary(0,4); 
        newArr.push(newArr[it]);
    }
    return newArr;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}