module.exports = function (sequelize, dataTypes){
    let alias = "Brand";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            notNull: true,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(50),
            notNull: true,
        },

    }

    let config = {
        tableName: "brands",
        timestamps: true,
        underscored: true 
    }

    const Brand = sequelize.define(alias, cols, config);

    Brand.associate = (models)=>{
        Brand.hasMany(models.Product,//ACA SE USA EL HAS MANY 
                        {
                                as: "products",        //este es un alias de la relación 
                                foreignKey: "Brand"   //la columna fk de la tabla products (la que apunta al id de la tabla brands)
                        })
    }

    return Brand
}