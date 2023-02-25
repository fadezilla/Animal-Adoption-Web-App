module.exports = (sequelize, Sequelize) => {
    const AnimalTemperament = sequelize.define('AnimalTemperament', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    },{
        timestamps: false
    });

    return AnimalTemperament;
};