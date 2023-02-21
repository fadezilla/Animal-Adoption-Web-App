module.exports = (sequelize, Sequelize) =>  {
    const Temperament = sequelize.define('Temperament', {
        Name: Sequelize.DataTypes.STRING
    },{
        timestamps: false
      });
    Temperament.associate = (models) =>{
        Temperament.belongsToMany(models.Animal, { through: 'AnimalTemperaments' });
    };

    return Temperament;
}