module.exports = function (sequelize, dataTypes){
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            notNull: true,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(100),
            notNull: true,
        },

        ShortDescription:{
            type: dataTypes.STRING(100),
            notNull: true,
        },

        LargeDescription: {
            type: dataTypes.STRING(1000),
        },

        Specs: {
            type: dataTypes.STRING(1000),

        }, 

        Price: {
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            notNull: true,
        }, 

        Images:{
            type: dataTypes.BLOB, 
        },

        ProductType: {
            type: dataTypes.INTEGER,
            notNull: true,
        },

        ProductState:{
            type: dataTypes.INTEGER,
        },

        Brand: {
            type: dataTypes.INTEGER,            
        },    

        Code: {
            type: dataTypes.INTEGER(7),
            notNull: true,
        }

    }

    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true 
    }

    const Product = sequelize.define(alias, cols, config)
    return Product
}