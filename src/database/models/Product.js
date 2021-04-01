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
            type: dataTypes.STRING(),
            notNull: true,
        },

        ShortDescription:{
            field: 'ShortDescription',
            type: dataTypes.TEXT,
            notNull: true,
        },

        LargeDescription: {
            field: 'LargeDescription',
            type: dataTypes.TEXT,
        },

        Specs: {
            field: 'Specs',
            type: dataTypes.TEXT,
        }, 

        Price: {
            field: 'Price',
            type: dataTypes.DECIMAL(10,2).UNSIGNED,
            notNull: true,
        }, 

        Images:{
            field: 'Images',
            type: dataTypes.STRING(), 
        },

        ProductType: {
            field: 'ProductType',
            type: dataTypes.INTEGER,
            notNull: true,
        },

        ProductState:{
            field: 'ProductState',
            type: dataTypes.INTEGER,
        },

        Brand: {
            field: 'Brand',
            type: dataTypes.INTEGER,            
        },    

        Code: {
            field: 'Code',
            type: dataTypes.INTEGER(7),
            notNull: true,
        }

    }

    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true,
        paranoid: true
    }

    const Product = sequelize.define(alias, cols, config);


    Product.associate = (models)=>{
        Product.belongsTo(models.Brand,       
            {
                as: "brands",        //este es un alias de la relación 
                foreignKey: "Brand"   //la columna fk de la tabla products (la que apunta al id de la tabla brands)
            }),
        Product.belongsTo(models.State,       
            {
                as: "states",        //este es un alias de la relación 
                foreignKey: "ProductState"   //la columna fk de la tabla products (la que apunta al id de la tabla states)
            })
            ,
        Product.belongsTo(models.Type,       
            {
                as: "types",        //este es un alias de la relación 
                foreignKey: "ProductType"   //la columna fk de la tabla products (la que apunta al id de la tabla states)
            })
    }

    return Product
}