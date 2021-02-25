const path = require("path"); 
const fs = require("fs");
const db = require ("../database/models");
const {Op, literal} = require("sequelize");
const bfgFunctions = require("../utils/bfgFunctions");
module.exports = {
    cart: function(req, res){
        let prods = fs.readFileSync(path.join(__dirname, "../", "data", "products.json"), "utf-8");//TODO: falta implementar lógica de carrito (LocalStorage?)
        prods = JSON.parse(prods);
        for (let prod of prods) {
            prod.Image = prod.Images[0];
        }
        res.render("./products/productCart", {productsInCart: bfgFunctions.fakeRemoveProducts(prods), recommendations: prods});
    },

    detail: function(req, res){ 
        let id = req.params.id;
        db.Product.findByPk(id)
        .then((productoMuestra)=>{
            productoMuestra.Images = JSON.parse(productoMuestra.Images);
            console.log(typeof(productoMuestra.Specs));
            productoMuestra.Specs = productoMuestra.Specs.replace(/\\r/g, "");
            productoMuestra.Specs = productoMuestra.Specs.replace(/\"/g, "");
            productoMuestra.Specs = productoMuestra.Specs.split(",");
            console.log(productoMuestra.Specs);
            res.render ("productDetail", {producto: productoMuestra});
        })
        .catch((error)=>{
            res.send(error.toString());
        });
    },

    search: function(req, res){ 
        let q = req.query.q ? req.query.q : "";
        let promesa1 = db.Product.findAll({
            include: [{
                association: "brands"
            }],
            where: { 
                name: { [Op.like]: `%${q}%`  }
            }
        });

        let promesa2 = db.Product.findAll({
            include: [{
                association: "brands",
                // order: literal('rand()'), 
                // limit: 4
            }]
        });

        Promise.all([promesa1, promesa2])
        .then((data)=>{ 
            bfgFunctions.imagesParser(data[0]);
            bfgFunctions.imagesParser(data[1]);
            res.render("./products/productSearch", {results: data[0], recommendations: data[1] });
        })
        .catch((error)=>{
            res.send(error.toString());
        });
    }
}





