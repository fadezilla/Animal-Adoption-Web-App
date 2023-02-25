module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define('Size', {
        Id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Name: Sequelize.DataTypes.STRING,
    },{
        timestamps: false
    });

    Size.associate = (models) => {
        Size.hasMany(models.Animal);
    };

    return Size;
};