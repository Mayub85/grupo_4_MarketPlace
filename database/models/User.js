module.exports = function (sequelize, dataTypes){
    let alias = "User";
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            notNull: true,
            primaryKey: true

        },
        type:{
            type: dataTypes.INTEGER,
            default: 1,
            notNull: true,

        },
        email: {
            type: dataTypes.STRING(50),
            notNull: true,

        },
        password:{
            type: dataTypes.STRING(60),
            notNull: true

        },
        name: {
            type: dataTypes.STRING(100),
            notNull: true,
        },
        lastName: {
            type: dataTypes.STRING(100),
            notNull: true,

        },
        avatar:{
            type: dataTypes.BLOB, 

        },
        calleDeEntrega:{
            type: dataTypes.STRING(100),

        },

        ciudadDeEntrega: {
            type: dataTypes.STRING(100),

        },

        paisDeEntrega: {
            type: dataTypes.STRING(1000),

        }, 

        cpDeEntrega: {
            type: dataTypes.INTEGER,
        
        }, 
        calleDeEntrega2:{
            type: dataTypes.STRING(100),

        },

        ciudadDeEntrega2: {
            type: dataTypes.STRING(100),
        },

        paisDeEntrega2: {
            type: dataTypes.STRING(1000),

        }, 

        cpDeEntrega2: {
            type: dataTypes.INTEGER,
        
        }, 

    }

    let config = {
        tableName: "products",
        timestamps: true,
        underscored: true 
    }

    const User = sequelize.define(alias, cols, config)
    return User
}