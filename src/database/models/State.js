module.exports = function (sequelize, dataTypes){
    let alias = "State";
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
        tableName: "states",
        timestamps: true,
        underscored: true,
        paranoid: true 
    }

    const State = sequelize.define(alias, cols, config);

    State.associate = (models)=>{
        State.hasMany(models.Product,//ACA SE USA EL HAS MANY 
                        {
                                as: "products",        //este es un alias de la relación 
                                foreignKey: "ProductState"   //la columna fk de la tabla products (la que apunta al id de la tabla brands)
                        })
    }

    return State;
}