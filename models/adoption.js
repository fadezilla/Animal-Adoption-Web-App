module.exports = (sequelize, Sequelize) => {
    const Adoption = sequelize.define('Adoption', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      animalId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Animal',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    }, {
      timestamps: false,
    });
  
    Adoption.associate = (models) => {
      Adoption.belongsTo(models.Animal);
      Adoption.belongsTo(models.User);
    };
  
    return Adoption;
  };
  