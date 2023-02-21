module.exports = (sequelize, Sequelize) =>  {
    const Animal = sequelize.define('Animal', {
        Name: Sequelize.DataTypes.STRING,
        Birthday: Sequelize.DataTypes.DATE,
        Adopted: Sequelize.DataTypes.BOOLEAN
    },{
        timestamps: false
      });

    Animal.associate = (models) => {
        Animal.belongsToMany(models.User, { through: 'Adoptions' });
        Animal.belongsTo(models.Species);
        Animal.belongsTo(models.Size);
        Animal.belongsToMany(models.Temperament, { through: 'AnimalTemperaments' });
    };

    return Animal;
}