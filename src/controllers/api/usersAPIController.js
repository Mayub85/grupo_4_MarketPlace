const db = require("../../database/models");

const usersAPIController = {
    getAll: (req, res) =>{
        db.User.findAll({
            attributes: {exclude: ['password','calleDeEntrega', 'ciudadDeEntrega', 'country_id', 'paisDeEntrega', 'cpDeEntrega', 'calleDeEntrega2', 'ciudadDeEntrega2', 'paisDeEntrega2', 'cpDeEntrega2', 'avatar', 'updatedAt', 'deletedAt']},
        })
        .then(users =>{
            let respuesta = {
                    meta: {
                                status: 200,
                            },
                    data: {
                            users : users,
                            count: users.length
                        }
                };
            res.send(respuesta);
        })
        .catch(error =>{
            let respuesta = {
                meta: {
                            status: 500,
                        },
                data: {
                        msg: error.toString(),
                    }
            };
            res.send(respuesta);
        })
    },

    getByID: (req, res) =>{

        let badID = (msg) => {
            let respuesta = {
                meta: {
                    status: 500,
                },
                data: {
                    msg: msg,
                }
            };
            return res.send(respuesta);
        }

        let id = req.params.id;
        try{
            if(parseInt(id) <= 0){
               return badID("El ID debe ser un nro mayor a 0");
            }

        }catch(error){
            return badID("Valor de ID inválido. Debe ser un nro mayor a 0");
        }

        db.User.findOne({
            attributes: {exclude: ['password','calleDeEntrega', 'ciudadDeEntrega', 'country_id', 'paisDeEntrega', 'cpDeEntrega', 'calleDeEntrega2', 'ciudadDeEntrega2', 'paisDeEntrega2', 'cpDeEntrega2', 'avatar', 'createdAt', 'updatedAt', 'deletedAt']},
            where: { 
                id: id 
            },
        })
        .then(user =>{
            if(user){
              
                let respuesta = {
                    meta: {
                        status: 200,
                    },
                    data: {
                        user : user,
                    }
                };
                return res.send(respuesta);
            } else {
                let respuesta = {
                        meta: {
                            status: 204,
                        },
                        data: {
                            user : {},
                        }
                    };
                return res.send(respuesta);
            }
        })
        .catch(error =>{
            let respuesta = {
                meta: {
                            status: 500,
                        },
                data: {
                        msg: error.toString(),
                    }
            };
            return res.send(respuesta);
        })
    }
};

module.exports = usersAPIController;