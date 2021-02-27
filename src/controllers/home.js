const path = require("path"); 
const fs = require("fs");
const db = require ("../database/models");
const constants = require("../utils/constants");
const bfgFunctions = require("../utils/bfgFunctions");
module.exports = {
    home: function(req, res){      
        // Así buscaría los productos que tengan marca "NINTENDO"  usando association
        // db.Product.findAll({
        //     include: [{
        //         association: "brands",
        //         where: { name: "NINTENDO"}  
        //     }],
        // }).then((pr)=>{
        //     console.log("Nano:");
        //     console.log(pr);
        // });

        // db.User.findAll({
        //     include: [{
        //                 association: "country",
        //             }]
        // })       
        // .then((users)=>{
        //     res.send(users);
        // })
        // .catch((error) => {
        //     console.log(error);
        //     res.send(error);
        // });

        db.Product.findAll({
            include: [{
                        association: "states",
                    }]
        })                       
        .then((products) => {
            bfgFunctions.imagesParser(products);//Lo hice para convertir la columna Images (que es un texto), a un array de strings
            res.render("index",  { DEALS: products.filter(p=> p.states.name == constants.productStates.OFERTA).slice(0, 20), //un máximo de 20
                                   NEWS: products.filter(p=> p.states.name == constants.productStates.NOVEDAD).slice(0, 20),
                                   USED: products.filter(p=> p.states.name == constants.productStates.USADO).slice(0, 20),
                                   FEATURED: products.filter(p=> p.states.name == constants.productStates.DESTACADO).slice(0, 20),
                                   PRESALE: products.filter(p=> p.states.name == constants.productStates.PREVENTA).slice(0, 20)});
        }).catch((error) => {
            console.log(error);
         //   res.send(error);
         res.render("error", {msg: "Esto no existe chabón",
                            img: "fede.jpg",
         })
        });

    }

}
