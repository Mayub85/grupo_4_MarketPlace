const db = require("../database/models");
let path = require("path");
function userMiddleware(req, res, next){
    if(req.session.loggedUser != undefined){    
        res.locals.loggedUser = req.session.loggedUser;
    } else if(req.cookies.recordarme != undefined && req.session.loggedUser == undefined){//Si EXISTE la cookie pero NO el session...
        let id = req.cookies.recordarme;
        db.User.findByPk(id)
        .then((user)=>{
            console.log(user);
            delete user.password;
            req.session.loggedUser = user;
            res.locals.loggedUser = user;
        })
        .catch((error)=>{
            //res.send(error.toString());
            return res.render("error", {msg:"Ups! Algo malió sal!", img: "broken.jpg"});
        });
    }

    next();
}

module.exports = userMiddleware;