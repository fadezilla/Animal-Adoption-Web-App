module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        fullName: Sequelize.DataTypes.STRING,
        Username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        EncryptedPassword: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false            
        },
        Salt: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false            
        },
        Role: {
           type: Sequelize.DataTypes.STRING,
           defaultValue: "Member" 
        }
    },{
        timestamps: false
    });
    User.associate = function(models) {
        User.belongsToMany(models.Animal, {through: 'Adoptions'});
    };

	return User;
}