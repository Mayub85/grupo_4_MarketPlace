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
        underscored: true 
    }

    const Type = sequelize.define(alias, cols, config)
    return Type
}