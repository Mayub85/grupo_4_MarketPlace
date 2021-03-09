module.exports = function (sequelize, dataTypes){
    let alias = "Country";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            notNull: true,
            primaryKey: true
        },

        name: {
            type: dataTypes.STRING(250),
            notNull: true,
        },

    }

    let config = {
        tableName: "countries",
        timestamps: true,
        underscored: true,
        paranoid: true 
    }

    const Country = sequelize.define(alias, cols, config);

    Country.associate = (models)=>{
        Country.hasMany(models.User,//ACA SE USA EL HAS MANY 
                        {
                                as: "users",        //este es un alias de la relación 
                                foreignKey: "country_id"   //la columna fk de la tabla products (la que apunta al id de la tabla countries)
                        })
    }

    return Country;
}