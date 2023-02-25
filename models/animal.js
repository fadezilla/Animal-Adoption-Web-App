module.exports = (sequelize, Sequelize) => {
    const Animal = sequelize.define('Animal', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      Name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      Birthday: {
        type: Sequelize.DataTypes.DATEONLY,
        allowNull: false,
      },
      Adopted: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },{
        timestamps: false,
    });
  
    Animal.associate = (models) => {
      Animal.belongsTo(models.Species);
      Animal.belongsToMany(models.Temperament, { through: 'AnimalTemperament', as: 'Temperament'});
      Animal.belongsTo(models.Size);
    };
  
    return Animal;
  };
 