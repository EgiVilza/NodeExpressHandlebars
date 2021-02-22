const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    //Burger Table burger_id, name, devourStatus
    const burgers = sequelize.define('burgers', {
        burger_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        devourStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    })
    return burgers
}

