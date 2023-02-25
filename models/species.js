module.exports = (sequelize, Sequelize) => {
    const Species = sequelize.define('Species', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });

    Species.associate = (models) => {
        Species.hasMany(models.Animal);
    };

    return Species;
};