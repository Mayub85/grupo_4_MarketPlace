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
            res.send(error.toString());
        });
        // let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
        // users = JSON.parse(users);
        // let user = users.find(u=> u.id == req.cookies.recordarme);
    }

    next();
}

module.exports = userMiddleware;