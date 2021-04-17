const path = require("path"); 
const db = require ("../database/models");
const {Sequelize, Op} = require("sequelize");
const bfgFunctions = require("../utils/bfgFunctions");
module.exports = {
    cart: function(req, res){
        if(typeof req.session.loggedUser == "undefined"){
            return res.redirect("/users");
        }
        let prods = [];
        /*
        session.cart =
        [
            {userId:nro, products: [{Id, Name, Code, Price, Image, Qty}]}
        ]
        */
        if(typeof req.session.cart != "undefined" && req.session.cart.length > 0){
            let usrCart = req.session.cart.find(cart => cart.userId == req.session.loggedUser.Id);
            if(usrCart){
                bfgFunctions.imagesParser(usrCart.products);
                for (let prod of usrCart.products) {
                    prod.Image = prod.Images[0];
                }
                prods = [...usrCart.products];
            } 
        }
        db.Product.findAll({ order: Sequelize.literal('rand()'), limit: 5 })
        .then((recom) => {
            bfgFunctions.imagesParser(recom);
            res.render("./products/productCart", {productsInCart: prods, recommendations: recom});
        })
        .catch(error=>{
            return res.render("error", {
                                    msg: "Error inesperado. Intentalo más tarde. ",
                                    img: "broken.jpg",
                                   });
        }); 

    },

    cartAdd: function(req, res){
        if(typeof req.session.loggedUser == "undefined"){
            return res.end(JSON.stringify({"success" : "Usuario no logueado", "status" : 204}));
        }
        let id = req.params.id;
        let qty = req.params.qty;
        db.Product.findByPk(id)
        .then((product)=>{
            if(typeof req.session.cart != "undefined" && req.session.cart.length > 0){ //cart
                let cart = req.session.cart;
                let usrCart = cart.find(c => c.userId == req.session.loggedUser.Id);
                if(!usrCart){
                    let cartItem = {
                        userId: req.session.loggedUser.Id, 
                        products: [
                            {
                                Id: product.id, 
                                Name: product.name, 
                                Code: product.Code, 
                                Price: product.Price, 
                                Images: product.Images, 
                                Qty: qty && typeof qty != "undefined" ? parseInt(qty) : 1
                            }
                        ]
                    };
                    cart.push(cartItem);
                    req.session.cart = cart;
                    return res.end(JSON.stringify({"success" : "cartAdd exitoso", "status" : 200}));
                } else{
                    //como existe el carrito, primero checkeo si el producto ya estaba agregado
                    let oriProd = usrCart.products.find(p=> p.Id == id);
                    if(!oriProd){
                        //Si no estaba, lo agrego
                        usrCart.products.push({
                            Id: product.id, 
                            Name: product.name, 
                            Code: product.Code, 
                            Price: product.Price, 
                            Images: product.Images, 
                            Qty: qty && typeof qty != "undefined" ? parseInt(qty) : 1
                        });
                        req.session.cart = cart;
                        return res.end(JSON.stringify({"success" : "cartAdd exitoso", "status" : 200}));
                    } else {
                        oriProd.Qty += qty && typeof qty != "undefined" ? parseInt(qty) : 1;
                        req.session.cart = cart;
                        return res.end(JSON.stringify({"success" : "cartAdd exitoso", "status" : 200}));
                    }
                } 
            } else {
                let cart = [];
                let cartItem = {
                    userId: req.session.loggedUser.Id, 
                    products: [
                        {
                            Id: product.id, 
                            Name: product.name, 
                            Code: product.Code, 
                            Price: product.Price, 
                            Images: product.Images, 
                            Qty: qty && typeof qty != "undefined" ? parseInt(qty) : 1
                        }
                    ]
                };
                cart.push(cartItem);
                req.session.cart = cart;
                return res.end(JSON.stringify({"success" : "cartAdd exitoso", "status" : 200}));
            }
            
        })
        .catch((error)=>{
            return res.status(400).send({
                message: error.toString()
            });
        });
    },

    cartRemove: function(req, res){
        if(typeof req.session.loggedUser == "undefined"){
            return res.end(JSON.stringify({"success" : "Usuario no logueado", "status" : 204}));
        }
    
        let prodId = req.params.id;
        let cart = req.session.cart;
        if(typeof cart != "undefined" && cart.length > 0){ //cart
            let usrCart = req.session.cart.find(c => c.userId == req.session.loggedUser.Id);
            if(usrCart){
                usrCart.products = usrCart.products.filter(p=> p.Id != prodId);
                req.session.cart = cart;
                return res.end(JSON.stringify({"success" : "cartRemove exitoso", "status" : 200}));
            } else{
                return res.end(JSON.stringify({"success" : "Usuario sin carrito", "status" : 204}));    
            }
        } else {
            return res.end(JSON.stringify({"success" : "Usuario sin carrito", "status" : 204}));
        }
    },

    updateQty: function(req, res){
        if(typeof req.session.loggedUser == "undefined"){
            return res.end(JSON.stringify({"success" : "Usuario no logueado", "status" : 204}));
        }
    
        let prodId = req.params.id;
        let qty = req.params.qty;
        let cart = req.session.cart;
        if(typeof cart != "undefined" && cart.length > 0){ 
            let usrCart = req.session.cart.find(c => c.userId == req.session.loggedUser.Id);
            if(usrCart){
                let prod = usrCart.products.find(p=> p.Id == prodId);
                prod.Qty = qty;
                req.session.cart = cart;
                return res.end(JSON.stringify({"success" : "updateQty exitoso", "status" : 200}));
            } else{
                return res.end(JSON.stringify({"success" : "Usuario sin carrito", "status" : 204}));    
            }
        } else {
            return res.end(JSON.stringify({"success" : "Usuario sin carrito", "status" : 204}));
        }
    },

    detail: function(req, res){ 
        let id = req.params.id;
        db.Product.findByPk(id)
        .then((productoMuestra)=>{
            productoMuestra.Images = JSON.parse(productoMuestra.Images);
            productoMuestra.Specs = productoMuestra.Specs.replace(/\\r/g, "");
            productoMuestra.Specs = productoMuestra.Specs.replace(/\"/g, "");
            productoMuestra.Specs = productoMuestra.Specs.split(",");
            console.log(productoMuestra.Specs);
            res.render ("./products/productDetail", {producto: productoMuestra});
        })
        .catch((error)=>{
            res.send(error.toString());
        });
    },

    search: function(req, res){ 
        let q = req.query.q ? req.query.q : "";
        let promesa1 = db.Product.findAll({
            include: [{
                association: "brands",
            }],
            where: { 
                name: { [Op.like]: `%${q}%`  }
            }
        });

        let promesa2 = db.Product.findAll({
            include: [{
                association: "brands",
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





