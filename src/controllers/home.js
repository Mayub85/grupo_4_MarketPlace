const path = require("path"); 
const fs = require("fs");
const db = require ("../../database/models");

module.exports = {
    home: function(req, res){        
        let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
        prods = JSON.parse(prods);
        res.render("index",  { DEALS: fakeMultiplyProducts(prods), NEWS: fakeMultiplyProducts(prods), USED: fakeMultiplyProducts(prods), FEATURED: fakeMultiplyProducts(prods), PRESALE: fakeMultiplyProducts(prods)});
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