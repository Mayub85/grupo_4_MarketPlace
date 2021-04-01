module.exports = function (sequelize, dataTypes){
    let alias = "Type";
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
        tableName: "types",
        timestamps: true,
        underscored: true,
        paranoid: true 
    }

    const Type = sequelize.define(alias, cols, config);

    Type.associate = (models)=>{
        Type.hasMany(models.Product,//ACA SE USA EL HAS MANY 
                        {
                                as: "products",        //este es un alias de la relación 
                                foreignKey: "ProductType"   //la columna fk de la tabla products (la que apunta al id de la tabla types)
                        })
    }

    return Type
}