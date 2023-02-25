module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
      Id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      FirstName: Sequelize.DataTypes.STRING,
      LastName: Sequelize.DataTypes.STRING,
      Username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      Password: {
        type: Sequelize.DataTypes.BLOB,
        allowNull: false
      },
      Role: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'member'
      }
  },{
      timestamps: false
  });

  return User;
};