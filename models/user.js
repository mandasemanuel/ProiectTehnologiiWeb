const { DataTypes } = require("sequelize/dist");
const sequelize = require("../sequelize");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            validate: {
                len: [3,30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }
);

module.exports = User;