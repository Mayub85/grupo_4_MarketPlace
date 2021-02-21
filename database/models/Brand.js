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

    const Brand = sequelize.define(alias, cols, config)
    return Brand
}