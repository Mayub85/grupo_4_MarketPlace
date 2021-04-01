const db = require("../../database/models");
const bfgFunctions = require("../../utils/bfgFunctions");

const productsAPIController = {
    getAll: (req, res) =>{
        db.Product.findAll({
            include: [
                        {
                            association: "brands",
                        },
                        {
                            association: "types",
                        },
                        {
                            association: "states",
                        },
                    ]
        })
        .then(products =>{
            let countsByType = products.reduce((p, c) => {
                let ProductType = c.types.name;
                if (Object.keys(p).length === 0 || (
                    !p.hasOwnProperty(ProductType)
                    )){ 
                    p[ProductType] = 0;
                }
                p[ProductType]++;
                return p;
            }, {});
            
            bfgFunctions.imagesParser(products);
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                for (let j = 0; j < product.Images.length; j++) {
                    let img = product.Images[j];
                    product.Images[j] = bfgFunctions.imageToURL(req, img, "products");
                }
            }

            let respuesta = {
                    meta: {
                                status: 200,
                            },
                    data: {
                            products: products,
                            count: products.length,
                            countByType: countsByType
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

        db.Product.findOne( {include: [{
                                            association: "brands",
                                        },
                                        {
                                            association: "types",
                                        },
                                        {
                                            association: "states",
                                        }
                            ],
                            where: { 
                                id: id 
                            }
        })
        .then(product =>{
            if(product){
                
                bfgFunctions.imagesParser([product]);
                for (let i = 0; i < product.Images.length; i++) {
                    let img = product.Images[i];
                    product.Images[i] = bfgFunctions.imageToURL(req, img, "products");
                }

                let respuesta = {
                    meta: {
                        status: 200,
                    },
                    data: {
                        product : product,
                    }
                };
                return res.send(respuesta);
            } else {
                let respuesta = {
                        meta: {
                            status: 204,
                        },
                        data: {
                            product : {},
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
    },

    getTypes: (req, res) =>{
        db.Type.findAll()
        .then(types =>{
            let respuesta = {
                    meta: {
                                status: 200,
                            },
                    data: {
                            types: types,
                            count: types.length
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
};

module.exports = productsAPIController;