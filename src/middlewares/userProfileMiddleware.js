const db = require("../database/models");
let path = require("path");
function userProfileMiddleware(req, res, next){
    if(req.session.loggedUser != undefined){    
        if(req.session.loggedUser.id == req.params.id){
            next();
        } else {
            return res.render("error", {msg:"Ups! No tenés acceso aquí!", img: "nop.gif"});
        }
    } else {
        return res.render("error", {msg:"Ups! No tenés acceso aquí!", img: "nop.gif"});
    }
}

module.exports = userProfileMiddleware;