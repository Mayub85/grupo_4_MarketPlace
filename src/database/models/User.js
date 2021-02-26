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
            field: 'lastName',
            type: dataTypes.STRING(100),
            notNull: true,

        },
        avatar:{
            type: dataTypes.BLOB, 

        },
        calleDeEntrega:{
            field: 'calleDeEntrega',
            type: dataTypes.STRING(100),

        },

        ciudadDeEntrega: {
            field: 'ciudadDeEntrega',
            type: dataTypes.STRING(100),

        },

        country_id:{
            type: dataTypes.INTEGER,
            notNull: true,
        }, 

        paisDeEntrega: {
            field: 'paisDeEntrega',
            type: dataTypes.STRING(1000),
        }, 

        cpDeEntrega: {
            field: 'cpDeEntrega',
            type: dataTypes.INTEGER,
        
        }, 
        calleDeEntrega2:{
            field: 'calleDeEntrega2',
            type: dataTypes.STRING(100),

        },

        ciudadDeEntrega2: {
            field: 'ciudadDeEntrega2',
            type: dataTypes.STRING(100),
        },

        paisDeEntrega2: {
            field: 'paisDeEntrega2',
            type: dataTypes.STRING(1000),
        }, 

        cpDeEntrega2: {
            field: 'cpDeEntrega2',
            type: dataTypes.INTEGER,
        }, 

    }

    let config = {
        tableName: "users",
        timestamps: true,
        underscored: true 
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = (models)=>{
        User.belongsTo(models.Country,       
            {
                as: "country",        //este es un alias de la relación 
                foreignKey: "country_id"   //la columna fk de la tabla products (la que apunta al id de la tabla states)
            })
    }

    return User
}