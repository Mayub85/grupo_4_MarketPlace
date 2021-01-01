const path = require("path"); 
const fs = require("fs");
module.exports = {
    cart: function(req, res){

        let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
        prods = JSON.parse(prods);
        for (let prod of prods) {
            prod.Image = prod.Images[0];
            
        }
        console.log(JSON.stringify(prods));
        res.render("./products/productCart", {productsInCart: fakeRemoveProducts(prods), recommendations: prods});
    },

    detail: function(req, res){
        let id = req.params.id;
        let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");
        prods = JSON.parse(prods);
        res.send(`Acá hay que mostrar al producto id: ${id} \n
        ${JSON.stringify(prods.find(p=>p.Id == id))}`);
        // res.render(`./products/detail/${id}`);
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