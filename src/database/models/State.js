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
        underscored: true 
    }

    const State = sequelize.define(alias, cols, config)
    return State
}