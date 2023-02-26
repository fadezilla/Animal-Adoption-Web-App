module.exports = (sequelize, Sequelize) => {
    const Adoption = sequelize.define('Adoption', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      adoptionDate: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    }, {
      timestamps: false
    });
  
    Adoption.associate = (models) => {
      Adoption.belongsTo(models.User);
      Adoption.belongsTo(models.Animal);
    };
  
    return Adoption;
  };