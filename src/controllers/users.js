const path = require("path"); 
const fs = require("fs");
const { exception } = require("console");
const bcrypt = require ("bcrypt");



module.exports = {
    users: function(req, res){
        res.render("login"); 
    },

    login: function (req, res){
        res.render ("./users/login")
    },

    checkuser: function (req, res){
        let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
        users = JSON.parse(users);
        for(let i =0; i < users.length; i++){
            if(users[i].email ==req.body.email){
                if (bcrypt.compareSync(req.body.password, users[i].password)){
                    res.render(login)
                }else{
                    res.send("Los datos no coinciden");
                    
                }
            }
        }
        return res.render(register)
    },

    creation: function (req, res){
        let users = fs.readFileSync(path.join(__dirname,"../data/users.json"), "utf8");
        users = JSON.parse(users);
        let maxID = users.reduce((max, user) => max.Id > user.Id ? max : user);
        let newID = parseInt(maxID.Id) + 1;
        users.push({
            "id": newID,
            "type": 1,
            "email": req.body.email,
            "password": bcrypt.hashSync(req.body.password,12),
            "name": req.body.name,
            "lastName": req.body.lastName,
            "avatar": req.body.avatar,
            "calleDeEntrega": req.body.calleDeEntrega,
            "ciudadDeEntrega": req.body.ciudadDeEntrega,
            "paisDeEntrega": req.body.paisDeEntrega,
            "cpDeEntrega": req.body.cpDeEntrega,
            "calleDeEntrega2": req.body.calleDeEntrega2,
            "ciudadDeEntrega2": req.body.ciudadDeEntrega2,
            "paisDeEntrega2": req.body.paisDeEntrega2,
            "cpDeEntrega2": req.body.cpDeEntrega2,
          })
          fs.writeFileSync(path.join(__dirname,"../data/users.json"), JSON.stringify(users))
          res.redirect("/")
    },


    create: function (req, res){

    },


    editionSave: function (req, res){

    },

    edition: function (req, res){

    },

    delete: function (req, res){

    },

}
