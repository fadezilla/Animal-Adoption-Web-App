module.exports = (sequelize, Sequelize) => {
    const Temperament = sequelize.define('Temperament', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });

    Temperament.associate = (models) => {
        Temperament.belongsToMany(models.Animal, { through: 'AnimalTemperament' })
    };

    return Temperament;
};